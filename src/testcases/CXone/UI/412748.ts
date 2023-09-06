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

/** 
 * Type: CXone
 * TC ID: TFS-412748
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: SO32
 */

describe("CxOne E2E - 412748", function () {

	TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
	let admin: Agent;
	let randomDispoNote = Utility.createRandomString(10, "Note");
	let dispositionName = "lgvn_disposition";
	let callContactId: number;
	let agent1: Agent;

	// Declare page object
	let loginPage: LoginPage;
	let employeesPage: EmployeesPage;
	let maxPage: MaxPage;
	let searchPage: SearchPage;
	let maxCall: MaxCall;
	let maxDispositionPage: MaxDispositionPage;

	beforeEach(async () => {
		await Logger.write(FunctionType.TESTCASE, `412748 - Verify that the data for the disposition code will be inserted into the "Call Reason" field that will be displayed in the call list`);
		// 1.	Prerequisites:
		//  Have a custom disposition created on Central
		//  Have the disposition assigned to a Phone skill (inbound or outbound)
		//  Phone skill assigned to agent
		//  Have 'Disposition' column on Evolve Search application table.

		agent1 = await TestCondition.setUpCxOneAgent(AgentType.CXONE_AGENT1);
		admin = await TestCondition.setUpCxOneAgent(AgentType.CXONE_ADMIN);
	}, TestRunInfo.conditionTimeout);

	it('Verify that the data for the disposition code will be inserted into the "Call Reason" field that will be displayed in the call list', async () => {

		// 2. Central Login
		loginPage = LoginPage.getInstance();
		employeesPage = await loginPage.loginAsAdmin(admin);

		// 3. Launch MAX agent by entering a correct phone number
		await admin.createPhoneNumber();
		maxPage = await employeesPage.launchMax();
		await maxPage.enterLaunchForm(MaxConnectOption.PHONE, admin.phoneNumber, false);
		await maxPage.connectMax();

		// VP MAX agent is launched
		expect(await maxPage.isMaxLaunched()).toBe(true, "MAX is not launched");
		expect(await maxPage.getAgentStatus()).toMatch(MaxState.UNAVAILABLE.toUpperCase(), "Agent status is not Unavailable");

		// 4. Change Agent status from Unavailable to Available
		await maxPage.changeState(MaxState.AVAILABLE);

		// VP.Agent status is Available
		expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE.toUpperCase(), "Agent status doesn't change to Available");

		// 5. Perform a phone call
		await TestHelpers.startOrJoinSession(agent1, agent1.phoneNumber);
        await TestHelpers.makeInboundCall(agent1, SkillCore.getEvolveSkillName(SkillType.IB_Phone, true));		
		maxCall = await maxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(admin, SkillCore.getEvolveSkillName(SkillType.IB_Phone, true))

		// VP. Call is made
		expect(await maxPage.isCallAccepted()).toBe(true, "Outbound is not displayed in MAX");

		// 6. Press Record button and make your recording
		await maxCall.clickRecordButton();

		// VP. Recording is running,
		expect(await maxCall.isCallRecorded(true)).toBe(true, "Call is not recorded");

		// 7.	End the call
		maxDispositionPage = await maxCall.endCallRequireDispositionContact();

		// 8. Verify after the call is ended disposition is displayed on MAX agent
		// VP. Disposition is displayed on MAX agent
		expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Call is not ended");

		// 9. Select the custom disposition and save
		await maxDispositionPage.fillDispositionForm(dispositionName, randomDispoNote);

		// VP. Custom Disposition selected
		expect(await maxDispositionPage.isDispositionSelected(dispositionName)).toBe(true, "Call is not ended");

		// Close MAX
		await maxDispositionPage.saveAndCloseDisposition();
		await maxPage.logOut();

		// 10. Login CXOne
		// 11. Click Search
		searchPage = await employeesPage.gotoSearchPage();

		// VP. Search application loads
		expect(await searchPage.isPageDisplayed()).toBe(true, "Search pages is not displayed");

		// 12. Look for the call you performed with disposition on the list
		await searchPage.search(SearchTimeRange.TODAY, callContactId.toString());

		// 13.	'Call Reason' column displays the data for the custom disposition
		// VP. Today recordings are displayed
		expect(await searchPage.isListRecordedSegmentDisplayed()).toBe(true, "Today recordings aren't displayed");

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
