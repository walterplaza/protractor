import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 399435
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62616', function () {
    TestBase.scheduleTestBase();
    let cluster: Cluster = TestRunInfo.cluster;
    let obPhoneNo1: string = '4005150002'
    let obPhoneNo2: string = '400515003';
    let obPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62616 - MCH > Omnichannel > Multi-party conference`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62616 - MCH Omnichannel Multi-party conference', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Dial an Outbound Contact
        await maxPage.dialOutboundCall(cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: The call is in progress Transfer/Conf option should be available
        expect(await maxCall.isTransferContactButtonDisplayed()).toBe(true, "Transfer/Conf option is not available");

        // 4. Select Transfer/Conf option and Dial another outbound contact and select Conference option is displayed
        await maxCall.callSecondContact(obPhoneNo1);

        // VP: Conference option should display
        expect(await maxCall.isConferenceOptionDisplayed()).toBe(true, "Transfer/Conf option is not available");

        // 5. Conference calls together
        await maxCall.clickConferenceWhileHolding();

        // 6. Dial a bad number for another outbound contact
        await maxCall.addContactConference(obPhoneNo2)
        await maxCall.clickAcceptErrorDialog();

        // VP: validate the agent is still in a working state
        await maxPage.showMaxGlance();
        expect(await maxPage.getAgentStatus()).toBe(MaxState.WORKING, "Agent status is not in working state");

        // End conference
        await maxPage.hideMaxGlance();
        await maxCall.endConference();

        // Hang up the call
        await maxCall.endCallContactConference();
     
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});