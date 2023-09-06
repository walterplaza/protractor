import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455032
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62578", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62578 - MAX> PC>Timer for ACW is not visible (countdown) - Agent Unavailable State is not happening`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, true);

        // Start a ib phone
        await TestHelpers.startInboundCall(ibPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62578 - MAX PC Timer for ACW is not visible countdown Agent Unavailable State is not happening', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2. Launch MAX
        let maxPage: MaxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // 3. Using the PC skill setup in step one change your agent to that skill 
        // 4. Accept/connect one pc call 
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: MAX is running the PC skill and calls are presented 
        // VP: the call is connected
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.WORKING, "MAX is not running the PC skill and calls is not presented");
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(true, "The call is not connected");

        // 5. End the call
        await maxCall.hangUpCallACW();

        // VP: The call contact was ended 
        expect(await maxCall.isEndButtonDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The call contact is not ended");

        // 6. Confirm there is a ACW countdown timer in the upper right 
        // VP: the ACW countdown timer is shown correctly
        expect(await maxPage.isACWTimerCountCorrectly()).toBe(true, "the ACW countdown timer is not shown correctly");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            await maxPage.waitACWDisappear();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});