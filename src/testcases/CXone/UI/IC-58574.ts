import { SchedulingUnit } from "@data-objects/CXone/admin/scheduling-unit";
import { CoachingPlan } from "@data-objects/CXone/coaching/coaching-plan";
import { Forecast } from "@data-objects/CXone/wfm/forecasting/forecast";
import { PublishSchedule, Schedule, ScheduleDuration, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import QMMenuPage from "@page-objects/CXone/qm/qm-general/qm-menu";
import RealTimeAdherencePage from "@page-objects/CXone/wfm/real-time-adherence/real-time-adherence-page";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import GenerateSchedulePage from "@page-objects/CXone/wfm/scheduling/generate-schedule";
import WFMpage from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";
import { CoachingPackage } from "@data-objects/CXone/coaching/coaching-package";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import CoachingPlansDetailsPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plan-details-page";
import CoachingPackageDesigner from "@page-objects/CXone/coaching/coaching-package/coaching-package-designer";

/** 
 * Type: CXone
 * Suite: CxOne E2E
 * TC ID: IC-58574 (413234)
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
*/

describe('SMOKE_Automated_Blue - IC-58574', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let coachingPlan: CoachingPlan = new CoachingPlan().initData();
    let forecastName: string = Forecast.generateForecasterName();
    let scheduleUnit: string = SchedulingUnit.generateSchedulingUnitName();
    let schedule = new Schedule().initData(scheduleUnit, StaffingPlan.AUTOMATIC_PLANNING, forecastName);
    schedule.duration = ScheduleDuration.TWO_WEEK;
    let coachingPackage: CoachingPackage = new CoachingPackage().initData();
    let timeGenerated: number = 240;
    let publishSchedule = new PublishSchedule().initData();
    let csvArray: Array<string> = ['Agent', 'Email', 'Time Zone', 'Timestamp', 'From', 'To',
        'Scheduled Activity', 'Actual Activity', 'In Adherence(min)', 'Out of Adherence(min)'];

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMpage;
    let realTimeAdherencePage: RealTimeAdherencePage;
    let qmMenu: QMMenuPage;
    let coachingPlansPage: CoachingPlansPage;
    let coachingDetails: CoachingPlansDetailsPage;
    let generateSchedulePage: GenerateSchedulePage;
    let scheduleManagerPage: ScheduleManagerPage;
    let basePage: PageBase;
    let coachingPackagePage: CoachingPackagePage;
    let coachingPackageDesigner: CoachingPackageDesigner;

    // PreReq:	
    // 1. Login access to evolve.
    // 2. Have a forecast generated. Please see test case 410855 to see how to generate a forecast
    // 3. Have a Daily Rule set up (Evolve WFM > Scheduler > Scheduler Setup > Daily Rules)
    // 4. Have a Weekly Rule set up (Evolve WFM > Scheduler > Scheduler Setup > Weekly Rules). 
    // 5. Add Employees to the Weekly Rule
    // 6. Have Activity Codes setup (Evolve WFM > Scheduler > Scheduler Setup > Activity Codes)
    // 7. Have Activity Codes mapped with ACD Events.
    // 8.. Have a coaching plan scheduled

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58574 - Evolve>Supervisor_Exploratory Reports`);
        admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
        Utility.cleanUpDownloadFileWithExtension(".com.csv");
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-58574 - Evolve Supervisor_Exploratory Reports', async () => {

        // 2. As an administrator Log in to Evolve WFO. Staging environment https://na1.staging.nice-incontact.com
        // 3. Sign in with valid account
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);

        // 4. Click the top navigation icon and then click the Scheduler icon
        WFMMenu = await employeesPage.gotoWFMPage();

        // VP. Scheduler menu is displayed in the left side of the page
        expect(await WFMMenu.isSchedulerMenuOnLeft()).toBe(true, "Scheduler page does not display")

        // 5. Select Real Time Adherence
        realTimeAdherencePage = await WFMMenu.gotoRealTimeAdherenceMenu();

        // VP. Real Time Adherence page is displayed with the list of employees and the Generate Adherence Report button in the top of the page
        expect(await realTimeAdherencePage.isEmployeeListDisplayed()).toBe(true, "List of employees does not display");
        expect(await realTimeAdherencePage.isGenerateAdReportButtonDisplayed()).toBe(true, "Report button does not display");

        // 6. press Generate Adherence Report button
        await realTimeAdherencePage.clickGeneratedAdherenceReport();

        // VP. Generate Adherence Report window is displayed with: Scheduling Units combobox, start time time picker, and End time picker
        expect(await realTimeAdherencePage.isFromDateDisplayed()).toBe(true, "From date does not display")
        expect(await realTimeAdherencePage.isToDateDisplayed()).toBe(true, "To date does not display")
        expect(await realTimeAdherencePage.isSchedulingUnitDisplayed()).toBe(true, "Scheduling Unit does not display")

        // 7. Select: a Scheduling unit listed, select a start time, duration time and end time
        // VP. All values are correctly displayed
        expect(await realTimeAdherencePage.getSchedulingUnitValue()).toBe("1 Scheduling Units", "Scheduling Unit does not display")

        // 8. Press Generate button. After a few minutes there a file csv to download
        await realTimeAdherencePage.clickSubmitAdherenceReport();

        // 9. Open the csv file generated
        //VP the following columns are displayed: AgentName, AgentEmail, TimeZone, Date, From Time(local), Schedule Activity, Actual Activity, In Adherence(min), OOA(min)
        expect(await realTimeAdherencePage.isReportFileFormatCorrect(csvArray.toString())).toBe(true, "Schedule format does not correct")

        // 10. Click the top navigation icon and then click the 'Coaching' icon
        coachingPackagePage = await realTimeAdherencePage.gotoCoachingPage();

        // VP. Coaching Packages page is displayed
        expect(await coachingPackagePage.isPageDisplayed()).toBe(true, "Coaching Packages page does not display")

        // Create Coaching package.
        coachingPackageDesigner = await coachingPackagePage.clickNewCoachingPackageButton();
        await coachingPackageDesigner.createACoachingPackage(coachingPackage);
        coachingPlan.coachingPackage = coachingPackage.name;

        // 11. Click Coaching Plans
        coachingPlansPage = await coachingPackagePage.gotoCoachingPlansPage();

        // VP. Coaching Plan page is displayed
        expect(await coachingPlansPage.isPageDisplayed()).toBe(true, "Coaching plan does not display")

        // 12. Select a coaching plan with Active state
        coachingDetails = await coachingPlansPage.openNewCoachingPlan();
        await coachingDetails.createGeneralCoachingPlan(coachingPlan, admin.name);
        await coachingPlansPage.clickActiveCoachingPlan(coachingPlan.name);

        // VP. coaching plan is selected and form open
        expect(await coachingDetails.isCoachingPlanDisplayed(coachingPlan.name)).toBe(true, "Plan does not open");

        // 13. in the Form open review fields are not editable
        // VP. Fields: Coaching Plan Name, Select Coaching Package,Start DAte, End Date and Employees
        expect(await coachingDetails.isPlanNameEditable()).toBe(true, "Coaching plan name is editable");
        expect(await coachingDetails.isPlanPackageEditable()).toBe(true, "Coaching plan package is editable");
        expect(await coachingDetails.isPlanStartDateEditable()).toBe(true, "Coaching plan start date is editable");
        expect(await coachingDetails.isPlanEndDateEditable()).toBe(true, "Coaching plan name end date editable");

        // 14. Click the top navigaton icon and then click WFM icon
        await coachingDetails.gotoWFMPage();

        // VP. Schedule Manager page is displayed with the Scheduler menu at the left
        expect(await WFMMenu.isSchedulerMenuOnLeft()).toBe(true, "Scheduler page does not display");

        // 15. Click on Generate Schedule option from the left menu
        generateSchedulePage = await WFMMenu.gotoGenerateSchedulePage();

        // VP. Schedule Generator page will be displayed
        expect(await generateSchedulePage.isPageDisplayed()).toBe(true, "Generate schedule page does not display");

        // 16. Click on 'Generate New Schedule' button
        await generateSchedulePage.openGenerateNewScheduleForm();

        // VP. Generate New Schedule pop up will be displayed
        expect(await generateSchedulePage.isGenerateNewScheduleFormDisplayed()).toBe(true, "Generate schedule page does not display");

        // 17. Select Schedule Units
        // 18. Select the Start date
        // 19. Select the duration of the Schedule
        // 20. From Staffing Plan select 'Automatic Planning (Generated Forecast)' option
        // 21. Selected the Forecast you generated on the prerequisites
        await generateSchedulePage.fillGenerateNewScheduleForm(schedule);

        // VP. Schedule Unit selected
        expect(await generateSchedulePage.isSchedulingUnitFilled()).toBe(true, "Scheduling Unit is not selected");

        // VP. Start date selected
        expect(await generateSchedulePage.isStartDateFilled(schedule)).toBe(true, "Start date is not selected");

        // VP. Schedule Duration selected
        expect(await generateSchedulePage.isDurationFilled(schedule)).toBe(true, "Duration is not selected");

        // VP. Option is selected
        expect(await generateSchedulePage.isAutomationOptionFilled(schedule)).toBe(true, "Automation option is not selected");

        // VP. Forecasted is selected
        expect(await generateSchedulePage.isForecasterFilled(schedule)).toBe(true, "Forecaster option is not selected");

        // 22. Click on Generate button, click on Generate Anyway button, and wait at least 3 minutes
        await generateSchedulePage.clickGenerateButton();
        await generateSchedulePage.clickGenerateAnyButton();
        await generateSchedulePage.waitForScheduleGenerate(schedule, timeGenerated);

        // 23. Go to 'Schedule Manager' menu 
        await generateSchedulePage.gotoWFMPage();
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();

        // 24. Click Publish button
        await scheduleManagerPage.clickPublishSchedule();

        // VP. Publish New Schedules window is displayed
        expect(await scheduleManagerPage.isPublishNewScheduleDisplayed()).toBe(true, "Public new schedule window does not display");

        // 25. select a Start Date for the publishing range
        // Select the Length of the publishing period - 1 week, 2 weeks, 3 Weeks, or 1 Month.
        // The End Date will be filled in automatically.
        await scheduleManagerPage.fillPublishNewSchedulesForm(publishSchedule);

        // VP. Start-End and length values are displayed
        expect(await scheduleManagerPage.isDurationSelected(publishSchedule)).toBe(true, "Duration is not selected");
        expect(await scheduleManagerPage.isEndDateFilled(publishSchedule)).toBe(true, "End date does not change");

        // 26. click Publish button
        await scheduleManagerPage.pressConfirmPublishNewSchedule();

        // VP: The schedule will be distributed to the relevant employees. Each employee will receive an email notifying them that there are schedule updates with a link to their My Zone area, and will also receive a notification in the system
        expect(await scheduleManagerPage.isPublishedSuccessMgsDisplayed()).toBe(true, "Published Success message is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await scheduleManagerPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});