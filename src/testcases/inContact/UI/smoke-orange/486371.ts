import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import { default as BusinessUnitDetailsPage, default as DetailTabPage } from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import Dashboards from "@page-objects/inContact/central/reporting-analytics/dashboards/dashboards";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 486371
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: HC17
 */

describe('SMOKE_Automated_Orange_OF - 486371', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let workItemAgent: Agent;
    let itemName: string;
    let itemSelect: string;
    let widgetName: string = "Outbound Agent Performance";
    let dashboardsName: string = Utility.createRandomString(12, "lgvn_");

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let dashboards: Dashboards;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `486371 - Central Blue > Reporting/Analytics > Dashboards > Happy path testing over Dashboards`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
        await detailTabPage.changeUserInterfaceTheme("V2 Modern (Blue)");
        await detailTabPage.saveBusinessDetail();
        await detailTabPage.logOutBlueTheme();
    }, TestRunInfo.conditionTimeout);

    it('486371 - Central Blue Reporting/Analytics Dashboards Happy path testing over Dashboards', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 2. Go to Reporting/Analytics > Dash Board
        dashboards = await centralPage.gotoDashBoards();

        // VP: Dashboards main page should be loaded
        expect(await dashboards.isDisplayed()).toBe(true, "Dashboards main page is not loaded");

        // 3. In Home page click on Create New button
        await dashboards.clickCreateNewButton();

        // VP: Dashboards should be displayed on Real Time tab
        expect(await dashboards.isRealTimeTabSelected()).toBe(true, "Dashboards is not displayed on Real Time tab");

        // 4. Enter a Dashboard Name into the Dashboard textbox
        await dashboards.enterDashboardsName(dashboardsName);

        // VP: Dashboard Name should be displayed
        expect(await dashboards.getDashboardsName()).toBe(dashboardsName, "Dashboard Name is not displayed");

        // 5. Double click the next widgets : Outbound Agent Performance
        await dashboards.addWidget(widgetName);

        // VP: Outbound Agent Performance should be rendered in the dashboard view area
        expect(await dashboards.isWidgetDisplayed(widgetName)).toBe(true, "Outbound Agent Performance is not rendered in the dashboard view area");

        // 6. Click on the gear icon
        await dashboards.clickGearIcon();

        // VP: Properties is displayed
        expect(await dashboards.isPropertiesDialogDisplayed()).toBe(true, "Properties is not displayed");

        // 7. Go to Agents or Campaings or teams and select just one
        await dashboards.selectComponentTab("Agents");
        itemName = await dashboards.selectOneItemInListAvailable();

        // VP: One item should be selected
        expect(await dashboards.isItemSelected(itemName)).toBe(true, "Item is not selected");

        // 8. click on the > icon
        await dashboards.clickMoveRightButton();
        itemSelect = await dashboards.getItemInListSelect();

        // VP: Selected item in the left side should be moved to the right panel
        expect(await dashboards.getItemInListSelect()).toBe(itemSelect, "Selected item in the left side is not moved to the right panel");

        // 9. Click on Save button
        await dashboards.clickApplyButton();
        await dashboards.clickGearIcon();

        // VP: Properties should be saved
        expect(await dashboards.getItemInListSelect()).toBe(itemSelect, "Properties is not saved");

        // 10. Click cancel component editor button
        await dashboards.clickCancelButton();

        // 11. Click on Save button
        await dashboards.clickSaveButton();

        // VP: Dashboard with the selected widgets should be saved
        expect(await dashboards.getDashboardSelected()).toBe(dashboardsName, "Dashboard is not selected");
        expect(await dashboards.isWidgetDisplayed(widgetName)).toBe(true, "Widgets is not saved");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await dashboards.clickEditButton();
            await dashboards.clickDeleteButton();
            await dashboards.clickConfirmYesButton();
            await dashboards.logOutBlueTheme();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                loginPage = LoginPage.getInstance();
                centralPage = await loginPage.loginInContact(adminAgent);
                internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
                detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);
                detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
                await detailTabPage.changeUserInterfaceTheme("Use Default");
                await detailTabPage.saveBusinessDetail();
                await detailTabPage.logOutBlueTheme();
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});