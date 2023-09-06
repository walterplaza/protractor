import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437365
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC01
 */

describe('MAX suite - IC-62593', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62593 - Max Set Available`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62593 - Max Set Available', async () => {
        // inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Verify the status is available
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "Agent status doesn't change to Available");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.VOICEMAIL);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});



