import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63273
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63273", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let chatAgent= new Agent();
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let wfoPanelSize: ISize;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63273 - WFO Workspace> without a contact> Glance Quick View> Workspace displays when "Open WFO" is clicked`);
        chatAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-63273 - WFO Workspace> without a contact> Glance Quick View> Workspace displays when "Open WFO" is clicked', async () => {
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(chatAgent);
        await chatAgent.createPhoneNumber();
        // 1. Launch Max
        maxPage = await employeesPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, chatAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);
       
        // 2. Click on "Open WFO" from Schedule/WFO tab  
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();
        wfoPanelSize = await maxWFOPanel.getWFOPanelSize();

        // VP: WFO Workspace should replace the contact area and // VP: WFO Workspace is displayed
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed")
        
        // VP: Workspace defaults to 600 pixels.
        expect(Utility.isNumberInRange(wfoPanelSize.width, 600, 10)).toBe(true, "Workspace defaults is not 600 pixels");
               
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxWFOPanel.closeWFOPanel();
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