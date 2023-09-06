import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import SupervisorPage from "@page-objects/inContact/supervisor/supervisor-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full, SMOKE_Automated_Blue_Full
 * TC ID: 263080
 * Tested browser: Chrome, Firefox, IE, Edge 
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_Full - 263080', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;
    let centralPageWindowHandle: string;
    let maxWindowHandle: string;
    let supervisorWindowHandle: string;
    let dialogContent: string = 'You have been remotely logged off by your supervisor.';

    // Declare page object 
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let supervisor: SupervisorPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `263080 - [Supervisor] Force logout > Choose "yes" on the popup`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('263080 - Force logout Agent from Supervisor', async () => {        
        // 1. Login Central Page.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
        centralPageWindowHandle = await BrowserWrapper.getNewWindowHandle();

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);
        maxWindowHandle = await BrowserWrapper.getNewWindowHandle();
        await BrowserWrapper.switchWindowByHandle(centralPageWindowHandle);

        // 3. Launch Supervisor
        supervisor = await centralPage.launchSupervisor();
        supervisorWindowHandle = await BrowserWrapper.getNewWindowHandle();
        expect(await supervisor.isPageDisplayed()).toBe(true, "Supervisor page is not displayed");

        // 4. In Supervisor, Hover the cursor over on your agent and click "Force Logout"
        await BrowserWrapper.switchWindowByHandle(supervisorWindowHandle);
        await supervisor.selectAgent(chatAgent.name);
        await supervisor.forceLogoutAgent(chatAgent.agentID);

        // VP: Popup opens, "Are you sure you want to logout this agent?"
        expect(await supervisor.isConfirmDialogDisplayed()).toBe(true, "Confirm dialog is not displayed");

        // 5. Click "Yes" in the popup
        await supervisor.confirmForceLogOut();
        await BrowserWrapper.switchWindowByHandle(maxWindowHandle);

        // VP: In Max, Popup opens, "You have been remotely logged off by supervisor"
        expect(await maxPage.getDialogContent()).toBe(dialogContent, "Dialog message does not match");

        // 6. Click "Accept" button
        await maxPage.clickAcceptButton();

        // VP: Agent is logged off
        expect(await BrowserWrapper.isWindowHandleDisplayed(maxWindowHandle)).toBe(false, "MAX is not closed")

        // 7. Close Supervisor window
        await BrowserWrapper.switchWindowByHandle(supervisorWindowHandle);
        await BrowserWrapper.close();

        // 8. Switch to central
        await BrowserWrapper.switchWindowByHandle(centralPageWindowHandle);        
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});




