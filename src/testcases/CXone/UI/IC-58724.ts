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
 * TC ID: IC-58724
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe("CXone E2E - IC-58724", function () {
    let cluster: Cluster = TestRunInfo.cluster;
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let driverAgent: number = 2;
    let driverAdmin: number = 1;
    let expectedAgents: string;
    let agentsName: string;
    let evaluationScore: string;
    let qaFormHandle: string;
    let callContactId: number;
    let qmFormName = "QA Form";
    let rowAgentName: number;

    // Declare page object
    let pageBase = new PageBase();
    let loginPageAgent1: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent: MaxPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let maxCallPageAgent: MaxCall;
    let maxCallPageAdmin: MaxCall;
    let qmFormPage: QMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let searchPage: SearchPage;
    let maxTransferPage: MaxTransfer;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58724 - Evolve> Outbound call Conference Agent 2 hangs up (voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);

        // Pre-Condition
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        formManagerPage = await employeesPageAdmin.gotoQM();
        await formManagerPage.createDefaultQMForm();
        await formManagerPage.gotoEmployeesPage();
        loginPageAdmin = await formManagerPage.logOut();
    }, TestRunInfo.conditionTimeout);

    it('IC-58724 - Evolve Outbound call Conference Agent 2 hangs up (voice+screen)', async () => {

        // VP: Sign In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. 
        // And click Next button
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();
        await loginPageAdmin.waitForSpinner();

        // VP: 	User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value not editable is not displayed");
        expect(await loginPageAdmin.isEnterPasswordControlsDisplayed()).toBe(true, "Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom are not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
        // Click Sign In button
        await loginPageAdmin.enterPassword(admin);
        employeesPageAdmin = await loginPageAdmin.clickSignInButton();

        // 4. Click in the square icon next to NICE inConcant brand and select LAUNCH MAX
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

        // 7. Place an outbound call by clicking Next button in the bottom of MAX agent 1
        // 8. Type the number in the phone field you want to call
        // 9. Click Call button to dial the call
        await maxPageAdmin.callPhoneNumber(admin, cluster.e2eOutboundNumber, SkillType.OB_PHONE);
        maxCallPageAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // VP: Agent phone rings. Incoming call is displayed in MAX
        expect(await maxCallPageAdmin.isCallAccepted()).toBe(true, "Incoming call is not displayed");

        // 10. Log in CxOne the other agent
        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent1 = LoginPage.getInstance();
        mySchedulePage = await loginPageAgent1.loginAsAgent(agent1);

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent 2 is not log in CxOne");

        // 11. Launch Max and change the status to Available
        maxPageAgent = await mySchedulePage.launchMax();
        await agent1.createPhoneNumber();
        await maxPageAgent.enterLaunchForm(MaxConnectOption.PHONE, agent1.phoneNumber, false);
        await maxPageAgent.connectMax();
        await maxPageAgent.changeState(MaxState.AVAILABLE);

        // VP: Status Available to agent 2
        expect(await maxPageAgent.getAgentStatus()).toMatch(MaxState.AVAILABLE.toLocaleUpperCase(), "Agent 2 does not change status to available");

        // 12. Back to Max of agent1 and Click hold button
        await pageBase.switchDriverInstance(driverAdmin);
        await maxCallPageAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallPageAdmin.isCallHeld()).toBe(true, "The call is not held");

        // 13. Click Transfer/Conf and Open the Address book
        maxTransferPage = await maxCallPageAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferPage.isAddressBookDisplayed()).toBe(true, "Address book panel doesn't open successfully");

        // 14. Go to Other tab and click agents -> All Agents and select filter for agents logged in
        await maxTransferPage.openMyTabAddressBook();
        await maxTransferPage.filterAgentNameAddressBook(agent1.name);

        // VP: Displays agents that are logged in find agent2
        expect(await maxTransferPage.isAgentResultDisplayed(agent1.name)).toBe(true, "The agent isn't logged in");

        // 15. Click Call button to call to agent 2  (Agent User)  you would like to conference	
        await maxTransferPage.callAgentFromAddressBook(agent1.name);

        // VP: Submenu displays with Transfer and Conference
        expect(await maxTransferPage.isTransferConferenceControlsDisplayed()).toBe(true, "Submenu does not display with Transfer and Conference");

        // 16. On Max of agent 2 , pick up agent leg and click the 'Accept' button
        await pageBase.switchDriverInstance(driverAgent);
        maxCallPageAgent = await maxPageAgent.acceptInBoundCallContactTransfer();

        // VP: Agents are connected
        expect(await maxCallPageAgent.isCallAccepted()).toBe(true, "Agents aren't connected")

        // 17. On Max agent1 select conference button
        await pageBase.switchDriverInstance(driverAdmin);
        await maxCallPageAdmin.clickConferenceWithAgent(agent1.name);

        // VP: The contact is now conference
        expect(await maxCallPageAdmin.isConferenceButtonDisappeared(agent1.name)).toBe(true, "The contact is not in conferences");

        // 18. On Max agent2, click hold button	
        await pageBase.switchDriverInstance(driverAgent);
        await maxCallPageAgent.clickHoldButton();

        // VP: Patron is put on hold
        expect(await maxCallPageAgent.isCallHeld()).toBe(true, "The call is not on hold");

        // 19. Click hold button
        await maxCallPageAgent.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallPageAgent.isCallResumed()).toBe(true, "The call is still on hold");

        // 20. Agent 2 presses hang up on the agent console	
        maxPageAgent = await maxCallPageAgent.endCall();
        await maxPageAgent.logOut();

        // VP: Agent 2 is removed from the conference, agent1 and patron can still talk
        await pageBase.switchDriverInstance(driverAdmin);
        expect(await maxCallPageAdmin.checkMainCallActive(agent1.name, TestRunInfo.shortTimeout)).toBe(false, "Agent2 is not removed from the conference");
        expect(await maxCallPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Agent1 and patron cannot still talk");

        // 21. Agent 1 presses hang up on the agent console	
        maxPageAdmin = await maxCallPageAdmin.endCall();

        // VP: Call is hung up
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxPageAdmin.logOut();

        // 22. In the toolbar of the left side press ADMIN >Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't display");

        // 23. Make sure time picker has  Today  selected and click search icon	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

        // 24. Look for last calls with Agent 1 and Agent 2	
        expectedAgents = `${agent1.name}, ${admin.name}`;
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(expectedAgents, callContactId.toString());
        agentsName = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: Both agents are listed with the same contact ID and the same number of segments(4)
        expect(expectedAgents).toMatch(agentsName, "Agents who made calls are not listed");

        // 25. Select a segment where the agent1 is displayed as first agent in the Agent Name column and click on the play icon	
        player = await searchPage.playRecord(rowAgentName);

        // VP: The NICE SaasS player is launch and you are able to see: * Agent Name
        // Customer Name
        // Duration
        // Start Time
        // End Time
        expect(await player.isInfoDisplayedCorrectly(agent1.name, admin.name)).toBe(true, "Player is not displayed");

        // 26. Press play button in the NICE player	
        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording
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

        // 30. Select your QM form  (QA From)	
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
        await pageBase.switchDriverInstance(driverAgent);

        // VP: My Schedule page is displayed
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, 'My Schedule page is not displayed');

        // 33. Click Evaluations option	
        evaluationsPage = await mySchedulePage.gotoEvaluations();

        // VP: Evaluations page is displayed, Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        // 34. Click over it with status New
        qmFormPage = await evaluationsPage.openNewestEvaluation();

        // VP: Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 35. Press Acknowledge button on the form	
        evaluationScore = await qmFormPage.getEvaluationScore();
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationsPage.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // 36. In the toolbar of the left side press My Zone > Search button	
        await evaluationsPage.closePlayer();
        await evaluationsPage.logOut();
        await pageBase.closeWindow();
        await pageBase.switchDriverInstance(driverAdmin);

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't display");

        // 37. Make sure time picker has  Today  selected and click search icon	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: Form is correctly submitted and you are able to see value in the Evaluation Score column of the segment selected
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", evaluationScore)).toBe(true, "The evaluation score is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            //Final
            await searchPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});