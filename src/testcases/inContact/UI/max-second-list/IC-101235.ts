import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
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
import { ISize } from "selenium-webdriver";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 445448
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101235', function () {
    TestBase.scheduleTestBase();
    let workItemWorkspaceSize: ISize;
    let maxPanelSize: ISize;
    let workItemBackgroundColor: string = "#e2e2e2";
    let textUrl: string = "https://www.latam.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;

    // Declare Page object
    let workItemAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxWorkItemPage: MaxWorkItemPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101235 - MAX> SCH> One Contact> Generate a Work Item Contact with Screen Pops and Panels = On`);
        workItemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-101235 - MAX SCH One Contact Generate a Work Item Contact with Screen Pops and Panels On', async () => {

        // 1. Requirements
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(workItemAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(workItemAgent.phoneNumber);

        // 3. From Toolbar, click on More> Settings> Panels and set ON value
        await maxPage.changeMaxPanelsSetting(State.ON, false,TestRunInfo.middleTimeout);

        // VP: The Panels has been configured in MAX
        expect(await maxPage.getMaxPanelsStatus()).toBe(State.ON.toLocaleLowerCase(), "Cannot configure Max panels");

        // 4. Set the "Available" state
        // Wait for popover stable
        await Utility.delay(TestRunInfo.shortTimeout);
        await maxPage.closePopover();
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX is in the available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "MAX is not in available state");

        // 4. Generate a Work Item Contact and accept it
        await TestHelpers.startWorkItem(workItemAgent);
        await maxPage.waitForNewContactPopUp();
        maxWorkItemPage = await maxPage.acceptNewWorkItemContact();
        workItemWorkspaceSize = await maxWorkItemPage.getWorkItemSize();
        maxPanelSize = await maxWorkItemPage.getMaxWrapPanelSize("ISize");

        // VP: The Work Item Contact delivery in MAX without errors and next to the Work Item workspace (at the right side) there is the Panel workspace (URL configured as screenpop)
        expect(await maxWorkItemPage.isContactWorkSpaceDisplayed(ContactName.WORK_ITEM)).toBe(true, "Work Item working space is not displayed");
        expect(await maxWorkItemPage.isScreenPopsDisplayed()).toBe(true, "Screen pop does not display");

        // - The Panel must have the screen pop configured in requirement
        expect(await maxWorkItemPage.getScreenPopsTitle()).toContain(textUrl, "Screen Pops title is not displayed correctly");

        // - Check the controls, colors, labels and size
        expect(await maxWorkItemPage.getWorkItemBackgroundColor()).toBe(workItemBackgroundColor, "Work Item background color is not correct");
        expect(workItemWorkspaceSize.height).toBe(maxPanelSize.height, "Work Item workspace is displayed cut off or overlap");
        expect(await maxWorkItemPage.isHoldButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Hold button does not display");
        expect(await maxWorkItemPage.isTransferButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Transfer button does not display");
        expect(await maxWorkItemPage.isLaunchButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Launch button does not display");
        expect(await maxWorkItemPage.isEndButtonDisplayed(TestRunInfo.shortTimeout)).toBe(true, "End button does not display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxWorkItemPage.endWorkItemContact();
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



