import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 421434
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-62603", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62603 - [MAX]Save close appears up contact end`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);

        // Make IBPhone Call
        await TestHelpers.startInboundCall(ibPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62603 - MAX Save close appears up contact end', async () => {

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 1. Launch MAX
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // VP: Voice contact is in queue
        expect(await maxPage.isContactInQueue(ContactName.PHONE_CALL)).toBe(true, "Ib Phone contact is not in queue");

        // 2. Change state
        await maxPage.changeState(MaxState.AVAILABLE);
        let maxCall: MaxCall = await maxPage.waitForCallWorkspace();

        // 3. End contact
        await maxCall.endCallContact();

        // VP button save and close does not appear
        expect(await maxCall.isSaveCloseButtonDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Save and close button is displayed");


    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});