import { Agent } from "@data-objects/general/agent";
import { State } from "@data-objects/general/general";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxSchedulePopUp from "@page-objects/inContact/max/max-toolbar/max-schedule";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: General(Glance) > Commitment
 * TC ID: IC-103116
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe("General(Glance) > Commitment - IC-103116", function () {

    TestBase.scheduleTestBase();
    let agentOBPhone: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let schedulePage: MaxSchedulePopUp;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-103116 - [MAX][Schedule][ADA=ON] Verify that "next" and "back"  arrows are displayed on the calendar`);
        agentOBPhone = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(agentOBPhone);
    }, TestRunInfo.conditionTimeout);

    it('IC-103116 - [MAX][Schedule][ADA=ON] Verify that "next" and "back"  arrows are displayed on the calendar', async () => {

        // 1. Go to Glance> Schedule> "+" in top right side
        maxPage = await centralPage.launchMAX(agentOBPhone.phoneNumber);
        schedulePage = await maxPage.openSchedulePopUp();

        // VP: Schedule a commitment form is displayed
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");
        expect(await schedulePage.isBtnAddScheduleDisplayed()).toBe(true, "Add button is not displayed");
        await schedulePage.openCommitmentPopup();


        // 2. Click on date field
        await schedulePage.clickDateTextBox();

        // VP: Date picket should open.Verify if  "next" and "back" arrows are displayed. 
        expect(await schedulePage.getDatePickerArrowImageUrl("prev")).toMatch("max.dev.niceincontact.com", "Previous button is not displayed");
        expect(await schedulePage.getDatePickerArrowImageUrl("next")).toMatch("max.dev.niceincontact.com", "Next button is not displayed");

        // 3.Turn ADA ON Go to More> Settings> ADA high contrast> ON 
        await maxPage.closePopover();
        await maxPage.changeMaxADASetting(State.ON);

        // 4. Open "Schedule a commitment" Go to Glance> Schedule> "+" in top right side
        await maxPage.closePopover();
        schedulePage = await maxPage.openSchedulePopUp();

        // VP: Schedule a commitment form is displayed 
        expect(await schedulePage.isSchedulePopUpDisplayed()).toBe(true, "Schedule pop up is not displayed");
        expect(await schedulePage.isBtnAddScheduleDisplayed()).toBe(true, "Add button is not displayed");
        await schedulePage.openCommitmentPopup();       

        // 5. Click on date field
        await schedulePage.clickDateTextBox();

        // VP: Date picket should open. Verify if  "next" and "back" arrows are displayed when ADA high contrast is ON
        expect(await schedulePage.getDatePickerArrowImageUrl("prev")).toMatch("max.dev.niceincontact.com", "Previous button is not displayed");
        expect(await schedulePage.getDatePickerArrowImageUrl("next")).toMatch("max.dev.niceincontact.com", "Next button is not displayed");

        await schedulePage.closePopover();
        await maxPage.changeMaxADASetting(State.OFF);
        await schedulePage.closePopover();
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        // Clean up
        try {            
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agentOBPhone, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});