import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 335412
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62654', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let response: APIResponse;
    let chatSessionID: string;
    let clientMessage1: string = Utility.createRandomString(10);
    let clientMessage2: string = Utility.createRandomString(10);
    let agentMessage1: string = Utility.createRandomString(10);
    let agentMessage2: string = Utility.createRandomString(10);
    let clientName: string = Utility.createRandomString(5);
    let agentName: string = "Agent";
    let ownName: string = "Me";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62654 - [MAX] Chat UI update TC`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('IC-62654 - MAX Chat UI update TC', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX.
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3 .Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4.Route chat to agent.
        response = await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        chatSessionID = await TestHelpers.getChatSessionID(response);
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);

        // VP: Agent is offered chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // 5. Accept New contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Agent is now chatting with customer
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // VP: The customer, if a label is set, has their name set as the message sender
        expect(await maxChatPage.isChatMessageDisplayed(clientName, clientMessage1)).toBe(true, "Their name is not set as the message sender");

        // 6. Send a new chat message
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage2);

        // VP: Whenever a message is received the customer, a marker indicating the earliest point at which unread messages begin is shown correctly.
        expect(await maxChatPage.isUnreadMarkerDisplayed()).toBe(true, "Unread messages begin is not shown correctly");

        // 7. Send Agent message
        await maxChatPage.sendAgentMessage(agentMessage1);

        // VP: The marker disappears whenever the agent sends a message of their own
        expect(await maxChatPage.isUnreadMarkerHidden(TestRunInfo.shortTimeout)).toBe(true, "The marker is not disappeared whenever the agent sends a message of their own");

        // VP: The agent's sender label is "Me"
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage1)).toBe(true, "The agent's sender label is not 'Me'");

        // 8. Refresh MAX to force a reload of the chat history as a transcript.
        await maxChatPage.refreshMaxChatPage();

        // VP: The chat transcript is reloaded with the same messages, except that agent messages loaded from the transcript say "Agent" instead of "Me" as the sender.
        expect(await maxChatPage.isChatMessageDisplayed(clientName, clientMessage1)).toBe(true, "The chat transcript is not reloaded with the same messages");
        expect(await maxChatPage.isChatMessageDisplayed(clientName, clientMessage2)).toBe(true, "The chat transcript is not reloaded with the same messages");
        expect(await maxChatPage.isChatMessageDisplayed(agentName, agentMessage1)).toBe(true, "Agent messages loaded from the transcript say 'Me' instead of 'Agent' as the sender");

        // 9. Type some more messages from both sides of the chat, and observe specifically the chat sender names.
        await maxChatPage.sendAgentMessage(agentMessage2);

        // VP: New messages sent from the agent after the refresh garner the "Me" label.
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage2)).toBe(true, "New messages sent from the agent after the refresh page is not 'Me'");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out central
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



