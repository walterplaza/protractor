import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";
import CustomAPIs from "@apis/custom-apis";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249306
 * Tested browser: Chrome, Firefox
 * Tested OS: Windows 10
 * Tested cluster: SC3
 */

describe("MAX Suite - IC-101294", function () {

    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;
    let firstCommitment: string;
    let secondCommitment: string;
    let scheduleCommitment = new ScheduleCommitment().initData("Jonh", "Doe", "4000100010");

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101294 - MAX > Schedules Commitments > Verify the Commitments are sorted according the Date scheduled`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await CustomAPIs.cleanUpCallbackScheduled(agentOBPhone);
        scheduleCommitment.commitmentSkill = SkillCore.getSkillName(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-101294 - MAX Schedules Commitments Verify the Commitments are sorted according the Date scheduled', async () => {

        // 1. PRECONDITION: It must have an agent with OB Phone skill assigned.	

        // 2. Central Login
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(agentOBPhone);

        // 3. Launch MAX
        await agentOBPhone.createPhoneNumber();
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);

        // 3. Go to Schedule Button and expand it.
        schedulePage = await maxPage.openSchedulePopUp();

        // 4. Click on My Schedule '+'
        await schedulePage.openCommitmentPopup();

        // VP: Verify the Schedule a Commitment is displayed.
        expect(await schedulePage.isCommitmentPopDisplayed()).toBe(true, "My Schedule popover is not displayed");

        // 5. Fill out all data in the commitment manager        
        // 6. In "Skill" drop down select the skill requested in requirements.
        // VP: All data filled in Commit.	
        firstCommitment = scheduleCommitment.commitmentDate = Utility.getNowDate("/", +6);
        scheduleCommitment.lastName += firstCommitment;
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitment);

        // 7. Click the save button	
        // VP: Commitment saved
        expect(await schedulePage.isCommitmentSaved(firstCommitment)).toBe(true, "Commitments is not saved");

        // 8. Repeat the steps 3 -5 but use different dates to each commitment
        await schedulePage.openCommitmentPopup();
        secondCommitment = scheduleCommitment.commitmentDate = Utility.getNowDate("/", +8);
        scheduleCommitment.lastName += secondCommitment;
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitment);
        expect(await schedulePage.isCommitmentSaved(secondCommitment)).toBe(true, "Commitments is not saved");

        // VP: On Schedule list. Verify the Commitments are sorted according the Date scheduled
        expect(await schedulePage.isScheduleCommitmentSorted(firstCommitment, secondCommitment)).toBe(true, "Commitments are not sorted according");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {
            await schedulePage.closePopover();
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