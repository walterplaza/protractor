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
import MaxCall from "@page-objects/inContact/max/max-call";
import { State } from "@data-objects/general/general";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Voicemail
 * TC ID: IC-110239
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Voicemail - IC-110239", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let maxCall: MaxCall;
    let obPhone1: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-110239 - [MAX ][SCH][Voice Mail][CallBack] Verify that call (from Callback) controls are in the VM screen`);

        // Precondition 2 
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.OB_PHONE);

        // Precondition 1.1 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it("IC-110239 - [MAX ][SCH][Voice Mail][CallBack] Verify that call (from Callback) controls are in the VM screen", async () => {

        // Precondition 1.2
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // VP: MAX is AVAILABLE
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);

        // Precondition 3
        await TestHelpers.startVoiceMail(agent);

        // 1. Validate that voicemail contact is delivered
        // VP: The Voice Mail is dellivered and the VM workspace is shown correctly
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();
        expect(await maxVoiceMailPage.isCallBackButtonDisplayed()).toBe(true, "Call Back button is not displayed");

        // 2. Press Call Back button
        await maxVoiceMailPage.openCallbackMenu();

        // VP: Call back popover is displayed
        expect(await maxVoiceMailPage.isCallBackSkillInfoDisplayed(SkillType.OB_PHONE)).toBe(true, "OB skill does not displayed on the Callback dropdown menu");

        // 3. Enter a Phone Number, Select a OB Phone Skill And press "Call" button
        maxCall = await maxVoiceMailPage.makeCallbackCall();

        // VP: Callback is performed and the Call controls should be displayed below the VM controls ( in the same workspace) 
        expect(await maxCall.isCustomerContactIconDisplayed()).toBe(true, "Call conference does not display in the Voicemail workspace");
        expect(await maxCall.isKeyPadDisplayed()).toBe(true, "IVR keypad does not display");

        // 4. Open the Dial Pad
        maxCall.clickKeypad();

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

        // show Glance
        await maxPage.showMaxGlance();

        // 5. Turn ADA ON
        await maxPage.changeMaxADASetting(State.ON);

        // close more menu
        await maxPage.closePopover();

        // hide Glance
        await maxPage.hideMaxGlance();         

        // VP: Verify that Call controls are sill there and with the correct colors for ADA high contrast also verify that the dial pad is still visible
        expect(await maxCall.getBtnKeyPadFillColor(1)).toBe("rgb(0, 0, 0)", "Key # is not displayed");

        // End Call contact
        await maxCall.clickHangUpWithPhoneNumber(obPhone1);

        // End VM contact
        maxPage = await maxVoiceMailPage.endVoiceMailContact(false);
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
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.VOICEMAIL);                
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});