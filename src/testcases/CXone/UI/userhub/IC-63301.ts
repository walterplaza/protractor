import { Logger, FunctionType } from "@utilities/general/logger";
import { AgentType, Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import TestBase from "@testcases/test-base";
import { PageName, MaxConnectOption, Cluster } from "@data-objects/general/cluster";
import { TestCondition } from "@test-helpers/test-condition";
import MaxPage from "@page-objects/CXone/max/max-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import PageBase from "@page-objects/page-base";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import TimeOffRequestsPage from "@page-objects/CXone/my-zone/time-off-requests-page";
import { ActivityCode } from "@data-objects/CXone/myzone/time-off-request-info";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import RequestsPage from "@page-objects/CXone/wfm/requests/requests-page";
import MAXMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63301
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */


describe('UserHub - IC-63301', function () {
    let cluster: Cluster = TestRunInfo.cluster;
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let manager: Agent;
    let homeWindowHandleAdmin: string;
    let homeWindowHandleManager: string;
    let maxWindowHandleAdmin: string;
    let driverAdmin: number = 1;
    let driverManager: number = 2;

    // Declare page object
    let basePage: PageBase;
    let loginPageAdmin: LoginPage;
    let loginPageManager: LoginPage;
    let employeesAdminPage: EmployeesPage;
    let employeesManagerPage: EmployeesPage;
    let maxPage: MaxPage;
    let mySchedulePage: MySchedulePage;
    let timeOffRequestsPage: TimeOffRequestsPage;
    let wfmMenu: WFMMenu;
    let requestsPage: RequestsPage;
    let maxMessage: MAXMessagePanel;
    let maxWFOPanel: MAXWFOPanel;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63301 - [MAX][UserHub][Notification][Approve request] Launch button will open the Evolve Panel and redirects to the given URL`);
        admin = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
        manager = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OB_PHONE_REQUIRED);

        //Pre-Condition:
        //MAX - UserHub Login
        basePage = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesAdminPage = await loginPageAdmin.loginAsAdmin(admin);
        homeWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        //MAX - Launch MAX
        maxPage = await employeesAdminPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        maxWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        // - As an Agent create a new Time Off Request (My Zone> My Time Off Requests> New Request). -- This will generate a new Request with 'Pending" Status
        await basePage.switchWindowByHandle(homeWindowHandleAdmin);
        mySchedulePage = await employeesAdminPage.gotoMyZonePage();
        timeOffRequestsPage = await mySchedulePage.gotoTimeOffRequests();

        await timeOffRequestsPage.generateNewTimeOffRequest(ActivityCode.PAIDTIMEOFF);
        
        // - As a Manager Approve the Agent's Request (Scheduler> Requests> <look for the 'New' Request> ) 
        // For Step 2 -- Use an User that Create a New Time Off Request 
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverManager);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));

        loginPageManager = LoginPage.getInstance();
        employeesManagerPage = await loginPageManager.loginAsAdmin(manager);
        homeWindowHandleManager = await BrowserWrapper.getNewWindowHandle();

        wfmMenu = await employeesManagerPage.gotoWFMPage();
        requestsPage = await wfmMenu.gotoRequestsPage();

        await requestsPage.approveRequest(admin.email.toLowerCase());

    }, TestRunInfo.conditionTimeout*2);

    it('IC-63301 - MAX UserHub Notification Approve request Launch button will open the Evolve Panel and redirects to the given URL', async () => {
        // //2. Click on Messages
        await basePage.switchDriverInstance(driverAdmin);
        await basePage.switchWindowByHandle(maxWindowHandleAdmin);
        maxMessage = await maxPage.clickMessagesButton();

        // //VP: Messages popover is displayed.
        expect(await maxPage.isMessagePopoverDisplayed()).toBe(true, "MAX Message Popover is not displayed");

        // //3. Look for Time Off Request Approved Notification
        // //VP: Verify that the 'Launch' button is displayed at the Time of request message section
        expect(await maxMessage.isWFOButtonDisplayed()).toBe(true, "WFO button is not displayed");

        // //4. Click on 'Launch' button 
        maxWFOPanel = await maxMessage.clickLaunchWFOButton();

        // //VP: The click will open the custom workspaces section (even if not is configured) and the Given URL is opened on custome workspaces section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // // Logout MAX
            await maxWFOPanel.closeWFOPanel();
            await maxWFOPanel.closePopover();
            await maxWFOPanel.logOut();

            await basePage.switchWindowByHandle(homeWindowHandleAdmin);
            await timeOffRequestsPage.logOut();

            await basePage.switchDriverInstance(driverManager);
            await basePage.switchWindowByHandle(homeWindowHandleManager);
            await requestsPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});