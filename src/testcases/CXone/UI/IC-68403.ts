import { ActivityCodes, ShiftTime, WFMRule } from "@data-objects/CXone/wfm/rules/rule-info";
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
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: IC-68403
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe('SMOKE_Automated_Blue - IC-68403', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let ruleData = new WFMRule();
    ruleData.initData();

    // Declare page object
    let loginPage: LoginPage;
    let WFMMenu: WFMMenu;
    let scheduleManagerPage: ScheduleManager;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-68403 - Verify you can launch MAX and open WFO`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        loginPage = LoginPage.getInstance();
        await loginPage.loginAsAdmin(admin);
        WFMMenu = await loginPage.gotoWFMPage();
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();
        await scheduleManagerPage.searchAndRemoveTimeShift(admin.name);
        employeesPage = await scheduleManagerPage.gotoEmployeesPage();
        loginPage = await employeesPage.logOut();
    }, TestRunInfo.conditionTimeout);

    it('IC-68403 - Verify you can launch MAX and open WFO', async () => {

        // VP: Sign In page is displayed with User name text box
        expect(await loginPage.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. And click Next button	
        await loginPage.enterUsername(admin);
        await loginPage.clickNextButton();
        await loginPage.waitForSpinner();

        // VP: User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPage.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value not editable is not displayed");
        expect(await loginPage.isEnterPasswordControlsDisplayed()).toBe(true, "Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom are not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        // Click Sign In button
        await loginPage.enterPassword(admin);
        employeesPage = await loginPage.clickSignInButton();

        // 4. Click the top navigation icon and then click WFM	
        WFMMenu = await employeesPage.gotoWFMPage();
        await WFMMenu.clickForecastingMenu();

        // VP: All sub menu for schedulers, forecasting and setup must be display
        expect(await WFMMenu.isRealTimeAdherenceMenuDisplayed()).toBe(true, "Real Time Adherence menu is not displayed");
        expect(await WFMMenu.isIntradayManagerMenuDisplayed()).toBe(true, "Intraday Manager menu is not displayed");
        expect(await WFMMenu.isForecastingMenuDisplayed()).toBe(true, "Forecasting menu is not displayed");
        expect(await WFMMenu.isSchedulingMenuDisplayed()).toBe(true, "Scheduling menu is not displayed");
        expect(await WFMMenu.isRequestMenuDisplayed()).toBe(true, "Requests menu is not displayed");
        expect(await WFMMenu.isSetupMenuDisplayed()).toBe(true, "Setup menu is not displayed");

        // 5. Select Schedule manager menu
        scheduleManagerPage = await WFMMenu.gotoScheduleManager();

        // VP: A list of all users created is present and you are able to see shifts and activities created

        // 6. Look for your user: Automation Admin
        await scheduleManagerPage.searchUserName("'" + admin.name);

        // VP: user is listed
        expect(await scheduleManagerPage.isUserListed(admin.name)).toBe(true, "User is not listed in the page");

        // 7. If the user has a Shift go to step 9 to Add activity	
        // If the user does not has a Shift
        await scheduleManagerPage.clickAddShiftButton(admin.name);

        // VP: Add Shift window is displayed with:
        // VP: Shift Type combobox with Open value as default
        expect(await scheduleManagerPage.getActivityCode()).toBe(ActivityCodes.OPEN_DEFAULT, "Open value is not as value default");

        // Click on the time frame of the user and select Add shift option	
        // VP: Start, End list boxes and time frame box
        expect(await scheduleManagerPage.isStartListBoxDisplayed()).toBe(true, "Start list box is not displayed");
        expect(await scheduleManagerPage.isEndListBoxDisplayed()).toBe(true, "End list box is not displayed");
        expect(await scheduleManagerPage.isStartDayDisplayed()).toBe(true, "Start Day box is not displayed");
        expect(await scheduleManagerPage.isEndDayDisplayed()).toBe(true, "End Day box is not displayed");

        // VP: Comments section displayed
        expect(await scheduleManagerPage.isCommentSectionDisplayed()).toBe(true, "Comments section is not displayed");

        // VP: Cancel and Create buttons displayed
        expect(await scheduleManagerPage.isCreateButtonDisplayed()).toBe(true, "Create buttons is not displayed");
        expect(await scheduleManagerPage.isCancelButtonDisplayed()).toBe(true, "Cancel buttons is not displayed");

        // 8. Start value put 9:00am and today's value.	
        // End value put 7:00 pm, also today's value.	
        // Click Create button	
        await scheduleManagerPage.addShift(ruleData);

        // VP: Shift is present in the time frame with gray color
        expect(await scheduleManagerPage.isShiftWithGrayColor(admin.name)).toBe(true, "Shift is present in the time frame without gray color");

        // 9. Add Activity
        // Click on top of the shift created, select Add Activity option
        await scheduleManagerPage.clickAddActivityButton(admin.name);

        // VP: Add Activity window is displayed with:
        // VP: a combo box to select the activity you want to add, by default Open.
        expect(await scheduleManagerPage.getActivityCode()).toBe(ActivityCodes.OPEN_DEFAULT, "Open value is not as value default");

        // VP: Start and End time combo box and date picker
        expect(await scheduleManagerPage.isStartListBoxDisplayed()).toBe(true, "Start list box is not displayed");
        expect(await scheduleManagerPage.isEndListBoxDisplayed()).toBe(true, "End list box is not displayed");
        expect(await scheduleManagerPage.isStartDayDisplayed()).toBe(true, "Start Day box is not displayed");
        expect(await scheduleManagerPage.isEndDayDisplayed()).toBe(true, "End Day box is not displayed");

        // VP: Comment text box editable
        expect(await scheduleManagerPage.isCommentSectionDisplayed()).toBe(true, "Comments section is not displayed");

        // 10. Select Open as the activity to add.	
        // Put start: 9:30 am	
        // End 10:00 am make sure today's date is selected	
        // Click Create button
        await scheduleManagerPage.addActivity(ActivityCodes.OPEN_DEFAULT, ShiftTime.HALFNINE_AM, ShiftTime.TEN_AM);

        // VP: Open activity is present in the Shift create
        expect(await scheduleManagerPage.isActivityPresentInShift(ActivityCodes.OPEN_DEFAULT, admin.name)).toBe(true, "Open activity is not present in the Shift create");

        // 11. Add other activity next to the Open activity created in step 10	
        // Activity: Break	
        // Start 10:15 am	
        // End 11:15 am	
        // Today's date
        await scheduleManagerPage.clickAddActivityButton(admin.name);
        await scheduleManagerPage.addActivity(ActivityCodes.BREAK, ShiftTime.QUARTER_TEN_AM, ShiftTime.QUARTER_ELEVEN_AM);

        // VP: Break activity is present next to Open
        expect(await scheduleManagerPage.isActivityPresentInShift(ActivityCodes.BREAK, admin.name)).toBe(true, "Break activity is not present next to Open");

        // 12. On the top of Scheduler page click publish button, make sure Today's date is selected
        await scheduleManagerPage.publishNewSchedule();

        // VP: Publish New Schedules window is displayed
        expect(await scheduleManagerPage.isPublishNewScheduleDisplayed()).toBe(true, "Publish New Schedules window is not displayed");

        // 13. Click Save & Publish button
        await scheduleManagerPage.pressConfirmPublishNewSchedule();

        // VP: A message is displayed
        expect(await scheduleManagerPage.isPublishedSuccessMgsDisplayed()).toBe(true, "Schedules published message is not displayed");

        // 14. Launch MAX agent by entering a correct phone number	
        maxPage = await scheduleManagerPage.launchMax();
        await admin.createPhoneNumber();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);

        // VP: MAX agent is launched
        expect(await maxPage.isMaxLaunched()).toBe(true, "Max agent pops up displaying the Max agent panel.");

        // 15. Click on WFO Menu from at the bottom of the agent	
        await maxPage.clickWFO();

        // VP: 'My Schedule' pane is displayed and you are able to see the activities created
        expect(await maxPage.isWFOTabDisplayed()).toBe(true, "'My Schedule' pane is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            // Clean up
            await maxPage.closeWFO();
            await maxPage.logOut();
            await scheduleManagerPage.removeShift(admin.name);
            await scheduleManagerPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                TestHelpers.endAllContacts(admin);
                await pageBase.closeExcessBrowser();
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
