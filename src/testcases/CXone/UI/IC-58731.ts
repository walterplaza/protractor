import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName, OtherItem, TransferTab } from "@data-objects/general/max";
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
 * Suite: CXone E2E
 * TC ID: IC-58731
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CxOne E2E - IC-58731', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let actualAgentsName: string;
    let callContactId: number;
    let driverAgent2: number = 2;
    let driverAdmin: number = 1;
    let cluster: Cluster = TestRunInfo.cluster;
    let qmFormName = "QA Form";
    let score: string;
    let rowAgentName: number;
    let transferSkillName: string;

    // Declare page object
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAgent2: MaxPage;
    let maxPageAdmin: MaxPage
    let basePage: PageBase;
    let maxCallAgent2: MaxCall;
    let maxCallAdmin: MaxCall;
    let maxTransferAdmin: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let mySchedulePageAgent2: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let qaFormHandle: string;
    let agentsName: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58731 - Inbound Call Cold Transfer/ReSkill Agent 2 to hangs up (voice+screen)`);

        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);
        transferSkillName = SkillCore.getEvolveSkillName(SkillType.IB_Phone);
        agentsName = `${agent2.name}, ${admin.name}`;
        basePage = new PageBase();

    }, TestRunInfo.conditionTimeout);

    it('IC-58731 - CxOne Inbound Conference With Agent agent 2 ends call voice screen', async () => {

        // 2. Login access to evolve.
        loginPageAdmin = LoginPage.getInstance();

        // VP: Sig In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Login page is not displayed");
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed()).toBe(true, "User name text box is not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();
        await loginPageAdmin.enterPassword(admin);

        // VP: 	User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value editable is displayed");
        expect(await loginPageAdmin.isPasswordTextBoxEditable()).toBe(true, "Password is not editable");
        expect(await loginPageAdmin.isForgotPasswordDisplayed()).toBe(true, "User name text box is not displayed");
        expect(await loginPageAdmin.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
        expect(await loginPageAdmin.isSignInButtonDisplayed()).toBe(true, "Sign in button is not displayed");

        // click Sign In button
        employeesPageAdmin = await loginPageAdmin.clickSignInButton();

        // 4. Click in the square icon next to NICE inConcant brand and select  LAUNCH MAX
        maxPageAdmin = await employeesPageAdmin.launchMax();

        // 5. Make sure "Set Phone Number" is selected and enter a correct phone number in the Phone Number text box 
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        let actualPhoneNumber = await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE);

        // VP: Phone number text box is filled correctly
        expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

        // 6. Click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not correct")

        // 7. Change the MAX agent status by clicking down arrow next to the status name from Unavailable to Available
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // 8. Place an inbound call
        // 9 . Agent accepts incoming call
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        maxCallAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // VP: Call is displayed in MAX Agent
        expect(await maxCallAdmin.isCallAccepted()).toBe(true, "The inbound call is not displayed");

        // 10. Log in CxOne the other agent
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverAgent2);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));

        loginPageAgent2 = LoginPage.getInstance();
        mySchedulePageAgent2 = await loginPageAgent2.loginAsAgent(agent2);

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePageAgent2.isPageDisplayed()).toBe(true, " Agent 2 is cannot log in CxOne")

        // 11. Launch Max and change the status to Available
        await agent2.createPhoneNumber();
        maxPageAgent2 = await mySchedulePageAgent2.launchMax();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // 12. Back to Max of agent1 and Click hold button
        await basePage.switchDriverInstance(driverAdmin);
        await maxCallAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallAdmin.isCallHeld()).toBe(true, "The call is not held")

        // 13. Click Transfer/Conf and Open the Address book
        maxTransferAdmin = await maxCallAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferAdmin.isAddressBookDisplayed()).toBe(true, "Address book panel is not displayed")

        // 14. Go to Other tab and click Skills option
        await maxTransferAdmin.selectAddressBookTab(TransferTab.OTHER);
        await maxTransferAdmin.selectOtherItem(OtherItem.SKILLS);

        // VP: Displays a list of skills
        expect(await maxTransferAdmin.isSkillListDisplayed()).toBe(true, "List of skills is not displayed")

        // 15. Select the skill assigned (IBPhoneSkillAutomation) to the agents from the list and click on the arrow to the right of skill
        await maxTransferAdmin.openSkillItem(transferSkillName);

        // All the agents assigned to the skill are displayed
        expect(await maxTransferAdmin.isListOfAgentsAssignedToTheSkillDisplayed()).toBe(true, "List of agents assigned to the skill aren't displayed");

        // 16. Select the agent 2 (Agent User) and click Transfer button
        await maxTransferAdmin.transferCallToAgentFromAddressBook(agent2.name);

        // VP: Agent placed in Outbound state, call made to the selected skill queue

        // 17. On MAX of agent 2, pick up agent leg and answer the call
        await basePage.switchDriverInstance(driverAgent2);
        maxCallAgent2 = await maxPageAgent2.waitForCallWorkspace();

        // VP: Phone is answered Agent 2 and patron are talking.
        expect(await maxCallAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Phone is not answered");

        // 18. On Max agent 1 click Cold transfer button on conversation panel to transfer the call to agent 2
        await basePage.switchDriverInstance(driverAdmin);
        await maxCallAdmin.clickColdTransfer();
        await maxCallAdmin.logOut();

        // VP: Agent 2 receives transfer. First agent 1 no longer on call.
        await basePage.switchDriverInstance(driverAgent2);
        expect(await maxCallAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Phone is not answered");

        // 19. Patron hangs up phone
        await maxCallAgent2.endCall();

        // VP: Call is hung up
        expect(await maxCallAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call is not ended");
        await maxCallAgent2.logOut();

        // 20. In the toolbar of the left side press ADMIN >Search button
        await basePage.switchDriverInstance(driverAdmin);
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 21. Make sure time picker has  Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 22. Look for last calls with Agent 1 and Agent 2
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());
        actualAgentsName = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: both agents are listed with the same contact ID and the same number of segments(3)
        expect(agentsName).toMatch(actualAgentsName, "Agents who made calls are not listed");

        // 23. select an agent and click on the play icon
        player = await searchPage.playRecord(rowAgentName);

        // VP: the NICE SaasS player is launch and you are able to see
        expect(await player.isInfoDisplayedCorrectly(agent2.name, admin.name)).toBe(true, "Player is not displayed");

        // 24. Press play button in the NICE player
        await player.clickPlay();

        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording

        // 25. Close player
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is displayed.");

        // 26. In the segment with the agent1 is displayed as first agent in the Agent Name column click in the 3 dots icon in the right of the row
        searchPage = await employeesPageAdmin.gotoSearchPage();
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        await searchPage.openMoreMenuOption(agentsName);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isShareOptionDisplayed()).toBe(true, "Share option is not displayed");
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");
        expect(await searchPage.isSelfAssessmentOptionDisplayed()).toBe(true, "Self Assessment option is not displayed");

        // 27. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 28. Select your QM form (QA From)
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await basePage.switchWindowByHandle(qaFormHandle);

        // VP: The form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 29. Fill the form and click Send to Agent button
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();

        // VP: The following message is displayed: Evaluation sent to agent
        expect(await qmFormPage.isEvaluationSentToAgentMessageDisplayed()).toBe(true, "Message is not displayed");
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // 30. In the toolbar of the left side press Search > My Zone button
        await basePage.switchDriverInstance(driverAgent2);

        // VP: My Schedule page is displayed
        expect(await mySchedulePageAgent2.isPageDisplayed()).toBe(true, "My Schedule page is not displayed");

        // 31. Click Evaluations option
        evaluationsPage = await mySchedulePageAgent2.gotoEvaluations();

        // VP: My evaluations is displayed; Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        // 32. Click over it with status New
        qmFormPage = await evaluationsPage.openNewestEvaluation();
        score = await qmFormPage.getEvaluationScore();

        // VP:  Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 33. Press Acknowledge button on the form
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationsPage.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // 34. In the toolbar of the left side press My Zone > Search button
        await evaluationsPage.closePlayer();
        await evaluationsPage.logOut();
        await basePage.closeWindow();
        await basePage.switchDriverInstance(driverAdmin);

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 35. Make sure time picker has  Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: form is correctly submitted and you are able to see value in the Evaluation Score column
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", score)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});