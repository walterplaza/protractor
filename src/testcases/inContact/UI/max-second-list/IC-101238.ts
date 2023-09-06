import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { QuickReply } from "@data-objects/inContact/central/admin/communication/quick-replies/quick-reply";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxWorkItemPage from "@page-objects/inContact/max/max-workitem-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 444170
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101238', function () {
    let quickReply: QuickReply = new QuickReply;
    quickReply.initData();
    TestBase.scheduleTestBase();
    let workItemWorkspaceSize: ISize;
    let maxPanelSize: ISize;
    let workItemBackgroundColor: string = "#e2e2e2";

    // Declare Page object
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let quickRepliesPage: QuickRepliesPage

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101238 - MAX> SCH> One Contact> Generate an Work Item Contact with Quick Replies`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);

    }, TestRunInfo.conditionTimeout);

    it('IC-101238 - MAX> SCH> One Contact> Generate an Work Item Contact with Quick Replies', async () => {

        // 1. Requirements
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // The IB Chat skill must have associated only a Quick Reply
        await TestCondition.cleanUpQuickReply(workItemAgent);   
        quickRepliesPage = await centralPage.gotoQuickRepliesPage();        
        await quickRepliesPage.createQuickReply(quickReply);
        await quickRepliesPage.assignQuickReplyToSkill(SkillType.WORK_ITEM);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in the available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX isn't in available state");

        // 4. Generate a Work Item Contact and accept it
        await TestHelpers.startWorkItem(workItemAgent);
        await maxPage.waitForNewContactPopUp();
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: The Work Item Contact delivery automatically in MAX without errors
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // VP: the workspace is shown according to the attached picture. ( Work Item wokspace and at the right side the Quick Replies panel)
        // VP: Work Item workspace  must not be displayed cut off or overlap
        expect(await maxWorkItemPage.isWorkItemPositionedAtLeftSide()).toBe(true, "Work Item working space is not positioned correctly");
        workItemWorkspaceSize = await maxWorkItemPage.getWorkItemSize();
        maxPanelSize = await maxWorkItemPage.getMaxWrapPanelSize("ISize");
        expect(workItemWorkspaceSize.height).toBe(maxPanelSize.height, "Work Item workspace is displayed cut off or overlap");

        // VP: Check the controls, colors, labels and size
        // WorkItem panel
        expect(await maxWorkItemPage.getWorkItemBackgroundColor()).toBe(workItemBackgroundColor, "Work Item background color is not correct");
        expect(await maxWorkItemPage.isHoldButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Hold button does not display");
        expect(await maxWorkItemPage.isTransferButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Transfer button does not display");
        expect(await maxWorkItemPage.isLaunchButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Launch button does not display");
        expect(await maxWorkItemPage.isEndButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "End button does not display");

        // Quick Replies panel
        expect(await maxWorkItemPage.getQuickRepliesInfo("title")).toBe(quickReply.title, "Quick Replies title is not displayed correctly");
        expect(await maxWorkItemPage.getQuickRepliesInfo("content")).toBe(quickReply.content, "Quick Replies content is not displayed correctly");
        expect(await maxWorkItemPage.isSkillLevelTabDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Skill Level tab does not display");
        expect(await maxWorkItemPage.isFavoritesTabDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Favorites tab does not display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxWorkItemPage.endWorkItemContact();
            centralPage = await maxPage.logOut();
            await TestCondition.cleanUpQuickReply(workItemAgent);   
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workItemAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



