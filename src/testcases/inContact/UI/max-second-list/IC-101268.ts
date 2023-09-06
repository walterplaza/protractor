import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, ContactLabel } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
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
 * TC ID: 344981
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101268", function () {
    TestBase.scheduleTestBase();
    let chatReqAgent: Agent;
    let chatContactId1: number;
    let chatContactId2: number;
    let timeoutMultiChat: number = 300;
    let countDownChat: number = 15;
    let countDown: number = 15;

    // Declare page object
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let response1: APIResponse;
    let response2: APIResponse;
    let maxChatPage: MaxChatPage;
    let usersPage: UsersPage;
    let userDetailsPage: UserDetailsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101268 - MAX > Multi Chat > Verify Accept/Reject options`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // Set Max Chat Time out 300s
        await TestCondition.setChatSkillDetail(chatAgent, SkillType.CHAT, true, timeoutMultiChat, countDownChat);
    }, TestRunInfo.conditionTimeout);

    it('IC-101268 - MAX - Multi Chat - Verify Accept/Reject options', async () => {
        // 1. Agent setup to accept multiple chats | A chat skill setup with POC | Auto reject timeout of <10s 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        usersPage = await centralPage.gotoUsersPage();
        await usersPage.searchUser(chatAgent.agentID)
        userDetailsPage = await usersPage.selectUser(chatAgent.agentID);
        let userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editRefusalChatTimeOut(15);
        await userDetailsSystemPage.editConcurrentChats("Custom", 4);
        await userDetailsSystemPage.finishEditUserDetailsSystem();

        // 2. Launch MAX
        maxPage = await userDetailsSystemPage.launchMAX(chatAgent.phoneNumber);

        // Change MAX to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Send a chat contact to your agent
        await Logger.write(FunctionType.UI, "Starting first chat");
        response1 = await TestHelpers.startChatContact(chatAgent);
        chatContactId1 = TestHelpers.getContactID(response1);
        await maxPage.waitForNewContactPopUp();

        // VP: The chat is created and accepted 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "First chat is not created");
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "First chat is not accepted");

        // 4. Send a second chat contact to your agent 
        await Logger.write(FunctionType.UI, "Starting second chat");
        response2 = await TestHelpers.startChatContact(chatAgent);
        chatContactId2 = TestHelpers.getContactID(response2);
        await maxPage.waitForNewContactPopUp();

        // VP: The accept reject dialog is shown 
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(true, "Second chat is not created");

        // 5. Click the Reject button 
        await maxChatPage.rejectNewChatContact();
        await maxPage.showMaxGlance();

        // VP: The chat is rejected and re queued. 
        // VP: The agent State is shown as Working and subscript reads Up Next: UNAVAILABLE - Refused.
        expect(await maxChatPage.isContactInQueue(ContactName.CHAT)).toBe(true, "Second chat contact is not in queue");
        expect(await maxChatPage.getStateStatus()).toBe(MaxState.WORKING, "Agent state is not correct");
        expect(await maxChatPage.getMAXNextOutState()).toBe(MaxState.REFUSED, "MAX next outstate is not correct");

        // 6. Reset State to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: State returns to Working. No subscript showing
        expect(await maxChatPage.getStateStatus()).toBe(MaxState.WORKING, "Agent state is not correct");

        // 7. Chat, if not answered by a different agent, will route to your agent
        // VP: The accept reject dialog is shown 
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(true, "Third chat is not created");

        // 8. Wait for the countdown to finish
        await maxChatPage.waitForNewContactPopUpDisappeared(countDown);

        // VP: The dialog closes and the chat is rejected and re queued. 
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(false, "The chat dialog does not close");
        await maxPage.showMaxGlance();
        expect(await maxChatPage.isContactInQueue(ContactName.CHAT)).toBe(true, "Third chat contact is not in queue");

        // VP: The agent State is shown as Working and subscript reads Up Next: UNAVAILABLE - Refused
        expect(await maxChatPage.getStateStatus()).toBe(MaxState.WORKING, "Agent state is not correct");
        expect(await maxChatPage.getMAXNextOutState()).toBe(MaxState.REFUSED, "MAX next outstate is not correct");

        // 9. Reset State to Available   
        await maxChatPage.changeState(MaxState.AVAILABLE);

        // VP: State returns to Working. No subscript showing
        expect(await maxChatPage.getStateStatus()).toBe(MaxState.WORKING, "Agent state is not correct");
        await maxChatPage.rejectNewChatContact();

        // 10.  Reset State to Available  
        await maxPage.showMaxGlance();
        await maxChatPage.changeState(MaxState.AVAILABLE);

        // VP: The accept reject dialog is shown
        expect(await maxChatPage.isNewContactPopUpDisplayed()).toBe(true, "Fourth chat is not created");

        // 11. Click accept
        await maxChatPage.acceptNewChatContact();

        // VP: The chat is accepted and added to the right side of the last chat pane
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Second chat is not accepted");
        expect(await maxChatPage.isChatActive(chatContactId2.toString())).toBe(true, "Second chat icon is not displayed");

        // Post-condition
        await maxChatPage.endChatContactByContactID(chatContactId2);
        await maxChatPage.endChatContactByContactID(chatContactId1);
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();

            // Set disable Max Chat Time out
            await TestCondition.setChatSkillDetail(chatAgent, SkillType.CHAT, false);
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatReqAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});