import { SchedulingUnit } from "@data-objects/CXone/admin/scheduling-unit";
import { CoachingPackage, SuccessfulMessage } from "@data-objects/CXone/coaching/coaching-package";
import { CoachingPlan, coachingPlanState } from "@data-objects/CXone/coaching/coaching-plan";
import { Forecast } from "@data-objects/CXone/wfm/forecasting/forecast";
import { Schedule, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import FormManagerPage from "@page-objects/CXone/qm/form-manager/form-manager-page";
import BiddingManagerPage from "@page-objects/CXone/wfm/scheduling/bidding-manager-page";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";
import CoachingPackageDesigner from "@page-objects/CXone/coaching/coaching-package/coaching-package-designer";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import CoachingPlansDetailsPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plan-details-page";

/** 
 * Type: CXone
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: IC-59085
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 * - IE: Failed by ticket IC-71112 - [TestAutomation][NICE-UI] The blank page is displayed after logging in Evolve on IE
 * - IC- 84423: [TestAutomation][NICE-UI] Employees square does not display in the Employees section
 * - IC-83128 [TestAutomation][NICE-UI] Bidding and bids for next week shifts doesn't display on Shift Bidding of MAX
 */

describe('SMOKE_Automated_Blue - IC-59085', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE)
    TestRunInfo.testTimeout = 800000;
    let admin: Agent;
    let agent: Agent;
    let coachingPackage: CoachingPackage = new CoachingPackage().initData();
    let forecastName: string = Forecast.generateForecasterName();
    let scheduleUnit: string = SchedulingUnit.generateSchedulingUnitName();
    let schedule1 = new Schedule().initData(scheduleUnit, StaffingPlan.AUTOMATIC_PLANNING, forecastName);
    let timeGenerated: number = 240
    let coachingPlan: CoachingPlan = new CoachingPlan().initData();
    let cxOneWindowHandle: string;
    let maxWindowHandle: string;
    let checkData: string[];

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let pageBase = new PageBase();
    let qmMenu: FormManagerPage;
    let coachingPackagePage: CoachingPackagePage;
    let coachingPackageDesigner: CoachingPackageDesigner;
    let maxPage: MaxPage;
    let wfmPage: WFMMenu;
    let bidManagerPage: BiddingManagerPage;
    let maxWFOPanel: MAXWFOPanel;
    let coachingPlansPage: CoachingPlansPage;
    let coachingDetails: CoachingPlansDetailsPage;
    let mySchedulePage: MySchedulePage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-59085 - CXOne > Agent Notifications_Exploratory`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT3);

    }, TestRunInfo.conditionTimeout);

    it('IC-59085 - Agent Notifications Exploratory', async () => {

        loginPage = LoginPage.getInstance();

        // VP: Sign In page is displayed with User name text box
        expect(await loginPage.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. 
        // And click Next button
        await loginPage.enterUsername(admin);
        await loginPage.clickNextButton();
        await loginPage.waitForSpinner();

        // VP: 	User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPage.isUserNameTextBoxDisplayed(TestRunInfo.middleTimeout)).toBe(false, "User name value not editable is not displayed");
        expect(await loginPage.isEnterPasswordControlsDisplayed()).toBe(true, "Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom are not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        // Click Sign In button
        await loginPage.enterPassword(admin);
        employeesPage = await loginPage.clickSignInButton();
        cxOneWindowHandle = await pageBase.getCurrentWindowHandle();

        // 4. Click the top navigation icon and then click the 'Coaching' icon
        coachingPackagePage = await employeesPage.gotoCoachingPage();

        // VP: Coaching Packages page is displayed with the list of packages created.
        expect(await coachingPackagePage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Coaching Package page is not displayed");
        expect(await coachingPackagePage.isPackagesListDisplayed(TestRunInfo.shortTimeout)).toBe(true, "List of packages is not displayed");

        // 5. Click New Coaching Package button	
        coachingPackageDesigner = await coachingPackagePage.clickNewCoachingPackageButton();

        // VP: New Coaching package editor page is displayed
        expect(await coachingPackageDesigner.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "New Coaching package editor page is not displayed");

        // 6. Create Coaching Package
        // In the Properties section put the title name of the package.
        // To the middle section drag and drop some elements like Attachment or Section, put for every element a title name.
        // Clicks Save button 
        await coachingPackageDesigner.createCoachingPackage(coachingPackage);
        await coachingPackageDesigner.saveCoachingPackage();

        // VP: Saving coaching window is displayed
        expect(await coachingPackageDesigner.isSaveWindowDisplayed()).toBe(true, "Saving coaching window is not displayed");

        // 7. In the Save Coaching Package window enter the name: QAtest and click Save button
        await coachingPackageDesigner.selectCoachingPackageName(coachingPackage.name);


        // VP: Saving coaching window is displayed  
        expect(await coachingPackagePage.isSuccessfulMessageDisplayed(SuccessfulMessage.ADD_SUCCESS)).toBe(true, " Coaching package added succesfully message is not displayed");
        expect(await coachingPackagePage.isSuccessfulMessageGreen(SuccessfulMessage.ADD_SUCCESS)).toBe(true, " Coaching package added succesfully message is not in green");

        // 8. Click Save and Active button
        await coachingPackageDesigner.saveAndActivateCoachingPackage();

        // VP: Package created is listed in the Coaching package page
        expect(await coachingPackagePage.isCoachingPackageCreated(coachingPackage.name)).toBe(true, "Failed to add coaching package");

        // 9. Launch MAX agent by entering a correct phone number
        maxPage = await employeesPage.launchMax();
        maxWindowHandle = await pageBase.getCurrentWindowHandle();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);

        // VP: MAX agent is launched
        expect(await maxPage.isMaxLaunched()).toBe(true, "Max agent pops up displaying the Max agent panel.");

        // 10. Click on WFO Menu from at the bottom of the agent
        await maxPage.clickWFO();

        // VP: 'My Schedule' pane is displayed
        expect(await maxPage.isWFOTabDisplayed()).toBe(true, "'My Schedule' pane isn't displayed");

        // 11. Verify that on My Schedule tab you can see the Schedule setup on CXOne
        // VP: Agent's schedule is correctly displayed in MAX
        expect(await maxPage.isScheduleListDisplayed()).toBe(true, "Agent schedule is not displayed");

        // 12. Click the navigate icon and then click the 'Coaching' icon and  click Coaching Plan.
        await pageBase.switchWindowByHandle(cxOneWindowHandle);
        coachingPackagePage = await employeesPage.gotoCoachingPage();
        coachingPlansPage = await coachingPackagePage.gotoCoachingPlansPage();

        // VP: Coaching Plans page is displayed
        expect(await coachingPlansPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Coaching Plans page is not displayed");

        // 13. Click New Coaching Plan button
        coachingDetails = await coachingPlansPage.openNewCoachingPlan();

        // VP: A Create Coaching Plan page is displayed
        expect(await coachingDetails.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Create Coaching Plan page is not displayed");

        // 14. Fill in Coaching Plan         
        // Enter a Coaching Plan Name
        // On the Create Coaching Plan window, select the coaching package.
        // Define the start and end date for your coaching plan (set for today)
        coachingPlan.coachingPackage = coachingPackage.name;
        await coachingDetails.createCoachingPlan(coachingPlan);

        // VP: Name, Coaching package are correctly displayed
        expect(await coachingDetails.getEnteredCoachingPlanName()).toBe(coachingPlan.name, "Name are not correctly displayed")
        expect(await coachingDetails.getSelectedCoachingPackage()).toBe(coachingPlan.coachingPackage, "Coaching package are not correctly displayed");

        // 15. Click Add Employee button
        await coachingDetails.openSelectEmployeesWindow();
        await coachingDetails.waitForSelectEmployeePopupOpen();

        // VP: Select Employee window is displayed
        expect(await coachingDetails.isSelectEmployeeWindowDisplayed()).toBe(true, "Select Employees window is not displayed");

        // 16. Click over the employees that you want to select (Automto31 Admine2e), they passed from left to right side and then click Confirm button	
        checkData = await coachingDetails.selectEmployees(1, admin.name);

        // VP: Employees are correctly listed in the Employees section
        await coachingDetails.saveAddedEmployees();
        expect(await coachingDetails.isAddedEmployeesListed(checkData)).toBe(true, "Added employees is not correctly listed");

        // 17. To save and activate the quality plan, click Submit
        await coachingDetails.submitCoachingPlan();

        // VP: The plan is created and appears on the Coaching Plan list with Active state
        await coachingPlansPage.searchCoachingPlan(coachingPlan.name);
        expect(await coachingPlansPage.getPlanState(coachingPlan.name)).toBe(coachingPlanState.ACTIVE, "Plan does not appear with Active state");

        // 18. On Max agent sees the Coaching plan set. Click on WFO Menu from at the botton of the agent -> Open WFO -> Coaching
        await pageBase.switchWindowByHandle(maxWindowHandle);
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();
        await maxWFOPanel.openCoachingPanel();

        // VP: Coaching plan present in My Coaching
        await maxWFOPanel.searchCoachingPlanOnMAX(coachingPlan.name);
        expect(await maxWFOPanel.isCoachingPlanDisplayed(coachingPlan.name, TestRunInfo.shortTimeout)).toBe(true, "Coaching plan doesn't present in My Coaching");
        await maxWFOPanel.closeWFOPanel();
        await maxWFOPanel.logOut();

        // 19. Go to WFM -> Scheduling -> Bidding Manager
        await pageBase.switchWindowByHandle(cxOneWindowHandle);
        wfmPage = await coachingPlansPage.gotoWFMPage();
        bidManagerPage = await wfmPage.gotoBiddingManagerPage();

        // VP: Bidding Manager page is displayed
        expect(await bidManagerPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Bidding Manager page isn't displayed");

        // 20. Click on Generate New Bid for the bidding template you created on the prerequisites
        // Scheduling Unit: perm_automation2_to31(Default)	
        // Start: leave the time picked by default an select 2W	
        // Select Automatic Planning, and pick Forecastingto31	
        // Click Generate button	
        // Click on Generate Anyway button in the message displayed,	
        // Wait 3 minutes	
        await bidManagerPage.openGenerateNewBidForm();
        await bidManagerPage.generateNewBid(schedule1);
        await bidManagerPage.waitForBidGenerate(schedule1, timeGenerated);

        // VP: Bid is generated
        expect(await bidManagerPage.isBidGenerated(schedule1)).toBe(true, "Bid isn't generated");

        // 21. Click on Open Bid button
        await bidManagerPage.clickOpenBidButton(schedule1);

        // VP: The bid status changes from Draft to Bid Open so Agent can see it.
        expect(await bidManagerPage.getStatusBidding(schedule1)).toBe("Bid Open", "Bid doesn't open")

        await bidManagerPage.logOut();

        // 22. Log in CxOne the other agent	
        mySchedulePage = await loginPage.loginAsAgent(agent);

        // VP: Agent bid is log in CxOne
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent bid is not log in CxOne");

        // 23. Launch Max and change the status to Available
        maxPage = await mySchedulePage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Status Available to Agent bid
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE.toUpperCase(), "Agent status is not Available");

        // 24. On Max agent sees the bidding and bids for next week shifts
        // Click on WFO Menu -> Open WFO from at the botton -> Shift Bidding section
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();
        await maxWFOPanel.openShiftBiddingPanel();

        // VP: Shift Bidding is performed
        expect(await maxWFOPanel.isShiftBiddingDisplayed(schedule1.rangeDate, "Bid Open")).toBe(true, "Failed by ticket IC-83128 [TestAutomation][NICE-UI] Bidding and bids for next week shifts doesn't display on Shift Bidding of MAX");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Final
            maxPage = await maxWFOPanel.closeWFOPanel();
            await maxPage.logOut();
            await mySchedulePage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});