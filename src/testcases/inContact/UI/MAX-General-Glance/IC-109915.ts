
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { State } from "@data-objects/general/general";

/** 
 * Type: inContact
 * Suite: General(Glance)
 * TC ID: IC-109915
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) - IC-109915', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-109915 - [MAX][Settings][Glance Sensitivity][ADA on] Verify that the colors are for "Glance Sensitivity" are according to the ADA contrast colors`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();

        // Precondition - Login to Central
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-109915 - [MAX][Settings][Glance Sensitivity][ADA on] Verify that the colors are for "Glance Sensitivity" are according to the ADA contrast colors', async () => {

        // Precondition - launch Max
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 1. Turn ADA ON
        await maxPage.changeMaxADASetting(State.ON);
        
        // 2. Go to MAX> More> Settings> Glance Sensitivity        
        // VP: Glance Sensitivity options should be according to the ADA colors: high, medium, low, pin    
        // VP: validate color css attribute for options   
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("fast", "color")).toBe("rgba(0, 0, 0, 0.75)", "the color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("medium", "color")).toBe("rgba(0, 0, 0, 0.75)", "the color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("slow", "color")).toBe('rgba(0, 0, 0, 0.75)', "the color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("pin", "color")).toBe("rgba(0, 0, 0, 0.75)", "the color css attribute is not correct");   

        // VP: validate background-color css attribute for options
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("fast", "background-color")).toBe("rgba(0, 0, 0, 0)", "the background-color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("medium", "background-color")).toBe("rgba(0, 0, 0, 0)", "the background-color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("slow", "background-color")).toBe('rgba(0, 0, 0, 0)', "the background-color css attribute is not correct");
        expect(await await maxPage.getGlanceSensitivityOptionsAttribute("pin", "background-color")).toBe("rgba(0, 0, 0, 0)", "the background-color css attribute is not correct");   
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {            
            // Logout
            await maxPage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});