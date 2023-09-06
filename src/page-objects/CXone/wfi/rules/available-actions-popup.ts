import TopMenu from "@page-objects/CXone/general/top-menu";
import CreateRulePage from "@page-objects/CXone/wfi/rules/create-rule-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class ActionsPopup extends TopMenu {
    private static _actionsPopup: ActionsPopup = null;

    protected popActions = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_divActionModal']"));

    protected lblManageSkill = new ElementWrapper(by.xpath("//a[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_rptActions_ctl06_lbAction']"));
    protected lblAddActionSuccessMessage = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_msgActionAdded']//p"));
    protected lblWaiting = new ElementWrapper(by.xpath("//span[@class='msi-help'][text()='Waiting...']"));

    protected tblManageSkill = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_hfActionID']/parent::div"));

    protected btnAddSkill = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_SkillsMultiSelect_msSkills_btnAddItem']"));
    protected btnAddAgent = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_agentsMultiSelect_msAgents_btnAddItem']"));
    protected btnAddAction = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_btnAddAction_ShadowButton']"));
    protected btnAddTeam = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_teamsMultiSelect_msTeams_btnAddItem']"));
    protected btnIAmDoneAddingConditions = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_btnConfirmOk_ShadowButton']"));
    protected btnMoveRight = new ElementWrapper(by.xpath("//div[@id='modalInner']//button[@class='UCNWebButton msi-move-right-button']"));
    protected btnDone = new ElementWrapper(by.xpath("//div[@id='modalImageColumn']//button[@class='UCNWebButton msi-search-ok-button primary-inline-real-button evolve-float-right']"));

    protected rdoAddSkillAtProficiency = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_rbAddskillProficiency']"));
    protected rdoActivateSkill = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_rbEnableskill']"));
    protected rdoSelectedActivate = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_rbEnableskill'][@checked='checked']"));

    protected cbbProficiency = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_ddlAddskillProficiency']"));
    protected cbbItem = new SelectElementWrapper(by.xpath("//div[@id='modalImageColumn']//select[@class='msi-control-results']"));

    protected txtRecoveryLevel = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_txtRecoveryPercentage']"));
    protected txtSearch = new ElementWrapper(by.xpath("//div[@id='modalInner']//div[@class='msi-search-section']/input"));

    // Dynamic controls
    protected lblSkill(skill: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_SkillsMultiSelect_msSkills_divListContainer']/div[@title='${skill}']`));
    }

    protected lblTeam(team: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_teamsMultiSelect_msTeams_divListContainer']/div[@title='${team}']`));
    }

    protected lblAgent(agent: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_tcRuleDetails_tpnlRule_ruleDetailsEdit_ruleActions_ctrlActionEditor_ctrlManageAgentSkill_agentsMultiSelect_msAgents_divListContainer']/div[@title='${agent}']`));
    }

    public static getInstance(): ActionsPopup {
        this._actionsPopup = new ActionsPopup();
        return this._actionsPopup;
    }

    /**
     * Add item
     * @param {string} item
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async addItem(item: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Adding item");
            await this.txtSearch.type(item);
            await this.lblWaiting.waitForVisibilityOf();
            await this.lblWaiting.waitUntilDisappear();
            await this.cbbItem.selectOptionByText(item);
            await this.btnMoveRight.click();
            await this.btnDone.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addItem, err.message);
        }
    }

    /**
     * Verify available actions popup displays
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isActionsPopupDisplayed(): Promise<boolean> {
        try {
            return await this.popActions.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActionsPopupDisplayed, err.message);
        }
    }

    /**
     * Add skill to manage skill
     * @param {string} agent
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async addSkillToManageAgentSkill(skill: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Adding skill to manage agent skill");
            await this.btnAddSkill.click();
            await this.addItem(skill);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addSkillToManageAgentSkill, err.message);
        }
    }

    /**
     * Add agent to manage skill
     * @param {string} agent
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async addAgentToManageAgentSkill(agent: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Adding agent to manage agent skill");
            await this.btnAddAgent.click();
            await this.addItem(agent);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addAgentToManageAgentSkill, err.message);
        }
    }
    /**
     * Add team to manage skill
     * @param {string} team
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async addTeamToManageAgentSkill(team: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Adding team to manage agent skill");
            await this.btnAddTeam.click();
            await this.addItem(team);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addTeamToManageAgentSkill, err.message);
        }
    }

    /**
     * Select proficiency value
     * @param {string} proficiency
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async selectProficiency(proficiency: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Selecting proficiency value");
            await this.rdoAddSkillAtProficiency.click();
            await this.cbbProficiency.selectOptionByText(proficiency);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectProficiency, err.message);
        }
    }

    /**
     * Selecting activate skill option
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async selectActivateSkill(): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Selecting activate skill option");
            await this.rdoActivateSkill.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectActivateSkill, err.message);
        }
    }

    /**
      * Enter value for Recovery Level
     * @param {string} recoveryLevel
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async enterRecoveryLevelValue(recoveryLevel: string): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Entering recovery level value");
            await this.txtRecoveryLevel.type(recoveryLevel);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterRecoveryLevelValue, err.message);
        }
    }

    /**
     * Click Manage Skill label
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async clickManageSkill(): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Manage Skill label");
            await this.lblManageSkill.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickManageSkill, err.message);
        }
    }

    /**
     * Click Add This Action button
     * @returns {Promise<ActionsPopup>}
     * @memberof ActionsPopup
     */
    public async clickAddThisAction(): Promise<ActionsPopup> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add This Action button");
            await this.btnAddAction.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddThisAction, err.message);
        }
    }

    /**
     * Verify manage skill components is displayed
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isManageSkillComponentsDisplayed(): Promise<boolean> {
        try {
            return await this.tblManageSkill.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isManageSkillComponentsDisplayed, err.message);
        }
    }

    /**
     * Get selected proficiency
     * @returns {Promise<string>}
     * @memberof ActionsPopup
     */
    public async getSelectedProficiency(): Promise<string> {
        try {
            return await this.cbbProficiency.getSelectedItem();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedProficiency, err.message);
        }
    }

    /**
     * Verify activate skill radio button is selected
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isActivateSkillSelected(): Promise<boolean> {
        try {
            await this.rdoSelectedActivate.waitForControlStable();
            return await this.rdoSelectedActivate.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActivateSkillSelected, err.message);
        }
    }

    /**
     * Get entered Recovery Level
     * @returns {Promise<string>}
     * @memberof ActionsPopup
     */
    public async getEnteredRecoveryLevel(): Promise<string> {
        try {
            return await this.txtRecoveryLevel.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredRecoveryLevel, err.message);
        }
    }

    /**
     * Get success message is diplayed
     * @returns {Promise<string>}
     * @memberof ActionsPopup
     */
    public async getAddActionSuccessMessage(): Promise<string> {
        try {
            return await this.lblAddActionSuccessMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddActionSuccessMessage, err.message);
        }
    }

    /**
     * Verify Skill to be modified is selected
     * @param {string} skill
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isSkillToBeModifiedSelected(skill: string): Promise<boolean> {
        try {
            await this.lblSkill(skill).waitForControlStable();
            return await this.lblSkill(skill).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillToBeModifiedSelected, err.message);
        }
    }

    /**
     * Verify Agent to be modified is selected
     * @param {string} agent
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isAgentToBeModifiedSelected(agent: string): Promise<boolean> {
        try {
            await this.lblAgent(agent).waitForControlStable();
            return await this.lblAgent(agent).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentToBeModifiedSelected, err.message);
        }
    }

    /**
     * Verify Team to be modified is selected
     * @param {string} team
     * @returns {Promise<boolean>}
     * @memberof ActionsPopup
     */
    public async isTeamToBeModifiedSelected(team: string): Promise<boolean> {
        try {
            await this.lblTeam(team).waitForControlStable();
            return await this.lblTeam(team).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTeamToBeModifiedSelected, err.message);
        }
    }

    /**
     * Click I am Done Adding Conditions button
     * @returns {Promise<CreateRulePage>}
     * @memberof ActionsPopup
     */
    public async clickIAmDoneAddingAction(): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking I am Done Adding Actions button");
            await this.waitForSpinner();
            await this.btnIAmDoneAddingConditions.click();
            return await CreateRulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickIAmDoneAddingAction, err.message);
        }
    }
}