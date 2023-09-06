import { Agent } from "@data-objects/general/agent";
import { ToolbarButton, ToolsOption } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437371
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62590', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxMoreToolsPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62590 - MAX Clear Event Log`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestHelpers.startChatContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62590 - MAX Suite Clear Event Log', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Launch More Tools Page                
        maxMoreToolsPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

        // 4. Click on Event Log button        
        await maxMoreToolsPage.showMoreTools(ToolsOption.EVENT_LOG);
        await maxMoreToolsPage.ClearEventLog();

        // VP: check MAX Overview Page is displayed
        expect(await maxMoreToolsPage.isEventLogDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Event Log Content is not cleared");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 5. Log out MAX and central                       
            await maxPage.closePopover();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } 
        catch (error) {} 
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } 
        catch (error) {}
        }
    }, TestRunInfo.conditionTimeout);
});