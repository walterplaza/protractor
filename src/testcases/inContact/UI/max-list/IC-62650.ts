import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 344442
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62650', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let clientMessage1: string = Utility.createRandomString(10);
    let agentMessage1: string = Utility.createRandomString(10);
    let clientName: string = Utility.createRandomString(5);
    let ownName: string = "Me";
    let agent: string = "Agent";
    let client: string = "Client";
    let chatResponse: APIResponse;
    let chatSessionID: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62650 - MAX>Chat Interface>Updated bubble UI`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62650 - MAX Chat Interface Updated bubble UI', async () => {

        // 1. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Send a chat contact to your agent
        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // Accept New contact
        chatResponse = await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        chatSessionID = await CustomAPIs.getChatSessionID(chatResponse);
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The chat is created and accepted 
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "The chat isn't created and accepted");

        // 3. On the patron side send several messages
        await CustomAPIs.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);

        // VP: The messages are received
        expect(await maxChatPage.isChatMessageDisplayed(clientName, clientMessage1)).toBe(true, "The messages are not received");

        // 4. On the agent side send several messages
        await maxChatPage.sendAgentMessage(agentMessage1);

        // VP: The messages are sent
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage1)).toBe(true, "The messages are not sent");

        // 5. On the Chat UI confirm the conversation bubbles match the mockup
        // VP: The UI matches the mockup
        expect(await maxChatPage.isChatConversationBubbleMatched(client)).toBe(true, "The UI doesn't match the mockup");
        expect(await maxChatPage.isChatConversationBubbleMatched(agent)).toBe(true, "The UI doesn't match the mockup");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            maxPage = await maxChatPage.endChatContact();
            await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);
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
