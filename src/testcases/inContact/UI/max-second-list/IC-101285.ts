import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { EmailMode } from "@data-objects/inContact/max/email/email-info";
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
 * TC ID: 249443
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 * Bug: IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)
 */

describe("MAX suite - IC-101285", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let emailJson = `{"interruptible":true,"minWorkingTime": 30}`;
    let phoneJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let ibPhoneNotReqAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let callContactId: number;
    let maxCall: MaxCall;
    let activeContactsPage: ActiveContactsPage;
    let maxDispositionPage: MaxDispositionPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101285 - MAX > Email > Inbound email interrupted by call - disposition email`);
        ibEmailPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, true, null, emailJson);
        await TestCondition.setUpAndAssignSkill(ibEmailPhoneAgent, SkillType.IB_Phone, null, null, phoneJson);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, phoneJson);

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailPhoneAgent, SkillType.IB_EMAIL);

        // Login Incontact
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailPhoneAgent);
        pageBase = new PageBase();
        homeWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-101285 - Inbound email interrupted by call - disposition email', async () => {

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
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver in Agent");

        // 5. Verify Email Routes to agent
        // VP: Email window opens and the display mode is read.
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The display mode isn't read");

        // 6. Launch IB Phone
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_Phone), false);

        // VP: Verify the Agent gets interrupted and IB phone is delivered.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Agent doesn't get interrupted");
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "IB phone isn't delivered");

        // 7. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it.
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (IB Email and IB Phone) Verify the States for each contact:IB Phone: Active, IB Email: Interrupted 
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (IB Phone) with States contact: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (IB Email) with States for contact: Interrupted");

        // 8. IB Phone call ends
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxCall.clickEndContactButton();
        maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
        await maxEmailPage.waitForEmailWorkspace();

        // VP: Phone call ends and the Agent displays the IB Email items. Verify the email continues on read mode.
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Phone call doesn't end");
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The Agent doesn't display the IB Email items");
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "Email isn't on read mode");

        // 9. Click on "End Email" button
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Verify after to accept in the pop up displays the Disposition Dialog is displayed.
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition Dialog is not displayed");

        // 10. Select a Disposition and save the changes
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1);

        // VP: Verify the email ends and the agent is in available status
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "The email doesn't end");
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
                await TestCondition.setAgentSkillsToDefault(ibEmailPhoneAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(ibEmailPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});