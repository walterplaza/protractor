import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ChatProfileDataTest } from "@data-objects/inContact/central/routing/chat-profile/chat-profile-data";
import { ChatCustomerInfo } from "@data-objects/inContact/central/routing/chat-profile/live-chat-customer-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import ChatBrandingProfilePage from "@page-objects/inContact/central/routing/chat-profile/chat-branding-profile";
import { LiveChatHTML } from "@page-objects/inContact/central/routing/chat-profile/live-chat-html";
import PointOfContactPage from "@page-objects/inContact/central/routing/point-of-contact/point-of-contact";
import PointOfContactActivePage from "@page-objects/inContact/central/routing/point-of-contact/point-of-contact-active";
import PostContactPage from "@page-objects/inContact/central/routing/skills/post-contact-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: SMOKE test
 * TC ID: 454942
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("SMOKE_Automated_Orange_Full - 454942", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let maxPageHandle: string;
    let embeddedCode: string;
    let liveChatHandle_1: string;
    let isDefaultChatProfileExisted: boolean;
    let msgThankYou: string = "Thank you for visiting us,hope you will be satisfied with our service.";;
    let textUrl: string = "http://www.google.com";;
    let liveChatHTMLPath: string = Utility.getPath("src\\test-data\\inContact\\live-chat.html");

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let pageBase: PageBase;
    let chatDataProfile: ChatProfileDataTest;
    let chatCustomerInfo: ChatCustomerInfo;
    let homeWindowHandle: string;
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;
    let postContactPage: PostContactPage;
    let chatProfilePage: ChatBrandingProfilePage;
    let turningPage;
    let gotoPointOfContactActive: PointOfContactActivePage;
    let pointOfContactPage: PointOfContactPage;
    let liveChatHTML: LiveChatHTML;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `454942 - [Customer Chat] Support for PopOut and PopIn for ActiveChat window_Verify pop out functionality for Acitvechat window.`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT);
        chatDataProfile = new ChatProfileDataTest().initData();
        chatCustomerInfo = new ChatCustomerInfo().initData();
    }, TestRunInfo.conditionTimeout);

    it('454942 - Customer Chat Support for PopOut and PopIn for ActiveChat window Verify pop out functionality for Acitvechat window', async () => {

        // Pre-Condition
        // 1. IC Central login.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
        homeWindowHandle = await BrowserWrapper.getNewWindowHandle();

        // 2. Prerequisite(s)
        skillListPage = await centralPage.gotoSkillsListPage();
        detailPage = await skillListPage.selectSkillDetail(SkillType.CHAT);
        postContactPage = await detailPage.gotoPostContactTab();
        await postContactPage.enableDisplayThankYouPage();
        await postContactPage.addThankYouMessage(msgThankYou, textUrl);
        await postContactPage.enableMakeTranscriptAvailable();
        await postContactPage.clickSave();

        // 3. Customer Chat - Create Chat V2
        // 4. Pre-Condition
        chatProfilePage = await postContactPage.gotoBrandingChatProfile();
        isDefaultChatProfileExisted = await chatProfilePage.isChatProfileExisted(chatDataProfile.profileName);
        turningPage = await chatProfilePage.createChatProfileDefault(chatDataProfile);
        gotoPointOfContactActive = await turningPage.gotoPointOfContactActive();
        await gotoPointOfContactActive.searchPointOfContact("_chat1");
        pointOfContactPage = await gotoPointOfContactActive.gotoSpecificPointOfContact("_chat1");
        await pointOfContactPage.mapPointOfContactToChatProfile(chatDataProfile.profileName);
        embeddedCode = await pointOfContactPage.getEmbeddedCode();

        // 5. Launch Max Agent
        // 6. Open customer web URL
        liveChatHTML = new LiveChatHTML();
        await liveChatHTML.injectEmbeddedCodeToHTML(liveChatHTMLPath, embeddedCode);
        liveChatHandle_1 = await liveChatHTML.launchHTMLFile(liveChatHTMLPath);

        // VP: Customer URL should open successfully with Live Chat button 
        expect(await liveChatHTML.isLiveChatButtonDisplayed()).toBe(true, "Live Chat button is not displayed");

        // 7. Click on Live Chat Button
        await liveChatHTML.openPreChatForm();

        // VP: Pre-chat window should open
        expect(await liveChatHTML.isPreChatFormDisplayed()).toBe(true, "Pre-Chat Window is not opened");

        // 8. Enter all information in pre-chat form and click on submit button
        await liveChatHTML.fillPreChatForm(chatCustomerInfo.firstName, chatCustomerInfo.lastName, chatCustomerInfo.email, chatCustomerInfo.help);
        await liveChatHTML.submitPreChatForm();

        // VP: Waiting screen is opened
        expect(await liveChatHTML.isWaitingMessageDisplayed()).toBe(true, "Waiting screen is not opened");

        // 9. Chat request goes to max agent and agent accept the chat request
        await pageBase.switchWindowByHandle(homeWindowHandle);
        maxPage = await pointOfContactPage.launchMAX(agent.phoneNumber);
        maxPageHandle = await pageBase.getCurrentWindowHandle();
        await maxPage.changeState(MaxState.AVAILABLE);
        maxChatPage = await maxPage.acceptNewContact();

        // VP: chat started window is displayed
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space is not displayed");

        // Wait for chat is started
        await pageBase.switchWindowByHandle(liveChatHandle_1);
        await liveChatHTML.waitForWaitingMessageDisappear();

        // 10. Click on pop out button 
        await liveChatHTML.clickPopOut();

        // VP: Active chat window should convert into it's own browser window, hide the minimize button, and convert the pop out button into the pop in button
        expect(await liveChatHTML.isMinimizeButtonDisplayed(5)).toBe(false, "Minimize button is displayed");
        expect(await liveChatHTML.isPopInButtonDisplayed()).toBe(true, "Pop in button is not displayed");

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out Max
            await pageBase.switchWindowByHandle(maxPageHandle);
            maxPage = await maxChatPage.endChatContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});