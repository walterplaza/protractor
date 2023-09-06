import { SchedulingUnit } from "@data-objects/CXone/admin/scheduling-unit";
import { Forecast } from "@data-objects/CXone/wfm/forecasting/forecast";
import { ActivityCodes, ShiftTime } from "@data-objects/CXone/wfm/rules/rule-info";
import { Schedule, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import GenerateScheduleManager from "@page-objects/CXone/wfm/scheduling/generate-schedule";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: CXone
 * Suite: CXone E2E
 * TC ID: IC-58568
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TO31
 * Note:
 */

describe('CxOne E2E - IC-58568', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let startTime: string = ShiftTime.SEVEN_PM;
    let endTime: string = ShiftTime.ELEVEN_PM;
    let activity: string = ActivityCodes.MEETING;
    let timezone: string;
    let scheduleUnit: string = SchedulingUnit.generateSchedulingUnitName();
    let forecastName = Forecast.generateForecasterName();
    let schedule = new Schedule().initData(scheduleUnit, StaffingPlan.AUTOMATIC_PLANNING, forecastName);
    let scheduleGeneratingWaitTime = TestRunInfo.longTimeout * 15;
    timezone = `(UTC${Utility.getSystemTimeZone().timeZone})`;
    TestRunInfo.testTimeout = TestRunInfo.testTimeout * 1.5;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let wFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;
    let pageBase = new PageBase();
    let generateSchedulePage: GenerateScheduleManager
    let maxWFOPanel: MAXWFOPanel;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-58568 - Evolve > Verify that MAX displays data from a Schedule set up on Evolve');

        // 1. Preconditions     

        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        loginPage = LoginPage.getInstance();
        await loginPage.loginAsAdmin(admin);
        wFMMenu = await loginPage.gotoWFMPage();
        scheduleManagerPage = await wFMMenu.gotoScheduleManager();
        await scheduleManagerPage.searchAndRemoveTimeShift(admin.name);
        employeesPage = await scheduleManagerPage.gotoEmployeesPage();
        loginPage = await employeesPage.logOut();

    }, TestRunInfo.conditionTimeout);

    it('IC-58568 - Evolve Verify that MAX displays data from a Schedule set up on Evolve', async () => {

        // VP: Sign In page is displayed with User name text box
        expect(await loginPage.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. And click Next button	
        await loginPage.enterUsername(admin);
        await loginPage.clickNextButton();
        await loginPage.waitForSpinner();

        // VP: User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPage.isUserNameTextBoxDisplayed()).toBe(false, "User name value not editable is not displayed");
        expect(await loginPage.isEnterPasswordControlsDisplayed()).toBe(true, "Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom are not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        // Click Sign In button
        await loginPage.enterPassword(admin);
        employeesPage = await loginPage.clickSignInButton();

        // 4. Click the top navigation icon and then click WFM	
        wFMMenu = await employeesPage.gotoWFMPage();
        scheduleManagerPage = await wFMMenu.gotoScheduleManager();

        // VP: Schedule Manager page is displayed with the Scheduler menu at the left
        expect(await scheduleManagerPage.isPageDisplayed()).toBe(true, "Schedule Manger page is not displayed");
        expect(await scheduleManagerPage.isSchedulerMenuOnLeft()).toBe(true, "Scheduler menu is not at the left")

        // 5. Click on Generate Schedule option from the left menu
        generateSchedulePage = await wFMMenu.gotoGenerateSchedulePage();

        // VP. Schedule Generator page will be displayed
        expect(await generateSchedulePage.isPageDisplayed()).toBe(true, "Generate schedule page does not display");

        // 6. Click on 'Generate New Schedule' button
        await generateSchedulePage.openGenerateNewScheduleForm();

        // VP. Generate New Schedule pop up will be displayed
        expect(await generateSchedulePage.isGenerateNewScheduleFormDisplayed()).toBe(true, "Generate schedule page does not display");

        // 7. Select Schedule Units
        // 8. Select the Start date
        // 9. From Staffing Plan select 'Automatic Planning (Generated Forecast)' option
        // 10. Selected the Forecast you generated on the prerequisites
        await generateSchedulePage.fillGenerateNewScheduleForm(schedule);

        // VP. Schedule Unit selected
        expect(await generateSchedulePage.isSchedulingUnitFilled()).toBe(true, "Scheduling Unit is not selected");

        // VP. Start date selected
        expect(await generateSchedulePage.isStartDateFilled(schedule)).toBe(true, "Start date is not selected");

        // VP. Option is selected
        expect(await generateSchedulePage.isAutomationOptionFilled(schedule)).toBe(true, "Automation option is not selected");

        // VP. Forecasted is selected
        expect(await generateSchedulePage.isForecasterFilled(schedule)).toBe(true, "Forecaster option is not selected");

        // 11. Click on Generate button	
        // Click on Generate Anyway button in the message displayed, and wait at least 3 minutes	
        await generateSchedulePage.clickGenerateButton();
        await generateSchedulePage.clickGenerateAnyButton();
        await generateSchedulePage.waitForScheduleGenerate(schedule, scheduleGeneratingWaitTime);

        // VP: Schedule will be generated
        expect(await generateSchedulePage.isScheduleGenerateSucceed(schedule)).toBe(true, "Automatic Schedule Generator page is displayed with the new Schedule generated listed, Status must be Succeeded");

        // 12. Now Navigate to Schedule Manager
        await wFMMenu.gotoWFMPage()

        // VP: Schedule Manager page will be displayed showing you the schedule generated for your agents in Day view
        expect(await scheduleManagerPage.isPageDisplayed()).toBe(true, "Schedule Manager page is not displayed")

        // 13. Click on Publish button
        // Click Publish Anyway button in the message displayed
        await scheduleManagerPage.generateActivitySchedule(admin.name, activity, startTime, endTime, timezone);

        // VP: Schedule will be published correctly
        expect(await scheduleManagerPage.isSchedulePublishSuccess()).toBe(true, "Schedule will be not published correctly")

        // 14. Search for the Agent's Schedules
        await scheduleManagerPage.searchUserName("'" + admin.name);

        // VP: Verify agent can see his Schedule
        expect(await scheduleManagerPage.isScheduleActivityDisplayed(activity, startTime, endTime)).toBe(true, "Agent cannot display the schedule")

        // 15. Launch MAX Agent entering a phone number
        maxPage = await scheduleManagerPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPage.connectMax();

        // VP: MAX is launched
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX isn't launched");

        // 16. Click on WFO Menu from at the bottom of the MAX agent click Open WFO
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();

        // VP: 'My Schedule' pane is displayed 
        expect(await maxWFOPanel.isMySchedulePanelDisplayed()).toBe(true, "'My Schedule' pane isn't displayed");

        // 17. Verify that on My Schedule tab you can see the Schedule setup on Evolve
        // VP: Agent's schedule is correctly displayed in MAX
        expect(await maxWFOPanel.isScheduleItemDisplayed(activity, startTime, endTime)).toBe(true, "Agent's schedule isn't correctly displayed in MAX");
        await maxWFOPanel.closeWFOPanel();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Clean up
            await maxPage.closeWFO();
            await maxPage.logOut()
        }
        catch (err) { }
        finally {
            try {
                await scheduleManagerPage.gotoWFMPage();
                await wFMMenu.gotoScheduleManager();
                await scheduleManagerPage.removeShift(admin.name);
                await scheduleManagerPage.logOut();
                await TestHelpers.endAllContacts(admin);
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});