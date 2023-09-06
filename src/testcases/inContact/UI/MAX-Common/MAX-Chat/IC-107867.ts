import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: Max-Common > MAX-Chat
 * TC ID: IC-107867
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('Max-Common > MAX-Chat - IC-107867', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-107867 - [MAX][[SHC][Chat] Verify when Agent with Chat/SMS skills assigned, “Multi Chat display” is displayed on the Settings menu, and default value is ON`);
        
        // 1. precondition: set at least 2 Chats 
        // 2. precondition: Ensure that the Agent does have any Chat/SMS Skill assigned
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('IC-107867 - [MAX][[SHC][Chat] Verify when Agent with Chat/SMS skills assigned, “Multi Chat display” is displayed on the Settings menu, and default value is ON', async () => {


        // inContact Central login
        loginPage = await LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Go to MAX Glance> More> Settings
        await maxPage.openMoreToolbar();

        // 4.Validate “Multi Chat display” does appears on the Settings menu
        expect( await maxPage.getMultiChatDisplayStatus()).toBe("on", "Multi Chat display button does not display default status 'ON'");                  
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxPage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);

});



