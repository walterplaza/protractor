import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 423353
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: TC4
 */

describe('MAX suite - IC-62600', function () {

    TestBase.scheduleTestBase();
    let chatWIReqAgent: Agent;
    let note: string = "Test Automation";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxDispositionPage: MaxDispositionPage;
    let maxChatPage: MaxChatPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62600 - MAX> SCH> Disposition> Verify the Disposition panel is popping out automatically when Chat and WI contacts are ended.`);
        chatWIReqAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, true);
        await TestCondition.setUpAndAssignSkill(chatWIReqAgent, SkillType.CHAT, true);
    }, TestRunInfo.conditionTimeout);

    it('IC-62600 - MAX SCH Disposition Verify the Disposition panel is popping out automatically when Chat and WI contacts are ended.', async () => {

        // 2. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatWIReqAgent);
        maxPage = await centralPage.launchMAX(chatWIReqAgent.phoneNumber);

        // 3. Set the Available status in agent.
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: The agent has the Available state
        expect(await maxPage.getAgentStatus()).toBe(MaxState.AVAILABLE, "Agent status doesn't change to Available");

        // 4. Start Work Item
        await TestHelpers.startWorkItem(chatWIReqAgent);
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: Verify the IB WI Contact delivers in Agent 
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item contact is not displayed")

        // 5. End the contact  
        maxDispositionPage = await maxWorkItemPage.endWorkItemRequireDisposition();

        // VP: Verify the Disposition panel is popping out automatically when the WI contact has been finished.
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed")

        maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, note);

        // 6. Repeat the steps 4 - 5 but using the IB Chat skill 
        await TestHelpers.startChatContact(chatWIReqAgent);
        maxChatPage = await maxPage.acceptNewChatContact();
        await maxChatPage.endChatRequireDisposition();

        // VP: Verify the Disposition panel is popping out automatically when the Chat contact has been finished.
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition window is not displayed")
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            maxPage = await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, note);
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(chatWIReqAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(chatWIReqAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



