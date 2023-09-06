import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { WFIRule } from "@data-objects/inContact/central/admin/workforce-intelligence/rules/workforce-rule-info";
import ActionsPopup from "@page-objects/inContact/central/admin/workforce-intelligence/rule/available-actions-popup";
import ConditionsPopup from "@page-objects/inContact/central/admin/workforce-intelligence/rule/conditions-popup";
import CreateRulePage from "@page-objects/inContact/central/admin/workforce-intelligence/rule/create-rule-page";
import RulesListPage from "@page-objects/inContact/central/admin/workforce-intelligence/rule/rule-list-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";

/** 
 * Type: inContact
 * Suite: SMOKE_Automated_Orange_Full
 * TC ID: 439710
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe('SMOKE_Automated_Orange_OF - 439710', function () {
    TestRunInfo.testTimeout = 900000;
    TestBase.scheduleTestBase();
    let adminAgent: Agent;
    let ruleData = new WFIRule();

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let ruleListPage: RulesListPage;
    let createRulePage: CreateRulePage;
    let conditionsPopup: ConditionsPopup;
    let actionsPopup: ActionsPopup;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `439710 - Central > Admin > WFI > Rules > Create New > Action 'Manage Skill' - Multiple Action > Validate successful rule creation`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);

    }, TestRunInfo.conditionTimeout);

    it('439710 - Central Admin WFI Rules Create New Action Manage Skill - Multiple Action Validate successful rule creation', async () => {

        // 2. Central > inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(adminAgent);
        ruleData.initData('TestName');

        // 3. Navigate to Admin > Workforce Intelligence > Rules
        ruleListPage = await centralPage.gotoRuleListPage();

        // VP: List of active 'Rules' displays.
        expect(await ruleListPage.isListOfActiveRulesDisplayed()).toBe(true, "List of active rules is not displayed");

        // 4. Click on 'Create New' button.
        createRulePage = await ruleListPage.clickCreateNewRule();

        // VP: Rule creation wizard displays.
        expect(await createRulePage.isRuleCreationWizardDisplayed()).toBe(true, "Rule creation wizard is not displayed");

        // 5. Enter valid rule name.
        await createRulePage.enterValidRuleName(ruleData.ruleName);

        // VP: Rule name is entered.
        expect(await createRulePage.getEnteredRuleName()).toBe(ruleData.ruleName, "Rule name is not entered or wrong");

        // 6. Select frequency 'Automatically' from the 'Frequency' dropdown.
        await createRulePage.selectFrequencyValue(ruleData.frequency);

        // VP: Frequency 'Automatically' is selected.
        expect(await createRulePage.getSelectedFrequency()).toBe(ruleData.frequency, "Frequency is not selected or wrong");

        // 7. Enter current date and future time for 'Start Date/Time' field.
        await createRulePage.selectStartDateTime(ruleData.startDate, ruleData.startTime);

        // VP: Start Date/Time is entered.
        expect(await createRulePage.isStartDateTimeSelected(ruleData.startDate, ruleData.startTime)).toBe(true, "Start date and time is not selected or wrong");

        // 8. Select value 'None' for 'End' field.
        await createRulePage.selectEndValue(ruleData.end);

        // VP: Value 'None' is selected
        expect(await createRulePage.getSelectedEnd()).toBe(ruleData.end, "End is not selected or wrong");

        // 9. Click on 'Add Condition' button.
        conditionsPopup = await createRulePage.clickAddCondition();

        // VP: Condition pop up pops up.
        expect(await conditionsPopup.isConditionsPopupDisplayed()).toBe(true, "Conditions popup is not displayed");

        // 10. Select category 'ACD Intraday' from the 'Category' dropdown.
        await conditionsPopup.selectCategory(ruleData.category);

        // VP: Category 'ACD Intraday' should be selected.
        expect(await conditionsPopup.getCategorySelected()).toBe(ruleData.category, "Category is not selected or wrong");

        // 11. Select data point 'Longest Wait Time' from the Data Point dropdown.
        await conditionsPopup.selectDataPoint(ruleData.dataPoint);

        // VP: Data Point 'Longest Wait Time' should be selected.
        expect(await conditionsPopup.getSelectedDataPoint()).toBe(ruleData.dataPoint, "Data Point is not selected or wrong")

        // 12. Select operator '<=' from the 'Operator' dropdown.
        await conditionsPopup.selectOperator(ruleData.operator);

        // VP: <=' operator should be selected
        expect(await conditionsPopup.getSelectedOperator()).toBe(ruleData.operator, "Operator is not selected or wrong");

        // 13. Enter a valid value in the 'Value' text box. Ex: 56
        await conditionsPopup.enterConditionValue(ruleData.value.toString());

        // VP: Value is entered.
        expect(await conditionsPopup.getEnteredValue()).toBe(ruleData.value, "Value is not entered or wrong");

        // 14. Click 'Add this Condition' button.
        await conditionsPopup.clickAddThisCondition();

        // VP: Success and Information alerts should display as mentioned below, Condition Added Successfully, Additional data points can no longer be added when a skill based data point is in use.
        expect(await conditionsPopup.getAddConditionSuccessMessages()).toBe("Condition Added Successfully", "Success messages is not displayed");
        expect(await conditionsPopup.getAddConditionAlertMessages()).toBe("Additional data points can no longer be added when a skill based data point is in use.", "Success messages is not displayed");

        // 15. Click 'I am Done Adding Conditions' button.
        await conditionsPopup.clickIAmDoneAddingConditions();

        // VP: Rule creation wizard displays with the condition added.
        expect(await createRulePage.isRuleCreationWizardDisplayed()).toBe(true, "Rule creation wizard is not displayed");
        expect(await createRulePage.isConditionDisplayedInRule(ruleData.dataPoint, ruleData.value.toString())).toBe(true, "Condition is not displayed in rule");

        // 16. Select option 'Number of Contacts >=' for 'Begin Rule Check' and enter valid data. e.g. 5
        await createRulePage.selectNumberOfContacts(ruleData.numberOfContacts.toString());

        // VP: Data is provided for 'Begin Rule Check > Number of Contacts >='.
        expect(await createRulePage.getSelectedNumberOfContacts()).toBe(ruleData.numberOfContacts, "Data is not provided for Begin Rule Check > Number of Contacts >=");

        // 17. Select skill 'Skill1' from the 'Skill' dropdown.
        await createRulePage.selectSkill(ruleData.skill);

        // VP: Skill is selected from the 'Skill' dropdown.
        expect(await createRulePage.isSkillSelected(ruleData.skill)).toBe(true, "Skill is not selected or wrong");

        // 18. Click on "Add Action" button available under label "Actions"
        actionsPopup = await createRulePage.clickAddAction();

        // VP: Available Action pops up
        expect(await actionsPopup.isActionsPopupDisplayed()).toBe(true, "Available actions popup is not displayed");

        // 19. Click on action 'Manage Skill'
        await actionsPopup.clickManageSkill();

        // VP: Components of 'Manage Skill' action displays.
        expect(await actionsPopup.isManageSkillComponentsDisplayed()).toBe(true, "Components of 'Manage Skill' action is not displayed");

        // 20. Select the agent to be modified from the 'Agents' filter.
        await actionsPopup.addAgentToManageSkill(ruleData.agent);

        // VP: Agent to be modified is selected.
        expect(await actionsPopup.isAgentToBeModifiedSelected(ruleData.agent)).toBe(true, "Agent to be modified is not selected");

        // 21. Select action "Add Skill 'Skill1' at proficiency of 3"
        await actionsPopup.selectProficiency(ruleData.proficiency);

        // VP: Action "Add Skill 'Skill1' at proficiency of 3" is selected.
        expect(await actionsPopup.getSelectedProficiency()).toBe(ruleData.proficiency, "Action 'Add Skill 'Skill1' at proficiency of 3' is not selected");

        // 22. Enter valid value for 'Recovery Level'
        await actionsPopup.enterRecoveryLevelValue(ruleData.recoveryLevel.toString());

        // VP: Value is provided for 'Recovery Level'
        expect(await actionsPopup.getEnteredRecoveryLevel()).toBe(ruleData.recoveryLevel.toString(), "Value is not provided for 'Recovery Level'");

        // 23. Click "Add this Action" button
        await actionsPopup.clickAddThisAction();

        // VP: Action added successfully' message displays.
        expect(await actionsPopup.getAddActionSuccessMessage()).toBe("Action Added Successfully", "Action added successfully message is not displayed.");

        // 24. Select the team to be modified from the 'Teams' filter.
        await actionsPopup.addTeamToManageSkill(ruleData.team);

        // VP: Team to be modified is selected.
        expect(await actionsPopup.isTeamToBeModifiedSelected(ruleData.team)).toBe(true, "Team to be modified is not selected.");

        // 25. Select action "Enable Skill 'Skill1'"
        await actionsPopup.selectActivateSkill();

        // VP: Action "Enable Skill Skill1'" is selected.
        expect(await actionsPopup.isActivateSkillSelected()).toBe(true, "Action 'Enable Skill Skill1' is not selected.");

        // 26. Enter valid value for 'Recovery Level'
        await actionsPopup.enterRecoveryLevelValue(ruleData.recoveryLevel.toString());

        // VP: Value is provided for 'Recovery Level'
        expect(await actionsPopup.getEnteredRecoveryLevel()).toBe(ruleData.recoveryLevel.toString(), "Value is not provided for 'Recovery Level'");

        // 27. Click "Add this Action" button
        await actionsPopup.clickAddThisAction();

        // VP: Action added successfully' message displays.
        expect(await actionsPopup.getAddActionSuccessMessage()).toBe("Action Added Successfully", "Action added successfully message is not displayed.");

        // 28. Click on "I am Done Adding Actions" button
        await actionsPopup.clickIAmDoneAddingAction();

        // VP: Available Actions popup window should be closed
        expect(await createRulePage.isActionsPopupNotDisplayed()).toBe(true, "Available actions popup is displayed")

        // 29. Click on 'Create Rule' button
        await createRulePage.clickCreateRule();

        // VP: Rule Details page displays after successful creation.
        expect(await createRulePage.isDetailsTabDisplayed(ruleData.ruleName)).toBe(true, "Rule Details page is not displayed after successful creation.");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Log out
            await createRulePage.logOut();
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
});



