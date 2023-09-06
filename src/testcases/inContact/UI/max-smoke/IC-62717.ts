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
 * Suite: SMOKE test
 * TC ID: 434628
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE Test - IC-62717', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62717 - Smoke > WorkItem`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);
        await TestHelpers.startWorkItemContact(workItemAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62717 - Smoke WorkItem', async () => {

        // 1. IC Central login.
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        //VP: Agent is offered Work Item
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        //VP: Agent is now chatting with customer
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // Agent ends Work Item
        maxPage = await maxWorkItemPage.endWorkItemContact();

        // VP: Work Item workspace is not displayed after end work Item
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM, TestRunInfo.shortTimeout)).toBe(false, "Work Item working space is still displayed");
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



