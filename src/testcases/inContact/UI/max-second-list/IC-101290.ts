import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { Email, EmailMode } from "@data-objects/inContact/max/email/email-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ActiveContactsPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-page";
import MaxCall from "@page-objects/inContact/max/max-call";
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
 * TC ID: 249401
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18
 * Bug: IC-96400 [TestAutomation][inC-UI] The OB Email contact state keeps Interrupted instead of Active after ending IB Phone contact
 */

describe("MAX suite - IC-101290", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let obEmailAgent: Agent;
    let ibPhoneNotReqAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let email: Email = new Email();
    let callContactId: number;
    let emailJson: string = `{"interruptible": true,"minWorkingTime":30}`;
    let phoneJson: string = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101290 - MAX > Email > Outbound email interrupted by call - save reply draft progress`);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(obEmailAgent, SkillType.IB_Phone, null, null, phoneJson);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, phoneJson);

        // Pre-condition
        // Login Incontact
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obEmailAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101290 - MAX Email Outbound email interrupted by call save reply draft progress', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);

        // 3. Click "New + button"> Outbound Email and select an ob email skill       
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);
        emailContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // VP: Email window opens and you can write on it        
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact does not deliver in Agent");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // 4. Enter a valid To address
        await maxEmailPage.enterToAddress(email.toAddress);

        // VP: To address entered as typed
        expect(await maxEmailPage.getToAddressValue()).toBe(email.toAddress, "Cannot enter to address");

        // 5. Enter a subject
        await maxEmailPage.enterEmailSubject(email.emailSubject);

        // VP: Subject entered as typed
        expect(await maxEmailPage.getEmailSubject()).toBe(email.emailSubject, "Cannot enter email subject");

        // 6. Enter text in body
        await maxEmailPage.enterEmailBody(email.emailBody);

        // VP: Text populated into body as typed
        // After that wait that the "Time Counter" available in "MAX" is > to the "Minimum Working Time" configured in requirement
        // In this case is 30 Seconds.
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(email.emailBody, "Cannot enter email body content");

        // 7. Launch the IB Phone contact
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxEmailPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // 8. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (OB Email and IB Phone) 
        // VP: Verify the States for each contact:IB Phone: Active, OB Email: Interrupted        
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report does not contain the contact IB Phone with States: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report does not contain the OB Email with States: Interrupted");

        // 9. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.endCallContact();
        await maxCall.waitForEmailWorkspace(TestRunInfo.shortTimeout);

        // VP: Phone call ends and the Agent displays the OB Email items
        // VP: Verify the settings entered in steps 4 - 6 are continue to displayed and it is not lost and and it is possible to continue to edit the email
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(false, "IB Phone item still displays");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email work space is not displayed");
        expect(await maxEmailPage.getToAddressValue()).toBe(email.toAddress, "To address is lost");
        expect(await maxEmailPage.getEmailSubject()).toBe(email.emailSubject, "Email subject is lost");
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(email.emailBody, "Email body content is lost");

        // 10. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 1 contact (OB Email)
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId)).toBe(false, "The report still contains the contact IB Phone");

        // VP: Verify the States for the contact: Ob Email: Active        
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "Ob email is not active");

        // 11. Click on "End Email" button
        await pageBase.switchWindowByHandle(maxWindowHandle);
        maxPage = await maxEmailPage.endEmailContact(false);
        await maxPage.waitForQueueValue(ContactLabel.OUTBOUND_EMAIL, 0);
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
                await CustomAPIs.endAllContacts(obEmailAgent);
                await TestCondition.setAgentSkillsToDefault(obEmailAgent, SkillType.OB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(obEmailAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});