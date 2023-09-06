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
 * TC ID: 410936
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe("CxOne E2E - 410936", function () {
    let cluster: Cluster = TestRunInfo.cluster;
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let driverAgent1: number = 2;
    let driverAdmin: number = 1;
    let expectedAgents: string;
    let agentsName: string;
    let score: string;
    let actualAgents: Array<string>;
    let qaFormHandle: string;
    let homeWindowHandleAdmin: string;
    let homeWindowHandleAgent1: string;
    let callContactId: number;
    let qmFormName = "QA Form";

    // Declare page object
    let basePage: PageBase;
    let loginPageAgent1: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent1: MaxPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let employeesPage1: EmployeesPage;
    let maxCallPage: MaxCall;
    let maxCallPageAdmin: MaxCall;
    let qmFormPage: QMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let searchPage: SearchPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410936 - Evolve> Outbound call Conference Agent 2 hangs up (voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);

        // 1. Login using Agent 2 and set Available status
        basePage = new PageBase();
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        homeWindowHandleAdmin = await BrowserWrapper.getNewWindowHandle();

        // 1.1 Launch Max Agent 2:
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await maxPageAdmin.connectMax();

        // 1.2 Set Available status
        await maxPageAdmin.changeState(MaxState.AVAILABLE);
    }, TestRunInfo.conditionTimeout);

    it('Evolve Outbound call Conference Agent 2 hangs up (voice+screen)', async () => {

        // 2. Login using Agent 1
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverAgent1);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent1 = LoginPage.getInstance();
        employeesPage1 = await loginPageAgent1.loginAsAdmin(agent1);
        homeWindowHandleAgent1 = await BrowserWrapper.getNewWindowHandle();

        // 2.1 Launch Max Agent 1:
        maxPageAgent1 = await employeesPage1.launchMax();
        await agent1.createPhoneNumber();
        await maxPageAgent1.enterLaunchForm(MaxConnectOption.PHONE, agent1.phoneNumber, false);
        await maxPageAgent1.connectMax();

        // 2.2 Place Outbound Call        
        await maxPageAgent1.callPhoneNumber(agent1, cluster.outboundNumber, SkillType.OB_PHONE);
        maxCallPage = await maxPageAgent1.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(agent1, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // 2.3 Conference call to Agent 2
        await maxCallPage.clickTransferConferenceButton();
        await maxCallPage.openMyTabAddressBook();
        await maxCallPage.filterAgentNameAddressBook(admin.name);
        await maxCallPage.callAgentFromAddressBook(admin.name);

        // 3. On agent 2
        await basePage.switchDriverInstance(driverAdmin);

        // 3.1 Click the 'Accept' button
        maxCallPageAdmin = await maxPageAdmin.acceptInBoundCallContactTransfer();

        // 4. On agent 1, click Conference button        
        await basePage.switchDriverInstance(driverAgent1);
        await maxCallPage.clickConferenceWithAgent(admin.name);

        // 5. Agent 2 is removed from the conference
        basePage.switchDriverInstance(driverAdmin);
        await maxCallPageAdmin.clickHoldButton();

        // VP: Patron is put on hold. 
        expect(await maxCallPageAdmin.isCallHeld()).toBe(true, "The call is not held");

        // VP: Call is resumed.
        await maxCallPageAdmin.clickUnHoldButton();
        expect(await maxCallPageAdmin.isCallResumed()).toBe(true, "The call is held");
        await maxCallPageAdmin.endCall();
        await maxCallPageAdmin.logOut();
        await basePage.switchWindowByHandle(homeWindowHandleAdmin);

        // 6. End contact on agent 1
        await basePage.switchDriverInstance(driverAgent1);
        expect(await maxCallPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Agent 1 and patron cannot still talk");
        maxPageAgent1 = await maxCallPage.endCall();

        // VP: Call is hung up         
        expect(await maxPageAgent1.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call is not ended");

        // 7. Logout from agent page 1
        await maxPageAgent1.logOut();
        await basePage.switchWindowByHandle(homeWindowHandleAgent1);
        await employeesPage1.logOut();
        await basePage.closeWindow();

        // 8. As an administrator Log in to Evolve WFO                              
        await basePage.switchDriverInstance(driverAdmin);

        // 9. in the toolbar of the left side press Employees>Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();
        await searchPage.clickSearch();

        // 10. at the top click on the time picker and select today
        // 11. press search button
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // 12. look for Agent 1 and Agent 2 the ones of step 4
        expectedAgents = Utility.sortStrings(agent1.name, admin.name);
        agentsName = await searchPage.getSearchResult(1, SearchColumnName.AGENT_NAME);
        actualAgents = Utility.splitString(agentsName, ",");

        // VP: both agents are listed with the same contact ID and the same number of segments(3)
        expect(expectedAgents).toMatch(Utility.sortStrings(actualAgents[0], actualAgents[1]), "Agents who made calls are not listed");

        // 13. select an agent and click on the play icon
        // 14. Press play button in the NICE player
        player = await searchPage.playRecord(2);

        // VP: the NICE SaasS player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(agent1.name, admin.name)).toBe(true, "Player is not displayed");

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

        // 21. Go to My Space > My Evaluations in menu navigation 
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();

        // VP: My evaluations is displayed; Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        //  22. Click over it
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
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", score)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            //Final
            await employeesPageAdmin.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});