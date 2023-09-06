import { Schedule } from "@data-objects/inContact/central/reporting-analytics/custom-reporting/schedules/schedule-report-info";
import DateTimePicker from "@page-objects/inContact/central/general/date-time-picker";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class CreateCustomReportSchedulePage extends NavigationBar {
    private static _createCustomReportSchedulePage: CreateCustomReportSchedulePage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_agvsAdHocReportSchedules_btnCreateNewInAdvancedGridView_ShadowButton']"));

    // Header Title
    protected lblCurrentStep1 = new ElementWrapper(by.xpath("//li[@class='current']//span[text()='Name & Other Details']"));
    protected lblCurrentStep2 = new ElementWrapper(by.xpath("//li[@class='current']//span[text()='Report Distribution']"));
    protected lblCurrentStep3 = new ElementWrapper(by.xpath("//li[@class='currentSuccess']//span[text()='On Errors']"));

    // Step 1
    protected txtReportName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_CreateAndEditScheduleControl_ReportNameTextBox']"));
    protected txtStartDate = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_CreateAndEditScheduleControl_StartsDateTextBox']"));
    protected cbbReportTemplateList = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_CreateAndEditScheduleControl_ReportTemplateList']"));
    protected btnNext = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnNext_ShadowButton']"));
    protected imgDate = new ElementWrapper(by.xpath("//img[contains(@id,'imgStartDateIcon')]"));

    // Step 2
    protected txtFileName = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportParameters_FileNameInput']"));

    // Step 3
    protected btnSave = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnSaveSchedule_ShadowButton']"));
    protected btnActivate = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportSchedulesTabContainer_ReportSchedulesDetailPanel_btnStatusChange_ShadowButtonSpan' and text()='Activate']"));
    protected btnDeActivate = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_ReportSchedulesTabContainer_ReportSchedulesDetailPanel_btnStatusChange_ShadowButtonSpan' and text()='Deactivate']"));
    protected lblSuccessMessage = new ElementWrapper(by.xpath("//p[@id='success']"));

    public static getInstance(): CreateCustomReportSchedulePage {
        this._createCustomReportSchedulePage = new CreateCustomReportSchedulePage();
        return this._createCustomReportSchedulePage;
    }

    /**
	 * Enter Value Report Schedules Step1
      * @param {string} reportName
      * @param {string} reportTemplate
      * @param {string} deleteAfter
      * @param {string} scheduleType
      * @param {string} startOn
      * @returns {Promise<CreateCustomReportSchedulePage>}
      * @memberof CreateCustomReportSchedulePage
      */
    public async enterValueCustomReportSchedulesStep1(reportName: string, deleteAfter: string, scheduleType: string, startOn: string): Promise<CreateCustomReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for custom report schedule step 1 - Name & Other Details");

            await this.txtReportName.type(reportName);
            await this.cbbReportTemplateList.selectOptionByIndex(Utility.getRandomNumber(2, 2, 10));
            await this.imgDate.click();
            let dateTimePicker: DateTimePicker = DateTimePicker.getInstance();
            await dateTimePicker.selectDateByDatePicker(startOn, "StartsDateCal_day", "_StartsDateCal_title", "CreateAndEditScheduleControl_StartsDateCal_year", "_StartsDateCal_month");
            return await CreateCustomReportSchedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValueCustomReportSchedulesStep1, err.message);
        }
    }
    /**
       * Submit create Schedules Step 1
       * @param {Schedule} scheduleDataStep1
       * @returns {Promise<CreateCustomReportSchedulePage>}
       * @memberof CreateCustomReportSchedulePage
       */
    public async submitCreateCustomScheduleStep1(scheduleDataStep1: Schedule): Promise<CreateCustomReportSchedulePage> {
        try {
            await this.enterValueCustomReportSchedulesStep1(scheduleDataStep1.reportName, scheduleDataStep1.deleteAfter, scheduleDataStep1.scheduleType, scheduleDataStep1.startOn);
            await Logger.write(FunctionType.UI, "Submitting value for custom report schedule step 1 - Name & Other Details");
            await this.btnNext.click();
            await this.lblCurrentStep2.waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateCustomScheduleStep1, err.message);
        }
    }

    /**
     * Submit create Schedules Step 2
     * @param {Schedule} scheduleDataStep2
     * @returns {Promise<CreateCustomReportSchedulePage>}
     * @memberof CreateCustomReportSchedulePage
     */
    public async submitCreateCustomScheduleStep2(scheduleDataStep2: Schedule): Promise<CreateCustomReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Submitting value for custom report schedule step 2 - Report Parameters");
            await this.btnNext.click();
            await this.lblCurrentStep3.waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateCustomScheduleStep2, err.message);
        }
    }

    /**
       * Enter Value Report Schedules Step2
     * @param {boolean} Save
     * @param {string} [automaticRestart]
     * @param {string} [emailRecipients]
     * @param {string} [externalEmailAddresses]
     * @param {string} [copyEmailDistributionList]
     * @param {string} [clearEmailList]
     * @returns {Promise<CreateCustomReportSchedulePage>}
     * @memberof CreateCustomReportSchedulePage
     */
    public async enterValueCustomReportSchedulesStep3(Save: boolean, automaticRestart?: string, emailRecipients?: string, externalEmailAddresses?: string, copyEmailDistributionList?: string, clearEmailList?: string): Promise<CreateCustomReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Entering value for custom report schedule step 3 - Report Distribution");

            if (Save) {
                await this.btnSave.click();
                await this.lblSuccessMessage.waitForControlStable();
            }
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterValueCustomReportSchedulesStep3, err.message);
        }
    }

    /**
     * Submit create Schedules Step 3
     * @param {Schedule} scheduleDataStep3 text input data
     * @returns {Promise<CreateCustomReportSchedulePage>}
     * @memberof CreateCustomReportSchedulePage
     */
    public async submitCreateCustomScheduleStep3(scheduleDataStep3: Schedule): Promise<CreateCustomReportSchedulePage> {
        try {

            await Logger.write(FunctionType.UI, "Submitting value for custom report schedule step 3 - Report Distribution");

            await this.btnSave.click();
            await this.lblSuccessMessage.waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitCreateCustomScheduleStep3, err.message);
        }
    }

    /**
    * Click on active button of current report schedule
     * @returns {Promise<CreateCustomReportSchedulePage>}
     * @memberof CreateCustomReportSchedulePage
     */
    public async activeCustomReportSchedule(): Promise<CreateCustomReportSchedulePage> {
        try {
            await Logger.write(FunctionType.UI, "Activating Custom Report Schedule");

            await this.btnActivate.waitForControlStable();
            await this.btnActivate.click();
            await this.btnDeActivate.waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.activeCustomReportSchedule, err.message);
        }
    }

    /**
     * Verify success message is displayed
     * @returns {Promise<boolean>}
     * @memberof CreateCustomReportSchedulePage
     */
    public async isSuccessMessageDisplayed(): Promise<boolean> {
        try {
            return await this.lblSuccessMessage.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSuccessMessageDisplayed, err.message);
        }
    }
}