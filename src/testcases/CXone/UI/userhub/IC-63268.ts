import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63268
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63268", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let obAgent: Agent;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let blue = "#43b1e5";
    let white = "#ffffff";


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63268 - WFO Workspace> without contact - Workspace has the ability to close/hide when X is clicked`);
        obAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);

    }, TestRunInfo.conditionTimeout);

    it('IC-63268 - WFO Workspace> without contact - Workspace has the ability to close/hide when X is clicked', async () => {
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(obAgent);
        await obAgent.createPhoneNumber();

        // 1. Launch Max
        maxPage = await employeesPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, obAgent.phoneNumber);
        
        //2.Click on "Open WFO" from either Glance Quick View and WFO tab
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();

        //VP: WFO Workspace is displayed.
        expect(await maxWFOPanel.isWFOPanelDisplayed(TestRunInfo.middleTimeout)).toBe(true, "WFO Workspace is not displayed");

        //VP: Verify that the close bar is on the top of the workspace.
        expect(await maxWFOPanel.isCloseBarOnTopWFMPanel()).toBe(true, "The close bar is not on the top of the workspace.")

        //VP: Workspace close bar is ((BLUE))
        expect(await maxWFOPanel.getCloseBarColor()).toBe(blue, "Workspace close bar is not blue");

        //VP: Workspace close X is ((WHITE))
        expect(await maxWFOPanel.getXButtonColor()).toBe(white, "Workspace close X is not white");

        //VP: Workspace close X is on the top right.
        expect(await maxWFOPanel.isXButtonOnTopRightConner()).toBe(true, "Workspace close X is not on the top right.");

        //3. Click on 'X' from the close bar
        await maxWFOPanel.closeWFOPanel();

        //VP: WFO workspace should closes and Glance should be displayed.
        expect(await maxWFOPanel.isWFOPanelDisplayed(TestRunInfo.middleTimeout)).toBe(false, "WFO Workspace is displayed");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "Max Glance does not display");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxPage.logOut();
        await employeesPage.logOut();
        try {
        }
        catch (err) { }
        finally {
            try {
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});