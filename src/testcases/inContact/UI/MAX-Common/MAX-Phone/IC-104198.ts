import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: IC-104198
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX-Common > MAX-Phone - IC-104198', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-104198 - [MAX][Glance][Station ID]First option of radio buttons must be selected by default when launching MAX`);
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    it('IC-104198 - [MAX][Glance][Station ID]First option of radio buttons must be selected by default when launching MAX', async () => {

        // Login InContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // Launch MAX
        maxPage = await centralPage.openAgentSession();

        // VP: Set Phone Number radio button is selected by default
        expect(await maxPage.isPhoneRadioButtonChecked()).toBe(true, "Set Phone Number radio button is not checked by default");

        //close Max
        await maxPage.clickMaxCloseButton();
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out MAX            
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});