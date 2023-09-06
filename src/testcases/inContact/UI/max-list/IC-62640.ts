
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
 * TC ID: 3818\29
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62640', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62640 - [SCH][CHAT][MAX] chat in personal queue "from address" is visible in glance preview`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        // 1. User logged into Central
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62640 - SCH CHAT MAX chat in personal queue from address is visible in glance preview', async () => {

        // 2. Run an inbound chat.
        await TestHelpers.startChatContact(chatAgent);

        // Agent launched
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // And available with skills for Chat. Script's ReqAgent action for chat is pointed at the agent's ID#
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Agent is offered chat
        // VP: Chat popup shows
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // VP: Glance shows the chat in Personal Queue
        await maxPage.showMaxGlance();
        expect(await maxPage.isPersonalQueueContactDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Glance does not show the chat in Personal Queue");

        // 3. Move focus away from glance. Allow Glance to close. Look at the Chat icon.
        // Accept New contact
        await maxPage.hideMaxGlance();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The icon does not show anything except the chat bubble.
        expect(await maxPage.isChatInboundIconDisplayed()).toBe(true, "Chat Inbound Icon is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // End chat contact
            maxPage = await maxChatPage.endChatContact();
            await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

            // Log out central
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) {
                console.log(err);
            }
        }
    }, TestRunInfo.conditionTimeout);
});



