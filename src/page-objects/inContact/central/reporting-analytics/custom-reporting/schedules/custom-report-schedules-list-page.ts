import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CreateCustomReportSchedulePage from "@page-objects/inContact/central/reporting-analytics/custom-reporting/schedules/create-custom-report-schedule-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CustomReportSchedulesListPage extends NavigationBar {
    private static _customReportSchedulesListPage: CustomReportSchedulesListPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_btnCreateNewInAdvancedGridView_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_btnSearch']"));
    protected btnClearSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnClearSearch']"));

    protected txtSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_tbxSearchText']"));

    protected panelLoading = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));

    protected tblReportList = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_gridView']"));

    // Dynamic controls
    protected lblReportItem(reportName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tbody//td[text()='${reportName}']`));
    }

    public static getInstance(): CustomReportSchedulesListPage {
        this._customReportSchedulesListPage = new CustomReportSchedulesListPage();
        return this._customReportSchedulesListPage;
    }

    /**
	 * Create new report schedules
      * @returns {Promise<CreateCustomReportSchedulePage>}
      * @memberof CustomReportSchedulesListPage
      */
    public async createNewCustomReportSchedules(): Promise<CreateCustomReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Create New Custom Report Schedule Button");

            await this.btnCreateNew.click();
            return await CreateCustomReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createNewCustomReportSchedules, err.message);
        }
    }

    /**
    * Search Report Schedules
     * @param {string} value
     * @returns {Promise<CustomReportSchedulesListPage>}
     * @memberof CustomReportSchedulesListPage
     */
    public async searchCustomReportSchedules(value: string): Promise<CustomReportSchedulesListPage> {
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
    * Is Report Schedule Displayed
     * @param {string} reportName
     * @returns {Promise<boolean>}
     * @memberof CustomReportSchedulesListPage
     */
    public async isCustomReportScheduleDisplayed(reportName: string): Promise<boolean> {
        try {
            return await this.lblReportItem(reportName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomReportScheduleDisplayed, err.message);
        }
    }

    /**
    * Is Report Schedule Displayed
     * @returns {Promise<boolean>}
     * @memberof CustomReportSchedulesListPage
     */
    public async isCustomReportScheduleListDisplayed(): Promise<boolean> {
        try {
            return await this.tblReportList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomReportScheduleListDisplayed, err.message);
        }
    }

}
