import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { State } from "@data-objects/general/general";

/** 
 * Type: CXone
 * Suite: max-userhub-brandembassy
 * TC ID: MAX-728
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: DO33
 */

describe('max-userhub-brandembassy - MAX-882', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let agent: Agent;
    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'MAX-882 - [MAX] [CW] Validate that the Digital Workspapce is displayed by default, when no custom workspace is set up and WFM feature is ON');
        // Preconditions
        agent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_ADMINISTRATOR);
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(agent);

    }, TestRunInfo.conditionTimeout);

    it('MAX-882 - [MAX] [CW] Validate that the Digital Workspapce is displayed by default, when no custom workspace is set up and WFM feature is ON', async () => {
        //Launch MAX
        maxPage = await employeesPage.launchMax();
        await maxPage.enterLaunchForm(MaxConnectOption.PHONE, agent.phoneNumber);
        await maxPage.connectMaxForMAXGlancePreview();
        await maxPage.showMaxGlance();

        // 1. MAX state is UNAVAILABLE
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "MAX state is not UNAVAILABLE");

        // VP: Icon for digital engagement with the text "Digital Channels" is being displayed on upper- left side of glance.
        // expect(await maxPage.isDigitalEngementWorkspaceLinkDisplayed()).toBe(true, "Digital Engagement workspace link is not displayed on MAX");
        // expect(await maxPage.isOpenWFODisplayed()).toBe(true, "Open WFO link is not displayed on MAX");

        // 2. Go to Glance>More>Settings> click on ADA High Contrast Option.
        await maxPage.hideMaxGlance();

        await maxPage.openMoreToolbar();
        await maxPage.setMaxADASetting(State.ON);

        // VP: ADA is on
        expect(await maxPage.getADAHighContrastStatus()).toBe(State.ON.toLocaleLowerCase(), "High Contrast ADA mode isn't correct");
        await maxPage.closePopover();

        // 3. Go to Glance and open it.
        await maxPage.showMaxGlance();

        // VP: Icon for digital engagement with the text "Digital Channels" is being displayed on upper- left side of glance.

    });
    
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, 'Final - Cleaning Up\n');
        try {
            // Log out 
            await maxPage.showMaxGlance();
            await maxPage.logOutInMaxGlanceOverlay();
            await employeesPage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});