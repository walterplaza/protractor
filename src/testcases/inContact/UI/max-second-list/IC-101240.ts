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
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: Protractor MAX Suite
 * TC ID: 443973
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX Suite - IC-101240', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chatWorkspaceSize: ISize;
    let newChatWorkspaceSize: ISize;
    let maxPanelSize: ISize;
    let gray: string = "#9da3a5";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let quickReply: QuickReply = new QuickReply().initData();
    let quickRepliesPage: QuickRepliesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101240 - MAX> SCH> One Contact> Generate an IB Chat Contact with Quick Replies`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)

        // Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Assign quick reply for chat skill
        await TestCondition.cleanUpQuickReply(chatAgent);   

        quickRepliesPage = await centralPage.gotoQuickRepliesPage();       
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-101240 - MAX SCH One Contact Generate an IB Chat Contact with Quick Replies', async () => {

        // 2. Launch MAX
        maxPage = await quickRepliesPage.launchMAX(chatAgent.phoneNumber);

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Max state is not changed to available");

        // 4. Generate a IB Chat Contact and accept it
        await TestHelpers.startChatContact(chatAgent);
        await maxPage.waitForNewContactPopUp();
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The IB Chat Contact delivery automatically in MAX without errors.
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed");

        // Get Max panel and chat workspace original sizes
        await maxChatPage.waitForQuickRepliesPanel();
        maxPanelSize = await maxChatPage.getMaxWrapPanelSize("ISize");
        chatWorkspaceSize = await maxChatPage.getChatSize(); 

        // VP: The workspace is shown with IB Chat wokspace and the Quick Replies panel at the right side
        expect(await maxChatPage.isQuickRepliesAtRightSide()).toBe(true, "Chat working space is not positioned correctly");
        expect(maxChatPage.isChatWorkSpaceNotOverlaped()).toBe(true, "Chat workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels and size
        expect(await maxChatPage.getColorChatWorkspace()).toBe(gray, "Chat background color is not correct");
        expect(await maxChatPage.getQuickRepliesInfo("title")).toBe(quickReply.title, "Quick Replies title is not displayed correctly");
        expect(await maxChatPage.getQuickRepliesInfo("content")).toBe(quickReply.content, "Quick Replies content is not displayed correctly");

        // 5. Using the back carat of Quick Reply to collapse and expand the Quick Reply
        await maxChatPage.openQuickRepliesPanel(false);
        await maxChatPage.openQuickRepliesPanel();

        // Get chat workspace size after collapse and expand quick replies
        newChatWorkspaceSize = await maxChatPage.getChatSize();

        // VP: MAX and the IB Chat workspace must not be displayed cut off or overlap after still displaying the same size before start the IB Chat Contact.
        expect(maxChatPage.isChatWorkSpaceNotOverlaped()).toBe(true, "Chat workspace is displayed cut off or overlap");
        expect(chatWorkspaceSize.height).toBe(newChatWorkspaceSize.height, "Height chat workspace is mismatch");
        expect(chatWorkspaceSize.width).toBe(newChatWorkspaceSize.width, "Width chat workspace is mismatch");     
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
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
