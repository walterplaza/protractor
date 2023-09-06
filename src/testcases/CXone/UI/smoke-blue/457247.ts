import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import AgentSnapShotPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/agent-snapshot";
import CampaignPerformancePrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/campaign-performance";
import PerformanceSkillPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/skill-performance";
import SupervisorSnapshotPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/supervisor-snapshot";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: CxOne E2E
 * TC ID: 457247
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
*/

describe("CxOne E2E - 457247", function () {
    let agent: Agent;
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let agentReportingPage: PrebuiltReportPage;
    let agentAgentSnapshotPage: AgentSnapShotPrebuiltReport;
    let skillPerformancePage: PerformanceSkillPrebuiltReport;
    let supervisorSnapshotPrebuiltReport: SupervisorSnapshotPrebuiltReport;
    let campaignPerformancePrebuiltReportPage: CampaignPerformancePrebuiltReport;
    let basePage: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `457247 - CxOne > Reporting > Prebuilt Reports > Bi reports`);
        agent = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('457247 - CxOne Reporting Prebuilt Reports Bi reports', async () => {

        // 2. Login CXone
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(agent);

        // 3. Go to Admin > Reporting > Prebuilt Reports > Agent Snapshot report and click on it.
        agentReportingPage = await employeesPage.gotoReportingPage();
        agentAgentSnapshotPage = await agentReportingPage.gotoAgentSnapShotPrebuiltReport();

        // VP: The Agent Snapshot Report should be opened
        expect(await agentAgentSnapshotPage.isPageDisplayed()).toBe(true, "Agent Snapshot page is not displayed")

        // 4. Click on Run Report button
        await agentAgentSnapshotPage.runReporting()

        // VP: Agent Snapshot Report should be displayed.
        expect(await agentAgentSnapshotPage.isAgentSnapshotReportResultDisplayed()).toBe(true, "Agent Snapshot page is not displayed")

        // 5. Go to Admin > Reporting > Prebuilt Reports > Skill Performance report and click on it.
        agentReportingPage = await agentAgentSnapshotPage.gotoReportingPage();
        skillPerformancePage = await agentReportingPage.gotoSkillPerformancePrebuiltReport();

        // VP: The Skill Performance Report should be opened
        expect(await skillPerformancePage.isPageDisplayed()).toBe(true, "Skill performance page is not displayed")

        // 6. Click on Run Report button
        await skillPerformancePage.runReporting();

        // VP: Skill Performance Report should be displayed.
        expect(await skillPerformancePage.isSkillPerformanceReportResultDisplayed()).toBe(true, "Skill performance page is not displayed")

        // 7. Go to Admin > Supervisor Snapshot report and click on it.
        agentReportingPage = await skillPerformancePage.gotoReportingPage();
        supervisorSnapshotPrebuiltReport = await agentReportingPage.gotoSupervisorSnapshotPage();

        // VP: The Supervisor Snapshot Report should be opened
        expect(await supervisorSnapshotPrebuiltReport.isPageDisplayed()).toBe(true, " Supervisor Snapshot page is not displayed")

        // 8. Click on Run Report button
        await supervisorSnapshotPrebuiltReport.runReporting();

        // VP: Supervisor Snapshot Report should be displayed.
        expect(await supervisorSnapshotPrebuiltReport.isSupervisorSnapshotReportResultDisplayed()).toBe(true, "Supervisor Snapshot page is not displayed")

        // 9. Go to Admin > Reporting > Prebuilt Reports > Campaign Performance report and click on it.
        agentReportingPage = await supervisorSnapshotPrebuiltReport.gotoReportingPage();
        campaignPerformancePrebuiltReportPage = await agentReportingPage.gotoCampaignPerformancePage();

        // VP: The Campaign Performance Report should be opened
        expect(await campaignPerformancePrebuiltReportPage.isPageDisplayed()).toBe(true, "Campaign performance page is not displayed")

        // 10. Click on Run Report button
        await campaignPerformancePrebuiltReportPage.runReporting()

        // VP: Campaign Performance Report should be displayed.
        expect(await campaignPerformancePrebuiltReportPage.isCampaignPerformanceReportResultDisplayed()).toBe(true, "Campaign performance page is not displayed")
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            await agentReportingPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});