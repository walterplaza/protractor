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
 * TC ID: IC-58726
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO31
 * Note:
 */

describe("CXone E2E - IC-58726", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);

    // Declare variables
    let cluster: Cluster = TestRunInfo.cluster;
    TestRunInfo.testTimeout = 2400000;
    let admin: Agent;
    let agent2: Agent;
    let qmFormName = "QA Form";
    let evaluationScore: string;
    let rowIndex: number;
    let driverAdmin: number = 1;
    let driverAgent2: number = 2;
    let callContactId: string;
    let expectedAgents: string;
    let qaFormHandle: string;
    let actualAgents: string;

    // Declare page object
    let pageBase = new PageBase();
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAgent2: MaxPage;
    let maxPageAdmin: MaxPage;
    let maxCallPageAdmin: MaxCall;
    let maxCallPageAgent2: MaxCall;
    let maxTransferAdmin: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let formManagerPage: FormManagerPage;
    let selectQMFormPage: SelectQMFormPage;
    let mySchedulePage: MySchedulePage;
    let evaluationsPage: EvaluationsPage;
    let qmFormPage: QMFormPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58726 - CxOne> Outbound call cold Transfer agent 2 ends contact (voice + screen)`)
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);

        // Pre-Condition
        loginPageAdmin = LoginPage.getInstance();
        employeesPageAdmin = await loginPageAdmin.loginAsAdmin(admin);
        formManagerPage = await employeesPageAdmin.gotoQM();
        await formManagerPage.createDefaultQMForm();
        await formManagerPage.gotoEmployeesPage();
        loginPageAdmin = await formManagerPage.logOut();
    }, TestRunInfo.conditionTimeout);

    it('IC-58726 - CxOne Outbound call Cold Transfer agent 2 ends contact voice + screen', async () => {

        // VP: Sign In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Sign In page is not displayed with User name text box");

        // 2. Log in CxOne test environment with valid credentials. And click Next button	
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();
        await loginPageAdmin.waitForSpinner();

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

        // 7. Place an outbound call by clicking Next button in the bottom of MAX agent 1
        // 8. Type the number in the phone field you want to call
        // 9. Click Call button to dial the call
        await maxPageAdmin.callPhoneNumber(admin, cluster.e2eOutboundNumber, SkillType.OB_PHONE);
        maxCallPageAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.OB_PHONE));

        // VP: Agent phone rings. Incoming call is displayed in MAX
        expect(await maxPageAdmin.isCallAccepted()).toBe(true, "Incoming call is not displayed");

        // 10. Log in CxOne the other agent
        await pageBase.createDriverInstance();
        await pageBase.switchDriverInstance(driverAgent2);
        await pageBase.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent2 = LoginPage.getInstance();
        mySchedulePage = await loginPageAgent2.loginAsAgent(agent2);

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent 2 is not log in CxOne");

        // 11. Launch Max and change the status to Available
        maxPageAgent2 = await mySchedulePage.launchMax();
        await agent2.createPhoneNumber();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // VP: Status Available to agent 2
        expect(await maxPageAgent2.getAgentStatus()).toMatch(MaxState.AVAILABLE.toLocaleUpperCase(), "Agent 2 does not change status to available");

        // 12. Back to Max of agent1 and Click hold button
        await pageBase.switchDriverInstance(driverAdmin);
        await maxCallPageAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallPageAdmin.isCallHeld()).toBe(true, "The call is not held");

        // 13. Click Transfer/Conf and Open the Address book
        maxTransferAdmin = await maxCallPageAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferAdmin.isAddressBookDisplayed()).toBe(true, "Address book panel doesn't open successfully");

        // 14. Go to Other tab and click agents -> All Agents and select filter for agents logged in
        await maxTransferAdmin.openMyTabAddressBook();
        await maxTransferAdmin.filterAgentNameAddressBook(agent2.name);

        // VP: Displays agents that are logged in find agent2
        expect(await maxTransferAdmin.isAgentResultDisplayed(agent2.name)).toBe(true, "The agent isn't logged in");

        // 15. Select the agent 2 to transfer the call and click Transfer button
        await maxTransferAdmin.transferCallToAgentFromAddressBook(agent2.name);

        // VP: Sub menu displays with Call and Transfer
        expect(await maxTransferAdmin.isTransferConferenceControlsDisplayed()).toBe(true, "Submenu does not display with Transfer and Call");

        // VP: Agent placed in Outbound state, call made to selected agent

        // 16. On MAX agent 2 pick up agent leg and answer the call	
        await pageBase.switchDriverInstance(driverAgent2);
        maxCallPageAgent2 = await maxPageAgent2.waitForCallWorkspace();

        // VP: Phone is answered Agent 2 and patron are talking.
        expect(await maxCallPageAgent2.isCallAccepted()).toBe(true, "Agents aren't connected")

        // 17. On Max agent2, click hold button	
        await maxCallPageAgent2.clickHoldButton();

        // VP: Patron is put on hold
        expect(await maxCallPageAgent2.isCallHeld()).toBe(true, "The call is not on hold");

        // 18. On Max Agent 2 Click hold button	
        await maxCallPageAgent2.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallPageAgent2.isCallResumed()).toBe(true, "The call is still on hold");

        // 19. On Max Agent 2 presses hang up	
        await maxCallPageAgent2.endCall();
        await maxCallPageAgent2.logOut();

        // VP: Call is hung up with agent 2
        expect(await maxPageAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");

        // 20. On MAX agent 1 click hold button	
        await pageBase.switchDriverInstance(driverAdmin);
        await maxCallPageAdmin.clickUnHoldButton();

        // VP: Call is resumed
        expect(await maxCallPageAdmin.isCallResumed()).toBe(true, "The call is still on hold");

        // 21. On MAX agent 1 Press hang up button	
        await maxCallPageAdmin.endCall();

        // VP: Call is ended
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxCallPageAdmin.logOut();

        // 22. In the toolbar of the left side press ADMIN >Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't display");

        // 23. Make sure time picker has  Today  selected and click search icon	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

        // 24. Look for last calls with Agent 1 and Agent 2	
        expectedAgents = `${agent2.name}, ${admin.name}`;
        rowIndex = await searchPage.getAgentRecordIndexByContactID(expectedAgents, callContactId);
        actualAgents = await searchPage.getSearchResult(rowIndex, SearchColumnName.AGENT_NAME);

        // VP: Both agents are listed with the same contact ID and the same number of segments(2)
        expect(expectedAgents).toMatch(actualAgents, "Agents who made calls are not listed");

        // 25. Select a segment where the agent1 is displayed as first agent in the Agent Name column and click on the play icon	
        player = await searchPage.playRecord(rowIndex);

        // VP: The NICE SaasS player is launch and you are able to see:
        // Agent Name
        // Customer Name
        // Duration
        // Start Time
        // End Time
        expect(await player.isInfoDisplayedCorrectly(agent2.name, admin.name)).toBe(true, "Player is not displayed");

        // 26. Press play button in the NICE player	
        // VP: Verify you are able to hear the audio recorder in each segment and also you are able to reproduce the screen recording
        // 27. Close the player	
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is not closed");

        // 28. In the segment with the agent1 is displayed as first agent in the Agent Name column click in the 3 dots icon in the right of the row	
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        await searchPage.openMoreMenuOption(actualAgents);

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
        expect(await searchPage.isEvaluationScoreDisplayed(expectedAgents, "", evaluationScore)).toBe(true, `Failed by ticket IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked "Send To Agent" button in Search page`);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout CxOne employee page from agent admin
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});