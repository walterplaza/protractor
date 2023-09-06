import { WFMRule } from "@data-objects/CXone/wfm/rules/rule-info";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
export default class CreateNewDailyRule {

    private static _CreateNewDailyRule: CreateNewDailyRule = null;

    protected txtRuleTitle = new ElementWrapper(by.xpath("//input[@name='RuleTitle']"));
    protected txtEarliestStart = new ElementWrapper(by.xpath("//input[@name='earliestStart']"));
    protected txtLatestStart = new ElementWrapper(by.xpath("//input[@name='latestStart']"));
    protected btnStartArrow = new ElementWrapper(by.xpath("//div[@class='elmtableCell lengthDropdown']//div[@class='selectize-input']"));
    protected btnActivityCode = new ElementWrapper(by.xpath("//div[@name='activityCode']"));
    protected btnCreate = new ElementWrapper(by.xpath("//button[@class='btn btn-primary btn-footer ng-scope ng-isolate-scope']"));
    protected btnAdd = new ElementWrapper(by.xpath("//button[text()='Add' and @class='btn btn-sm btn-primary ng-scope']"));
    protected lblTitle = new ElementWrapper(by.xpath("//h3[text()='Create New Daily Rule']"));
    protected lblShiftType = new ElementWrapper(by.xpath("//span[text()='Shift Type:']//parent::div//div[@class='activity-code-label ng-binding']"));
    protected lblShiftLength = new ElementWrapper(by.xpath("//span[text()='Shift Length:']//following-sibling::div//div[@class='ui-select-match ng-scope']"));
    protected txtLength = new ElementWrapper(by.xpath("//label[text()='Length']//following-sibling::div//div[@class='ui-select-match ng-scope']"));
    protected txtRelativeStart = new ElementWrapper(by.xpath("//label[text()='Relative start']//following-sibling::div//div[@class='ui-select-match ng-scope']"));
    protected txtSlack = new ElementWrapper(by.xpath("//label[text()='Slack']//following-sibling::div//div[@class='ui-select-match ng-scope']"));
    protected lblStartTimeIncrement = new ElementWrapper(by.xpath("//span[text()='Start time increment:']//following-sibling::div//div[@class='ui-select-match ng-scope']"));

    // Dynamic controls
    protected lstStartTime(startTime: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//span[text()='${startTime}']`));
    }

    protected lstActivityCode(activityCode: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[text()='${activityCode}']`));
    }

    public static getInstance(): CreateNewDailyRule {
        this._CreateNewDailyRule = new CreateNewDailyRule();
        return this._CreateNewDailyRule;
    }

    /**
     * Enter daily rule name
     * @author Nhat.Nguyen
     * @param {string} dailyRuleName
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async enterDailyRuleName(dailyRuleName: string): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Entering Daily Rule Name");
            await this.txtRuleTitle.wait();
            await this.txtRuleTitle.type(dailyRuleName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterDailyRuleName, err.message);
        }
    }

    /**
     * Select shift earliest start
     * @author Nhat.Nguyen
     * @param {string} timeEarliest
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async selectEarliestStart(earliestStart: string): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Earliest Start");
            await this.txtEarliestStart.type(earliestStart);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterDailyRuleName, err.message);
        }
    }

    /**
     * Select shift Latest Start
     * @author Nhat.Nguyen
     * @param {string} latestStart
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async selectLatestStart(latestStart: string): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Latest Start");
            await this.txtLatestStart.type(latestStart);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectLatestStart, err.message);
        }
    }

    /**
     * Select Time Increment
     * @author Nhat.Nguyen
     * @param {string} timeIncrement
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async selectTimeIncrement(timeIncrement: string): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Time Increment");
            await this.btnStartArrow.click()
            await this.lstStartTime(timeIncrement).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectTimeIncrement, err.message);
        }
    }

    /**
     * Select Activity Code
     * @author Nhat.Nguyen
     * @param {string} activityCode
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async selectActivityCode(activityCode: string): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Selecting Activity Code");
            await this.btnActivityCode.click();
            await this.lstActivityCode(activityCode).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectActivityCode, err.message);
        }
    }

    /**
     * Click Add Daily Rule
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async clickAddDailyRule(): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add Daily Rule button");
            await this.btnAdd.click();
            await this.btnAdd.waitUntilDisabled();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddDailyRule, err.message);
        }
    }

    /**
     * Click Create Daily Rule 
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async clickCreateDailyRule(): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Create Daily Rule button");
            await this.btnCreate.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateDailyRule, err.message);
        }
    }

    /**
     * Add new daily rule
     * @author Nhat.Nguyen
     * @returns {Promise<CreateNewDailyRule>}
     * @memberof CreateNewDailyRule
     */
    public async addNewDailyRule(ruleData: WFMRule): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, "Adding new daily rule ");
            await this.enterDailyRuleName(ruleData.qaDailyRule);
            await this.selectLatestStart(ruleData.latestStartTime);
            await this.selectEarliestStart(ruleData.earliestStartTime);
            await this.selectTimeIncrement(ruleData.timeIncrement);
            await this.selectActivityCode(ruleData.activityCode);
            await this.clickAddDailyRule();
            await this.clickCreateDailyRule();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addNewDailyRule, err.message);
        }
    }

    /**
     * Check create new daily rule page is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isCreateNewDailyRulePageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblTitle.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateNewDailyRulePageDisplayed, err.message);
        }
    }

    /**
     * Check Rule Name textbox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isRuleNameTextboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtRuleTitle.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRuleNameTextboxDisplayed, err.message);
        }
    }

    /**
     * Get Shift Type value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Shift Type value
     * @memberof CreateNewDailyRule
     */
    public async getShiftTypeValue(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Shift Type value");
            return await this.lblShiftType.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getShiftTypeValue, err.message);
        }
    }

    /**
     * Get Shift Length value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Shift Length value
     * @memberof CreateNewDailyRule
     */
    public async getShiftLengthValue(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Shift Length value");
            return await this.lblShiftLength.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getShiftLengthValue, err.message);
        }
    }

    /**
     * Check Earliest Start combo box is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewDailyRule
	 */
    public async isEarliestStartComboBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtEarliestStart.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEarliestStartComboBoxDisplayed, err.message);
        }
    }

    /**
     * Check Latest Start combo box is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof CreateNewDailyRule
	 */
    public async isLatestStartComboBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtLatestStart.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLatestStartComboBoxDisplayed, err.message);
        }
    }

    /**
     * Check Start time increment combo box is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isStartTimeIncrementComboBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblStartTimeIncrement.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isStartTimeIncrementComboBoxDisplayed, err.message);
        }
    }

    /**
     * Check Activity Codes field is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isActivityCodesFieldDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnActivityCode.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActivityCodesFieldDisplayed, err.message);
        }
    }

    /**
     * Check Length textbox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isLengthTextboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtLength.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLengthTextboxDisplayed, err.message);
        }
    }

    /**
     * Check Relative Start textbox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isRelativeStartTextboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtRelativeStart.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRelativeStartTextboxDisplayed, err.message);
        }
    }

    /**
     * Check Slack textbox is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof CreateNewDailyRule
     */
    public async isSlackTextboxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtSlack.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSlackTextboxDisplayed, err.message);
        }
    }
}