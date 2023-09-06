
import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: CXone
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 484801
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: TO31
 * Note:
 * - IE: Failed by ticket IC-71112 - [TestAutomation][NICE-UI] The blank page is displayed after logging in Evolve on IE
 * - Edge: Blocked because old version's limitation
 */

describe("Smoke_Automated_Blue_Full - 484801", function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let employeesPage: EmployeesPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `484801 - CXOne>Logout smoke test`);
        admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
    }, TestRunInfo.conditionTimeout);

    it('484801 - CXOne>Logout smoke test', async () => {

        // 1. Login CXone
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);

        // 2.  Click your user name in the top nav 
        await employeesPage.openAgentOption();

        // VP: Menu is displayed
        expect(await employeesPage.isAgentOptionDisplayed()).toBe(true, "Menu is not displayed");

        // 3. Click on Logout 
        await employeesPage.clickLogout();

        // VP: Log out popup window is displayed
        expect(await employeesPage.isConfirmDialogDisplayed()).toBe(true, "Logout popup is not displayed");

        // 4. Press Yes button 
        loginPage = await employeesPage.clickYesButton();

        // VP: User is logged out successfully. You are returned to the CXone login screen
        expect(await loginPage.isPageDisplayed()).toBe(true, "User is not logged out");
    });
});