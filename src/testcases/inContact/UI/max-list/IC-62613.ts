import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TimeZone } from "@data-objects/general/time-zone";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 408286
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX Suite - IC-62613", function () {

    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;
    let systemTimeZone: TimeZone;
    let selectedTimZone: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62613 - MAX>Setting machine's time zone is the same MAX' time zone`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62613 - Setting machines time zone is the same MAX time zone', async () => {

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(agentOBPhone);

        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);

        // 4. Select Schedule from the tool bar
        schedulePage = await maxPage.openSchedulePopUp();

        // VP: My Schedule Popover must popup, and there must be a visible '+' sign to add commitment.
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");

        // 5. Select the "+" next to My schedule
        await schedulePage.openCommitmentPopup();

        // VP: 'Schedule a commitment' is displayed
        expect(await schedulePage.isCommitmentPopDisplayed()).toBe(true, "My Schedule POPOVER is not displayed");

        // 6. See the Time zone off-set  
        selectedTimZone = await schedulePage.getSelectedTimeZoneCommitment();
        systemTimeZone = Utility.getSystemTimeZone(true);

        // VP: Time Zone off-set is the same that the Time Zone on MAX
        expect(selectedTimZone).toBe(systemTimeZone.timeZone, "Time Zone off-set is not the same that the Time Zone on MAX");
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