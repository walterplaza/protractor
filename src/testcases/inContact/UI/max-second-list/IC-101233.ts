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
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { ISize } from "selenium-webdriver";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 446758
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101233", function () {
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let chatContactId1: number;
    let chatContactId2: number;
    let gray: string = "#9da3a5";
    let chatWorkspaceSize1: ISize;
    let chatWorkspaceSize2: ISize;
    let newChatWorkspaceSize1: ISize;
    let newChatWorkspaceSize2: ISize;
    let maxPanelSize: ISize;
    let response1: APIResponse;
    let response2: APIResponse;
    let expectedWidth: number = 790;
    let range: number = 10;

    // Declare page object
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let quickRepliesPage: QuickRepliesPage;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101233 - MAX > SCH > IB > Multi Chat Generate multi Chats Contacts with Quick Replies`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-101233 - MAX - SCH - IB - Multi Chat Generate multi Chats Contacts with Quick Replies', async () => {
        // 1. Agent setup to accept multiple chats | A chat skill setup with POC | Auto reject timeout of <10s 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // The IB Chat skill must have associated only a Quick Reply
        await TestCondition.cleanUpQuickReply(chatAgent);           
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);

        // 2. Launch MAX
        maxPage = await quickRepliesPage.launchMAX(chatAgent.phoneNumber);

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in the available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX is not in available state");

        // 4. Generate more than one IB Chat Contact and accept them
        response1 = await TestHelpers.startChatContact(chatAgent);
        response2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = TestHelpers.getContactID(response1);
        chatContactId2 = TestHelpers.getContactID(response2);

        // Accept the chat contacts
        maxChatPage = await maxPage.acceptNewChatContact();
        await maxChatPage.acceptNewChatContact();

        // VP: The IB Chat Contacts delivery automatically in MAX without errors
        expect(await maxChatPage.isChatActive(chatContactId1.toString())).toBe(true, "First chat icon is not displayed");
        expect(await maxChatPage.isChatActive(chatContactId2.toString())).toBe(true, "Second chat icon is not displayed");
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "First chat is not accepted");

        // Get Max panel and chat workspace original sizes
        await pageBase.maximizePage();
        maxPanelSize = await maxChatPage.getMaxWrapPanelSize("ISize");
        chatWorkspaceSize1 = await maxChatPage.getChatSizeByContactId(chatContactId1.toString());
        chatWorkspaceSize2 = await maxChatPage.getChatSizeByContactId(chatContactId2.toString());

        // VP: The workspace is shown according to the attached picture for each active chat. ( IB Chat wokspace and at the right side the Quick Replies panel)
        // VP: IB Chat workspace  must not be displayed cut off or overlap
        expect(await maxChatPage.isQuickRepliesAtRightSide()).toBe(true, "Chat working space is not positioned correctly");
        expect(await chatWorkspaceSize1.height).toBe(maxPanelSize.height, "Chat working space 1 is displayed cut off or overlap");
        expect(await chatWorkspaceSize2.height).toBe(maxPanelSize.height, "Chat working space 2 is displayed cut off or overlap");

        // VP: Check the controls, colors, labels and size
        expect(await maxChatPage.getColorChatWorkspace()).toBe(gray, "Chat background color is not correct");
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");

        await maxChatPage.clickToChatClient(chatContactId1.toString());
        await pageBase.maximizePage();
        expect(await maxChatPage.getQuickRepliesInfoByContactId("title", chatContactId1.toString())).toBe(quickReply.title, "Quick Replies title of first contact is not displayed correctly");
        expect(await maxChatPage.getQuickRepliesInfoByContactId("content", chatContactId1.toString())).toBe(quickReply.content, "Quick Replies content of first contact is not displayed correctly");

        // 5. Using the back carat of Quick Reply to collapse and expand the Quick Reply
        // For chat workspace 1
        await maxChatPage.closeQuickRepliesPanelByContactId(chatContactId1.toString());
        await maxChatPage.openQuickRepliesPanelByContactId(chatContactId1.toString());

        // Get chat workspace size after collapse and expand quick replies
        newChatWorkspaceSize1 = await maxChatPage.getChatSizeByContactId(chatContactId1.toString());

        // VP: MAX and the IB Chat workspace must not be displayed cut off or overlap after still displaying the same size before start the IB Chat Contact.
        expect(await chatWorkspaceSize1.height).toBe(maxPanelSize.height, "Chat working space 1 is displayed cut off or overlap after expanding or collapsing quick replies");
        expect(await chatWorkspaceSize1.height).toBe(newChatWorkspaceSize1.height, "Height chat workspace 1 is mismatch");
        expect(await chatWorkspaceSize1.width).toBe(newChatWorkspaceSize1.width, "Width chat workspace 1 is mismatch");

        // Using the back carat of Quick Reply to collapse and expand the Quick Reply
        await maxChatPage.clickToChatClient(chatContactId2.toString());
        await pageBase.maximizePage();
        expect(await maxChatPage.getQuickRepliesInfoByContactId("title", chatContactId2.toString())).toBe(quickReply.title, "Quick Replies title is not displayed correctly");
        expect(await maxChatPage.getQuickRepliesInfoByContactId("content", chatContactId2.toString())).toBe(quickReply.content, "Quick Replies content is not displayed correctly");

        // 5. Using the back carat of Quick Reply to collapse and expand the Quick Reply
        // For chat workspace 2
        await maxChatPage.closeQuickRepliesPanelByContactId(chatContactId2.toString());
        await maxChatPage.openQuickRepliesPanelByContactId(chatContactId2.toString());

        // Get chat workspace size after collapse and expand quick replies
        newChatWorkspaceSize2 = await maxChatPage.getChatSizeByContactId(chatContactId2.toString());

        // VP: MAX and the IB Chat workspace must not be displayed cut off or overlap after still displaying the same size before start the IB Chat Contact.
        expect(await chatWorkspaceSize2.height).toBe(maxPanelSize.height, "Chat working space 2 is displayed cut off or overlap after expanding or collapsing quick replies");
        expect(await chatWorkspaceSize2.height).toBe(newChatWorkspaceSize2.height, "Height chat workspace 2 is mismatch");
        expect(await chatWorkspaceSize2.width).toBe(newChatWorkspaceSize2.width, "Width chat workspace 2 is mismatch");

        // Post-condition
        maxChatPage.endChatContactByContactID(chatContactId2);
        maxChatPage.endChatContactByContactID(chatContactId1);
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
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