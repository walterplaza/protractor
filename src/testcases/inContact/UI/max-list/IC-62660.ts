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
 * Suite: MAX suite
 * TC ID: IC-62660
 * Tested browser: - Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */
describe("MAX suite - IC-62660", function () {
    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;
    let darkColor: string = "#ffffff";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxSchedule: MaxSchedulePopUp;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62660 MAX Commitment UI verification.`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE)
    }, TestRunInfo.conditionTimeout);

    it('IC-62660 - MAX CommitmentUI verification', async () => {

        // Pre-Condition: Log into Central with OB phone skill.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agentOBPhone);
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);

        // 1. Open MAX Agent. Click on Schedule Button from MAX > Toolbar
        maxSchedule = await maxPage.openSchedulePopUp();

        // VP: My Schedule Popover must popup
        expect(await maxSchedule.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");

        // 2. Select the "+" next to My schedule
        await maxSchedule.openCommitmentPopup();

        // VP: Schedule a commitment screen displays
        expect(await maxSchedule.isCommitmentPopDisplayed()).toBe(true, "Schedule a commitment screen is not displayed");

        // VP: UI and styling is as expected by checking color Me button
        expect(await maxSchedule.getColorMeButtonSchedule()).toBe(darkColor, "UI and styling is not as expected");

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post Condition
            await maxSchedule.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) {
        } finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agentOBPhone, SkillType.OB_PHONE);
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});