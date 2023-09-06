import TestBase from "@testcases/test-base";
import { PageName, MaxConnectOption } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Logger, FunctionType } from "@utilities/general/logger";
import { Agent, AgentType } from "@data-objects/general/agent";
import PageBase from "@page-objects/page-base";
import LoginPage from "@page-objects/CXone/general/login-page";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import { TestCondition } from "@test-helpers/test-condition";
import MaxPage from "@page-objects/CXone/max/max-page";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-64058
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('UserHub - IC-64058', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let homeWindowHandleAdmin: string;
    let maxWindowHandleAdmin: string;
    let sessionID: string;

    // Declare page object
    let basePage: PageBase;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-64058 - [MAX][UserHub] Verify that we can access to WFO panel available in MAX after logout the Cxone session.`);
        admin = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OB_PHONE_REQUIRED);

        //Pre-Condition:
        //MAX - UserHub Login
        basePage = new PageBase();
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);
        homeWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        //MAX - Launch MAX
        maxPage = await employeesPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        maxWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();
        sessionID = admin.sessionId;

    }, TestRunInfo.conditionTimeout);

    it('IC-64058 - MAX UserHub Verify that we can access to WFO panel available in MAX after logout the Cxone session.', async () => {

        //1. Return to UserHub page and logout
        await basePage.switchWindowByHandle(homeWindowHandleAdmin);
        await employeesPage.logOut();

        //VP: Verify the session of UserHub must be logout but MAX window must remain open.
        expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");
        await basePage.switchWindowByHandle(maxWindowHandleAdmin);
        expect(await maxPage.isPageDisplayed()).toBe(true, "MAX page is not displayed");

        //2. Return to MAX and click on F5 
        await basePage.refreshPage();

        //VP: Verify that MAX remains its session after logout the UserHub session.
        expect(admin.sessionId).toBe(sessionID, "SessionID is not matched");

        //3. In MAX, Go to WFO> Open WFO and click on it.
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();

        //VP: Verify the WFO Panel has been open
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");
    
        //VP: you can interact on it.
        await maxWFOPanel.openCoachingPanel();
        expect(await maxWFOPanel.isCoachingPanelDisplayed()).toBe(true, "Coaching Panel is not displayed");

        await maxWFOPanel.openShiftBiddingPanel();
        expect(await maxWFOPanel.isShiftBiddingPanelDisplayed()).toBe(true, "Shift Bidding Panel is not displayed");

        await maxWFOPanel.openEvaluationsPanel();
        expect(await maxWFOPanel.isEvaluationsPanelDisplayed()).toBe(true, "Evaluations Panel is not displayed");

        await maxWFOPanel.openTimeOffRequestsPanel();
        expect(await maxWFOPanel.isTimeOffRequestsPanelDisplayed()).toBe(true, "Time Off Requests Panel is not displayed");

        await maxWFOPanel.openMySchedulePanel();
        expect(await maxWFOPanel.isMySchedulePanelDisplayed()).toBe(true, "My Schedule Panel is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxWFOPanel.closeWFOPanel();
            await maxPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});