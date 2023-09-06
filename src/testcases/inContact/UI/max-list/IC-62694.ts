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
 * TC ID: 103033
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62694", function () {
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let agentState: string = "";
    let currentAgentState: string = "";
    let dispositionNote: string = "Test Automation";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChat: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62694 - MAX > Chat Interactions > ACW > After expiration of ACW time, agent state should be changed to next state`);
        chatReqAgent = await TestCondition.setUpAgent(SkillType.CHAT, true)

        // Start a chat
        await TestHelpers.startChatContact(chatReqAgent);

        // 1. Login to Central
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatReqAgent);

        // Login to MAX with a valid credential
        maxPage = await centralPage.launchMAX(chatReqAgent.phoneNumber);

        // POC associated to new agent
        // Unavailable code with after Contact work selected and associated to the disposition
        // Disposition assigned to the chat skill 
        // Chat in course between agent and patron
        await maxPage.changeState(MaxState.AVAILABLE);

        // Chat in course between agent and patron
        await maxPage.acceptNewChatContact();
        maxChat = await maxPage.waitForChatWorkspace();
    }, TestRunInfo.conditionTimeout);

    it('IC-62694 - MAX Chat Interactions ACW After expiration of ACW time agent state should be changed to next state', async () => {

        // 2. Click on End button
        maxDispositionPage = await maxChat.endChatRequireDisposition();

        // VP: ACW has not a expired time
        expect(await maxPage.isACWTimerCountDisplayed(TestRunInfo.shortTimeout)).toBe(false, "ACW timer is displayed");

        // Select a disposition and click on finish button 
        agentState = await maxPage.getAgentStatus();
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: The agent state should be changed to the next agent state 
        currentAgentState = await maxPage.getAgentStatus();
        expect(await maxPage.checkAgentStatusChanged(agentState, currentAgentState)).toBe(true, "The agent state is not changed to the next agent state");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
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