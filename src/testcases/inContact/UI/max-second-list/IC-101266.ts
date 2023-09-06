import { Agent } from "@data-objects/general/agent";
import { State } from "@data-objects/general/general";
import { SkillType, OutBoundCall } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import SecurityProfilesPage from "@page-objects/inContact/central/admin/security-profiles/security-profiles-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 369162 (Question 164)
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe('MAX suite - IC-101266', function () {
    // Declare Page object
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let securityProfilesPage: SecurityProfilesPage
    let outBoundCall = new OutBoundCall();
    outBoundCall.initData();
    let maxWaitTimeToConsider: number = 10;
    let profileName: string = Utility.createRandomString(13, "Test ");
    let errorMsg: string = `The following error(s) occurred:Maximum Wait Time to Consider must be an Integer value in the range of 0 to 999.`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101266 - PC Skill General Settings Verify Maximum Wait Time to Consider accepts only integer values between 0 and 999`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);

    }, TestRunInfo.conditionTimeout);

    it('IC-101266 - PC Skill General Settings Verify Maximum Wait Time to Consider accepts only integer values between 0 and 999', async () => {

        // Login inContact Central
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // Go to Security profiles and select a profile
        securityProfilesPage = await centralPage.goToSecurityProfilesPage();
        await securityProfilesPage.createSecurityProfile(profileName);
        await securityProfilesPage.goToSecurityProfilesPage();
        await securityProfilesPage.selectACustomSecurityProfiles("name", profileName)

        // Edit profile permission
        await securityProfilesPage.goToPermissionTab()
        await securityProfilesPage.editPermission();

        // Set on Edit,View of Dialing By Proficiency
        await securityProfilesPage.setEditDialingByProficiency(State.ON);
        await securityProfilesPage.setViewDialingByProficiency(State.ON)
        await securityProfilesPage.completeChanges();

        // 1. Enable Dialing by proficiency in Business Unit
        // Select a business unit
        let internalBusinessUnitPage = await securityProfilesPage.gotoInternalBusinessUnitPage();
        await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber);

        // Edit BU Details
        let businessDetailsPage = await internalBusinessUnitPage.gotoDetailsTab();
        await businessDetailsPage.editBusinessDetail();

        // Fill values
        await businessDetailsPage.selectEnableDialingByProficiency();
        await businessDetailsPage.fillInMailServer("Details", false);
        await businessDetailsPage.saveBusinessDetail();

        // 2.Select Personal Connection Skill
        let skillListPage = await internalBusinessUnitPage.gotoSkillsListPage();
        let skillDetailsPage = await skillListPage.createPCSkillIfSkillNotExist(outBoundCall, SkillType.PC_PHONE);

        // VP: Parameters page is displayed
        let parametersPage = await skillDetailsPage.gotoParametersTab();
        expect(await parametersPage.isPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Parameters page is not displayed");

        // 3. Press the Edit|Configure button of General Settings section
        await parametersPage.clickingEditGeneralSettings();

        // VP: Skill's General Settings page is displayed
        expect(await parametersPage.isGeneralSettingsDisplayed()).toBe(true, "Skill's General Settings page is not displayed");

        // 4. Go to General Pacing Settings section and click the "Enable Dialing By Proficiency" checkbox
        await parametersPage.selectEnableDialingByProficiencyCheckbox();

        // 5. Enter any value between 1 and 10 in the "MaximumWaitTimeToConsider" textbox and press the Save button
        await parametersPage.inputMaximumWaitTimeToConsiderTextbox(maxWaitTimeToConsider);
        await parametersPage.saveParametersTab();

        // VP: Verify the value is correctly saved with no error message.
        expect(await parametersPage.isPageDisplayed()).toBe(true, "The value is correctly saved with no error message.");
        expect(await parametersPage.isErrorMessageDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The error message is still display");
        expect(await parametersPage.isEditButtonDisplayed()).toBe(true, "The error message is not display after saving");

        // 6. Press the Edit|Configure button of General Settings section
        await parametersPage.clickingEditGeneralSettings();

        // VP: Skill's General Settings page is displayed
        expect(await parametersPage.isGeneralSettingsDisplayed()).toBe(true, "Skill's General Settings page is not displayed");

        // VP: Verify the value before is correctly saved
        expect(await parametersPage.getValueOfMaxWaitTimeToConsider()).toBe(maxWaitTimeToConsider, "The inputted value is not correct after saving");

        // 7. Enter a value lower than 1 in the "MaximumWaitTimeToConsider" textbox and press the Save button
        await parametersPage.inputMaximumWaitTimeToConsiderTextbox(-10);
        await parametersPage.saveParametersTab();

        // VP: Verify error message is displayed on top of the page:The following error(s) occurred: Max # of calls value must be between 1 and 10
        expect(await parametersPage.getErrorMessage()).toBe(errorMsg, "Error message is not displayed on top of the page when enter a value lower than 1");

        // VP: "Enable Dialing By Proficiency" checkbox is checked
        expect(await parametersPage.isEnableDialingByProficiencyChecked()).toBe(true, "'Enable Dialing By Proficiency' checkbox is not checked");

        // Set parameters back to default
        await parametersPage.inputMaximumWaitTimeToConsiderTextbox(maxWaitTimeToConsider);
        await parametersPage.deselectEnableDialingByProficiencyCheckbox();
        await parametersPage.saveParametersTab();

        // Go back to BU editing
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        await internalBusinessUnitPage.selectBusinessUnit(adminAgent.businessNumber, false);
        businessDetailsPage = await internalBusinessUnitPage.gotoDetailsTab();
        await businessDetailsPage.editBusinessDetail();

        // Return BU default values and save changes
        await businessDetailsPage.deselectEnableDialingByProficiency();
        await businessDetailsPage.saveBusinessDetail();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            securityProfilesPage = await centralPage.goToSecurityProfilesPage();
            await securityProfilesPage.selectACustomSecurityProfiles("name", profileName)
            await securityProfilesPage.deactivateSecurityProfile();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try { } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



