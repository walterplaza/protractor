import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import NavigationBar from '@page-objects/inContact/central/general/navigation-bar';

export default class ParametersPage extends NavigationBar  {

    private static _parametersPage: ParametersPage = null;

    protected btnEditGeneralSettings = new ElementWrapper(by.xpath("//div[./h3[text()='General Settings']]//parent::div/input"));
    protected chkEnableDialingByProficiency = new ElementWrapper(by.xpath("//td[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_ctl01_ucGeneralSettings_td5']//input"));
    protected txtMaxOfCalls = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_ctl01_ucGeneralSettings_txtMaxNoOfCalls']"));
    protected txtMaximumWaitTimeToConsider = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_ctl01_ucGeneralSettings_txtMaximumWaitTimeToConsider']"));
    protected btnDone= new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_ctl01_ucGeneralSettings_btnDone_ShadowButtonSpan']"));
    protected lblErrorMessage=new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_ctl01_ucGeneralSettings_vsGeneralSettings']"));
    protected tabParameterActive= new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlNaturalCalling_tab' and @class='ajax__tab_active']"));
    protected lblGeneralSettings= new ElementWrapper(by.xpath("//div[contains(text(),'General Settings')]"));

    public static getInstance(): ParametersPage {
        this._parametersPage = new ParametersPage();
        return this._parametersPage;
    }

    /**
     * Click Edit General Settings button
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof ParametersPage
     */
    public async clickingEditGeneralSettings(): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Edit General Settings button`);
            await this.btnEditGeneralSettings.wait();
            await this.btnEditGeneralSettings.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickingEditGeneralSettings, err.message);
        }
    }

    /**
     * Check Enable Dialing By Proficiency check box
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof ParametersPage
     */
    public async selectEnableDialingByProficiencyCheckbox(): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Enable Dialing By Proficiency Checkbox`);
            await this.chkEnableDialingByProficiency.setCheckBox(true);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEnableDialingByProficiencyCheckbox, err.message);
        }
    }

    /**
     * Input value to Max Of Call text box
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof ParametersPage
     */
    public async inputMaxOfCallTextbox(numberCall): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Entering value ${numberCall}`);
            await this.txtMaxOfCalls.type(numberCall);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.inputMaxOfCallTextbox, err.message);
        }
    }

    /**
     * Save Parameters tab
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     *  @memberof ParametersPage
     */
    public async saveParametersTab(): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Done' button`);
            await this.btnDone.scrollToElement();
            await this.btnDone.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveParametersTab, err.message);
        }
    }

    /**
     * Verify the error message on top page
     * @author Nhat.Nguyen
     * @returns {Promise<string>} error message is match
     * @memberof ParametersPage
     */
    public async getErrorMessage(): Promise<string> {
        try {
            return (await this.lblErrorMessage.getText()).replace(`\n`, "");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessage, err.message);
        }
    }

    /**
     * is Parameters Page displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} displayed or not
     * @memberof ParametersPage
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnEditGeneralSettings.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * is General Settings displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} displayed or not
     * @memberof ParametersPage
     */
    public async isGeneralSettingsDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblGeneralSettings.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isGeneralSettingsDisplayed, err.message);
        }
    }

    /**
     * Check "Enable Dialing By Proficiency" is checked
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} check: true not check: false
     * @memberof ParametersPage
     */
    public async isEnableDialingByProficiencyChecked(): Promise<boolean> {
        try {
            return await this.chkEnableDialingByProficiency.isSelected();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEnableDialingByProficiencyChecked, err.message);
        }
    }

    /**
     * Get value of Max Of Call text box
     * @author Nhat.Nguyen
     * @returns {Promise<number>} value of Max Of Call
     * @memberof ParametersPage
     */
    public async getValueOfMaxOfCall(): Promise<number> {
        try {
            let maxOfCall: string = await this.txtMaxOfCalls.getControlValue();
            return parseInt(maxOfCall.trim());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getValueOfMaxOfCall, err.message);
        }
    }

    /**
     * Uncheck Enable Dialing By Proficiency check box
     * @author Nhat.Nguyen
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof ParametersPage
     */
    public async deselectEnableDialingByProficiencyCheckbox(): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Deselecting Enable Dialing By Proficiency Checkbox`);
            await this.chkEnableDialingByProficiency.setCheckBox(false);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.deselectEnableDialingByProficiencyCheckbox, err.message);
        }
    }

    /**
     * Input value to Maximum Wait Time To Consider textbox
     * @author Tung.Vo
     * @returns {Promise<ParametersPage>} Parameters page
     * @memberof ParametersPage
     */
    public async inputMaximumWaitTimeToConsiderTextbox(time): Promise<ParametersPage> {
        try {
            await Logger.write(FunctionType.UI, `Entering value ${time}`);
            await this.txtMaximumWaitTimeToConsider.type(time);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.inputMaximumWaitTimeToConsiderTextbox, err.message);
        }
    }

     /**
     * is Edit Button Displayed
     * @author Tung.Vo
     * @returns {Promise<boolean>} displayed or not
     * @memberof ParametersPage
     */
    public async isEditButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnEditGeneralSettings.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEditButtonDisplayed, err.message);
        }
    }
    
    /**
     * Get value of Max Wait Time To Consider text box
     * @author Tung.Vo
     * @returns {Promise<number>} value of Max Of Call
     * @memberof ParametersPage
     */
    public async getValueOfMaxWaitTimeToConsider(): Promise<number> {
        try {
            let maxWaitTimeToConsider: string = await this.txtMaximumWaitTimeToConsider.getControlValue();
            return parseInt(maxWaitTimeToConsider.trim());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getValueOfMaxWaitTimeToConsider, err.message);
        }
    }
}