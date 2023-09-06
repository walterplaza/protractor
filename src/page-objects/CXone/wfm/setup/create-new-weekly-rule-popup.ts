import { PossibleDay, WFMRule } from "@data-objects/CXone/wfm/rules/rule-info";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
export default class CreateNewWeeklyRule {

    private static _CreateNewWeeklyRule: CreateNewWeeklyRule = null;

    protected txtRuleTitle = new ElementWrapper(by.xpath("//input[@name='RuleTitle']"));
    protected btnSelectDailyRule = new ElementWrapper(by.xpath("//div[@class='dailyRules']//div[@class='ui-caret']"));
    protected btnAdd = new ElementWrapper(by.xpath("//div[@class='btnsWrapper']//button[text()='Add']"));
    protected tabEmployee = new ElementWrapper(by.xpath("//a[text()='Employee']"));
    protected tabGeneral = new ElementWrapper(by.xpath("//a[text()='General']"));
    protected btnAddEmployees = new ElementWrapper(by.xpath("//a[contains(text(),'Add Employees')]"));
    protected btnSelectAll = new ElementWrapper(by.xpath("//a[text()='Select All']"));
    protected btnAddUser = new ElementWrapper(by.xpath("//button[@id='set-selected-users']"));
    protected btnCreate = new ElementWrapper(by.xpath("//button[@id='save']"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[@id='cancel']"));
    protected lnkCountUser = new ElementWrapper(by.xpath("//a[@id='selectedUsersCounter']"));
    protected chkMultiSkill = new ElementWrapper(by.xpath("//input[@id='multiskill-checkbox']//parent::div"));
    protected txtMinWeek = new ElementWrapper(by.xpath("//input[@name='minPerWeek']"));
    protected txtMaxWeek = new ElementWrapper(by.xpath("//input[@name='maxPerWeek']"));
    protected txtDailyRule = new ElementWrapper(by.xpath("//label[text()='DAILY RULE']//following-sibling::div//div[@class='selectize-input']//input"));
    protected lblEmployeesSelected = new ElementWrapper(by.xpath("//span[@id='assigned-employees-counter']"));
    protected lblAddedDailyRule = new ElementWrapper(by.xpath("//div[@class='ui-select-match ng-scope' and text()='QA Daily Rule']"));

    // Dynamic controls
    protected btnDay(dayName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[text()='${dayName}']`));
    }
    protected lblDailyRule(dailyRuleName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//span[text()='${dailyRuleName}']`));
    }
    protected btnSelectDay(dayName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='dayStyle ng-binding ng-scope possibleDayStyle' and text()='${dayName}']`));
    }
    protected btnSelectedDay(dayName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='dayStyle ng-binding ng-scope selectedNotEditMode' and text()='${dayName}']`));
    }

    public static getInstance(): CreateNewWeeklyRule {
        this._CreateNewWeeklyRule = new CreateNewWeeklyRule();
        return this._CreateNewWeeklyRule;
    }

    /**
     * Enter weekly rule name
     * @author Nhat.Nguyen
     * @param {string} weeklyRuleName
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async enterWeeklyRuleName(weeklyRuleName: string): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Entering Weekly Rule Name");
            await this.txtRuleTitle.wait();
            await this.txtRuleTitle.type(weeklyRuleName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterWeeklyRuleName, err.message);
        }
    }

    /**
     * Select daily rule name
     * @author Nhat.Nguyen
     * @param {string} dailyRuleName
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async selectDailyRuleName(dailyRuleName: string): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Daily Rule Name");
            await this.btnSelectDailyRule.click();
            await this.lblDailyRule(dailyRuleName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDailyRuleName, err.message);
        }
    }

    /**
     * Select possible days
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async selectPossibleDays(possibleDay: Array<string>): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Possible Days");
            for (let i = 0; i < possibleDay.length; i++) {
                await this.btnDay(possibleDay[i]).click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectPossibleDays, err.message);
        }
    }

    /**
     * Select all employees
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async selectAllEmployees(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Selecting all Employees");
            await this.btnAddEmployees.click();
            await this.btnSelectAll.wait();
            await this.btnSelectAll.click();
            let countUser: string = await this.lnkCountUser.getText();
            await this.btnAddUser.click();
            await this.btnAddUser.waitUntilDisappear();
            return countUser;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectPossibleDays, err.message);
        }
    }

    /**
     * Go to employees tab
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async gotoEmployeesTabs(): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Going to Employees tab");
            await this.tabEmployee.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoEmployeesTabs, err.message);
        }
    }

    /**
     * Add new weekly rule
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async addNewWeeklyRule(ruleData: WFMRule): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Adding new weekly rule");
            await this.enterWeeklyRuleName(ruleData.qaWeeklyRule);
            await this.selectDailyRuleName(ruleData.qaDailyRule);
            await this.selectPossibleDays(ruleData.possibleDays);
            await this.btnAdd.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addNewWeeklyRule, err.message);
        }
    }

    /**
     * Click Create button
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewWeeklyRule>}
     * @memberof CreateNewWeeklyRule
     */
    public async clickCreateButton(): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Create button");
            await this.btnCreate.wait();
            await this.btnCreate.click();
            await this.btnCreate.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
        }
    }

    /**
     * Check Rule Name textbox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isRuleNameTextboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtRuleTitle.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRuleNameTextboxDisplayed, err.message);
        }
    }

    /**
     * Check General tabs is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isGeneralTabsDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.tabGeneral.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isGeneralTabsDisplayed, err.message);
        }
    }

    /**
     * Check Employee tabs is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isEmployeeTabsDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.tabEmployee.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmployeeTabsDisplayed, err.message);
        }
    }

    /**
     * Check Create Button is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isCreateButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCreate.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateButtonDisplayed, err.message);
        }
    }

    /**
     * Check Cancel Button is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isCancelButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCancel.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCancelButtonDisplayed, err.message);
        }
    }

    /**
     * Check Use for multi-skill scheduling check box is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isMultiSkillCheckboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.chkMultiSkill.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMultiSkillCheckboxDisplayed, err.message);
        }
    }

    /**
     * Get Min Per Week text box value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Min Per Week text box value
     * @memberof CreateNewWeeklyRule
     */
    public async getMinPerWeekTextBoxValue(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Min Per Week value");
            return await this.txtMinWeek.getControlValueByName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMinPerWeekTextBoxValue, err.message);
        }
    }

    /**
     * Get Max Per Week text box value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Max Per Week text box value
     * @memberof CreateNewWeeklyRule
     */
    public async getMaxPerWeekTextBoxValue(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Max Per Week value");
            return await this.txtMaxWeek.getControlValueByName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMaxPerWeekTextBoxValue, err.message);
        }
    }

    /**
     * Check Daily Rule combobox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isDailyRuleComboBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnSelectDailyRule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDailyRuleComboBoxDisplayed, err.message);
        }
    }

    /**
     * Check Monday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isMondayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.MONDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMondayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Tuesday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isTuesdayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.TUESDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTuesdayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Wednesday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isWednesdayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.WEDNESDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWednesdayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Thursday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isThursdayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.THURSDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isThursdayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Friday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isFridayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.FRIDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isFridayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Saturday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isSaturdayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.SATURDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaturdayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Sunday boxes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewWeeklyRule
	 */
    public async isSundayBoxesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDay(PossibleDay.SUNDAY).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSundayBoxesDisplayed, err.message);
        }
    }

    /**
     * Check Add button is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isAddButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnAdd.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddButtonDisplayed, err.message);
        }
    }

    /**
     * Check Add Employees button is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isAddEmployeesButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnAddEmployees.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddEmployeesButtonDisplayed, err.message);
        }
    }

    /**
     * Get new weekly rule value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} new weekly rule value
     * @memberof CreateNewWeeklyRule
     */
    public async getNewWeeklyRuleValue(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting New Weekly Rule value");
            return await this.txtRuleTitle.getControlValueByName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getNewWeeklyRuleValue, err.message);
        }
    }

    /**
     * Check daily rule added
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isDailyRuleAdded(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblAddedDailyRule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDailyRuleAdded, err.message);
        }
    }

    /**
     * Check Week days is selected
     * @author Nhat.Nguyen
     * @param {Array<string>} possibleDay
     * @returns {Promise<boolean>} Selected or not
     * @memberof CreateNewWeeklyRule
     */
    public async isWeekDaysSelected(possibleDay: Array<string>, timeoutInSecond?: number): Promise<boolean> {
        try {
            for (let i = 0; i < possibleDay.length; i++) {
                if (await this.btnSelectedDay(possibleDay[i]).isDisplayed(timeoutInSecond)) {
                    return true;
                }
                return false;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWeekDaysSelected, err.message);
        }
    }

    /**
     * Get Employees selected
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Employees selected
     * @memberof CreateNewWeeklyRule
     */
    public async getEmployeesSelected(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Employees selected");
            return await this.lblEmployeesSelected.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmployeesSelected, err.message);
        }
    }

    /**
     * Is create new weekly rule closed 
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewWeeklyRule
     */
    public async isWeeklyRuleClosed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCreate.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWeeklyRuleClosed, err.message);
        }
    }
}