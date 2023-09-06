import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import UserDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Suite: MAX suite
 * TC ID: 437939
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62582', function () {

    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let chat_response_1: APIResponse;
    let contactID_1: number;
    let chat_response_2: APIResponse;
    let contactID_2: number;
    let chat_response_3: APIResponse;
    let contactID_3: number;
    let launchButtonColor_1: string;
    let launchButtonColor_2: string;
    let launchButtonColor_3: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let usersPage: UsersPage;
    let userDetailsPage: UserDetailsPage;
    let userDetailsSystemPage: UserDetailsSystemPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62582 - [MAX] Launch Button highlights them all`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62582 - MAX Launch Button highlights them all', async () => {

        // 1. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        usersPage = await centralPage.gotoUsersPage();
        await usersPage.searchUser(chatAgent.agentID)
        userDetailsPage = await usersPage.selectUser(chatAgent.agentID);
        let userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editConcurrentChats("Custom", 3);
        await userDetailsSystemPage.finishEditUserDetailsSystem();
        maxPage = await userDetailsSystemPage.launchMAX(chatAgent.phoneNumber);

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Send three chats to your agent 
        chat_response_1 = await TestHelpers.startChatContact(chatAgent);
        contactID_1 = await CustomAPIs.getContactID(chat_response_1);
        await maxPage.acceptNewChatContact();

        chat_response_2 = await TestHelpers.startChatContact(chatAgent);
        contactID_2 = await CustomAPIs.getContactID(chat_response_2);
        await maxPage.acceptNewChatContact();

        chat_response_3 = await TestHelpers.startChatContact(chatAgent);
        contactID_3 = await CustomAPIs.getContactID(chat_response_3);
        maxChatPage = await maxPage.acceptNewChatContact();

        // VP: The chats are created and routed to the agent
        expect(await maxChatPage.getNumberChatContacts() == "3").toBe(true, 'Chat contacts does not equals to 3')

        // 3. Click the launch button on one of the chats
        await maxChatPage.openLaunchMenuWithContactID(contactID_1);

        launchButtonColor_1 = await maxChatPage.getColorLaunchButtonWithContactID(contactID_1);
        launchButtonColor_2 = await maxChatPage.getColorLaunchButtonWithContactID(contactID_2);
        launchButtonColor_3 = await maxChatPage.getColorLaunchButtonWithContactID(contactID_3);

        // VP: Confirm it only highlights the launch button that was clicked and not all the launch buttons on all three chats
        expect(await launchButtonColor_1 == launchButtonColor_2).toBe(false, 'Launch button contact 1 is the same color with button 2')
        expect(await launchButtonColor_1 == launchButtonColor_3).toBe(false, 'Launch button contact 1 is the same color with button 3')
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            // Close Launch Menu
            await maxChatPage.closePopover();

            // End chat contact
            await maxChatPage.endSpecifiedChatWithContactId(contactID_1.toString());
            await maxChatPage.endSpecifiedChatWithContactId(contactID_2.toString());
            await maxChatPage.endSpecifiedChatWithContactId(contactID_3.toString());
            await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

            // Log out central
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




