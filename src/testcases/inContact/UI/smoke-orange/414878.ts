import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ExtensibleReport } from "@data-objects/inContact/central/internal-admin/extensible-reports/extensible-report-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CreateExtensibleReportsPage from "@page-objects/inContact/central/internal-admin/extensible-reports/create-extensibles-reports-page";
import ExtensibleReportsListPage from "@page-objects/inContact/central/internal-admin/extensible-reports/extensible-reports-list-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 414878
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_OF - 414878', function () {
    TestBase.scheduleTestBase();
    let admin: Agent;
    let extensibleReportData;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let extensibleReportsListPage: ExtensibleReportsListPage;
    let createExtensibleReportsPage: CreateExtensibleReportsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `414878 - [SMOKE] Central > Reporting/Analytics > Custom > Smoke testing over Custom Reports`);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('414878 - SMOKE Central Reporting Analytics Custom Smoke testing over Custom Reports', async () => {

        // 2. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(admin);
        extensibleReportData = new ExtensibleReport();

        // 3. Go to Internal Admin > Extensible Reports
        extensibleReportsListPage = await centralPage.gotoExtensibleReportsListPage();

        // VP: Extensible Report list should be displayed.
        expect(await extensibleReportsListPage.isExtensibleReportsListDisplayed()).toBe(true, "Extensible Report list is not displayed.");

        // 4. Click on create New button
        createExtensibleReportsPage = await extensibleReportsListPage.clickCreateNewExtensibleReport();

        extensibleReportData.initData('TestName');

        // VP: Extensible Report form should be displayed
        expect(await createExtensibleReportsPage.isCreateExtensibleReportFormDisplayed()).toBe(true, "Extensible Report form is not displayed");

        // 5. Fill Report information with valid values
        await createExtensibleReportsPage.fillValueExtensibleReport(extensibleReportData.reportName, extensibleReportData.fileName);

        // VP: Report information should be filled
        expect(await createExtensibleReportsPage.getReportFillesInformation()).toBe(extensibleReportData.reportName + " " + extensibleReportData.fileName, "Report schedule is not displayed");

        // 6. Click on Create Report button 
        await createExtensibleReportsPage.clickCreateReport();

        // VP: Verify that Extensible Report list is displayed again.
        expect(await extensibleReportsListPage.isExtensibleReportsListDisplayed()).toBe(true, "Extensible Report list is not displayed.");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out
            await extensibleReportsListPage.logOut();
        }
        catch (error) { }
    }, TestRunInfo.conditionTimeout);
});



