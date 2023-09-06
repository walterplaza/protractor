import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";


/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 416400
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62607", function () {
    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let ibMail = new InboundEmail();
    let serverMail: string = cluster.getURL(PageName.SERVER_MAIL);

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62607 - MAX> Accept reject border is transparent.`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL)
    }, TestRunInfo.conditionTimeout);

    it('IC-62607 - Accept reject border is transparent', async () => {

        //1. Central Login 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 3. Place agent state to unavailable
        await maxPage.changeState(MaxState.UNAVAILABLE);

        // VP: Agent state unavailable
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unavailable");

        // 4. Send ib email to address From the email POC in the requirements
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        //5. Change to Available to receive ibEmail
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP Accept reject border is transparent
        expect(await maxEmailPage.isControlWithColorlessBorder(ContactName.WORK_ITEM, TestRunInfo.shortTimeout)).toBe(false, "Accept reject border is transparent");

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // Post-Condition
            maxPage = await maxEmailPage.endEmailContact(false);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();

        } catch (err) {
        } finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});