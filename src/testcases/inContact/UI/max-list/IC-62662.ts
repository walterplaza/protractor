import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: IC-62662
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62662', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62662 - MAX > Call back from Dispostion > Cleared with refresh/close`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62662 - MAX Call back from Disposition Cleared with refresh close', async () => {

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 2. Click new button and place an outbound call
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(TestRunInfo.cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Check call workspace section exists inC-UI
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Call workspace is not displayed");

        // 3. Hang up the call
        await maxCall.endCallContact();

        // VP: Check call workspace section not exists inC-UI
        expect(await maxCall.isCallWorkspaceDisplayed(TestRunInfo.shortTimeout)).toBe(false, "Call workspace is displayed");

        // 4. Refresh Max (F5)
        await BrowserWrapper.refreshPage();

        // VP: Check call history displays in MAX glance inC-UI
        expect(await maxPage.isContactHistoryEmpty()).toBe(true, "Call history is still displayed.")

        // Logout
        centralPage = await maxPage.logOut();
        await centralPage.logOut();
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});