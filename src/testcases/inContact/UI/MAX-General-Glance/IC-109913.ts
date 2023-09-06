
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: General(Glance)
 * TC ID: IC-109913
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('General(Glance) - IC-109913', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-109913 - [MAX][Settings][Glance Sensitivity] Verify the options for   "Glance Sensitivity" are [high, medium, low, pin]`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
        loginPage = LoginPage.getInstance();

        // Precondition - Login to Central
        centralPage = await loginPage.loginInContact(obPhoneAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-109913 - [MAX][Settings][Glance Sensitivity] Verify the options for   "Glance Sensitivity" are [high, medium, low, pin]', async () => {

        // Precondition - Login and launch Max
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        
        // 1. Go to MAX> More> Settings> Glance Sensitivity        
        // VP: Glance Sensitivity options should be listed: high, medium, low, pin
        await maxPage.openMoreToolbar();
        expect(await await maxPage.isGlanceSensitivityOptiondisplayed("fast")).toBe(true, "high Glance sensitivity option is not displayed");
        expect(await await maxPage.isGlanceSensitivityOptiondisplayed("medium")).toBe(true, "medium Glance sensitivity option is not displayed");
        expect(await await maxPage.isGlanceSensitivityOptiondisplayed("slow")).toBe(true, "slow Glance sensitivity option is not displayed");
        expect(await await maxPage.isGlanceSensitivityOptiondisplayed("pin")).toBe(true, "pin Glance sensitivity option is not displayed");                
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