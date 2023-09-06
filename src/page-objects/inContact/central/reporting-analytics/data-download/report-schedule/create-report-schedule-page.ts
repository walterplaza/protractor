import { Schedule } from "@data-objects/inContact/central/reporting-analytics/custom-reporting/schedules/schedule-report-info";
import DateTimePicker from "@page-objects/inContact/central/general/date-time-picker";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CreateReportSchedulePage extends NavigationBar {
    private static _createReportSchedulePage: CreateReportSchedulePage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsSchedules_btnCreateNewInAdvancedGridView_ShadowButton']"));

    // Header Title
    protected lblCurrentStep1 = new ElementWrapper(by.xpath("//li[@class='current']//span[text()='Name & Other Details']"));
    protected lblCurrentStep2 = new ElementWrapper(by.xpath("//li[@class='current']//span[text()='Report Parameters']"));
    protected lblCurrentStep3 = new ElementWrapper(by.xpath("//li[@class='currentSuccess']//span[text()='Report Distribution']"));

    // Step 1
    protected txtReportName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_CreateAndEditScheduleControl_ReportNameTextBox']"));
    protected txtStartDate = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_CreateAndEditScheduleControl_StartsDateTextBox']"));
    protected btnNext = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnNext_ShadowButton']"));
    protected imgDate = new ElementWrapper(by.xpath("//img[contains(@id,'imgStartDateIcon')]"));

    // Step 2
    protected cbbReportList = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_ReportList']"));
    protected cbbReportFormatList = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_ddlFormats']"));
    protected txtFileName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_FileNameInput']"));

    // Step 3
    protected btnSave = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnSaveSchedule_ShadowButton']"));
    protected btnActivate = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportSchedulesTabContainer_ReportSchedulesDetailPanel_btnStatusChange_ShadowButtonSpan' and text()='Activate']"));
    protected btnDeActivate = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportSchedulesTabContainer_ReportSchedulesDetailPanel_btnStatusChange_ShadowButtonSpan' and text()='Deactivate']"));
    protected lblSuccessMessage = new ElementWrapper(by.xpath("//p[@id='success']"));
    protected cbbReportListItem = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_ReportList']"));
    protected cbbFormatListItem = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_ddlFormats']"));

    public static getInstance(): CreateReportSchedulePage {
        this._createReportSchedulePage = new CreateReportSchedulePage();
        return this._createReportSchedulePage;
    }

    /**
	 * Enter Value Report Schedules Step1
	 * @param {reportName} report name
     * @param {scheduleType} schedule type
     * @param {startOn} start on time
     * @param {nextStep} go to next step
	 * @returns {Promise<ReportSchedulesListPage>} 
	 * @memberof ReportSchedulesListPage
	 */
    public async enterValueReportSchedulesStep1(reportName: string, startOn: string): Promise<CreateReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for report schedule step 1 - Name & Other Details");

            await this.txtReportName.type(reportName);
            await this.imgDate.click();
            let dateTimePicker: DateTimePicker = DateTimePicker.getInstance();
            await dateTimePicker.selectDateByDatePicker(startOn, "_StartsDateCal_day", "_StartsDateCal_title", "StartsDateCal_year", "StartsDateCal_month");
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValueReportSchedulesStep1, err.message);
        }
    }

    /**
     * Submit Value Report Schedules Step1
     * @param {Schedule} scheduleDataStep1
     * @returns {Promise<CreateReportSchedulePage>}
     * @memberof CreateReportSchedulePage
     */
    public async submitCreateScheduleStep1(scheduleDataStep1: Schedule): Promise<CreateReportSchedulePage> {
        try {
            await this.enterValueReportSchedulesStep1(scheduleDataStep1.reportName, scheduleDataStep1.startOn);
            await Logger.write(FunctionType.UI, "Submitting value for report schedule step 1 - Name & Other Details");
            await this.btnNext.click();
            await this.lblCurrentStep2.waitForControlStable();
            return await CreateReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateScheduleStep1, err.message);
        }
    }

    /**
        * Enter Value Report Schedules Step2
        * @param {reportList} text name
        * @param {reportListFormat} text Format
        * @param {fileName} text Name of file
        * @param {nextStep} go to next step
        * @returns {Promise<CreateReportSchedulePage>} 
        * @memberof CreateReportSchedulePage
        */
    public async enterValueReportSchedulesStep2(reportList: string, reportListFormat: string, fileName: string): Promise<CreateReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for report schedule step 2 - Report Parameters");

            await this.cbbReportListItem.selectOptionByTextContains(reportList);
            await this.cbbFormatListItem.selectOptionByText(reportListFormat);
            await this.txtFileName.type(fileName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValueReportSchedulesStep2, err.message);
        }
    }

    /**
     * Submit create Schedules Step 2
     * @param {scheduleDataStep2} text input data
     * @returns {Promise<CreateReportSchedulePage>} 
     * @memberof CreateReportSchedulePage
     */
    public async submitCreateScheduleStep2(scheduleDataStep2: Schedule): Promise<CreateReportSchedulePage> {
        try {
            await this.enterValueReportSchedulesStep2(scheduleDataStep2.reportType, scheduleDataStep2.reportFormat, scheduleDataStep2.reportFileName);
            await Logger.write(FunctionType.UI, "Submitting value for report schedule step 2 - Report Parameters");
            await this.btnNext.click();
            return await CreateReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateScheduleStep2, err.message);
        }
    }

    /**
       * Enter Value Report Schedules Step2
       * @param {reportList} text name
       * @param {reportListFormat} text Format
       * @param {fileName} text Name of file
       * @param {nextStep} go to next step
       * @returns {Promise<CreateReportSchedulePage>} 
       * @memberof CreateReportSchedulePage
       */
    public async enterValueReportSchedulesStep3(Save: boolean): Promise<CreateReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for report schedule step 3 - Report Distribution");

            if (Save) {
                await this.btnSave.click();
                await this.lblSuccessMessage.waitForControlStable();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValueReportSchedulesStep3, err.message);
        }
    }

    /**
     * Submit create Schedules Step 3
     * @param {scheduleDataStep3} text input data
     * @returns {Promise<CreateReportSchedulePage>} 
     * @memberof CreateReportSchedulePage
     */
    public async submitCreateScheduleStep3(): Promise<CreateReportSchedulePage> {
        try {

            await Logger.write(FunctionType.UI, "Submitting value for report schedule step 3 - Report Distribution");
            await this.btnSave.click();
            await this.lblSuccessMessage.waitForControlStable();
            return await CreateReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateScheduleStep3, err.message);
        }
    }

    /**
    * Click on active button of current report schedule
    * @returns {Promise<CreateReportSchedulePage>} 
    * @memberof CreateReportSchedulePage
    */
    public async activeReportSchedule(): Promise<CreateReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Activating Report Schedule");

            await this.btnActivate.click();
            await this.btnDeActivate.waitForControlStable();
            return await CreateReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.activeReportSchedule, err.message);
        }
    }

    /**
     * Verify success message is displayed
     * @memberof CreateReportSchedulePage
     */
    public async isSuccessMessageDisplayed(): Promise<boolean> {
        try {
            return await this.lblSuccessMessage.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSuccessMessageDisplayed, err.message);
        }
    }
}

