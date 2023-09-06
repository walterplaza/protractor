import { ActivityCodes, ShiftTime } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

describe('CxOne E2E - 411158', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent2: Agent;
    let startTime: string = ShiftTime.SEVEN_PM;
    let endTime: string = ShiftTime.ELEVEN_PM;
    let acitvity: string = ActivityCodes.MEETING;
    let timezone: string = '(UTC+07:00)  Bangkok, Hanoi, Jakarta';

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let mySchedulePage: MySchedulePage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, '411158 - Evolve > Verify that MAX displays data from a Schedule set up on Evolve');

        // 1. Preconditions
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        // Login CXone
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);

        // Click the top navigate icon and then click the WFM icon
        WFMMenu = await employeesPage.gotoWFMPage();

        // Go to schedule manager page
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();

        // Generate New Schedule
        await scheduleManagerPage.generateActivitySchedule(agent2.name, acitvity, startTime, endTime, timezone);

        // Logout
        await scheduleManagerPage.logOut()

    }, TestRunInfo.conditionTimeout);

    it('Evolve Verify that MAX displays data from a Schedule set up on Evolve', async () => {

        // 2. Login into Evolve with valid credentials as the Agent from the Prerequisites
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(agent2);
        mySchedulePage = await employeesPage.gotoMyZonePage();

        // VP: Agent is logged into Evolve
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent isn't logged into Evolve");

        // 3. Search for the Agent's Schedules
        // VP: Verify agent can see his Schedule
        expect(await mySchedulePage.isScheduleActivityDisplayed(acitvity, startTime, endTime)).toBe(true, "Agent can't see his Schedule")

        // 4. Launch MAX Agent entering a phone number
        maxPage = await mySchedulePage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber);

        // VP: MAX is launched
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX isn't launched");

        // 5. Click on WFM Menu from at the botton of the agent
        await maxPage.clickWFO();

        // VP: 'My Schedule' pane is displayed 
        expect(await maxPage.isWFOTabDisplayed()).toBe(true, "'My Schedule' pane isn't displayed");

        // 6. Verify that on My Schedule tab you can see the Schedule setup on Evolve
        // VP: Agent's schedule is correctly displayed in MAX 
        expect(await maxPage.isScheduleItemDisplayed(acitvity, startTime, endTime)).toBe(true, "Agent's schedule isn't correctly displayed in MAX");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Clean up
            await maxPage.closeWFO();
            await maxPage.logOut()

            loginPage = await employeesPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});