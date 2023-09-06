import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
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
 * Suite: Protractor MAX Suite
 * TC ID: 387128
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX Suite - IC-62633', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let quickReply: QuickReply = new QuickReply();
    let quickRepliesPage: QuickRepliesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62633 - MAX > Contextual Panel > quick replies Should wrap text`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
        quickReply.initData();

        // Start a chat
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62633 - MAX Contextual Panel quick replies Should wrap text', async () => {

        // 2. Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 3. Create a New Quick Replies        
        // 4. Add a large text on the quick reply
        await TestCondition.cleanUpQuickReply(chatAgent);
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.createQuickReply(quickReply);

        // 5. Assign the previous quick reply to your chat skill from pre-reqs
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);

        // VP: Quick reply assigned to the skill sucessfully 
        expect(await quickRepliesPage.isQuickReplyAssignedToSkill(SkillType.CHAT)).toBe(true, "Quick Reply is not assined to skill");

        // 6. Launch MAX
        maxPage = await quickRepliesPage.launchMAX(chatAgent.phoneNumber);

        // 7. Queue a new 
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Chat contact received on the agent 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");
        let maxChatPage: MaxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed");

        // 8. Go to search replies section 
        await maxChatPage.selectQuickReply(quickReply.title);

        // 9. Validate that  the panels extends all the way down and text wraps
        // VP: Quick reply correctly displayed 
        expect(await maxChatPage.isQuickReplyTextWrapped(quickReply.content)).toBe(true, "Css value is not correct");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxChatPage.endChatContact();
            await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(chatAgent);
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
