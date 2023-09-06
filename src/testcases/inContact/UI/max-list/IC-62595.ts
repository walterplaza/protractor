import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ButtonTitle } from "@data-objects/inContact/max/max-workitem";
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
 * TC ID: 426876
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62595', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62595 - [MAX] Accept reject is cut off`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);
        await TestHelpers.startWorkItemContact(workItemAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62595 - MAX Suite Accept reject is cut off', async () => {

        // 1. Central login and launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 2. Set agent status = AVAILABLE
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: New contact pop up is displayed 
        expect(await maxPage.isNewContactPopUpDisplayed()).toBe(true, "New contact pop up doesn't display");

        // VP: The Accept/Reject window is available, fully visible, and active.
        expect(await maxPage.isButtonDisplayed(ButtonTitle.ACCEPT)).toBe(true, "Accept Button is not displayed");
        expect(await maxPage.isButtonDisplayed(ButtonTitle.REJECT)).toBe(true, "Reject Button is not displayed");

        // 3. Accept contact
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: Work item space is ready to work
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // 4. Agent ends Work Item
        maxPage = await maxWorkItemPage.endWorkItemContact();

        // VP: Work Item workspace is not displayed after end work Item
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM, TestRunInfo.shortTimeout)).toBe(false, "Work Item working space is still displayed");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // 5. Log out MAX and Central Page.
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



