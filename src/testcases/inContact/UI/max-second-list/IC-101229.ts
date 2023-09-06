import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { EmailParkMode } from "@data-objects/inContact/max/email/email-info";
import userDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import userDetailsSystemPage from "@page-objects/inContact/central/admin/users/user-details/user-details-system-page";
import usersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455777
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101229", function () {
    TestBase.scheduleTestBase();
    let serverMail: string;
    let ibMail: InboundEmail;
    let emailJson: string = `{"emailParking":true}`;
    let ibEmailAgent: Agent;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxEmailPage: MaxEmail;
    let emailContactIdArr: number[];
    let numberOfParkedEmail: number;
    let usersPage: usersPage;
    let userDetailsPage: userDetailsPage;
    let userDetailsSystemPage: userDetailsSystemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101229 - [MAX] [SCH] Verify that auto-parked emails can be ended without problems`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL, null, null, emailJson, TestRunInfo.longTimeout);
        await ibEmailAgent.createPhoneNumber();

        // 1. Pre-condition: an email skill setup with parking enabled
        ibMail = new InboundEmail();
        serverMail = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);

        //2. Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        usersPage = await centralPage.gotoUsersPage();

        // Update user page
        await usersPage.searchUser(ibEmailAgent.agentID)
        userDetailsPage = await usersPage.selectUser(ibEmailAgent.agentID);
        userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
        await userDetailsSystemPage.selectEditUserDetailsSystem();
        await userDetailsSystemPage.editEmailRefusalTimeout(15);
        await userDetailsSystemPage.editVoiceEmailRefusalTimeout(15);
        await userDetailsSystemPage.editAutoParkedEmails("Custom", 3);
        await userDetailsSystemPage.finishEditUserDetailsSystem();

        // Enable email parking        
        await TestCondition.editEmailParkingMode(ibEmailAgent, State.ON);
    }, TestRunInfo.conditionTimeout);

    it('IC-101229 - MAX SCH Verify that auto-parked emails can be ended without problems', async () => {

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // 4. Change Max status to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 5. Send an email to your agent
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: The mail workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");

        // 6. Send multiple emails
        await Utility.sendIBEmail(serverMail, ibMail);
        await maxPage.showMaxGlance();

        // VP: Emails are in queue
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "Email contact is not in queue");

        // 7. Wait for emails in queue to be auto-parked, then it appears on the 'Parked' section
        await maxPage.hideMaxGlance();
        numberOfParkedEmail = await maxEmailPage.getParkedEmailNumber();
        await maxEmailPage.waitForParkedEmailBoxChange(numberOfParkedEmail + 1);

        emailContactIdArr = await TestHelpers.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL), true);

        // 8. End the Email in Working section
        await maxEmailPage.endEmailContact(false);

        // VP: Email should disappear to the working section        
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL,TestRunInfo.shortTimeout)).toBe(false, "The mail workspace is still displayed");

        // 9. Select Parked emails
        await maxPage.showMaxGlance();
        await maxPage.showContactWorkSpace(ContactName.EMAIL);
        await maxEmailPage.selectItemInParkedList(emailContactIdArr[numberOfParkedEmail + 1]);
        await maxEmailPage.waitForParkedEmailDisplays(emailContactIdArr[numberOfParkedEmail + 1], true);

        // Then click on 'Unpark Email (work now)'
        await maxEmailPage.unparkEmail(EmailParkMode.UNPARK_WORK_NOW, emailContactIdArr[numberOfParkedEmail + 1]);

        // VP: Email should be appear at the Working section
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "The mail workspace is not displayed");

        // 10. End the Email in Working section
        await maxEmailPage.endEmailContact(false);

        // VP: Email should disappear to the working section 
        await maxPage.waitForMAXStateChangeTo(MaxState.AVAILABLE);
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL,TestRunInfo.shortTimeout)).toBe(false, "The mail workspace is still displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            centralPage = await maxPage.logOut();

            // Reset configuration to default
            usersPage = await centralPage.gotoUsersPage();
            await usersPage.searchUser(ibEmailAgent.agentID)
            userDetailsPage = await usersPage.selectUser(ibEmailAgent.agentID);
            userDetailsSystemPage = await userDetailsPage.selectUserDetailsSystemTab();
            await userDetailsSystemPage.selectEditUserDetailsSystem();
            await userDetailsSystemPage.editAutoParkedEmails("Custom", 0);
            await userDetailsSystemPage.finishEditUserDetailsSystem();
            await TestCondition.editEmailParkingMode(ibEmailAgent, State.OFF);

            // Logout InContact
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});