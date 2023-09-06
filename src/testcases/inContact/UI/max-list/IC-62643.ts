import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import UserDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";


/** 
 * Type: inContact
 * Suite: Max suite
 * TC ID: 369352
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('MAX suite - IC-62643', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let popUpChatTimeOut: number = 30;
    let popUpChatTimeOutDefault:number = 0;
    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let usersPage: UsersPage;
    let userDetailsPage: UserDetailsPage;
    let userDetailsSystemPage: UserDetailsSystemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62643 - MAX > Chat times out`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        usersPage = await centralPage.gotoUsersPage();
        // Set refusal popup new contact chat and voicemail timeout
        await usersPage.searchUser(chatAgent.agentID);
        userDetailsPage = await usersPage.selectUser(chatAgent.agentID);
        userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editRefusalChatTimeOut(popUpChatTimeOut)
        await userDetailsSystemPage.editVoiceEmailRefusalTimeout(15);
        await userDetailsSystemPage.finishEditUserDetailsSystem();
        await centralPage.logOut();

        // Start a chat
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62643 - MAX Chat times out', async () => {
        //defaultRefusalTimeOut= await userDetailsSystemPage.getRefusalChatTimeOut();
        // Pre Condition
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent)

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Agent is offered chat
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 3. Wait and check for Popup disappear after timeout
        expect(await maxPage.checkNewContactPopUpTimeout(popUpChatTimeOut)).toBe(true, "New Contact Popup disappears before time out");

        // VP: Agent is now Unavailable and Refused
        expect(await maxPage.getStateStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unnvailable");
        expect(await maxPage.getOutStateStatus()).toBe(MaxState.REFUSED, "Agent status doesn't change to Refused");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
            await TestCondition.setRefusalChatTimeOut(chatAgent, popUpChatTimeOutDefault)
        } catch (err) { }
        finally {
            try {
                await TestCondition.setRefusalChatTimeOut(chatAgent, popUpChatTimeOutDefault)
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});
