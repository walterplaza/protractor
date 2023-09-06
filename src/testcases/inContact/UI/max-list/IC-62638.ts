import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 383395
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX suite - IC-62638', function () {
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;
    let ACTIVE: string = "Active";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62638 - MAX> Disposition> WI> verify the ACW for active contact should be marked as Active on Accept new contact`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62638 - MAX Disposition WI verify the ACW for active contact should be marked as Active on Accept new contact', async () => {

        // 2. Central login 
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 4. Launch MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 5. Generate one work item
        await TestHelpers.startWorkItem(workItemAgent);
        await maxPage.waitForNewContactPopUp();

        // Accept contact
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: Workitem should be receive successfully from agent
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // 6. Go to Disposition and expand it
        maxDispositionPage = new MaxDispositionPage();
        await maxDispositionPage.toggleDispositionPopup(State.ON);

        // VP: Check disposition controls expanded
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form is not displayed");

        // VP: Check Acw status should be displayed as Active
        expect(await maxDispositionPage.getDispositionAcwStatus()).toBe(ACTIVE, "Disposition ACW status is not Active");

        // End workitem contact and clean up
        await maxDispositionPage.toggleDispositionPopup(State.OFF);
        await maxWorkItemPage.endWorkItemRequireDisposition();
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.WORK_ITEM);

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // MAX logout
            centralPage = await maxPage.logOut();

            // Logout central page
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});
