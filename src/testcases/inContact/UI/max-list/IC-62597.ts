import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: Max suite
 * TC ID: 426866
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("Max Suite - IC-62597", function () {
    TestBase.scheduleTestBase();
    let voicemailAgent: Agent;
    let voiceMailID: number

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62597 - Voice mails appear cut off.`);
        voicemailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL)

    }, TestRunInfo.conditionTimeout);

    it('IC-62597 - MAX Voice mail appears cut off.', async () => {

        // Pre-Condition
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(voicemailAgent);
        maxPage = await centralPage.launchMAX(voicemailAgent.phoneNumber);
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);

        // 1. Route VM to agent.
        await TestHelpers.startVoiceMail(voicemailAgent);

        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Control buttons: Back:10, Pause, Hold, Callback, Launch, Discard exist. In order check mo missing info
        expect(await maxVoiceMailPage.isBackButtonDisplayed()).toBe(true, "Back button is not displayed");
        expect(await maxVoiceMailPage.isHoldButtonDisplayed()).toBe(true, "Hold button is not displayed");
        expect(await maxVoiceMailPage.isCallBackButtonDisplayed()).toBe(true, "Call Back button is not displayed");
        expect(await maxVoiceMailPage.isEndButtonDisplayed()).toBe(true, "End button is not displayed");
        expect(await maxVoiceMailPage.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxVoiceMailPage.isContactTimeLabelDisplayed()).toBe(true, "Contact time is not displayed");
        expect(await maxVoiceMailPage.isCustomerNameLabelDisplayed()).toBe(true, "Customer name is not displayed");
        expect(await maxVoiceMailPage.isStartTimeLabelDisplayed()).toBe(true, "Start time is not displayed");
        expect(await maxVoiceMailPage.isEndTimeLabelDisplayed()).toBe(true, "End time is not displayed");
        expect(await maxVoiceMailPage.isVMCustomerContactIconDisplayed()).toBe(true, "VM Customer contact icon is not displayed");

        // VP: Verify the right side of the VM is not cut  off
        expect(await maxVoiceMailPage.isVoiceMailWorkSpaceCutOff()).toBe(false, "Voice Mail Work Space is cut off");

        // End contact
        maxPage = await maxVoiceMailPage.endVoiceMailContact(false);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-Condition
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) {
        } finally {
            try {
                await TestCondition.setAgentSkillsToDefault(voicemailAgent, SkillType.VOICEMAIL);
            } catch (err) {
            }
        }

    }, TestRunInfo.conditionTimeout);
});
