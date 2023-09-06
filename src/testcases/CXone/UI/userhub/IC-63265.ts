import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63265
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63265", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let ibAgent: Agent;
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let maxCall: MaxCall
    let blue = "#43b1e5";
    let white = "#ffffff";
    let tolerance: number = 10;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63265 - Workspace has the ability to close hide when X is clicked`);
        ibAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_IBPHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-63265 - Workspace has the ability to close hide when X is clicked', async () => {

        //1. Prerequisites:
        // Have a CXOne account
        // Some Skills assigned to the agent
        // At least one active contact when this TC is running
        // everything related with pixels has +/- 10 pixel tolerance

        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(ibAgent);
        await ibAgent.createPhoneNumber();
        maxPage = await employeesPage.launchMax();
        maxPage.submitLaunchForm(MaxConnectOption.PHONE, ibAgent.phoneNumber);

        // 2. Generate some contact 
        await maxPage.changeState(MaxState.AVAILABLE);
        await ibAgent.createPhoneNumber();
        await TestHelpers.startOrJoinSession(ibAgent, ibAgent.phoneNumber)
        await TestHelpers.makeInboundCall(ibAgent, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: Contact is generated and accepted
        maxCall = await maxPage.waitForCallWorkspace();
        expect(await maxPage.isCallAccepted()).toBe(true, "Contact is not generated and accepted");

        // 3. Click on "Open WFO" from either Glance Quick View and Schedule/WFO tab
        await maxPage.showMaxGlance();
        await maxPage.clickWFO();
        maxWFOPanel = await maxPage.openWFOPanel();
        await maxWFOPanel.waitForPanelOpen();

        // VP: WFO Workspace is displayed.
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed.")

        // VP: Verify that the close bar is on the top of the workspace.
        expect(await maxWFOPanel.isCloseBarOnTopWFMPanel(tolerance)).toBe(true, "The close bar is not on the top of the workspace.")

        // VP: Workspace close bar is ((BLUE))
        expect(await maxWFOPanel.getCloseBarColor()).toBe(blue, "Workspace close bar is not blue");

        // VP: Workspace close bar is ((BLUE))
        expect(await maxWFOPanel.getXButtonColor()).toBe(white, "Workspace close X is not white");

        // VP: Workspace close X is on the top right
        expect(await maxWFOPanel.isXButtonOnTopRightConner(tolerance)).toBe(true, "Workspace close X is not on the top right");
        // 4. Click on 'X' from the close bar
        await maxWFOPanel.closeWFOPanel();

        // VP: WFO workspace should closes.
        expect(await maxWFOPanel.isWFOPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "WFO workspace still open.");

        // VP: The agent should shown the current active contact.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The agent does not show the current active contact.");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxCall.endCall();
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