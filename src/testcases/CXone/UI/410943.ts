import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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
 * TC ID: 410943
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO31, TO32
 * Note:
 */

describe("CxOne E2E - 410943", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let cluster: Cluster = TestRunInfo.cluster;
    TestRunInfo.testTimeout = 2400000;
    let admin: Agent;
    let agent1: Agent;
    let driverAgent1: number = 2;
    let driverAgentAdmin: number = 1;
    let callContactId: string;
    let expectedAgents: string;
    let qmFormName = "QA Form";
    let evaluationScore: string;
    let rowIndex: number;
    let playerHandle: string;
    let qaFormHandle: string;

    // Declare page objects
    let pageBase: PageBase;
    let loginPageAgent1: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPage1: EmployeesPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent1: MaxPage;
    let maxCallPage1: MaxCall;
    let maxCallPageAdmin: MaxCall;
    let maxTransferAgent1: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let qmFormPage: QMFormPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410943 - Evolve> Outbound call Warm Transfer agent 2 ends contact (voice + screen)`)
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
    }, TestRunInfo.conditionTimeout);

    it('Evolve Outbound call Warm Transfer agent 2 ends contact voice + screen', async () => {

        // 1. VoiceReg>Login and Launch Agent
        pageBase = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);

        // Launch Max Agent 2:
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPageAdmin.connectMax();

        // VP: Agent Browser Pops up and Loads
        expect(await maxPageAdmin.isMaxLaunched()).toBe(true, "Max is not launched on agent 2");

        // Change status of Max agent 2 is available
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // 2. Login and launch agent 1
        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent1);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent1 = LoginPage.getInstance();
        employeesPage1 = await loginPageAgent1.loginAsAdmin(agent1);

        // Launch Max agent 1
        maxPageAgent1 = await employeesPage1.launchMax();
        await pageBase.settingWaitForAngularEnabled(false);
        await agent1.createPhoneNumber();
        await maxPageAgent1.enterLaunchForm(MaxConnectOption.PHONE, agent1.phoneNumber, false);
        await maxPageAgent1.connectMax();

        // 3. Place OB call on agent 1
        await maxPageAgent1.changeState(MaxState.AVAILABLE);
        await maxPageAgent1.callPhoneNumber(agent1, cluster.outboundNumber, SkillType.OB_PHONE);
        maxCallPage1 = await maxPageAgent1.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(agent1, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // VP: Connected to phones
        expect(await maxCallPage1.isCallAccepted()).toBe(true, "Call was not accepted on agent 1");

        // 4. Inititate warm transfer
        await maxCallPage1.clickHoldButton();
        maxTransferAgent1 = await maxCallPage1.clickTransferConferenceButton();
        await maxTransferAgent1.filterAgentNameAddressBook(admin.name);
        await maxTransferAgent1.callAgentFromAddressBook(admin.name);

        // 4-7. Switch to agent 2 and accept call transfer 
        await pageBase.switchDriverInstance(driverAgentAdmin);
        await maxPageAdmin.acceptInBoundCallContactTransfer();

        // 4-8. Switch to agent 1 and complete transfer
        await pageBase.switchDriverInstance(driverAgent1);
        // Wait for call extends transfer duration
        await pageBase.waitInSecond(5);
        maxPageAgent1 = await maxCallPage1.completeTransferCall();

        // VP: First agent no longer on call
        expect(await maxPageAgent1.isCallEnded()).toBe(true, "Call has not yet exists on agent 1");

        // Switch to agent 2 to hold button
        await maxPageAgent1.logOut();
        await employeesPage1.logOut();
        await pageBase.closeWindow();
        await pageBase.switchDriverInstance(driverAgentAdmin);
        maxCallPageAdmin = await maxPageAdmin.waitForCallWorkspace();

        // VP: Second agent receives transfer
        expect(await maxCallPageAdmin.isCallAccepted()).toBe(true, "Call was not transfer to agent 2");

        // 5. Press hold button
        await maxCallPageAdmin.clickHoldButton();

        // VP: Agent 2 is put on hold. 
        expect(await maxCallPageAdmin.isCallHeld()).toBe(true, "The call is not held on agent2");

        // 6. Press unhold button
        await maxCallPageAdmin.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallPageAdmin.isCallResumed()).toBe(true, "The call was still held");

        // 7. End call contact
        maxPageAdmin = await maxCallPageAdmin.endCall();

        // VP: call ends
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call was ended on agent 2");

        // 8. As an administrator Log in to Evolve WFO. Staging enviroment https://na1.staging.nice-incontact.com
        await maxPageAdmin.logOut();

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
        expectedAgents = `${admin.name}, ${agent1.name}`;
        rowIndex = await searchPage.getAgentRecordIndexByContactID(expectedAgents, callContactId);

        // VP: Both agents are listed with the same contact ID and the same number of segments(4)
        expect(expectedAgents).toMatch(await searchPage.getSearchResult(rowIndex, SearchColumnName.AGENT_NAME), "Agents who made calls are not listed");

        // 13. select an agent and click on the play icon
        player = await searchPage.playRecord(rowIndex);
        playerHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(playerHandle);

        // VP: The NICE SaasS player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(admin.name, agent1.name)).toBe(true, "Player is not displayed");

        // 14. Press play button in the NICE player 
        await player.clickPlay();

        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording

        // 15. Close the player 
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Interaction player");

        // 16. In product picker. Select QM tools. See attached file QM tools for reference.
        formManagerPage = await searchPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await formManagerPage.isPageDisplayed()).toBe(true, "QM form is not displayed");

        // 17. In the agent selected click in the 3 dots icon in the right of the row
        searchPage = await formManagerPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);
        await searchPage.openMoreMenuOption(expectedAgents);

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

        // Get value of evaluation score submited
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();
        qmFormPage = await evaluationsPage.openNewestEvaluation();
        evaluationScore = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP. Form is correctly submitted and you are able to see value in the Evaluation Score column
        searchPage = await evaluationsPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        expect(await searchPage.isEvaluationScoreDisplayed(expectedAgents, "", evaluationScore)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout 
            loginPageAdmin = await employeesPageAdmin.logOut();
        } catch (err) {

        }
    }, TestRunInfo.conditionTimeout);

});
