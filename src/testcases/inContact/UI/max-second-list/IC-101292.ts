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
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249307
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101292', function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let scheduleNote: string = Utility.createRandomString(20);
    let firstName: string = "UserTest";
    let lastName: string = "Automation";
    let userName: string = `${firstName} ${lastName}`;
    let grayBackgroundColor: string = "#f1f1f2";
    let darkColor: string = "#ffffff";
    let dateFromPresent: number = 2;
    let scheduleDate: string;
    let timeZone: string = "-07:00";
    let timeZoneSchedule: string = "(GMT-07:00) Mountain Time (US & Canada)";
    let scheduleCommitmentAgent: ScheduleCommitment = new ScheduleCommitment();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;
    let externalBusinessUnitPage: BusinessUnitPage;
    let detailBusinessUnitDetailsPage: BusinessUnitDetailsPage;
    let detailTabPage: DetailTabPage;
    let phoneNumber: string;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101292 - 51/5000 MAX > Schedules Commitments > Verify when the cursor is hovering over on the Commitment, the white background changes to gray and a tool tips displays the full name of respective field`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        phoneNumber = obPhoneAgent.phoneNumber;
        scheduleDate = Utility.getNowDate("/", dateFromPresent);
        scheduleCommitmentAgent.initData(firstName, lastName, phoneNumber, ScheduleFor.ME, SkillCore.getSkillName(SkillType.OB_PHONE), dateFromPresent, "", "", "", timeZoneSchedule, scheduleNote);

        // Login inContact
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        externalBusinessUnitPage = await centralPage.gotoBusinessUnitPage();
        detailBusinessUnitDetailsPage = await externalBusinessUnitPage.selectBusinessUnit(obPhoneAgent.businessNumber);
        detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
        await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CAN_REMOVE_WITHOUT_NOTE);
        await detailTabPage.saveBusinessDetail();
    }, TestRunInfo.conditionTimeout);

    it('IC-101292 - 51 5000 MAX Schedules Commitments Verify when the cursor is hovering over on the Commitment the white background changes to gray and a tool tips displays the full name of respective field', async () => {

        // 2. Launch MAX
        obPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 4. Select Schedule from the tool bar. Select the "+" next to My schedule
        schedulePage = await maxPage.openSchedulePopUp();
        await schedulePage.openCommitmentPopup();

        // VP: 'Schedule a commitment' is displayed
        expect(await schedulePage.isCommitmentPopDisplayed()).toBe(true, "My Schedule popover is not displayed");

        // 4. Fill out all data in the commitment manager
        await schedulePage.fillScheduleCommitment(scheduleCommitmentAgent);

        // VP: All data filled in Commit.
        expect(await schedulePage.getEnteredFirstName()).toBe(firstName, "First name doesn't match");
        expect(await schedulePage.getEnteredLastName()).toBe(lastName, "Last name doesn't match");
        expect(await schedulePage.getEnteredNumberPhone()).toBe(phoneNumber, "Phone number doesn't match");
        expect(await schedulePage.getColorMeButtonSchedule()).toBe(darkColor, "Button Me doesn't selected");
        expect(await schedulePage.getSelectedSkillName()).toBe(SkillCore.getSkillName(SkillType.OB_PHONE), "Skill name doesn't match");
        expect(await schedulePage.getSelectedScheduleDate()).toBe(scheduleDate, "Date schedule doesn't match");
        expect(await schedulePage.getSelectedTimeZoneCommitment()).toBe(timeZone, "Time zone doesn't match");
        expect(await schedulePage.getEnteredScheduleNote()).toBe(scheduleNote, "Schedule note doesn't match");

        // 5. Click the save button
        await schedulePage.saveScheduleCommitment();

        // VP: Commitment saved
        expect(await schedulePage.isItemScheduleDisplayed(userName)).toBe(true, `Schedule Item with name ${userName} is not displayed`);

        // 6. Hover on the commitment created from My Schedule  pop over
        // VP: Verify the commitments ui changes when cursor is hovering over. 
        expect(await schedulePage.getColorScheduleItemHighlighted(userName)).toBe(grayBackgroundColor, "Color item schedule highlighted is mismatched");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Close schedule popover
            await schedulePage.selectExistingSchedule(userName);
            await schedulePage.removeItemSchedule(userName);
            maxPage = await schedulePage.closePopover();
            await maxPage.logOut();
            detailTabPage = await detailBusinessUnitDetailsPage.editBusinessDetail();
            await detailTabPage.selectDeleteCommitmentType(DeleteCommitment.CANNOT_REMOVE);
            await detailTabPage.saveBusinessDetail();
            await detailTabPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



