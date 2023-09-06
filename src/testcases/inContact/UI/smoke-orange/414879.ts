import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Schedule } from "@data-objects/inContact/central/reporting-analytics/custom-reporting/schedules/schedule-report-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import CreateCustomReportSchedulePage from "@page-objects/inContact/central/reporting-analytics/custom-reporting/schedules/create-custom-report-schedule-page";
import CustomReportSchedulesListPage from "@page-objects/inContact/central/reporting-analytics/custom-reporting/schedules/custom-report-schedules-list-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";


/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full (486741)
 * TC ID: 414879
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_OF - 414879', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let scheduleData = new Schedule();
    let customReportScheduleListPage: CustomReportSchedulesListPage
    let createCustomReportSchedulePage: CreateCustomReportSchedulePage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `414879 - [SMOKE] Central > Reporting/Analytics > Schedules > Smoke testing over Schedules for Custom Reporting`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        // 1. Central credentials 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('414879 - SMOKE Central Reporting Analytics Schedules Smoke testing over Schedules for Custom Reporting', async () => {

        // 3. Go to Reporting/Analytics > Custom Reporting > Schedules
        customReportScheduleListPage = await centralPage.gotoCustomReportingScheduleListPage();

        // VP: Schedules list should be displayed.
        expect(await customReportScheduleListPage.isCustomReportScheduleListDisplayed()).toBe(true, "Custom Report schedules list is not displayed");

        // 4. Create a new schedule custom report
        createCustomReportSchedulePage = await customReportScheduleListPage.createNewCustomReportSchedules();

        // Create new schedule - Fill in information for Step 1, 2 and 3 of creattion schedule
        scheduleData.initData('TestName', 'FileReport');
        await createCustomReportSchedulePage.submitCreateCustomScheduleStep1(scheduleData);
        await createCustomReportSchedulePage.submitCreateCustomScheduleStep2(scheduleData);
        await createCustomReportSchedulePage.submitCreateCustomScheduleStep3(scheduleData);

        // VP: Schedule Custom report should be created
        expect(await createCustomReportSchedulePage.isSuccessMessageDisplayed()).toBe(true, "Message is not displayed");

        // 5. Click on Active button
        await createCustomReportSchedulePage.activeCustomReportSchedule();
        await createCustomReportSchedulePage.gotoCustomReportingScheduleListPage();
        await customReportScheduleListPage.searchCustomReportSchedules(scheduleData.reportName);

        // VP: Schedule Custom report should be activated.
        expect(await customReportScheduleListPage.isCustomReportScheduleDisplayed(scheduleData.reportName)).toBe(true, "Report schedule is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try{   
        // Post-Condition: Delete file after uploading
        await customReportScheduleListPage.logOut();
        }
        catch (err){
        }
        finally{
        try{
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err){
        }
    }
    }, TestRunInfo.conditionTimeout);
});



