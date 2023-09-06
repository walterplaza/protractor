import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: Max Suite
 * TC ID: 318369
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("Max Suite - IC-62656", function () {

    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62656 - Max> Schedule Commitment> Look for + symbol`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(agentOBPhone);
    }, TestRunInfo.conditionTimeout);

    it('IC-62656 - Max Schedule Commitment Look for add symbol', async () => {

        // 2. Open MAX Agent. Click on Schedule Button from MAX > Toolbar
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);
        schedulePage = await maxPage.openSchedulePopUp();

        // VP: My Schedule Popover must popup, and there must be a visible '+' sign to add commitment.
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");
        expect(await schedulePage.isBtnAddScheduleDisplayed()).toBe(true, "Add button is not displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await schedulePage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agentOBPhone, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});