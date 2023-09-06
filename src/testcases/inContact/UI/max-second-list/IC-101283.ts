import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { Email, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ActiveContactsPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249445
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18
 * Bug: IC-96400 [TestAutomation][inC-UI] The OB Email contact state keeps Interrupted instead of Active after ending IB Phone contact
 */

describe("MAX suite - IC-101283", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let obEmailAgent: Agent;
    let ibPhoneAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let email: Email = new Email()
    let minWorkingTime: number = 30;
    let callContactId: number;
    let emailJson: string = `{"interruptible": true,"minWorkingTime":${minWorkingTime}}`;
    let phoneJson: string = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let testSubject: string = Utility.createRandomString(20, "Subject_");
    let testBody: string = Utility.createRandomString(20, "Body_");

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;
    let maxRequiredDisposition: MaxDispositionPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101283 - MAX > Email > Outbound email interrupted by call - disposition email`);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, true, null, emailJson);
        await TestCondition.setUpAndAssignSkill(obEmailAgent, SkillType.IB_Phone, null, null, phoneJson);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, phoneJson);

        // Pre-condition
        // Login Incontact
        email.initFullData("test@email.com", testSubject, testBody, "");
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101283 - Outbound email interrupted by call disposition email', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);

        // 3. Click "New + button"> Outbound Email and select an ob email skill        
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.EMAIL);
        maxEmailPage = await maxPage.selectEmailFromAddressBook(SkillType.OB_EMAIL, email.toAddress);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        emailContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        //VP: Email window opens and you can start to write on it.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email window does not open");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Cannot start to write on email window");

        // 4. Launch the IB Phone contact 
        await TestHelpers.startInboundCall(ibPhoneAgent);
        maxCall = await maxEmailPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: Verify the Agent gets interrupted and IB phone is delivered
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "IB phone is not delivered")
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Email is not interrupted");

        // 5. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (OB Email and IB Phone) 
        // Verify the States for each contact:IB Phone: Active, OB Email: Interrupted
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report does not contain the contact (IB Phone) with States contact: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report does not contain the contact (OB Email) with States for contact: Interrupted");

        // 6. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.clickEndContactButton();
        maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Phone call ends and the Agent displays the OB Email items.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Phone call does not end");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The Agent does not display the OB Email items");

        // VP: Verify the email continues on edit mode.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email does not continue on edit mode");

        // 7. Click on "End email" button
        maxRequiredDisposition = await maxEmailPage.endEmailWithDisposition();

        // VP: Verify after click on the button displays the Disposition Dialog is displayed.
        expect(await maxRequiredDisposition.isDispositionFormDisplayed()).toBe(true, "The disposition dialog does not display");

        // 8. Select a Disposition and save the changes
        await maxRequiredDisposition.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1);

        // VP: Verify the email ends and the agent is in available status
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(false, "The email work space still displays");
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "The agent does not change to available");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(obEmailAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});