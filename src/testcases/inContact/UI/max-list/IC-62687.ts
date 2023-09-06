import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/*Type: inContact
* Suite: MAX suite
* TC ID: 249264

* Tested browser: Chrome, Firefox
* Tested OS: Windows 10
* Tested cluster: SC3
*/

describe('MAX suite - IC-62687', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, 'IC-62687 - MAX > Personal Queue > Chat > Personal Queue IB Chat');
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.IB_EMAIL);

        // Start a chat
        await TestHelpers.startChatContact(chatAgent);

        // Log in
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);

    }, TestRunInfo.conditionTimeout);

    it('IC-62687 - MAX Personal Queue IB Chat', async () => {

        // 2. Launch Max
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // 3. Place agent state to unavailable
        // VP: Agent state unavailable
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent State isn't unavailable");

        // 5. Queue IB Chat
        // Verify the IB Chat in personal queue
        expect(await maxPage.isContactInQueue(ContactName.CHAT)).toBe(true, "Inbound Chat contact is not in queue");

        // 6. VP: No other queues exist
        expect(await maxPage.isContactInQueue(ContactName.EMAIL)).toBe(false, "Inbound Email contact is in queue");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Log out max and central pages
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.IB_EMAIL);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});