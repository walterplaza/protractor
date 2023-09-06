import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 383687
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62634', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;

    // Declare Page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62634 - MAX> OSH> WI> Reject> Verify the Reject option in a WI is placed correctly in Agent queue`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, false);
    }, TestRunInfo.conditionTimeout);

    it('IC-62634 - MAX OSH WI Reject Verify the Reject option in a WI is placed correctly in Agent queue', async () => {

        // 2. Central login 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 3. Launch MAX
        await workItemAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Place a work item skill
        await TestHelpers.startWorkItem(workItemAgent);

        // VP: New contact pop up is displayed 
        await maxPage.waitForNewContactPopUp();
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // 5. Agent rejects the contact
        await maxPage.rejectNewItemContact();

        // VP: Workitem should be rejected from agent
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM, TestRunInfo.shortTimeout)).toBe(false, "Work Item working space is still displayed");

        // 6.Unavailable Refused state is displayed
        // VP: Unavailable Refused state should be displayed
        expect(await maxPage.getStateStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unavailable");
        expect(await maxPage.getOutStateStatus()).toBe(MaxState.REFUSED, "Agent status doesn't change to Refused");

        // 7.Personal Queue is displaying WI contact
        // VP: Personal Queue should display WI contact
        expect(await maxPage.isContactInQueue(ContactName.WORK_ITEM)).toBe(true, "Work item contact is not in queue");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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



