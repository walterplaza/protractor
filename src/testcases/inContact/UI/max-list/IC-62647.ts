import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import BusinessUnitDetailsPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369017
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62647', function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let expectedMaxCallTooltip = "Maximum number of simultaneous calls per Agent. Integer value in the Range (1-10). Default 7."

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let businessUnitDetailsPage: BusinessUnitDetailsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62647 - PC > Business Unit > Verify tooltip is displayed for "Maximum Wait Time to Consider" field in BU's Details page in Edit mode`);
        agent = await TestCondition.setUpAgent(SkillType.CONFIG)
        // 2. Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62647 - PC Business Unit Verify tooltip is displayed for Max of calls field in BU Details page in Edit mode', async () => {

        // 3. Go to Internal Admin > Business Units
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();

        // VP: Business Units page is displayed
        expect(await internalBusinessUnitPage.isPageDisplayed()).toBe(true, "Business Unit Page does not display");

        // 4. Locate and select your Business Unit
        businessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(agent.businessNumber);

        // 5. Press the Edit button
        await businessUnitDetailsPage.editBusinessDetail();

        // VP: Details page is displayed in edit mode
        expect(await businessUnitDetailsPage.isDetailsPageInEditMode()).toBe(true, "Details page is not in edit mode");

        // 6. Go to Outbound Strategy section and click "Enable Dialing By Proficiency" checkbox
        await businessUnitDetailsPage.selectEnableDialingByProficiency();

        // VP: "Enable Dialing By Proficiency" checkbox is checked.
        expect(await businessUnitDetailsPage.isEnableDialingByProficiencyChecked()).toBe(true, " Enable Dialing By Proficiency checkbox is not checked");

        // 7. Verify "Max # of calls" field is displayed 
        // VP: Verify tooltip is displayed when hovering the ? icon next to the "Max # of calls" label
        expect(await businessUnitDetailsPage.getMaxOfCallIconTooltip()).toBe(expectedMaxCallTooltip, "Max of Call tooltip does not displayed correctly");

        // Uncheck "Enable Dialing By Proficiency" checkbox
        await businessUnitDetailsPage.deselectEnableDialingByProficiency();

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up`);
        try {
            // Log out central
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.CONFIG);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



