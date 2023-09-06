import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX Suite
 * TC ID: 459263
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX Suite - IC-62576', function () {

    TestBase.scheduleTestBase();
    let workItemAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62576 - [MAX][SCH][WI] Generate a Work item contact`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM)

    }, TestRunInfo.conditionTimeout);

    it('IC-62576 - MAX SCH WI Generate a Work item contact', async () => {

        // 2. Central login 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);
        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 4. Set agent status = AVAILABLE
        await maxPage.changeState(MaxState.AVAILABLE);

        // 5-10: Start a work item using API
        await TestHelpers.startWorkItem(workItemAgent);

        // VP: New contact pop up is displayed 
        await maxPage.waitForNewContactPopUp();
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 11. Accept contact
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: Work item space is ready to work
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // 12. Send second Work Item
        await TestHelpers.startWorkItem(workItemAgent);

        // VP: Verify WI is putting in queue
        await maxWorkItemPage.isContactInQueue(ContactName.WORK_ITEM);

        // 13. Finish the first Work Item
        await maxWorkItemPage.endWorkItemContact(true);

        // VP: Agent receives the second Work Item contact.
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 14. Accept and finish second Work Item
        await maxPage.acceptNewWorkItemContact();
        await maxWorkItemPage.endWorkItemContact(true);

        // VP: Work Item workspace is not displayed after end work Item
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM, TestRunInfo.shortTimeout)).toBe(false, "Work Item working space is still displayed");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



