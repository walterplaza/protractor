import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import { default as BusinessUnitDetailsPage, default as DetailTabPage } from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369007
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe('MAX suite - IC-62648', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let numberMaxOfCall: number = Utility.getRandomNumber(2, 1, 10);
    let errorMsg: string = `The following error(s) occurred:Max # of Calls must be an Integer value in the range of 1 to 10.`;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62648 - PC > Business Unit > Verify "Max # of calls" accepts only integer values between 1 and 10`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('IC-62648 - PC Business Unit Verify Max of calls accepts only integer values between 1 and 10', async () => {

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

        // 7. Enter any value between 1 and 10 in the "Max # of calls" textbox and press the Save button
        await detailTabPage.inputMaxOfCallTextbox(numberMaxOfCall);
        await detailTabPage.saveBusinessDetail();

        // VP: Verify the value is correctly saved with no error message.
        expect(await detailTabPage.getMaxOfCallValue()).toBe(numberMaxOfCall, "The value of 'Max Of Call' is not correctly");

        // 8. Press the Edit button
        await detailBusinessUnitDetailsPage.editBusinessDetail();

        // VP: Details page is displayed in edit mode
        expect(await detailTabPage.isDetailsPageInEditMode()).toBe(true, "Details page is not displayed in edit mode");

        // 9. Enter a value lower than 1 in the "Max # of calls" textbox and press the Save button
        await detailTabPage.inputMaxOfCallTextbox(0);
        await detailTabPage.saveBusinessDetail();

        // VP: Verify error message is displayed on top of the page
        expect(await detailTabPage.verifyErrorMessage(errorMsg)).toBe(true, "Verify error message is not displayed on top of the page when enter a value lower than 1");

        // 10. Enter a value higher than 10 in the "Max # of calls" textbox and press the Save button
        await detailTabPage.inputMaxOfCallTextbox(11);
        await detailTabPage.saveBusinessDetail();

        // VP: Verify error message is displayed on top of the page
        expect(await detailTabPage.verifyErrorMessage(errorMsg)).toBe(true, "Verify error message is not displayed on top of the page when enter a value higher than 10");

        // 11. Enter non integer value in the "Max # of calls" textbox and press the Save button

        await detailTabPage.inputMaxOfCallTextbox("test");
        await detailTabPage.saveBusinessDetail();

        // VP: Verify error message is displayed on top of the page
        expect(await detailTabPage.verifyErrorMessage(errorMsg)).toBe(true, "Verify error message is not displayed on top of the page when enter non integer ");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
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