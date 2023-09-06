import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchTimeRange } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import QMFormPage from "@page-objects/CXone/search/qm-form-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import SelectQMFormPage from "@page-objects/CXone/search/select-qm-form-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63296
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO31, TO32
 * Note:
 */

describe("UserHub - IC-63296", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);

    // Declare variables
    let cluster: Cluster = TestRunInfo.cluster;
    let admin: Agent;
    let qmFormName = "QA Form";
    let callContactId: string;
    let CXONEmainPage: string;
    let maxpPageHandle: string;
    let qaFormHandle: string;

    // Declare page object
    let pageBase: PageBase;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxCallPageAdmin: MaxCall;
    let maxMessagePanel: MaxMessagePanel;
    let searchPage: SearchPage;
    let maxWFOPanel: MAXWFOPanel;
    let selectQMFormPage: SelectQMFormPage;

    let qmFormPage: QMFormPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63296 - [MAX][UserHub][Notification][Evaluation Complete] Launch button will open the Evolve Panel and redirects to the given URL`)
        admin = await TestCondition.setUpCxOneAgent(AgentType.USERHUB_OBPHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-63296 - MAX UserHub Notification Evaluation Complete Launch button will open the Evolve Panel and redirects to the given URL', async () => {
        //1. Pre-condition - An agent has a evaluated record for today
        // Launch Max Agent 2:
        pageBase = new PageBase();
        loginPageAdmin = LoginPage.getInstance();

        // Login and launch agent 1
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        CXONEmainPage = await BrowserWrapper.getNewWindowHandle();

        // Launch Max
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await pageBase.settingWaitForAngularEnabled(false);
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPageAdmin.connectMax();
        maxpPageHandle = await pageBase.getCurrentWindowHandle();

        // Place OB call
        await maxPageAdmin.changeState(MaxState.AVAILABLE);
        await maxPageAdmin.callPhoneNumber(admin, cluster.outboundNumber, SkillType.OB_PHONE);
        maxCallPageAdmin = await maxPageAdmin.waitForCallWorkspace();
        maxCallPageAdmin.waitForCallDialling();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getSkillName(SkillType.OB_PHONE));
        await maxCallPageAdmin.clickRecordButton();
        await maxCallPageAdmin.endCall();

        // In the toolbar of the left side press Employees>Search button
        pageBase.switchWindowByHandle(CXONEmainPage);

        //2. Go to Search
        // Look for the recording that is specified on  Prerequisites
        searchPage = await employeesPageAdmin.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);
        await searchPage.openMoreMenuOption(admin.name);

        //3. Click on Actions Button and select 'Evaluate' 
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // Select you QM form and click submit
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await pageBase.switchWindowByHandle(qaFormHandle);

        //4. Select the Form that is specified on  Prerequisites
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();


        //5. On MAX Click on Messages
        await pageBase.switchWindowByHandle(maxpPageHandle);
        maxMessagePanel = await maxPageAdmin.clickMessagesButton();

        //6. Look for New Evaluation arrived
        // Verify that the 'Launch WFO' button is displayed at the New Evaluation arrived message section
        expect(await maxMessagePanel.isLaunchWFOButtonDisplayed()).toBe(true, "MAX page is not displayed");

        //7. Click on Launch WFO button 
        maxWFOPanel = await maxMessagePanel.clickLaunchWFOButton();

        //VP: The click will open the custom workspace section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            await maxWFOPanel.closeWFOPanel();
            await maxWFOPanel.closePopover();
            await maxWFOPanel.logOut();

            // Logout CxOne employee page from agent admin
            await searchPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);

});