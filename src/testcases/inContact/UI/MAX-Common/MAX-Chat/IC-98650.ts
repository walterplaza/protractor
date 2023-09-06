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
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: Max-Common > MAX-Chat
 * TC ID: IC-98650
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('Max-Common > MAX-Chat - IC-98650', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chatSessionID: string;
    let response: APIResponse;
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
        await Logger.write(FunctionType.TESTCASE, `IC-98650 - Generate chat with MAX window maximized`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-98650 - Generate chat with MAX window maximized', async () => {

        
        // Pre-Condintion: 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Pre-Condintion: 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        let maxSizeBeforeMaximize: ISize = await BrowserWrapper.getSize();
        await Logger.write("maxSizeBeforeMaximize: ", `${maxSizeBeforeMaximize.height} and ${maxSizeBeforeMaximize.width}`);
               

        // 1. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // 2. Generate chat to agent
        response = await TestHelpers.startChatContact(chatAgent);
        chatSessionID = await TestHelpers.getChatSessionID(response);

        // VP: Agent is offered chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 3. Click Accept
        maxChatPage = await maxPage.acceptNewChatContact();

        let maxSizeAfterAcceptingFirstChat: ISize = await BrowserWrapper.getSize();
        await Logger.write("maxSizeAfterAccepting: ", `${maxSizeAfterAcceptingFirstChat.height} and ${maxSizeAfterAcceptingFirstChat.width}`);

  
        // VP: Agent is now chatting with customer
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // Agents sends text
        await maxChatPage.sendAgentMessage(agentMessage1);

        //VP: Agent message isdisplayed
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage1)).toBe(true, "The Agent text label is not 'Me'");

        // Clients send message to agent
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);

        //VP: Agent receive client's message
        expect(await maxChatPage.isChatMessageDisplayed(await maxChatPage.getlblCustomerContactTitle(), clientMessage1)).toBe(true, "The customer text label is not the Customer name or the client message is wrong");

        // Maximize MAX window
        await BrowserWrapper.maximize()
        let maxSizeAfterMaximizeDuringFirstChatProcess: ISize = await BrowserWrapper.getSize();
        await Logger.write("maxSizeAfterMaximizeDuringFirstChatProcess: ", `${maxSizeAfterMaximizeDuringFirstChatProcess.height} and ${maxSizeAfterMaximizeDuringFirstChatProcess.width}`);
        expect(maxSizeAfterMaximizeDuringFirstChatProcess.height).toBeGreaterThan(maxSizeBeforeMaximize.height,"MAX height is not correct after maximizing");
        expect(maxSizeAfterMaximizeDuringFirstChatProcess.width).toBeGreaterThan(maxSizeBeforeMaximize.width,"MAX width is not the maximized size");

      
        // End chat contact
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

        // Agent ends chat
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat working space is still displayed");

        let maxSizeAfterFirstChatEnds: ISize = await BrowserWrapper.getSize();
        await Logger.write("maxSizeAfterFirstChatEnds: ", `${maxSizeAfterFirstChatEnds.height} and ${maxSizeAfterFirstChatEnds.width}`);

        expect(maxPage.isMAXStateDisplayed(MaxState.AVAILABLE)).toBe(true, "MAX state is not set to AVAILABLE");

        // Route chat to Agent
        response = await TestHelpers.startChatContact(chatAgent);
        chatSessionID = await TestHelpers.getChatSessionID(response);

        // VP: Agent is offered second chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // Accept New contact
        maxChatPage = await maxPage.acceptNewChatContact();

        let maxSizeAfterAcceptingSecondChat: ISize = await BrowserWrapper.getSize();
        await Logger.write("maxSizeAfterAcceptingSecondChat: ", `${maxSizeAfterAcceptingSecondChat.height} and ${maxSizeAfterAcceptingSecondChat.width}`);
        
  
        // VP: Agent is now chatting with customer
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Second Chat working space isn't displayed");

        // Agents sends text
        await maxChatPage.sendAgentMessage(agentMessage1);

        //VP: Agent message isdisplayed
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage1)).toBe(true, "The Agent text label is not 'Me'");

        // Clients send message to agent
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);

        //VP: Agent receive client's message
        expect(await maxChatPage.isChatMessageDisplayed(await maxChatPage.getlblCustomerContactTitle(), clientMessage1)).toBe(true, "The customer text label is not the Customer name");

        let maxSizeAfterSecondChatIsWorking: ISize = await BrowserWrapper.getSize();
        await Logger.write(FunctionType.NONE, `${maxSizeAfterSecondChatIsWorking.height} and ${maxSizeAfterSecondChatIsWorking.width}`);
        expect(maxSizeAfterSecondChatIsWorking.height).toBe(maxSizeAfterMaximizeDuringFirstChatProcess.height,"MAX height is not the maximized size in the second chat");
        expect(maxSizeAfterSecondChatIsWorking.width).toBe(maxSizeAfterMaximizeDuringFirstChatProcess.width,"MAX width is not the maximized size in the second chat");
        
        // Clean up
        // End chat contact
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

        // Agent ends chat
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat working space is still displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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



