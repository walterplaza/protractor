import { Agent } from "@data-objects/general/agent";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCallPage from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 437382
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62585', function () {
    TestBase.scheduleTestBase();
    let agent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCallPage: MaxCallPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62585 - MAX > Main Panel elements > Contact History > 1 recent call (outbound)`);
        agent = await TestCondition.setUpAgent(SkillType.OB_PHONE);

        // login specific skill user inC-UI
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62585 - MAX Main Panel elements Contact History 1 recent call outbound', async () => {

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(agent.phoneNumber);

        // 3. Start an OB call (New > Outbound phone)
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // 4. Make an outbound call
        maxCallPage = await maxPage.makeOutboundCall(TestRunInfo.cluster.outboundNumber, SkillType.OB_PHONE);
        await maxPage.waitForCallWorkspace();

        // 5. End call
        await maxCallPage.endCallContact();

        // 6. Verify call history displayed
        expect(await maxPage.isCallHistoryDisplayed(TestRunInfo.cluster.outboundNumber, SkillType.OB_PHONE)).toBe(true, "Call history does not displayed correctly");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // logout MAX inC-UI
            centralPage = await maxPage.logOut();

            // logout inC-UI
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.OB_PHONE);
            }
            catch (err) {
                console.log(err);
            }
        }
    }, TestRunInfo.conditionTimeout);
});



