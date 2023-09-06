import CustomAPIs from "@apis/custom-apis";
import { ActivityCodes } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MAXMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

describe('Userhub suite - IC-63312', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obPhoneAgent: Agent;
    let startTime: string = Utility.generateTimeForWFMActivity(2);
    let endTime: string = Utility.generateTimeForWFMActivity(3);
    let activity: string = ActivityCodes.MEETING;
    let timezone: string = Utility.getSystemTimeZoneNumber();

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;
    let maxMessage: MAXMessagePanel;
    let maxWFOPanel: MAXWFOPanel;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-63312 - [MAX][UserHub][Notification][Schedule Changed] Launch button will open the Evolve Panel and redirects to the given URL');
        obPhoneAgent = await TestCondition.setUpCxOneAgent(AgentType.USERHUB_OBPHONE);
        await CustomAPIs.getAgentInfo(obPhoneAgent);
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-63312 - MAX UserHub Notification Schedule Changed Launch button will open the Evolve Panel and redirects to the given URL', async () => {

        // 1. User must have some Evolve events published (at least one), or must edit some event. You can add events from: Scheduler Manager 
        WFMMenu = await employeesPage.gotoWFMPage();
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();
        await scheduleManagerPage.removeAllActivities();
        await scheduleManagerPage.generateActivitySchedule(obPhoneAgent.name.charAt(0).toUpperCase() + obPhoneAgent.name.slice(1), activity, startTime, endTime, timezone);

        // Launch MAX
        maxPage = await scheduleManagerPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obPhoneAgent.phoneNumber);

        // 2. Click on Messages
        maxMessage = await maxPage.clickMessagesButton();

        // VP: Messages popover is displayed.
        expect(await maxPage.isMessagePopoverDisplayed()).toBe(true, "MAX Message Popover is not displayed");

        // 3. Look for Schedule Notification
        // VP: Verify that the 'Launch WFO' button is displayed.
        expect(await maxMessage.isWFOButtonDisplayed()).toBe(true, "WFO button is not displayed");

        // 4. Click on 'Launch WFO' button
        maxWFOPanel = await maxMessage.clickLaunchWFOButton();

        // VP: The click will open the custom workspaces( even if not is configured) and the Given URL is opened on custom workspaces section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Logout MAX
            await maxWFOPanel.closeWFOPanel();
            await maxWFOPanel.closePopover();
            await maxWFOPanel.logOut();

            await scheduleManagerPage.removeAllActivities();
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});