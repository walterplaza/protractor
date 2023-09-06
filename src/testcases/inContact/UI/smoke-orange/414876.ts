import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import Dashboards from "@page-objects/inContact/central/reporting-analytics/dashboards/dashboards";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 414876
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: SC1
 * Note:
 * - Failed by ticket IC-70599 - [TestAutomation][inC-UI] Cannot delete dashboard on "Dashboard" page
 */

describe('SMOKE_Automated_Orange_OF - 414876', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent
    let dashboardsName: string = Utility.createRandomString(12, "lgvn_");

    //Declare page objects
    let loginPage : LoginPage
    let centralPage: CentralPage
    let dashboards: Dashboards

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `414876 - [SMOKE] Central > Reporting/Analytics > Dashboards > Smoke testing over Dashboards`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        // 1. Central credentials 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('414876 - SMOKE Central Reporting Analytics Dashboards Smoke testing over Dashboards', async () => {

        // 3. Go to Central > Reporting/Analytics > Dashboards
        dashboards = await centralPage.gotoDashBoards();

        // VP: Dashboards main page should be loaded
        expect(await dashboards.isDisplayed()).toBe(true, "Dashboards is not displayed");

        // 4. Click on Create New button
        await dashboards.clickCreateNewButton();

        // VP: Dashboard panel should be displayed.
        expect(await dashboards.isDashboardsPanelDisplayed()).toBe(true, "Dashboards Panel is not displayed");

        // 5. Drag and drop Agent Count By State widget
        await dashboards.addWidget("Agent Count By State");

        // VP: Agent Count by State widget should be on Dashboard panel.
        expect(await dashboards.isNewAgentCountWidgetDisplayed()).toBe(true, "New Agent Count by State widget is not displayed");

        // 6. Put a valid Dashboard Name on Dashboard name text field
        await dashboards.enterDashboardsName(dashboardsName);

        // VP: Dashboard name text filed should be filled.
        expect(await dashboards.getDashboardsName()).toBe(dashboardsName, "Dashboards name is not displayed correctly");

        // 7. Click on Save button
        await dashboards.clickSaveButton();

        // VP: Dashboard should be created
        expect(await dashboards.isAgentCountWidgetDisplayed()).toBe(true, "Agent Count by State widget is not displayed");

        // 8. Click on Edit button
        await dashboards.clickEditButton();

        // VP: Dashboard panel should be displayed on Edit mode. 
        expect(await dashboards.isDashboardsOnEditMode()).toBe(true, "Dashboards is not on Edit mode");

        // 9. Click on Delete button
        await dashboards.clickDeleteButton();

        // VP: Confirm Deletion popup should be displayed. 
        expect(await dashboards.isConfirmDeleteDialogDisplayed()).toBe(true, "Confirm Deletion popup is not displayed");

        // 10. Click on Yes button
        await dashboards.clickConfirmYesButton();

        // VP: Dashboard should be deleted.
        expect(await dashboards.isAgentCountWidgetDisplayed(5)).toBe(false, "Failed by ticket IC-70599 - [TestAutomation][inC-UI] Cannot delete dashboard on 'Dashboard' page: Agent Count by State widget is still displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try{   
        // Post-Condition: Delete file after uploading
        await dashboards.logOut();
        }
        catch (err){
        }
        finally{
        try{
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err){
        }
    }
    }, TestRunInfo.conditionTimeout);
});



