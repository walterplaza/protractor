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
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 252853
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62674", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let quickReply1: QuickReply = new QuickReply();
    let quickReply2: QuickReply = new QuickReply();
    let invalidQuickReply: string = Utility.createRandomString(10);
    quickReply1.initData();
    quickReply2.initData();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let quickRepliesPage: QuickRepliesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62674 - Quicky reply> Keywords with associated QR to be seen for Chats`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Quick replies (QR) associated to the skill (at least 2 QR).
        await TestCondition.cleanUpQuickReply(chatAgent);   
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();        
        await quickRepliesPage.createQuickReply(quickReply1);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);
        await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.createQuickReply(quickReply2);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62674 - Quicky reply Keywords with associated QR to be seen for Chats', async () => {

        // 2. Launch MAX and change its state to available.
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state.
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX is not in available state.");

        // 3. In another browser, paste the chat POC
        await TestHelpers.startChatContact(chatAgent);

        // VP: MAX gets a message to accept/reject chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "MAX is not get a message to accept/reject chat");

        // 4. Accept the chat
        await maxPage.acceptNewChatContact();
        maxChatPage = await maxPage.waitForChatWorkspace();

        // VP: Agent and client connected.
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Agent and client is not connected.");

        // 5. Click on QR
        await maxPage.openQuickRepliesPanel();
        await maxPage.waitForQuickRepliesPanel();

        // VP: Skill level and favorites tab are displayed.
        expect(await maxPage.isQuickRepliesPanelDisplayed()).toBe(true, "Skill level and favorites tab is not displayed.");

        // 6. Enter a keyword in search field 
        await maxPage.searchQuickReplies(quickReply1.keyword)

        // VP: validate only associated QR is displayed.
        expect(await maxPage.isQuickReplyDisplayed(quickReply1.title)).toBe(true, "validate only associated QR is displayed.");
        expect(await maxPage.isQuickReplyDisplayed(quickReply2.title, TestRunInfo.shortTimeout)).toBe(false, "validate only associated QR is displayed.");

        // 7. Enter a invalid keyword or keyword not associated with skill
        await maxPage.searchQuickReplies(invalidQuickReply)

        // VP: No entries are displayed.
        expect(await maxPage.isQuickReplyDisplayed(invalidQuickReply, TestRunInfo.shortTimeout)).toBe(false, "Entries is displayed.");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(chatAgent);   
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