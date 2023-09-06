import CustomAPIs from "@apis/custom-apis";
import { CoachingPackage } from "@data-objects/CXone/coaching/coaching-package";
import { CoachingPlan } from "@data-objects/CXone/coaching/coaching-plan";
import { ActivityCodes } from "@data-objects/CXone/wfm/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MAXMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxMoreToolsPage from "@page-objects/CXone/max/max-more-tools-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import QMMenuPage from "@page-objects/CXone/qm/qm-general/qm-menu";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";
import CoachingPlansDetailsPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plan-details-page";
import CoachingPackageDesigner from "@page-objects/CXone/coaching/coaching-package/coaching-package-designer";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";

describe('Userhub - IC-69253', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let ibPhoneAgent: Agent;
    let ibPhoneAgentRequired: Agent;
    let startTime: string = Utility.generateTimeForWFMActivity(2);
    let endTime: string = Utility.generateTimeForWFMActivity(3);
    let activity: string = ActivityCodes.MEETING;
    let timezone: string = Utility.getSystemTimeZoneNumber();
    let coachingPlan: CoachingPlan = new CoachingPlan().initData();
    let coachingPackage: CoachingPackage = new CoachingPackage().initData();
    let cxOneWindowHandle: string;
    let maxWindowHandle: string;
    let driverAgent: number = 1;
    let driverAgentRequired: number = 2;
    let dateTime: string;
 
    // Declare page object
    let loginPageAgent: LoginPage;
    let loginPageAgentRequired: LoginPage;
    let pageBase = new PageBase();
    let employeesPageAgent: EmployeesPage;
    let employeesPageAgentRequired: EmployeesPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManagerPage;
    let maxPage: MaxPage;
    let maxMessage: MAXMessagePanel;
    let maxWFOPanel: MAXWFOPanel;
    let qmMenu: QMMenuPage;
    let coachingPackagePage: CoachingPackagePage;
    let coachingPackageDesigner: CoachingPackageDesigner;
    let coachingDetails: CoachingPlansDetailsPage;
    let coachingPlansPage: CoachingPlansPage;
    let maxMoreToolsPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-69253 - [MAX][WFO} Message Open WFO navigation does not redirect if user manually changes pages internally');
        ibPhoneAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_IBPHONE);
        ibPhoneAgentRequired = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_IB_PHONE_REQUIRED);
        await CustomAPIs.getAgentInfo(ibPhoneAgentRequired);
        loginPageAgent = LoginPage.getInstance();
        employeesPageAgent = await loginPageAgent.loginAsAdmin(ibPhoneAgent);
        cxOneWindowHandle = await pageBase.getCurrentWindowHandle();
    }, TestRunInfo.conditionTimeout);

    it('IC-69253 - MAX UserHub Notification Schedule Changed Launch button will open the Evolve Panel and redirects to the given URL', async () => {

        // 1. User 1 - IN Userhub page, click on WFM
        WFMMenu = await employeesPageAgent.gotoWFMPage();

        // 2. User 1 - In the Scheduler page, create a new schedule entry for a time in the future for a second agent, click Save/Publish
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();
        await scheduleManagerPage.generateActivitySchedule(ibPhoneAgentRequired.name.charAt(0).toUpperCase() + ibPhoneAgentRequired.name.slice(1), activity, startTime, endTime, timezone);

        //VP: Second USer's MAX should receive a notification and message for this new coaching plan.
        // Create driver for second user
        pageBase.createDriverInstance()
        pageBase.switchDriverInstance(driverAgentRequired)
        await pageBase.navigateWeb(TestRunInfo.cluster.getURL(PageName.CXONE_LOGIN_PAGE))

        // Log in for second user
        loginPageAgentRequired = LoginPage.getInstance();
        employeesPageAgentRequired = await loginPageAgentRequired.loginAsAdmin(ibPhoneAgentRequired);

        // Launch Max for second user
        maxPage = await employeesPageAgentRequired.launchMax();
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, ibPhoneAgent.phoneNumber);

        // Go to Message for second user
        maxMessage = await maxPage.clickMessagesButton();    
        dateTime = await maxMessage.getDateTimeOfFirstSchedule();
        maxWFOPanel = await maxMessage.clickFirstLaunchWFOScheduleButton();

        // Check message for schedule changed for second user
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Schedule", "There is no message for this schedule change")
        await maxWFOPanel.closeWFOPanel();

        // 3.User1 Navigate CXone to QM, create a coaching plan, assign it to the 2nd agent, and Publish the coaching plan.
        // Switch driver to user 1
        pageBase.switchDriverInstance(driverAgent);
        await pageBase.switchWindowByHandle(cxOneWindowHandle);
        qmMenu = await employeesPageAgent.gotoQM();

        //Create Coaching package 
        coachingPackagePage = await qmMenu.gotoCoachingPackagesPage();
        coachingPackageDesigner = await coachingPackagePage.clickNewCoachingPackageButton();
        await coachingPackageDesigner.createACoachingPackage(coachingPackage);

        //Create Plan package.
        coachingPlansPage = await qmMenu.gotoCoachingPlansPage();
        coachingDetails = await coachingPlansPage.openNewCoachingPlan();
        coachingPlan.coachingPackage = coachingPackage.name;
        await coachingDetails.createGeneralCoachingPlan(coachingPlan, ibPhoneAgentRequired.name);

        // VP: Second USer's MAX should receive a notification and message for this new coaching plan.
        // Switch driver to second user
        pageBase.switchDriverInstance(driverAgentRequired);
        await pageBase.switchWindowByHandle(maxWindowHandle);

        //Click Message button and Launch Coaching WFO
        BrowserWrapper.sleepInSecond(3);
        maxMessage = await maxPage.clickMessagesButton();
 
        maxWFOPanel = await maxMessage.clickWFOCoachingButton();

        // Check message for this new coaching
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Coaching", "There is no message for this new coaching plan")
        await maxWFOPanel.closeWFOPanel();

        // 4. On Max of second user - Inside of MAX, open the Messages tab. Click on the "Launch WFO" button associated with the schedule change. 
        //Click Message button and Launch Schedule WFO;
        await maxPage.clickMessagesButton();
        await maxMessage.clickLaunchWFOScheduleButton(dateTime);

        // VP: The click will open the custom workspaces( even if not is configured) and the Given URL is opened on custom workspaces section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Schedule", "There is no message for this schedule change");

        //5. On Max of second user - Inside of the wfo panel, navigate to a page that isn't Schedule.// Navigate to Coaching page
        await maxWFOPanel.openShiftBiddingPanel();

        // VP: No issue
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Bidding", "There is an issue");

        //6. On Max of second user- Inside of MAX, now select the open WFO button for the schedule message again. Click the Open WFO button.
        //Click Message button and Launch Schedule WFO
        await maxWFOPanel.closeWFOPanel(); 
        await maxPage.clickMessagesButton();
        await maxMessage.clickLaunchWFOScheduleButton(dateTime);

        // VP: MAX will direct the WFO workspace to the schedule page the second time.
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Schedule", "There is no message for this schedule change")

        //7. On Max of second user - Close the Schedule page in MAX. Reload MAX using the ...More> Information> Reload Application button.
        // Click More button
        await maxWFOPanel.closeWFOPanel();
        maxMoreToolsPage = await maxPage.openToolbarButton('More');
        await maxMoreToolsPage.goToMoreInformation();


        // Click ReLoad Application button
        await maxMoreToolsPage.clickReloadApplication();

        // VP: MAX reloads and the Schedule page is not visible.
        expect(await maxWFOPanel.isWFOPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "MAX reloads and the Schedule page is visible");

        // 8. On Max of second user - Inside of MAX, now select the open WFO button for the schedule message again. Click the Open WFO button.
        // Open WFO button for the schedule message agai
        await maxPage.clickMessagesButton();
        await maxMessage.clickLaunchWFOScheduleButton(dateTime);

        // VP: MAX will direct the WFO workspace to the schedule page again.
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Schedule", "There is no message for this schedule change")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Logout MAX
            await maxWFOPanel.closeWFOPanel();
            await maxWFOPanel.logOut();
            await employeesPageAgentRequired.logOut();
            pageBase.switchDriverInstance(driverAgent);
            await employeesPageAgent.gotoWFMPage();
            await scheduleManagerPage.removeActivity(ibPhoneAgent.name);
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});