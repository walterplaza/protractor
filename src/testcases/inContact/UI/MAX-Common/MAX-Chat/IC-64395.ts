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

/** 
 * Type: inContact
 * Suite: Max-Common > MAX-Chat
 * TC ID: IC-64395
 * Tested browser: Chrome, Firefox, IE
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('Max-Common > MAX-Chat - IC-64395', function () {
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
        await Logger.write(FunctionType.TESTCASE, `IC-64395 - Verify chat function`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-64395 - Verify chat function', async () => {

        // Route chat to Agent
        response = await TestHelpers.startChatContact(chatAgent);
        chatSessionID = await TestHelpers.getChatSessionID(response);

        // inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Agent is offered chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // Accept New contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Agent is now chatting with customer
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // Validate chat workspace components
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Chat button isn't displayed");
        expect(await maxChatPage.isChatTimerDisplayed()).toBe(true, "Timer isn't displayed");
        expect(await maxChatPage.isChatStartTimerWithTimeDisplayed()).toBe(true, "Chat start time label with time isn't displayed");
        expect(await maxChatPage.isTextInputAreaDisplayed()).toBe(true, "Text input area isn't displayed");
        expect(await maxChatPage.isCustomerContactIconDisplayed()).toBe(true, "Customer contact icon isn't displayed");

        let SkillId: number = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
        let SkillName: string = await CustomAPIs.getSkillNameBySkillId(chatAgent, SkillId.toString());
        expect(await maxChatPage.isSkillInfoDisplayed(SkillName, SkillId)).toBe(true, "Skill info is not displayed");


        // Agents sends text
        await maxChatPage.sendAgentMessage(agentMessage1);

        //VP: Agent message isdisplayed
        expect(await maxChatPage.isChatMessageDisplayed(ownName, agentMessage1)).toBe(true, "The Agent text label is not 'Me'");

        // Clients send message to agent
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, clientMessage1);

        //VP: Agent receive client's message
        expect(await maxChatPage.isChatMessageDisplayed(await maxChatPage.getlblCustomerContactTitle(), clientMessage1)).toBe(true, "The customer text label is not the Customer name");

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



