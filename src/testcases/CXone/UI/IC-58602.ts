import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import MyDashBoards from "@page-objects/CXone/dashboard/my-dashboard-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import CreateNewSelfAssessment from "@page-objects/CXone/search/create-new-self-assessment";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import SelfAssessment from "@page-objects/CXone/my-zone/self-assessment";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";

/** 
 * Type: CxOne E2E
 * Suite: CxOne E2E
 * TC ID: IC-58602
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TO31
 * Note:
 */

describe('CxOne E2E - IC-58602', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let dashboardName: string = 'Custom Categories Dashboard';
    let topCategoriesWidget: string = 'Top Categories';
    let categoryOverTimeWidget: string = 'Category Over Time';
    let formName = 'QA Form';

    let basePage: PageBase;
    let loginPageAdmin: LoginPage;
    let dashboardPage: MyDashBoards;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let createNewSelfAssessment: CreateNewSelfAssessment;
    let schedulePage: MySchedulePage;
    let selfAssessment: SelfAssessment;
    let employeesPageAdmin: EmployeesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58602 - CXOne > QM Analytics > Verify that as a supervisor you are able to categorized calls and be able to see results on QM Analytics widgets`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);

    }, TestRunInfo.conditionTimeout);

    it('IC-58602 - CXOne QM Analytics Verify that as a supervisor you are able to categorized calls and be able to see results on QM Analytics widgets', async () => {

        // 2. Log in CxOne test environment
        basePage = new PageBase();
        loginPageAdmin = LoginPage.getInstance();

        // VP: Sign In page is displayed with User name text box
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed()).toBe(true, "Sign in page is not displayed with User name text box")

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();

        // VP: User name value entered and it is not editable
        expect(await loginPageAdmin.getUsernameText()).toBe(admin.email, "User name value is not entered");
        expect(await loginPageAdmin.isUsernameDisplayed()).toBe(true, "User name is editable");

        // VP: Password text box is editable
        expect(await loginPageAdmin.isPasswordTextBoxEditable()).toBe(true, "Password is not editable");

        // VP: Back and Sign in button is displayed
        expect(await loginPageAdmin.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
        expect(await loginPageAdmin.isSignInButtonDisplayed()).toBe(true, "Sign in button is not displayed");

        // VP: Forgot password link is displayed
        expect(await loginPageAdmin.isForgotPasswordDisplayed()).toBe(true, "Forgot password link is not displayed");

        // Enter password
        await loginPageAdmin.enterPassword(admin);
        employeesPageAdmin = await loginPageAdmin.clickSignInButton();

        // 4. Click the top navigation icon and then click the Dashboard icon
        dashboardPage = await loginPageAdmin.gotoMyDashboardsPage();

        // VP: My Dashboards page is displayed 
        expect(await dashboardPage.isPageDisplayed()).toBe(true, "My Dashboards page is not displayed");

        // 5 .In My Dashboards drop down select the ‘Custom Category Dashboard’ Dashboard
        await dashboardPage.selectDashboardName(dashboardName);

        // VP: Dashboard page is displayed with the Top Categories and Category Over Time widgets
        expect(await dashboardPage.isDashboardWidgetDisplayed(topCategoriesWidget)).toBe(true, "My Dashboards page is not displayed");
        expect(await dashboardPage.isDashboardWidgetDisplayed(categoryOverTimeWidget)).toBe(true, "My Dashboards page is not displayed");

        // 6. On any widget go to graphic and get to interactions by clicking on any category
        await dashboardPage.clickTopCategoriesVolBar();

        // VP: Is "Open segments in Search" link displayed
        expect(await dashboardPage.isSegmentsInSearchLinkDisplayed()).toBe(true, "Open segments in Search link is not displayed");

        // 7. Click "Open segments in Search" link
        searchPage = await dashboardPage.clickSegmentsInSearchLink();

        // VP: Search page is displayed with the list of recordings
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "List of recordings is not displayed");

        // 8. Select any segment listed and play back it
        player = await searchPage.playRecord(1);

        // VP: The NICE SaasS player is launch and you are able to see: Agent Name, Customer Name, Duration, Start Time, End Time
        expect(await player.isLblAgentDisplayed()).toBe(true, "Agent Name is not displayed");
        expect(await player.isLblCustomerDisplayed()).toBe(true, "Customer Name is not displayed");
        expect(await player.isDirectionDisplayed()).toBe(true, "Duration is not displayed");
        expect(await player.isRecordedTimeDisplayed()).toBe(true, "Start Time, End Time is not displayed");

        // 9. Press play button in the NICE player
        await player.clickPlay();

        // VP: Verify you are able to hear the audio recorder  in each segment of the category phrase

        // 10. In the recording selected click in the 3 dots icon in the right of the row
        await player.close();
        await searchPage.clickThreeDots(1);

        // Select the self – assessment option
        createNewSelfAssessment = await searchPage.clickSelfAssessment();

        // 11. Select a From and press Create button
        await createNewSelfAssessment.selectForm(formName);
        searchPage = await createNewSelfAssessment.clickCreateButton();

        // VP: The following message is displayed: Self-Assessment initiated
        expect(await searchPage.isSelfAssessmentInitiatedDisplayed()).toBe(true, "Self Assessment Initiated is not displayed");

        // 12. Click the top navigation icon (search) and then click My Zone icon
        schedulePage = await searchPage.gotoMyZonePage();

        // VP: My Schedule page is displayed
        expect(await schedulePage.isSchedulePageDisplayed()).toBe(true, "My Schedule page is not displayed");

        // 13. Click on Self Assessments option
        selfAssessment = await schedulePage.gotoSelfAssessments();

        // VP: Self Assessments page is displayed
        expect(await selfAssessment.isSelfAssessmentDisplayed()).toBe(true, "Self Assessments page is not displayed");

        // 14. Select the self assessment sent and click Awaiting option
        player = await selfAssessment.clickAwaitingButton();

        // VP: A popup is displayed with the call or chat or email that was send
        expect(await player.isPageDisplayed()).toBe(true, "the call or chat or email popup is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await player.close();
            // Logout
            await selfAssessment.logOut();
        } catch (err) { }
        finally {
            try {
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});