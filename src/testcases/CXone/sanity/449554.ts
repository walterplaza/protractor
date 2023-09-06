import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

describe(`CxOne Sanity - ${TestBase.getTestCaseJiraId("449554")}`, function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let testCaseID = TestBase.getTestCaseJiraId("449554");
    let admin: Agent;
    let agent: Agent;
    let agentsName: string;
    let rowAgentName: number;
    let expectedAgents: string;
    let callContactId: number;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;
    let maxPage: MaxPage;
    let searchPage: SearchPage;
    let player: InteractionPlayer;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `${testCaseID} - Inbound Call Agent hangs up call`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
    }, TestRunInfo.conditionTimeout);

    it(`${testCaseID} - Inbound Call Agent hangs up call`, async () => {

        // 1. Supervisor logged in
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);
        expect(await employeesPage.isPageDisplayed()).toBe(true, "Employee page is not displayed");

        // 4. Click in the square icon next to NICE inContact brand and select LAUNCH MAX
        // 5. make sure "Select Phone Number" is selected and enter a correct phone number in the Phone Number text box
        await admin.createPhoneNumber(true);
        maxPage = await employeesPage.launchMax();
        await maxPage.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        let actualPhoneNumber = await maxPage.getEnteredPhone(MaxConnectOption.PHONE);

        // VP: Phone number text box is filled correctly
        expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

        // 6. click Connect button
        await maxPage.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPage.isMaxLaunched()).toBe(true, "MAX is not launched");
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not Unavailable");

        // 7. Change the MAX agent status by clicking down arrow next to the status name from Unavailable to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Status change to Available
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE.toUpperCase(), "Agent status doesn't change to Available");

        // 8. Place an inbound call to POC using Lab phone Agent should see incoming call
        await agent.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent, agent.phoneNumber);
        await TestHelpers.makeInboundCall(agent, SkillCore.getEvolveSkillName(SkillType.IB_Phone));
        await maxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone));

        // Incoming call is displayed in MAX Agent
        expect(await maxPage.isCallAccepted()).toBe(true, "Incoming call is not displayed");

        // 10. Agent presses the hang up button twice.
        await maxPage.endCall();

        // VP: Call ends
        expect(await maxPage.isCallEnded()).toBe(true, "Call is not ended");

        // Close MAX
        await maxPage.logOut();

        // 11. Click the top navigation icon and then click the Search icon
        searchPage = await employeesPage.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 12. Make sure time picker has Today selected and click search icon
        await searchPage.search(SearchTimeRange.TODAY, "");

        // VP: All agents who made calls are listed
        expectedAgents = `${admin.name}, ${agent.name}`;
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(expectedAgents, callContactId.toString());
        agentsName = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);
        expect(expectedAgents).toMatch(agentsName, "Agents who made calls are not listed");

        // 13. select last call made and click on the play icon
        player = await searchPage.playRecord(rowAgentName);

        // The NICE SaasS player is launch and you are able to see: Agent Name,
        // Customer Name, Duration, Direction, Start Time, End Time
        let isPlayerDisplayed = await player.isInfoDisplayedCorrectly(agent.name, admin.name);
        expect(isPlayerDisplayed).toBe(true, "Player is not displayed");

        // 15. Close the player 
        await player.close();

        // VP: Player is closed
        let currentTotalWindows = await BrowserWrapper.getTotalWindows();
        expect(1).toBe(currentTotalWindows, "Player is not closed");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            await searchPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.cleanUpCxOneAgent(admin);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
