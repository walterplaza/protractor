import { ActivityCodes } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
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
 * TC ID: IC-84147
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-84147', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obPhoneAgent: Agent;
    let startDateTime: string = Utility.generateTimeForWFMActivity(2);
    let startTime: string = startDateTime.substring(startDateTime.split(":")[0].lastIndexOf(" ") + 1, startDateTime.length);
    let endDateTime: string = Utility.generateTimeForWFMActivity(3);
    let endTime: string = endDateTime.substring(endDateTime.split(":")[0].lastIndexOf(" ") + 1, endDateTime.length);
    let startTimeFullClock: string = Utility.formatDateTime(startDateTime, "LLL", 'MMM D, YYYY HH:mm');
    let startTimeFull: string = startTimeFullClock.substring(startTimeFullClock.lastIndexOf(" ") + 1, startTimeFullClock.length);
    let endTimeFullClock: string = Utility.formatDateTime(endDateTime, 'LLL', 'MMM D, YYYY HH:mm');
    let endTimeFull: string = endTimeFullClock.substring(endTimeFullClock.lastIndexOf(" ") + 1, endTimeFullClock.length);
    let activity: string = ActivityCodes.MEETING;
    let timezone: string = Utility.getSystemTimeZone().timeZone;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-84147 - [MAX] [Userhub] [Schedule] Verify that End time in scheduled activities are displayed when change to 24 hrs format.');

        obPhoneAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);

        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obPhoneAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-84147 - MAX Userhub Schedule Verify that End time in scheduled activities are displayed when change to 24 hrs format.', async () => {

        // 1. Preconditions:
        // Create scheduled activities for the day in WFM > Schedule Manager.
        WFMMenu = await employeesPage.gotoWFMPage();
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();
        await scheduleManagerPage.removeAllActivities()
        await scheduleManagerPage.generateActivitySchedule(obPhoneAgent.name.charAt(0).toUpperCase() + obPhoneAgent.name.slice(1), activity, startDateTime, endDateTime, timezone);

        // Launch MAX
        maxPage = await scheduleManagerPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obPhoneAgent.phoneNumber);

        // 2. Click on WFO Button in Toolbar Section
        await maxPage.clickWFO();

        // VP: Scheduled activities list will be displayed.
        expect(await maxPage.isScheduleDisplayedInWFOPanel(activity, startTime, endTime, TestRunInfo.middleTimeout, false)).toBe(true, 'Scheduled activities list is not displayed');
        await maxPage.closeWFO();

        // 3. Click on Glance> Settings> 24 hour Format.
        await maxPage.changeMax24HourClockSetting(State.ON);

        // VP: The new value is "on"
        expect(await maxPage.get24HourClockMode()).toBe(State.ON.toLocaleLowerCase(), "The new value is not 'on'");
        await maxPage.closePopover();

        // 4. Click on WFO button in Toolbar section.
        await maxPage.clickWFO();

        // VP: Scheduled activities will be displayed. and activities scheduled will have Begin and end time.
        expect(await maxPage.isScheduleDisplayedInWFOPanel(activity, startTimeFull, endTimeFull, TestRunInfo.middleTimeout, true)).toBe(true, 'Scheduled activities is not displayed or activities scheduled does not have Begin and end time in new format');

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Log out 
            await maxPage.closeWFO();
            await maxPage.changeMax24HourClockSetting(State.OFF, true);
            await maxPage.logOut();
            await scheduleManagerPage.removeAllActivities();
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});