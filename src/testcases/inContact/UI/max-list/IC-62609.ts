import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 415162
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62609', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62609 - [MAX] The omni workspaces do not correctly position accept/reject contact window. Chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        // Start a chat
        await TestHelpers.startChatContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62609 - The omni workspaces do not correctly position accept/reject contact window. Chat', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Get location of workspace and contact popup
        expect(await (maxPage.checkPositionWorkspaceContactPopup())).toBe(true, "Workspaces do not appear correctly")

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            maxChatPage = await maxPage.acceptNewChatContact();
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) {
        } finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});



