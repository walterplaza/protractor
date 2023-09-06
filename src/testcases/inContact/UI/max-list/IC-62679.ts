import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ContactState } from "@data-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-info";
import { EmailMode } from "@data-objects/inContact/max/email/email-info";
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
 * TC ID: 249405
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 * Bug: IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)
 */

describe("MAX suite - IC-62679", function () {

    TestBase.scheduleTestBase();
    let homeWindowHandle: string;
    let pageBase: PageBase;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;
    let ibPhoneNotReqAgent: Agent;
    let maxWindowHandle: string;
    let emailContactId: number;
    let minWorkingTime: number = TestRunInfo.timeout;
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
        await Logger.write(FunctionType.TESTCASE, `IC-62679 - MAX > Email > Inbound email interrupted by call after minimum work time setting`);
        ibEmailPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson);
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

    it('IC-62679 - MAX Email Inbound email interrupted by call after minimum work time setting', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailPhoneAgent.phoneNumber);

        // 3. Send an inbound email to your configured POC (Basic Email No Attachments)
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Email is sent
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "Email contact is not in queue");

        // 4. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        emailContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), false);

        // VP: Email is automatically delivered to Agent and Email windows is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver in Agent");

        // 5. Verify Email Routes to agent
        // VP: Email window opens and the display mode is read. 
        expect(await maxEmailPage.getEmailMode()).toBe(EmailMode.READ, "The display mode isn't read");

        // 6. Launch the IB Phone contact in 40 Seconds
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);

        // VP: Verify the IB Phone is in queue due the "Time Counter" is not equal to 60 seconds 
        await maxEmailPage.showMaxGlance();
        await maxEmailPage.waitForQueueValue(ContactLabel.INBOUND_PHONE, 1);
        expect(await maxEmailPage.isCallInQueueInTime(40)).toBe(true, "Call is not in queue in 40s");
        expect(await maxEmailPage.isCallInQueueInTime(minWorkingTime)).toBe(true, "Call is not in queue during Minimum Working Time");

        // 7. Time Counter = 60 +1 or the value configured in requirements for field:  "Minimum Working Time" 
        // After that wait that the "Time Counter" available in "MAX" is > to the "Minimum Working Time" configured in requirement In this case is 60 Seconds.
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();
        callContactId = await CustomAPIs.getCurrentContactId(ibEmailPhoneAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: Verify the Agent gets interrupted and IB phone is delivered. Also verify the Email is parked.
        expect(await maxEmailPage.isEmailInterruptedHeaderDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Agent doesn't get interrupted");
        expect(await maxEmailPage.isEmailWorkSpaceHidden(TestRunInfo.shortTimeout)).toBe(true, "IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25),The Email isn't parked");

        // 8. In Central go to Reporting/ Analytics> Canned Reports> Contact> Active Contacts and open/ execute it.
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(homeWindowHandle);
        activeContactsPage = await centralPage.gotoActiveContacts();
        await activeContactsPage.clickRun();

        // VP: Verify the report contains the 2 contact (IB Email and IB Phone) Verify the States for each contact:IB Phone: Active, IB Email: Interrupted 
        expect(await activeContactsPage.isActiveContactDisplayed(callContactId, ContactState.ACTIVE, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (IB Phone) with States contact: Active");
        expect(await activeContactsPage.isActiveContactDisplayed(emailContactId, ContactState.INTERRUPTED, TestRunInfo.shortTimeout)).toBe(true, "The report doesn't contain the contact (IB Email) with States for contact: Interrupted");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Clean up Call and Email contacts
            await pageBase.switchWindowByHandle(maxWindowHandle);
            await maxCall.clickEndContactButton();
            maxPage = await maxCall.clickConfirmEndContactButtonInterruptedEmail();
            await maxEmailPage.waitForEmailWorkspace();
            maxPage = await maxEmailPage.endEmailContact(false);
            await maxPage.waitForQueueValue(ContactLabel.INBOUND_EMAIL, 0);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibEmailPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibEmailPhoneAgent, SkillType.IB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});