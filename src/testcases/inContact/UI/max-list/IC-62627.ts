import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392870
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62627", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let dispositionNote: string = "Test Automation";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62627 - Max Contacts get stuck in acw state - Voicemail - Required Dispo.`);
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL, true);

        // 1. PREREQ: User logged into Central.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it("IC-62627 - Max Contacts get stuck in acw state Voicemail Required Dispo", async () => {

        // Max running and Available with IB Voicemail Skill that has Required Disposition
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Run an inbound Voicemail Contact
        await TestHelpers.startVoiceMail(agent);
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Contact is delivered to MAX
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL)).toBe(true, "Voice mail workspace is not displayed");

        // 3. End contact
        maxDispositionPage = await maxVoiceMailPage.endVoiceMailRequireDisposition(false);

        // VP: Contact ends; disposition option presented
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // 4. Select a Disposition and Save the Dispo
        maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Connection window closes. Agent returns to Available.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL, TestRunInfo.shortTimeout)).toBe(false, "Voice mail workspace is still displayed.");
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Current agent status is not available.");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // MAX logout
            centralPage = await maxPage.logOut();

            // Logout central page
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.VOICEMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});