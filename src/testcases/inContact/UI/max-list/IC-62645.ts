import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import { OutBoundCall } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import { default as BusinessUnitDetailsPage, default as DetailTabPage } from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import ParametersPage from "@page-objects/inContact/central/routing/skills/parameters-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369161
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62645', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let outBoundCall = new OutBoundCall();
    outBoundCall.initData();
    let numberMaxOfCall = Utility.getRandomNumber(2, 1, 10);
    let errorMsg: string = `The following error(s) occurred:Max # of Calls must be an Integer value in the range of 1 to 10.`;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;
    let skillListPage: SkillsListPage;
    let skillDetail: SkillsDetailPage;
    let ParametersTab: ParametersPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62645 - PC > Skill > General Settings > Verify "Max # of calls" accepts only integer values between 1 and 10`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('IC-62645 - PC Skill General Settings Verify Max of calls accepts only integer values between 1 and 10', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // 2. Personal Connection feature enabled in the BU
        // User with administrator privileges
        // "Enable Dialing By Proficiency" option enabled in the BU
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();

        // "Enable Dialing By Proficiency" option enabled in the BU
        await detailTabPage.selectEnableDialingByProficiency();
        await detailTabPage.saveBusinessDetail();

        // 3. Create Personal Connection Skill
        skillListPage = await detailTabPage.gotoSkillsListPage();
        skillDetail = await skillListPage.createPCSkillIfSkillNotExist(outBoundCall, SkillType.PC_PHONE);

        // 4. Go to Parameters tab
        ParametersTab = await skillDetail.gotoParametersTab();

        // VP: Parameters page is displayed
        expect(await ParametersTab.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Parameters page is not displayed");

        // 5. Press the Edit|Configure button of General Settings section
        await ParametersTab.clickingEditGeneralSettings();

        // VP: Skill's General Settings page is displayed
        expect(await ParametersTab.isGeneralSettingsDisplayed()).toBe(true, "Skill's General Settings page is not displayed");

        // 6. Go to General Pacing Settings section and click the "Enable Dialing By Proficiency" checkbox
        await ParametersTab.selectEnableDialingByProficiencyCheckbox();

        // VP: "Enable Dialing By Proficiency" checkbox is checked
        expect(await ParametersTab.isEnableDialingByProficiencyChecked()).toBe(true, "'Enable Dialing By Proficiency' checkbox is not checked");

        // 7. Enter any value between 1 and 10 in the "Max # of calls" textbox and press the Save button
        await ParametersTab.inputMaxOfCallTextbox(numberMaxOfCall);
        await ParametersTab.saveParametersTab();

        // VP: Verify the value is correctly saved with no error message.
        expect(await ParametersTab.isPageDisplayed()).toBe(true, "Verify the value is correctly saved with no error message.");

        // 8. Press the Edit|Configure button of General Settings section
        await ParametersTab.clickingEditGeneralSettings();

        // VP: Skill's General Settings page is displayed
        expect(await ParametersTab.isGeneralSettingsDisplayed()).toBe(true, "Skill's General Settings page is not displayed");

        // 9. Enter a value lower than 1 in the "Max # of calls" textbox and press the Save button
        await ParametersTab.inputMaxOfCallTextbox(0);
        await ParametersTab.saveParametersTab();

        // VP: Verify error message is displayed on top of the page:The following error(s) occurred: Max # of calls value must be between 1 and 10
        expect(await ParametersTab.getErrorMessage()).toBe(errorMsg, "Verify error message is not displayed on top of the page when enter a value lower than 1");

        // 10. Press the Edit|Configure button of General Settings section
        // 11. Enter a value higher than 10 in the "Max # of calls" textbox and press the Save button
        await ParametersTab.inputMaxOfCallTextbox(11);
        await ParametersTab.saveParametersTab();

        // VP: Verify error message is displayed on top of the page: The following error(s) occurred:Max # of calls value must be between 1 and 10
        expect(await ParametersTab.getErrorMessage()).toBe(errorMsg, "Verify error message is not displayed on top of the page when enter a value lower than 1");

        // 12. Press the Edit|Configure button of General Settings section
        // 13. Enter non integer value in the "Max # of calls" textbox and press the Save button
        await ParametersTab.inputMaxOfCallTextbox("ts");
        await ParametersTab.saveParametersTab();

        // VP: Verify error message is displayed on top of the page: The following error(s) occurred:Max # of calls value must be between 1 and 10
        expect(await ParametersTab.getErrorMessage()).toBe(errorMsg, "Verify error message is not displayed on top of the page when enter a value lower than 1");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            await ParametersTab.deselectEnableDialingByProficiencyCheckbox();
            await ParametersTab.saveParametersTab();
            internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
            detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber, false);
            detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
            await detailTabPage.deselectEnableDialingByProficiency();
            await detailTabPage.saveBusinessDetail();
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