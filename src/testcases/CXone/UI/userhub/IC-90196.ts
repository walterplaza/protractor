import { ActivityCodes, WFMRule } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import ScheduleManager from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-90196
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-90196', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let ruleData = new WFMRule();
    ruleData.initData();

    // Declare page object
    let loginPage: LoginPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManager;    
    let maxPage: MaxPage;
    let basePage: PageBase;
    let event: string;
    let searchpage: string;
    let activitycode: string;
    let timezone: string = Utility.getSystemTimeZone().timeZone;
    let name: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-90196 - [MAX] [UserHub] [Glance] [Schedule] Validate that api is being called to display the scheduled items`);
        admin = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
        basePage = new PageBase();

    }, TestRunInfo.conditionTimeout);

    it(`IC-90196 - MAX UserHub Glance Schedule Validate that api is being called to display the scheduled items`, async () => {

        // 1. Login CXOne              
        loginPage = LoginPage.getInstance();
        await loginPage.loginAsAdmin(admin);
        name = admin.name.charAt(0).toUpperCase() + admin.name.slice(1)

        // 2. Go to WFM
        WFMMenu = await loginPage.gotoWFMPage();
        
        // 3. Go to Schedule Manager
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();
        await scheduleManagerPage.searchUserName(name);
        await scheduleManagerPage.setTimeZone(timezone);
        await scheduleManagerPage.removeAllActivities();

        // 4. Create shift and activities for the Agent           
        await scheduleManagerPage.generateActivitySchedule(name, ActivityCodes.MEETING, Utility.generateTimeForWFMActivity(1), Utility.generateTimeForWFMActivity(2), timezone);

        // 5. Click on Publish
        await scheduleManagerPage.publishNewSchedule();
        await scheduleManagerPage.pressConfirmPublishNewSchedule();
        activitycode = await scheduleManagerPage.getActivityID(name, ActivityCodes.MEETING);

        // 6. Launch MAX           
        maxPage = await scheduleManagerPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        expect(await maxPage.isMaxLaunched()).toBe(true, "Max agent pops up displaying the Max agent panel.");

        // 7. Press F12      
        // 8. Go to Network Tab and in Filter field fill with "schedule"
        event = await maxPage.getSchedulesUserEvent();

        // 9. Click on a request name of scheduled                
        searchpage = await (TestRunInfo.cluster.getURL(PageName.SCHEDULE_USER_PAGE) + activitycode);

        // VP. API schedule is called
        expect(event).toContain(searchpage, "API is not called to display the scheduled items");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // Clean up
            await maxPage.logOut();
            await scheduleManagerPage.gotoScheduleManager();
            await scheduleManagerPage.removeAllActivities();
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                // TestHelpers.endAllContacts(admin);
                await basePage.closeExcessBrowser();
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
