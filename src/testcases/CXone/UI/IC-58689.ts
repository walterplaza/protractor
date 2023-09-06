import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { AgentTransferTabItem, MainTransferTabItem } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxChatPage from "@page-objects/CXone/max/max-chat-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: CXone
 * Suite: CXone E2E
 * TC ID: IC-58689
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CXone E2E - IC-58689', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    TestRunInfo.testTimeout = 800000000;
    let admin: Agent;
    let agent: Agent;
    let contactId: number;
    let cluster: Cluster = TestRunInfo.cluster;
    let actualAgents: string;
    let rowAgentName: number;
    let agentsName: string;
    let response: APIResponse;
    let driverAdmin: number = 1;
    let driverAgent: number = 2;
    let agentMessage: string = Utility.createRandomString(10);
    let agentMessage2: string = Utility.createRandomString(10);
    let ownName: string = "Me";

    // Declare page object
    let loginPageAgent: LoginPage;
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let maxPageAgent: MaxPage;
    let basePage: PageBase;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let maxChatAdmin: MaxChatPage;
    let maxChatAgent: MaxChatPage;
    let mySchedulePageAgent: MySchedulePage;
    let maxTransferPageAdmin: MaxTransfer;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58689 - CxOne > Screen Record > Chat > Transfer`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
        agentsName = `${agent.name}`;
        basePage = new PageBase();

    }, TestRunInfo.conditionTimeout);

    it('IC-58689 - CxOne Screen Record Chat Transfer', async () => {

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

        // 4. Launch MAX
        maxPageAdmin = await employeesPageAdmin.launchMax();
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        let actualPhoneNumber = await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE);

        // VP: Phone number text box is filled correctly
        expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

        // Click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not correct");

        // 5.1 Place an inbound chat
        response = await TestHelpers.startChatContact(admin);
        contactId = await TestHelpers.getContactID(response);

        // 5.2 Change the agent state to available
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // VP: Chat from queue asks if you want to accept
        expect(await maxPageAdmin.isNewContactPopUpDisplayed()).toBe(true, "New contact popup is not displayed");

        // 5.3 Click accept button
        await maxPageAdmin.acceptNewChatContact();
        maxChatAdmin = await maxPageAdmin.waitForChatWorkspace();

        // VP: Chat is connected.
        expect(await maxChatAdmin.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat is not connected");

        // 6. Type in the Chat
        await maxChatAdmin.sendAgentMessage(agentMessage);

        // VP: What has been typed is written on the chat's window
        expect(await maxChatAdmin.isChatMessageDisplayed(ownName, agentMessage)).toBe(true, "The Agent text label is not 'Me'")

        // 7. Log in CxOne the other agent
        await basePage.createDriverInstance();
        await basePage.switchDriverInstance(driverAgent);
        await basePage.navigateWeb(cluster.getURL(PageName.CXONE_LOGIN_PAGE));
        loginPageAgent = LoginPage.getInstance();
        mySchedulePageAgent = await loginPageAgent.loginAsAgent(agent);

        // VP: Agent 2 is log in CxOne
        expect(await mySchedulePageAgent.isPageDisplayed()).toBe(true, " Agent 2 is cannot log in CxOne")

        // 8. Launch Max and change the status to Available
        await agent.createPhoneNumber();
        maxPageAgent = await mySchedulePageAgent.launchMax();
        await maxPageAgent.enterLaunchForm(MaxConnectOption.PHONE, agent.phoneNumber, false);
        await maxPageAgent.connectMax();
        await maxPageAgent.changeState(MaxState.AVAILABLE);

        // VP: MAX agent 2 is connected and Agent status is Available
        expect(await maxPageAgent.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "Agent 2 status is not change to Available")

        // 9. On agent 1 click Transfer button --> click Agents --> click All Agents 
        await basePage.switchDriverInstance(driverAdmin);
        maxTransferPageAdmin = await maxChatAdmin.clickTransferConferenceButton();
        await maxTransferPageAdmin.selectMainTabItem(MainTransferTabItem.AGENTS);
        await maxTransferPageAdmin.selectAgentTabItem(AgentTransferTabItem.ALL_AGENTS)

        // VP: Displays agents that are logged in find agent 2
        expect(await maxTransferPageAdmin.isAgentResultDisplayed(agent.name)).toBe(true, "Agent label is not displayed");

        // 10. Select the agent 2 to transfer the chat and click Transfer button
        await maxTransferPageAdmin.transferToAgentInAllAgentsTab(agent.name);
        await maxPageAdmin.logOut();

        // VP: Chat is transfered to agent2
        await basePage.switchDriverInstance(driverAgent);
        expect(await maxPageAgent.isNewContactPopUpDisplayed()).toBe(true, "Chat is not transfered to agent2");

        // 11. On Max agent 2 click 'Accept' button
        maxChatAgent = await maxPageAgent.acceptNewChatContact();

        // VP: Agent 2 accepted the chat and the chat is displayed on agent 2
        expect(await maxChatAgent.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat contact is not displayed");

        // 12. Type in the Chat on agent 2
        await maxChatAgent.sendAgentMessage(agentMessage2);

        // VP: What has been typed is written on the chat's window
        expect(await maxChatAgent.isChatMessageDisplayed(ownName, agentMessage2)).toBe(true, "The Agent text label is not 'Me'")

        // 13. Click the 'End' button to end the Chat
        await maxChatAgent.endChatContact();

        // VP: Chat contact ends
        expect(await maxChatAgent.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat contact is still displayed");

        // 14. In the toolbar of the left side press ADMIN >Search button
        await maxPageAgent.logOut();
        await mySchedulePageAgent.logOut();
        await basePage.closeExcessBrowser();
        await basePage.switchDriverInstance(driverAdmin);
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 15. Make sure time picker has Today selected and click search icon
        await searchPage.selectTime(SearchTimeRange.TODAY);
        await searchPage.clickSearch();

        // VP: Today recording are displayed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 16. Find the chats recording
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, contactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: Segments of recording are found, the same contact ID and the same number of segments (2)
        expect(agentsName).toMatch(actualAgents, "Segments of recording aren't found");

        // 17. Select one segment and click on the play icon
        player = await searchPage.playRecord(rowAgentName);

        // VP: The NICE SaasS player is launch and you are able to see:
        // Agent Name
        // Customer Name
        // Duration
        // Start Time
        // End Time
        // The message of the chat is displayed
        expect(await player.isChatAgentNameDisplayed()).toBe(true, "Chat agent name is not displayed");
        expect(await player.isChatCustomerNameDisplayed()).toBe(true, "Chat customer name is not displayed");
        expect(await player.isChatStartTimeDisplayed()).toBe(true, "Chat start time is not displayed");
        expect(await player.isChatEndTimeDisplayed()).toBe(true, "Chat end time is not displayed");
        expect(await player.isChatStartDateDisplayed()).toBe(true, "Chat agent name is not displayed");
        expect(await player.isChatMessageDisplayed(agentMessage2)).toBe(true, `"${agentMessage2}" Chat message is not displayed`);

        // 18. Close the player
        await player.close();

        // VP: Player is closed
        expect(await player.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Player is displayed.");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});