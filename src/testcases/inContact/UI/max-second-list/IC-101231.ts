import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import userDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import userDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";
import usersPage from "@page-objects/inContact/central/admin/users/users-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455444
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101231", function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let createChat: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let usersPage: usersPage;
    let userDetailsPage: userDetailsPage;
    let userDetailsSystemPage: userDetailsSystemPage;
    let currentChatSize: ISize;
    let inboxChatSizeWith: number;
    let maxChatWidth: number = 490;
    let tolerances: number = 10;
    let maxWidth: number = 300;
    let leftChatInbox: number

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101231 - MAX Summer 18 added IC-38619 Chat Without Contact Panels Non Digital Contact With Inbox Verify the Chat workspace has the ~435 px`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        createChat = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.CHAT);

        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        usersPage = await centralPage.gotoUsersPage();

        // Update user page
        await usersPage.searchUser(chatAgent.agentID);
        userDetailsPage = await usersPage.selectUser(chatAgent.agentID);
        userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editConcurrentChats("Custom", 2);
        await userDetailsSystemPage.finishEditUserDetailsSystem();
    }, TestRunInfo.conditionTimeout);

    it('IC-101231 - MAX Summer 18 added IC-38619 Chat Without Contact Panels Non Digital Contact With Inbox Verify the Chat workspace has the ~435 px', async () => {

        // 1. Login on MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        //Verify the size of Glance is ~300 px (Height)
        expect(await maxPage.isGlanceSizeInRange(maxWidth, tolerances)).toBe(true, "The size of Glance is ~300 px (Width)");

        //2. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        //VP:MAX has the "Available" state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "MAX does not have the 'Available' state");

        // 3. Using the POC, generate the Ib Chat Contact 
        await TestHelpers.startChatContact(createChat);

        // VP: The Ib Chat Contact has been delivered in MAX.
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up isn't display");
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat working space isn't displayed");

        // 4. Using the "Dev Tools" select the "Chat" work space
        currentChatSize = await maxChatPage.getContactWorkSpaceSize(ContactName.CHAT);
        inboxChatSizeWith = await maxChatPage.getChatInboxSize();
        leftChatInbox = await maxChatPage.getChatInboxLeftPosition();  // Left chatIbox is right of Max glance at this time

        //VP: Note: The Chat work space + Chat Inbox don't include the Glance size. If we include the Glance the size is ~490 px. (490 is get from TA tes case which client implemented)
        expect(Utility.isNumberInRange(currentChatSize.width + inboxChatSizeWith + leftChatInbox, maxChatWidth, tolerances)).toBe(true, "Failed by IC-5984 it is the limitation of the MS Edge browser");


        //5.Using the mouse and drag and drop action, try to change the size of Chat work space or the Chat Inbox.
        await maxChatPage.resizeMaxByDropAndDrag(-500, 0);

        //VP: Verify that the Chat work space snapback when resized below min, therefore the Chat work space + Chat Inbox continue to display ~490 px (Height)
        await maxChatPage.waitForMAXGlanceStable();
        currentChatSize = await maxChatPage.getContactWorkSpaceSize(ContactName.CHAT);
        expect(Utility.isNumberInRange(currentChatSize.width + inboxChatSizeWith + leftChatInbox, maxChatWidth, tolerances)).toBe(true, "Failed by IC-5984 it is the limitation of the MS Edge browser");

        // 6. Finish the Chat Contact  
        await maxChatPage.endChatContact();

        // VP: Verify the size of Glance continue being ~300 px (Height)
        expect(await maxPage.isGlanceSizeInRange(maxWidth, tolerances)).toBe(true, "The size of Glance is ~300 px (Width)");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

              // Clean up
              centralPage = await maxPage.logOut();

              //Set CocurrentChat to default
            usersPage = await centralPage.gotoUsersPage();
            await usersPage.searchUser(chatAgent.agentID)
            userDetailsPage = await usersPage.selectUser(chatAgent.agentID);
            userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
            await userDetailsSystemPage.selectEditUserDetailsSystem()
            await userDetailsSystemPage.editConcurrentChats("Default");
            await userDetailsSystemPage.finishEditUserDetailsSystem();
          
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(createChat, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});