import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
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
 * TC ID: 224847
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */
describe("MAX suite - IC-101298", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let customerMessage: string = "MSGCustomer" + Utility.createRandomString(5);
    let agentMessage: string = "MSGAgent" + Utility.createRandomString(5);
    let clientName: string = Utility.createRandomString(5);
    let chatSessionID: string;
    let chatContactId: number;
    let expectedSkill: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let response: APIResponse;

    //1. Precondition: 
    // Agent has Chat skill assigned. 
    // Skill is associated to a POC that has a Script.
    // MAX and Skill must not have linked with Quick Replies/ Panels/ Disposition/ Screen Pops, etc. 
    // If you perform this test in different browsers, keep in mind the controls, colors, labels and size must be the same in all browsers	

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101298 - [MAX][Chat] Generate a Chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
        let skillName: string = SkillCore.getSkillName(SkillType.CHAT);
        let skillID: number = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
        expectedSkill = `${skillName} (${skillID})`;
        loginPage = LoginPage.getInstance();

        centralPage = await loginPage.loginInContact(chatAgent);

        // Clean up quick reply and logout central
        await TestCondition.cleanUpQuickReply(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-101298 - MAX Chat Generate a Chat', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Change agent state to available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Max state is not changed to available");

        // 4. Spawn chat for agent
        response = await TestHelpers.startChatContact(chatAgent);
        chatSessionID = await TestHelpers.getChatSessionID(response);
        chatContactId = TestHelpers.getContactID(response);
        await maxPage.waitForNewContactPopUp();

        // VP: Agent is offered chat       
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New chat contact pop up isn't display");

        // 5. Agent clicks accept
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Agent is now chatting with customer
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // 6. Validate Chat workspace components Top displays contact information with 
        //VP: Customer Contact Card icon (or placeholder colored pawn)
        expect(await maxChatPage.isChatContactIconPositionedAtLeftSide(chatContactId.toString())).toBe(true, "Chat button is not positioned correctly");

        // VP: Skill name.
        expect(await maxChatPage.getSkillNameChatContact()).toBe(expectedSkill, "Skill name of chat contact is mismatch to expected");

        // VP: Time counter 
        expect(await maxChatPage.isChatTimeCounterDisplayed()).toBe(true, "Chat time counter isn't displayed");

        // VP: Bottom displays: Message text box input 
        expect(await maxChatPage.isMessageTextInputDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Chat input message area isn't displayed");

        // VP: Bottom displays: Label -- "Chat started <time to start the chat>
        expect(await maxChatPage.isChatStartTimeDisplayed()).toBe(true, "Chat start time label isn't displayed");

        // VP: Control buttons: Transfer, Launch, End Chat buttons.
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");

        // 7. Exchange some chats between the agent and the customer	
        await TestHelpers.sendChat(chatAgent, chatSessionID, clientName, customerMessage);
        await maxChatPage.sendAgentMessage(agentMessage);

        // VP: Messages are received fine 
        expect(await maxChatPage.isChatMessageDisplayed(clientName, customerMessage)).toBe(true, "Cannot sent message to Agent");
        expect(await maxChatPage.isChatMessageDisplayed("Me", agentMessage)).toBe(true, "Cannot sent message to Client");

        // 8. Agent ends chat	
        maxPage = await maxChatPage.endChatContact();

        // Chat is ended
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat workspace is still displayed");
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
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});