import { Agent } from "@data-objects/general/agent";
import { ToolbarButton } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxMoreToolsPage from "@page-objects/inContact/max/max-more-tools-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { SkillType } from "@data-objects/general/skill-core";
import { TestCondition } from "@test-helpers/test-condition";

/*Type: inContact
* Suite: MAX suite
* TC ID: 380476
* Tested browser: Chrome, Firefox
* Tested OS: Windows 10
* Tested cluster: SC3
*/
describe('MAX suite - IC-62641', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxMoreToolPage: MaxMoreToolsPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-62641 - MAX > Information > Verify Data displayed on Information pane about agent');
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

        // Log in
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62641 - MAX Information Verify Data displayed on Information pane about agent ', async () => {

        // 1. Login to MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 2. Click More button
        maxMoreToolPage = await maxPage.openToolbarButton(ToolbarButton.MORE);

        // VP: Some options should be displayed: Information, Settings, Event Log, Feedback, Help
        expect(await maxMoreToolPage.isMoreToolsPanelDisplayed()).toBe(true, "Max More Tools Panel doesn't displayed");

        // 3. Expand the 'Information' tab by clicking on the right arrow
        await maxMoreToolPage.goToMoreInformation();

        // VP: Information details should be displayed.
        expect(await maxMoreToolPage.isInformationPanelDisplayed()).toBe(true, "Max Information doesn't displayed");

        // 4. Verify the information of Agent ID, PhoneNumber, WebServer and Virtual Cluster are correct.
        // VP: The data displayed on Information pane should be correct.
        expect(await maxMoreToolPage.getAgentID() == chatAgent.agentID).toBe(true, "Incorrect Agent ID");
        expect(await maxMoreToolPage.getAgentPhoneNumber()).toBe(chatAgent.phoneNumber, "Incorrect Agent PhoneNumber");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages
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