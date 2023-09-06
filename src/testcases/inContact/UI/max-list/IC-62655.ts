import { Agent } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { max } from "moment";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 334406
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62655', function () {
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let maxClientUrl: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let pageBase: PageBase;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62655 - [MAX - Error Escalation] Test auth failure`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('IC-62655 - MAX Error Escalation Test auth failure', async () => {

        // Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);

        // Log Out
        await centralPage.logOut();

        // 1. Copy/paste the MAX client URL (<host>/inContact/MAX/index.html) into a non-incognito browser window while logged out of the associated business unit.
        pageBase = new PageBase();
        maxClientUrl = TestRunInfo.cluster.getURL(PageName.MAX_PAGE);
        await pageBase.openNewTab(maxClientUrl);
        maxPage = new MaxPage();

        // VP: Instead of initializing the client normally, an error dialog is shown, explaining that the user was unable to log in with their current credentials. Closing the dialog closes the app.
        expect(await maxPage.isErrorDialogDisplayed()).toBe(true, "An error dialog is not shown");

        // 2. Repeat step 1, except in an incognito window.
        await pageBase.openNewTab(TestRunInfo.cluster.getURL(PageName.LOGIN_PAGE));
        await LoginPage.getInstance();
        await loginPage.loginInContact(adminAgent);
        await centralPage.logOut();
        await pageBase.openNewTab(maxClientUrl);

        // VP: Instead of initializing the client normally, an error dialog is shown, explaining that the user was unable to log in with their current credentials. Closing the dialog closes the app.
        expect(await maxPage.isErrorDialogDisplayed()).toBe(true, "An error dialog is not shown");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            await maxPage.clickCloseButton();            
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(adminAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});