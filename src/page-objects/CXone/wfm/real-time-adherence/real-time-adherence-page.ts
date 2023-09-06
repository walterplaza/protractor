import TopMenu from "@page-objects/CXone/general/top-menu";
import { DataUtils } from "@utilities/general/data-utils";
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import * as fileSystem from 'fs';
import { by } from "protractor";
export default class RealTimeAdherencePage extends TopMenu {
    private static _realTimeAdherencePage: RealTimeAdherencePage = null;

    protected btnGenerateAdReport = new ElementWrapper(by.xpath("//button[@id='generateBtn']"));
    protected tblEmployeeList = new ElementWrapper(by.xpath("//div[@class='ag-body-container' and @ref='eBodyContainer']"));


    protected CreateRealTimeAdherenceReport = CreateRealTimeAdherenceReport.getInstance();

    public static async getInstance(): Promise<RealTimeAdherencePage> {
        this._realTimeAdherencePage = new RealTimeAdherencePage();
        await this._realTimeAdherencePage.waitForSpinner()
        return this._realTimeAdherencePage;
    }

    /**
     * click on Generated Adherence Report button
     * @author Phat.Truong
     * @memberof realTimeAdherencePage
     */
    public async clickGeneratedAdherenceReport(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Generated Adherence Report button`);
            await this.btnGenerateAdReport.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickGeneratedAdherenceReport, err.message);
        }
    }

    /**
    * Check From Date display
    * @author Phat.Truong
    * @returns {Promise<boolean>}
    * @memberof realTimeAdherencePage
    */
    public async isFromDateDisplayed(): Promise<boolean> {
        try {
            return await this.CreateRealTimeAdherenceReport.isFromDateDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isFromDateDisplayed, err.message);
        }
    }

    /**
     * Check To Date display
     * @author Phat.Truong
     * * @returns {Promise<boolean>}
     * @memberof realTimeAdherencePage
     */
    public async isToDateDisplayed(): Promise<boolean> {
        try {
            return await this.CreateRealTimeAdherenceReport.isToDateDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToDateDisplayed, err.message);
        }
    }

    /**
       * Check Scheduling Unit display
       * @author Phat.Truong
       * * @returns {Promise<boolean>}
       * @memberof realTimeAdherencePage
       */
    public async isSchedulingUnitDisplayed(): Promise<boolean> {
        try {
            return await this.CreateRealTimeAdherenceReport.isSchedulingUnitDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulingUnitDisplayed, err.message);
        }
    }

    /**
    * click on Submit Generated Adherence Report button
    * @author Phat.Truong
    * @returns {Promise<void>}
    * @memberof realTimeAdherencePage
    */
    public async clickSubmitAdherenceReport(): Promise<void> {
        try {
            await this.CreateRealTimeAdherenceReport.clickSubmitAdherenceReport();
            await Utility.waitForFileDownloaded(".com.csv");

        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSubmitAdherenceReport, err.message);
        }
    }

    /**
    * check if Report File Format Correct
    * @author Phat.Truong
    * @returns {Promise<boolean>}
    * @memberof realTimeAdherencePage
    */
    public async isReportFileFormatCorrect(fileFormat: string): Promise<boolean> {
        try {
            let listfile: Array<string> = await Utility.getListOfFilesInFolder();
            for (let i = 0; i < listfile.length; i++) {
                let fileName: string = listfile[i];
                if (fileName.endsWith(".com.csv")) {
                    let filePath: string = "C:\\Users\\" + Utility.getCurrentUser() + "\\Downloads\\" + fileName;
                    if (await fileSystem.existsSync(filePath)) {
                        if (await DataUtils.readCSVToArray(filePath).toString().includes(fileFormat)) { return true; }
                        return false;
                    }
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReportFileFormatCorrect, err.message);
        }
    }

    /**
   * Check if Generate Adherence Report display
   * @author Phat.Truong
   * * @returns {Promise<boolean>}
   * @memberof realTimeAdherencePage
   */
    public async isGenerateAdReportButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnGenerateAdReport.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isGenerateAdReportButtonDisplayed, err.message);
        }
    }



    /**
    * Get value of Scheduling Unit
    * @author Phat.Truong
    * @returns {Promise<string>}
    * @memberof realTimeAdherencePage
    */
    public async getSchedulingUnitValue(): Promise<string> {
        try {
            return await this.CreateRealTimeAdherenceReport.getSchedulingUnitValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSchedulingUnitValue, err.message);
        }
    }

    /**
     * Check if Employee List display
     * @author Phat.Truong
     * * @returns {Promise<boolean>}
     * @memberof realTimeAdherencePage
     */
    public async isEmployeeListDisplayed(): Promise<boolean> {
        try {
            return await this.tblEmployeeList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmployeeListDisplayed, err.message);
        }
    }

}

class CreateRealTimeAdherenceReport {
    private static _createRealTimeAdherenceReport: CreateRealTimeAdherenceReport = null;

    public static getInstance(): CreateRealTimeAdherenceReport {
        this._createRealTimeAdherenceReport = new CreateRealTimeAdherenceReport();
        // this._createNewEmployeeForm = (this._createNewEmployeeForm == null) ? new CreateNewEmployeeForm() : this._createNewEmployeeForm;
        return this._createRealTimeAdherenceReport;
    }
    protected txtFromDate = new ElementWrapper(by.xpath("//date-picker[@id='start-date']//input[contains(@class,'date-picker form-control')]"));
    protected btnFromDateCalendar = new ElementWrapper(by.xpath("//date-picker[@id='start-date']//button[@alt='Open calendar']"));
    protected txtToDate = new ElementWrapper(by.xpath("//date-picker[@id='end-date']//input[contains(@class,'date-picker form-control')]"));
    protected btnToDateCalendar = new ElementWrapper(by.xpath("//date-picker[@id='end-date']//button[@alt='Open calendar']"));
    protected btnSubmitReport = new ElementWrapper(by.xpath("//button[@id='generateAdherenceReportBtn']"));
    protected btnCancelReport = new ElementWrapper(by.xpath("//button[@id='cancelBtn']"));
    protected cmbSchedulingUnit = new ElementWrapper(by.xpath("//div[@id='scheduling-units']"));

    /**
   * click on Submit Generated Adherence Report button
   * @author Phat.Truong
   * @returns {Promise<void>}
   * @memberof realTimeAdherencePage
   */
    public async clickSubmitAdherenceReport(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Submit Adherence Report`);
            await this.btnSubmitReport.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSubmitAdherenceReport, err.message);
        }
    }

    /**
     * Check whether From Date display
     * @author Phat.Truong
     * @returns {Promise<boolean>}
     * @memberof realTimeAdherencePage
     */
    public async isFromDateDisplayed(): Promise<boolean> {
        try {
            return await this.txtFromDate.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isFromDateDisplayed, err.message);
        }
    }

    /**
 * Check whether TO Date display
 * @author Phat.Truong
 * * @returns {Promise<boolean>}
 * @memberof realTimeAdherencePage
 */
    public async isToDateDisplayed(): Promise<boolean> {
        try {
            return await this.txtToDate.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToDateDisplayed, err.message);
        }
    }

    /**
       * Check whether Scheduling Unit display
       * @author Phat.Truong
       * * @returns {Promise<boolean>}
       * @memberof realTimeAdherencePage
       */
    public async isSchedulingUnitDisplayed(): Promise<boolean> {
        try {
            return await this.cmbSchedulingUnit.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulingUnitDisplayed, err.message);
        }
    }

    /**
     * Check whether Scheduling Unit display
     * @author Phat.Truong
     * @returns {Promise<string>}
     * @memberof realTimeAdherencePage
     */
    public async getSchedulingUnitValue(): Promise<string> {
        try {
            return await this.cmbSchedulingUnit.getAttribute("data-placeholder");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulingUnitDisplayed, err.message);
        }
    }


}
