import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName, DispositionName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
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
import { ISize } from "selenium-webdriver";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 444309
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101236', function () {
    let workItemBackgroundColor: string = "#e2e2e2";
    let color1: string = "#ffffff";
    let color2: string = "#a6a8ab";
    let color3: string = "#1c639c";
    let skillName: string;
    let dispositionNote: string = "Test Automation";
    let acwTimeOut: number = 10;
    let workItemJson: string = `{"maxSecondsACW":${acwTimeOut}}`;
    let maxWorkspaceSize1: ISize;
    let maxWorkspaceSize2: ISize;
    let workItemWorkspaceSize: ISize;
    let maxWidth1: number;
    let maxWidth2: number;
    let workItemWidth: number;

    // Declare Page object
    TestBase.scheduleTestBase();
    let workItemAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101236 - MAX> SCH> One Contact> Generate a Work Item Contact with Disposition`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, false, false, workItemJson);

    }, TestRunInfo.conditionTimeout);

    it('IC-101236 - MAX> SCH> One Contact> Generate a Work Item Contact with Disposition', async () => {

        // 1. Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 2. Login on MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 3. Set the "Available" state
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX is not in available state");
        maxWorkspaceSize1 = await maxPage.getMaxWrapPanelSize("ISize");
        maxWidth1 = maxWorkspaceSize1.width;

        // 4. Generate a Work Item Contact and accept it
        await TestHelpers.startWorkItem(workItemAgent);
        await maxPage.waitForNewContactPopUp();
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();

        // VP: The Work Item Contact delivery in MAX without errors
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");

        // VP: the workspace is shown according to the attached picture
        // VP: Check the controls, colors, labels and size
        // Check the colors
        expect(await maxWorkItemPage.getWorkItemBackgroundColor()).toBe(workItemBackgroundColor, "Work Item background color is not correct");

        // Check the controls
        skillName = await SkillCore.getSkillName(SkillType.WORK_ITEM);
        expect(await maxWorkItemPage.getSkillNameOfWorkItem()).toBe(skillName, "Skill name of work item is not correct");

        expect(await maxWorkItemPage.isHoldButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Hold button does not display");
        expect(await maxWorkItemPage.isTransferButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Transfer button does not display");
        expect(await maxWorkItemPage.isLaunchButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Launch button does not display");
        expect(await maxWorkItemPage.isEndButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "End button does not display");

        // Check the size
        workItemWorkspaceSize = await maxWorkItemPage.getWorkItemSize();
        workItemWidth = workItemWorkspaceSize.width;
        expect(await workItemWorkspaceSize.height).toBe(maxWorkspaceSize1.height, "The height of work item workspace displays incorrectly");
        expect(await workItemWidth).toBe(309, "The width of work item workspace displays incorrectly");

        // 5. End the Work Item
        maxDispositionPage = await maxWorkItemPage.endWorkItemRequireDisposition();

        // VP: Verify the pop over of disposition displays automatically
        expect(await maxDispositionPage.isDispositionPanelDisplayed()).toBe(true, "Popover of disposition does not display");
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form does not display");

        // VP: Check the controls
        expect(await maxDispositionPage.isDispositionNoteTextboxDisplayed()).toBe(true, "Disposition note textbox does not display");
        expect(await maxDispositionPage.isSaveAndCloseDispositionButtonDisplayed()).toBe(true, "Save and Close disposition button does not display");
        expect(await maxDispositionPage.isDispositionCheckboxDisplayed()).toBe(true, "Disposition checkbox does not display");

        // Check the colors
        expect(await maxDispositionPage.getDispositionItemColor("Disposition")).toBe(color1, "Color of Disposition is not correct");
        expect(await maxDispositionPage.getDispositionItemColor(DispositionName.DISPOSITION_1)).toBe(color2, "Color of Disposition 1 is not correct");
        expect(await maxDispositionPage.getDispositionItemColor(DispositionName.DISPOSITION_2)).toBe(color2, "Color of Disposition 2 is not correct");
        expect(await maxDispositionPage.getSaveAndCloseDispositionButtonBackgroundColor()).toBe(color3, "Color of save and close disposition button is not correct");
        expect(await maxDispositionPage.getDispositionCheckboxBackgroundColor()).toBe(color3, "Color of disposition checkbox is not correct");

        // VP: Verify the ACW time configured in disposition begins to run in countdown
        expect(await maxPage.isACWTimerCountCorrectly()).toBe(true, "The ACW time configured in disposition does not run in countdown");

        // 6. Select a disposition and click on "Save" button
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1, dispositionNote);

        // VP: Verify the Work Item workspace closes and MAX displays the glance.
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.WORK_ITEM, TestRunInfo.shortTimeout);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(false, "Work item workspace still displays");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "MAX does not display the glance");

        // VP: Verify that MAX still displaying the same size before start the Work Item Contact
        maxWorkspaceSize2 = await maxPage.getMaxWrapPanelSize("ISize");
        maxWidth2 = maxWorkspaceSize2.width;
        expect(await maxWidth1).toBe(maxWidth2, "MAX does not display the same size before starting the work item contact");

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



