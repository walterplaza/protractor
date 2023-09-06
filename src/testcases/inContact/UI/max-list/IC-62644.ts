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
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369351
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */


describe('MAX suite - IC-62644', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let chatContactId1: number;
    let chatResponse1: APIResponse;
    let chatContactId2: number;
    let chatResponse2: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62644 - MAX > Multi-Chat reject chat`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // Pre-condition
        chatResponse1 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = CustomAPIs.getContactID(chatResponse1);
    }, TestRunInfo.conditionTimeout);

    it('IC-62644 - MAX Multi Chat reject chat', async () => {

        // 2. Launch MAX Agent
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(chatAgent);
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. change state to available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Agent should be offered the chat with the option to accept or reject
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "Agent isn't offered the chat with the option to accept or reject");

        // 4. Accept Chat
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Chat is accepted
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // 5. Initiate second chat
        chatResponse2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId2 = CustomAPIs.getContactID(chatResponse2);

        // VP: Chat is offered to the agent
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(true, "Chat isn't offered to the agent");

        // 6. press reject on the chat
        await maxChatPage.rejectNewChatContact();

        // VP: chat is not accepted
        expect(await maxChatPage.isChatActive(chatContactId2.toString(), TestRunInfo.shortTimeout)).toBe(false, "chat is accepted");

        // VP: First chat is display and agent's next state is set to be 'Refused'
        expect(await maxChatPage.isChatActive(chatContactId1.toString())).toBe(true, "First chat isn't display")
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");
        expect(await maxChatPage.getMAXNextOutState()).toBe(MaxState.REFUSED, "Agent's next state isn't set to be 'Refused'");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // End first chat
            maxPage = await maxChatPage.endChatContact();

            // Accept and end second chat
            await maxPage.changeState(MaxState.AVAILABLE);
            maxChatPage = await maxPage.acceptNewChatContact();
            maxPage = await maxChatPage.endChatContact();

            // Log out
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



