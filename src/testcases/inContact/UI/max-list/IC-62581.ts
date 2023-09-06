import { Agent } from "@data-objects/general/agent";
import { MaxConnectOption } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: IC-62581 
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62581 ", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let validationMessage: string = "Invalid Station or Phone Number"
    let colorMessage: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62581 - US 435866-Max Agent-Validate Phone Number field in 'Phone Number or Station ID' pop up is able to accept only  maximum of 30 characters`);
        obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62581 - Validate Phone Number field in Phone Number or Station ID', async () => {

        // 1. Login to Max Agent
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Click on Launch agent option on the left panel
        // 3. Enter 31 characters in "Phone Number" field in mixed combination as below:@"^(\+[0-9])?([0-9\*#]{0,28})$"
        obPhoneAgent.phoneNumber = "+199903701234567890004*1234567 / 99903701234567890004*123456";

        // Workaround for smoke deploy gbu 
        if (!await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            await centralPage.launchMAXWithError(obPhoneAgent.phoneNumber, MaxConnectOption.PHONE);

            // VP: Field is highlighted in red
            colorMessage = await centralPage.getColorErrorMessage();
            expect(colorMessage).toBe("red", "Field is not highlighted in red")

            // 4. Hover over the field and verify the following tooltip is displayed:
            // VP: "Please enter only + (at the beginning), digits, *, #, maximum 28 symbols.". The mentioned tool tip is displayed
            expect(await centralPage.getErrorMessage()).toBe(validationMessage, "The mentioned tool tip is not displayed")

            // 5. Enter characters up to 30 in mixed combination as below in "Phone Number" field
            obPhoneAgent.phoneNumber = "+199903701234567890004*1234567";
            await centralPage.openAgentSession();
            await centralPage.fillAgentSession(obPhoneAgent.phoneNumber, MaxConnectOption.PHONE);

            // VP: All 30 characters are displayed and are not hidden
            expect(await centralPage.getEnteredPhone()).toBe(obPhoneAgent.phoneNumber, "All 30 characters are displayed and are not hidden");

            // 6. Select "Max Agent" radio button and click on "Continue" button
            maxPage = await centralPage.clickContinueButton();

            // VP: Max agent is launched successfully
            expect(await maxPage.isPageDisplayed()).toBe(true, "Max agent is not launched successfully");
        }

        // Workaround for MAX internal gbu 
        else if (await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            maxPage = await centralPage.launchMAXWithErrorNewBU(obPhoneAgent.phoneNumber);

            // VP: Field is highlighted in red
            expect(await maxPage.isMAXColorErrorMessageRed()).toBe(true, "Field is not highlighted in red")

            // 4. Hover over the field and verify the following tooltip is displayed:
            // VP: "Please enter only + (at the beginning), digits, *, #, maximum 28 symbols.". The mentioned tool tip is displayed
            expect(await maxPage.getMAXErrorMessage()).toBe(validationMessage, "Failed by ticket IC-93653 [TestAutomation][inC-UI] Validation error of phone number is displayed incorrect.")

            // 5. Enter characters up to 30 in mixed combination as below in "Phone Number" field
            obPhoneAgent.phoneNumber = "+199903701234567890004*1234567";
            await maxPage.fillAgentSession(obPhoneAgent.phoneNumber, MaxConnectOption.PHONE);

            // VP: All 30 characters are displayed and are not hidden
            expect(await maxPage.getEnteredPhone()).toBe(obPhoneAgent.phoneNumber, "All 30 characters are displayed and are not hidden");

            // 6. Select "Max Agent" radio button and click on "Continue" button
            await maxPage.clickContinueButton();

            // VP: Max agent is launched successfully
            expect(await maxPage.isPageDisplayed()).toBe(true, "Max agent is not launched successfully");
        }
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});
