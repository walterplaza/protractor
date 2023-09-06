import { Agent } from "@data-objects/general/agent";
import { MaxConnectOption } from "@data-objects/general/cluster";
import { ToolbarButton } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 443013 
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62580", function () {
    TestBase.scheduleTestBase();
    let agent1: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxMoreToolPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, "IC-62580 - US 435866 - Max Agent - Validate Phone Number is displayed correctly under Agent Leg 'Information' pop up");
        agent1 = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it("IC-62580 - Max Agent Validate Phone Number is displayed correctly under Agent Leg 'Information' pop up", async () => {

        // 1. Login to Max Agent application with valid credentials
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent1);

        // VP: Logged in successfully and Home page is displayed
        expect(await centralPage.isPageDisplayed()).toBe(true, "Home page isn't displayed");

        // Workaround for smoke deploy gbu
        if (!await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            // 2. Click on Launch agent option on the left panel
            await centralPage.openAgentSession();

            // VP: Phone Number or Station ID' pop up is displayed
            expect(await centralPage.isAgentSessionFormDisplayed()).toBe(true, "Phone Number or Station ID' pop up isn't displayed");

            // 3. Enter characters upto 30 in mixed combination as below in "Phone Number" field @"^(\+[0-9])?([0-9\*#]{0,28})$"
            // VP: Field should accept 30 characters and no error tool tip is displayed
            agent1.phoneNumber = "+199903701234567890004*1234567";
            await centralPage.fillAgentSession(agent1.phoneNumber, MaxConnectOption.PHONE);

            // 4. Verify all 30 characters are visible in the 'Phone Number" field and is not hidden
            // VP: All 30 characters are displayed and are not hidden
            expect(await centralPage.getEnteredPhone()).toBe(agent1.phoneNumber, "All 30 characters are displayed and are not hidden");

            // 5. Select "Max Agent" radio button and click on "Continue" button
            maxPage = await centralPage.clickContinueButton();

            // VP: Max agent is launched successfully
            expect(await maxPage.isPageDisplayed()).toBe(true, "Max agent isn't launched successfully");

            // 6. Click on 'More' icon at the bottom of the screen
            maxMoreToolPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

            // VP: More Tools' pop up is displayed
            expect(await maxMoreToolPage.isMoreToolsPanelDisplayed()).toBe(true, "More Tools' pop up isn't displayed");

            // 7. Click on 'Information' option
            maxMoreToolPage = await maxMoreToolPage.goToMoreInformation();

            // VP: Information' pop up is displayed
            expect(await maxMoreToolPage.isInformationPanelDisplayed()).toBe(true, "Information' pop up is displayed");

            // 8. Verify 'Phone Number' is displayed correctly and completely and none of the characters should be hidden
            // VP: Phone number is displayed correctly and completely
            expect(await maxMoreToolPage.getAgentPhoneNumber()).toBe(agent1.phoneNumber, "Phone number isn't displayed correctly and completely");
        }

        // Workaround for MAX internal gbu
        else if (await centralPage.isUsingBlueTheme(TestRunInfo.shortTimeout)) {
            // 2. Click on Launch agent option on the left panel
            maxPage = await centralPage.openAgentSession();

            // VP: Phone Number or Station ID' pop up is displayed
            expect(await maxPage.isAgentSessionFormDisplayedNewBU()).toBe(true, "Phone Number or Station ID' pop up isn't displayed");

            // 3. Enter characters upto 30 in mixed combination as below in "Phone Number" field @"^(\+[0-9])?([0-9\*#]{0,28})$"
            // VP: Field should accept 30 characters and no error tool tip is displayed
            agent1.phoneNumber = "+199903701234567890004*1234567";
            await maxPage.fillAgentSession(agent1.phoneNumber, MaxConnectOption.PHONE);

            // 4. Verify all 30 characters are visible in the 'Phone Number" field and is not hidden
            // VP: All 30 characters are displayed and are not hidden
            expect(await maxPage.getEnteredPhone()).toBe(agent1.phoneNumber, "All 30 characters are displayed and are not hidden");

            // 5. Select "Max Agent" radio button and click on "Continue" button
            await maxPage.clickContinueButton();

            // VP: Max agent is launched successfully
            expect(await maxPage.isPageDisplayed()).toBe(true, "Max agent isn't launched successfully");

            // 6. Click on 'More' icon at the bottom of the screen
            maxMoreToolPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

            // VP: More Tools' pop up is displayed
            expect(await maxMoreToolPage.isMoreToolsPanelDisplayed()).toBe(true, "More Tools' pop up isn't displayed");

            // 7. Click on 'Information' option
            maxMoreToolPage = await maxMoreToolPage.goToMoreInformation();

            // VP: Information' pop up is displayed
            expect(await maxMoreToolPage.isInformationPanelDisplayed()).toBe(true, "Information' pop up is displayed");

            // 8. Verify 'Phone Number' is displayed correctly and completely and none of the characters should be hidden
            // VP: Phone number is displayed correctly and completely
            expect(await maxMoreToolPage.getAgentPhoneNumber()).toBe(agent1.phoneNumber, "Phone number isn't displayed correctly and completely");
        }
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages
            await maxPage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent1, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});