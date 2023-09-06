import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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
 * Suite: SMOKE test
 * TC ID: 111205
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("SMOKE Test - IC-62692", function () {
    TestBase.scheduleTestBase();
    let voiceMailAgent: Agent;
    let voiceMailID: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;
    let maxTransferPage: MaxTransferPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62692 - [MAX][Voice Mail][HappyPath] Generate an IB Voice Mail contact.`);
        voiceMailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
        voiceMailID = await TestHelpers.getSkillIdFromSkillName(voiceMailAgent, SkillType.VOICEMAIL);
        await TestHelpers.startVoiceMail(voiceMailAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62692 - MAX Voice Mail HappyPath Generate an IB Voice Mail contact.', async () => {

        // 2. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(voiceMailAgent);
        maxPage = await centralPage.launchMAX(voiceMailAgent.phoneNumber);

        // VP: Voicemail contact is in queue
        expect(await maxPage.isContactInQueue(ContactName.VOICE_MAIL)).toBe(true, "Voice mail contact is not in queue");

        // 3. Set Agent state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: Glance displays agent state as Working with contact details
        // VP: Agent enter "Working" state and agent leg is connected
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();
        await maxVoiceMailPage.showMaxGlance();
        expect(await maxPage.getAgentStatus()).toBe(MaxState.WORKING, "Agent status doesn't change to Working");
        expect(await maxVoiceMailPage.isSkillInfoDisplayed(SkillType.VOICEMAIL, voiceMailID)).toBe(true, "Skill name is not displayed");
        await maxVoiceMailPage.hideMaxGlance();

        // VP: Main controls of voicemail workspace exist
        // VP: Control buttons: Back:10, Pause, Hold, Callback, Launch, Discard exist
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

        // 4. Open Launch menu
        await maxVoiceMailPage.openLaunchMenu();

        // VP: Launch menu exists
        expect(await maxVoiceMailPage.isLaunchMenuDisplayed()).toBe(true, "Launch menu is not displayed");

        // 5. Close Launch menu
        await maxVoiceMailPage.closePopover();

        // 6. Open Callback menu
        await maxVoiceMailPage.openCallbackMenu();

        // VP: Agent can Callback
        expect(await maxVoiceMailPage.isCallBackMenuDisplayed()).toBe(true, "Callback menu is not displayed");

        // VP: Callback opens Callback form, Number to be called, skill to use, and Call button to place call
        expect(await maxVoiceMailPage.isCallbackPhoneNumberDisplayed()).toBe(true, "Phone number is not displayed in Callback menu");
        expect(await maxVoiceMailPage.isCallbackSkillListDisplayed()).toBe(true, "Skill list is not displayed in Callback menu");
        expect(await maxVoiceMailPage.isCallbackCallButtonDisplayed()).toBe(true, "Call button is not displayed in Callback menu");

        // 7. Close Callback menu
        await maxVoiceMailPage.closePopover();

        // 8. Open New Commitment popup
        await maxVoiceMailPage.openLaunchMenu();
        await maxVoiceMailPage.openNewCommitment();

        // VP: New Commitment and Transfer; 
        // VP: New Commitment opens commitment form, 
        expect(await maxVoiceMailPage.isCommitmentPopupDisplayed()).toBe(true, "Schedule a commitment popup is not displayed");
        await maxVoiceMailPage.closePopover();

        // 9. Open Transfer popup
        await maxVoiceMailPage.openLaunchMenu();
        maxTransferPage = await maxVoiceMailPage.openTransfer();

        // VP:transfer opens address book
        expect(await maxTransferPage.isAddressBookDisplayed()).toBe(true, "Transfer popup is not displayed");

        // 10: Close Transfer popup
        await maxVoiceMailPage.closePopover();

        // 10. End contact
        maxPage = await maxVoiceMailPage.endVoiceMailContact(false);

        // VP: The contact is ended
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.VOICE_MAIL, 5)).toBe(false, "The contact is not ended");
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
                await TestCondition.setAgentSkillsToDefault(voiceMailAgent, SkillType.VOICEMAIL);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});