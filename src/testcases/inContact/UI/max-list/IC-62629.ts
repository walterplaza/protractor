import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392866
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe("MAX suite - IC-62629", function () {
    TestBase.scheduleTestBase();
    let ibEmailAgent: Agent;
    let dispositionNote: string = "Test Automation";
    let serverMail: string;
    let ibMail: InboundEmail;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62629 - Max Contacts get stuck in acw state - Email - Required Dispo.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, true)

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62629 - Max Contacts get stuck in acw state Email Required Dispo', async () => {

        // 1. Launch MAX and set agent state to available
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Run an inbound Email Contact.
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        ibMail = new InboundEmail();
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        // Wait for email workspace was display
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Check email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed");

        // 3. Close the contact
        maxDispositionPage = await maxEmailPage.endEmailWithDisposition();

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // 4. Select and save a Disposition
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Check email workspace is not displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL, TestRunInfo.shortTimeout)).toBe(false, "Max Contacts get stuck in acw state");

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