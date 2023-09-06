import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { ContactLabel, ContactName, DispositionName } from "@data-objects/general/max";
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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249444
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18 
 */  

describe("MAX suite - IC-101284", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let obEmailAgent: Agent;
    let ibPhoneReqAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let minWorkingTime: number = 30;
    let email: Email = new Email();
    let dispositionNote: string = "Automation_Test";
    let callContactId: number;
    let emailJson: string = `{"interruptible": true,"minWorkingTime":${minWorkingTime}}`;
    let phoneJson: string = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101284 - MAX > Email > Outbound email interrupted by call - disposition call`);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(obEmailAgent, SkillType.IB_Phone, true, null, phoneJson);
        ibPhoneReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, true, null, phoneJson);

        // Pre-condition
        // Login Incontact
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101284 - MAX Email Outbound email interrupted by call disposition call', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);

        // 3. Click "New + button"> Outbound Email and select an ob email skill       
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);
        emailContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // VP: Email window opens and you can write on it        
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact does not deliver in Agent");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // 4. Launch the IB Phone contact
        await TestHelpers.startInboundCall(ibPhoneReqAgent);
        maxCall = await maxEmailPage.waitForCallWorkspace(minWorkingTime);
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: Verify the Agent gets interrupted and IB phone is delivered
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Agent does not get interrupted");
        expect(await maxEmailPage.isEmailWorkSpaceHidden(TestRunInfo.shortTimeout)).toBe(true, "IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25),The Email is not parked");

        // 5. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (OB Email and IB Phone) 
        // VP: Verify the States for each contact:IB Phone: Active, OB Email: Interrupted        
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "IThe report does not contain the contact IB Phone with States: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report does not contain the OB Email with States: Interrupted");

        // 6. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();

        // VP: Verify the Disposition Dialog is displayed
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition Dialog does not display");

        // 7. Select a Disposition and save the changes
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Verify the call ends and the Email window displays and it is in edit mode
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "IB Phone item still displays");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(true, "Email window is not displayed");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // End Email contact
            maxPage = await maxEmailPage.endEmailContact(false);
            await maxPage.waitForQueueValue(ContactLabel.OUTBOUND_EMAIL, 0);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(obEmailAgent);
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(obEmailAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});