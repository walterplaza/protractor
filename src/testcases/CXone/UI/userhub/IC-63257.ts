import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63257
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63257", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let chatAgent: Agent;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let dark = "#333333";
    let white = "#ffffff";
    let fullMaxSize: ISize;
    let wfoPanelSize: ISize;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63257 - [MAX][Summer'18][IC-10135][CXOne] WFO Workspace> ADA = ON Verify that Workspace close bar is displayed on ADA mode`);
        chatAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-63257 - Verify that Workspace close bar is displayed on ADA mode`', async () => {
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(chatAgent);
        await chatAgent.createPhoneNumber();
        maxPage = await employeesPage.launchMax();
        await maxPage.enterLaunchForm(MaxConnectOption.PHONE, chatAgent.phoneNumber, false);
        await maxPage.connectMax();

        // 2. Set ADA = ON Go to More> Settings>ADA High Contrast
        await maxPage.openMoreToolbar();
        await maxPage.setMaxADASetting(State.ON);

        // VP: ADA is on
        expect(await maxPage.getADAHighContrastStatus()).toBe(State.ON.toLocaleLowerCase(), "High Contrast ADA mode isn't correct");
        await maxPage.closePopover();

        // 3. Click on "Open WFO" from either Glance Quick View and WFO tab
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();
        fullMaxSize = await maxPage.getSizeMaxFullWindow();
        wfoPanelSize = await maxWFOPanel.getWFOPanelSize();

        // VP: WFO Workspace is displayed
        // VP: Workspace defaults to 600 pixels
        // VP: The full window (glance + workspace) should be 635 px
        // VP: Workspace close bar is according to ADA
        // VP: Workspace close X is ((WHITE))
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed")
        expect(Utility.isNumberInRange(wfoPanelSize.width, 600, 10)).toBe(true, "Workspace defaults is not 600 pixels");
        expect(Utility.isNumberInRange(fullMaxSize.width, 635, 10)).toBe(true, "The full window (glance + workspace) is not 635 px")
        expect(await maxWFOPanel.getCloseBarColor()).toBe(dark, "Workspace close bar is not according to ADA")
        expect(await maxWFOPanel.getXButtonColor()).toBe(white, "Workspace close X is white");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxWFOPanel.closeWFOPanel();
        await maxPage.openMoreToolbar();
        await maxPage.setMaxADASetting(State.OFF);
        await maxPage.closePopover();
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