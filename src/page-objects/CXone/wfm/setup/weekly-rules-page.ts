import CreateNewWeeklyRule from "@page-objects/CXone/wfm/setup/create-new-weekly-rule-popup";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
export default class WeeklyRules {

    private static _WeeklyRules: WeeklyRules = null;

    protected btnNewRule = new ElementWrapper(by.xpath("//button[@id='newRule']"));
    protected btnDeleteRule = new ElementWrapper(by.xpath("//button[text()='Delete']"));
    protected btnYesConfirm = new ElementWrapper(by.xpath("//button[@id='popup-delete']"));
    protected lbtTitle = new ElementWrapper(by.xpath("//h1[text()='Weekly Rules']"));

    // Dynamic controls
    protected chkWeeklyRule(ruleName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[.//div[text()='${ruleName}'] and @role='row']//label`));
    }

    public static getInstance(): WeeklyRules {
        this._WeeklyRules = new WeeklyRules();
        return this._WeeklyRules;
    }

    /**
     * Go to create new weekly rule popup
     * @author Nhat.Nguyen
     * @returns {Promise<WeeklyRulePage>} weekly rules Page
     * @memberof WeeklyRulePage
     */
    public async gotoCreateNewWeeklyRule(): Promise<CreateNewWeeklyRule> {
        try {
            await Logger.write(FunctionType.UI, `Going to create new weekly rule popup`);
            await this.btnNewRule.click();
            let createNewWeeklyRulePopup = require(`${ProjectPath.pageObjects}/CXone/wfm/setup/create-new-weekly-rule-popup`).default;
            return createNewWeeklyRulePopup.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCreateNewWeeklyRule, err.message);
        }
    }

    /**
     * Remove Weekly Rule
     * @author Nhat.Nguyen
     * @param {string} ruleName
     * @returns {Promise<WeeklyRulePage>} weekly rules Page
     * @memberof WeeklyRulePage
     */
    public async removeWeeklyRule(ruleName: string, timeoutInSecond?: number): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, `Deleting weekly rule`);
            if (await this.chkWeeklyRule(ruleName).isDisplayed(timeoutInSecond)) {
                await this.chkWeeklyRule(ruleName).click();
                await this.btnDeleteRule.wait();
                await this.btnDeleteRule.click();
                await this.btnYesConfirm.click();
                await this.chkWeeklyRule(ruleName).waitUntilDisappear();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeWeeklyRule, err.message);
        }
    }

    /**
     * Check Weekly Rule page is displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof WeeklyRulePage
     */
    public async isWeeklyRuleDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lbtTitle.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWeeklyRuleDisplayed, err.message);
        }
    }

    /**
     * Check New Rule button displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof WeeklyRulePage
     */
    public async isNewRuleButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnNewRule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewRuleButtonDisplayed, err.message);
        }
    }

    /**
     * Check new weekly rule is listed in Page
     * @author Nhat.Nguyen
     * @param {string} ruleName
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof WeeklyRulePage
     */
    public async isNewWeeklyRuleListed(ruleName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.chkWeeklyRule(ruleName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewRuleButtonDisplayed, err.message);
        }
    }
}