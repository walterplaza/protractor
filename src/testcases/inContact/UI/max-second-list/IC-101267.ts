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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 344991
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101267", function () {
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let chatContactId1: number;
    let chatContactId2: number;

    // Declare page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let response1: APIResponse;
    let response2: APIResponse;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101267 - MAX > Multi Chat > Chat Buttons Per Patron`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-101267 - MAX - Multi Chat - Chat Buttons Per Patron', async () => {
        // 1. Agent setup to accept multiple chats | A chat skill setup with POC | Auto reject timeout of <10s 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Send a chat contact to your agent
        response1 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = TestHelpers.getContactID(response1);

        // VP: The chat is created and accepted 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "Chat is not created");
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat is not accepted");

        // 4. Confirm a chat button is created for that contact 
        // VP: The chat button shows on the left of the multi chat pane 
        expect(await maxChatPage.isChatActive(chatContactId1.toString())).toBe(true, "Chat button is not created for that contact");
        expect(await maxChatPage.isChatContactIconPositionedAtLeftSide(chatContactId1.toString())).toBe(true, "Chat button is not positioned correctly");

        // 5. Send an additional chat to your agent 
        response2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId2 = TestHelpers.getContactID(response2);

        // VP: The chat is created and accepted 
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(true, "Second chat is not created");
        await maxChatPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Second chat is not accepted");

        // 6. Confirm another chat button is created for that contact 
        // VP: The additional chat button is created
        expect(await maxChatPage.isChatActive(chatContactId2.toString())).toBe(true, "Second chat icon is not displayed");

        // Post-condition
        await maxChatPage.endChatContactByContactID(chatContactId2);
        await maxChatPage.endChatContactByContactID(chatContactId1);
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
                await TestCondition.setAgentSkillsToDefault(chatReqAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});