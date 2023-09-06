import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392874
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62626", function () {
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let acwTimeOut: number = 3;
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"maxSecondsACW":${acwTimeOut}}`;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62626 - Max Contacts get stuck in acw state - Email - Non-Required Dispo.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true, emailJson);

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62626 - Max Contacts get stuck in acw state Email NonRequired Dispo', async () => {

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // Initital data for IBEmail
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        ibMail = new InboundEmail();
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 2. Run an inbound Email Contact.
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Check email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // 3. Close the contact
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // 4. Do not do anything with the Disposition. Wait for disposition disappear
        await maxDispositionPage.waitForDispositionFormDisappear(TestRunInfo.longTimeout);

        // VP: Check email workspace is not displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Email workspace is still displayed")

        // VP: Check current agent status is available
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Current agent status is not available.");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // MAX logout
            centralPage = await maxPage.logOut();
            // Logout central page
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});