import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import MyDashBoards from "@page-objects/CXone/dashboard/my-dashboard-page";
import QMSupervisor from "@page-objects/CXone/dashboard/qm-supervisor-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";

/** 
 * Type: CxOne E2E
 * Suite: CxOne E2E
 * TC ID: IC-58575 (413301)
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CxOne E2E - IC-58575', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    let expectedAgents: string;
    let callContactId: number;
    let driverAgent2: number = 2;
    let driverAgent1: number = 1;
    let cluster: Cluster = TestRunInfo.cluster;
    let actualAgents: string;
    let segmentIndex: number;
    TestRunInfo.testTimeout = 600000;
    let agentsName: string;
    let rowAgentName: number;

    // Declare page object
    let loginPageAgent2: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAgent2: EmployeesPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent2: MaxPage;
    let pageBase = new PageBase();
    let maxCallAdmin: MaxCall;
    let maxCallAgent2: MaxCall;
    let maxTransferAdmin: MaxTransfer;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let myDashboard: MyDashBoards;
    let qmSupervisor: QMSupervisor;
    let mySchedulePage: MySchedulePage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58575 - Evolve > Basic Supervisor Flow Testing`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT2);
        agentsName = `${agent2.name}, ${admin.name}`

    }, TestRunInfo.conditionTimeout);

    it('IC-58575 - Evolve Basic Supervisor Flow Testing', async () => {
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

        // 8. Place an inbound call to POC (4001570109) using Lab phone Agent should see incoming call
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // VP: Incoming call is displayed in MAX Agent 1
        // 9. Agent 1 accepts incoming call	
        // VP: Agent 1 can hear customer on other end, and customer can hear agent on other end.
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
        expect(await maxPageAgent2.getAgentStatus()).toBe(MaxState.AVAILABLE.toLocaleUpperCase(), "Agent 2 does not change status to available");

        // 12. Back to Max of agent1 and Click hold button
        await pageBase.switchDriverInstance(driverAgent1);
        await maxCallAdmin.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCallAdmin.isCallHeld()).toBe(true, "Call is not on hold state");

        // 13. Click Transfer/Conf and Open the Address book
        maxTransferAdmin = await maxCallAdmin.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransferAdmin.isAddressBookDisplayed()).toBe(true, "Address book panel does not open successfully")

        // 14. Go to Other tab and click Agents -> All Agents and select filter for agents logged in
        await maxTransferAdmin.filterAgentNameAddressBook(agent2.name);

        // VP: Displays agents that are logged in find agent 2
        expect(await maxTransferAdmin.isAgentResultDisplayed(agent2.name)).toBe(true, "Does not agents that are logged in find agent 2");

        // 15. Click Call button to call to agent 2  (Agent User)  you would like to conference.
        await maxTransferAdmin.callAgentFromAddressBook(agent2.name);

        // VP: Submenu displays with Transfer and Conference
        expect(await maxTransferAdmin.isTransferConferenceControlsDisplayed()).toBe(true, "Submenu does not display with Transfer and Conference");

        // 16. On Max of agent 2 , pick up agent leg and click the 'Accept' button
        await pageBase.switchDriverInstance(driverAgent2);
        maxCallAgent2 = await maxPageAgent2.acceptInBoundCallContactTransfer();

        // VP: Agents are connected
        expect(await maxPageAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Phone call does not display on agent 2");

        // 17. On Max agent1 select conference button
        await pageBase.switchDriverInstance(driverAgent1);
        await maxCallAdmin.clickConferenceWithAgent(agent2.name);

        // VP: The contact is now conference
        expect(await maxCallAdmin.isConferenceButtonDisappeared(agent2.name)).toBe(true, "The contact is not in conferences");

        // 18. Agent 2 presses hang up on the agent console
        pageBase.switchDriverInstance(driverAgent2)
        maxPageAgent2 = await maxCallAgent2.endCall();
        await maxPageAgent2.logOut();
        await mySchedulePage.logOut();
        await pageBase.closeWindow();

        // VP: Agent 2 is removed from the conference, agent1 and patron can still talk
        await pageBase.switchDriverInstance(driverAgent1);
        expect(await maxCallAdmin.checkMainCallActive(agent2.name, TestRunInfo.shortTimeout)).toBe(false, "Agent2 is not removed from the conference");
        expect(await maxCallAdmin.isCallSessionDisplayed(callContactId.toString())).toBe(true, "Agent 1 no longer in inbound phone call");

        // 19. Agent 1 presses hang up on the agent console
        await maxCallAdmin.endCall();

        // VP: Call is hung up
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Call is not hung up");
        await maxPageAdmin.logOut();

        // 20. In the toolbar of the left side press ADMIN >Search button
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't load");

        // 21. Make sure time picker has  Today  selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

        // 22. Look for last calls with Agent 1 and Agent 2
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: Both agents are listed with the same contact ID and the same number of segments(4)
        expect(actualAgents).toMatch(`${agent2.name}, ${admin.name}`, "Agents who made calls are not listed");

        // 23. Select a segment where the agent1 is displayed as first agent in the Agent Name column and click on the play icon
        player = await searchPage.playRecord(rowAgentName);

        /**The NICE SaasS player is launch and you are able to see: * Agent Name 
         * Customer Name
         * Duration
         * Start Time
         * End Time
         */
        expect(await player.isInfoDisplayedCorrectly(admin.name, agent2.name)).toBe(true, "Player is not displayed");

        // 24. Press play button in the NICE player
        // VP: Verify you are able to hear the audio recorder in the segment
        // Close player
        await player.close();

        // 25. In the toolbar of the left side press Search > Dashboard button 
        myDashboard = await searchPage.gotoMyDashboardsPage();

        // VP: My Dashboard page loads
        expect(await myDashboard.isPageDisplayed()).toBe(true, "My dashboard isn't displayed");

        // 26. Go to Predefined Dashboards and expand Predefined Dashboard submenu
        await myDashboard.expandPredefinedDashboard();

        // VP: QM Supervisor is listed
        expect(await myDashboard.isQMSupervisorMenuDisplayed()).toBe(true, "Supervisor left menu isn't displayed");

        // 27. Select QM Supervisor
        qmSupervisor = await myDashboard.gotoQMSupervisor();

        //VP: The default Dashboard is displayed with the following widgets: Plant Status, Team PErformance, Agent Scoring, Calibration, Performance Trend
        expect(await qmSupervisor.isBoxWidgetDisplayed("Calibration")).toBe(true, "Calibration widget isn't displayed");
        expect(await qmSupervisor.isBoxWidgetDisplayed("Plan Status")).toBe(true, "Plan Status widget isn't displayed");
        expect(await qmSupervisor.isBoxWidgetDisplayed("Team Performance")).toBe(true, "Team Performance widget isn't displayed");
        expect(await qmSupervisor.isBoxWidgetDisplayed("Agent Scoring")).toBe(true, "Agent Scoring widget isn't displayed");
        expect(await qmSupervisor.isBoxWidgetDisplayed("Performance Trend")).toBe(true, "Performance Trend widget isn't displayed");

        // 28. In the 'Agent Scoring' widget the administrator compares agent's rate with the rest of the team according to information displayed on widget
        // VP: Information about agent's rate and the rest of the team is available on widget for the Administrator
        expect(await qmSupervisor.isAgentScoringInformationDisplayed()).toBe(true, "High rated scored is not descending");

        // 29. Administrator identifies agent that belong to the Low Rated group
        // VP: Information related to agent with low rated is available on widget for the Supervisor
        expect(await qmSupervisor.isAgentDisplayedInLowRateGroup()).toBe(true, "Information related to agent with low rated is not available on widget for the Supervisor");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await qmSupervisor.logOut();
        } catch (err) { }
        finally {
            try {
                await pageBase.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});