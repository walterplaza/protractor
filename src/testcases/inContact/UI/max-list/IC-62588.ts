import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";


/** 
 * Type: inContact
 * Suite: Max Suite
 * TC ID: 437375
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX Suite - IC-62588", function () {
    TestBase.scheduleTestBase();
    let ibAgent: Agent;
    let personalQueue: string = "PersonalQueue";
    let comingUp: string = "ComingUp";
    let callHistory: string = "CallHistory";

    // Declare page object
    let maxPage: MaxPage
    let loginPage: LoginPage;
    let centralPage: CentralPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62588 - MAX Main Panel elements Call History No recent calls.`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout)

    it('IC-62588 - MAX Main Panel elements Call History No recent calls.', async () => {
       
        // 1. Central login 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);

        // VP  Check Headers: Personal Queue, Coming Up, Call History
        expect(await maxPage.isHeaderDisplayed(personalQueue)).toBe(true, "Personal Queue Header appears on MaxGlance")
        expect(await maxPage.isHeaderDisplayed(comingUp)).toBe(true, "Coming Up Header appears on MaxGlance")
        expect(await maxPage.isHeaderDisplayed(callHistory)).toBe(true, "Call History Header appears on MaxGlance")

        // VP Verify no recent call in history
        expect(await maxPage.isNoRecentCall()).toBe(true, "Recent call is in history")
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) {
        } finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibAgent, SkillType.IB_Phone);
            } catch (err) {

            }
        }

    }, TestRunInfo.conditionTimeout);
});