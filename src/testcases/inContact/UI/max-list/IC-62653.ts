import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxVoiceMailPage from "@page-objects/inContact/max/max-voicemail";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";


/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 335685
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC311
 */

describe("MAX suite - IC-62653", function () {
    TestBase.scheduleTestBase();
    let multiSkillsReqAgent: Agent;
    let dispositionNote: string = "Test Automation";
    let voiceMailID: number = 0;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMail: MaxVoiceMailPage;
    let maxCall: MaxCall;
    let maxChat: MaxChatPage;
    let maxDispositionPage: MaxDispositionPage;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62653 - MAX > Chat Interactions > ACW > After expiration of ACW time, agent state should be changed to next state`);
        multiSkillsReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, true);
        await TestCondition.setUpAndAssignSkill(multiSkillsReqAgent, SkillType.VOICEMAIL, true);
        await TestCondition.setUpAndAssignSkill(multiSkillsReqAgent, SkillType.CHAT, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62653 - MAX Chat Interactions ACW After expiration of ACW time agent state should be changed to next state', async () => {

        // Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(multiSkillsReqAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(multiSkillsReqAgent.phoneNumber);

        // 3. Using the @skill skill send a contact to your agent
        await TestHelpers.startVoiceMail(multiSkillsReqAgent);
        voiceMailID = await TestHelpers.getSkillIdFromSkillName(multiSkillsReqAgent, SkillType.VOICEMAIL);
        await maxPage.changeState(MaxState.AVAILABLE);
        maxVoiceMail = await maxPage.waitForVoiceMailWorkspace();

        // VP: The @skill is sent in agent and the work space of contact is displayed.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL)).toBe(true, "Voice mail workspace is not displayed");

        // 4. End the  @skill contact 
        maxDispositionPage = await maxVoiceMail.endVoiceMailRequireDisposition();

        // VP: Verify the disposition dialog is shown automatically Confirm the New dialog is shown along with Tags, Etc,
        expect(await maxDispositionPage.isDispositionPanelDisplayed()).toBe(true, "Disposition controls is not displayed");

        // 5. Select a disposition and save the changes
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Verify the disposition dialog is closed automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The disposition dialog is not closed automatically.");

        await TestHelpers.startInboundCall(multiSkillsReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: The @skill is sent in agent and the work space of contact is displayed.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "Call workspace is not displayed");

        // 4. End the  @skill contact 
        maxDispositionPage = await maxCall.hangUpCallACW();

        // VP: Verify the disposition dialog is shown automatically Confirm the New dialog is shown along with Tags, Etc,
        expect(await maxDispositionPage.isDispositionPanelDisplayed()).toBe(true, "Disposition controls is not displayed");

        // 5. Select a disposition and save the changes
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Verify the disposition dialog is closed automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The disposition dialog is not closed automatically.");

        await TestHelpers.startChatContact(multiSkillsReqAgent);
        await maxPage.waitForNewContactPopUp();
        maxChat = await maxPage.acceptNewChatContact();

        // VP: The @skill is sent in agent and the work space of contact is displayed.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.CHAT)).toBe(true, "Chat workspace is not displayed");

        // 4. End the  @skill contact 
        maxDispositionPage = await maxChat.endChatRequireDisposition();

        // VP: Verify the disposition dialog is shown automatically Confirm the New dialog is shown along with Tags, Etc,

        expect(await maxDispositionPage.isDispositionPanelDisplayed()).toBe(true, "Disposition controls is not displayed");

        // 5. Select a disposition and save the changes
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Verify the disposition dialog is closed automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The disposition dialog is not closed automatically.");
    });

    afterEach(async () => {
        try {
            // Clean Up
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
                await TestCondition.setUpAndRemoveSkill(multiSkillsReqAgent, SkillType.VOICEMAIL);
                await TestCondition.setUpAndRemoveSkill(multiSkillsReqAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(multiSkillsReqAgent, SkillType.IB_Phone);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
