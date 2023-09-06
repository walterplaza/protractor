import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import BusinessUnitDetailTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import InternalBusinessUnitPage from "./internal-business-unit-page";

export default class FeatureTabPage extends InternalBusinessUnitPage {

    private static _featureTabPage: FeatureTabPage = null;

    public static getInstance(): FeatureTabPage {
        this._featureTabPage = new FeatureTabPage();
        return this._featureTabPage;
    }

    protected btnEdit = new ElementWrapper(by.xpath("//button[contains(@id,'tabFeatures_BusinessUnitFeatures_btnEdit')]"));
    protected imgLoading = new ElementWrapper(by.xpath("//img[contains(@id,'Content_ManagerContent_Img5')]/parent::div"));
    protected chkSoftPhoneIntegrated = new ElementWrapper(by.xpath("//input[contains(@id,'chkIntegratedSoftphone')]"));
    protected btnEditFeature = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_btnEdit_ShadowButton']/span[text()='Edit']"));
    protected btnSaveFeature = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_btnEdit_ShadowButton']/span[text()='Save']"));
    protected chkNiceWorkForceManagement = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_chkinContactWorkforceManagement']"));
    protected chkNiceCapacityPlanner = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_BusinessUnitFeatures_chkInContactCapacityPlanner']"));
    protected chkThinAgent = new ElementWrapper(by.xpath("//input[@type='checkbox'][contains(@id,'chkThinAgent')]"));

    /**
     * Click Edit button Feature Tab in Internal Business Unit
     * @returns {Promise<this>} FeatureTabPage
     * @memberof FeatureTabPage
     */
    public async editFeatureTab(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Clicking edit button");
            await this.btnEditBUTab('Features').click();
            await this.imgLoading.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editFeatureTab, err.message);
        }
    }

    /**
     * Click Save button Feature tab after editing Feature tab
     * @returns {Promise<BusinessUnitDetailTabPage>} Return to BusinessUnitDetailPage
     * @memberof FeatureTabPage
     */
    public async saveFeatureTab(): Promise<BusinessUnitDetailTabPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking save button");
            await this.btnSaveFeature.scrollToElement();
            await this.btnSaveFeature.click();
            await this.btnSaveFeature.waitUntilDisappear();
            let businessUnitDetailTabPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page`).default;
            return businessUnitDetailTabPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveFeatureTab, err.message);
        }
    }

    /**
     * Editing Soft Phone Integrated
     * @param {boolean} isChecked soft phone checkbox is checked or unchecked
     * @returns {Promise<this>} 
     * @memberof FeatureTabPage
     */
    public async editSoftPhoneIntegrated(isChecked: boolean): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Editing soft phone checkbox is checked or unchecked");
            let _isChecked: string = await this.chkSoftPhoneIntegrated.getAttribute("checked");
            if (_isChecked != "true" && isChecked == true) {
                await this.chkSoftPhoneIntegrated.click();
            }
            if (_isChecked == "true" && isChecked == false) {
                await this.chkSoftPhoneIntegrated.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editSoftPhoneIntegrated, err.message);
        }
    }

    /**
     * Setting soft phone integrated 
     * @param {boolean} isChecked soft phone checkbox is checked or unchecked
     * @returns {Promise<BusinessUnitDetailTabPage>} 
     * @memberof FeatureTabPage
     */
    public async setSoftPhoneIntegrated(isChecked: boolean): Promise<BusinessUnitDetailTabPage> {
        try {
            await Logger.write(FunctionType.UI, "Setting soft phone integrated");
            await this.editFeatureTab();
            await this.editSoftPhoneIntegrated(isChecked);
            return await this.saveFeatureTab();
        } catch (err) {
            throw new errorwrapper.CustomError(this.setSoftPhoneIntegrated, err.message);
        }
    }

    /**
     * Click on Edit button of Business Feature
     * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
     *  @memberof FeatureTabPage
     */
    public async editBusinessFeature(): Promise<FeatureTabPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Edit Business Feature button`);
            await this.btnEditFeature.click();
            await this.btnEditFeature.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editBusinessFeature, err.message);
        }
    }

    /**
        * Click on Save button of Business Feature
        * @returns {Promise<BusinessUnitPageDetails>} Business unit Details page
        *  @memberof FeatureTabPage
        */
    public async saveBusinessFeature(): Promise<FeatureTabPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Save Business Feature button`);
            await this.btnSaveFeature.click();
            await this.btnSaveFeature.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveBusinessFeature, err.message);
        }
    }

    /**
     * is Business Unit Feature details Displayed
     * @returns {Promise<Boolean>}
     * @memberof FeatureTabPage
     */
    public async isBusinessUnitFeatureDisplayed(): Promise<Boolean> {
        try {
            return await this.btnEditFeature.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBusinessUnitFeatureDisplayed, err.message);
        }
    }

    /**
     * Set Nice Work Force Management checkbox to ON
     * @returns {Promise<Boolean>}
     * @param {boolean} state Business tab 
     * @memberof FeatureTabPage
     */
    public async enableNiceWorkForceManagement(state: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Setting Nice Work Force Management checkbox to ON`);
            await this.chkNiceWorkForceManagement.setCheckBox(state);
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableNiceWorkForceManagement, err.message);
        }
    }

    /**
     * Set Nice Work Force Management checkbox to OFF
     * @returns {Promise<Boolean>}
     * @param {boolean} method Business tab 
     * @memberof FeatureTabPage
     */
    public async disableNiceWorkForceManagement(state: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Setting Nice Work Force Management checkbox to OFF`);
            await this.chkNiceWorkForceManagement.setCheckBox(state);

            if (TestRunInfo.browser == Browser.EDGE) { } else {
                await BrowserWrapper.waitForAlertDisplay();
                await BrowserWrapper.acceptAlert();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableNiceWorkForceManagement, err.message);
        }
    }

    /**
     * is Nice Work Force Management check box enabled
     * @returns {Promise<boolean>}
     * @memberof FeatureTabPage
     */
    public async isNiceWorkForceManagementChecked(): Promise<boolean> {
        try {
            return await this.chkNiceWorkForceManagement.isSelected(TestRunInfo.middleTimeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNiceWorkForceManagementChecked, err.message);
        }
    }

    /**
     * Set Nice Capacity Planner checkbox to ON
     * @returns {Promise<Boolean>}
     * @param {boolean} state Business tab 
     * @memberof FeatureTabPage
     */
    public async enableNiceCapacityPlanner(state: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Setting Nice Capacity Planner checkbox to ON`);
            await this.chkNiceCapacityPlanner.setCheckBox(state);
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableNiceCapacityPlanner, err.message);
        }
    }

    /**
     * is Nice Capacity Planner check box enabled
     * @returns {Promise<boolean>}
     * @memberof FeatureTabPage
     */
    public async isNiceCapacityPlannerChecked(): Promise<boolean> {
        try {
            return await this.chkNiceCapacityPlanner.isSelected(TestRunInfo.middleTimeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNiceCapacityPlannerChecked, err.message);
        }
    }

    /**
    * set checkbox Thin Agent
    * @returns {Promise<void>}
    * @param {state} value to set for Thin Agent
    * @author Tung.Vo
    * @memberof FeatureTabPage
    */

    public async setChkThinAgent(state: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Setting Agent Thin checkbox to ${state}`);
            await this.chkThinAgent.setCheckBox(state);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setChkThinAgent, err.message);
        }
    }
}
