import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: max-userhub-brandembassy
 * TC ID: IC-107371
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: DO33
 */

describe('max-userhub-brandembassy - IC-107371', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let agent: Agent;
    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-107371 - [Patron][BE]Verify that the BE is displayed as Custom Workspace when the toggle is On and Digital Engangement is checked');
        // Preconditions
        agent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_ADMINISTRATOR);
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(agent);

    }, TestRunInfo.conditionTimeout);

    it('IC-107371 - [Patron][BE]Verify that the BE is displayed as Custom Workspace when the toggle is On and Digital Engangement is checked', async () => {
        //Launch MAX
        maxPage = await employeesPage.launchMax();
        await maxPage.enterLaunchForm(MaxConnectOption.PHONE, agent.phoneNumber);
        await maxPage.connectMaxForMAXGlancePreview();
        await maxPage.showMaxGlance();

        // MAX state is UNAVAILABLE
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "MAX state is not UNAVAILABLE");

        // VP: Check Digital engagement links is displayed on MAX
        expect(await maxPage.isCustomerWorkspaceLabelDisplayed("Digital Engagement")).toBe(true, "Digital Engagement link is not displayed on MAX");

        await maxPage.hideMaxGlance();
        // VP: Check if the Digital Engagement Custom workspace is Popped out by default and the webpage is visible
        expect(await maxPage.getCustomerWorkspacePanelUrlBrandEmbassy()).toContain("brandembassy.com/system/auth/jwt-login?embeddedClient=1", "CustomWorkspace url is not DigitalEngagement");
        expect((await maxPage.getBECustomerWorkspaceVisibility()).includes("module-container")).toBe(true, "This is not the BE workspace container element. please check on the correct element in dev tools that you are looking for");
        expect((await maxPage.getBECustomerWorkspaceVisibility()).includes("hidden")).toBe(false, "Digital Engagement web page is not displayed by default");
        expect((await maxPage.getWFOWorkspaceVisibility()).includes("hidden")).toBe(false, "Digital Engagement web page/workspace is not closed or the WFO workspace is not made hidden");
        
        await maxPage.clickBECustomWorkspaceCloseButton();//only by closing the owrkspace MAX glance is accessed
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