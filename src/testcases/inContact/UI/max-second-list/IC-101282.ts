import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249458
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1, HC18
 * Bug: Failed by ticket: IC-97060 [TestAutomation][inC-UI] An error popup displays after clicking "Call" button on Commitment popup (SC1)
 */

describe("MAX suite - IC-101282", function () {
    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let pageBase: PageBase;
    let commitmentTimeOut: number;
    let time: string[];
    let scheduleCommitment = new ScheduleCommitment().initData("Test" + Utility.createRandomString(3), "Automation", "4000100010");
    let commitmentName: string = scheduleCommitment.firstName + ' ' + scheduleCommitment.lastName;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxSchedule: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101282 - [MAX - Personal Queue] Personal Queue when there is a Commitment`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        TestRunInfo.testTimeout = TestRunInfo.testTimeout * 3;
        await CustomAPIs.cleanUpCallbackScheduled(obPhoneAgent);
        pageBase = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('IC-101282 - MAX - Personal Queue Personal Queue when there is a Commitment', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Launch MAX
        await obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Create a commitment using the next step but set the schedule in 5 or 10 min 
        // 4. MAX Create a commitment for the agent
        // Prepare data for commitment
        scheduleCommitment.commitmentSkill = SkillCore.getSkillName(SkillType.OB_PHONE);
        time = (await Utility.addMinutesToCurrentTime(5)).split(":");

        scheduleCommitment.commitmentHour = time[0];
        scheduleCommitment.commitmentMinutes = time[1];
        scheduleCommitment.commitmentMeridian = time[2];

        maxSchedule = await maxPage.openSchedulePopUp();
        await maxSchedule.openCommitmentPopup();
        await maxSchedule.fillInScheduleCommitment(scheduleCommitment);
        await maxPage.closePopover();

        // VP: Verify the Commitment created is displayed in Glance in "Coming Up" Section
        expect(await maxPage.isItemDisplayedInComingUpSection(commitmentName, TestRunInfo.shortTimeout)).toBe(true, `The created Commitment is not displayed in "Coming Up" Section`);

        // Get Commitment time out
        commitmentTimeOut = await maxPage.getCommingUpCommitmentDurationInSecond();

        // 5. Set the agent in "unavailable" status.
        await maxPage.changeState(MaxState.UNAVAILABLE);

        // VP: Verify the agent has the unavailable status.
        expect(await maxPage.getAgentStatus(TestRunInfo.middleTimeout)).toMatch(MaxState.UNAVAILABLE, "The agent does not have the unavailable status");

        // 6. When the schedule configured is step 3 and 4 is fulfilled
        // Wait for commitment time out
        await Logger.write(FunctionType.UI, `Waiting for commitment time out`);
        await pageBase.waitInSecond(commitmentTimeOut + TestRunInfo.longTimeout);

        // VP: Verify the Commitment created in step 3 and 4 is displayed in Glance in "Personal Queue" section
        expect(await maxPage.isItemDisplayedInPersonalQueueSection(parseInt(scheduleCommitment.phoneNumber), TestRunInfo.longTimeout)).toBe(true, `The created Commitment is not displayed in "Personal Queue" Section`);

        // 7. Set agent state to available
        await maxPage.changeState(MaxState.AVAILABLE);
        await pageBase.waitInSecond(TestRunInfo.shortTimeout);

        // VP: Verify the agent has the Available status and immediately is changing to "Unavailable Commitment" status. 
        await maxPage.showMaxGlance();
        expect(await maxPage.getAgentStatus(TestRunInfo.middleTimeout)).toMatch(MaxState.UNAVAILABLE, "The agent does not have the unavailable status");
        expect(await maxPage.getMAXCurrentOutState()).toMatch("Commitment Pending", "The agent does not have the Commitment status");
        await maxPage.hideMaxGlance();

        // VP: Also verify the "Schedule Call" pop up is displayed in Agent and this has the following characteristics:- First Name Last Name - Phone Number - Skill Name; First Name Last Name - Call Button - Reschedule Button
        expect(await maxSchedule.isCallSchedulePopUpDisplayed(commitmentName)).toBe(true, `The "Schedule Call" pop up is not displayed in Agent`);
        expect(await maxSchedule.isSchedulePhoneNumberDisplayedInSchedulePopup(scheduleCommitment.phoneNumber)).toBe(true, `The schedule is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.isScheduleSkillDisplayedInSchedulePopup(scheduleCommitment.commitmentSkill)).toBe(true, `The "Schedule Call" skill is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.isScheduleCallButtonDisplayedInSchedulePopup()).toBe(true, `The "Schedule Call" Call button is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.isScheduleRescheduleButtonDisplayedInSchedulePopup()).toBe(true, `The "Schedule Call" Reschedule button is not displayed in "Schedule Call" pop up`);

        // 8. Click on "Call" button
        maxPage = await maxSchedule.selectScheduleType("Call");
        maxCall = await maxPage.waitForCallWorkspace(TestRunInfo.shortTimeout);

        // VP: Verify the OB call has been established.
        expect(await maxPage.isCallWorkspaceDisplayed(TestRunInfo.shortTimeout)).toBe(true, `The OB call is not established`);

        // End call
        maxPage = await maxCall.endCallContact();

        // 9. Repeat all steps but in step 8 click  on "reschedule" button
        // Prepare data for new commitment
        time = (await Utility.addMinutesToCurrentTime(5)).split(":");

        scheduleCommitment.commitmentHour = time[0];
        scheduleCommitment.commitmentMinutes = time[1];

        maxSchedule = await maxPage.openSchedulePopUp();
        await maxSchedule.openCommitmentPopup();
        await maxSchedule.fillInScheduleCommitment(scheduleCommitment);
        await maxPage.closePopover();

        // Get Commitment time out
        commitmentTimeOut = await maxPage.getCommingUpCommitmentDurationInSecond();

        // Wait for commitment time out
        await pageBase.waitInSecond(commitmentTimeOut + TestRunInfo.longTimeout * 2);

        await maxPage.changeState(MaxState.AVAILABLE);

        await maxSchedule.selectScheduleType("Reschedule");

        // VP: Verify the Commitment info is displayed and we can reschedule it.
        expect(await maxSchedule.isReschedulePopupDisplayed(TestRunInfo.shortTimeout)).toBe(true, "The Commitment info is not displayed");
        expect(await maxSchedule.getEnteredFirstName()).toBe(scheduleCommitment.firstName, `The schedule first name is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.getEnteredLastName()).toBe(scheduleCommitment.lastName, `The schedule last name is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.getEnteredNumberPhone()).toBe("(400) 010-0010", `The schedule phone number is not displayed in "Schedule Call" pop up`);
        expect(await maxSchedule.getSelectedSkillName()).toBe(scheduleCommitment.commitmentSkill, `The schedule commitment skill is not displayed in "Schedule Call" pop up`);

        await maxSchedule.saveScheduleCommitment();
        expect(await maxPage.isItemDisplayedInComingUpSection(commitmentName)).toBe(true, `The rescheduled Commitment is not rescheduled and displayed in "Coming Up" Section`);

    }, TestRunInfo.testTimeout * 3);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }

        finally {
            try {
                await CustomAPIs.cleanUpCallbackScheduled(obPhoneAgent);
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});