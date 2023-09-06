import { Agent } from "@data-objects/general/agent";
import { State } from "@data-objects/general/general";
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
 * Suite: MAX-Common > MAX-Voicemail > Contact Panels
 * TC ID: IC-63491
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Voicemail > Contact Panels - IC-63491", function () {

    TestBase.scheduleTestBase();
    let agent: Agent;    
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let voicemailWidth: number = 344;
    let voicemailHeight: number = 208;
    let tolerances: number = 10;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxVoiceMailPage: MaxVoiceMailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-63491 - [MAX ][Voice Mail][Screen Pops][Panel=On] Verify a Screen Pop form can be opened for Voice Mail Contact`);

        // 1. Complete Preconditon 1 step 3
        agent = await TestCondition.setUpAgent(SkillType.VOICEMAIL, null, null, Json);

        // 2.Complete the Pre-Condition IC-73938.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
        maxPage = await centralPage.launchMAX(agent.phoneNumber);
    }, TestRunInfo.conditionTimeout);

    it("IC-63491 - [MAX ][Voice Mail][Screen Pops][Panel=On] Verify a Screen Pop form can be opened for Voice Mail Contact", async () => {        
                
        // 4. Go to Glance> More> Settings> Click on Panels.
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // 5. Complete the pre-condition 4
        await TestHelpers.startVoiceMail(agent);

        //close popover
        await maxPage.closePopover();

        // 6. Complete the pre-condition 4
        await maxPage.connectAgentLeg();
        await maxPage.changeState(MaxState.AVAILABLE);
    
        // VP: Voice Mail arrives to the agent 
        maxVoiceMailPage = await maxPage.waitForVoiceMailWorkspace();
        
         // 7. Validate that voicemail contact is delivered 
         expect(await maxPage.getScreenPopsTitle()).toContain(textUrl, "Screen pop does not display with configured");    

         // VP: Also verify that the Phone workspace does not resize when the form is opened.
        expect(await maxVoiceMailPage.isVoicemailWorkspaceSizeInRange(voicemailWidth, tolerances)).toBe(true, "the size of Phone work space is not ~344 px (Width)");        
         
         // 8. Using the back carat expand and collapse the Contact Panel
         await maxVoiceMailPage.clickContactPanelToggle();

         // VP: Also verify that the Phone workspace does not resize when the form is opened.
        expect(await maxVoiceMailPage.isVoicemailWorkspaceSizeInRange(voicemailWidth, tolerances)).toBe(true, "the size of Phone work space is not ~344 px (Width)");                                  

        // VP: Verify the Contact Panel expand and collapsed the Voice Mail workspace must not be displayed cut off or overlap after clicking on back carat.        
        await maxVoiceMailPage.clickContactPanelToggle();
        expect(await maxVoiceMailPage.isVoicemailContactPanelHightSizeInRange(voicemailHeight, tolerances)).toBe(true, "The screen pop is not next the phone contact");                                

        // 9. Finish the Voice Mail Contact 
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
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});