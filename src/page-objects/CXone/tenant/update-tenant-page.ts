import BusinessUnitDetailsPage from "@page-objects/CXone/acd/acd-configuration/business-unit-details-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import CreateTenantPage from "@page-objects/CXone/tenant/create-tenant-page";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";

export default class UpdateTenantPage extends CreateTenantPage {

    private static _updateTenantPage: UpdateTenantPage = null;

    protected btnMoreSetting = new ElementWrapper(by.xpath("//button[@id='more-settings-button-new']"));
    protected btnCreateAndActive = new ElementWrapper(by.xpath("//div[@class='pull-right header-buttons-container-new']//button[@id='create-tenant-save-btn-validate']"));

    protected lblImpersonateAndConfigure = new ElementWrapper(by.xpath("//ul[@id='more-settings-dropdown-new']/li[@id='launchImpersonation-new']"));
    protected lblImpersonateAndSupport = new ElementWrapper(by.xpath("//ul[@id='more-settings-dropdown-new']/li[@id='launchSupportImpersonation-new']"));
    protected lblDeactivateAccount = new ElementWrapper(by.xpath("//ul[@id='more-settings-dropdown']/li[@id='toggleStatus']"));

    protected txtTenantName = new ElementWrapper(by.xpath("//div[@class='top-section-container']//input[@id='tenant-name']"));
    protected txtCreateDate = new ElementWrapper(by.xpath("//date-picker[@id='creationDate']//input[@name='creationDate']"));
    protected txtBusinessUnit = new ElementWrapper(by.xpath("//div[@class='field ng-scope']//input[@name='billingId']"));
    protected txtClusterId = new ElementWrapper(by.xpath("//div[@class='field ng-scope']//input[@id='cluster-id']"));
    protected txtBillingCycle = new ElementWrapper(by.xpath("//div[@class='row ng-scope']//input[@name='billingCycle']"));
    protected txtBillingTelephoneNumber = new ElementWrapper(by.xpath("//div[@class='row ng-scope']//input[@name='billingTelephoneNumber']"));
    protected txtUserCap = new ElementWrapper(by.xpath("//div[@class='row ng-scope']//input[@name='userSoftLimit']"));

    protected ddlPartner = new ElementWrapper(by.xpath("//div[@id='partner-dropdown']//div[@class='nice-dropdown ng-pristine ng-untouched ng-valid ng-isolate-scope nice-split-dropdown ng-not-empty']//div[contains(@class,'selectize-input')]/input"));
    protected ddlTenantType = new ElementWrapper(by.xpath("//div[@id='partner-type-popover']//div[@class='ui-select-container selectize-control single ng-pristine ng-untouched ng-valid ng-scope ng-not-empty nice-split-dropdown-container']//div[contains(@class,'selectize-input')]/input"));
    protected ddlTimezone = new ElementWrapper(by.xpath("//label[text()='TimeZone']/parent::div//div[@class='selectize-input']"));
    protected ddlBrandingProfile = new ElementWrapper(by.xpath("//div[@id='branding-profile-dropdown']//div[@class='selectize-input']"));

    constructor() { super(); }

    public static getInstance(): UpdateTenantPage {
        // this._updateTenantPage = (this._updateTenantPage == null) ? new UpdateTenantPage() : this._updateTenantPage;
        this._updateTenantPage = new UpdateTenantPage();
        return this._updateTenantPage;
    }

