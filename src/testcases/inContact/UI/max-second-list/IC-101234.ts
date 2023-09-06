import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { MaxState } from "@data-objects/general/cluster";
import { APIResponse } from "@utilities/general/api-core";
import CustomAPIs from "@apis/custom-apis";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";

/** 
 * Type: inContact
 * Suite: MAX Suite
 * TC ID: 446757
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11, HC10
 */

describe("MAX suite - IC-101234", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chat_response_1: APIResponse;
    let chat_response_2: APIResponse;
    let contactID_1: number;
    let contactID_2: number;
    let maxChatPage: MaxChatPage;
    let transferLabel: string = "Transfer";
    let endLabel: string = "End";
    let launchLabel: string = "Launch";
    let chatWorkspaceWidth: number = 490;
    let range: number = 5;
    let white: string = "#ffffff";
    let gray: string = "#9da3a5";
    let originMaxWidth: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101234 - MAX> SCH> Multi Contact> Generate multi Chats IB Contact without Quick Replies/ Panels/ Disposition/ Screen Pops, etc.`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-101234 - MAX SCH Multi Contact Generate multi Chats IB Contact without Quick Replies Panels Disposition Screen Pops etc', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        originMaxWidth = await maxPage.getMaxWrapPanelSize();

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Max state is not changed to available");
        
        // 4. Generate more that one IB Chat Contact
        chat_response_1 = await TestHelpers.startChatContact(chatAgent);
        contactID_1 = await CustomAPIs.getContactID(chat_response_1);
        maxChatPage = await maxPage.acceptNewChatContact();

        chat_response_2 = await TestHelpers.startChatContact(chatAgent);
        contactID_2 = await CustomAPIs.getContactID(chat_response_2);
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: Verify the IB Chat Contacts are delivery in MAX without errors.
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");
        
        // Swith to first chat client
        await maxChatPage.clickToChatClient(contactID_1.toString());
        await maxChatPage.clickOnChatWorkspace();

        // VP: Check the controls, colors, labels and size.
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");
        expect(await maxChatPage.isLabelTransferButtonDisplayed(transferLabel)).toBe(true, "Transfer label Button isn't matched");
        expect(await maxChatPage.isLabelLaunchButtonDisplayed(launchLabel)).toBe(true, "Launch label Button isn't matched");
        expect(await maxChatPage.isLabelEndButtonDisplayed(endLabel)).toBe(true, "End label Button isn't matched");
        expect(await maxChatPage.getColorTransferButton()).toBe(white, "Color Transfer Button isn't matched");
        expect(await maxChatPage.getColorLaunchButton()).toBe(white, "Color Launch Button isn't matched");
        expect(await maxChatPage.getColorEndButton()).toBe(white, "Color End Button isn't matched");
        expect(await maxChatPage.getColorChatWorkspace()).toBe(gray, "Color chat workspace isn't matched ");
        expect(await maxPage.isMaxGlanceSizeInRange(chatWorkspaceWidth, range)).toBe(true, "Chat workspace size is not correct");
        
        // 5. Switch between chats in the Glance 
        await maxChatPage.clickToChatClient(contactID_2.toString());

        // VP: Verify the selected workspace of the selected Chat is displayed.
        expect(await maxChatPage.isChatActive(contactID_2.toString())).toBe(true, "Second chat isn't displayed");

        // VP: Check the controls, colors, labels and size.
        expect(await maxChatPage.isTransferButtonDisplayed()).toBe(true, "Transfer Button isn't displayed");
        expect(await maxChatPage.isLaunchButtonDisplayed()).toBe(true, "Launch Button isn't displayed");
        expect(await maxChatPage.isEndButtonDisplayed()).toBe(true, "End Button isn't displayed");
        expect(await maxChatPage.isLabelTransferButtonDisplayed(transferLabel)).toBe(true, "Transfer label Button isn't matched");
        expect(await maxChatPage.isLabelLaunchButtonDisplayed(launchLabel)).toBe(true, "Launch label Button isn't matched");
        expect(await maxChatPage.isLabelEndButtonDisplayed(endLabel)).toBe(true, "End label Button isn't matched");
        expect(await maxChatPage.getColorTransferButton()).toBe(white, "Color Transfer Button isn't matched");
        expect(await maxChatPage.getColorLaunchButton()).toBe(white, "Color Launch Button isn't matched");
        expect(await maxChatPage.getColorEndButton()).toBe(white, "Color End Button isn't matched");
        expect(await maxChatPage.getColorChatWorkspace()).toBe(gray, "Color chat workspace isn't matched ");
        expect(await maxPage.isMaxGlanceSizeInRange(chatWorkspaceWidth, range)).toBe(true, "Chat workspace size is not correct");
        
        // 6. End all the accepted Chats
        await maxChatPage.endSpecifiedChatWithContactId(contactID_2.toString());
        await maxChatPage.clickToChatClient(contactID_1.toString());
        maxPage = await maxChatPage.endChatContact();
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

        // VP: Verify the IB Chat workspace closes and MAX displays the glance.
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat working space isn't displayed");

        // VP: Verify that MAX still displaying the same size before start the IB Chat Contact.
        expect(await maxPage.isMaxGlanceSizeInRange(originMaxWidth, range)).toBe(true, "Max page size is not correct");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestHelpers.endAllContacts(chatAgent);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});