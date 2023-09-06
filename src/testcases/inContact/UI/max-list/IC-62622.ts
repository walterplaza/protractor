import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: IC-62622
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3, SC10, HC25
 */

describe("MAX suite - IC-62622", function () {

    TestBase.scheduleTestBase();
    let serverMail: string;
    let acwTimeOut: number = 3;
    let emailJson: string = `{"maxSecondsACW":${acwTimeOut}}`;
    let ibMail: InboundEmail;
    let ibEmailNonReqAgent: Agent;

    //Declare page object
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;
    let maxDispositionPage: MaxDispositionPage;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62622 - Max Contacts get stuck in acw state - Email -  Non-Required Dispo - Allow to timeout without Dispo`);
        ibEmailNonReqAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, false, true, emailJson);
        pageBase = new PageBase();

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailNonReqAgent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it("IC-62622 - Max Contacts get stuck in acw state Email Non Required Dispo Allow to timeout without Dispo", async () => {

        // 1. PREREQ: User logged into Central. Max running and Available with Email Skill that has Non-Required Disposition (Max Time Limit = 3 seconds)

        // Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailNonReqAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailNonReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Run an inbound Email Contact       
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Contact is delivered to MAX
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "MAX does not open email");

        // 3. Allow contact to close
        await maxEmailPage.endEmailInParkedMode(false);

        // VP: Disposition window opens
        maxDispositionPage = new MaxDispositionPage();
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Disposition window does not open");

        // 4. Do not do anything with the Disposition. Allow Dispo to time out for 3 seconds.
        await pageBase.waitInSecond(acwTimeOut);

        // VP: Connection window closes. Agent returns to Available
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.EMAIL, TestRunInfo.shortTimeout);
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Max Contacts get stuck in acw state");
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "Agent does not return to Available");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            await maxPage.logOut();

            // Logout central
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailNonReqAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});