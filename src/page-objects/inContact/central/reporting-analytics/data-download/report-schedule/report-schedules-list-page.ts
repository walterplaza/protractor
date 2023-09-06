import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import CreateReportSchedulePage from "@page-objects/inContact/central/reporting-analytics/data-download/report-schedule/create-report-schedule-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ReportSchedulesListPage extends NavigationBar {
    private static _reportSchedulesListPage: ReportSchedulesListPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnCreateNewInAdvancedGridView_ShadowButton']"));
    protected drpSelectActive = new ElementWrapper(by.xpath("//ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_lbxActiveInactive']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_tbxSearchText']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnSearch']"));
    protected btnClearSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnClearSearch']"));
    protected pnlLoading = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));
    protected tblReportList = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_gridView']"));

    public static getInstance(): ReportSchedulesListPage {
        this._reportSchedulesListPage = new ReportSchedulesListPage();
        return this._reportSchedulesListPage;
    }

    // Dynamic controls
    protected lblReportListItem(reportName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tbody//td[text()='${reportName}']`));
    }

    /**
	 * create new report schedules
	 * @memberof ReportSchedulesListPage
	 */
    public async createNewReportSchedules(): Promise<CreateReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Create New Report Schedule Button");

            await this.btnCreateNew.click();
            return await CreateReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.createNewReportSchedules, err.message);
        }
    }

    /**
    * Search Report Schedules
    * @param {value} text value to search
    * @memberof ReportSchedulesListPage
    */
    public async searchReportSchedules(value: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Searching Report Schedules");

            await this.txtSearch.type(value);
            await this.btnSearch.click();
            await this.pnlLoading.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchReportSchedules, err.message);
        }
    }

    /**
    * Is Report Schedule Displayed
    * @param {reportName} text report name
    * @returns boolean
    * @memberof ReportSchedulesListPage
    */
    public async isReportScheduleDisplayed(reportName: string): Promise<boolean> {
        try {
            return await this.lblReportListItem(reportName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReportScheduleDisplayed, err.message);
        }
    }

    /**
    * Is Report Schedule Displayed
    * @param {tableReportList} text report name
    * @returns boolean
    * @memberof ReportSchedulesListPage
    */
    public async isReportScheduleListDisplayed(): Promise<boolean> {
        try {
            return await this.tblReportList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReportScheduleListDisplayed, err.message);
        }
    }

}
