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

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63271
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63271", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let ibAgent= new Agent();
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let fullMaxSize: ISize;
    let wfoPanelSize: ISize;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63271 - WFO Workspace> with a contact> WFO tab> Workspace displays when "Open WFO" is clicked`);
        ibAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_IBPHONE);

    }, TestRunInfo.conditionTimeout);

    it('IC-63271 - WFO Workspace> with a contact> WFO tab> Workspace displays when "Open WFO" is clicked', async () => {
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(ibAgent);
        await ibAgent.createPhoneNumber();

        // 1. Launch Max
        maxPage = await employeesPage.launchMax();
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, ibAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2.Generate some contact
        await ibAgent.createPhoneNumber();
        await TestHelpers.startOrJoinSession(ibAgent, ibAgent.phoneNumber);
        await TestHelpers.startInboundCall(ibAgent);
        await maxPage.waitForCallWorkspace();
        
         // VP: Generate some contact
        expect(await maxPage.isCallAccepted()).toBe(true,"Contact is not generated and accepted");
       
        // 3. Click on "Open WFO" from Schedule/WFO tab  
        await maxPage.showMaxGlance();
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();
        fullMaxSize = await maxPage.getSizeMaxFullWindow();
        wfoPanelSize = await maxWFOPanel.getWFOPanelSize();

        // VP: WFO Workspace should replace the contact area and WFO Workspace is displayed
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed")
        
        // VP: Workspace defaults to 600 pixels.
        expect(Utility.isNumberInRange(wfoPanelSize.width, 600, 10)).toBe(true, "Workspace defaults is not 600 pixels");
        
        // VP: and the full window (glance + workspace) should be 635 px.
        expect(Utility.isNumberInRange(fullMaxSize.width, 635, 10)).toBe(true, "The full window (glance + workspace) is not 635 px")
        
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxWFOPanel.closeWFOPanel();
        await maxPage.endCall();
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