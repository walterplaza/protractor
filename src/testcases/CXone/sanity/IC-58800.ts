import { Agent, AgentType } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { PageName } from "@data-objects/general/cluster";

describe(`CxOne Sanity - ${TestBase.getTestCaseJiraId("IC-58800")}`, function () {

	TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
	let testCaseID = TestBase.getTestCaseJiraId("IC-58800");
	let admin: Agent;

	// Declare page object
	let loginPage: LoginPage;
	let employeesPage: EmployeesPage;
	let maxPage: MaxPage;

	beforeEach(async () => {
		await Logger.write(FunctionType.TESTCASE, `${testCaseID} - Evolve > Launch MAX Agent`);
		admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
	}, TestRunInfo.conditionTimeout);

	it(`${testCaseID} - Evolve Launch MAX Agent`, async () => {

		// 2. As an Admin user log in to CXOne WFO with valid credentials.
		loginPage = LoginPage.getInstance();
		employeesPage = await loginPage.loginAsAdmin(admin);

		// VP: Employees page is displayed
		expect(await employeesPage.isPageDisplayed()).toBe(true, "Employee page is not displayed");

		// 3. On the right top border of the page click on the squares button and select LAUNCH MAX option
		maxPage = await employeesPage.launchMax();

		// VP: Max agent pops up displaying the Max agent panel.
		expect(await maxPage.isSessionConnectSectionDisplayed()).toBe(true, "The Max agent is not displayed");
	});

	afterEach(async () => {
		await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
		try {
			await maxPage.closeSessionConnectSection();
			await employeesPage.logOut();
		} catch (err) { }
	}, TestRunInfo.conditionTimeout);
})
