import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 278035
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62669', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62669 - [MAX] Valid Number`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62669 - MAX Valid Number', async () => {

        // Login central page
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);

        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 2. Click new button and select option call
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // VP: Check address book popover displays inC-UI
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, "Address book popover is not displayed.");

        // 3. Make an outbound call
        await maxPage.makeOutboundCall(TestRunInfo.cluster.outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();

        // VP: Check MAX notifications is not displays inC-UI
        expect(await maxCall.isMaxNotificationDisplayed(TestRunInfo.shortTimeout)).toBe(false, "MAX notifications is displayed");

        // Hang up the call
        await maxCall.endCallContact();
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