import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437369
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62591', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62591 - MAX IB Phone Call`);
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.IB_EMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62591 - MAX IB Phone call', async () => {

        // Login InContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // Make an IB call
        await TestHelpers.startInboundCall(agent);

        // VP: Check IB call exist in queue
        expect(await maxPage.isContactInQueue(ContactName.PHONE_CALL)).toBe(true, "Inbound phone is not exists in queue");        

        // Set MAX agent state to available and wait for call workspace is displayed
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();

        // End IB phone contact
        await maxCall.endCallContact();

        // VP: No Other queues exist
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(false, "Inbound email incremented in queue");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out MAX
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.IB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});