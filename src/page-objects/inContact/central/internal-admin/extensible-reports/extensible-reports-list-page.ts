import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CreateExtensibleReportsPage from "@page-objects/inContact/central/internal-admin/extensible-reports/create-extensibles-reports-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ExtensibleReportsListPage extends NavigationBar {
    private static _extensibleReportsListPage: ExtensibleReportsListPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsReports_btnCreateNewInAdvancedGridView_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_btnSearch']"));
    protected btnClearSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnClearSearch']"));
    protected panelLoading = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));
    protected tblReportList = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsReports_gridView']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_tbxSearchText']"));

    public static getInstance(): ExtensibleReportsListPage {
        this._extensibleReportsListPage = new ExtensibleReportsListPage();
        return this._extensibleReportsListPage;
    }

    /**
	  * Click Create new extensible report button
     * @returns {Promise<CreateExtensibleReportsPage>}
     * @memberof ExtensibleReportsListPage
     */
    public async clickCreateNewExtensibleReport(): Promise<CreateExtensibleReportsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Create New Extensible Report Button");

            await this.btnCreateNew.click();
            return await CreateExtensibleReportsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateNewExtensibleReport, err.message);
        }
    }

    /**
    * Search Report Schedules
     * @param {string} value to search
     * @returns {Promise<ExtensibleReportsListPage>}
     * @memberof ExtensibleReportsListPage
     */
    public async searchCustomReportSchedules(value: string): Promise<ExtensibleReportsListPage> {
        try {
            await Logger.write(FunctionType.UI, "Searching Custom Report Schedules");

            await this.txtSearch.type(value);
            await this.btnSearch.click();
            await this.panelLoading.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchCustomReportSchedules, err.message);
        }
    }

    /**
     * Is Extensible Report list Displayed
     * @returns {Promise<boolean>}
     * @memberof ExtensibleReportsListPage
     */
    public async isExtensibleReportsListDisplayed(): Promise<boolean> {
        try {
            return await this.tblReportList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isExtensibleReportsListDisplayed, err.message);
        }
    }


} 