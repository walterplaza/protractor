import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxChatPage from "@page-objects/inContact/max/max-chat-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 399309
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC10
 */

describe('MAX suite - IC-62617', function () {
    TestBase.scheduleTestBase();
    let chatAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxChatPage: MaxChatPage;
    let maxWorkItemPage: MaxWorkItemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62617 - MAX>Accept Reject Dialog>Skill name`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await TestCondition.setUpAndAssignSkill(chatAgent, SkillType.WORK_ITEM);
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(chatAgent);
    }, TestRunInfo.conditionTimeout);

    it('IC-62617 - MAX Accept Reject Dialog Skill name', async () => {
        // 1. Launch MAX
        maxPage = await centralPage.launchMAX(chatAgent.phoneNumber);

        // Chat contact is created        
        await TestHelpers.startChatContact(chatAgent);

        // 2. Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);
        await maxPage.waitForNewContactPopUp();

        // VP: Verify skill name of New chat contact is correct or not       
        expect(await maxPage.isSkillNameOfNewContactPopUpCorrectly(SkillType.CHAT)).toBe(true, "Skill name of new contact popup displays incorrectly");

        // 3. Confirm the accept reject dialog shows the skill name
        maxChatPage = await maxPage.acceptNewChatContact();

        // 4. End chat contact
        maxPage = await maxChatPage.endChatContact();
        await maxChatPage.waitForContactWorkSpaceDisappeared(ContactName.CHAT);

        // Work item contact is created        
        await TestHelpers.startWorkItem(chatAgent);

        // VP: Verify skill name of New work item contact is correct or not       
        expect(await maxPage.isSkillNameOfNewContactPopUpCorrectly(SkillType.WORK_ITEM)).toBe(true, "Skill name of new contact popup displays incorrectly");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            maxWorkItemPage = await maxPage.acceptNewWorkItemContact();
            await maxWorkItemPage.endWorkItemContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(chatAgent, SkillType.WORK_ITEM);
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



