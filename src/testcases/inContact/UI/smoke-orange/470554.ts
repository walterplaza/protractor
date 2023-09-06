import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Schedule } from "@data-objects/inContact/central/reporting-analytics/custom-reporting/schedules/schedule-report-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CreateReportSchedulePage from "@page-objects/inContact/central/reporting-analytics/data-download/report-schedule/create-report-schedule-page";
import ReportSchedulesListPage from "@page-objects/inContact/central/reporting-analytics/data-download/report-schedule/report-schedules-list-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 470554
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_OF - 470554', function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let scheduleData;
    let reportScheduleListPage: ReportSchedulesListPage;
    let createReportSchedulePage: CreateReportSchedulePage;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `470554 - [Smoke] Central > Reporting/Analytics > Schedules > Smoke testing over Schedules for DataDownload report`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);

        // 2. Login Central Page.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);
        scheduleData = new Schedule();
    }, TestRunInfo.conditionTimeout);

    it('470554 - Smoke Central Reporting Analytics Schedules Smoke testing over Schedules for DataDownload report', async () => {

        // 3. Go to Reporting/Analytics > Data Download > Report Schedules
        reportScheduleListPage = await centralPage.gotoScheduleListPage();

        // VP: Check report schedules list is displayed
        expect(await reportScheduleListPage.isReportScheduleListDisplayed()).toBe(true, "Report schedules list is not displayed");

        // 4. Create a new schedule report
        createReportSchedulePage = await reportScheduleListPage.createNewReportSchedules();

        // 5. Fill the next fields
        // Create new schedule - Fill in information for Step 1, 2 and 3 of creation schedule
        scheduleData.initData('TestName', 'FileReport');

        await createReportSchedulePage.submitCreateScheduleStep1(scheduleData);
        await createReportSchedulePage.submitCreateScheduleStep2(scheduleData);
        await createReportSchedulePage.submitCreateScheduleStep3();

        // VP: New schedule report should be created
        expect(await createReportSchedulePage.isSuccessMessageDisplayed()).toBe(true, "Message is not displayed");

        // 5. Click on Active button
        await createReportSchedulePage.activeReportSchedule();
        await createReportSchedulePage.gotoScheduleListPage();
        await reportScheduleListPage.searchReportSchedules(scheduleData.reportName);

        // VP: Date Downloaded schedule report should be created
        expect(await reportScheduleListPage.isReportScheduleDisplayed(scheduleData.reportName)).toBe(true, "Report schedule is not displayed");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log Out
            await reportScheduleListPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});



