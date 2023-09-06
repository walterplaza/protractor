import CreateNewDailyRule from "@page-objects/CXone/wfm/setup/create-new-rule-popup";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class DailyRules {

    private static _DailyRules: DailyRules = null;

    protected btnNewRule = new ElementWrapper(by.xpath("//button[@id='newRule']"));
    protected btnDeleteRule = new ElementWrapper(by.xpath("//button[text()='Delete']"));
    protected btnYesConfirm = new ElementWrapper(by.xpath("//button[@id='popup-delete']"));
    protected lblTitle = new ElementWrapper(by.xpath("//h1[text()='Daily Rules']"));

    // Dynamic controls
    protected chkDailyRule(ruleName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[.//div[text()='${ruleName}'] and @role='row']//label`));
    }

    public static getInstance(): DailyRules {
        this._DailyRules = new DailyRules();
        return this._DailyRules;
    }

    /**
     * Go to create new daily rule popup
     * @author Nhat.nguyen
     * @returns {Promise<DailyRulePage>} daily rules Page
     * @memberof DailyRules
     */
    public async gotoCreateNewDailyRule(): Promise<CreateNewDailyRule> {
        try {
            await Logger.write(FunctionType.UI, `Going to create new daily rule popup`);
            await this.btnNewRule.click();
            let createNewDailyRulePopup = require(`${ProjectPath.pageObjects}/CXone/wfm/setup/create-new-rule-popup`).default;
            return createNewDailyRulePopup.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCreateNewDailyRule, err.message);
        }
    }

    /**
     * Remove Daily Rule
     * @author Nhat.nguyen
     * @param {string} ruleName
     * @returns {Promise<DailyRulePage>} daily rules Page
     * @memberof DailyRules
     */
    public async removeDailyRule(ruleName: string, timeoutInSecond?: number): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, `Deleting daily rule`);
            if (await this.chkDailyRule(ruleName).isDisplayed(timeoutInSecond)) {
                await this.chkDailyRule(ruleName).click();
                await this.btnDeleteRule.wait();
                await this.btnDeleteRule.click();
                await this.btnYesConfirm.click();
                await this.chkDailyRule(ruleName).waitUntilDisappear();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeDailyRule, err.message);
        }
    }

    /**
     * Check daily rule page is displayed
     * @author Nhat.nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof DailyRules
     */
    public async isDailyRulePageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblTitle.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDailyRulePageDisplayed, err.message);
        }
    }

    /**
     * Check new rule button is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof DailyRules
     */
    public async isNewRuleButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnNewRule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewRuleButtonDisplayed, err.message);
        }
    }

    /**
     * Check daily rule is listed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} list=>true, not list=>false
     * @memberof DailyRules
     */
    public async isDailyRuleListed(ruleName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await await this.chkDailyRule(ruleName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDailyRuleListed, err.message);
        }
    }
}