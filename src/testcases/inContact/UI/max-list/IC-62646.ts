import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import { default as BusinessUnitDetailsPage, default as DetailTabPage } from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369018
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62646', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62646 - PC > Business Unit > Verify tooltip is displayed for "Maximum Wait Time to Consider" field in BU's Details page in Edit mode`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('IC-62646 - PC Business Unit Verify tooltip is displayed for Maximum Wait Time to Consider field in BUs Details page in Edit mode', async () => {

        // 2. Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // 3. Go to Internal Admin > Business Units
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();

        // VP: Business Units page is displayed
        expect(await internalBusinessUnitPage.isPageDisplayed()).toBe(true, "Business Units page is not displayed");

        // 4. Locate and select your Buisines Unit
        detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);

        // VP: Business Unit's Details page is displayed
        expect(await detailBusinessUnitDetailsPage.isDetailTabPageDisplayed()).toBe(true, "Business Unit's Details page is not displayed");

        // 5. Press the Edit button
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();

        // VP: Details page is displayed in edit mode
        expect(await detailTabPage.isDetailsPageInEditMode()).toBe(true, "Details page is not displayed in edit mode");

        // 6. Go to Outbound Strategy section and click "Enable Dialing By Proficiency" checkbox
        await detailTabPage.selectEnableDialingByProficiency();

        // VP: "Enable Dialing By Proficiency" checkbox is checked
        expect(await detailTabPage.isEnableDialingByProficiencyChecked()).toBe(true, "'Enable Dialing By Proficiency' checkbox is not checked");

        // 7. Verify "Maximum Wait Time to Consider" field is displayed
        expect(await detailTabPage.isMaximumWaitTimeTextBoxDisplayed()).toBe(true, "'Maximum Wait Time to Consider' field is not displayed");

        // VP: Verify tooltip is displayed when hovering the ? icon next to the "Maximum Wait Time to Consider" label
        expect(await detailTabPage.isMaximumWaitTimeIconTooltipDisplayed()).toBe(true, "Tooltip is not displayed");


    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            await detailTabPage.deselectEnableDialingByProficiency();
            await detailTabPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(adminAgent, SkillType.CONFIG);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});