import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import userDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import userDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";
import usersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 297368
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe("MAX suite - IC-101272", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxEmailPage: MaxEmail;
    let usersPage: usersPage;
    let userDetailsPage: userDetailsPage;
    let userDetailsSystemPage: userDetailsSystemPage;
    let pageBase: PageBase;
    let emailContactId: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101272 - MAX - Email Inbox - Parking disabled`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await TestCondition.setUpAndAssignSkill(ibEmailAgent, SkillType.CHAT);
        pageBase = new PageBase();

        // Pre-condition
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        // 1. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);


        // Update user page
        usersPage = await centralPage.gotoUsersPage();
        await usersPage.searchUser(ibEmailAgent.agentID)
        userDetailsPage = await usersPage.selectUser(ibEmailAgent.agentID);
        userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editAutoParkedEmails("Custom", 0);
        await userDetailsSystemPage.finishEditUserDetailsSystem();

    }, TestRunInfo.conditionTimeout);

    it('IC-101272 - MAX - Email Inbox - Parking disabled', async () => {

        //2. Launch Max
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        //3. Route a contact to the Agent (i.e. Chat, WI, Phone Call, Email) 
        await TestHelpers.startChatContact(ibEmailAgent);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxChatPage = await maxPage.acceptNewChatContact();
        expect(await maxChatPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed");

        //4 . Send an inbound email 
        await Utility.sendIBEmail(serverMail, ibMail);

        await maxPage.showMaxGlance();
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "Email contact is not in queue");

        // 5. Leave the Agent in a working state for 2 minutes 
        await pageBase.waitInSecond(120);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        //VP. Verify the Email is not in a parked state after the 2 minutes        
        emailContactId = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
        expect(await maxEmailPage.isEmailParked(emailContactId, TestRunInfo.shortTimeout)).toBe(false, "Emails is parked");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxEmailPage.endEmailContact(false);
            await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);

            // Logout MAX
            centralPage = await maxPage.logOut();

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
                await TestCondition.setUpAndRemoveSkill(ibEmailAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});