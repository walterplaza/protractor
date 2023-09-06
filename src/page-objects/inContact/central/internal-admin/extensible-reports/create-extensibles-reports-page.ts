import ExtensibleReportsListPage from "@page-objects/inContact/central/internal-admin/extensible-reports/extensible-reports-list-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CreateExtensibleReportsPage {

    private static _createExtensibleReportsPage: CreateExtensibleReportsPage = null;

    protected tblCreateExtensibleReport = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctReportEdit_upMain']/table"));
    protected txtReportName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctReportEdit_txtReportName']"));
    protected txtDescription = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctReportEdit_txtReportDescription']"));
    protected cbbFileNameList = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctReportEdit_ddlReportFiles']"));
    protected btnCreateReport = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_btnSave_ShadowButton']"));
    protected rdoGlobal = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_Content_uctReportEdit_chkGlobal']"))

    public static getInstance(): CreateExtensibleReportsPage {
        this._createExtensibleReportsPage = new CreateExtensibleReportsPage();
        return this._createExtensibleReportsPage;
    }

    /**
	  * Enter Value Report Schedules Step1
     * @param {string} reportName
     * @param {string} fileName
     * @param {string} [global]
     * @param {string} [description]
     * @returns {Promise<CreateExtensibleReportsPage>}
     * @memberof CreateExtensibleReportsPage
     */
    public async fillValueExtensibleReport(reportName: string, fileName: string, global?: string, description?: string): Promise<CreateExtensibleReportsPage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for extensible report");

            await this.txtReportName.type(reportName);
            await this.cbbFileNameList.selectOptionByText(fileName);

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillValueExtensibleReport, err.message);
        }
    }

    /**
     * Get all required extensible report information
     * @returns {Promise<string>}
     * @memberof CreateExtensibleReportsPage
     */
    public async getReportFillesInformation(): Promise<string> {
        try {
            let reportNameInfo: string = await this.txtReportName.getControlValue();
            let fileNameInfo: string = await this.cbbFileNameList.getSelectedItem();
            return reportNameInfo + " " + fileNameInfo;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReportFillesInformation, err.message);
        }
    }

    /**
     * Verify success message is displayed
     * @returns {Promise<boolean>}
     * @memberof CreateExtensibleReportsPage
     */
    public async isCreateExtensibleReportFormDisplayed(): Promise<boolean> {
        try {
            return await this.tblCreateExtensibleReport.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateExtensibleReportFormDisplayed, err.message);
        }
    }

    /**
     * Click Create report button
     * @returns {Promise<ExtensibleReportsListPage>}
     * @memberof CreateExtensibleReportsPage
     */
    public async clickCreateReport(): Promise<ExtensibleReportsListPage> {
        try {
            await this.btnCreateReport.click();
            return ExtensibleReportsListPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateReport, err.message);
        }
    }

} 