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
 * Suite: SMOKE test
 * TC ID: 223341
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("SMOKE Test - IC-54782", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let ibPhoneNotReqAgent: Agent;
    let skillId: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-54782 - [MAX][Phone][HappyPath] Generate an IB Phone contact.`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(ibPhoneNotReqAgent, SkillType.IB_Phone);

        // Start an IB call from ibPhoneNotReqAgent user
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);

        // Central Login
        skillId = await TestHelpers.getSkillIdFromSkillName(ibPhoneAgent, SkillType.IB_Phone);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-54782 - MAX Phone HappyPath Generate an IB Phone contact', async () => {

        // Launch MAX
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // VP: Voice contact is in queue
        expect(await maxPage.isContactInQueue(ContactName.PHONE_CALL)).toBe(true, "Ib Phone contact is not in queue");

        // Change state
        await maxPage.changeState(MaxState.AVAILABLE);
        maxCall = await maxPage.waitForCallWorkspace();
        await maxCall.waitForCallDialling();

        // VP: Agent enter "Working" state and agent leg is connected
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.WORKING, "Agent status is not Working");
        expect(await maxPage.isAgentLegActive()).toBe(true, "Agent leg is not connected");

        // VP: Main controls of inbound call workspace exist
        expect(await maxPage.isIbPhoneIconDisplayed()).toBe(true, "IbPhone Icon is not displayed");
        expect(await maxCall.isToTalContactTimeDisplayed()).toBe(true, "ToTal Contact Time is not displayed");
        expect(await maxCall.isCustomerContactIconDisplayed()).toBe(true, "Customer Contact Icon is not displayed");
        expect(await maxCall.isCustomerContactLabelDisplayed()).toBe(true, "Customer Contact Label is not displayed");
        expect(await maxCall.isAniDisplayed()).toBe(true, "Ani is not displayed");
        expect(await maxCall.isHoldButtonDisplayed()).toBe(true, "Hold button is not displayed");
        expect(await maxCall.isMuteButtonDisplayed()).toBe(true, "Mute button is not displayed");
        expect(await maxCall.isMaskButtonDisplayed()).toBe(true, "Mask button is not displayed");
        expect(await maxCall.isRecordButtonDisplayed()).toBe(true, "Record button is not displayed");
        expect(await maxCall.isCommitButtonDisplayed()).toBe(true, "Commit button is not displayed");
        expect(await maxCall.isTransferContactButtonDisplayed()).toBe(true, "Transfer Contact button is not displayed");
        expect(await maxCall.isEndButtonDisplayed()).toBe(true, "End Contact button is not displayed");
        expect(await maxCall.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxCall.isKeyPadDisplayed()).toBe(true, "Key Pad is not displayed");
        expect(await maxCall.isSkillInfoDisplayed(SkillType.IB_Phone, skillId)).toBe(true, "Skill Name is not displayed");

        // Open Key Pad
        await maxCall.clickKeypad();

        // VP: DTMF buttons exist
        expect(await maxCall.isKeyDisplayed(1)).toBe(true, "Key 1 is not displayed");
        expect(await maxCall.isKeyDisplayed(2)).toBe(true, "Key 2 is not displayed");
        expect(await maxCall.isKeyDisplayed(3)).toBe(true, "Key 3 is not displayed");
        expect(await maxCall.isKeyDisplayed(4)).toBe(true, "Key 4 is not displayed");
        expect(await maxCall.isKeyDisplayed(5)).toBe(true, "Key 5 is not displayed");
        expect(await maxCall.isKeyDisplayed(6)).toBe(true, "Key 6 is not displayed");
        expect(await maxCall.isKeyDisplayed(7)).toBe(true, "Key 7 is not displayed");
        expect(await maxCall.isKeyDisplayed(8)).toBe(true, "Key 8 is not displayed");
        expect(await maxCall.isKeyDisplayed(9)).toBe(true, "Key 9 is not displayed");
        expect(await maxCall.isKeyDisplayed(0)).toBe(true, "Key 0 is not displayed");
        expect(await maxCall.isKeyDisplayed("*")).toBe(true, "Key * is not displayed");
        expect(await maxCall.isKeyDisplayed("#")).toBe(true, "Key # is not displayed");

        //Close Key Pad
        await maxCall.clickKeypad();

        // Open Transfer/Conference address book
        await maxCall.clickTransferConferenceButton();

        // VP: Transfer/Conference address book exist
        expect(await maxCall.isAddressBookDisplayed()).toBe(true, "Address book is not displayed");

        // Close Transfer/Conference address book
        await maxCall.closePopover();

        // Open Commitment panel
        await maxCall.clickCommitButton();

        // VP: Commitment panel exists
        expect(await maxCall.isCommitmentDisplayed()).toBe(true, "Commitment panel is not displayed");

        // Close Commitment panel
        await maxCall.closePopover();

        // Open Launch menu
        await maxCall.clickLaunchButton();

        // VP: Launch menu exists
        expect(await maxCall.isIndicatorDisplayed()).toBe(true, "Launch menu is not displayed");

        // Close Launch menu
        await maxCall.closePopover();

        // Hold call
        await maxCall.clickHoldButton();

        // VP: Agent can hold call
        expect(await maxCall.isCallHeld()).toBe(true, "Agent can not hold call");

        // Unhold call
        await maxCall.clickUnHoldButton();

        // VP: Agent can unhold call
        expect(await maxCall.isCallHeld(false)).toBe(true, "Agent can not unhold call");

        // Mute call
        await maxCall.clickMuteButton();

        // VP: Agent can mute call
        expect(await maxCall.isCallMuted()).toBe(true, "Agent can not mute call");

        // Unmute call
        await maxCall.clickUnMuteButton();

        // VP: Agent can unmute call
        expect(await maxCall.isCallMuted(false)).toBe(true, "Agent can not unmute call");

        // Mask call
        await maxCall.clickMaskButton();

        // VP: Agent can mask call
        expect(await maxCall.isCallMasked()).toBe(true, "Agent can not mask call");

        // Unmask call
        await maxCall.clickUnMaskButton();

        // VP: Agent can unmute call
        expect(await maxCall.isCallMasked(false)).toBe(true, "Agent can not unmask call");

        // Record call
        await maxCall.clickRecordButton();

        // VP: Agent can record call
        expect(await maxCall.isCallRecorded()).toBe(true, "Agent can not record call");

        // Hang up call
        await maxCall.clickEndContactButton();

        // VP: Agent can hang up call
        expect(await maxCall.isResumeButtonDisplayed()).toBe(true, "Resume button is not displayed");
        expect(await maxCall.isConfirmEndContactDisplayed()).toBe(true, "Confirm end button is not displayed");

        // End contact
        maxPage = await maxCall.clickConfirmEndContactButton();

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibPhoneNotReqAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});