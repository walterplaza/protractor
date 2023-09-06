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
import PageBase from "@page-objects/page-base";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 389440
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62632', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let agent: string = "Agent";
    let client: string = "Client";
    let clientMessage1: string = Utility.createRandomString(10);
    let agentMessage1: string = Utility.createRandomString(10);
    let clientName: string = Utility.createRandomString(5);

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let pageBase: PageBase;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxHandleWindow: string;
    let response: APIResponse;
    let chatSessionID: string;
    let copiedText: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62632 - MAX Cannot select text in UI to copy and paste from chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62632 - MAX Cannot select text in UI to copy and paste from chat', async () => {

        // inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        pageBase = new PageBase();
        let centralHandleWindow: string = await pageBase.getCurrentWindowHandle();

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        maxHandleWindow = await pageBase.getCurrentWindowHandle();

        // 2. Spawn an IB chat.
        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // Accept New contact
        response = await TestHelpers.startChatContact(chatAgent);

        await maxPage.waitForNewContactPopUp();
        chatSessionID = await CustomAPIs.getChatSessionID(response);
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The chat is created and accepted 
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "The chat isn't created and accepted");

        // 3. Create a number of back and forth chats between the agent and client.
        await CustomAPIs.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);
        await maxChatPage.sendAgentMessage(agentMessage1);

        // VP: conversation shows on both the client and the Agent
        expect(await maxChatPage.isChatConversationBubbleMatched(client)).toBe(true, "The UI doesn't match the mockup");
        expect(await maxChatPage.isChatConversationBubbleMatched(agent)).toBe(true, "The UI doesn't match the mockup")

        // 4. On the agent, highlight the text in the conversation
        await maxChatPage.highlightChatConversation(client);

        // VP: Highlighted
        expect(await pageBase.isSelectedTextHighlight(clientMessage1)).toBe(true, "The selected test isn't highlighted");

        // 5. Click the focus away from the agent window
        await pageBase.switchWindowByHandle(centralHandleWindow);
        expect(await centralPage.isPageDisplayed()).toBe(true, "Central is focused");

        // 6. Click to refocus the agent by clicking the bar at the top of the agent window.
        await pageBase.switchWindowByHandle(maxHandleWindow);

        // VP: See the highlighted text is still highlighted.
        expect(await pageBase.isSelectedTextHighlight(clientMessage1)).toBe(true, "See the highlighted text isn't still highlighted.")

        // 7. Right click on the highlighted text, when the menu opens click Copy
        await pageBase.copySelectedText();
        copiedText = await pageBase.getClipboardContent();

        // VP: Menu allows Copying of highlighted text
        expect(copiedText).toBe(clientMessage1, "Menu doesn't allow Copying of highlighted text")

        // 8. Attempt to paste the highlighted text in both a word pad/notepad page and in Microsoft Word page.
        await maxChatPage.pasteTextIntoChatBox();

        // VP: Pastes into each without issue. Actual text isn't lost.
        expect(await maxChatPage.getChatContentTextBox()).toBe(clientMessage1, "Actual text is lost.")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // End chat contact
            maxPage = await maxChatPage.endChatContact();

            // Log out central
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});
