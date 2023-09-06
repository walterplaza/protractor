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
import { ContactName } from "@data-objects/general/max";

/** 
 * Type: CXone
 * Suite: Evolve E2E
 * TC ID: 437407
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 * - IE: Failed by ticket IC-71112 - [TestAutomation][NICE-UI] The blank page is displayed after logging in Evolve on IE
 */

describe('CxOne E2E - 410947', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let expectedAgents: string;
    let actualAgents: Array<string>;
    let driverAdmin: number = 1;
    let driverAgent2: number = 2;
    let cluster: Cluster = TestRunInfo.cluster;
    let qmFormName = "QA Form";
    let agentsName: string;
    let score: string;
    let playerHandle: string;
    let qaFormHandle: string;

    // Declare page object    
    let loginPageAdmin: LoginPage;
    let loginPageAgent2: LoginPage;
    let employeesPage: EmployeesPage;
    let mySchedulePage: MySchedulePage
    let maxPageAdmin: MaxPage;
    let maxPageAgent2: MaxPage;
    let pageBase: PageBase;
    let maxCallAdmin: MaxCall;
    let maxCallAgent2: MaxCall;
    let maxTransfer: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410947 - Evolve> Inbound Call Cold Transfer Agent 2 hangs up (voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        //Pre-Condition:
        // Login as Admin
        pageBase = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesPage = await loginPageAdmin.loginAsAdmin(admin);

        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent2);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));

        // Login as Agent 2
        loginPageAgent2 = LoginPage.getInstance();
        mySchedulePage = await loginPageAgent2.loginAsAgent(agent2);
        await agent2.createPhoneNumber();
        maxPageAgent2 = await mySchedulePage.launchMax();
        await maxPageAgent2.submitLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber);
    }, TestRunInfo.conditionTimeout);

    it('Evolve Inbound Call Cold Transfer Agent 2 hangs up voice screen', async () => {

        // 2. Launch MAX Agent
        await pageBase.switchDriverInstance(driverAdmin);
        await admin.createPhoneNumber();
        maxPageAdmin = await employeesPage.launchMax();
        await maxPageAdmin.submitLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber);
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // 3. Callflow 1: Simple Inbound
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        maxCallAdmin = await maxPageAdmin.waitForCallWorkspace();

        // 4. Make a transfer Agent Call       
        maxTransfer = await maxCallAdmin.clickTransferConferenceButton();
        await maxTransfer.coldTransferCallToAgent(agent2.name);
        await maxPageAdmin.logOut();

        // 5. Press the hold button  
        await pageBase.switchDriverInstance(driverAgent2);
        await maxPageAgent2.changeState(MaxState.AVAILABLE);
        maxCallAgent2 = await maxPageAgent2.waitForCallWorkspace();
        await maxCallAgent2.clickHoldButton();

        // VP: Patron is put on hold 
        expect(await maxCallAgent2.isCallHeld(true, TestRunInfo.shortTimeout)).toBe(true, "Call is not held");

        // 6. Press Resume button
        await maxCallAgent2.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallAgent2.isCallHeld(false, TestRunInfo.shortTimeout)).toBe(true, "Call is not resumed");

        // 7. Agent 2 answers call.
        // VP: Patron and Agent 2 are talking
        expect(await maxCallAgent2.isCallHeld(false, TestRunInfo.shortTimeout)).toBe(true, "Call is interupted");

        // 8. Agent2 presses hang button on the agent console
        maxPageAgent2 = await maxCallAgent2.endCall();

        // VP: Call is hung up
        expect(await maxPageAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxCallAgent2.logOut();
        await mySchedulePage.logOut();
        await pageBase.closeWindow();

        // 9. As an administrator Log in to Evolve WFO. Staging enviroment https://na1.staging.nice-incontact.com
        await pageBase.switchDriverInstance(driverAdmin);

        // VP: Supervisor logged in
        expect(await employeesPage.isPageDisplayed()).toBe(true, "Supervisor is not logged in");

        // 10. in the toolbar of the left side press Employees>Search button
        searchPage = await employeesPage.gotoSearchPage();

        // VP: Employee page is displayed with the list of users
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 11. At the top click on the time picker and select today
        await searchPage.selectTime(SearchTimeRange.TODAY);

        // VP: Today is displayed in the combobox
        expect(await searchPage.getSelectedDate()).toBe(SearchTimeRange.TODAY, "Today is not selected.");

        // 12. Press search button
        await searchPage.clickSearch();

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "List of agents's calls are not listed");

        // 13. Look for Agent 1 and Agent 2 the ones of step 4
        expectedAgents = `${agent2.name}, ${agent1.name}`
        agentsName = await searchPage.getSearchResult(1, SearchColumnName.AGENT_NAME);
        actualAgents = Utility.splitString(await searchPage.getSearchResult(1, SearchColumnName.AGENT_NAME), ",");

        // VP: Both agents are listed with the same contact ID and the same number of segments(2)   
        expect(expectedAgents).toMatch(agentsName, "Agents who made calls are not listed");

        // 14. Select an agent and click on the play icon
        player = await searchPage.playRecord(1);
        playerHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(playerHandle);

        // VP: The NICE SaasS player is launch and you are able to see: Agent Name, Customer Name, Duration, Direction, Start Time, End Time
        expect(await player.isInfoDisplayedCorrectly(agent2.name, agent1.name)).toBe(true, "Player is not displayed");

        // 15. Press play button in the NICE player
        await player.clickPlay();

        // VP: Verify you are able to hear the audio recorder in each segment and you are able to play screen too

        // 16. Close the player
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is not closed");

        // 17. In product picker. Select QM tools. See attached file QM tools for reference
        formManagerPage = await searchPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await formManagerPage.isPageDisplayed()).toBe(true, "QM form is not displayed");

        // 18. In the agent selected click in the 3 dots icon in the right of the row
        searchPage = await formManagerPage.gotoSearchPage();
        await searchPage.selectTime(SearchTimeRange.TODAY);
        await searchPage.clickSearch();
        await searchPage.openMoreMenuOption(expectedAgents);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 19. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 20. Select you QM form and click submit        
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(qaFormHandle);

        // VP: The form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 21. Filled the form with correct answers and click submit
        await qmFormPage.fillQAForm();
        score = await qmFormPage.getEvaluationScore();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // VP: Form is correctly submitted and you are able to see value in the Evaluation Score column
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", score)).toBe(true, `Failed by ticket IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked "Send To Agent" button in Search page`);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});