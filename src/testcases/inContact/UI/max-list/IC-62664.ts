import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { InboundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxEmail from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 294342
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62664', function () {
    TestBase.scheduleTestBase();
    let ibMail = new InboundEmail();
    let serverMail: string = TestRunInfo.cluster.getURL(PageName.SERVER_MAIL);

    //Declare page objects
    let ibEmailAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let userPage: UsersPage
    let maxPage: MaxPage;
    let userDetailsPage: UserDetailsPage;
    let maxEmailPage: MaxEmail;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62664 - MAX > UI > Panel > Resizing Panel > Email IB`);
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        // 1. Pre Conditions
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibEmailAgent);
        //Initial email
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);
    }, TestRunInfo.conditionTimeout);

    it('IC-62664 - MAX UI Panel Resizing Panel Email IB', async () => {
        // Get skill ID of the skill name
        let skillID = await CustomAPIs.getSkillIdFromSkillName(ibEmailAgent, SkillType.IB_EMAIL);

        // VP: User has Email skill assigned
        userPage = await centralPage.gotoUsersPage();
        await userPage.searchUser(ibEmailAgent.email);
        userDetailsPage = await userPage.selectUser(ibEmailAgent.email);
        await userDetailsPage.selectUserDetailsMenu("UserSkills");
        await userDetailsPage.searchAssignedSkill(skillID.toString());
        expect(await userDetailsPage.isSkillAssigned(skillID.toString())).toBe(true, "Skill is not assigned correctly");

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibEmailAgent.phoneNumber);

        // VP: check activity exists in queue inC-UI: Email Inbound
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(true, "There is no email inbound");

        // 3. Get MAX page size inC-UI
        let beforeWidth = await maxPage.getMaxWrapPanelSize();

        // Set Agent state
        await maxPage.changeState(MaxState.AVAILABLE);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // VP: Verify the email interaction window resizes automatically with panel moving over to make room for the email sizing window.
        let afterWidth = await maxPage.getMaxWrapPanelSize();
        expect(afterWidth).toBeGreaterThan(beforeWidth, "Workspace size does not adjust automatically");

        // 4. End Inbound mail contact
        maxPage = await maxEmailPage.endEmailContact(false);

        // VP: Verify panel resizes into interaction window space as before the contact routed and panels resized.
        expect(beforeWidth).toBe(await maxPage.getMaxWrapPanelSize(), "Workspace size does not restore automatically");

        // 5. Send multiple inbound email
        await Utility.sendIBEmail(serverMail, ibMail);
        await Utility.sendIBEmail(serverMail, ibMail);
        maxEmailPage = await maxPage.waitForEmailWorkspace();

        // VP: Email workspace is displayed
        expect(await maxEmailPage.isContactWorkSpaceDisplayed(ContactName.EMAIL)).toBe(true, "Email workspace is not displayed")

        // VP: Verify resizes happen automatically if multiple contacts are handled in succession
        let multipleWidth = await maxPage.getMaxWrapPanelSize();
        expect(multipleWidth).toBeGreaterThan(beforeWidth, "Workspace size does not adjust automatically");

        // 6. End email on MAX inC-UI
        await maxEmailPage.endEmailContact(false);
        await maxEmailPage.endEmailContact(false);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up`);
        try {
            // Log out central
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
            }
            catch (err) {
                console.log(err);
            }
        }
    }, TestRunInfo.conditionTimeout);
});



