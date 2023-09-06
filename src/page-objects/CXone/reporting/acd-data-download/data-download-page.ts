import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CXOneDataDownloadPage {

    private static _cxOneDataDownloadPage: CXOneDataDownloadPage = null;

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
    
    public static getInstance(): CXOneDataDownloadPage {
        this._cxOneDataDownloadPage = new CXOneDataDownloadPage();
        return this._cxOneDataDownloadPage;
    }

/**
     * get selected download item
     * @param reportName name of selected report 
     */
    public tbcDownloadItemSelected(itemName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//div[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_GridControl']//tr[contains(@class,'selectedRow')]/td[text()='${itemName}']`)));
    }

    /**
     * get download item
     * @param reportName name of selected report 
     */
    public tbcDownloadItem(itemName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//div[@id='ctl00_ctl00_BaseContent_ReportOptions_ddroReportOptions_tcReports_tbpnlReports_agvReports_GridControl']//td[text()='${itemName}']`)));
    }

    /**
     * Verifying data table display
     * @returns boolean
     * @memberof CXOneDataDownloadPage
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
     * @memberof CXOneDataDownloadPage
     */
    public async isDownloadItemSelected(itemName: string): Promise<boolean> {
        try {
            await this.tbcDownloadItemSelected(itemName).waitForControlStable();
            return await this.tbcDownloadItemSelected(itemName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDownloadItemSelected, err.message);
        }
    }

    /**
    * Select a report from list
    * @param {itemName} text report name
    * @returns {Promise<CXOneDataDownloadPage>}
    * @memberof CXOneDataDownloadPage
    */
    public async selectDataItem(itemName: string): Promise<CXOneDataDownloadPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting item ${itemName}`);
            await this.tbcDownloadItem(itemName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDataItem, err.message);
        }
    }

    /**
     * Click on Download button
     * @returns {Promise<CXOneDataDownloadPage>}
     * @memberof CXOneDataDownloadPage
     */
    public async downloadDataItem(): Promise<CXOneDataDownloadPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Download Button`);
            await this.btnDownload.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.downloadDataItem, err.message);
        }
    }
}