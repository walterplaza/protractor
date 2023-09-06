import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchTimeRange } from "@data-objects/general/cluster";
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
 * TC ID: IC-58733
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TO31
 * Note:
 */

describe("CxOne E2E - IC-58733", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let driverAgent: number = 2;
    let driverAdmin: number = 1;
    let cluster: Cluster = TestRunInfo.cluster;
    let agentsName: string;
    let qmFormName = "QA Form";
    let callContactId: number;
    let qaFormHandle: string;
    let score: string;
    let rowAgent: number;

    // Declare page object
    let loginPageAgent: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAgent2: MaxPage;
    let maxPageAdmin: MaxPage;
    let basePage: PageBase;
    let maxCallAgent2: MaxCall;
    let maxCallAdmin: MaxCall;
    let maxTransferAdmin: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let selectQMFormPage: SelectQMFormPage;
    let qmFormPage: QMFormPage;
    let mySchedulePageAgent: MySchedulePage;
    let evaluationsPage: EvaluationsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58733 - Evolve> Inbound Call warm Transfer/ReSkill Agent 2 hangs up call (voice+screen)`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);
        basePage = new PageBase();
        agentsName = `${agent2.name}, ${admin.name}`;

    }, TestRunInfo.conditionTimeout);

    it('IC-58733 - Evolve Inbound Call warm Transfer agent 2 hangs up call voice screen', async () => {

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

        // VP: Status change to Available
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "Agent status is not change to Available")

        // 8. Place an inbound call
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // 9. Agent accepts incoming call
        maxCallAdmin = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // 10. Log in CxOne the other agent
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverAgent);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent = LoginPage.getInstance();
        mySchedulePageAgent = await loginPageAgent.loginAsAgent(agent2);

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePageAgent.isPageDisplayed()).toBe(true, " Agent 2 is cannot log in CxOne")

        // 11. Launch Max and change the status to Available
        await agent2.createPhoneNumber();
        maxPageAgent2 = await mySchedulePageAgent.launchMax();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // VP: Status Available to agent 2
        expect(await maxPageAgent2.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "Agent 2 status is not change to Available")

        // 12. Back to Max of agent1 and Click hold button
        await basePage.switchDriverInstance(driverAdmin);
        await maxCallAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallAdmin.isCallHeld()).toBe(true, "The call is not held")

        // 13. Click Transfer/Conf and Open the Address book
        maxTransferAdmin = await maxCallAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferAdmin.isAddressBookDisplayed()).toBe(true, "Address book panel doesn't open successfully");

        // 14. Go to Other tab and click Skills option
        await maxTransferAdmin.selectAddressBookTab(TransferTab.OTHER);
        await maxTransferAdmin.selectOtherItem(OtherItem.SKILLS);

        // VP: Displays a list of skills
        expect(await maxTransferAdmin.isSkillListDisplayed()).toBe(true, "List of skills is not displayed")

        // 15. Select the skill assigned to the agents from the list (IBPhoneSkillAutomation) and click Call button
        await maxTransferAdmin.selectOtherSkillItem(SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // 16. On Max of agent 2 , pick up agent leg and answer the call
        await basePage.switchDriverInstance(driverAgent);
        maxCallAgent2 = await maxPageAgent2.waitForCallWorkspace();

        // VP: Phone is answered
        expect(await maxCallAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Phone is not answered");

        // 17. On Max agent 1 click transfer button on conversation panel to transfer the call to agent 2
        await basePage.waitInSecond(5);
        await maxCallAdmin.clickTransferCall();
        await maxCallAdmin.waitForCallWorkspaceDisappear();

        // VP: Agent 2 receives transfer. First agent 1 no longer on call.
        expect(await maxCallAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Agent 1 longer on call");

        // 18. On Max agent2, click hold button
        await basePage.switchDriverInstance(driverAgent);
        await maxCallAgent2.clickHoldButton();

        // VP: Patron is put on hold. 
        expect(await maxCallAgent2.isCallHeld()).toBe(true, "Patron isn't put on hold.");

        // 19. Press Resume button.
        await maxCallAgent2.clickUnHoldButton();

        // VP: Call is resumed.
        expect(await maxCallAgent2.isCallHeld(true, TestRunInfo.shortTimeout)).toBe(false, "Patron is put on hold.");

        // 20. Agent 2 presses hang up on the console
        maxPageAgent2 = await maxCallAgent2.endCall();

        // VP: Call ended
        expect(await maxCallAgent2.isCallEnded()).toBe(true, "Call isn't ended");
        await maxPageAgent2.logOut();

        // 21. In the toolbar of the left side press ADMIN >Search button
        await basePage.switchDriverInstance(driverAdmin);
        await maxCallAdmin.logOut();
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 22. Make sure time picker has  Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 23. Look for last calls with Agent 1 and Agent 2
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
        rowAgent = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());

        // VP: Both agents are listed with the same contact ID and the same number of segments(3)
        expect(await searchPage.isAgentDisplayedInSearchTable(agentsName, callContactId.toString())).toBe(true, "Both agents aren't listed with the same contact ID and the same number of segments");

        // 24. Select a segment where the agent1 is displayed as first agent in the Agent Name column and click on the play icon
        player = await searchPage.playRecord(rowAgent);

        // VP: The NICE SaasS player is launch and you are able to see: Agent Name, Customer Name, Duration, Direction, Start Time, End Time
        expect(await player.isInfoDisplayedCorrectly(agent2.name, admin.name)).toBe(true, "Player is not displayed");

        // 25. Press play button in the NICE player
        await player.clickPlay();

        // VP: Verify you are able to hear the audio recorder in each segment and you can play recording made

        // 26. Close the player 
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is displayed.");

        // 27. In the segment with the agent1 is displayed as first agent in the Agent Name column click in the 3 dots icon in the right of the row
        await searchPage.openMoreMenuOption(agentsName);

        // VP: Evaluation and Calibration options are displayed
        expect(await searchPage.isShareOptionDisplayed()).toBe(true, "Share option is not displayed");
        expect(await searchPage.isEvaluationOptionDisplayed()).toBe(true, "Evaluation option is not displayed");
        expect(await searchPage.isCalibrateOptionDisplayed()).toBe(true, "Calibrate option is not displayed");
        expect(await searchPage.isSelfAssessmentOptionDisplayed()).toBe(true, "Self Assessment option is not displayed");

        // 28. Select Evaluation option
        selectQMFormPage = await searchPage.selectEvaluateOption();

        // VP: Select from window is displayed listing all the evaluation existent
        expect(await selectQMFormPage.isPageDisplayed()).toBe(true, "Select QM form is not displayed");

        // 29. Select your QM form (QA From)
        qmFormPage = await selectQMFormPage.selectQMForm(qmFormName);
        qaFormHandle = await BrowserWrapper.getNewWindowHandle();
        await basePage.switchWindowByHandle(qaFormHandle);

        // VP: The form is displayed
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 30. Fill the form and click Send to Agent button
        await qmFormPage.fillQAForm();
        await qmFormPage.submitQAForm();

        // VP: The following message is displayed: Evaluation sent to agent
        expect(await qmFormPage.isEvaluationSentToAgentMessageDisplayed()).toBe(true, "Message is not displayed");
        searchPage = await qmFormPage.waitForQMFormDisappear();

        // 31. In the toolbar of the left side press Search > My Zone button
        await basePage.switchDriverInstance(driverAgent);

        // VP: My Schedule page is displayed
        expect(await mySchedulePageAgent.isPageDisplayed()).toBe(true, "My Schedule page is not displayed");

        // 32. Click Evaluations option
        evaluationsPage = await mySchedulePageAgent.gotoEvaluations();

        // VP: My evaluations is displayed; Evaluation from above steps is displayed
        expect(await evaluationsPage.isPageDisplayed()).toBe(true, "Evaluations page is not displayed");

        // 33. Click over it with status New
        qmFormPage = await evaluationsPage.openNewestEvaluation();
        score = await qmFormPage.getEvaluationScore();

        // VP:  Nice player is displayed and capture is reproducible automatically; Form evaluation is displayed with option selected in above steps.
        expect(await qmFormPage.isPageDisplayed()).toBe(true, "QM Form page is not display");

        // 34. Press Acknowledge button on the form
        evaluationsPage = await qmFormPage.clickAcknowledge();

        // VP: Evaluation form is closed; Evaluation record is displayed as completed in Status column
        expect(await qmFormPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Evaluations page is displayed");
        expect(await evaluationsPage.getStatusNewestEvaluation()).toBe("Completed", "The status is not changed");

        // 35. In the toolbar of the left side press My Zone > Search button
        await evaluationsPage.closePlayer();
        await evaluationsPage.logOut();
        await basePage.closeWindow();
        await basePage.switchDriverInstance(driverAdmin);

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 36. Make sure time picker has Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: Form is correctly submitted and you are able to see value in the Evaluation Score column
        expect(await searchPage.isEvaluationScoreDisplayed(agentsName, "", score)).toBe(true, "Failed by bug IC-29653: [TestAutomation][CxOne-UI] No value displays in Evaluation Score column after filled the QM form with correct answers and clicked 'Send To Agent' button in Search page. The evaluation score is not displayed");

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