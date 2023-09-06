import TopMenu from "@page-objects/CXone/general/top-menu";
import ActionsPopup from "@page-objects/CXone/wfi/rules/available-actions-popup";
import ConditionsPopup from "@page-objects/CXone/wfi/rules/conditions-popup";
import DateTimePicker from "@page-objects/inContact/central/general/date-time-picker";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CreateRulePage extends TopMenu {
    private static _createRulePage: CreateRulePage = null;

    protected btnCreateRule = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_btnCreateRule_ShadowButtonSpan']"));
    protected btnAddCondition = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_btnAddCondition_ShadowButton']"));
    protected btnAddAction = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_btnAction_ShadowButton']"));
    protected btnActivate = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_btnToggleActivation_ShadowButton']"));

    protected rdoNumberOfContacts = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_rblSLAContacts']"));
    protected rdoNoCondition = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_chkNoCondition']"));

    protected lblRuleName = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_upRuleName']/div"));
    protected lblDetails = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_tab']"));
    protected lblStartDate = new ElementWrapper(by.xpath("//div[contains(@id,'calStartDate_title')]"));

    protected imgDate = new ElementWrapper(by.xpath("//img[contains(@id,'imgStartDateIcon')]"));
    protected imgNextArrow = new ElementWrapper(by.xpath("//div[contains(@id,'nextArrow')][contains(@class,'calendar_next')]"));
    protected imgPreviousArrow = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_txtName']"));
    protected imgPageLoad = new ElementWrapper(by.xpath("//img[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_Img5']"))

    protected cbbFrequency = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ddlFrequencyType']"));
    protected cbbEnd = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ddlEnd']"));
    protected cbbSkill = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ddlSLASkill']"));

    protected txtNumberOfContacts = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_txtSLAContacts']"))
    protected txtEvery = new ElementWrapper(by.xpath('//input[@id="ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_txtFreqEveryValue"]'));
    protected txtStartDate = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_txtStartDate']"));
    protected txtRuleName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_txtName']"));
    protected txtStartTime = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_tpTime_txtTimePicker']"));
    protected txtOccurence = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_txtOccurences']"));

    protected pulActionsNotDisplay = new ElementWrapper(by.xpath("//div[contains(@id,'tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_divActionModal')][contains(@style,'display: none')]"));

    // Dynamic controls
    protected lblCondition(dataPoint: string, value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_rptScoreConditions_ctl00_ctrlCollapseControl_lblHeader'][contains(text(),'${dataPoint}')][contains(text(),'${value}')]`));
    }

    protected ddlSkillList(skill: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_ddlSLASkill']/option[text()='${skill}']`));
    }

    protected lblStartTime(startTime: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[@class='ui-menu-item']/a[text()='${startTime}']`));
    }

    public static getInstance(): CreateRulePage {
        this._createRulePage = new CreateRulePage();
        return this._createRulePage;
    }

    /**
     * Enter valid value to every text box
     * @param {string} everyFrequency
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async enterValidEvery(everyFrequency: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering valid every for frequency");
            await this.txtEvery.type(everyFrequency);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValidEvery, err.message);
        }
    }

    /**
     * Enter valid value to Occurrence text box
     * @param {string} occurrence
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async enterValidOccurrence(occurrence: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering valid occurrence");
            await this.txtOccurence.type(occurrence);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValidOccurrence, err.message);
        }
    }

    /**
     * Enter valid name for rule
     * @param {string} ruleName
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async enterValidRuleName(ruleName: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering valid name for new rule");
            await this.txtRuleName.type(ruleName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValidRuleName, err.message);
        }
    }
    /**
     * Select frequency value
     * @param {string} frequency
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async selectFrequencyValue(frequency: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting frequency value");
            await this.cbbFrequency.selectOptionByText(frequency);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectFrequencyValue, err.message);
        }
    }

    /**
     * Verify rule creation wizard is displayed
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isRuleCreationWizardDisplayed(): Promise<boolean> {
        try {
            return await this.btnCreateRule.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRuleCreationWizardDisplayed, err.message);
        }
    }

    /**
     * Get entered rule name
     * @returns {Promise<string>}
     * @memberof CreateRulePage
     */
    public async getEnteredRuleName(): Promise<string> {
        try {
            return await this.txtRuleName.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredRuleName, err.message);
        }
    }

    /**
     * Get entered every value
     * @returns {Promise<string>}
     * @memberof CreateRulePage
     */
    public async getEnteredEveryValue(): Promise<string> {
        try {
            return await this.txtEvery.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredEveryValue, err.message);
        }
    }

    /**
     * Get entered occurence value
     * @returns {Promise<string>}
     * @memberof CreateRulePage
     */
    public async getEnteredOccurenceValue(): Promise<string> {
        try {
            return await this.txtOccurence.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredOccurenceValue, err.message);
        }
    }

    /**
     * Get selected frequency
     * @returns {Promise<string>}
     * @memberof CreateRulePage
     */
    public async getSelectedFrequency(): Promise<string> {
        try {
            return await this.cbbFrequency.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedFrequency, err.message);
        }
    }

    /**
     * Select start time for rule
     * @param {string} startDate
     * @param {string} StartTime
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async selectStartDateTime(startDate: string, StartTime: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting start date and time");
            await this.imgDate.click();
            let dateTimePicker: DateTimePicker = DateTimePicker.getInstance();
            await dateTimePicker.selectDateByDatePicker(startDate, "calStartDate_day", "calStartDate_title", "calStartDate_year", "calStartDate_month");
            await this.txtStartTime.click();
            await this.lblStartTime(StartTime).waitForControlStable();
            await this.lblStartTime(StartTime).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectStartDateTime, err.message);
        }
    }
    /**
     * Verify start date and time is selected
     * @param {string} startDate
     * @param {string} startTime
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isStartDateTimeSelected(startDate: string, startTime: string): Promise<boolean> {
        try {
            let matched: boolean = false;
            let date: Date = new Date(startDate);
            let selectedStartDate: string = await this.txtStartDate.getControlValue();
            let selectedStartTime: string = await this.txtStartTime.getControlValue();
            if (selectedStartDate == date.toLocaleDateString("en-US") && selectedStartTime == startTime) {
                matched = true;
            }
            return matched;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isStartDateTimeSelected, err.message);
        }
    }

    /**
     * Select end value
     * @param {string} end
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async selectEndValue(end: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting end value");
            await this.cbbEnd.selectOptionByText(end);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEndValue, err.message);
        }
    }

    /**
     * Get selected end
     * @returns {Promise<string>}
     * @memberof CreateRulePage
     */
    public async getSelectedEnd(): Promise<string> {
        try {
            return await this.cbbEnd.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedEnd, err.message);
        }
    }

    /**
     * Click Add condition button
     * @returns {Promise<ConditionsPopup>}
     * @memberof CreateRulePage
     */
    public async clickAddCondition(): Promise<ConditionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add condition button");
            await this.btnAddCondition.click();
            return await ConditionsPopup.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddCondition, err.message);
        }
    }

    /**
     * Select number of contacts
     * @param {string} numberOfContacts
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async selectNumberOfContacts(numberOfContacts: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting number of contacts");
            await this.rdoNumberOfContacts.click();
            await this.txtNumberOfContacts.type(numberOfContacts);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectNumberOfContacts, err.message);
        }
    }

    /**
     * Click No Condition check box
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async clickNoConditionCheckBox(): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on No Condition check box");
            await this.rdoNoCondition.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickNoConditionCheckBox, err.message);
        }
    }

    /**
     * Get selected number of contacts
     * @returns {Promise<number>}
     * @memberof CreateRulePage
     */
    public async getSelectedNumberOfContacts(): Promise<number> {
        try {
            return parseInt(await this.txtNumberOfContacts.getControlValue());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedNumberOfContacts, err.message);
        }
    }

    /**
     * Select skill value
     * @param {string} skill
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async selectSkill(skill: string): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting skill");
            await this.cbbSkill.selectOptionByText(skill);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectSkill, err.message);
        }
    }

    /**
     * Verify Rule Details tab is displayed
     * @param {string} ruleName
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isDetailsTabDisplayed(ruleName: string): Promise<boolean> {
        try {
            let matched: boolean = false;
            let isTabDetailsDisplayed: boolean = await this.lblDetails.isDisplayed();
            let lblRuleNameText = await this.lblRuleName.getText();
            let isRuleNameDisplayed: boolean = lblRuleNameText.trim() == ruleName;
            if (isTabDetailsDisplayed && isRuleNameDisplayed) {
                matched = true;
            }
            return matched;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDetailsTabDisplayed, err.message);
        }
    }

    /**
     * Verify skill is selected
     * @param {string} skill
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isSkillSelected(skill: string): Promise<boolean> {
        try {
            await this.ddlSkillList(skill).waitForControlStable();
            return await this.ddlSkillList(skill).isSelected();

        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillSelected, err.message);
        }
    }

    /**
     * Get No condition check box state
     * @returns {Promise<boolean>}
     * @memberof BusinessUnitPageDetails
     */
    public async getNoConditionCheckBoxState(): Promise<boolean> {
        try {
            return await <boolean>await BrowserWrapper.executeScript("return document.getElementById('ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleConditions_chkNoCondition').checked");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getNoConditionCheckBoxState, err.message);
        }
    }

    /**
     * Click Add action button
     * @returns {Promise<ActionsPopup>}
     * @memberof CreateRulePage
     */
    public async clickAddAction(): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add action button");
            await this.btnAddAction.click();
            return await ActionsPopup.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddAction, err.message);
        }
    }

    /**
     * Click Create rule button
     * @returns {Promise<CreateRulePage>}
     * @memberof CreateRulePage
     */
    public async clickCreateRule(): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Create rule button");
            await this.btnCreateRule.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateRule, err.message);
        }
    }

    /**
     * Verify Condition is displayed in rule
     * @param {string} dataPoint
     * @param {string} value
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isConditionDisplayedInRule(dataPoint: string, value: string): Promise<boolean> {
        try {
            await this.lblCondition(dataPoint, value).waitForControlStable();
            return await this.lblCondition(dataPoint, value).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConditionDisplayedInRule, err.message);
        }
    }
    /**
    * Verify available actions popup not displays
     * @returns {Promise<boolean>}
     * @memberof CreateRulePage
     */
    public async isActionsPopupNotDisplayed(): Promise<boolean> {
        try {
            return await this.pulActionsNotDisplay.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActionsPopupNotDisplayed, err.message);
        }
    }

}