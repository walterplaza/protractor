import { Agent, AgentType } from "@data-objects/general/agent";
import { MaxConnectOption, MaxState, PageName, SearchColumnName, SearchTimeRange } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email } from "@data-objects/inContact/max/email/email-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import InteractionPlayer from "@page-objects/CXone/general/cxone-player";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxChatPage from "@page-objects/CXone/max/max-chat-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: CXone
 * Suite: CXone E2E
 * TC ID: IC-58604
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SO32
 * Note:
 */

describe('CXone E2E - IC-58604', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;
    let agent: Agent;
    let contactId: number;
    let actualAgents: string;
    let rowAgentName: number;
    let agentsName: string;
    let response: APIResponse;
    let ownName: string = "Me";
    let agentMsg1: string = "Hello";
    let agentMsg2: string = "Hi";
    let agentMsg3: string = "How are you?";
    let email: Email = new Email();

    // Declare page object
    let loginPageAdmin: LoginPage;
    let employeesPageAdmin: EmployeesPage;
    let maxPageAdmin: MaxPage;
    let basePage: PageBase;
    let searchPage: SearchPage;
    let player: InteractionPlayer;
    let maxChatAdmin: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-58604 - CXOne > QM Analytics> Custom Category and QP> Verify that as a Supervisor you can playback calls and generate eval reports of your past months`);
        admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
        agent = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);

        agentsName = `${admin.name}`;
        email.initFullData("test@email.com", "Test Subject", "Test Body", "");
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-58604 - CXOne QM Analytics Custom Category and QP Verify that as a Supervisor you can playback calls and generate eval reports of your past months', async () => {

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

        // 5. Make sure "Select Phone Number" is selected and enter a correct phone number in the Phone Number text box
        await admin.createPhoneNumber();
        await maxPageAdmin.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
        let actualPhoneNumber = await maxPageAdmin.getEnteredPhone(MaxConnectOption.PHONE);

        // VP: Phone number text box is filled correctly
        expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

        // 6. Click Connect button
        await maxPageAdmin.connectMax();

        // VP: MAX agent is connected and Agent status is Unavailable
        expect(await maxPageAdmin.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not correct");

        // 7.1 Place an inbound chat
        response = await TestHelpers.startChatContact(admin);
        contactId = await TestHelpers.getContactID(response);

        // 7.2 Change the agent state to available
        await maxPageAdmin.changeState(MaxState.AVAILABLE);

        // VP: Chat from queue asks if you want to accept
        expect(await maxPageAdmin.isNewContactPopUpDisplayed()).toBe(true, "New contact popup is not displayed");

        // 7.3 Click accept button
        await maxPageAdmin.acceptNewChatContact();
        maxChatAdmin = await maxPageAdmin.waitForChatWorkspace();

        // VP: Chat is connected.
        expect(await maxChatAdmin.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat is not connected");

        // 8. Type in the chat these words: 
        // Hello
        // Hi
        // How are you?
        await maxChatAdmin.sendAgentMessage(agentMsg1);
        await maxChatAdmin.sendAgentMessage(agentMsg2);
        await maxChatAdmin.sendAgentMessage(agentMsg3);

        // VP: The keywords should be displayed in the chat
        expect(await maxChatAdmin.isChatMessageDisplayed(ownName, agentMsg1)).toBe(true, "The Agent text label is not 'Me'")
        expect(await maxChatAdmin.isChatMessageDisplayed(ownName, agentMsg2)).toBe(true, "The Agent text label is not 'Me'")
        expect(await maxChatAdmin.isChatMessageDisplayed(ownName, agentMsg3)).toBe(true, "The Agent text label is not 'Me'")

        // 9. Agent presses the hang up button twice.
        await maxChatAdmin.endChatContact();

        // VP: Chat ends
        expect(await maxPageAdmin.isContactWorkSpaceDisplayed(ContactName.CHAT, TestRunInfo.shortTimeout)).toBe(false, "Chat contact is still displayed");

        // 10. Click the top navigation icon and then click the Search icon
        await maxPageAdmin.logOut();
        searchPage = await employeesPageAdmin.gotoSearchPage();

        // VP: The Search page is displayed
        expect(await searchPage.isPageDisplayed()).toBe(true, "Search page is not displayed");

        // 11. Make sure time picker has *Today* selected and click search icon
        await searchPage.selectTime(SearchTimeRange.TODAY);
        await searchPage.clickSearch();

        // VP: All agents who made calls are listed
        expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

        // 12. Select the segment of the call and see the category column
        await searchPage.search(SearchTimeRange.TODAY, contactId.toString());
        rowAgentName = await searchPage.getAgentRecordIndexByContactID(agentsName, contactId.toString());
        actualAgents = await searchPage.getSearchResult(rowAgentName, SearchColumnName.AGENT_NAME);

        // VP: The category is displayed the custom category ‘Greeting’
        expect(await searchPage.getCategory(rowAgentName)).toBe("Greeting", "The category is not displayed the custom category ‘Greeting’");

        // 13. Press play button in the NICE player
        player = await searchPage.playRecord(rowAgentName);

        // VP: Verify you are able to play back & hear custom category phrase mentioned
        expect(await player.isChatMessageDisplayed(agentMsg1)).toBe(true, `"${agentMsg1}" Chat message is not displayed`);
        expect(await player.isChatMessageDisplayed(agentMsg2)).toBe(true, `"${agentMsg1}" Chat message is not displayed`);
        expect(await player.isChatMessageDisplayed(agentMsg3)).toBe(true, `"${agentMsg1}" Chat message is not displayed`);

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            await player.close();
            await searchPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});