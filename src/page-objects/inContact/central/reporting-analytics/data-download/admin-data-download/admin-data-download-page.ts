import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import StopWatch from "@utilities/general/stop-watch";
import { Utility } from "@utilities/general/utility";
import * as fileSystem from 'fs';
import { by } from "protractor";

export default class AdminDataDownloadPage extends NavigationBar {
    private static _adminDataDownloadPage: AdminDataDownloadPage = null;

    protected lblPageTitle = new ElementWrapper(by.xpath("//div[@class='title']"));
    protected txtSearchBox = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_tbxSearchText']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_btnSearch']"));
    protected tblDataDownload = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_GridControl']"));
    protected btnDownload = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_BaseContent_ReportOptions_btnDownload_ShadowButton']"));
    protected btnGenerteURL = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_BaseContent_ReportOptions_btnGenerateCURL_ShadowButton']"));
    protected chbAppendDateToFile = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_BaseContent_ReportOptions_chkFileName']"));
    protected ddlDateSelection = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_BaseContent_ReportOptions_ddlFormats']"));
    protected txtDateFrom = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_BaseContent_ReportOptions_tpFrom_txtTimePicker']"));
    protected txtDateTo = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_BaseContent_ReportOptions_tpTo_txtTimePicker']"));
    protected ddlExportFormat = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_BaseContent_ReportOptions_ddlFormats']"));

    public static getInstance(): AdminDataDownloadPage {
        this._adminDataDownloadPage = new AdminDataDownloadPage();
        return this._adminDataDownloadPage;
    }

    /**
     * get Selected row
     * @param reportName name of selected report 
     */
    public getReportFormatItem(itemName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//tr[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_gridView_ctl02' and @class='gridAlternatingRowWithHoverClass selectedRow']//td[contains(text(),'${itemName}')]`)));
    }

    /**
     * get Selected format item
     * @param reportName name of selected report 
     */
    public getSelectedFormatItem(itemName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//tr[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_gridView_ctl02']//td[contains(text(),'${itemName}')]`)));
    }

    /**
     * Verifying data table display
     * @returns boolean
     * @memberof AdminDataDownloadPage
     */
    public async isDataDownloadTableDisplayed(): Promise<boolean> {
        try {
            return await this.tblDataDownload.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDataDownloadTableDisplayed, err.message);
        }
    }

    /**
     * Verifying data is selected
     * @param {itemName} text report name
     * @returns boolean
     * @memberof AdminDataDownloadPage
     */
    public async isDownloadItemSelected(itemName: string): Promise<boolean> {
        try {
            await this.getReportFormatItem(itemName).waitForControlStable();
            return await this.getReportFormatItem(itemName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDownloadItemSelected, err.message);
        }
    }

    /**
    * Select a report from list
    * @param {itemName} text report name
    * @returns {Promise<AdminDataDownloadPage>}
    * @memberof AdminDataDownloadPage
    */
    public async selectDataItem(itemName: string): Promise<AdminDataDownloadPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting item " + itemName);
            await this.getSelectedFormatItem(itemName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDataItem, err.message);
        }
    }

    /**
     * Click on Download button
     * @returns {Promise<AdminDataDownloadPage>}
     * @memberof AdminDataDownloadPage
     */
    public async downloadDataItem(): Promise<AdminDataDownloadPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Download Button");
            await this.btnDownload.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.downloadDataItem, err.message);
        }
    }
}
