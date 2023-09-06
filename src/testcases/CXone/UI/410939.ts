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
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: CXone
 * Suite: CxOne E2E
 * TC ID: 410939
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe("CxOne E2E - 410939", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let maxPageHandleAdmin: string;
    let maxPageHandleAgent2: string;
    let employeesPageHandleAdmin: string;
    let qaFormHandle: string;
    let driverAgent1: number = 2;
    let driverAdmin: number = 1;
    let cluster: Cluster = TestRunInfo.cluster;
    let callContactId: number;
    let expectedAgents: string;
    let actualAgents: Array<string>;
    let player: InteractionPlayer;
    let qmFormName = "QA Form";
    let score: string;
    let agentsName: string;

    // Declare page object
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAgent2: EmployeesPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAgent2: MaxPage;
    let maxPageAdmin: MaxPage;
    let basePage: PageBase;
    let maxCallAgent2: MaxCall;
    let maxCallAdmin: MaxCall;
    let maxTransferPage: MaxTransfer;
    let searchPage: SearchPage;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410939 - Evolve>Inbound Call warm Transfer agent 2 hangs up call(voice + screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        //Pre-Condition:
        basePage = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        employeesPageHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        // Opening Agent
        basePage.createDriverInstance();
        basePage.switchDriverInstance(driverAgent1);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));

        // 1. Login access to evolve.
        loginPageAgent2 = LoginPage.getInstance();
        employeesPageAgent2 = await loginPageAgent2.loginAsAdmin(agent2);
        maxPageAgent2 = await employeesPageAgent2.launchMax();
        maxPageHandleAgent2 = await BrowserWrapper.getNewWindowHandle();
        await agent2.createPhoneNumber();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
    }, TestRunInfo.conditionTimeout);

    it('Evolve Inbound Call warm Transfer agent 2 hangs up call voice screen', async () => {

        // 2. Launch MAX Agent
        basePage.switchDriverInstance(driverAdmin);
        maxPageAdmin = await employeesPageAdmin.launchMax();
        maxPageHandleAdmin = await BrowserWrapper.getNewWindowHandle();
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPageAdmin.connectMax();
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // 3. Callflow 1: Simple Inbound
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        maxCallAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        basePage.switchDriverInstance(driverAgent1);
        await basePage.switchWindowByHandle(maxPageHandleAgent2);
        await maxPageAgent2.changeState(MaxState.AVAILABLE);
        await basePage.switchDriverInstance(driverAdmin)
        await basePage.switchWindowByHandle(maxPageHandleAdmin);

        // 4. Initiate warm Transfer
        // Place active call on hold
        await maxCallAdmin.clickHoldButton();

        // VP: Call on hold
        expect(await maxCallAdmin.isCallHeld()).toBe(true, "Call isn't on hold state");

        // Open the Address book
        maxTransferPage = await maxCallAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferPage.isAddressBookDisplayed()).toBe(true, "Address book panel doesn't open successfully");

        // Select filter for agents logged in
        await maxTransferPage.openMyTabAddressBook();
        await maxTransferPage.filterAgentNameAddressBook(agent2.name);

        // VP: Displays agents that are logged in
        expect(await maxTransferPage.isAgentResultDisplayed(agent2.name)).toBe(true, "the agent isn't logged in");

        // Select the agent you would like to transfer the call
        await maxTransferPage.callAgentFromAddressBook(agent2.name);

        basePage.switchDriverInstance(driverAgent1);
        maxCallAgent2 = await maxPageAgent2.acceptInBoundCallContactTransfer();

        // VP: Agents are connected;
        expect(await maxCallAgent2.isCallAccepted()).toBe(true, "Agents aren't connected");

        // Click transfer button on conversation panel to transfer the call to the selected agent
        basePage.switchDriverInstance(driverAdmin);
        await basePage.switchWindowByHandle(maxPageHandleAdmin);
        await maxCallAdmin.clickTransferWithAgent(agent2.name);

        // VP: Second agent receives transfer.  First agent no longer on call.
        expect(await maxCallAdmin.isCallEnded()).toBe(true, "First agent on call");

        // 5. Press the hold button.
        await maxCallAdmin.logOut();
        basePage.switchDriverInstance(driverAgent1);
        await basePage.switchWindowByHandle(maxPageHandleAgent2);
        await maxCallAgent2.clickHoldButton();

        // VP: Patron is put on hold
        expect(await maxCallAgent2.isCallHeld()).toBe(true, "The call is not held");

        // 6. Press Resume button.
        await maxCallAgent2.clickUnHoldButton();

        // VP: Call is resumed.
        expect(await maxCallAgent2.isCallHeld(false, TestRunInfo.shortTimeout)).toBe(true, "The call is held");

        // 7. Agent2 presses hang button
        await maxCallAgent2.endCall();

        // VP: Call ended.
        expect(await maxCallAgent2.isCallEnded()).toBe(true, "Call doesn't ended")

        // 8. As an administrator Log in to Evolve WFO. Staging enviroment https://na1.staging.nice-incontact.com
        await maxCallAgent2.logOut();
        await employeesPageAgent2.logOut();
        await basePage.closeWindow();

        basePage.switchDriverInstance(driverAdmin);
        await basePage.switchWindowByHandle(employeesPageHandleAdmin);

        // 9. in the toolbar of the left side press Employees>Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();
        await searchPage.clickSearch();

        // 10. at the top click on the time picker and select today
        // 11. press search button
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // 12. look for Agent 1 and Agent 2 the ones of step 4
        expectedAgents = Utility.sortStrings(agent2.name, agent1.name);
        agentsName = await searchPage.getSearchResult(1, SearchColumnName.AGENT_NAME);
        actualAgents = Utility.splitString(agentsName, ",");

        // VP: both agents are listed with the same contact ID and the same number of segments(3)
        expect(expectedAgents).toMatch(Utility.sortStrings(actualAgents[0], actualAgents[1]), "Agents who made calls are not listed");

        // 13. select an agent and click on the play icon
        // 14. Press play button in the NICE player
        player = await searchPage.playRecord(1);

        // VP: the NICE SaasS player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(agent2.name, agent1.name)).toBe(true, "Player is not displayed");

        // 15. Close player
        await player.close();

        // 16. Select QM tools.
        formManagerPage = await searchPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await formManagerPage.isPageDisplayed()).toBe(true, "QM form is not displayed");

        // 17. in the agent selected click in the 3 dots icon in the right of the row
        searchPage = await formManagerPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        await searchPage.openMoreMenuOption(agentsName);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 18. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 19. Select you QM form and click submit
        // 20. Filled the form with correct answers and click submit
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await basePage.switchWindowByHandle(qaFormHandle);

        // VP: the form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // Go to My Space > My Evaluations in menu navigation 
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();

        // VP: My evaluations is displayed; Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        //  Click over it
        qmFormPage = await evaluationsPage.openNewestEvaluation();

        // VP:  Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // Press Acknowledge button  
        score = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationsPage.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // Go to Search option in navigation bar; and search evaluated screen capture;
        await evaluationsPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: form is correctly submitted and you are able to see value in the Evaluation Score column
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", score)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            employeesPageAdmin = await searchPage.gotoEmployeesPage();
            await employeesPageAdmin.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});