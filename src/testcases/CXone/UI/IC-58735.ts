import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, MaxConnectOption, MaxState, PageName, SearchTimeRange } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MaxDispositionPage from "@page-objects/CXone/max/max-disposition";
import MaxPage from "@page-objects/CXone/max/max-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";

/** 
 * Type: CXone
 * TC ID: IC-58735
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("CxOne E2E - IC-58735", function () {

	TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
	let admin: Agent;
	let randomDispoNote = Utility.createRandomString(10, "Note");
	let dispositionName = "lgvn_disposition";
	let callContactId: number;
	let agent1: Agent;
	let agentsName: string;
	let rowAgent: number;
	let callReason: string;

	// Declare page object
	let loginPage: LoginPage;
	let employeesPage: EmployeesPage;
	let maxPage: MaxPage;
	let searchPage: SearchPage;
	let maxCall: MaxCall;
	let maxDispositionPage: MaxDispositionPage;
	let basePage: PageBase;

	beforeEach(async () => {
		await Logger.write(FunctionType.TESTCASE, `IC-58735 - Verify that the data for the disposition code will be inserted into the "Call Reason" field that will be displayed in the call list`);
		// 1.	Prerequisites:
		//  Have a custom disposition created on Central
		//  Have the disposition assigned to a Phone skill (inbound or outbound)
		//  Phone skill assigned to agent
		//  Have 'Disposition' column on Evolve Search application table.
		basePage = new PageBase();
		agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
		admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
		agentsName = `${admin.name}, ${agent1.name}`;

	}, TestRunInfo.conditionTimeout);

	it('IC-58735 - Verify that the data for the disposition code will be inserted into the "Call Reason" field that will be displayed in the call list', async () => {

		// 2. Login access to evolve.
		loginPage = LoginPage.getInstance();

		// VP: Sig In page is displayed with User name text box
		expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");
		expect(await loginPage.isUserNameTextBoxDisplayed()).toBe(true, "User name text box is not displayed");

		// 3. In the Sign In page you could see user name entered in step 1 and in the Password text box enter:
		await loginPage.enterUsername(admin);
		await loginPage.clickNextButton();
		await loginPage.enterPassword(admin);

		// VP: User name value not editable is displayed, Password text box, Back and Sign In buttons ,  Forgot your password link at the bottom
		expect(await loginPage.isUserNameTextBoxDisplayed(TestRunInfo.shortTimeout)).toBe(false, "User name value editable is displayed");
		expect(await loginPage.isPasswordTextBoxEditable()).toBe(true, "Password is not editable");
		expect(await loginPage.isForgotPasswordDisplayed()).toBe(true, "User name text box is not displayed");
		expect(await loginPage.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
		expect(await loginPage.isSignInButtonDisplayed()).toBe(true, "Sign in button is not displayed");

		// Click Sign In button
		employeesPage = await loginPage.clickSignInButton();

		// 4. Click in the square icon next to NICE inConcant brand and select  LAUNCH MAX
		maxPage = await employeesPage.launchMax();

		// 5. Make sure "Set Phone Number" is selected and enter a correct phone number in the Phone Number text box 
		await admin.createPhoneNumber();
		await maxPage.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
		let actualPhoneNumber = await maxPage.getEnteredPhone(MaxConnectOption.PHONE);

		// VP: Phone number text box is filled correctly
		expect(admin.phoneNumber).toMatch(actualPhoneNumber, "Phone number doesn't match");

		// 6. Click Connect button
		await maxPage.connectMax();

		// VP: MAX agent is connected and Agent status is Unavailable
		expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not correct")

		// 7. Change the MAX agent status by clicking down arrow next to the status name from Unavailable to Available
		await maxPage.changeState(MaxState.AVAILABLE);

		// VP: Status change to Available
		expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE.toUpperCase(), "Agent status is not change to Available")

		// 8. Place an inbound call
		await agent1.createPhoneNumber();
		await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
		await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone,true));

		// 9. Agent accepts incoming call
		maxCall = await maxPage.waitForCallWorkspace();
		callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone,true));

		// VP: Agent can hear customer on other end, and customer can hear agent on other end.
		expect(await maxPage.isCallAccepted()).toBe(true, "Outbound is not displayed in MAX");

		// 10. Click Record button and make your recording
		await maxCall.clickRecordButton();

		// VP. Recording is running,
		expect(await maxCall.isCallRecorded(true)).toBe(true, "Call is not recorded");

		// 11. Click hang up button
		maxDispositionPage = await maxCall.endCallRequireDispositionContact();

		// VP: Call is ended

		// 12. Verify after the call is ended disposition is displayed on MAX agent
		// VP. Disposition is displayed on MAX agent
		expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form is not displayed");

		// 13. Select the custom disposition and click save button
		await maxDispositionPage.fillDispositionForm(dispositionName, randomDispoNote);

		// VP. Custom Disposition selected
		expect(await maxDispositionPage.isDispositionSelected(dispositionName)).toBe(true, "Disposition is not selected");

		// Close MAX
		await maxDispositionPage.saveAndCloseDisposition();
		await maxPage.logOut();

		// 14. In the toolbar of the left side press ADMIN >Search button
		searchPage = await employeesPage.gotoSearchPage();

		// VP: The Search page is displayed
		expect(await searchPage.isPageDisplayed()).toBe(true, "Search pages is not displayed");

		// 15. Make sure time picker has  Today  selected and click search icon
		await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

		// VP: All agents who made calls are listed
		expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Agents who made calls are not listed");

		// 16: Look for the call you performed with disposition on the list
		await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());
		rowAgent = await searchPage.getAgentRecordIndexByContactID(agentsName, callContactId.toString());

		// VP: Call is found
		expect(await searchPage.isAgentDisplayedInSearchTable(agentsName, callContactId.toString())).toBe(true, "Both agents aren't listed with the same contact ID and the same number of segments");

		// 17. Take a look at the 'Call Reason' column
		callReason = await searchPage.getCallReason(rowAgent);

		// VP: 'Call Reason' column displays the data for the custom disposition
		expect(callReason).toBe(dispositionName, "Call Reason data is not displayed");

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
			finally {
				try {
					await basePage.closeExcessBrowser();
				} catch (err) { }
			}
		}
	}, TestRunInfo.conditionTimeout);
})
