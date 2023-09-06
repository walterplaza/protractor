import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, MaxConnectOption } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import BusinessUnitDetailsPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import FeatureTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE Test
 * TC ID: 288878
 * Tested browser: -
 * Tested OS: Windows 10
 * Tested cluster: -
 * Note:
 * - Blocked by ticket IC-30149: Failed to login to the Sonus gateway when using softphone
 */

describe("SMOKE Test - IC-62707", function () {

    TestBase.scheduleTestBase();
    let admin: Agent;
    let obPhoneAgent: Agent;
    let outboundPhoneNumber: string = "4000015000";
    let skillId: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let internalBusinessUnitPage: InternalBusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let featureTabPage: FeatureTabPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62707 - [MAX][SoftPhone][HappyPath] Verify that we can open MAX using sofphone and generate a contact`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        admin = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout)

    it('IC-62707 - MAX SoftPhone HappyPath Verify that we can open MAX using sofphone and generate a contact', async () => {

        // Pre-condition
        // Enable Soft phone Feature
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(admin);
        internalBusinessUnitPage = await centralPage.gotoInternalBusinessUnitPage();
        detailBusinessUnitDetailsPage = await internalBusinessUnitPage.selectBusinessUnit(admin.businessNumber);
        featureTabPage = await detailBusinessUnitDetailsPage.gotoFeatureTab();
        detailBusinessUnitDetailsPage = await featureTabPage.setSoftPhoneIntegrated(true);
        loginPage = await detailBusinessUnitDetailsPage.logOut();

        // let loginPage: LoginPage = LoginPage.getInstance();
        skillId = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Launch Max Soft phone
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber, MaxConnectOption.SOFT_PHONE);

        // 3. It is necessary to wait at least 1 minute before to generate some contact
        await maxPage.waitForInitializeSoftPhone();

        // 4.  Make an OB phone call by clicking +New and selection the phone, entering the number
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(outboundPhoneNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();
        // let maxCall: MaxCall = await maxPage.waitForCallWorkspace();
        // await maxCall.waitForCallDialling();

        // VP: Agent enter "Working" state and agent leg is connected
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.WORKING, "Agent status is not Working");
        expect(await maxPage.isAgentLegActive()).toBe(true, "Agent leg is not connected");

        // VP: Main controls of inbound call workspace exist
        expect(await maxPage.isIbPhoneIconDisplayed()).toBe(true, "IbPhone Icon is not displayed");
        expect(await maxPage.isIbPhoneQueueDisplayed()).toBe(true, "IbPhone Queue is not displayed");
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
        await maxCall.clickTransferConferenceButton();

        // Open Commitment panel
        await maxCall.clickCommitButton();

        // VP: Commitment panel exists
        expect(await maxCall.isCommitmentDisplayed()).toBe(true, "Commitment panel is not displayed");

        // Close Commitment panel
        await maxCall.clickCommitButton();

        // Open Launch menu
        await maxCall.clickLaunchButton();

        // VP: Launch menu exists
        expect(await maxCall.isIndicatorDisplayed()).toBe(true, "Launch menu is not displayed");

        // Close Launch menu
        await maxCall.clickLaunchButton();

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
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxPage = await maxCall.clickConfirmEndContactButton();
            await maxPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.VOICEMAIL);
            } catch (err) { }
        }

    }, TestRunInfo.conditionTimeout);
});