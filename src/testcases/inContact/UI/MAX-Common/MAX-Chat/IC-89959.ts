import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: Max-Common > MAX-Chat
 * TC ID: IC-89959
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('Max-Common > MAX-Chat - IC-89959', function () {
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let ownName: string = "Me";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxEmailPage: MaxEmailPage;
    let quickRepliesPage: QuickRepliesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-89959 - Verify that Insert button is sending the quick reply text to the customer`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // PreCondition Login and Create a New Quick Replies and assign Quick Replies
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        
        await TestCondition.cleanUpQuickReply(chatAgent);
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();       
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);


    }, TestRunInfo.conditionTimeout);

    it('IC-89959 - Verify that Insert button is sending the quick reply text to the customer', async () => {

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Generate a chat contact  
        await TestHelpers.startChatContact(chatAgent);

        // Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Contact is generated 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");

        // Accept chat contact
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: MAX opens the chat
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // VP: Check Quick Reply appear
        expect(await maxPage.isQuickRepliesPanelDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Quick Reply Section is not displayed");

        // click  on  a quick reply
        await maxChatPage.searchQuickReplies(quickReply.title);
        await maxChatPage.selectQuickReply(quickReply.title);

        //VP: quick reply Insert and cancel buttons displayed
        expect(await maxChatPage.isInsertQuickReplyButtonDisplayedForChat()).toBe(true, "Insert button is not displayed");
        expect(await maxChatPage.isCancelQuickReplyButtonDisplayed()).toBe(true, "Cancel button is not displayed");

        // Insert quick Reply
        await maxChatPage.insertQuickReplyChat();

        // VP: quick reply message is displayed on the chat (verify quick reply message is sent to Patron)
        expect(await maxChatPage.isChatMessageDisplayed(ownName, quickReply.content)).toBe(true, "The Agent text label is not 'Me' or the quick reply content is wrong");

        // Post condition
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
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



