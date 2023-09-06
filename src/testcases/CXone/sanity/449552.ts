import { Agent, AgentType, CxOneAgentRole } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

describe(`CxOne Sanity - ${TestBase.getTestCaseJiraId("449552")}`, function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let testCaseID = TestBase.getTestCaseJiraId("449552");
    let admin: Agent;
    let employee: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `${testCaseID} - Create new employee`);
        admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
        employee = new Agent().initCxOneData(CxOneAgentRole.AGENT);
    }, TestRunInfo.conditionTimeout);

    it(`${testCaseID} - Create new employee`, async () => {

        // 1. Login access to evolve.
        // 2. As an Admin user log in to Evolve WFO
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);

        // VP: Check Employees page is displayed.
        expect(await employeesPage.isPageDisplayed()).toBe(true, "Employee page is not displayed");

        // 3. Click on New Employee button
        await employeesPage.openNewEmployeeForm();

        // VP: Check Create New Employee pop up is displayed
        expect(await employeesPage.isCreateNewEmployeeFormDisplayed()).toBe(true, "Create New Employee pop up is not displayed");

        // 4. Enter data to create new employee
        await employeesPage.fillNewEmployeeForm(employee);

        // VP: Check Fields are filled with entered data
        expect(employee.firstName).toBe(await employeesPage.getEnteredFirstName(), "First name doesn't match");
        expect(employee.lastName).toBe(await employeesPage.getEnteredLastName(), "Last name doesn't match");
        expect(employee.cxOneRole).toBe(await employeesPage.getSelectedRole(), "Role doesn't match");
        expect(employee.email).toBe(await employeesPage.getEnteredEmailAddress(), "Email address doesn't match");
        expect(employee.email).toBe(await employeesPage.getEnteredUserName(), "User name doesn't match");

        // 5. Click Create Button
        await employeesPage.clickSaveButton();

        // VP: Check 'Employee was created successfully' green message is displayed at the bottom right
        // VP: Check action return Employee Page
        expect(await employeesPage.isSuccessMessageDisplayed()).toBe(true, "'Employee was created successfully' green message is not displayed");
        expect(await employeesPage.isPageDisplayed()).toBe(true, "Employee page is not displayed");

        // VP: The new employee is listed on the Employees list.
        await employeesPage.searchEmployeeName(employee.name);
        expect(await employeesPage.isNewEmployeeCreated(employee.email)).toBe(true, "New employee is not listed on the Employees list");
    });

    afterEach(async () => {

        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await employeesPage.deleteEmployee(employee.email);
            await employeesPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
});