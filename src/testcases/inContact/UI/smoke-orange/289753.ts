import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SupervisorPage from "@page-objects/inContact/supervisor/supervisor-page";
import PageBase from "@page-objects/page-base";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full, SMOKE_Automated_Blue_Full
 * TC ID: 289753
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_Full - 289753', function () {

    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let centralPageWindowHandle: string;
    let supervisorPage: SupervisorPage;
    let pageBase: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `289753 - Supervisor >Skills - Display Skill Assignments for an Agent> Click an agent to open up a drill down on that specific agent`);
        agent = await TestCondition.setUpAgent(SkillType.CHAT, true);

    }, TestRunInfo.conditionTimeout);

    it('289753 - Supervisor Skills Display Skill Assignments for an Agent Click an agent to open up a drill down on that specific agent', async () => {

        // 2. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
        centralPageWindowHandle = await BrowserWrapper.getNewWindowHandle();

        // 3. Launch Supervisor
        supervisorPage = await centralPage.launchSupervisor();

        // 4. Click on the active agent to show the drill down
        await supervisorPage.selectAgent(agent.name);

        //VP: The drill down is shown 
        expect(await supervisorPage.isAgentDrillDownDisplayed()).toBe(true, "Agent Drill Down is not displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Close Supervisor Page
            await pageBase.closeWindow();

            // Log out Central Page
            await pageBase.switchWindowByHandle(centralPageWindowHandle);
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});