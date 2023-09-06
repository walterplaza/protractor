import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";


/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 421639
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC311
 */

describe("MAX suite - IC-62602", function () {
    TestBase.scheduleTestBase();
    let obPhoneReqAgent: Agent;
    let dispositionNote: string = "Test Automation";
    let obPhone1: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62602 - MAX>PC>Disposition> Verify the Disposition controls are displayed in PC call.`);
        obPhoneReqAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62602 - MAX PC Disposition Verify the Disposition controls are displayed in PC call', async () => {

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneReqAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneReqAgent.phoneNumber);

        // 3 .In "Agent State Area" select the PC Skill requested in requirements
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.clickNew();
        maxCall = await maxPage.makeOutboundCall(obPhone1, SkillType.OB_PHONE);

        // 4. The first call arrive in your Agent. 
        await maxCall.waitForCallWorkspace();

        // VP: The agent has the "Working" status and it is using the PC Skill
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.WORKING, "Agent status is not Working");

        // VP: Verify the OB Phone workspace is displayed and the Disposition controls are displayed.
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(true, "OB Phone workspace is not displayed");

        // 5. Hang up the call
        maxDispositionPage = await maxCall.hangUpCallACW();

        // VP: Verify the counter of disposition is displayed and the Disposition controls are displayed.
        expect(await maxCall.isDispositionDisplayed()).toBe(true, "Disposition controls is not displayed");
        expect(await maxCall.isDispositionTimeDisplayed()).toBe(true, "Disposition Time controls is not displayed");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // Clean up
            await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneReqAgent, SkillType.OB_PHONE);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});