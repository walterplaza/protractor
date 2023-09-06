import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { EmailButtonTitle, EmailMode } from "@data-objects/inContact/max/email/email-info";
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
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249403
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18 
 */

describe("MAX suite - IC-101287", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let emailContent: string = Utility.createRandomString(15);
    let emailJson = `{"interruptible":true,"minWorkingTime":30}`;
    let phoneJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxWindowHandle: string;
    let emailContactId: number;
    let callContactId: number;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101287 - MAX > Email > Inbound email interrupted by call - save reply draft progress, discard`);

        // 1. Pre-condition
        // Setup agent: Agent has an IB Email and IB Phone skills configured
        ibEmailPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailPhoneAgent, SkillType.IB_Phone, null, null, phoneJson);
        await ibEmailPhoneAgent.createPhoneNumber();

        // Setup email
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailPhoneAgent, SkillType.IB_EMAIL);

        // Login Incontact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailPhoneAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101287 - MAX Email Inbound email interrupted by call - save reply draft progress, discard', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailPhoneAgent.phoneNumber);

        // 3. Send an inbound email to your configured POC (Basic Email No Attachments)
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Email is sent
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "Email contact is not in queue");

        // 4. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");

        // 5. Verify Email Routes to agent
        // VP: Email window opens and the display mode is read.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");

        // 6. Click Reply
        await maxEmailPage.selectEmailButton(EmailButtonTitle.REPLY);

        // VP: Reply email workspace opens and it is possible to edit the email
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");

        // 7. Enter text in reply body       
        await maxEmailPage.enterEmailBody(emailContent, true);

        // VP: Reply response populated into reply body After that wait that the "Time Counter" available in "MAX" is > to the "Minimum Working Time" configured in requirement In this case is 30 Seconds. 
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "Reply response doesn't populate into reply body");
        
        // 8. Launch the IB Phone contact        
        await TestHelpers.startInboundCall(ibEmailPhoneAgent);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_Phone), false);

        // VP: Verify the Agent gets interrupted and IB phone is delivered.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Agent doesn't get interrupted");
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "IB Phone workspace does not display");

        // 9. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it.
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (IB Email and IB Phone) Verify the States for each contact:IB Phone: Active, IB Email: Interrupted 
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report about the IB Phone contact is not Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report about the IB Email contact is not Interrupted");

        // 10. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.clickEndContactButton();
        maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Phone call ends and the Agent displays the IB Email items.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Phone call doesn't end");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace does not display");

        // VP: Verify the email continues on edit mode and the text entered in reply body is continue to displayed and it is not lost.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.EDIT, "Email is not in edit mode");
        expect(await maxEmailPage.getEmailContentInEditMode()).toBe(emailContent, "The added text in email content is lost after ending interrupted call");

        // 11. Click on "Discard Draft" button
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxEmailPage.discardEmailDraft();

        // VP: Verify the text entered in reply body is lost and the Email window is in mode to read.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email is not in read mode");
        expect(await maxEmailPage.getEmailContentInReadMode() != `${emailContent}`).toBe(true, "The text entered in reply body is not lost");

        // 12. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it.
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the States for the IB Email contact is Active
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report about the IB Email contact is not Active");

        // VP: Verify the report contains the 1 contact (IB Email)        
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId)).toBe(false, "The IB Phone contact still exists on the report");

        // 13. Click on "End Email" button
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxEmailPage.endEmailContact(false);

        // VP: Verify the Email is closed and the Agent is in available status.                
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace is still displayed")
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");
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

                // Remove skills
                await TestCondition.setUpAndRemoveSkill(ibEmailPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailPhoneAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});