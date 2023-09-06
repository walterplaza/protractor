import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
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
import { ISize } from "selenium-webdriver";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 410301
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62611', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let clientMessage1: string = Utility.createRandomString(10);
    let clientMessage2: string = Utility.createRandomString(10);
    let clientMessage3: string = Utility.createRandomString(10);
    let agentMessage1: string = Utility.createRandomString(10);
    let agentMessage2: string = Utility.createRandomString(10);
    let agentMessage3: string = Utility.createRandomString(10);
    let clientName: string = Utility.createRandomString(5);
    let response1: APIResponse;
    let chatContactId1: number;
    let chatSessionID: string;
    let response2: APIResponse;
    let chatContactId2: number;
    let chatSessionID2: string;
    let response3: APIResponse;
    let chatContactId3: number;
    let chatSessionID3: string;
    let maxSize: ISize;
    let currentMaxSize: ISize;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62611 - [MAX] Randomly resizes when handling multiple chats and you reply back`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change Agent state to available 
        await maxPage.changeState(MaxState.AVAILABLE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62611 - MAX Randomly resizes when handling multiple chats and you reply back', async () => {

        // Start a chat
        response1 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = TestHelpers.getContactID(response1);
        await maxPage.waitForNewContactPopUp();
        chatSessionID = await TestHelpers.getChatSessionID(response1);

        // VP: Chats Are visible.
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // Accept a chat
        maxChatPage = await maxPage.acceptNewChatContact();

        // Start a chat
        response2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId2 = TestHelpers.getContactID(response2);
        await maxPage.waitForNewContactPopUp();
        chatSessionID2 = await TestHelpers.getChatSessionID(response2);

        // VP: Chats Are visible.
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // Accept a chat
        await maxPage.acceptNewChatContact();

        // Start a chat
        response3 = await TestHelpers.startChatContact(chatAgent);
        chatContactId3 = TestHelpers.getContactID(response3);
        await maxPage.waitForNewContactPopUp();
        chatSessionID3 = await TestHelpers.getChatSessionID(response3);

        // VP: Chats Are visible.
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // Accept a chat
        await maxPage.acceptNewChatContact();

        // Get size of MAX before send a message
        maxSize = await maxPage.getPageSize();

        // 3. Begin conversations with each chat. Have at least 2 chats each direction (OB and IB) for each contact.
        // Send a message
        await maxChatPage.clickToChatClient(chatContactId1.toString());
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);
        await maxChatPage.sendAgentMessage(agentMessage1);

        // Send a message
        await maxChatPage.clickToChatClient(chatContactId2.toString());
        await TestHelpers.sendChat(chatAgent, chatSessionID2, clientName, clientMessage2);
        await maxChatPage.sendAgentMessage(agentMessage2);

        // Send a message
        await maxChatPage.clickToChatClient(chatContactId3.toString());
        await TestHelpers.sendChat(chatAgent, chatSessionID3, clientName, clientMessage3);
        await maxChatPage.sendAgentMessage(agentMessage3);

        // Get size of MAX after send a message
        currentMaxSize = await maxPage.getPageSize();

        // VP: Agent page does not return to original size.
        expect(await maxPage.isMaxSizeChanged(maxSize, currentMaxSize)).toBe(false, "Agent page is return to original size.");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out central
            await maxChatPage.endSpecifiedChatWithContactId(chatContactId3.toString());
            await maxChatPage.clickToChatClient(chatContactId2.toString());
            await maxChatPage.endSpecifiedChatWithContactId(chatContactId2.toString());
            await maxChatPage.clickToChatClient(chatContactId1.toString());
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



