import { SchedulingUnit } from "@data-objects/CXone/admin/scheduling-unit";
import { Forecast } from "@data-objects/CXone/wfm/forecasting/forecast";
import { Schedule, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxDispositionPage from "@page-objects/CXone/max/max-disposition";
import MaxPage from "@page-objects/CXone/max/max-page";
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import ScheduleManager from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import BiddingManagerPage from "@page-objects/CXone/wfm/scheduling/bidding-manager-page";
import GenerateScheduleManager from "@page-objects/CXone/wfm/scheduling/generate-schedule";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

describe("CxOne E2E - IC-65914", function () {

    TestRunInfo.testTimeout = 1600000;
    let cluster: Cluster = TestRunInfo.cluster;
    let admin: Agent;
    let agent1: Agent;
    let agent2: Agent;
    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let forecastName = Forecast.generateForecasterName();
    let scheduleUnit: string = SchedulingUnit.generateSchedulingUnitName();
    let schedule = new Schedule().initData(scheduleUnit, StaffingPlan.AUTOMATIC_PLANNING, forecastName);
    let schedule1 = new Schedule().initData(scheduleUnit, StaffingPlan.AUTOMATIC_PLANNING, forecastName);
    let timeGenerated: number = 240;
    let driverAgent1: number = 2;
    let driverAdmin: number = 1;
    let actualAgents: string;
    let rowAgentName: number;
    let agentsName: string;

    let basePage: PageBase;
    let loginPageAgent2: LoginPage;
    let mySchedulePage: MySchedulePage;
    let maxPageAgent2: MaxPage;
    let maxPageHandle2: string;
    let loginPageAdmin: LoginPage;
    let employeesPage: EmployeesPage;
    let homeWindowHandle: string;
    let wfmPage: WFMMenu;
    let scheduleManagerPage: ScheduleManager
    let generateSchedulePage: GenerateScheduleManager;
    let maxPageAdmin: MaxPage;
    let maxPageHandle: string;
    let callContactId: number;
    let maxCall: MaxCall;
    let maxCallPage2: MaxCall;
    let maxDispositionPage: MaxDispositionPage;
    let bidManagerPage: BiddingManagerPage;
    let maxWFOPanelAgent3: MAXWFOPanel;
    let searchPage: SearchPage;
    let player: InteractionPlayer;

    // Preconditions:
    // 1. Access to CXOne
    // 2. IB Phone skill assigned to agents and with a disposition
    // 3. Have POC to perform the inbound call
    // 4. Have the screen recording configured on your machine.
    // 5. A daily rule created (LG Daily Rule-already set) you can find it WFM->Setup->Daily Rules
    // 6. A weekly rule created( LG Weekly Rule - already set) you can find it WFM->Setup->Weekly Rules
    // 7. A Bidding Template already created Automation Bidding, you can find it WFM->Setup->Bidding Template
    // 8. A Historical Data file uploaded (targetfileTO31.csv) you can find it WFM-> Forecasting->ACD Historical Data
    // 9. A Scheduling unit created: perm_automation2_to31( already set) you can find it Admin->Scheduling Unit

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-65914 - CxOne Agent Flow Testing`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agent2 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT3);

        //Pre-Condition:
        basePage = new PageBase();
        await basePage.createDriverInstance();

    }, TestRunInfo.conditionTimeout);

    it('IC-65914 - CxOne Agent Flow Testing', async () => {

        // 2. Log in CxOne test environment https://na1.test.nice-incontact.com/login/#/with valid credentials. 
        // Username: admin.automation@TO31.com. And click Next button
        await basePage.switchDriverInstance(driverAdmin);
        loginPageAdmin = LoginPage.getInstance();

        // VP: Sign In page is displayed with User name text box
        expect(await loginPageAdmin.isPageDisplayed()).toBe(true, "Sign in page is not displayed");
        expect(await loginPageAdmin.isUserNameTextBoxDisplayed()).toBe(true, "User name text box is not displayed");

        // 3. In the Sign In page you could see user name entered in step 1 
        // and in the Password text box enter: Password: Password1 click Sign In button
        // Enter user name and click next button
        await loginPageAdmin.enterUsername(admin);
        await loginPageAdmin.clickNextButton();

        // VP: User name value not editable is displayed, Password text box, Back and Sign In buttons , Forgot your password link at the bottom
        expect(await loginPageAdmin.getUsernameText()).toBe(admin.email, "User name value is not entered");
        expect(await loginPageAdmin.isUsernameDisplayed()).toBe(true, "User name is editable");

        // VP: Password text box is editable
        expect(await loginPageAdmin.isPasswordTextBoxEditable()).toBe(true, "Password is not editable");

        // VP: Back and Sign in button is displayed
        expect(await loginPageAdmin.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
        expect(await loginPageAdmin.isSignInButtonDisplayed()).toBe(true, "Sign in button is not displayed");

        // VP: Forgot password link is displayed
        expect(await loginPageAdmin.isForgotPasswordDisplayed()).toBe(true, "Forgot password link is not displayed");

        // Enter password
        await loginPageAdmin.enterPassword(admin);

        // Click sign in button and go to Employees page
        employeesPage = await loginPageAdmin.clickSignInButton();
        homeWindowHandle = await BrowserWrapper.getNewWindowHandle();

        // 4. Click the top navigation icon and then click the WFM icon
        wfmPage = await employeesPage.gotoWFMPage();
        scheduleManagerPage = await wfmPage.gotoScheduleManager();

        // VP: Scheduler Manager page is displayed
        expect(await scheduleManagerPage.isPageDisplayed()).toBe(true, "Schedule Manger page is not displayed");

        // 5. Go to Scheduling -> Generate Schedule option 
        // In the Automatic Schedule Generator page click Generate New Schedules button
        generateSchedulePage = await scheduleManagerPage.gotoGenerateSchedulePage();
        await generateSchedulePage.openGenerateNewScheduleForm();

        // VP: Generate New Schedules wizard is displayed
        expect(await generateSchedulePage.isGenerateNewScheduleFormDisplayed()).toBe(true, "Generate New Schedules wizard isn't displayed");

        // 6. In the Scheduling Units field select:default
        // In Start field select 2W In the Staffing Plan section select Automatic Planning (Generated Forecast)
        // Make sure planing is selected
        // Click Generate button
        await generateSchedulePage.fillGenerateNewScheduleForm(schedule);
        await generateSchedulePage.clickGenerateButton();

        // VP: A message is displayed:
        // Attention!
        // Some of the dates you have selected already have schedules. This job will overwrite those schedules and will automatically publish the updated schedules to the employee if their schedules were previously published.
        // Two buttons at the bottom: Cancel and generate Anyway
        expect(await generateSchedulePage.isAttentionPopUpDisPlayed()).toBe(true, "Attended Popup isn't displayed");

        // 7. Click on Generate Anyway button in the message displayed, and wait at least 3 minutes
        await generateSchedulePage.clickGenerateAnyButton();

        // VP: Automatic Schedule Generator page is displayed with the new Schedule generated listed, Status must be Succeeded
        await generateSchedulePage.waitForScheduleGenerate(schedule, TestRunInfo.timeout * 5);
        expect(await generateSchedulePage.isScheduleGenerateSucceed(schedule)).toBe(true, "Automatic Schedule Generator page is not displayed with the new Schedule generated listed, Status must be Succeeded");

        // 8. Click in the square icon next to NICE inContact brand and select LAUNCH MAX
        maxPageAdmin = await employeesPage.launchMax();
        maxPageHandle = await basePage.getCurrentWindowHandle();

        // 9. make sure "Set Phone Number" is selected and enter a correct phone number in the Phone Number text box
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);

        // VP: Phone number text box is filled correctly
        expect(await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE)).toBe(admin.phoneNumber, "Entered Phone number is not correct")

        // 10. click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "MAX agent is not connected and Agent status is not Unavailable")

        // 11. Change the MAX agent status by clicking down arrow next to the status name from Unavailable to Available
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // VP: Status change to Available
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "MAX agent is not connected and Agent status is not Unavailable")

        // 12. Place an inbound call to POC using Lab phone Agent should see incoming call
        await agent1.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone, true));
        maxCall = await maxPageAdmin.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone, true))

        // VP: Incoming call is displayed in MAX Agent 1
        expect(await maxCall.isCallAccepted()).toBe(true, "Incoming call is not displayed");

        // 13. Agent 1 accepts incoming call
        // VP: Agent 1 can hear customer on other end, and customer can hear agent on other end.
        // Call automatically route to agent

        // 14. Log in CxOne the other agent
        await basePage.switchDriverInstance(driverAgent1);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent2 = LoginPage.getInstance();
        mySchedulePage = await loginPageAgent2.loginAsAgent(agent2);

        // VP: Agent bid is log in CxOne
        expect(await mySchedulePage.isPageDisplayed()).toBe(true, "Agent bid is not log in CxOne");

        // 15. Launch Max and change the status to Available
        // Launch Max Agent 2:
        maxPageAgent2 = await mySchedulePage.launchMax();
        maxPageHandle2 = await BrowserWrapper.getNewWindowHandle();
        await agent2.createPhoneNumber();
        await maxPageAgent2.enterLaunchForm(MaxConnectOption.PHONE, agent2.phoneNumber, false);
        await maxPageAgent2.connectMax();
        await maxPageAgent2.changeState(MaxState.AVAILABLE);

        // VP: Status Available to Agent bid
        expect(await maxPageAgent2.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "Agent status doesn't change to Available");

        // 16. On Agent 1 put call on hold  
        await basePage.switchDriverInstance(driverAdmin);
        await basePage.switchWindowByHandle(maxPageHandle);
        await maxCall.clickHoldButton();

        // VP: Call is on hold state
        expect(await maxCall.isCallHeld()).toBe(true, "Call isn't on hold state");

        // 17. Click the Transfer/Conf and the Open the Address book
        let maxTransfer: MaxTransfer = await maxCall.clickTransferConferenceButton();

        // VP: Address book panel opens successfully
        expect(await maxTransfer.isAddressBookDisplayed()).toBe(true, "Address book panel doesn't open successfully")

        // 18. Go to Main tab and click agents -> All Agents and select filter for agents logged in
        await maxTransfer.openMyTabAddressBook();
        await maxTransfer.filterAgentNameAddressBook(agent2.name)

        // VP: Displays agents that are logged in
        expect(await maxTransfer.isAgentResultDisplayed(agent2.name)).toBe(true, "the agent isn't logged in");

        // 19. click Call button to call the agent (Autom Agent3) you would like to conference
        await maxTransfer.callAgentFromAddressBook(agent2.name);

        // VP: Submenu displays with Consult and Initiate Transfer
        await maxTransfer.isConsultAndInitiateTransferSubmenuDisplayed(agent2.name, TestRunInfo.middleTimeout);

        // 20. On Agent bid, pick up agent leg and click the 'Accept' button
        await basePage.switchDriverInstance(driverAgent1)
        maxCallPage2 = await maxPageAgent2.acceptInBoundCallContactTransfer();

        // VP: Agents are connected
        expect(await maxCallPage2.isCallAccepted()).toBe(true, "Agents aren't connected")

        // 21. On Agent 1 Click Conference button
        await basePage.switchDriverInstance(driverAdmin)
        await basePage.switchWindowByHandle(maxPageHandle)
        await maxCall.clickConferenceWithAgent(agent2.name);

        // VP: The contact is now conferences
        expect(await maxCall.isConferenceButtonDisappeared(agent2.name)).toBe(true, "The contact is not in conferences");

        // 22. Agent 1 presses the hang up button twice.
        // End the call"
        await basePage.switchDriverInstance(driverAgent1)
        await basePage.switchWindowByHandle(maxPageHandle2);
        maxPageAgent2 = await maxCallPage2.endCall();

        // VP: Call is ended
        await maxPageAgent2.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.middleTimeout);

        // End Call agent 1
        await basePage.switchDriverInstance(driverAdmin)
        await basePage.switchWindowByHandle(maxPageHandle);
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();

        // 23. Verify after the call is ended disposition is displayed on MAX Agent 1
        // VP: Disposition is displayed on MAX agent 1
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition isn't displayed on MAX agent")

        // 24. Select the custom disposition and save
        await maxDispositionPage.fillDispositionForm(DispositionName.TEST_LGVN);

        // VP: Custom Disposition selected
        expect(await maxDispositionPage.isDispositionSelected(DispositionName.TEST_LGVN)).toBe(true, "Custom Disposition isn't selected");
        await maxDispositionPage.saveAndCloseDisposition();

        // 25. Click on WFO Menu -> Open WFO from at the bottom of the Max Agent 1
        await maxPageAdmin.clickWFO();

        // VP: 'My Schedule' pane is displayed 
        expect(await maxPageAdmin.isWFOTabDisplayed()).toBe(true, "'My Schedule' pane isn't displayed ");

        // 26. Verify that on My Schedule tab you can see the Schedule setup on Evolve
        // VP: Agent's schedule is correctly displayed in MAX
        expect(await maxPageAdmin.isScheduleListDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Agent's schedule isn't correctly displayed in MAX");

        // 27. Go to WFM -> Scheduling -> Bidding Manager
        await maxPageAdmin.closePopover();
        await maxPageAdmin.logOut();
        wfmPage = await generateSchedulePage.gotoWFMPage()
        bidManagerPage = await wfmPage.gotoBiddingManagerPage();

        // VP: Bidding Manager page is displayed
        expect(await bidManagerPage.isPageDisplayed()).toBe(true, "Bidding Manager page isn't displayed");

        // 28. Click on Generate new big button for the bidding template you created on the prerequisites
        // Scheduling Unit: Default
        // Start: leave the time picked by default 
        // Select Automatic Planning
        // Click Generate button
        // Click on Generate Anyway button in the message displayed,
        // Wait 3 minutes
        await bidManagerPage.openGenerateNewBidForm();
        await bidManagerPage.generateNewBid(schedule1);

        // VP: Bid is generated
        await bidManagerPage.waitForBidGenerate(schedule1, timeGenerated);
        expect(await bidManagerPage.isBidGenerated(schedule1)).toBe(true, "Bid isn't generated");

        // 29. Click on Open Bid button
        await bidManagerPage.clickOpenBidButton(schedule1);

        // VP: The bid status changes from Draft to Bid Open
        // VP: Bid opens so Agent can see it (Agent bid)
        expect(await bidManagerPage.getStatusBidding(schedule1)).toBe("Bid Open", "Bid doesn't open")

        // 30. On Max 'Agent bid' click on WFO menu -> Open WFO -> Shift Bidding
        // there sees the bidding and bids for next week shifts"
        await basePage.switchDriverInstance(driverAgent1);
        await basePage.switchWindowByHandle(maxPageHandle2);
        await maxPageAgent2.clickWFO();
        maxWFOPanelAgent3 = await maxPageAgent2.openWFOPanel();
        await maxWFOPanelAgent3.waitForPanelOpen();
        await maxWFOPanelAgent3.openShiftBiddingPanel();

        // VP: Shift Bidding is performed
        // VP: In this case Agent bid = Autom Agent3 is the only agent can see bidding in Max
        expect(await maxWFOPanelAgent3.isShiftBiddingDisplayed(schedule1.startDate, "Bid Open")).toBe(true, "Failed by ticket IC-83128 [TestAutomation][NICE-UI] Bidding and bids for next week shifts doesn't display on Shift Bidding of MAX");
        maxPageAgent2 = await maxWFOPanelAgent3.closeWFOPanel();
        await maxPageAgent2.logOut();
        await mySchedulePage.logOut();
        await basePage.closeWindow();

        // 31. Click the top navigation icon and then Search application
        await basePage.switchDriverInstance(driverAdmin);

        searchPage = await bidManagerPage.gotoSearchPage();

        // VP: Search application loads
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search application doesn't load");

        // 32. Find the calls performed today 
        await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

        // VP: Today recordings are displayed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

        // 33. Find the call you made on step 13 
        agentsName = `${admin.name}, ${agent1.name}`;
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: Segments of call are found
        expect(agentsName).toMatch(actualAgents, "Agents who made calls are not listed");

        // 34. Validate Recording on CXOne
        // VP: Verify there should be 4 segments for the call with the same contact ID
        // VP: Verify you can play back the segment and that you hear it correctly
        // VP: Verify you see accurate information on the Player for each segment:
        // Start time
        // End time
        // Duration
        // Agent Name
        // Customer Name
        player = await searchPage.playRecord(rowAgentName);
        expect(await player.isInfoDisplayedCorrectly(admin.name, agent1.name)).toBe(true, "Player is not displayed");

        // Close player
        await player.close();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Final
            await searchPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});