import { Agent, AgentType } from "@data-objects/general/agent";
import { Cluster, PageName } from "@data-objects/general/cluster";
import { FunctionType, Logger } from "@utilities/general/logger";
import BusinessUnitDetailsPage from "@page-objects/CXone/acd/acd-configuration/business-unit-details-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import TenantPage from "@page-objects/CXone/tenant/tenant-page";
import TestBase from "@testcases/test-base";
import TestRunInfo from "@data-objects/general/test-run-info";
import UpdateTenantPage from "@page-objects/CXone/tenant/update-tenant-page";
import { TestCondition } from "@test-helpers/test-condition";

describe(`CxOne Sanity - ${TestBase.getTestCaseJiraId("469642")}`, function () {

    TestBase.scheduleTestBase(PageName.CXONE_TENANTS_PAGE);
    let testCaseID = TestBase.getTestCaseJiraId("469642");
    let cluster: Cluster = TestRunInfo.cluster;
    let superAdmin: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let tenantPage: TenantPage;
    let updateTenantPage: UpdateTenantPage;
    let businessUnitDetailsPage: BusinessUnitDetailsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `${testCaseID} - Impersonate and configure`);
        superAdmin = await TestCondition.registerCxOneAgent(AgentType.CXONE_SUPERADMIN);
    }, TestRunInfo.conditionTimeout);

    it(`${testCaseID} - Impersonate and configure`, async () => {

        // 2. Launch Chrome and enter Evolve URL
        loginPage = LoginPage.getInstance();

        // VP: Login page will be displayed
        expect(await loginPage.isPageDisplayed()).toBe(true, "Login page is not displayed");

        // 3. Login with default TM admin user 
        tenantPage = await loginPage.loginAsSuperAdmin(superAdmin);

        // VP: User will be redirected to the Tenants management page
        expect(await tenantPage.isPageDisplayed()).toBe(true, "Tenant page is not displayed");

        // 4. In the tenant page Select the tenant created and click on it
        updateTenantPage = await tenantPage.selectTenant(cluster.tenantName);

        // VP: Tenant details page is displayed
        expect(await updateTenantPage.isTenantDetailPageDisplayed()).toBe(true, "Tenant details page is not displayed");

        // 5. Click the three dots Active button
        await updateTenantPage.showMoreSettingOption();

        // VP: Make sure the following options are displayed Impersonate & Configure, Impersonate & Support
        expect(await updateTenantPage.isMoreSettingOptionDisplayed()).toBe(true, "More Setting option is not displayed");

        // 6. Select Impersonate and Configure option
        businessUnitDetailsPage = await updateTenantPage.selectImpersonateAndConfigureDetailsItem();

        // VP: Verify that you are able to see with details tab in the Impersonate and Configure page
        expect(await businessUnitDetailsPage.isBusinessUnitDetailsPageDisplayed()).toBe(true, "Business Unit Details page is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await businessUnitDetailsPage.logOut();
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
