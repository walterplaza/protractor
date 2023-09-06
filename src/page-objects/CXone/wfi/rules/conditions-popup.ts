import TopMenu from "@page-objects/CXone/general/top-menu";
import CreateRulePage from "@page-objects/CXone/wfi/rules/create-rule-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class ConditionsPopup extends TopMenu {
    private static _conditionsPopup: ConditionsPopup = null;

    protected popConditions = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_divConditionModal']"));

    protected cbbCategory = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_ddlCategory']"));
    protected cbbDataPoint = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_ddlDataPoint']"));
    protected cbbOperator = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_ddlOperator']"));

    protected btnAddCondition = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_btnAddCondition_ShadowButton']"));
    protected btnAddDone = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_btnConfirmOk_ShadowButton']"));

    protected txtValue = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_txtValue']"));

    protected lblConditionAddedSuccessMessage = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_msgConditionAdded']/p"));
    protected lblAlertAddConditionMessage = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ctrlConditionEditor_msgSLAAlert']/p"));

    public static getInstance(): ConditionsPopup {
        this._conditionsPopup = new ConditionsPopup();
        return this._conditionsPopup;
    }

    /**
     * Verify conditions popup displayed
     * @returns {Promise<boolean>}
     * @memberof ConditionsPopup
     */
    public async isConditionsPopupDisplayed(): Promise<boolean> {
        try {
            return await this.popConditions.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConditionsPopupDisplayed, err.message);
        }
    }

    /**
     * Select category value
     * @param {string} category
     * @returns {Promise<ConditionsPopup>}
     * @memberof ConditionsPopup
     */
    public async selectCategory(category: string): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Selecting category value");
            await this.cbbCategory.selectOptionByText(category);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectCategory, err.message);
        }
    }

    /**
     * Select data point value
     * @param {string} dataPoint
     * @returns {Promise<ConditionsPopup>}
     * @memberof ConditionsPopup
     */
    public async selectDataPoint(dataPoint: string): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Selecting data point value");
            await this.cbbDataPoint.selectOptionByText(dataPoint);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDataPoint, err.message);
        }
    }

    /**
     * Select operator value
     * @param {string} operator
     * @returns {Promise<ConditionsPopup>}
     * @memberof ConditionsPopup
     */
    public async selectOperator(operator: string): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Selecting operator value");
            await this.cbbOperator.selectOptionByText(operator);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDataPoint, err.message);
        }
    }

    /**
      * Enter value for condition
     * @param {string} value
     * @returns {Promise<ConditionsPopup>}
     * @memberof ConditionsPopup
     */
    public async enterConditionValue(value: string): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Entering condition value");
            await this.txtValue.type(value);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterConditionValue, err.message);
        }
    }

    /**
     * Click Add this condition button
     * @returns {Promise<ConditionsPopup>}
     * @memberof ConditionsPopup
     */
    public async clickAddThisCondition(): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add this condition button");
            await this.btnAddCondition.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddThisCondition, err.message);
        }
    }

    /**
     * Click I am Done Adding Conditions button
     * @returns {Promise<CreateRulePage>}
     * @memberof ConditionsPopup
     */
    public async clickIAmDoneAddingConditions(): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking I am Done Adding Conditions button");
            await this.btnAddDone.click();
            return await CreateRulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickIAmDoneAddingConditions, err.message);
        }
    }

    /**
     * Get selected category
     * @returns {Promise<string>}
     * @memberof ConditionsPopup
     */
    public async getCategorySelected(): Promise<string> {
        try {
            return await this.cbbCategory.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCategorySelected, err.message);
        }
    }

    /**
     * Get selected data point
     * @returns {Promise<string>}
     * @memberof ConditionsPopup
     */
    public async getSelectedDataPoint(): Promise<string> {
        try {
            return await this.cbbDataPoint.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedDataPoint, err.message);
        }
    }

    /**
     * Get selected operator
     * @returns {Promise<string>}
     * @memberof ConditionsPopup
     */
    public async getSelectedOperator(): Promise<string> {
        try {
            return this.cbbOperator.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedOperator, err.message);
        }
    }

    /**
    * Get entered value
     * @returns {Promise<number>}
     * @memberof ConditionsPopup
     */
    public async getEnteredValue(): Promise<number> {
        try {
            return parseInt(await this.txtValue.getControlValue());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredValue, err.message);
        }
    }

    /**
     * Get success messages
     * @returns {Promise<string>}
     * @memberof ConditionsPopup
     */
    public async getAddConditionSuccessMessages(): Promise<string> {
        try {

            return await this.lblConditionAddedSuccessMessage.getText();

        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddConditionSuccessMessages, err.message);
        }
    }

    /**
     * Get alert messages
     * @returns {Promise<string>}
     * @memberof ConditionsPopup
     */
    public async getAddConditionAlertMessages(): Promise<string> {
        try {
            return await this.lblAlertAddConditionMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddConditionSuccessMessages, err.message);
        }
    }

}