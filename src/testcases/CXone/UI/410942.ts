import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchTimeRange } from "@data-objects/general/cluster";
import { OtherItem, TransferTab } from "@data-objects/general/max";
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
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";

/** 
 * Type: CXone
 * Suite: CXone E2E
 * TC ID: 410942
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32, SO31, TO32, TO31
 * Failed by bug IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked "Send To Agent" button in Search page.
 */

describe('CxOne E2E - 410942', function () {
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let pageBase: PageBase;
    let agentMaxHandle: string;
    let driverAgent: number = 2;
    let driverAdmin: number = 1;
    let callContactId: string;
    let currentTotalWindows: number;
    let QMItem: string[];
    let qmFormName = "QA Form";
    let qaFormHandle: string;

    let agentName: string;
    let score: string;
    let transferSkillName: string;
    let obPhoneNumber: string = "40000100" + Utility.getRandomNumber(2);

    // Declare page object
    let agentLoginPage: LoginPage;
    let adminLoginPage: LoginPage;
    let adminEmployeesPage: EmployeesPage;
    let agentEmployeesPage: EmployeesPage;
    let adminMaxPage: MaxPage;
    let agentMaxPage: MaxPage;
    let adminMaxCall: MaxCall;
    let agentMaxCall: MaxCall;
    let QmPage: FormManagerPage;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let evaluationsPage: EvaluationsPage;
    let mySchedulePage: MySchedulePage;
    let maxTransferPage: MaxTransfer;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `410942 - Evolve> Outbound Call warm Transfer/ReSkill Agent 2 hangs up call (voice + screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        transferSkillName = SkillCore.getEvolveSkillName(SkillType.IB_Phone);

        pageBase = new PageBase();
        agentName = `${agent.name}, ${admin.name}`;
        adminLoginPage = LoginPage.getInstance();
        adminEmployeesPage = await adminLoginPage.loginAsAdmin(admin);
        QmPage = await adminEmployeesPage.gotoQM();

        if (await QmPage.isQmFormTableEmpty(TestRunInfo.shortTimeout)) {
            // create Qm item if no Qm exists
            await QmPage.createDefaultQMForm();
        }

        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        agentLoginPage = LoginPage.getInstance();
        agentEmployeesPage = await agentLoginPage.loginAsAdmin(agent);
        agentMaxPage = await agentEmployeesPage.launchMax();
        agentMaxHandle = await pageBase.getCurrentWindowHandle();
        await agent.createPhoneNumber();
        await agentMaxPage.enterLaunchForm(MaxConnectOption.PHONE, agent.phoneNumber, false);
        await agentMaxPage.connectMax();
        await agentMaxPage.changeState(MaxState.AVAILABLE);
    }, TestRunInfo.conditionTimeout);

    it('Evolve Outbound Call warm Transfer ReSkill Agent 2 hangs up call voice screen', async () => {

        // 2. Launch MAX Agent
        await pageBase.switchDriverInstance(driverAdmin);
        adminMaxPage = await QmPage.launchMax();
        await admin.createPhoneNumber();
        await adminMaxPage.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        await adminMaxPage.connectMax();

        // 3. Place Outbound call
        await adminMaxPage.callPhoneNumber(admin, obPhoneNumber, SkillType.OB_PHONE);
        adminMaxCall = await adminMaxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // 4. TransFer To Skill/ReSkill(Warm Transfer)
        // Follow Shared Steps 302702:TransFer To Skill/ReSkill(Warm Transfer)
        await adminMaxCall.clickHoldButton();
        maxTransferPage = await adminMaxCall.clickTransferConferenceButton();
        await maxTransferPage.selectAddressBookTab(TransferTab.OTHER);
        await maxTransferPage.selectOtherItem(OtherItem.SKILLS);
        await maxTransferPage.selectOtherSkillItem(transferSkillName);

        // Add duration time for transfer call
        await pageBase.waitInSecond(5);

        await adminMaxCall.clickTransferCall();

        // 5. Press the hold button.
        await pageBase.switchDriverInstance(driverAgent);
        await pageBase.switchWindowByHandle(agentMaxHandle);

        agentMaxCall = await agentMaxPage.waitForCallWorkspace();
        await agentMaxCall.clickHoldButton();

        // VP: Patron is put on hold. 
        expect(await agentMaxCall.isCallHeld()).toBe(true, "Patron isn't put on hold.");

        // 6. Press Resume button.
        await agentMaxCall.clickUnHoldButton();

        // VP: Call is resumed.
        expect(await agentMaxCall.isCallHeld(true, TestRunInfo.shortTimeout)).toBe(false, "Patron is put on hold.");

        // 7. Agent 2 presses the hang up button on the agent console.
        await agentMaxCall.endCall();

        // VP: Call ended
        expect(await agentMaxCall.isCallEnded()).toBe(true, "Call isn't ended");
        await agentMaxCall.logOut();
        await agentEmployeesPage.logOut();
        await pageBase.closeWindow();

        // 8. As an administrator Log in to Evolve WFO. Staging enviroment https://na1.staging.nice-incontact.com
        await pageBase.switchDriverInstance(driverAdmin);

        await adminMaxCall.logOut();

        // VP: Supervisor logged in.
        expect(await QmPage.isPageDisplayed()).toBe(true, "Supervisor doesn't log in");

        // 9. In the toolbar of the left side press Employees>Search button
        searchPage = await QmPage.gotoSearchPage();

        // VP: Employee page is displayed with the list of users
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 10. At the top click on the time picker and select today
        await searchPage.selectTime(SearchTimeRange.TODAY);

        // VP: Today is displayed in the combobox
        expect(await searchPage.getSelectedDate()).toBe(SearchTimeRange.TODAY, "Today isn't displayed in the combobox");

        // 11. Press search button
        await searchPage.clickSearch();

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 12. Look for Agent 1 and Agent 2 the ones of step 4
        await searchPage.search(SearchTimeRange.TODAY, callContactId);

        // VP: Both agents are listed with the same contact ID and the same number of segments(3)
        expect(await searchPage.isAgentDisplayedInSearchTable(agentName, callContactId)).toBe(true, "Both agents aren't listed with the same contact ID and the same number of segments");

        // 13. Select an agent and click on the play icon
        player = await searchPage.playRecord(2);

        // VP: The NICE SaasS player is launch and you are able to see: Agent Name, Customer Name, Duration, Direction, Start Time, End Time
        expect(await player.isInfoDisplayedCorrectly(admin.name, agent.name)).toBe(true, "Player is not displayed");

        // 14. Press play button in the NICE player
        // VP: Verify you are able to hear the audio recorder in each segment and you can play recording made

        // 15. Close the player 
        await player.close();

        // VP: Player is closed
        currentTotalWindows = await pageBase.getTotalWindows();
        expect(1).toBe(currentTotalWindows, "Player is not closed");

        // 16. In product picker. Select QM tools. See attached file QM tools for reference.
        QmPage = await adminEmployeesPage.gotoQM();

        // VP: Qm tools selected with the list of all the form created, the QM "FormTest" should be listed in the Form Manager page
        expect(await QmPage.isQmFormTableEmpty(TestRunInfo.shortTimeout)).toBe(false, "the QM 'FormTest' isn't listed in the Form Manager page");
        QMItem = await QmPage.getAllQmFormItem();

        // 17. In the agent selected click in the 3 dots icon in the right of the row
        searchPage = await adminEmployeesPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId);
        await searchPage.openMoreMenuOption(agentName);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 18. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await searchPage.isAllEvaluationDisplayedDropDownList(QMItem)).toBe(true, "Select from window isn't displayed listing all the evaluation existent");

        // 19. Select you QM form and click submit
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await pageBase.switchWindowByHandle(qaFormHandle);

        // VP: The form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 20. Filled the form with correct answers and click submit
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // Get value of evaluation score submitted
        mySchedulePage = await searchPage.gotoMyZonePage();
        evaluationsPage = await mySchedulePage.gotoEvaluations();
        qmFormPage = await evaluationsPage.openNewestEvaluation();
        score = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Form is correctly submitted and you are able to see value in the Evaluation Score column
        searchPage = await evaluationsPage.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        expect(await searchPage.isEvaluationScoreDisplayed(agentName, "", score)).toBe(true, "Failed by bug IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked 'Send To Agent' button in Search page. The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await searchPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestHelpers.endAllContacts(admin);
                await TestHelpers.endAllContacts(agent);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});