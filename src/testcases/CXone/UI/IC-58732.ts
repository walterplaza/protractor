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
 * Suite: CXone E2E
 * TC ID: IC-58732
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 * - IE: Failed by ticket IC-71112 - [TestAutomation][NICE-UI] The blank page is displayed after logging in Evolve on IE
 */

describe('CXone E2E - IC-58732', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let actualAgents: string;
    let driverAdmin: number = 1;
    let driverAgent2: number = 2;
    let cluster: Cluster = TestRunInfo.cluster;
    let qmFormName = "QA Form";
    let agentsName: string;
    let evaluationScore: string;
    let playerHandle: string;
    let qaFormHandle: string;
    let rowAgent: number;
    let callContactId: number;

    // Declare page object    
    let loginPageAdmin: LoginPage;
    let loginPageAgent2: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let employeesPageAgent2: EmployeesPage;
    let mySchedulePage: MySchedulePage
    let maxPageAdmin: MaxPage;
    let maxPageAgent2: MaxPage;
    let pageBase = new PageBase();
    let maxCallAdmin: MaxCall;
    let maxCallAgent2: MaxCall;
    let maxTransfer: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let evaluationPage2: EvaluationsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58732 - Evolve> Inbound Call Cold Transfer Agent 2 hangs up (voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);


    }, TestRunInfo.conditionTimeout);

    it('IC-58732 - Evolve Inbound Call Cold Transfer Agent 2 hangs up voice screen', async () => {
        loginPageAdmin = LoginPage.getInstance();

        // VP: Sign In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. And click Next button	
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();
        await loginPageAdmin.waitForSpinner(TestRunInfo.middleTimeout);

        // VP: User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value not editable is not displayed");
        expect(await loginPageAdmin.isEnterPasswordControlsDisplayed()).toBe(true, "Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom are not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        // Click Sign In button
        await loginPageAdmin.enterPassword(admin);
        employeesPageAdmin = await loginPageAdmin.clickSignInButton();

        // 4. Click in the square icon next to NICE inContact brand and select LAUNCH MAX
        maxPageAdmin = await employeesPageAdmin.launchMax();

        // 5. Make sure "Set Phone Number" is selected and enter a correct phone number in the Phone Number text box 
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);

        // VP: Phone number text box is filled correctly
        expect(await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE)).toMatch(admin.phoneNumber, "Filled phone number is not correctly");

        // 6. Click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.isMaxLaunched()).toBe(true, "MAX is not launched");
        expect(await maxPageAdmin.getAgentStatus()).toMatch(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not Unavailable");

        // 7. Change the MAX agent status by clicking down arrow next to the status name from Unavailable to Available	
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // VP: Status change to Available
        expect(await maxPageAdmin.getAgentStatus()).toMatch(MaxState.AVAILABLE.toUpperCase(), "Agent status doesn't change to Available");

        // 8. Place an inbound call to POC using Lab phone	
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // VP: Incoming call is displayed in MAX Agent 1
        // 9. Agent accepts incoming call	
        // VP: Agent can hear customer on other end, and customer can hear agent on other end.
        maxCallAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        expect(await maxCallAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Incoming call is not displayed in MAX Agent");

        // 10. Log in CxOne the other agent	
        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent2);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent2 = LoginPage.getInstance();
        await loginPageAgent2.loginAsAdmin(agent2);
        mySchedulePage = new MySchedulePage();

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent 2 is not log in CxOne");

        // 11. Launch Max and change the status to Available
        await agent2.createPhoneNumber();
        maxPageAgent2 = await mySchedulePage.launchMax();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // VP: Status Available to agent 2
        expect(await maxPageAgent2.getAgentStatus()).toMatch(MaxState.AVAILABLE.toLocaleUpperCase(), "Agent 2 does not change status to available");

        // 12. Back to Max of agent1 and Click hold button
        await pageBase.switchDriverInstance(driverAdmin);
        await maxCallAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallAdmin.isCallHeld()).toBe(true, "Call is not on hold state");

        // 13. Click Transfer/Conf and Open the Address book
        maxTransfer = await maxCallAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransfer.isAddressBookDisplayed()).toBe(true, "Address book panel does not open successfully")

        // 14. Go to Other tab and click Agents -> All Agents and select filter for agents logged in
        await maxTransfer.filterAgentNameAddressBook(agent2.name);

        // VP: Displays agents that are logged in find agent 2
        expect(await maxTransfer.isAgentResultDisplayed(agent2.name)).toBe(true, "Does not agents that are logged in find agent 2");

        // 15. Select the agent 2 to transfer the call and click Transfer button	
        await maxTransfer.callAgentFromAddressBook(agent2.name);

        // VP: Submenu displays with Call and Transfer
        expect(await maxTransfer.isTransferConferenceControlsDisplayed()).toBe(true, "Submenu does not display with Transfer and Call");

        // 16. On MAX agent 2 pick up agent leg and answer the call	
        await pageBase.switchDriverInstance(driverAgent2)
        maxCallAgent2 = await maxPageAgent2.acceptInBoundCallContactTransfer();

        // VP: Phone is answered Agent 2 and patron are talking.
        expect(await maxCallAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Phone call does not display on agent 2");

        // 17. On Max agent2, click hold button	
        await maxCallAgent2.clickHoldButton();

        // VP: Patron is put on hold
        expect(await maxCallAgent2.isCallHeld()).toBe(true, "The call is not on hold");

        // 18. On Max Agent 2 Click hold button	
        await maxCallAgent2.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallAgent2.isCallResumed()).toBe(true, "The call is still on hold");

        // 19. On MAX agent 2 presses hang button on the agent console	
        maxPageAgent2 = await maxCallAgent2.endCall();

        // VP: Call is hung up with agent 2
        expect(await maxPageAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxPageAgent2.logOut();

        // 20. On Max agent 1 click hold button	
        await pageBase.switchDriverInstance(driverAdmin)
        await maxCallAdmin.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallAdmin.isCallResumed()).toBe(true, "The call is still on hold");

        // 21. On Max agent 1 press hang up button	
        maxPageAdmin = await maxCallAdmin.endCall();

        // VP: Call is ended
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxPageAdmin.logOut();

        // 22. In the toolbar of the left side press ADMIN >Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't load");

        // 23. Make sure time picker has  Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

        // 24. Look for last calls with Agent 1 and Agent 2
        agentsName = `${agent2.name}, ${admin.name}`;
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        rowAgent = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgent, SearchColumnName.AGENT_NAME);

        // VP: Both agents are listed with the same contact ID and the same number of segments(2)   
        expect(agentsName).toMatch(actualAgents, "Agents who made calls are not listed");

        // 25. Select a segment where the agent1 is displayed as first agent in the Agent Name column and click on the play icon
        player = await searchPage.playRecord(rowAgent);
        playerHandle = await pageBase.getCurrentWindowHandle();
        await pageBase.switchWindowByHandle(playerHandle);

        /**The NICE SaasS player is launch and you are able to see: * Agent Name 
         * Customer Name
         * Duration
         * Start Time
         * End Time
         */
        expect(await player.isInfoDisplayedCorrectly(agent2.name, admin.name)).toBe(true, "Player is not displayed");

        // 26. Press play button in the NICE player	
        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording
        await player.clickPlay();

        // 27. Close the player
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is not closed");

        // 28. In the segment with the agent1 is displayed as first agent in the Agent Name column click in the 3 dots icon in the right of the row	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        await searchPage.openMoreMenuOption(agentsName);

        // VP: Share, Evaluation, Calibrate and Self Assessment options are displayed
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");

        // 29. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 30. Select your QM form	
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await pageBase.switchWindowByHandle(qaFormHandle);

        // VP: The form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 31. Fill the form and click Send to Agent button	
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();

        // VP: The following message is displayed: Evaluation sent to agent
        expect(await qmFormPage.isEvaluationSentToAgentMessageDisplayed()).toBe(true, "Message is not displayed");
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // 32. In the toolbar of the left side press Search > My Zone button	
        await pageBase.switchDriverInstance(driverAgent2);

        // VP: My Schedule page is displayed
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, 'My Schedule page is not displayed');

        // 33. Click Evaluations option	
        evaluationPage2 = await mySchedulePage.gotoEvaluations();

        // VP: Evaluations page is displayed
        expect(await evaluationPage2.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        // VP: Evaluation from above steps is displayed

        // 34. Click over it with status New
        qmFormPage = await evaluationPage2.openNewestEvaluation();

        // VP: Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 35. Press Acknowledge button on the form	
        evaluationScore = await qmFormPage.getEvaluationScore();
        evaluationPage2 = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationPage2.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // 36. In the toolbar of the left side press My Zone > Search button	
        await evaluationPage2.closePlayer();
        await evaluationPage2.logOut();
        await pageBase.closeWindow();
        await pageBase.switchDriverInstance(driverAdmin);

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't display");

        // 37. Make sure time picker has  Today  selected and click search icon	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: Form is correctly submitted and you are able to see value in the Evaluation Score column of the segment selected
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", evaluationScore)).toBe(true, `Failed by ticket IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked "Send To Agent" button in Search page`);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});