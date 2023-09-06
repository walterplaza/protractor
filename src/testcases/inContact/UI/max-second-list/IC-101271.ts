import { Agent } from "@data-objects/general/agent";
import { ScheduleFor } from "@data-objects/general/max";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import { Utility } from "@utilities/general/utility";
import { default as BusinessUnitDetailsPage, default as DetailTabPage } from "@page-objects/inContact/central/admin/account-setting/business-unit/business-unit-page-details";
import { DeleteCommitment } from "@data-objects/inContact/central/internal-admin/business-unit/business-unit-info";
import BusinessUnitPage from "@page-objects/inContact/central/admin/account-setting/business-unit/business-unit-page";
import PromiseKeeperPage from "@page-objects/inContact/central/reporting-analytics/prebuilt-reports/promise-keeper-page";
import PageBase from "@page-objects/page-base";
import CustomAPIs from "@apis/custom-apis";
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 304899
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101271', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let scheduleCommitmentAgent: ScheduleCommitment = new ScheduleCommitment();
    let scheduleCommitmentSkill: ScheduleCommitment = new ScheduleCommitment();
    let testTimeOut: number = TestRunInfo.testTimeout * 5;
    let timeoutInSecond: number = 300;
    let scheduleNote: string = Utility.createRandomString(20);
    let removeNote: string = "remove note";
    let firstName: string = "UserAgent";
    let lastName: string = "Automation";
    let firstNameSkill: string = "UserSkill";
    let userName: string = `${firstName} ${lastName}`;
    let dateFromPresent: number = 0;
    let scheduleDate: string = Utility.getNowDate("/", +dateFromPresent);
    let hourSchedule: string = "11";
    let minuteSchedule: string = "55";
    let skillPromise: string = "Skilled Promise";
    let agentSkill: string;
    let meridian: string = "pm";
    let timeZone2: string = "(GMT-07:00) Mountain Time (US & Canada)";
    let expectTimeZone: string;
    let waitTime: number = 3;

    // Window handles
    let maxHandle: string;
    let centralHandle: string;

    // Declare page object
    let pageBase: PageBase;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;
    let externalBusinessUnitPage: BusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;
    let promiseKeeperPage: PromiseKeeperPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101271 - MAX > Schedules Commitments > Verify that a Commintment can be create and removed using the Settings of Delete Commitments`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        agentSkill = SkillCore.getSkillName(SkillType.OB_PHONE);

        // Init data for schedule commitment
        scheduleCommitmentAgent.initData(firstName, lastName, obPhoneAgent.phoneNumber, ScheduleFor.ME, agentSkill, dateFromPresent, hourSchedule, minuteSchedule, meridian, timeZone2, scheduleNote);
        scheduleCommitmentSkill.initData(firstNameSkill, lastName, obPhoneAgent.phoneNumber, ScheduleFor.SKILL, agentSkill, dateFromPresent, hourSchedule, minuteSchedule, meridian, timeZone2, scheduleNote);

        // Login inContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        pageBase = new PageBase();
        centralHandle = await pageBase.getCurrentWindowHandle();
        externalBusinessUnitPage = await centralPage.gotoBusinessUnitPage();
        detailBusinessUnitDetailsPage = await externalBusinessUnitPage.selectBusinessUnit(obPhoneAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
        await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CANNOT_REMOVE);
        await detailTabPage.saveBusinessDetail();
    }, TestRunInfo.conditionTimeout);

    it('IC-101271 - MAX Schedules Commitments Verify that a Commintment can be create and removed using the Settings of Delete Commitments', async () => {

        // 2. Launch MAX
        obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        maxHandle = await pageBase.getCurrentWindowHandle();

        // Select Schedule from the tool bar. Select the "+" next to My schedule
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.openCommitmentPopup();

        // 3. MAX Create a commitment for the agent
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentAgent);

        // 4. MAX Create a commitment for the skill
        await schedulePage.openCommitmentPopup();
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentSkill);
        expectTimeZone = await schedulePage.generateScheduleReportDateTime(scheduleDate, hourSchedule, minuteSchedule, meridian);

        // 5. Close the scheduler and return to the Glance view 
        maxPage = await schedulePage.closePopover();

        // VP: Glance is shown 
        expect(await maxPage.isPageDisplayed()).toBe(true, "Max page is not displayed");

        // 6. Note1: The commitment is going to display if the date correspond to today)
        // VP: The commitments are showing up in " Coming Up...." 
        expect(await maxPage.isScheduleComingUp(userName)).toBe(true, `The commitment ${userName} is not shown in coming up section`);

        // 6. Note2: NOTE2: Notice that the commitment created for Skill does not be shown in the glance 
        // Skill commitment created at: Reporting/Analytics> Canned Reports> Promise Keeper
        await pageBase.switchWindowByHandle(centralHandle);
        promiseKeeperPage = await detailTabPage.gotoPromiseKeeperPage();
        await promiseKeeperPage.isSchedulePromiseKeeperDisplayed(skillPromise, expectTimeZone, agentSkill, timeoutInSecond);

        // 7. Open the scheduler and remove the commitments
        // Note: for Can't Remove we cannot remove the notes, because the button is disabled)
        await pageBase.switchWindowByHandle(maxHandle);
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.selectExistingSchedule(userName);

        // VP: The commitments not are removed from the scheduler 
        expect(await schedulePage.isRemoveButtonDisplayed(TestRunInfo.shortTimeout)).toBe(false, "The commitments can be removed from the scheduler");

        // 8. Close the scheduler and return to Glance
        maxPage = await schedulePage.closePopover();

        // VP: The scheduler closes and the "Coming Up...." section is displaying the commintment
        expect(await maxPage.isScheduleComingUp(userName)).toBe(true, `The commitment ${userName} is not shown in coming up section`);

        // Cleanup schedule commitment
        await CustomAPIs.cleanUpCallbackScheduled(obPhoneAgent);

        // ============================================================================================
        // Repeat step 3 to step 8 to verify that a schedule commitment can remove without confirm note
        await pageBase.switchWindowByHandle(centralHandle);
        externalBusinessUnitPage = await promiseKeeperPage.gotoBusinessUnitPage();
        detailBusinessUnitDetailsPage = await externalBusinessUnitPage.selectBusinessUnit(obPhoneAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
        await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CAN_REMOVE_WITHOUT_NOTE);
        await detailTabPage.saveBusinessDetail();
        await pageBase.switchWindowByHandle(maxHandle);
        await maxPage.refreshMaxPage(waitTime);

        // 3. MAX Create a commitment for the agent
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.openCommitmentPopup();
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentAgent);

        // 4. MAX Create a commitment for the skill
        await schedulePage.openCommitmentPopup();
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentSkill);

        // 5. Close the scheduler and return to the Glance view 
        maxPage = await schedulePage.closePopover();

        // VP: Glance is shown 
        expect(await maxPage.isPageDisplayed()).toBe(true, "Max page is not displayed");

        // 6. Note1: The commitment is going to display if the date correspond to today)
        // VP: The commitments are showing up in " Coming Up...." 
        expect(await maxPage.isScheduleComingUp(userName)).toBe(true, `The commitment ${userName} is not shown in coming up section`);

        // 6. Note2: NOTE2: Notice that the commitment created for Skill does not be shown in the glance 
        // Skill commitment created at: Reporting/Analytics> Canned Reports> Promise Keeper
        await pageBase.switchWindowByHandle(centralHandle);
        promiseKeeperPage = await detailTabPage.gotoPromiseKeeperPage();
        await promiseKeeperPage.isSchedulePromiseKeeperDisplayed(skillPromise, expectTimeZone, agentSkill, timeoutInSecond);

        // Note: for Can Remove without note we can remove the notes, because the button is enable
        await pageBase.switchWindowByHandle(maxHandle);
        await maxPage.refreshMaxPage(waitTime);
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.selectExistingSchedule(userName);

        // VP: The commitments could be removed from the scheduler 
        expect(await schedulePage.isRemoveButtonDisplayed()).toBe(true, "The commitments cannot removed from the scheduler");

        // 7. Open the scheduler and remove the commitments
        await schedulePage.removeItemSchedule(userName);

        // 8. Close the scheduler and return to Glance
        maxPage = await schedulePage.closePopover();
        await maxPage.waitForScheduleComingUpDisappear(userName);

        // VP: The scheduler closes and the "Coming Up...." section is displaying the commintment
        expect(await maxPage.isScheduleComingUp(userName, TestRunInfo.shortTimeout)).toBe(false, `The commitment ${userName} is still shown in coming up section`);

        // =========================================================================================
        // Repeat step 3 to step 8 to verify that a schedule commitment can remove with confirm note 
        await pageBase.switchWindowByHandle(centralHandle);
        externalBusinessUnitPage = await promiseKeeperPage.gotoBusinessUnitPage();
        detailBusinessUnitDetailsPage = await externalBusinessUnitPage.selectBusinessUnit(obPhoneAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
        await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CAN_REMOVE_WITH_NOTE);
        await detailTabPage.saveBusinessDetail();
        await pageBase.switchWindowByHandle(maxHandle);
        await maxPage.refreshMaxPage(waitTime);

        // 3. MAX Create a commitment for the agent
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.openCommitmentPopup();
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentAgent);

        // 4. MAX Create a commitment for the skill
        await schedulePage.openCommitmentPopup();
        await schedulePage.fillAndSaveScheduleCommitment(scheduleCommitmentSkill);

        // 5. Close the scheduler and return to the Glance view 
        maxPage = await schedulePage.closePopover();

        // VP: Glance is shown 
        expect(await maxPage.isPageDisplayed()).toBe(true, "Max page is not displayed");

        // 6. Note1: The commitment is going to display if the date correspond to today)
        // VP: The commitments are showing up in " Coming Up...." 
        expect(await maxPage.isScheduleComingUp(userName)).toBe(true, `The commitment ${userName} is not shown in coming up section`);

        // 6. Note2: NOTE2: Notice that the commitment created for Skill does not be shown in the glance 
        // Skill commitment created at: Reporting/Analytics> Canned Reports> Promise Keeper
        await pageBase.switchWindowByHandle(centralHandle);
        promiseKeeperPage = await detailTabPage.gotoPromiseKeeperPage();
        await promiseKeeperPage.isSchedulePromiseKeeperDisplayed(skillPromise, expectTimeZone, agentSkill, timeoutInSecond);

        // Note: for Can Remove with note we can remove the notes, because the button is enable
        await pageBase.switchWindowByHandle(maxHandle);
        await maxPage.refreshMaxPage(waitTime);
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.selectExistingSchedule(userName);

        // VP: The commitments could be removed from the scheduler 
        expect(await schedulePage.isRemoveButtonDisplayed()).toBe(true, "The commitments cannot removed from the scheduler");

        // 7. Open the scheduler and remove the commitments
        await schedulePage.removeItemSchedule(userName, removeNote);

        // 8. Close the scheduler and return to Glance
        maxPage = await schedulePage.closePopover();
        await maxPage.waitForScheduleComingUpDisappear(userName);

        // VP: The scheduler closes and the "Coming Up...." section is displaying the commintment
        expect(await maxPage.isScheduleComingUp(userName, TestRunInfo.shortTimeout)).toBe(false, `The commitment ${userName} is still shown in coming up section`);

    }, testTimeOut);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxPage.logOut();
            externalBusinessUnitPage = await promiseKeeperPage.gotoBusinessUnitPage();
            detailBusinessUnitDetailsPage = await externalBusinessUnitPage.selectBusinessUnit(obPhoneAgent.businessNumber);
            detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
            await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CANNOT_REMOVE);
            await detailTabPage.saveBusinessDetail();
            await detailTabPage.logOut();
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.cleanUpCallbackScheduled(obPhoneAgent);
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});
