import CustomAPIs from "@apis/custom-apis";
import { ApplicationType, QMFeature, Tenant, TenantType } from "@data-objects/CXone/tenant/tenant";
import { Agent, AgentType, CxOneAgentRole } from "@data-objects/general/agent";
import { PageName, Timezone } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import SetPasswordPage from "@page-objects/CXone/general/set-password-page";
import EvaluationsPage from "@page-objects/CXone/my-zone/evaluations-page";
import TenantPage from "@page-objects/CXone/tenant/tenant-page";
import UpdateTenantPage from "@page-objects/CXone/tenant/update-tenant-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Gmail } from "@utilities/general/utility";

describe(`CxOne Sanity - ${TestBase.getTestCaseJiraId("449556")}`, function () {

	TestBase.scheduleTestBase(PageName.CXONE_TENANTS_PAGE);
	let testCaseID = TestBase.getTestCaseJiraId("449556");
	let superAdmin: Agent;
	let tmaUser: Agent;
	let tenant = new Tenant();
	let employee: Agent;
	let activateLink: string;
	let gmail: Gmail;

	// Declare page object
	let loginPage: LoginPage;
	let tenantPage: TenantPage;
	let employeesPage: EmployeesPage;
	let updateTenantPage: UpdateTenantPage;
	let setPasswordPage: SetPasswordPage;
	let evaluationsPage: EvaluationsPage;

	beforeEach(async () => {
		await Logger.write(FunctionType.TESTCASE, `${testCaseID} - Create Tenant`);
		superAdmin = await TestCondition.registerCxOneAgent(AgentType.CXONE_SUPERADMIN);
		tmaUser = await TestCondition.registerCxOneAgent(AgentType.TMA);
		gmail = new Gmail();
		employee = new Agent().initCxOneData(CxOneAgentRole.AGENT);
		employee.email = gmail.getRandomGmailByIndex();
		tenant.initData(TenantType.CUSTOMER, Timezone.PACIFIC_TIME);
	}, TestRunInfo.conditionTimeout);

	it(`${testCaseID} - Create Tenant`, async () => {

		// 2. Generate a token for your TMA user using below API
		let tmaToken: string = await CustomAPIs.getTMAToken(tmaUser);

		// 3. Create Tenant
		// 5. Send the Request, clicking 'Send' button
		let postTenantResponse: APIResponse = await CustomAPIs.postTenant(tmaToken, tenant);

		// 6. verify that the api responses Status: 200
		expect(await postTenantResponse.status).toBe(200, "The status code 200 is not returned");

		// 7. Navigate to CXone
		loginPage = LoginPage.getInstance();

		// VP: Login page will be displayed
		expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");

		// 8. Login with default TM admin user
		tenantPage = await loginPage.loginAsSuperAdmin(superAdmin);

		// VP: User will be redirected to the Tenants management page
		expect(await tenantPage.isPageDisplayed()).toBe(true, "Tenant page is not displayed");

		// 9. Search the tenant created before
		// VP: The tenant is displayed with the status DRAFT
		expect(await tenantPage.isNewTenantDisplayed(tenant.name)).toBe(true, "New tenant is not displayed");

		// 10. Click on the tenant
		updateTenantPage = await tenantPage.selectTenant(tenant.name);

		// VP: DRAFT tenant have following fields as freeze:
		// •Name
		// •Partner
		// •Tenant Type
		// •Create Date
		// •Business Unit 
		// •Cluster id
		// •Billing Cycle
		expect(await updateTenantPage.isTenantNameFieldEnable()).toBe(false, "Tenant name field is enable");
		expect(await updateTenantPage.isPartnerFieldEnable()).toBe(false, "Partner field is enable");
		expect(await updateTenantPage.isTenantTypeFieldEnable()).toBe(false, "Tenant type field is enable");
		expect(await updateTenantPage.isCreateDateFieldEnable()).toBe(false, "Create date field is enable");
		expect(await updateTenantPage.isBusinessUnitFieldEnable()).toBe(false, "Business Unit field is enable");
		expect(await updateTenantPage.isClusterIdFieldEnable()).toBe(false, "Cluster Id field is enable");
		expect(await updateTenantPage.isBillingCycleFieldEnable()).toBe(false, "Billing cycle field is enable");

		// 11. Fields which will be enabled:
		// •Timezone
		// •Billing Telephone Number
		// •User Cap – Autofilled value -(500)

		// VP: DRAFT tenant have following fields which will be enabled:
		// •Timezone
		// •Billing Telephone Number
		// •User Cap – Autofilled value -(500)
		expect(await updateTenantPage.isTimezoneFieldEnable()).toBe(true, "Timezone field is disable");
		expect(await updateTenantPage.isBillingTelephoneNumberFieldEnable()).toBe(true, "Billing telephone number field is disable");
		expect(await updateTenantPage.isUserCapFieldEnable()).toBe(true, "User cap field is disable");
		expect(await updateTenantPage.getUserCapValue()).toBe(500, "The User cap value doesn't match");

		// 12. Verify that Create and Activate button should be Enable
		// VP: Create and Activate button is Enabled
		expect(await updateTenantPage.isCreateAndActiveButtonEnable()).toBe(true, "Create & Active button is disable");

		// 13. Verify that the Branding Profile field has the Default Value
		// VP: Branding Profile field has the Default Value
		expect(await updateTenantPage.isDefaultValueOfBrandingProfileSelected()).toBe(true, "Default value is not selected");

		// 14. Click on Applications and Features tab
		await updateTenantPage.gotoApplicationsFeaturesTab();

		// VP: Applications and Features tab is displayed
		expect(await updateTenantPage.isApplicationsAndFeaturesTabDisplayed()).toBe(true, "Applications and features tab is not displayed");

		// 15. Select QM and press State button to change to ON state from OFF
		await updateTenantPage.changeApplicationState(ApplicationType.QM, State.ON);

		// 16. Click Yes button
		await updateTenantPage.clickStateYesButton();

		// VP: Add QM Application Configuration page (step 1) is displayed
		expect(await updateTenantPage.isAddQMApplicationConfigurationPageStep1Displayed()).toBe(true, "Add QM Application Configuration Page Step1 is not displayed");

		// 17. Select QM Analytics checkbox and click Next Button
		await updateTenantPage.selectQMSubFeature(QMFeature.QM_ANALYTICS);
		await updateTenantPage.clickNextButton();

		// VP: Add QM Application Configuration page (step 2) is displayed
		expect(await updateTenantPage.isAddQMApplicationConfigurationPageStep2Displayed()).toBe(true, "Add QM Application Configuration Page Step2 is not displayed");

		// 18. Click Finish button
		await updateTenantPage.finishAddQMApplication();

		// VP: In Add application & Features page QM should be listed with ON state
		expect(await updateTenantPage.isApplicationStateCorrect(ApplicationType.QM, State.ON)).toBe(true, "QM is OFF");

		// 19. Click on Create and Activate button
		tenantPage = await updateTenantPage.createAndActivateTenant();

		// VP: Tenant is Activated and you should see Tenants page
		expect(await tenantPage.isNewTenantDisplayed(tenant.name)).toBe(true, "New tenant is not displayed");

		// 20. Select the Tenant recently activated
		updateTenantPage = await tenantPage.selectTenant(tenant.name);

		// VP: Tenant is opened and you should see General tab by default
		expect(await updateTenantPage.isGeneralTabDisplayed()).toBe(true, "General tab is not displayed");

		// 21. In the three dots next to Active Label click on "Impersonate and Support"
		await updateTenantPage.showMoreSettingOption();
		employeesPage = await updateTenantPage.selectImpersonateAndSupportItem();

		// VP: Tenant is impersonated and Employees page is displayed
		expect(await employeesPage.isPageDisplayed()).toBe(true, "Employee page is not displayed");

		// 22. Click on New Employee button
		await employeesPage.openNewEmployeeForm();

		// VP: Create New Employee popup is displayed
		expect(await employeesPage.isCreateNewEmployeeFormDisplayed()).toBe(true, "Create New Employee pop up is not displayed");

		// 23. Put all the required values :
		// First Name
		// Last Name
		// Email address
		// Role
		// Username
		// Mobile Number
		await employeesPage.fillNewEmployeeForm(employee);

		// VP:Required values are filled:
		// First Name
		// Last Name
		// Email address
		// Role
		// Username
		// Mobile Number
		expect(employee.firstName).toBe(await employeesPage.getEnteredFirstName(), "First name doesn't match");
		expect(employee.lastName).toBe(await employeesPage.getEnteredLastName(), "Last name doesn't match");
		expect(employee.cxOneRole).toBe(await employeesPage.getSelectedRole(), "Role doesn't match");
		expect(employee.email).toBe(await employeesPage.getEnteredEmailAddress(), "Email address doesn't match");
		expect(employee.email).toBe(await employeesPage.getEnteredUserName(), "User name doesn't match");

		// 24. Click on Create button
		await employeesPage.clickSaveButton();

		// VP: New employee is created successfully with state: Invite
		expect(await employeesPage.isSuccessMessageDisplayed()).toBe(true, "'Employee was created successfully' green message is not displayed");

		// 25. Click on Invite button
		await employeesPage.searchEmployeeName(employee.name);
		await employeesPage.inviteEmployee(employee.name);

		// VP: The state is PENDING and an email should be sent to the email of the new employee in order to set the new password
		expect(await employeesPage.getEmployeeStatus(employee.name)).toBe("Pending", "The state is Invite");

		// 26. Logout from TM
		tenantPage = await employeesPage.stopImpersonated();
		loginPage = await tenantPage.logOut();

		// TMA user is logout of TMA application
		expect(await loginPage.isPageDisplayed()).toBe(true, "TMA user is not logout");

		// 27. In outlook search the email to activate account
		// Click on the 'Activate Account' button
		activateLink = await gmail.getLinkActiveByBody(tenant.name);
		setPasswordPage = await employeesPage.activateNewEmployee(activateLink);

		// VP: Set your password form is displayed in a new tab of your default browser
		expect(await setPasswordPage.isPageDisplayed()).toBe(true, "Reset password page is not displayed");

		// 28. Set the new password in the fields and click on Reset Password button
		loginPage = await setPasswordPage.resetPassword(employee.password);

		// VP: After click on "Reset Password" button
		// The Login page is displayed and a message "User activated successfully"
		expect(await loginPage.isActivatedSuccessfullyMessageDisplayed()).toBe(true, "User activated successfully message is not displayed");
		expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");

		// 29. Login the created tenant using the first user you created.
		evaluationsPage = await loginPage.loginAsNewAgent(employee);

		// VP: User is able to login with the credentials
		expect(await evaluationsPage.isPageDisplayed()).toBe(true, "User is not able to login");
	});

	afterEach(async () => {
		await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
		try {
			await evaluationsPage.logOut();
		} catch (err) { }
	}, TestRunInfo.conditionTimeout);
})