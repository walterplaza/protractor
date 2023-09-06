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
 * TC ID: 341360
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62651', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chatContactId1: number
    let chatContactId2: number
    let timeoutMultiChat: number = 60;
    let countDown: number = 10;
    let timeoutMultiChatTC = timeoutMultiChat + countDown + 20;
    let response_1: APIResponse;
    let response_2: APIResponse;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62651 - MAX Multi Chat Glance View Notification`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)

        // Start set up skill
        await TestCondition.setChatSkillDetail(chatAgent, SkillType.CHAT, true, timeoutMultiChat, countDown);
    }, TestRunInfo.conditionTimeout);

    it('IC-62651 - MAX Multi Chat Glance View Notification', async () => {

        // Pre Condition
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        //3. Send and Accept New contact Chat 1
        response_1 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = await TestHelpers.getContactID(response_1);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        //4. Send and Accept New contact Chat 2
        response_2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId2 = await TestHelpers.getContactID(response_2);
        await maxPage.waitForNewContactPopUp();
        await maxPage.acceptNewChatContact();

        //5. Wait for Chat time out
        await maxChatPage.waitForChatWorkSpaceDisappeared(chatContactId2.toString(), timeoutMultiChatTC);
        await maxChatPage.waitForChatWorkSpaceDisappeared(chatContactId1.toString(), timeoutMultiChatTC);

        //Vp: There is no Chat session on Glance View after time out
        expect(await maxChatPage.isMultiChatGlanceSessionDisplayed(TestRunInfo.shortTimeout)).toBe(false, "There is the contact item on glance view");

        //VP: The chat disappears after time out
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "The Chat Work Space appears");

    }, TestRunInfo.testTimeout*2);
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post Condition
            await maxPage.logOut();
            await centralPage.logOut();           
        } catch (err) { }
        finally {
            try {
                await TestCondition.setChatSkillDetail(chatAgent, SkillType.CHAT, false);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});
