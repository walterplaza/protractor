import { WFIRule } from "@data-objects/CXone/wfi/rules/rule-info";
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
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: CXone
 * Suite: CxOne E2E
 * TC ID: 410935
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CxOne E2E - 410935', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let qaFormHandle: string;
    let expectedAgents: string;
    let callContactId: number;
    let driverAgent2: number = 2;
    let driverAdmin: number = 1;
    let cluster: Cluster = TestRunInfo.cluster;
    let qmFormName = "QA Form";
    let score: string;
    let playerHandle: string;
    let actualAgents: Array<string>;

    // Declare page object
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAgent2: EmployeesPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent2: MaxPage;
    let basePage: PageBase;
    let maxCallAdmin: MaxCall;
    let maxCallAgent2: MaxCall;
    let maxTransferAgent1: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let agentName: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410935 - Evolve> Inbound Conference With Agent agent 2 ends call(voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        //Pre-Condition:
        basePage = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);

        // Opening Agent
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverAgent2);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));

        // 1. Login access to evolve.
        // 2. As an Admin user log in to Evolve WFO
        loginPageAgent2 = LoginPage.getInstance();
        employeesPageAgent2 = await loginPageAgent2.loginAsAdmin(agent2);
        await agent2.createPhoneNumber();
        maxPageAgent2 = await employeesPageAgent2.launchMax();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();

    }, TestRunInfo.conditionTimeout);

    it('Evolve Inbound Conference With Agent agent 2 ends call voice screen', async () => {

        // 2. Launch MAX Agent
        agentName = `${agent2.name}, ${admin.name}`;
        await basePage.switchDriverInstance(driverAdmin);
        maxPageAdmin = await employeesPageAdmin.launchMax();
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

        // 4. Conference call to Agent2
        maxTransferAgent1 = await maxCallAdmin.clickTransferConferenceButton();
        await maxTransferAgent1.filterAgentNameAddressBook(agent2.name);
        await maxTransferAgent1.callAgentFromAddressBook(agent2.name);

        // 5. Press the hold button.
        await basePage.switchDriverInstance(driverAgent2);
        maxCallAgent2 = await maxPageAgent2.acceptInBoundCallContactTransfer();
        await maxCallAgent2.clickHoldButton();

        // VP: Patron is put on hold. 
        expect(await maxCallAgent2.isCallHeld()).toBe(true, "The call is not held")

        // 6. Press Resume button.
        await maxCallAgent2.clickUnHoldButton();

        // VP: Call is resumed.
        expect(await maxCallAgent2.isCallResumed()).toBe(true, "The call is held");

        // 7. Agent 2 presses hang up on the agent console.
        maxPageAgent2 = await maxCallAgent2.endCall();
        await maxPageAgent2.logOut();
        await employeesPageAgent2.logOut();
        await basePage.closeWindow();

        // VP: Agent 2 is removed from the conference, agent 1 and patron can still talk
        await basePage.switchDriverInstance(driverAdmin);

        expect(await maxCallAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Agent 1 and patron cannot still talk");

        // 8. Agent 1 presses hang up on the agent console.
        await maxCallAdmin.clickUnHoldButton();
        maxPageAdmin = await maxCallAdmin.endCall();

        // VP: Call is hung up 
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call is not ended");
        await maxPageAdmin.logOut();

        // 9. As an administrator Log in to Evolve WFO. Staging environment https://na1.staging.nice-incontact.com
        // 10. in the toolbar of the left side press ADMIN>Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: CXone search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 11. at the top click on the time picker and select today
        await searchPage.selectTime(SearchTimeRange.TODAY);

        // VP: Today is displayed in the combobox
        expect(await searchPage.getSelectedDate()).toBe(SearchTimeRange.TODAY, "Today is not selected.");

        // 12. press search button
        await searchPage.clickSearch();

        // 13. look for Agent 1 and Agent 2 the ones of step 4
        expectedAgents = Utility.sortStrings(agent2.name, admin.name);
        actualAgents = Utility.splitString(await searchPage.getSearchResult(1, SearchColumnName.AGENT_NAME), ",");

        // VP: both agents are listed with the same contact ID and the same number of segments(4)
        expect(expectedAgents).toMatch(Utility.sortStrings(actualAgents[0], actualAgents[1]), "Agents who made calls are not listed");

        // 14. select an agent and click on the play icon
        // 15. Press play button in the NICE player 
        player = await searchPage.playRecord(1);
        playerHandle = await basePage.getCurrentWindowHandle();
        await basePage.switchWindowByHandle(playerHandle);

        // VP: The NICE SaasS player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(admin.name, agent1.name)).toBe(true, "Player is not displayed");

        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording

        // 16. Close the player 
        await player.close();

        // 17. Select QM tools.
        formManagerPage = await searchPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await formManagerPage.isPageDisplayed()).toBe(true, "QM form is not displayed");

        // 18. in the agent selected click in the 3 dots icon in the right of the row
        searchPage = await formManagerPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        await searchPage.openMoreMenuOption(agentName);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 19. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 20. Select you QM form and click submit
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await basePage.switchWindowByHandle(qaFormHandle);

        // VP: the form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // 21. Go to My Space > My Evaluations in menu navigation 
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();

        // VP: My evaluations is displayed; Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        // 22. Click over it
        qmFormPage = await evaluationsPage.openNewestEvaluation();

        // VP:  Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 23. Press Acknowledge button  
        score = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationsPage.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // 24. Go to Search option in navigation bar; and search evaluated screen capture;
        await evaluationsPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: form is correctly submitted and you are able to see value in the Evaluation Score column
        expect(await searchPage.isEvaluationScoreDisplayed(agentName, "", score)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});