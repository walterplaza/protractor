
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
import CustomAPIs from "@apis/custom-apis";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 279417
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62666', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let obPhoneNo1: string = "4005150002";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62666 - [MAX] Ending Conference Call after Patron is dropped> Verify that all other functions in conference (transfer to agent, etc.) continue to work as designed`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62666 - MAX Ending Conference Call after Patron is dropped Verify that all other functions in conference continue to work as designed', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // Change state
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Place a Call and make a conference
        await maxPage.dialOutboundCall(obPhoneNo1, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: The call is in progress Transfer/Conf option should be available
        expect(await maxCall.isTransferContactButtonDisplayed()).toBe(true, "Transfer/Conf option is not available");

        // clicking on "Call" button
        await maxCall.callSecondContact(TestRunInfo.cluster.outboundNumber);

        // VP: Conference contact should be placed without exceptions
        expect(await maxCall.isConferenceOptionDisplayed()).toBe(true, "Transfer/Conf option is not available");

        // then on "Conference" button
        await maxCall.clickConference();

        // VP: Conference contact should be placed without exceptions
        expect(await maxCall.isConferenceModeActive()).toBe(true, "Conference mode is not active");

        // 4. Hang up the conference 
        await maxCall.endConference();

        // 5. Click transfer, and then click on "cold Transfer"  and wait until transfer is completed
        await maxCall.callSecondContact(TestRunInfo.cluster.outboundNumber);
        await maxCall.coldTransferConferenceCall();

        // VP: Conference is ended
        expect(await maxCall.isConferenceModeActive(TestRunInfo.shortTimeout)).toBe(false, "Conference mode is still active");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
            await CustomAPIs.endAllContacts(agent);
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
            }
            catch (err) {
                console.log(err);
            }
        }
    }, TestRunInfo.conditionTimeout);
});