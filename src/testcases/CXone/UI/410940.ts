import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";
import EvaluationsPage from "@page-objects/CXone/my-zone/evaluations-page";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import FormManagerPage from "@page-objects/CXone/qm/form-manager/form-manager-page";
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
 * Suite: CxOne E2E
 * TC ID: 410940
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO31, TO32
 * Note:
 */

describe("CxOne E2E - 410940", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);

    // Declare variables
    let cluster: Cluster = TestRunInfo.cluster;
    TestRunInfo.testTimeout = 2400000;
    let admin: Agent;
    let agent2: Agent;
    let qmFormName = "QA Form";
    let evaluationScore: string;
    let rowIndex: number;
    let rowAgentIndex: number;
    let driverAdmin: number = 1;
    let driverAgent2: number = 2;
    let callContactId: string;
    let expectedAgents: string;
    let playerHandle: string;
    let qaFormHandle: string;

    // Declare page object
    let pageBase: PageBase;
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAgent2: MaxPage;
    let maxPageAdmin: MaxPage;
    let maxCallPageAdmin: MaxCall;
    let maxCallPage2: MaxCall;
    let maxTransferAdmin: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let qmFormPage: QMFormPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410940 - CxOne> Outbound call cold Transfer agent 2 ends contact (voice + screen)`)
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        // Pre-Condition
        pageBase = new PageBase();
        pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent2);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent2 = LoginPage.getInstance();
        mySchedulePage = await loginPageAgent2.loginAsAgent(agent2);

        // Pre-condition:
        await pageBase.switchDriverInstance(driverAdmin);
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        formManagerPage = await employeesPageAdmin.gotoQM();
        await formManagerPage.createDefaultQMForm();
        await formManagerPage.gotoEmployeesPage();
        loginPageAdmin = await formManagerPage.logOut();
    }, TestRunInfo.conditionTimeout);

    it('CxOne Outbound call Cold Transfer agent 2 ends contact voice + screen', async () => {

        // Launch Max Agent 2:
        await pageBase.switchDriverInstance(driverAgent2);
        maxPageAgent2 = await mySchedulePage.launchMax();
        await agent2.createPhoneNumber();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();

        // VP: Agent Browser Pops up and Loads
        expect(await maxPageAgent2.isMaxLaunched()).toBe(true, "Max is not launched on agent 2");

        // Change status of Max agent 2 is available
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // 2. Login and launch agent 1
        await pageBase.switchDriverInstance(driverAdmin);
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);

        // Launch Max
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await pageBase.settingWaitForAngularEnabled(false);
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPageAdmin.connectMax();

        // 3. Place OB call
        await maxPageAdmin.changeState(MaxState.AVAILABLE);
        await maxPageAdmin.callPhoneNumber(admin, cluster.outboundNumber, SkillType.OB_PHONE);
        maxCallPageAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // 4. Initiate transfer to agent
        maxTransferAdmin = await maxCallPageAdmin.clickTransferConferenceButton();
        await maxTransferAdmin.coldTransferCallToAgent(agent2.name);
        await maxTransferAdmin.logOut();

        // 5. Press hold button
        await pageBase.switchDriverInstance(driverAgent2);
        maxCallPage2 = await maxPageAgent2.waitForCallWorkspace();
        await maxCallPage2.clickHoldButton();

        // VP: Agent 2 is put on hold. 
        expect(await maxCallPage2.isCallHeld()).toBe(true, "The call is not held on agent2");

        // 6. Press unhold button
        await maxCallPage2.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallPage2.isCallHeld(false, TestRunInfo.shortTimeout)).toBe(true, "The call was still held");

        // 7. End call contact
        maxPageAgent2 = await maxCallPage2.endCall();

        // VP: call ends
        expect(await maxPageAgent2.isCallEnded()).toBe(true, "The call was ended on agent 2")
        await maxPageAgent2.logOut();
        await mySchedulePage.logOut();
        await pageBase.closeWindow();

        // 8. As an administrator Log in to Evolve WFO. Staging environment https://na1.staging.nice-incontact.com
        await pageBase.switchDriverInstance(driverAdmin);

        // VP: Supervisor logged in.
        expect(await employeesPageAdmin.isPageDisplayed()).toBe(true, "Supervisor is not logged in");

        // 9. In the toolbar of the left side press Employees>Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: CXone search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 10. At the top click on the time picker and select today
        await searchPage.selectTime(SearchTimeRange.TODAY);

        // VP: Today is displayed in the combobox
        expect(await searchPage.getSelectedDate()).toBe(SearchTimeRange.TODAY, "Today is not selected.");

        // 11. Press search button
        await searchPage.clickSearch();

        // 12. Look for Agent 1 and Agent 2 the ones of step 4
        expectedAgents = `${agent2.name}, ${admin.name}`;
        rowIndex = await searchPage.getAgentRecordIndexByContactID(expectedAgents, callContactId);

        // VP: Both agents are listed with the same contact ID and the same number of segments(4)
        expect(expectedAgents).toMatch(await searchPage.getSearchResult(rowIndex, SearchColumnName.AGENT_NAME), "Agents who made calls are not listed");

        // 13. select an agent and click on the play icon
        rowAgentIndex = await searchPage.getAgentRecordIndexByContactID(agent2.name, callContactId);
        player = await searchPage.playRecord(rowAgentIndex);
        playerHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(playerHandle);

        // VP: The NICE player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(agent2.name, admin.name)).toBe(true, "Player is not displayed");

        // 14. Press play button in the NICE player 
        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording
        await player.clickPlay();

        // 15. Close the player 
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is not closed");

        // 16. In product picker. Select QM tools. See attached file QM tools for reference.
        formManagerPage = await searchPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await formManagerPage.isPageDisplayed()).toBe(true, "QM form is not displayed");

        // 17. In the agent selected click in the 3 dots icon in the right of the row
        searchPage = await formManagerPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);
        await searchPage.openMoreMenuOption(agent2.name);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 18. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 19. Select you QM form and click submit
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await pageBase.switchWindowByHandle(qaFormHandle);

        // VP: the form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 20. Filled the form with correct answers and click submit
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // Get value of evaluation score submitted
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();
        qmFormPage = await evaluationsPage.openNewestEvaluation();
        evaluationScore = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP. Form is correctly submitted and you are able to see value in the Evaluation Score column
        searchPage = await evaluationsPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);
        expect(await searchPage.isEvaluationScoreMatchedAtRowIndex(rowAgentIndex, evaluationScore)).toBe(true, "Evaluation score not match with any row in table.");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout CxOne employee page from agent admin
            await searchPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);

});