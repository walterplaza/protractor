import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactLabel, ContactName } from "@data-objects/general/max";
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
 * Suite: MAX suite
 * TC ID: 248678
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX suite - IC-62690", function () {

    TestBase.scheduleTestBase();
    let voiceMailAgent: Agent;
    let voiceMailName: string
    let voiceMailID: number;
    let numberQueue: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoicemailPage: MaxVoiceMailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62690 - MAX > Failover - Voicemail`);
        voiceMailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62690 - MAX Failover Voicemail', async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(voiceMailAgent);

        // 3. Launch MAX
        await voiceMailAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(voiceMailAgent.phoneNumber);

        // 4. Set Agent to Unavailable
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.UNAVAILABLE);
        // Get number of contact in queue
        numberQueue = await maxPage.getSkillQueue(ContactLabel.VOICE_MAIL);

        // VP: Agent Status is Unavailable 
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unavailable");

        // 5. Call the POC
        await TestHelpers.startVoiceMail(voiceMailAgent);

        // VP: Voicemail is routed to Agents Queue
        await maxPage.waitForQueueValue(ContactLabel.VOICE_MAIL, numberQueue + 1);
        expect(await maxPage.getSkillQueue(ContactLabel.VOICE_MAIL)).toBe(numberQueue + 1, "Voicemail is not routed to Agents Queue");

        // 6. Call the POC again
        await TestHelpers.startVoiceMail(voiceMailAgent);

        // VP: Voicemail is routed to Agents Queue let the voice mails sit in queue
        expect(await maxPage.isContactInQueue(ContactName.VOICE_MAIL)).toBe(true, "Voicemail is not routed to Agents Queue");

        // 7. Validate the Voicemail is in agents queue
        // VP: Voicemail in queue
        await maxPage.waitForQueueValue(ContactLabel.VOICE_MAIL, numberQueue + 2);
        expect(await maxPage.getSkillQueue(ContactLabel.VOICE_MAIL)).toBe(numberQueue + 2, "Voicemail is not routed to Agents Queue");

        // 9. Change the agent state to available
        await maxPage.changeState(MaxState.AVAILABLE);
        maxVoicemailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Voicemail is delivered to the agent
        expect(await maxVoicemailPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL)).toBe(true, "Voicemail is not routed to Agents Queue");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await maxVoicemailPage.endVoiceMailContact();
            await maxVoicemailPage.waitForVoiceMailWorkspace();
            await maxVoicemailPage.endVoiceMailContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(voiceMailAgent, SkillType.VOICEMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});