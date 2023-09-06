import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, OtherItem, TransferTab } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxTransferPage from "@page-objects/inContact/max/max-transfer-page";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 433739
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe("MAX suite - IC-62594", function () {

    TestBase.scheduleTestBase();
    let voicemailAgent: Agent;
    let skillTransfer: string;
    let centralPage: CentralPage;
    let loginPage: LoginPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;
    let maxTransferPage: MaxTransferPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62594 - [MAX] Transfer to skills`);
        voicemailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
    }, TestRunInfo.conditionTimeout);

    it('IC-62594 - MAX Transfer to skills', async () => {

        // 1. Launch MAX
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(voicemailAgent);
        maxPage = await centralPage.launchMAX(voicemailAgent.phoneNumber);

        // 2. Send your agent a voice mail  
        await TestHelpers.startVoiceMail(voicemailAgent);
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();

        // VP: Voice mail is created and accepted 
        expect(await maxVoiceMailPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL)).toBe(true, "Voice mail isn't created and accepted ");

        // 3. Click the Launch button 
        await maxVoiceMailPage.openLaunchMenu();

        // VP: The Launch drop down is shown 
        expect(await maxVoiceMailPage.isLaunchMenuDisplayed()).toBe(true, "Launch menu is not displayed");

        // 4. Click Transfer > Other Tab > Skills
        maxTransferPage = await maxVoiceMailPage.openTransfer();
        await maxTransferPage.selectTransferTab(TransferTab.OTHER);
        await maxTransferPage.selectOtherTabItem(OtherItem.SKILLS);

        // VP:  The list of available skills is shown
        expect(await maxTransferPage.isAvailableSkillListDisplays()).toBe(true, "The list of available skills isn't shown")

        // 5. Select a Skill and cold transfer the vm
        skillTransfer = await maxVoiceMailPage.getSkillNameTransfer(voicemailAgent, ContactName.VOICE_MAIL);
        await maxTransferPage.makeColdTransfer(skillTransfer);
        await maxVoiceMailPage.waitForMAXVoicemailDisappear();

        // VP: The VM is transferred to the skill 
        expect(await maxVoiceMailPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL, TestRunInfo.shortTimeout)).toBe(false, "The VM is transferred to the skill");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout MAX
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(voicemailAgent, SkillType.VOICEMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});