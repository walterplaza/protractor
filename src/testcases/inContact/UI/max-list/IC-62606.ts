import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 416401
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1, TC4
 */

describe('MAX suite - IC-62606', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62606 - [MAX] Accept reject border is transparent - WI`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);
        await TestHelpers.startWorkItemContact(workItemAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62606 - MAX Accept reject border is transparent - WI', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // Launch MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 2. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: There is no colorless border.
        expect(await maxPage.isControlWithColorlessBorder(ContactName.WORK_ITEM, TestRunInfo.middleTimeout)).toBe(false, "Accept reject border is not transparent on WI");

        // Post-Condition
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();
        maxPage = await maxWorkItemPage.endWorkItemContact();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
});



