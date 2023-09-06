import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
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
 * TC ID: 374617 (Question 165)
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 * Failed by ticket IC-98284 - [TestAutomation][inC-UI] The chat message exceeds 80% of chat area
 */

describe('MAX suite - IC-101265', function () {
    let customerMessage: string = "MSGCustomer" + Utility.createRandomString(5);
    let agentMessage: string = "MSGAgent" + Utility.createRandomString(5);
    let clientName: string = Utility.createRandomString(5);
    let chatSessionID: string;

    // Declare Page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let response: APIResponse;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101265 - [Chat] Chat screens_Verify max width for both the agent and customer chat bubbles`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-101265 - Chat Chat screens_Verify max width for both the agent and customer chat bubbles', async () => {

        // 1. Login inContact Central and launch MAX agent
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Launch Patron chat
        response = await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        chatSessionID = await TestHelpers.getChatSessionID(response);

        // Accept chat contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // 3.1  User gets a message/ multiple messages from agent
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, customerMessage);

        // 3.2 User send a message/ multiple messages to agent
        await maxChatPage.sendAgentMessage(agentMessage);

        // VP: The chat messages (initials dot & message bubble) from both the agent and customer should not exceed 80% of the chat area (does not include the left and right padding in calculating the 80%)       
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("agent", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the agent exceeds 80% of the chat area");
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("client", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the customer exceeds 80% of the chat area");

        // 4.1 Stretches or shrinks chat area
        await maxChatPage.resizeMaxByDropAndDrag(200, 0);

        // VP: As the size of the chat area stretches or shrinks, should adjust the chat messages accordingly.
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("agent", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the agent exceeds 80% of the chat area");
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("client", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the customer exceeds 80% of the chat area");

        // 4.1 Stretches or shrinks chat area
        await maxChatPage.resizeMaxByDropAndDrag(-500, 0);

        // VP: As the size of the chat area stretches or shrinks, should adjust the chat messages accordingly.
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("agent", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the agent exceeds 80% of the chat area");
        expect(await maxChatPage.isChatBubbleDisplayedInsideChat("client", 80)).toBe(true, "The chat messages (initials dot & message bubble) from the customer exceeds 80% of the chat area");

        // Post-condition
        await maxChatPage.endChatContact();
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



