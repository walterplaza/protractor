import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
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
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 383672
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 * Bug: IC-93092 [TestAutomation][inC-UI] Reconnected popup with "Connection re-established" is displayed when a chat contact exceeded timeout
 */

describe('MAX suite - IC-62636', function () {
    let customerMessage1: string = "MSG1Customer" + Utility.createRandomString(5);
    let customerMessage2: string = "MSG2Customer" + Utility.createRandomString(5);
    let agentMessage1: string = "MSG1Agent" + Utility.createRandomString(5);
    let agentMessage2: string = "MSG2Agent" + Utility.createRandomString(5);
    let clientName: string = Utility.createRandomString(5);
    let agentName: string = "Me";
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
        await Logger.write(FunctionType.TESTCASE, `IC-62636 - [MAX] Omnichannel - Continue chatting after changing ADA configuration`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62636 - MAX Omnichannel Continue chatting after changing ADA configuration', async () => {
        // 1-3.. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 4. Enable BU setting
        // 5. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3 .Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 6. Place a Chat contact 
        response = await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        chatSessionID = await CustomAPIs.getChatSessionID(response);

        // VP: Agent should be accepted 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up does not display");

        // Accept new contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The chat and should be up in a chat contact
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space does not displayed");

        // 7. Exchange some messages between agent and customer 
        await CustomAPIs.sendChat(chatAgent, chatSessionID, clientName, customerMessage1);
        await maxChatPage.sendAgentMessage(agentMessage1);

        // VP:Messages on chat should be sent on agent and customer side
        expect(await maxChatPage.isChatMessageDisplayed(clientName, customerMessage1)).toBe(true, "The chat transcript is not reloaded with the same messages");
        expect(await maxChatPage.isChatMessageDisplayed(agentName, agentMessage1)).toBe(true, "Agent messages loaded from the transcript say 'Me' instead of 'Agent' as the sender");

        // 8. Change ADA configuration(More>Settings>ADA High Contrast)
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxADASetting(State.ON, false);

        // VP: ADA conf was change from OFF to ON
        expect(await maxPage.getADAHighContrastStatus()).toBe("on", "High Contrast ADA mode is not correct");

        // Close more tool bar
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();

        // 9. Go to chat panel and continue sending messaged to customer side
        await CustomAPIs.sendChat(chatAgent, chatSessionID, clientName, customerMessage2);
        await maxChatPage.sendAgentMessage(agentMessage2);

        // VP: Agent should be able to continue sending messages to customer side
        expect(await maxChatPage.isChatMessageDisplayed(clientName, customerMessage2)).toBe(true, "The chat transcript is not reloaded with the same messages");
        expect(await maxChatPage.isChatMessageDisplayed(agentName, agentMessage2)).toBe(true, "Agent messages loaded from the transcript say 'Me' instead of 'Agent' as the sender");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await BrowserWrapper.switchWindowByTitle("inContact");
            await CustomAPIs.endAllContacts(chatAgent);
            centralPage = await CentralPage.getInstance();
            maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
            await maxPage.changeMaxADASetting(State.OFF, true);
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