    /**
     * Check tenant details page is displayed or not
     * @returns {Promise<boolean>} the existence of tenant detail page
     * @memberof UpdateTenantPage
     */
    public async isTenantDetailPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnMoreSetting.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTenantDetailPageDisplayed, err.message);
        }
    }

    /**
     * Show more setting options by clicking more setting option
     * @returns {Promise<this>} Update Tenant Page
     * @memberof UpdateTenantPage
     */
    public async showMoreSettingOption(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Showing more setting options");
            await this.btnMoreSetting.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.showMoreSettingOption, err.message);
        }
    }

    /**
     * Check more setting option is displayed or not
     * @returns {Promise<boolean>} the existence of impersonate and configure option and impersonate and support option
     * @memberof UpdateTenantPage
     */
    public async isMoreSettingOptionDisplayed(): Promise<boolean> {
        try {
            return (await this.lblImpersonateAndConfigure.isDisplayed() && await this.lblImpersonateAndSupport.isDisplayed());
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMoreSettingOptionDisplayed, err.message);
        }
    }

    /**
     * Click impersonate and configure option in more setting drop down
     * @returns {Promise<BusinessUnitDetailsPage>} Business Unit Details page
     * @memberof UpdateTenantPage
     */
    public async selectImpersonateAndConfigureDetailsItem(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting impersonate and configure option");
            await this.lblImpersonateAndConfigure.click();
            return BusinessUnitDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectImpersonateAndConfigureDetailsItem, err.message);
        }
    }

    /**
     * Select impersonate and support item
     * @author Tan.Ta
     * @returns {Promise<EmployeesPage>}
     * @memberof UpdateTenantPage
     */
    public async selectImpersonateAndSupportItem(): Promise<EmployeesPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting impersonate and support option");
            await this.lblImpersonateAndSupport.click();
            return EmployeesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectImpersonateAndSupportItem, err.message);
        }
    }

    /**
     * Check tenant name is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isTenantNameFieldEnable(): Promise<boolean> {
        try {

            return await this.txtTenantName.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTenantNameFieldEnable, err.message);
        }
    }

    /**
     * Check partner is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isPartnerFieldEnable(): Promise<boolean> {
        try {

            return await this.ddlPartner.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPartnerFieldEnable, err.message);
        }
    }

    /**
     * Check tenant type is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isTenantTypeFieldEnable(): Promise<boolean> {
        try {

            return await this.ddlTenantType.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTenantTypeFieldEnable, err.message);
        }
    }


    /**
     * Check create date is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isCreateDateFieldEnable(): Promise<boolean> {
        try {

            return await this.txtCreateDate.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateDateFieldEnable, err.message);
        }
    }

    /**
     * Check business unit is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isBusinessUnitFieldEnable(): Promise<boolean> {
        try {

            return await this.txtBusinessUnit.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBusinessUnitFieldEnable, err.message);
        }
    }

    /**
     * Check cluster id is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isClusterIdFieldEnable(): Promise<boolean> {
        try {

            return await this.txtClusterId.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isClusterIdFieldEnable, err.message);
        }
    }

    /**
     * Check billing cycle is enable or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isBillingCycleFieldEnable(): Promise<boolean> {
        try {

            return await this.txtBillingCycle.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBillingCycleFieldEnable, err.message);
        }
    }

    /**
     * Check timezone is enable or not
     *
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isTimezoneFieldEnable(): Promise<boolean> {
        try {

            return await this.ddlTimezone.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTimezoneFieldEnable, err.message);
        }
    }

    /**
     * Check user cap is enable or not
     *
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isUserCapFieldEnable(): Promise<boolean> {
        try {

            return await this.txtUserCap.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isUserCapFieldEnable, err.message);
        }
    }

    /**
     * Check billing telephone number is enable or not
     *
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isBillingTelephoneNumberFieldEnable(): Promise<boolean> {
        try {

            return await this.txtBillingTelephoneNumber.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBillingTelephoneNumberFieldEnable, err.message);
        }
    }

    /**
     * Get User cap value
     *
     * @returns {Promise<number>}
     * @memberof UpdateTenantPage
     */
    public async getUserCapValue(): Promise<number> {
        try {
            await Logger.write(FunctionType.UI, `Getting UserCap value`);
            return parseInt(await this.txtUserCap.getControlValue());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getUserCapValue, err.message);
        }

    }

    /**
     * Check create and active button is enable or not
     *
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isCreateAndActiveButtonEnable(): Promise<boolean> {
        try {

            return await this.btnCreateAndActive.isEnabled();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateAndActiveButtonEnable, err.message);
        }
    }

    /**
     * Check default value of branding profile is selected or not
     *
     * @returns {Promise<boolean>}
     * @memberof UpdateTenantPage
     */
    public async isDefaultValueOfBrandingProfileSelected(): Promise<boolean> {
        try {
            let value: string = await this.ddlBrandingProfile.getText();
            let isSelected: boolean = false;

            if (value.includes("(Default)")) {
                isSelected = true;
            }

            return isSelected;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDefaultValueOfBrandingProfileSelected, err.message);
        }
    }

}
