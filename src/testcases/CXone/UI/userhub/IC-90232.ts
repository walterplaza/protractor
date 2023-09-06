import { ActivityCodes } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
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
 * TC ID: IC-90232
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-90232', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obPhoneAgent: Agent;
    let startDateTime: string = Utility.generateTimeForWFMActivity(2);
    let endDateTime: string = Utility.generateTimeForWFMActivity(3);
    let startTime: string = startDateTime.substring(startDateTime.split(":")[0].lastIndexOf(" ")+1, startDateTime.length);
    let endTime: string = endDateTime.substring(endDateTime.split(":")[0].lastIndexOf(" ")+1, endDateTime.length);
    let activity: string = ActivityCodes.MEETING;
   //let timezone: string = "(UTC-06:00) Mountain Time (US & Canada)";
    let timezone: string = Utility.getSystemTimeZone().timeZone;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-90232 - [MAX] [UserHub] [Glance] [Schedule] Validate that Schedulers are displayed in coming up section at Glance after their save and publish');
        // Preconditions
        obPhoneAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);

        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obPhoneAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-90232 - MAX UserHub Glance Schedule Validate that Schedulers are displayed in coming up section at Glance after their save and publish', async () => {

        // 1. Go to WFM
        WFMMenu = await employeesPage.gotoWFMPage();

        // VP: WFM will be displayed.
        expect(await WFMMenu.isPageDisplayed()).toBe(true, "WFM is not displayed");

        // 2. Go to Scheduler Manager.
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();

        // VP: Scheduler Manager will be displayed
        expect(await scheduleManagerPage.isPageDisplayed()).toBe(true, "Scheduler Manager is not displayed");

        // 3. Create shifts and activities for the agent
        // 4. Click on Publish
        await scheduleManagerPage.removeAllActivities();
        await scheduleManagerPage.generateActivitySchedule(obPhoneAgent.name.charAt(0).toLocaleUpperCase() + obPhoneAgent.name.slice(1), activity, startDateTime, endDateTime, timezone);

        // VP: The shifts and activities will be published.
        // VP: Shifts and Activities will be displayed in the agent.
        // expect(await scheduleManagerPage.isScheduleActivityDisplayed(activity, startTime, endTime)).toBe(true, "Agent can't see his Schedule");
        expect(await scheduleManagerPage.isActivityPresentInShift(ActivityCodes.MEETING, obPhoneAgent.name)).toBe(true, "Agent can't see his Schedule");

        // 5. See the precondition 2
        maxPage = await scheduleManagerPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obPhoneAgent.phoneNumber);

        // VP: MAX is launched and in UNAVAILABLE state
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX isn't launched");
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "MAX state is not UNAVAILABLE");

        // 6. Go to Glance to the coming up section
        // VP: Must be displayed the scheduled shifts and activities.
        expect(await maxPage.isScheduleItemDisplayed(activity, startTime, endTime)).toBe(true, "Agent's schedule isn't correctly displayed in MAX");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Log out 
            await maxPage.logOut();
            await scheduleManagerPage.removeAllActivities();
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});