import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE test
 * TC ID: 434630
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("SMOKE Test - IC-62718", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62718 - Check MAX working`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62718 - Check MAX working', async () => {

        loginPage = LoginPage.getInstance();

        // 1. IC Central login.
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX.
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // VP: Check MAX exist.
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX is not existed");

        // 3. Set MAX agent state "Available".
        await maxPage.changeState(MaxState.AVAILABLE)

        // VP: Status change to Available
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // Log out max and central pages
        centralPage = await maxPage.logOut();
        await centralPage.logOut();
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});