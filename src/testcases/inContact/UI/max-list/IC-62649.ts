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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 344986
 * Tested browser: Chrome 
 * Tested OS: Windows 10
 * Tested cluster: SC1, SC3
 */

describe('MAX suite - IC-62649', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62649 - MAX > Multi Chat > Accept/Reject in Unavailable`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('IC-62649 - MAX Multi chat Accept Reject in Unavailable', async () => {

        // 1. Agent setup to accept multiple chats | A chat skill setup with POC | Auto reject timeout of <10s 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Send a chat contact to your agent
        await TestHelpers.startChatContact(chatAgent);

        // VP: The chat is created and accepted 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "Chat is not created");
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat is not accepted");

        // 4. Set your "Next state" as unavailable 
        await maxPage.showMaxGlance();
        await maxPage.changeState(MaxState.UNAVAILABLE)
        await maxPage.hideMaxGlance();

        // VP: Your agents next state is set to unavailable
        expect(await maxPage.getMAXNextState()).toBe(MaxState.UNAVAILABLE, "Agent next state is not set to unavailable");

        // 5. Send another chat contact to your agent 
        await maxChatPage.endChatContact();
        await TestHelpers.startChatContact(chatAgent);

        // VP: The chat is created and queued 
        expect(await maxPage.isContactInQueue(ContactName.CHAT)).toBe(true, "Chat is not created or queued")

        // 6. Confirm the Accept/Reject dialog does not appear 
        // VP: The dialog does not show 
        expect(await maxPage.isNewContactPopUpDisplayed(TestRunInfo.shortTimeout)).toBe(false, "New contact popup displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxPage.changeState(MaxState.AVAILABLE);
            await maxPage.acceptNewChatContact();
            await maxChatPage.endChatContact();
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});