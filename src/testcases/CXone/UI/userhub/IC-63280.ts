import { CoachingPackage } from "@data-objects/CXone/coaching/coaching-package";
import { CoachingPlan, coachingPlanState } from "@data-objects/CXone/coaching/coaching-plan";
import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MAXMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import FormManagerPage from "@page-objects/CXone/qm/form-manager/form-manager-page";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";
import CoachingPackageDesigner from "@page-objects/CXone/coaching/coaching-package/coaching-package-designer";
import CoachingPlansPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plans-page";
import CoachingPlansDetailsPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plan-details-page";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63280
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63280", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obAgent = new Agent();
    let coachingPackage: CoachingPackage = new CoachingPackage().initData();
    let coachingPlan: CoachingPlan = new CoachingPlan().initData();

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;
    let formManagerPage: FormManagerPage;
    let maxMessagePanel: MAXMessagePanel
    let maxWFOPanel: MAXWFOPanel;
    let coachingPackagePage: CoachingPackagePage;
    let coachingPackageDesigner: CoachingPackageDesigner;
    let coachingPlanPage: CoachingPlansPage;
    let coachingDetails: CoachingPlansDetailsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63280 - WFO Workspace> without a contact> Glance Quick View> Workspace displays when "Open WFO" is clicked`);
        obAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_IBPHONE);
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obAgent);

        // Pre-Condition:
        // Navigate to QM
        formManagerPage = await employeesPage.gotoQM();

        // Go to Coaching Package page
        coachingPackagePage = await formManagerPage.gotoCoachingPackagesPage();

        // Create a new Coaching Package
        coachingPackageDesigner = await coachingPackagePage.clickNewCoachingPackageButton();
        await coachingPackageDesigner.createACoachingPackage(coachingPackage);
        await formManagerPage.logOut();

    }, TestRunInfo.conditionTimeout * 2);

    it('IC-63280 - WFO Workspace> without a contact> Glance Quick View> Workspace displays when "Open WFO" is clicked', async () => {
        employeesPage = await loginPage.loginAsAdmin(obAgent);

        // 2. In Central: Go to QM Coaching> Coaching Plans to create a new Coaching Plan: Fill necessary fields
        formManagerPage = await employeesPage.gotoQM();
        coachingPlanPage = await formManagerPage.gotoCoachingPlansPage();
        coachingDetails = await coachingPlanPage.openNewCoachingPlan();
        coachingPlan.coachingPackage = coachingPackage.name;
        await coachingDetails.createGeneralCoachingPlan(coachingPlan, obAgent.name);

        // VP: A new coaching Plan is created
        await coachingPlanPage.searchCoachingPlan(coachingPlan.name);
        expect(await coachingPlanPage.getPlanState(coachingPlan.name)).toBe(coachingPlanState.ACTIVE, "Plan does not appear with Active state");

        // 3. Click on Messages
        maxPage = await employeesPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obAgent.phoneNumber);
        maxMessagePanel = await maxPage.clickMessagesButton()

        // VP: Messages popover is displayed. 
        expect(await maxMessagePanel.isMessagePopoverDisplayed()).toBe(true, "Messages popover is not displayed")

        // 4. Look for New coaching package available Notification
        // VP: Verify that the 'Launch WFO' button is displayed at the New coaching package available message section
        expect(await maxMessagePanel.isWFOButtonCoachingMessageDisplayed()).toBe(true, "the 'Launch WFO' button is displayed at the New coaching package available message section");

        // 5. Click on 'Launch WFO' button 
        maxWFOPanel = await maxMessagePanel.clickWFOCoachingButton();

        // VP: The click will open the custom workspaces section (even if not is configured) and the Given URL is opened on Custom Worksapce section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "The customer workspace panel is not opened");
        expect(await maxWFOPanel.getWFOPanelTitle()).toContain("Coaching", "Given URL is not opened on Custom Worksapce section")

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxWFOPanel.closeWFOPanel();
            await maxPage.logOut();
            await employeesPage.logOut();
        }
        catch (err) { }
        finally {
            try {
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});