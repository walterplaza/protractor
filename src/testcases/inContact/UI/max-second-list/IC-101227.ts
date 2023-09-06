import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
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
 * TC ID: 455882
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 * Bug: IC-40243 [TestAutomation][inC-UI] IB Phone takes long time to interrupt IB or OB Email (HC25)
 */

describe("MAX suite - IC-101227", function () {

    TestBase.scheduleTestBase();

    // Set test case time out due to test case need to 15 minute to leave contact.
    TestRunInfo.testTimeout = 1300000;

    let homeWindowHandle: string;
    let emailJson = `{"interruptible": true,"minWorkingTime":30}`;
    let phoneJson = `{"initialPriority":5,"acceleration":10,"maxPriority":100}`;
    let serverMail: string;
    let ibMail: InboundEmail;
    let ibEmailPhoneAgent: Agent;

    // Declare page object
    let pageBase: PageBase;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let ibPhoneNotReqAgent: Agent;
    let maxWindowHandle: string;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101227 - MAX>>SCH> Email>Verify the Email work space doesn't split after remove the focus on it and return on it.`);
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

    it('IC-101227 - MAX SCH Email Verify the Email work space does not split after remove the focus on it and return on it', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailPhoneAgent.phoneNumber);
        maxWindowHandle = await pageBase.getCurrentWindowHandle();

        // 3. Change your MAX Status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, 'MAX has the "Available" state');

        // 4. Generate the "Ib Email" contact
        await Utility.sendIBEmail(serverMail, ibMail);

        // VP: Verify the Email contact has been delivered in MAX
        maxEmailPage = await maxPage.waitForEmailWorkspace();
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The IB Email Contact doesn't deliver in Agent");

        // 5. Generate the Ib Phone or Ib Chat contact
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();

        // VP: Verify the Phone or Chat contact has been delivered in MAX and now the focus is in this contact
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "IB phone isn't delivered");

        // 6. Leave the focus on the Phone or Chat contact for more than 15 minutes. Return on it 
        await Logger.write(FunctionType.UI, `Leaving the focus on the Phone or Chat contact for more than 15 minutes.`);
        await pageBase.switchWindowByHandle(homeWindowHandle);
        await pageBase.waitInSecond(900);
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxPage.showMaxGlance();
        await maxPage.showContactWorkSpace(ContactName.EMAIL);

        // VP: The email work space doesn't split after remove focus and return on email contact.
        expect(await maxEmailPage.isEmailWorkSpaceNotSplit(TestRunInfo.shortTimeout)).toBe(true, "The email work space split two or more sessions after remove focus and return on it.")

        // 7. Hit F5 or right click and refresh
        await pageBase.refreshPage();

        // Max page has been refresh
        expect(await maxPage.isMaxPageRefresh(TestRunInfo.shortTimeout * 2)).toBe(true, "Max page hasn't been refresh");

        // The email work space doesn't split refresh MAX
        await maxPage.showMaxGlance();
        await maxPage.showContactWorkSpace(ContactName.EMAIL);
        expect(await maxEmailPage.isEmailWorkSpaceNotSplit(TestRunInfo.shortTimeout)).toBe(true, "The email work space split two or more sessions after remove focus and return on it.")
    }, 1300000);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxPage.showContactWorkSpace(ContactName.PHONE_CALL);
            await maxCall.endCallContact();
            await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL);
            await maxEmailPage.endEmailContact();
            await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL);
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