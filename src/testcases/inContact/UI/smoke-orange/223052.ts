import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import AgentSnapshotPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/agent-snapshot-page";
import CampaignPerformancePage from "@page-objects/inContact/central/reporting-analytics/canned-reports/campaign-performance-page";
import SkillPerformancePage from "@page-objects/inContact/central/reporting-analytics/canned-reports/skill-performance-page";
import SupervisorSnapshotPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/supervisor-snapshot-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 223052
 * Tested browser: Chrome, Firefox, IE, Edge 
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 223052", function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let agentSnapshotPage: AgentSnapshotPage;
    let campaignPerformancePage: CampaignPerformancePage;
    let skillPerformancePage: SkillPerformancePage;
    let supervisorSnapshotPage: SupervisorSnapshotPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `223052 - [SMOKE] Central > Reporting/Analytics > Canned Reports > BI Reports`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('223052 - SMOKE Central Reporting Analytics Canned Reports BI Reports', async () => {

        // 2. Central > inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // 3. Go to Reporting/Analytics > Canned Reports > Agent > Agent Snapshot
        agentSnapshotPage = await centralPage.gotoAgentSnapshot();

        // VP: Verify the Agent Snapshot Report should be opened
        expect(await agentSnapshotPage.isPageDisplayed()).toBe(true, "Agent Snapshot page is not displayed")

        // 4. Click on Run Report button
        agentSnapshotPage = await agentSnapshotPage.clickRun();

        // VP: Agent Snapshot Report result should be displayed.
        expect(await agentSnapshotPage.isAgentSnapshotReportResultDisplayed()).toBe(true, "Agent Snapshot Report result is not displayed");

        // 5. Go to Reporting/Analytics > Canned Reports > Agent > Campaign Performance
        campaignPerformancePage = await agentSnapshotPage.gotoCampaignPerformancePage();

        // VP: Verify the Campaign Performance Report should be opened
        expect(await campaignPerformancePage.isPageDisplayed()).toBe(true, "Campaign Performance Page is not displayed");

        // 6. Click on Run Report button
        campaignPerformancePage = await campaignPerformancePage.clickRun();

        // VP: Campaign Performance Report result should be displayed.
        expect(await campaignPerformancePage.isCampaignPerformanceReportResultDisplayed()).toBe(true, "Campaign Performance Report result is not displayed");

        // 7. Go to Reporting/Analytics > Canned Reports > Agent > Skill Performance
        skillPerformancePage = await campaignPerformancePage.gotoSkillPerformancePage();

        // VP: Verify the Skill Performance Report should be opened
        expect(await skillPerformancePage.isPageDisplayed()).toBe(true, "Skill Performance page is not displayed");

        // 8. Click on Run Report button
        skillPerformancePage = await skillPerformancePage.clickRun();

        // VP: Skill Performance Report result should be displayed.
        expect(await skillPerformancePage.isSkillPerformanceReportResultDisplayed()).toBe(true, "Skill Performance Report result is not displayed");

        // 9. Go to Reporting/Analytics > Canned Reports > Agent > Supervisor Snapshot
        supervisorSnapshotPage = await skillPerformancePage.gotoSupervisorSnapshotPage();

        // VP: Verify the Supervisor Snapshot Report should be opened
        expect(await supervisorSnapshotPage.isPageDisplayed()).toBe(true, "Supervisor Snapshot page is not displayed");

        // 10. Click on Run Report button
        supervisorSnapshotPage = await supervisorSnapshotPage.clickRun();

        // VP: Supervisor Snapshot Report result should be displayed.
        expect(await supervisorSnapshotPage.isSupervisorSnapshotReportResultDisplayed()).toBe(true, "Supervisor Snapshot Report result is not displayed");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            //Logout Central Page
            await supervisorSnapshotPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});