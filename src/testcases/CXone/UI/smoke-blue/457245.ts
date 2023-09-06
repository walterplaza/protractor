import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import CXOneDataDownloadPage from "@page-objects/CXone/reporting/acd-data-download/data-download-page";
import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: CXone
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 457245
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO31, SO32
 *
 */

describe('SMOKE_Automated_Blue - 457245', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let itemName: string = 'List of agents';
    let downloadFile: string = 'Data.csv';

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let prebuiltReportPage: PrebuiltReportPage;
    let dataDownloadPage: CXOneDataDownloadPage;
    let basePage: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `457245 - [SMOKE] CxOne > Reporting > Data Download > Smoke testing'`);
        admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
        basePage = new PageBase();

        // 2. Login to Evolve
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);
    }, TestRunInfo.conditionTimeout);

    it('457245 - CxOne Reporting Data Download Smoke testing', async () => {

        // 3. Go to Admin > Reporting > Data Download and click on it.
        prebuiltReportPage = await employeesPage.gotoPrebuiltReportsPage();
        dataDownloadPage = await prebuiltReportPage.gotoDataDownloadPage();

        // VP: Data download report should be displayed.
        expect(await dataDownloadPage.isDataDownloadTableDisplayed()).toBe(true, "List of active rules is not displayed");

        // 4. Select a valid Data download Report from left panel.
        await dataDownloadPage.selectDataItem(itemName);

        // VP: Data download  Report should be selected.
        expect(await dataDownloadPage.isDownloadItemSelected(itemName)).toBe(true, "Item is not selected");

        // 5. Click on Download button	
        await dataDownloadPage.downloadDataItem();

        // VP: Data download report should be downloaded.
        expect(await Utility.isFileDownloaded(downloadFile)).toBe(true, "File is not downloaded");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up Downloaded file
            await Utility.cleanUpDownloadFile(downloadFile);
            await employeesPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});