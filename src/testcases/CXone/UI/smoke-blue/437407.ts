import { WFIRule } from "@data-objects/CXone/wfi/rules/rule-info";
import { Agent, AgentType } from "@data-objects/general/agent";
import { PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import ActionsPopup from "@page-objects/CXone/wfi/rules/available-actions-popup";
import CreateRulePage from "@page-objects/CXone/wfi/rules/create-rule-page";
import RulesListPage from "@page-objects/CXone/wfi/rules/rule-list-page";
import WFIMenu from "@page-objects/CXone/wfi/wfi-general/wfi-menu";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import PageBase from "@page-objects/page-base";

/** 
 * Type: CXone
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 437407
 * Tested browser: Chrome, Firefox, Edge
 * Tested OS: Windows 10
 * Tested cluster: TO31
 * Note:
 * - IE: Failed by ticket IC-71112 - [TestAutomation][NICE-UI] The blank page is displayed after logging in Evolve on IE
 */

describe('SMOKE_Automated_Blue - 437407', function () {

    TestBase.scheduleTestBase(PageName.CXONE_LOGIN_PAGE);
    let admin: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let ruleData = new WFIRule();
    let employeesPage: EmployeesPage;
    let WFIMenu: WFIMenu;
    let ruleListPage: RulesListPage;
    let createRulePage: CreateRulePage;
    let actionsPopup: ActionsPopup;
    let basePage: PageBase;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `437407 - [Evolve][WFI] - WFI > Rules > Create New > Periodic condition > Validate successful rule creation with Frequency 'Hourly' End 'After X Occurrences'`);
        admin = await TestCondition.registerCxOneAgent(AgentType.CXONE_ADMIN);
        ruleData.initData('TestName');
        basePage = new PageBase();
    }, TestRunInfo.conditionTimeout);

    it('437407 - Evolve WFI WFI Rules Create New Periodic condition Validate successful rule creation with Frequency Hourly End After X Occurrences', async () => {

        // 2. Login to Evolve on the cluster in use.
        loginPage = LoginPage.getInstance();
        employeesPage = await loginPage.loginAsAdmin(admin);

        // 3. Navigate to WFI > Rules
        WFIMenu = await employeesPage.gotoWFIPage();
        ruleListPage = await WFIMenu.gotoRuleListPage();

        // VP: List of active 'Rules' displays.
        expect(await ruleListPage.isListOfActiveRulesDisplayed()).toBe(true, "List of active rules is not displayed");

        // 4. Click on 'Create New' button.
        createRulePage = await ruleListPage.clickCreateNewRule();

        // VP: Rule creation page displays.
        expect(await createRulePage.isRuleCreationWizardDisplayed()).toBe(true, "Rule creation page is not displayed");

        // 5. Enter valid rule name. e.g. Test Rule1"
        await createRulePage.enterValidRuleName(ruleData.ruleName);

        // VP: Rule name is entered.
        expect(await createRulePage.getEnteredRuleName()).toBe(ruleData.ruleName, "Rule name is not entered or wrong");

        // 6. Select frequency 'Hourly' from the 'Frequency' dropdown.
        await createRulePage.selectFrequencyValue(ruleData.frequency);

        // VP: Frequency 'Hourly' is selected.
        expect(await createRulePage.getSelectedFrequency()).toBe(ruleData.frequency, "Frequency is not selected or wrong");

        // 7. Enter valid value for 'Every X Hour(s)' e.g. Every 1 Hour(s)
        await createRulePage.enterValidEvery(ruleData.every);

        // VP: Value is entered for 'Every X Hour(s)'.
        expect(await createRulePage.getEnteredEveryValue()).toBe(ruleData.every, "Every field is not entered or wrong");

        // 8. Enter current date and future time for 'Start Date/Time' field.
        await createRulePage.selectStartDateTime(ruleData.startDate, ruleData.startTime);

        // VP: Start Date/Time is entered.
        expect(await createRulePage.isStartDateTimeSelected(ruleData.startDate, ruleData.startTime)).toBe(true, "Start date and time is not selected or wrong");

        // 9. Select option 'After' from 'End' dropdown.
        await createRulePage.selectEndValue(ruleData.end);

        // VP: Option 'After' is selected.
        expect(await createRulePage.getSelectedEnd()).toBe(ruleData.end, "End is not selected or wrong");

        // 10. Enter valid value for 'End' After X Occurrences. E.g. End after 1 occurrences.
        await createRulePage.enterValidOccurrence(ruleData.occurrence);

        // VP: Valid value is provided for 'End' field.
        expect(await createRulePage.getEnteredOccurenceValue()).toBe(ruleData.occurrence, "Occurence field is not entered or wrong");

        // 11. Check 'No Condition' option available under 'Conditions' section.
        await createRulePage.clickNoConditionCheckBox();

        // VP: No Condition' option is checked.
        expect(await createRulePage.getNoConditionCheckBoxState()).toBe(true, "No Condition' option is not checked");

        // 12. Click 'Add Action' button available under label "Actions"
        actionsPopup = await createRulePage.clickAddAction();

        // VP: Available Action pops up
        expect(await actionsPopup.isActionsPopupDisplayed()).toBe(true, "Available actions popup is not displayed");

        // 13. Click on Action 'Manage Agent's Skill' on the left pane
        await actionsPopup.clickManageSkill();

        // VP: Actions of 'Manage Agent's Skill' action should display.
        expect(await actionsPopup.isManageSkillComponentsDisplayed()).toBe(true, "'Manage Agent's Skill' action is not displayed");

        // 14. Click on 'Skills' filter and select skill 'Skill1'
        await actionsPopup.addSkillToManageAgentSkill(ruleData.skill);

        // VP: Skill is selected
        expect(await actionsPopup.isSkillToBeModifiedSelected(ruleData.skill)).toBe(true, "Skill to be modified is not selected");

        // 15. Click on 'Agents' filter and select an agent 'User1'
        await actionsPopup.addAgentToManageAgentSkill(ruleData.agent);

        // VP: Agent is selected
        expect(await actionsPopup.isAgentToBeModifiedSelected(ruleData.agent)).toBe(true, "Agent to be modified is not selected");

        // 16. Click on 'Teams' filter and select team 'Team1'
        await actionsPopup.addTeamToManageAgentSkill(ruleData.team);

        // VP: Team is selected.
        expect(await actionsPopup.isTeamToBeModifiedSelected(ruleData.team)).toBe(true, "Team to be modified is not selected.");

        // 17. Select proficiency value '5' for action 'Add skill with a proficiency of'
        await actionsPopup.selectProficiency(ruleData.proficiency);

        // VP: Proficiency value '5' is selected for action 'Add skill with a proficiency of'
        expect(await actionsPopup.getSelectedProficiency()).toBe(ruleData.proficiency, "Action 'Add Skill 'Skill1' at proficiency of 3' is not selected");

        // 18. Click 'Add this Action' button
        await actionsPopup.clickAddThisAction();

        // VP: Action added successfully' message should be displayed.
        expect(await actionsPopup.getAddActionSuccessMessage()).toBe("Action Added Successfully", "Action added successfully message is not displayed.");

        // 19. Click on 'I am Done Adding Actions' button
        createRulePage = await actionsPopup.clickIAmDoneAddingAction();

        // VP: Rule creation page displays with the added action.
        expect(await createRulePage.isRuleCreationWizardDisplayed()).toBe(true, "Rule creation page is not displayed");

        // 20. Click on 'Create Rule' button
        await createRulePage.clickCreateRule();

        // VP: Rule details page displays after successful creation.
        expect(await createRulePage.isDetailsTabDisplayed(ruleData.ruleName)).toBe(true, "Rule Details page is not displayed after successful creation.");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            employeesPage = await employeesPage.gotoEmployeesPage();
            await employeesPage.logOut();
        } catch (err) { }
        finally {
            try {
                await basePage.closeExcessBrowser();
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



