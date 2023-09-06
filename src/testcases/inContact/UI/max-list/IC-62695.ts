import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 103030
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62695", function () {
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let dispositionNote: string = "Test Automation";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChat: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62695 - MAX > Chat Interactions > ACW > After ending chat, agent state should be ACW disposition`);
        chatReqAgent = await TestCondition.setUpAgent(SkillType.CHAT, false, true);

        // Start a chat
        await TestHelpers.startChatContact(chatReqAgent);

        // Login to Central
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatReqAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatReqAgent.phoneNumber);

        // Login to New Agent with a valid credential
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.acceptNewChatContact();
        maxChat = await maxPage.waitForChatWorkspace();
    }, TestRunInfo.conditionTimeout);

    it('IC-62695 - MAX Chat Interactions ACW After ending chat agent state should be ACW disposition', async () => {

        // 1. Click on End button
        maxDispositionPage = await maxChat.endChatRequireDisposition();

        // VP: After ending chat, agent state should be changed to ACW disposition
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.UNAVAILABLE, "Agent state is not changed to Unavailable");
        expect(await maxPage.getOutStateStatus()).toMatch(MaxState.ACW, "Agent state is not changed to ACW disposition");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatReqAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});