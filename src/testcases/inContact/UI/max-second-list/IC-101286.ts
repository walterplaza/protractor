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
 * TC ID: 249406
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC18 
 */

describe("MAX suite - IC-101286", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let obEmailAgent: Agent;
    let ibPhoneNotReqAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let email: Email = new Email()
    let minWorkingTime: number = 60;
    let callContactId: number;
    let emailJson: string = `{"interruptible": true,"minWorkingTime":${minWorkingTime}}`;
    let phoneJson: string = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;

    // Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101286 - MAX > Email > Outbound email interrupted by call after minimum work time setting`);
        TestRunInfo.testTimeout = 700000;
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

    it('IC-101286 - MAX Email Outbound email interrupted by call after minimum work time setting', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obEmailAgent.phoneNumber);

        // 3. Click "New + button"> Outbound Email and select an ob email skill        
        maxEmailPage = await maxPage.openOBEmailWorkspace(email.toAddress);
        emailContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

        // VP: Email window opens and you can write on it
        // After that wait that the "Time Counter" available in "MAX" is > to the "Minimum Working Time" configured in requirement
        // In this case is 60 Seconds
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The OB Email Contact doesn't deliver in Agent");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "The email is not in edit mode");

        // 4. Launch the IB Phone contact in 40 Seconds        
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);

        // VP: Verify the IB Phone is in queue due the "Time Counter" is not equal to 60 seconds 
        await maxEmailPage.showMaxGlance();
        await maxEmailPage.waitForQueueValue(ContactLabel.INBOUND_PHONE, 1);
        expect(await maxEmailPage.isCallInQueueInTime(40)).toBe(true, "Call is not in queue in 40s");
        expect(await maxEmailPage.isCallInQueueInTime(minWorkingTime)).toBe(true, "Call is not in queue during Minimum Working Time");

        // 5. Time Counter = 60 +1 or the value configured in requirements for field: "Minimum Working Time" 
        maxCall = await maxEmailPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(obEmailAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: Verify the Agent gets interrupted and IB phone is delivered
        // Also verify the Email is parked
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Email is not interrupted");
        expect(await maxEmailPage.isEmailWorkSpaceHidden(TestRunInfo.shortTimeout)).toBe(true, "Email is not parked");

        // 6. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (OB Email and IB Phone) 
        // Verify the States for each contact:IB Phone: Active, OB Email: Interrupted
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (IB Phone) with States contact: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (OB Email) with States for contact: Interrupted");

        // Clean up Call and Email contacts
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.endCallContact();
        await maxEmailPage.waitForEmailWorkspace();
        maxPage = await maxEmailPage.endEmailContact(false);
        await maxPage.waitForQueueValue(ContactLabel.OUTBOUND_EMAIL, 0);
    }, 700000);

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