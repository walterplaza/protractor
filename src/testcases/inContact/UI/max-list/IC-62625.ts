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
 * TC ID: 392875
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4, SC11
 */

describe("MAX suite - IC-62625", function () {
    TestBase.scheduleTestBase();
    let agent: Agent;
    let dispositionNote: string = "Test Automation";
    let voiceMailID: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62625 - Max Contacts get stuck in acw state - Voicemail - Non-Required Dispo.`);
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL, false, true);

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it("IC-62625 - Max Contacts get stuck in acw state Voicemail NonRequired Dispo", async () => {

        // 1. Launch MAX, set MAX agent state available
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);

        // 2. Run an inbound Voicemail Contact.
        await TestHelpers.startVoiceMail(agent);
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Check voice mail workspace section exists inC-UI
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL, TestRunInfo.shortTimeout)).toBe(true, "Voice mail workspace is not displayed.");

        // 3. End voice mail on MAX inC-UI
        maxDispositionPage = await maxVoiceMailPage.endVoiceMailRequireDisposition(false);

        // VP: Check disposition window exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed");

        // 4. Fill the Disposition requiered fields and click 'Save & Close' button
        maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Check disposition window not exists inC-UI
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Disposition window is still displayed");

        // VP: Check current agent status is available
        expect(await maxPage.getAgentStatus(TestRunInfo.middleTimeout) == MaxState.AVAILABLE).toBe(true, "Current agent status is not available.");

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