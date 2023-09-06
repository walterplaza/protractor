import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import BusinessUnitDetailsPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page";
import FeatureTabPage from "@page-objects/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class InternalBusinessUnitPage extends NavigationBar {

    private static _internalBusinessUnitPage: InternalBusinessUnitPage = null;

    protected tabFeature = new ElementWrapper(by.xpath("//span[contains(@id,'tcBusinessUnit_tabFeatures_tab')]"));
    protected tabDetail = new ElementWrapper(by.xpath("//span[contains(@id,'tcBusinessUnit_tabDetails_tab')]"));
    protected tblBusinessUnit = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_GridControl']"));
    protected txtSearchBusinessUnit = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_tbxSearchText']"));
    protected pnlServerMail = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tabFeatures_upFeatures']/div[@id='ModalPanel'][contains(@style,'display: none')]"));
    protected btbSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_btnSearch']"));
    protected btnEditDetails = new ElementWrapper(by.xpath("//button[contains(@id,'BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and contains(@id,'btnEdit_ShadowButton')]"));
    protected btnDoneDetails = new ElementWrapper(by.xpath("//button[contains(@id,'BaseContent_Content_ManagerContent_tcBusinessUnit_tabDetails') and contains(@id,'btnNext_ShadowButton')]"));
    protected imgClear = new ElementWrapper(by.xpath("//li[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_liClearImage']//*[name()='svg']"));

    // Dynamic controls
    protected lblBusinessItem(businessUnitID: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsBusinessUnits_gridView']//td[text()='${businessUnitID}']`));
    }

    protected btnEditBUTab(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}_BusinessUnit${tabName}_btnEdit_ShadowButton']`));
    }

    protected txtDeliveryRecords(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'txtDeliveryRecords')]`));
    }

    protected txtDeliveryTimePeriod(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'txtDeliveryTimePeriod')]`));
    }

    protected txtDeliveryMaxPerDay(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'txtDeliveryMaxPerDay')]`));
    }

    protected txtEmailServerURL(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'txtEmailServerURL')]`));
    }

    protected txtPort(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'txtEmailServerPort')]`));
    }

    protected btnConfirmMailServer(tabName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//input[contains(@id,'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcBusinessUnit_tab${tabName}') and contains(@id,'btnSubmit_ShadowButton')]`));
    }

    public static getInstance(): InternalBusinessUnitPage {
        this._internalBusinessUnitPage = new InternalBusinessUnitPage();
        return this._internalBusinessUnitPage;
    }

    /**
     * Going to Feature Tab
     * @returns {Promise<FeatureTabPage>} FeatureTabPage
     * @memberof BusinessUnitPage
     */
    public async gotoFeatureTab(): Promise<FeatureTabPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Feature")
            await this.tabFeature.click();
            await this.fillInMailServer();
            let featurePage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/business-unit-feature-tab-page`).default;
            return featurePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoFeatureTab, err.message);
        }
    }

    /**
     * is Business Unit List Displayed
     * @returns {Promise<Boolean>}
     * @memberof BusinessUnitPage
     */
    public async isPageDisplayed(): Promise<Boolean> {
        try {
            await this.waitForSpinnerComponentDisappear();
            return await this.tblBusinessUnit.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
	 * Select a Business unit
	 * @returns {Promise<SupervisorPage>} MAX page
	 * @param {string} businessUnitID Business ID
	 * @memberof BusinessUnitPage
	 */
    public async selectBusinessUnit(businessUnitID: string, isSearch: boolean = true): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Business ${businessUnitID}`);
            if (isSearch) {
                await this.txtSearchBusinessUnit.type(businessUnitID);
                await this.btbSearch.click();
                await this.waitForSpinnerComponentDisappear();
            }
            await this.lblBusinessItem(businessUnitID).click();
            await this.waitForPageLoad();
            let businessUnitDetailsPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page`).default;
            return businessUnitDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectBusinessUnit, err.message);
        }
    }

    //Handle issue server mail panel is displayed when open Business Unit feature tab.
    public async fillInMailServer(tabName: string = 'Features', isSubmit: boolean = true): Promise<void> {
        try {
            if (await this.pnlServerMail.isDisplayed(TestRunInfo.shortTimeout) == false) {
                await Logger.write(FunctionType.UI, `Filling in mail server`);
                if (TestRunInfo.browser = Browser.IE) {
                    await this.txtPort(tabName).scrollToElement();
                }
                await this.txtDeliveryRecords(tabName).type(5);
                await this.txtDeliveryTimePeriod(tabName).type(1000);
                await this.txtDeliveryMaxPerDay(tabName).type(100);
                await this.txtEmailServerURL(tabName).type("QA0-INMAIL.IN.LAB");
                await this.txtPort(tabName).type(25);
                if (isSubmit == true) {
                    await this.btnConfirmMailServer(tabName).click();
                }
            };
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillInMailServer, err.message);
        }
    }
    /**
     * Going to Details Tab
     * @returns {Promise<InternalBusinessUnitPage>} InternalBusinessUnitPage
     * @memberof InternalBusinessUnitPage
     */
    public async gotoDetailsTab(): Promise<BusinessUnitDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Details")
            await this.tabDetail.click();
            let businessUnitDetailsPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/business-unit-detail-tab-page`).default;
            return businessUnitDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoDetailsTab, err.message);
        }
    }
}