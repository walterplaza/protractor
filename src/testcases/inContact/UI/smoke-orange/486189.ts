import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 486189
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('SMOKE_Automated_Orange_FULL - 486189', function () {
    TestBase.scheduleTestBase();
    let admin: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let skillListPage: SkillsListPage;
    let skillDetailPage: SkillsDetailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `486189 - Central changes to add new configuration fields on skill page_To validate element and labels  of 'Enable Chat Messaging Time Out' checkbox in existing chat skill`);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(admin);
    }, TestRunInfo.conditionTimeout);

    it(`486189 - Central changes to add new configuration fields on skill page_To validate element and labels  of 'Enable Chat Messaging Time Out' checkbox in existing chat skill`, async () => {

        // 2. Navigate to Routing>Skills
        skillListPage = await centralPage.gotoSkillsListPage();

        // VP: Skills List page should display
        expect(await skillListPage.isDisplayed()).toBe(true, "Skills List page is not displayed");

        // 3. Select a chat skill
        skillDetailPage = await skillListPage.selectSkillDetail(SkillType.CHAT);

        // VP: Skill details should display
        expect(await skillDetailPage.isDisplayed()).toBe(true, "Skill details is not displayed");

        // 4. Click Edit button
        await skillDetailPage.clickEditButton();

        // VP: Skill details edit page should display
        expect(await skillDetailPage.isSkillDetailEditPageDisplayed()).toBe(true, "Skill details edit page is not displayed");

        // 5. Select 'Enable Chat Messaging Time Out' checkbox from Automated Chat Messaging Time Out section
        await skillDetailPage.enableChatMessagingTimeOutCheckbox();

        // VP: 'Time to inactive Chat Message' textbox should be enable
        expect(await skillDetailPage.isTimeToInactiveChatMessageEnabled()).toBe(true, "'Time to inactive Chat Message' textbox is not enable");

        // VP: 'Inactive Chat Message' textbox should be enable
        expect(await skillDetailPage.isInactiveChatMessageEnabled()).toBe(true, "'Inactive Chat Message' textbox is not enable");

        // VP: 'Chat Termination Count Down' textbox should be enable
        expect(await skillDetailPage.isChatTerminationCountDownEnabled()).toBe(true, "'Chat Termination Count Down' textbox is not enable");

        // VP: 'Chat Terminated Message' textbox should be enable
        expect(await skillDetailPage.isChatTerminatedMessageEnabled()).toBe(true, "'Chat Terminated Message' textbox textbox is not enable");

        // 5. Discard Changes
        await skillDetailPage.discardChanges();

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log Out
            await centralPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);

});