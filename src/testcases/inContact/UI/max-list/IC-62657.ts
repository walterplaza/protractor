import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 301968
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe("MAX suite - IC-62657", function () {
    TestBase.scheduleTestBase();
    let ibPhoneNotReqAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62657 - MAX > After Call Work > Disposition not required > Timer`);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, false, true);

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneNotReqAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62657 - MAX After Call Work Disposition not required Timer', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(ibPhoneNotReqAgent.phoneNumber);
        await maxPage.connectAgentLeg();

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
      
        // 3. Complete a contact
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
     
        // VP: A contact has been initiated and ended
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "The call contact is not routed to Agent")
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form is not displayed")

        // 4. Agent State changes to ACW orange/red 
        // VP: Agent state is displayed for the appropriate state set in contact skill.
        expect(await maxCall.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent state is not change to Available");
        expect(await maxCall.getMAXNextOutState()).toBe(MaxState.ACW, "Agent out state is not acw");

        // 5. Hover over MAX glance
        await maxCall.showMaxGlance();

        // VP: Glance view displays
        expect(await maxCall.isMaxGlanceOpened()).toBe(true, "Max glance isn't opened");

        // 6. Verify UI is as expected. No disposition timer is displayed for contacts that have no required disposition
        // VP: UI is as described
        expect(await maxCall.isDispositionTimeDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition timer is displayed for contacts that have no required disposition")

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});

