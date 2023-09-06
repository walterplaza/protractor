import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchTimeRange } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: CXone
 * Suite: UserHub
 * TC ID: IC-63277
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("UserHub - IC-63277", function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    // Declare variables
    let cluster: Cluster = TestRunInfo.cluster;
    let maxpPageHandle: string;
    let CXONEmainPage: string;
    let callContactId: string;

    // Declare page object
    let pageBase: PageBase;
    let phoneAgent = new Agent();
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage
    let maxPage: MaxPage;
    let maxWFOPanel: MAXWFOPanel;
    let searchPage: SearchPage;
    let maxMessagePanel: MaxMessagePanel;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63277 - [Self-Assessment] Launch button will open the Evolve Panel and redirects to the given URL`);
        phoneAgent = await TestCondition.setUpUserHubAgent(AgentType.USERHUB_OBPHONE);

    }, TestRunInfo.conditionTimeout);

    it('IC-63277 - [Self-Assessment] Launch button will open the Evolve Panel and redirects to the given URL', async () => {
        //1. Pre-condition 
        //Has a Recording (make sure you made a Call with this user) for today. Has at least one *form* already created 
        pageBase = new PageBase();
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(phoneAgent);
        CXONEmainPage = await BrowserWrapper.getNewWindowHandle();
        await phoneAgent.createPhoneNumber();

        // 1. Launch Max
        maxPage = await employeesPage.launchMax();
        await pageBase.settingWaitForAngularEnabled(false);
        await maxPage.submitLaunchForm(MaxConnectOption.PHONE, phoneAgent.phoneNumber);
        maxpPageHandle = await pageBase.getCurrentWindowHandle();

        // Place OB call
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.callPhoneNumber(phoneAgent, cluster.outboundNumber, SkillType.OB_PHONE);
        await maxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(phoneAgent,  SkillCore.getSkillName(SkillType.OB_PHONE));
        await maxPage.clickRecordButton()
        await maxPage.endCall();

        // In the toolbar of the left side press Employees>Search button
        pageBase.switchWindowByHandle(CXONEmainPage);

        // 2. Go to 'Search' page and look for today's recordings
        // Found recorded elements are visible
        searchPage = await employeesPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);

        // 3. On your recording click the Action button
        // Action sub menu appears Form there select the SelfAssesment option
        await searchPage.openMoreMenuOption(phoneAgent.name);
        await searchPage.selectThreeDotsItem("Self Assessment")

        //4. Create new self-Assessment by clicking 'Create' button at Create new self-Assessment popup
        await searchPage.selectEvaluationForm("QA Form");
        await searchPage.clickCreateButton();

        // VP: Self assessment is initialized   
        expect(await searchPage.isSelfAssessmentInitiatedDisplayed()).toBe(true, "Self Assessment is not Initiated");

        //5. On MAX Click on Messages
        await pageBase.switchWindowByHandle(maxpPageHandle);
       
        BrowserWrapper.sleepInSecond(3);
        maxMessagePanel = await maxPage.clickMessagesButton();

        if ( !maxMessagePanel.isMessageDisplayed())
        {
            maxMessagePanel = await maxPage.clickMessagesButton();
        }

        // VP. Messages popover is displayed. 
        expect(await maxMessagePanel.isMessageDisplayed()).toBe(true, "Messages popover is not displayed.");

        //6. Look for Self Assessment Notification
        // Verify that the 'Launch WFO' button is displayed at the New self assessment available message section
        expect(await maxMessagePanel.isLaunchWFOButtonDisplayed()).toBe(true, "Launch WFO button is not displayed");

        //7. Click on Launch WFO button 
        maxWFOPanel = await maxMessagePanel.clickLaunchWFOButton();

        //VP: The click will open the custom workspace section
        expect(await maxWFOPanel.isWFOPanelDisplayed()).toBe(true, "WFO Workspace is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        await maxWFOPanel.closeWFOPanel();
        await maxWFOPanel.closePopover();
        await maxWFOPanel.logOut();
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