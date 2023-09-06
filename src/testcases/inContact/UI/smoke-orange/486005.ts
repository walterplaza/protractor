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
 * TC ID: 486005
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('SMOKE_Automated_Orange_FULL - 486005', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let skillDetailValue: string

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let skillListPage: SkillsListPage
    let skillDetailPage: SkillsDetailPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `486005 - entral changes to add new configuration fields on skill page_To validate disablement of 'Enable Chat Messaging Time Out' checkbox in existing chat skill`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);

    }, TestRunInfo.conditionTimeout);

    it(`486005 - Central changes to add new configuration fields on skill page_To validate disablement of 'Enable Chat Messaging Time Out' checkbox in existing chat skill`, async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // 2. Navigate to Routing>Skills
        skillListPage = await centralPage.gotoSkillsListPage();

        // VP: Skills List page should display
        expect(await skillListPage.isDisplayed()).toBe(true, "Skills List page is not displayed");

        // 3. Select a chat skill
        skillDetailPage = await skillListPage.selectSkillDetail(SkillType.CHAT);

        // VP: Skill details with 'Enable Chat Messaging Time Out' should display as Not set 
        skillDetailValue = await skillDetailPage.getSkillDetailValue("Enable Chat Messaging Time out");
        expect(await skillDetailValue).toBe("Not set", "Skill details with 'Enable Chat Messaging Time Out' is not displayed as Not set");

        // 4. Click Edit button
        await skillDetailPage.clickEditButton();

        // VP: Skill details should display
        expect(await skillDetailPage.isDisplayed()).toBe(true, "Skill details is not displayed");

        // VP: 'Enable Chat Messaging Time Out' checkbox should be disable
        expect(await skillDetailPage.isChatMessagingTimeOutChecked()).toBe(false, "'Enable Chat Messaging Time Out' checkbox is not disabled");

        // 5. Discard Changes
        await skillDetailPage.discardChanges();
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await centralPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});