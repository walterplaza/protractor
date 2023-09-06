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
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_OF
 * TC ID: 451955
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Note: 
 * - IE , Edge: Failed by ticket IC-70770 - [TestAutomation][inC-UI] Live Chat button does not display when opening Customer URL on IE and Edge browsers
 */

describe('SMOKE_Automated_Orange_OF - 451955', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chatDataProfile = new ChatProfileDataTest();
    let liveChatHTMLPath: string = Utility.getPath("src\\test-data\\inContact\\live-chat.html");
    let chatCustomerInfo = new ChatCustomerInfo().initData();
    let contactProfile: string = "lgvn_test";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let homeWindowHandle: string;
    let chatProfilePage: ChatBrandingProfilePage;
    let isDefaultChatProfileExisted: boolean;
    let gotoPointOfContactActive: PointOfContactActivePage;
    let pointOfContactPage: PointOfContactPage;
    let embeddedCode: string;
    let liveChatHandle_1: string;
    let maxPage: MaxPage;
    let maxPageHandle: string;
    let maxChatPage: MaxChatPage;
    let liveChatHTML = new LiveChatHTML();
    let turningPage: any;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `451955 - Popping Out ActiveChat window when surfed away_Verify ActiveChat window session when the Customer surfs away in new tab with same domain`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('451955 - Popping Out ActiveChat window when surfed away_Verify ActiveChat window session when the Customer surfs away in new tab with same domain', async () => {

        // 1. IC Central login.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        homeWindowHandle = await BrowserWrapper.getNewWindowHandle();

        // 2. Customer Chat - Create Chat V2
        // 3. Pre-Condition
        chatProfilePage = await centralPage.gotoBrandingChatProfile();
        turningPage = await chatProfilePage.createChatProfileDefault(chatDataProfile.initData());
        gotoPointOfContactActive = await turningPage.gotoPointOfContactActive();
        await gotoPointOfContactActive.searchPointOfContact("_chat1");
        pointOfContactPage = await gotoPointOfContactActive.gotoSpecificPointOfContact("_chat1");
        await pointOfContactPage.mapPointOfContactToChatProfile(contactProfile);
        embeddedCode = await pointOfContactPage.getEmbeddedCode();

        // 4. Launch Max Agent
        // 5. Open Customer
        await liveChatHTML.injectEmbeddedCodeToHTML(liveChatHTMLPath, embeddedCode);
        liveChatHandle_1 = await liveChatHTML.launchHTMLFile(liveChatHTMLPath);

        // VP. Customer URL should open successfully with Live Chat button 
        expect(await liveChatHTML.isLiveChatButtonDisplayed()).toBe(true, "Live Chat button is not displayed");

        // 6. Click on Live Chat Button
        await liveChatHTML.openPreChatForm();

        // VP. Pre-Chat Window should be opened.
        expect(await liveChatHTML.isPreChatFormDisplayed()).toBe(true, "Pre-Chat Window is not opened");

        // 7. Enter all information and click summit button
        await liveChatHTML.fillPreChatForm(chatCustomerInfo.firstName, chatCustomerInfo.lastName, chatCustomerInfo.email, chatCustomerInfo.help);
        await liveChatHTML.submitPreChatForm();

        // VP: Waiting screen is opened
        expect(await liveChatHTML.isWaitingMessageDisplayed()).toBe(true, "Waiting screen is not opened");

        // 8. Chat request goes to max agent and agent accept the chat request
        await BrowserWrapper.switchWindowByHandle(homeWindowHandle);
        await chatAgent.createPhoneNumber();
        maxPage = await pointOfContactPage.launchMAX(chatAgent.phoneNumber);
        maxPageHandle = await BrowserWrapper.getNewWindowHandle();
        await maxPage.changeState(MaxState.AVAILABLE);
        maxChatPage = await maxPage.acceptNewContact();

        // VP: chat started window is displayed
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space is not displayed");

        // Wait for chat is started
        await BrowserWrapper.switchWindowByHandle(liveChatHandle_1);
        await liveChatHTML.waitForWaitingMessageDisappear();

        // 9. Goto new tab, click on live chat button
        await BrowserWrapper.switchWindowByHandle(homeWindowHandle);
        await liveChatHTML.launchHTMLFile(liveChatHTMLPath);
        await liveChatHTML.openPreChatForm();

        // VP: Do you want to move your chat session to this window?" message and move here button in new tab 
        expect(await liveChatHTML.getMoveScreenText()).toBe("Do you want to move your chat session to this window?", "The message is not displayed");

        // 10. Click on move here button and check the chat session
        await liveChatHTML.moveChatSession();

        // Final. End Chat Contact
        await BrowserWrapper.switchWindowByHandle(maxPageHandle);
        maxPage = await maxChatPage.endChatContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



