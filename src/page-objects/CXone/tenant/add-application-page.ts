import CreateTenantPage from "@page-objects/CXone/tenant/create-tenant-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class AddApplicationPage {

    private static _addApplicationPage: AddApplicationPage = null;

    protected lblAddApplication = new ElementWrapper(by.xpath("//div[@class='modal-title ng-binding']"));
    protected divBodyQMSetting = new ElementWrapper(by.xpath("//div[contains(@class,'settings-container')]"));
    protected btnNext = new ElementWrapper(by.xpath("//button[contains(@class,'next')]"));
    protected btnBack = new ElementWrapper(by.xpath("//button[contains(@class,'back')]"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[contains(@class,'cancel')]"));
    protected chkQM = new ElementWrapper(by.xpath("//label[@class='feature-checkbox' and (.//span[text()='QM'])]/div"));
    protected cbbRecordingSource = new SelectElementWrapper(by.xpath("//div[@id='QMSourceDropdown']"));
    protected divAddApplicationForm = new ElementWrapper(by.xpath("//div[@window-top-class='add-application-modal']"));

    // Dynamic controls
    protected ddlRecordingSourceItem(recordingSource: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//div[contains(@class,'nice-dropdown')][.//span[text()='${recordingSource}']]`)));
    }

    protected lblApplicationItem(application: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//input[@type='radio']/following-sibling::label[text()='${application}']`)));
    }

    public static getInstance(): AddApplicationPage {
        // this._addApplicationPage = (this._addApplicationPage == null) ? new AddApplicationPage() : this._addApplicationPage;
        this._addApplicationPage = new AddApplicationPage();
        return this._addApplicationPage;
    }

    /**
     * Check "Add Application" page is displayed
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof AddApplicationPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblAddApplication.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Select application in "Add Application" page
     * @param {string} application application type
     * @returns {Promise<AddApplicationPage>} Add Application page
     * @memberof AddApplicationPage
     */
    public async selectApplication(application: string): Promise<AddApplicationPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Application '${application}'`);
            await this.lblApplicationItem(application).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectApplication, err.message);
        }
    }

    /**
     * Go to "Feature" tab by clicking "Next" button
     * @returns {Promise<AddApplicationPage>} Add Application page
     * @memberof AddApplicationPage
     */
    public async gotoFeatureTab(): Promise<AddApplicationPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Select Feature Tab");
            await this.btnNext.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoFeatureTab, err.message);
        }
    }

    /**
     * Check "QM" checkbox is displayed
     * @returns {Promise<boolean>}  Display=>true, not displayed=>false
     * @memberof AddApplicationPage
     */
    public async isQmCxoneCheckboxChecked(): Promise<boolean> {
        try {
            return (await this.chkQM.getAttribute("class")).includes("ng-not-empty");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQmCxoneCheckboxChecked, err.message);
        }
    }

    /**
     * Go to "Configure Setting" tab by clicking "Next" button
     * @returns {Promise<AddApplicationPage>} Add Application page
     * @memberof AddApplicationPage
     */
    public async gotoConfigureSettingsTab(): Promise<AddApplicationPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Configure Settings Tab");
            await this.btnNext.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoConfigureSettingsTab, err.message);
        }
    }

    /**
     * Check "Qm Setting" page is displayed
     * @returns {Promise<boolean>} the existence of "Qm Setting" page
     * @memberof AddApplicationPage
     */
    public async isQMSettingPageDisplayed(): Promise<boolean> {
        try {
            return await this.divBodyQMSetting.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQMSettingPageDisplayed, err.message);
        }
    }

    /**
     * Select recording source 
     * @param {string} recordingSource recording source type
     * @returns {Promise<AddApplicationPage>} Add Application page
     * @memberof AddApplicationPage
     */
    public async selectRecordingSource(recordingSource: string): Promise<AddApplicationPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting recording source ${recordingSource}`);
            await this.cbbRecordingSource.selectOptionByText(recordingSource);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectRecordingSource, err.message);
        }
    }

    /**
     * Check the "Config Setting" is selected
     * @param {string} recordingSource name of recording source
     * @returns {Promise<boolean>} the state of config setting in "QM Setting" page
     * @memberof AddApplicationPage
     */
    public async isConfigSettingSelected(recordingSource: string): Promise<boolean> {
        try {
            return await this.ddlRecordingSourceItem(recordingSource).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConfigSettingSelected, err.message);
        }
    }

    /**
     * Complete Add Application by clicking "Finish" button
     * @returns {Promise<CreateTenantPage>} "Create Tenant" page
     * @memberof AddApplicationPage
     */
    public async finishAddApplication(): Promise<CreateTenantPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on 'Finish' button on Add Application`);
            await this.btnNext.click();
            await this.divAddApplicationForm.waitUntilDisappear();
            return CreateTenantPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.finishAddApplication, err.message);
        }
    }
}