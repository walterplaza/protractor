import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 414327
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101257', function () {
    let firstCommitment: string;
    let secondCommitment: string;
    let firstScheduleCommitment = new ScheduleCommitment().initData("TestFName1", "TestLName1", "4000100010");
    let secondScheduleCommitment = new ScheduleCommitment().initData("TestFName2", "TestFName2", "4000100015");

    // Declare Page object
    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101257 - MAX > Glance > Schedule New commitments are displayed in a chronological list`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await CustomAPIs.cleanUpCallbackScheduled(agentOBPhone);
        firstScheduleCommitment.commitmentSkill = SkillCore.getSkillName(SkillType.OB_PHONE);
        secondScheduleCommitment.commitmentSkill = SkillCore.getSkillName(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-101257 - MAX - Glance - Schedule - New commitments are displayed in a chronological list', async () => {

        // 1. Launch MAX
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(agentOBPhone);
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);

        // 2. Go to Schedule
        schedulePage = await maxPage.openSchedulePopUp();

        // VP: Schedule popover is displayed
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");

        // 3. Press '+' button beside My Schedule
        await schedulePage.openCommitmentPopup();

        // VP:  Schedule a commitment is displayed
        expect(await schedulePage.isCommitmentPopDisplayed()).toBe(true, "My Schedule POPOVER is not displayed");

        // 4. Fill all the necessary fields with valid data
        // VP: All fields are with data
        // 5. Click on 'Save' button
        firstCommitment = firstScheduleCommitment.firstName;
        await schedulePage.fillAndSaveScheduleCommitment(firstScheduleCommitment);

        // VP: New commitment is displayed on My Schedule
        expect(await schedulePage.isCommitmentSaved(firstCommitment)).toBe(true, "Commitments is not saved");

        // 6. Repeat steps 3 - 5 a couple times
        await schedulePage.openCommitmentPopup();
        secondCommitment = secondScheduleCommitment.firstName;
        await schedulePage.fillAndSaveScheduleCommitment(secondScheduleCommitment);

        // 7. Press 'Schedule' button
        await schedulePage.closePopover();

        // VP: My Schedule closes and  Glance is displayed with all commitments displayed in a chronological list
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(false, "My Schedule POPOVER is still displayed");
        expect(await schedulePage.isScheduleCommitmentSorted(firstCommitment, secondCommitment)).toBe(true, "Commitments are not displayed in a chronological list");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.cleanUpCallbackScheduled(agentOBPhone);
                await TestCondition.setAgentSkillsToDefault(agentOBPhone, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



