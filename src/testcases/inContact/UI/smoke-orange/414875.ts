import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import AdminDataDownloadPage from "@page-objects/inContact/central/reporting-analytics/data-download/admin-data-download/admin-data-download-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_OF
 * TC ID: 414875
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Note:
 * - IE, Firefox, Edge: Blocked because cannot configure browsers' settings automatically due to browsers' limitations. 
 */

describe('SMOKE_Automated_Orange_OF - 414875', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let itemName: string = 'Agent By Day';
    let downloadFile: string = 'Data.csv';

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let AdminDataDownloadPage: AdminDataDownloadPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `414875 - [SMOKE] Central > Reporting/Analytics > Data Download > Admin > Data Download > Smoke testing over Data download reports`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);

    }, TestRunInfo.conditionTimeout);

    it('414875 - Smoke Central Reporting Analytics Schedules Smoke testing over DataDownload report', async () => {

        // 1. Precondition:1. User should have necessary rights to Central > Reporting/Analytics > Data Download > Admin > Data Download
        // 2. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // 3. Go to Central > Reporting/Analytics > Data Download > Admin > Data Download
        AdminDataDownloadPage = await centralPage.gotoAdminDataDownloadPage();

        // VP: Data Download main page should be loaded
        expect(await AdminDataDownloadPage.isDataDownloadTableDisplayed()).toBe(true, "Data Download page is not displayed");

        // 4. Select a Data download report from Full report list
        await AdminDataDownloadPage.selectDataItem(itemName);

        // VP: Data download Report should be selected
        expect(await AdminDataDownloadPage.isDownloadItemSelected(itemName)).toBe(true, "Item is not selected");

        // 5. Click on Download button
        await AdminDataDownloadPage.downloadDataItem();

        // VP:  Data Download Report should be downloaded.
        expect(await Utility.isFileDownloaded(downloadFile)).toBe(true, "File is not downloaded");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out
            await AdminDataDownloadPage.logOut();

            //Clean up Downloaded file
            await Utility.cleanUpDownloadFile(downloadFile);
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});

