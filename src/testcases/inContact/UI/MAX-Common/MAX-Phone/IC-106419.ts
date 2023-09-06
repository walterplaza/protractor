import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: IC-106419
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX-Common > MAX-Phone - IC-106419", function () {
    TestBase.scheduleTestBase();
    let phoneAgent: Agent;
    let obPhone1: string = "(400) 001-0001";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-106419 - [MAX][Phone][ADA=On] Verify that IVR dial pad is visible for IB/OB Phone calls `);
        phoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(phoneAgent, SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-106419 - [MAX][Phone][ADA=On] Verify that IVR dial pad is visible for IB/OB Phone calls ', async () => {

        // Pre-condition: 1. Central Login        
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(phoneAgent);

        // Pre-condition: 3. Launch MAX
        await phoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(phoneAgent.phoneNumber);        

        // 1. Click the "More" button in the bottom right of the glance. Click on "Settings." Turn ADA High Contrast to ON
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxADASetting(State.ON, false);

         // 2. Set Agent to "Available"
         await maxPage.closePopover();
         await maxPage.changeState(MaxState.AVAILABLE);

         // 3. Using the POC generate the IB Phone Call (See precondition IC-103588)
        await TestHelpers.startInboundCall(phoneAgent);
        maxCall = await maxPage.waitForCallWorkspace();        

        // 4. Open the IVR dial pad        
        await maxCall.clickKeypad();

        // VP: IVR dial pad is still visible when ADA is ON        
        expect(await maxCall.getBtnKeyPadFillColor(1)).toBe("rgb(0, 0, 0)", "Key # is not displayed");

        // 5. Enter numbers using Dial Pad
        await maxCall.clickBtnKeypad("2");
        await maxCall.clickBtnKeypad("4");
        await maxCall.clickBtnKeypad("8");

        // VP: Numbers should be visible when the ADA is ON
        expect(await maxCall.getIvrTypedNumberText()).toBe('248', "The IVR text has the wrong values.");
        expect(await maxCall.getIvrTextColor()).toBe('rgba(255, 255, 255, 1)', "The IVR text does not displays");  

        // 6. Hang up IB Phone 
        await maxCall.endCallContact();

        // 7. Generate OB Phone. Click on +New button 
        await maxPage.clickNew();            
        await maxPage.makeOutboundCall(obPhone1, SkillType.OB_PHONE);

        // VP: Verify the OB Phone Call contact delivers in agent
        maxCall = await maxPage.waitForCallWorkspace();        

        // 8. Open the IVR dial pad
        await maxCall.clickKeypad();

        //. VP: IVR dial pad is still visible when ADA is ON
        expect(await maxCall.getBtnKeyPadFillColor(1)).toBe("rgb(0, 0, 0)", "Key # is not displayed");

        // 9. Enter numbers using Dial Pad
        await maxCall.clickBtnKeypad("2");
        await maxCall.clickBtnKeypad("4");
        await maxCall.clickBtnKeypad("8");

        // VP: Numbers should be visible when the ADA is ON
        expect(await maxCall.getIvrTypedNumberText()).toBe('248', "The IVR text has the wrong values.");
        expect(await maxCall.getIvrTextColor()).toBe('rgba(255, 255, 255, 1)', "The IVR text does not displays");



        // 10. Click the "More" button in the bottom right of the glance. Click on "Settings." Turn ADA High Contrast to OFF
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxADASetting(State.OFF, false);

        // VP: ADA High Contrast is OFF                
        // 11. Open the IVR dial pad      
        // VP: IVR dial pad is still visible when ADA is OFF
        await maxPage.closePopover();
        await maxPage.hideMaxGlance();
        expect(await maxCall.getBtnKeyPadFillColor(1)).toBe('rgb(0, 0, 0)', "The IVR dial pad does not displays");

        // 12. Hang Up OB Phone call
        await maxCall.endCallContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(phoneAgent, SkillType.IB_Phone);
                await TestCondition.setUpAndRemoveSkill(phoneAgent, SkillType.OB_PHONE);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});