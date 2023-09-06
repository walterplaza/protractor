import CustomAPIs from "@apis/custom-apis";
import { ActivityCodes } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-64167
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-64167', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obPhoneAgent: Agent;
    let startDateTime: string = Utility.generateTimeForWFMActivity(2);
    let startTime: string = startDateTime.substring(startDateTime.split(":")[0].lastIndexOf(" ") + 1, startDateTime.length);
    let endDateTime: string = Utility.generateTimeForWFMActivity(3);
    let endTime: string = endDateTime.substring(endDateTime.split(":")[0].lastIndexOf(" ") + 1, endDateTime.length);
    let activity: string = ActivityCodes.MEETING;
    let timezone: string = Utility.getSystemTimeZone().timeZone

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-64167 - [MAX][Userhub][Scheduler notifications]New activity created is shown in MAX ');

        // Preconditions
        obPhoneAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
        await CustomAPIs.getAgentInfo(obPhoneAgent);
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obPhoneAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-64167 - MAX Userhub Scheduler notifications New activity created is shown in MAX ', async () => {

        // 1. In CXone go to the WFM secion
        WFMMenu = await employeesPage.gotoWFMPage();

        // VP: WFM workspace is now shown 
        expect(await WFMMenu.isPageDisplayed()).toBe(true, "WFM workspace is not shown");

        // 2. Click on schedule manager 
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();

        // VP: Schedule manager is shown 
        expect(await scheduleManagerPage.isPageDisplayed()).toBe(true, "Schedule manager is not shown");

        // 3. Find your user using the search function and click on the timeline next to the current time/date
        await scheduleManagerPage.removeAllActivities();
        await scheduleManagerPage.setTimeZone(timezone);
        await scheduleManagerPage.searchUserName(obPhoneAgent.firstName);
        await scheduleManagerPage.clickAddActivity(obPhoneAgent.name.charAt(0).toUpperCase() + obPhoneAgent.name.slice(1));

        // VP: A pop up with Add activity and add shift is shown
        expect(await scheduleManagerPage.isAddShiftAndActivityDisplayed(TestRunInfo.middleTimeout)).toBe(true, 'A pop up with Add activity and add shift is not shown')

        // 4. Click Add activity  and create an a new activity making sure the time is in the near future
        await scheduleManagerPage.addActivity(activity, startDateTime, endDateTime);

        // 5. Click save and publish on the scheduler workspace
        await scheduleManagerPage.publishNewSchedule();
        await scheduleManagerPage.pressConfirmPublishNewSchedule();

        // VP: The new schedule is created
        //expect(await scheduleManagerPage.isScheduleActivityDisplayed(activity, startDateTime, endDateTime)).toBe(true, "Agent can't see his Schedule");
        expect(await scheduleManagerPage.isActivityPresentInShift(activity, obPhoneAgent.name)).toBe(true, "Agent can't see his Schedule");

        // Launch MAX
        maxPage = await scheduleManagerPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obPhoneAgent.phoneNumber);

        // 6. On MAX confirm the new activity is shown on the glance on the "Coming Up" section
        // VP: The new activity is shown in MAX
        expect(await maxPage.isScheduleItemDisplayed(activity, startTime, endTime)).toBe(true, "The new activity is not shown in MAX ");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Log out 
            await maxPage.logOut()
            await scheduleManagerPage.removeAllActivities();
            await scheduleManagerPage.logOut()
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});