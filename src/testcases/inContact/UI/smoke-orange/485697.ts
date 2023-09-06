import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import BusinessUnitDetailTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import FeatureTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 485697
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_Full - 485697', function () {
    TestBase.scheduleTestBase();
    let admin: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let businessUnitDetailsTabPage: BusinessUnitDetailTabPage;
    let featureTab: FeatureTabPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `485697 - Central>Internal Admin>Business Units>The dependencies of the check boxes are working correctly`);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('485697 - The dependencies of the check boxes are working correctly', async () => {

        // 2. Login Central Page.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(admin);

        // 3. Go to Internal Admin>Business Units   
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();

        // VP list page is displayed
        expect(await internalBusinessUnitPage.isPageDisplayed()).toBe(true, "Business Unit list is not displayed");

        // 4.Select your BU and go to features tab   
        businessUnitDetailsTabPage = await internalBusinessUnitPage.selectBusinessUnit(admin.businessNumber.toString());
        featureTab = await businessUnitDetailsTabPage.gotoFeatureTab();

        // VP features page is displayed
        expect(await featureTab.isBusinessUnitFeatureDisplayed()).toBe(true, "Business Unit Feature details is not displayed");

        // 5. Disable Nice inContact workforce Management checkbox pop up window is displayed Press ok on the popup window  
        await featureTab.editBusinessFeature();

        // Set Nice Capacity Planner and Nice Work Force Management to ON before setting them off
        await featureTab.enableNiceCapacityPlanner(true);
        await featureTab.enableNiceWorkForceManagement(true);

        // Set Nice Work Force Management checkbox to off
        await featureTab.disableNiceWorkForceManagement(false);

        // VP Nice inContact workforce Management should be unchecked 
        expect(await featureTab.isNiceCapacityPlannerChecked()).toBe(false, "Nice Capacity Planner checkbox still checked");

        // VP Nice inContact Capacity Planner should be unchecked automatically
        expect(await featureTab.isNiceWorkForceManagementChecked()).toBe(false, "Nice Work Force Management checkbox still checked");

        // 6. Press Done  
        await featureTab.saveBusinessFeature();
        await businessUnitDetailsTabPage.selectBusinessTab('Features');

        // VP all changes are saved successfully
        expect(await featureTab.isNiceCapacityPlannerChecked()).toBe(false, "Nice Capacity Planner checkbox still enable");
        expect(await featureTab.isNiceWorkForceManagementChecked()).toBe(false, "Nice Work Force Management checkbox still checked");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out
            await businessUnitDetailsTabPage.logOut();
        }
        catch (error) { }
    }, TestRunInfo.conditionTimeout);
});