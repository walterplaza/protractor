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
 * Suite: MAX-Common > MAX-Voicemail
 * TC ID: IC-74083
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Voicemail - IC-74083", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;
    let dispositionNote: string = "Test Automation";
    let voiceMailID: number;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-74083 - [MAX] Verify if the outbound skill is displayed and selectable for a callback in MAX.`);

        // 1. Complete Preconditon IC-97115 and also the precondition IC-97114 with Ob phone skill 
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
        await TestCondition.setUpAndAssignSkill(agent, SkillType.OB_PHONE);

        // 2.Complete the Pre-Condition IC-73938.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it("IC-74083 - [MAX] Verify if the outbound skill is displayed and selectable for a callback in MAX.", async () => {

        // 3. Complete the Pre-condition IC-84446
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // VP: MAX is AVAILABLE
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Complete the Pre-condition IC-97125
        await TestHelpers.startVoiceMail(agent);

        // VP: Voice Mail arrives to the agent 
        // 5. Accept the Voice Mail
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();
        expect(await maxVoiceMailPage.isCallBackButtonDisplayed()).toBe(true, "Call Back button is not displayed");

        // 6. Click Callback button
        // 7. Click in the OB Skill
        await maxVoiceMailPage.openCallbackMenu();

        // VP: Popup is displayed
        // VP: Verify that the drop down for the OB skill is displayed correctly.
        expect(await maxVoiceMailPage.isCallBackSkillInfoDisplayed(SkillType.OB_PHONE)).toBe(true, "OB skill does not displayed on the Callback dropdown menu");

         // 7. Close Callback menu
         await maxVoiceMailPage.closePopover();

          // 10. End contact
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
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.VOICEMAIL);
                await TestCondition.setUpAndRemoveSkill(agent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});