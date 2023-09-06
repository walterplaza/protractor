import { Schedule, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import StopWatch from "@utilities/general/stop-watch";
import TestRunInfo from "@data-objects/general/test-run-info";
export default class GenerateScheduleManager extends TopMenu {

	constructor() { super(); }

	private static _generateScheduleManager: GenerateScheduleManager = null;

	public static async getInstance(): Promise<GenerateScheduleManager> {
		// this._employeesPage = (this._employeesPage == null) ? new EmployeesPage() : this._employeesPage;
		this._generateScheduleManager = new GenerateScheduleManager();
		await this._generateScheduleManager.waitForPageLoad();
		return this._generateScheduleManager;
	}

	protected btnGenerateNewSchedule = new ElementWrapper(by.xpath("//button[@class='btn btn-primary job-button ng-scope']"));
	protected popupGenerateNewSchedule = new ElementWrapper(by.xpath("//div[@class='modal-dialog modal-lg']//div[contains(@class,'generate-new-schedule-modal')]"));
	protected tltScheduleGenerator = new ElementWrapper(by.xpath("//div[contains(@class,'generate-schedule-container')]//h1[text()='Automatic Schedule Generator']"));
	protected icoLoading = new ElementWrapper(by.xpath("//div[@class='ag-overlay-panel']//span[@class='ag-overlay-loading-center']"));

	protected createNewScheduleForm = CreateNewScheduleForm.getInstance();

	protected lblStatusScheduleGenerator(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row']/div[@col-id='employeeGroupName'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='requestStartDate'][.//div[contains(text(),'${schedule.rangeDate}')]]/following-sibling::div[@col-id='status'][1])[1]`));
	}

	protected imgStatusScheduleGenerator(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row'][@row-index='0']/div[@col-id='employeeGroupName'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='requestStartDate'][.//div[contains(text(),'${schedule.rangeDate}')]]/following-sibling::div[@col-id='status']//img[contains(@src,'icons-status_completed')][1])[1]`));
	}

	protected icoGeneratingSchedule(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row'][@row-index='0']/div[@col-id='employeeGroupName'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='requestStartDate'][.//div[contains(text(),'${schedule.rangeDate}')]]/parent::div[@role='row']//div[@col-id='status']//img[@class='loading ng-isolate-scope'])[1]`));
	}

	protected icoGeneratedSchedule(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row'][@row-index='0']/div[@col-id='employeeGroupName'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/parent::div/div[@col-id='requestStartDate'][.//div[contains(text(),'${schedule.rangeDate}')]]/parent::div[@role='row']//div[@col-id='status']//img[@class='loading jobColumns ng-scope ng-isolate-scope'])[1]`));
	}

	protected lblScheduleItem(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@col-id='requestStartDate'][.//div[contains(text(),'${schedule.rangeDate}')]]/preceding-sibling::div[@col-id='employeeGroupName']//div[text()='${schedule.schedulingUnit}'])[1]`));
	}

	/**
	 * Checking 'Generate New Schedule' button is displayed
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isGenerateButtonDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.btnGenerateNewSchedule.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isGenerateButtonDisplayed, err.message);
		}
	}

	/**
	 * Opening new schedule form
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async openGenerateNewScheduleForm(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Opening new schedule form");
			await this.btnGenerateNewSchedule.click();
			await this.createNewScheduleForm.waitForGenerateNewScheduleForm();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openGenerateNewScheduleForm, err.message);
		}
	}

	/**
	 * Filling generate new schedule form
	 * @author  Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async fillGenerateNewScheduleForm(schedule: Schedule): Promise<this> {
		try {
			await this.createNewScheduleForm.fillGenerateNewSchedulesForm(schedule);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillGenerateNewScheduleForm, err.message);
		}
	}

	/**
	 * Clicking generate button on form
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async clickGenerateButton(): Promise<this> {
		try {
			await this.createNewScheduleForm.clickGenerateNewSchedule();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateButton, err.message);
		}
	}

	/**
	 * Checking action popup is displayed
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isAttentionPopUpDisPlayed(): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isAttentionPopUpDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAttentionPopUpDisPlayed, err.message);
		}
	}

	/**
	 * Clicking generate button on form
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async clickGenerateAnyButton(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Clicking generate button on form");
			await this.createNewScheduleForm.clickGenerateAnyButton();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateAnyButton, err.message);
		}
	}

	/**
	 * Generating new schedule
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async generateNewSchedule(schedule: Schedule): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Generating new schedule");
			await this.createNewScheduleForm.submitGenerateNewSchedule(schedule);
			await this.waitForSpinnerDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.generateNewSchedule, err.message);
		}
	}

	/**
	 * Waiting for schedule generated
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @param {number} [timeOut]
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async waitForScheduleGenerate(schedule: Schedule, timeOut?: number): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for schedule generated");

			let stopTime: number = 0;
			let stopWatch = new StopWatch();

			await this.lblScheduleItem(schedule).waitForVisibilityOf();
			let state: boolean = await this.icoGeneratedSchedule(schedule).isDisplayed(TestRunInfo.shortTimeout);

			stopWatch.startClock();

			while (state == false && stopTime < timeOut) {
				await Utility.delay(20);
				await BrowserWrapper.refreshPage();
				await this.icoLoading.waitUntilDisappear();
				state = await this.icoGeneratedSchedule(schedule).isDisplayed(TestRunInfo.shortTimeout);
				stopTime = stopWatch.getElapsedTimeInSecond();
			}

			await this.imgStatusScheduleGenerator(schedule).waitForVisibilityOf();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForScheduleGenerate, err.message);
		}
	}

	/**
	 * Checking schedule is generated successfully
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isScheduleGenerateSucceed(schedule: Schedule): Promise<boolean> {
		try {
			await this.waitForSpinnerDisappear();
			let status: string = await this.lblStatusScheduleGenerator(schedule).getText();
			return status.includes("Succeed");
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScheduleGenerateSucceed, err.message);
		}
	}

	/**
	 * Checking Generate New Form displayed
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof CreateNewScheduleForm
	 */
	public async isGenerateNewScheduleFormDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.popupGenerateNewSchedule.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isGenerateNewScheduleFormDisplayed, err.message);
		}
	}

	/**
	 * Wait for Create New Schedule Form
	 * @author Y.Le
	 * @returns {Promise<ElementWrapper>}
	 * @memberof CreateNewEmployeeForm
	 */
	public async waitForGenerateNewScheduleForm(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Waiting for Create New schedule Form`);
			await this.createNewScheduleForm.waitForGenerateNewScheduleForm();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForGenerateNewScheduleForm, err.message);
		}
	}

	/**
	 * Waiting for generate new schedule form is disappeared
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof GenerateScheduleManager
	 */
	public async waitForGenerateNewScheduleFormDisappeared(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for generate new schedule form is disappeared");
			await this.createNewScheduleForm.waitForGenerateNewScheduleFormDisappeared();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForGenerateNewScheduleFormDisappeared, err.message);
		}
	}



	/**
 	* check if Automation option in new schedule form is filled
 	* @author  Phat.Truong
 	* @param {Schedule} schedule
 	* @returns {Promise<boolean>}
 	* @memberof GenerateScheduleManager
 	*/
	public async isForecasterFilled(schedule: Schedule): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isForecasterFilled(schedule);
		}
		catch (err) {
			throw new errorwrapper.CustomError(this.isForecasterFilled, err.message);
		}
	}

	/**
	 * check if Automation option in new schedule form is filled
	 * @author  Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isAutomationOptionFilled(schedule: Schedule): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isAutomationOptionFilled(schedule);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAutomationOptionFilled, err.message);
		}
	}

	/**
	 * check if start date in new schedule form is filled
	 * @author  Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isStartDateFilled(schedule: Schedule): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isStartDateFilled(schedule);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isStartDateFilled, err.message);
		}
	}

	/**
	* check if Duration in new schedule form is filled
	* @author  Phat.Truong
	* @param {Schedule} schedule
	* @returns {Promise<this>}
	* @memberof GenerateScheduleManager
	*/
	public async isDurationFilled(schedule: Schedule): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isDurationFilled(schedule);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDurationFilled, err.message);
		}
	}

	/**
	* check if Scheduling Unit in new schedule form is filled
	* @author  Phat.Truong
	* @param {Schedule} schedule
	* @returns {Promise<this>}
	* @memberof GenerateScheduleManager
	*/
	public async isSchedulingUnitFilled(): Promise<boolean> {
		try {
			return await this.createNewScheduleForm.isSchedulingUnitFilled();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSchedulingUnitFilled, err.message);
		}
	}

	/**
	 * Check page is displayed or not
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isPageDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.tltScheduleGenerator.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

}

class CreateNewScheduleForm {
	private static _createNewScheduleForm: CreateNewScheduleForm = null;

	public static getInstance(): CreateNewScheduleForm {
		this._createNewScheduleForm = new CreateNewScheduleForm();
		// this._createNewEmployeeForm = (this._createNewEmployeeForm == null) ? new CreateNewEmployeeForm() : this._createNewEmployeeForm;
		return this._createNewScheduleForm;
	}

	protected popupGenerateNewSchedule = new ElementWrapper(by.xpath("//div[contains(@class,'generate-new-schedule-modal nice-modal ng-scope ng-isolate-scope ng-valid ng-valid-required ng-valid-date ng-invalid-add ng-valid-required-remove ng-invalid-required-add ng-dirty ng-valid-parse')]"));
	protected txtSchedulingUnit = new ElementWrapper(by.xpath("//div[@class='nice-multiselect-dropdown ng-scope nice-split-dropdown']//input[@class='ui-select-search ui-select-toggle ng-pristine ng-untouched ng-valid ng-empty ng-hide']"));
	protected txtSchedulingUnitSelected = new ElementWrapper(by.xpath("//div[contains(@class,'selectize-input')]//div[contains(@placeholder,'Scheduling Unit')]/../div[@class='ui-select-holder ng-binding ng-hide']"));
	protected chkMultiSkillScheduling = new ElementWrapper(by.xpath("//div[@checkbox-id='multiskill-checkbox']"));
	protected btnStartTime = new ElementWrapper(by.xpath("//button[contains(@class,'date-picker-calendar-button')]"));
	protected txtStartTime = new ElementWrapper(by.xpath("//date-picker[@id='start-date']//input[contains(@class,'date-picker')]"));
	protected btnGenerate = new ElementWrapper(by.xpath("//button[@id='generateBtn']"));
	protected btnGenerateAnyway = new ElementWrapper(by.xpath("//button[@class='btn btn-primary btn-min-width ng-scope']"));
	protected btnCaretSchedulingUnit = new ElementWrapper(by.xpath("//div[@class='nice-multiselect-dropdown ng-scope nice-split-dropdown']//div[@class='ui-caret']"));
	protected txtGeneratedForecast = new ElementWrapper(by.xpath("//div[@id='forecasterJobs']//div[@class='selectize-input']"));
	protected divAttentionPopUp = new ElementWrapper(by.xpath("//div[@class='popover-content']"));
	protected selectedDuration = new ElementWrapper(by.xpath("//div[@class='btn-group duration-selector']//label[contains(@class,'active')]"));
	protected chkSchedulingUnit = new ElementWrapper(by.xpath("//*[@id='schedulingUnits']//span[@class='option-content ng-binding']"));

	protected lblDurationSelector(duration: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='duration-selector-col']//label[text()='${duration}']`));
	}

	protected optSchedulingUnit(schedulingUnit: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='nice-checkbox ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty']/..//span[contains(text(),'${schedulingUnit}')]`));
	}

	protected rdoStaffingPlan(staffingPlan: StaffingPlan): ElementWrapper {
		return new ElementWrapper(by.xpath(`//input[@value='${staffingPlan}']`));
	}

	protected lblGeneratedForecast(forecast: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='ui-select-choices-content selectize-dropdown-content ng-scope']//span[text()='${forecast}']`));
	}

	/**
	 * Selecting scheduling unit 
	 * If schedulingUnit is null will selected the first item on drop down list
	 * @author Y.Le
	 * @param {string} schedulingUnit
	 * @returns {Promise<this>}
	 * @memberof CreateNewScheduleForm
	 */
	public async selectSchedulingUnit(schedulingUnit: string): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Selecting scheduling unit");
			await this.txtSchedulingUnit.click();
			if (schedulingUnit == '') {
				schedulingUnit = await this.chkSchedulingUnit.getText();
			}
			await this.optSchedulingUnit(schedulingUnit).waitForVisibilityOf();
			await this.optSchedulingUnit(schedulingUnit).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectSchedulingUnit, err.message);
		}
	}

	/**
	 * Filling generate new schedules form
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof CreateNewScheduleForm
	 */
	public async fillGenerateNewSchedulesForm(schedule: Schedule): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Filling generate new schedules form");
			await this.txtSchedulingUnit.waitForControlStable();
			await this.selectSchedulingUnit(schedule.schedulingUnit);
			await this.txtStartTime.type(schedule.startDate);
			await this.rdoStaffingPlan(schedule.staffingPlan).setCheckBox(true);
			if (schedule.staffingPlan == StaffingPlan.AUTOMATIC_PLANNING) {
				await this.txtGeneratedForecast.click();
				await this.lblGeneratedForecast(schedule.planningSelect).click();
			}
			await this.chkMultiSkillScheduling.setCheckBox(schedule.multiSchedulingSkill);
			await this.lblDurationSelector(schedule.duration).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillGenerateNewSchedulesForm, err.message);
		}
	}

	/**
	 * Clicking Save Button on Create Employee Form
	 * @author Y.Le
	 * @returns {Promise<GenerateScheduleManager>}
	 * @memberof CreateNewScheduleForm
	 */
	public async SubmitGenerateNewSchedule(): Promise<GenerateScheduleManager> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Generate Button on Create Schedule Form");
			await this.clickGenerateNewSchedule();
			if (await this.divAttentionPopUp.isDisplayed()) {
				await this.clickGenerateAnyButton()
			}
			return GenerateScheduleManager.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateNewSchedule, err.message);
		}
	}

	/**
	 * Clicking Save Button on Create Employee Form
	 * @author Y.Le
	 * @returns {Promise<GenerateScheduleManager>}
	 * @memberof CreateNewScheduleForm
	 */
	public async clickGenerateNewSchedule(): Promise<GenerateScheduleManager> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Generate Button on Create Schedule Form");
			await this.btnGenerate.click();
			return GenerateScheduleManager.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateNewSchedule, err.message);
		}
	}

	/**
	 * Clicking generate anyway button
	 * @author Y.Le
	 * @returns {Promise<GenerateScheduleManager>}
	 * @memberof CreateNewScheduleForm
	 */
	public async clickGenerateAnyButton(): Promise<GenerateScheduleManager> {
		try {
			await Logger.write(FunctionType.UI, "Clicking generate anyway button");
			await this.btnGenerateAnyway.click();
			return GenerateScheduleManager.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateAnyButton, err.message);
		}
	}

	/**
	 * Checking attention popup is displayed
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof CreateNewScheduleForm
	 */
	public async isAttentionPopUpDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.divAttentionPopUp.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAttentionPopUpDisplayed, err.message);
		}
	}

	/**
	 * Waiting for generate new schedule form disappeared
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof CreateNewScheduleForm
	 */
	public async waitForGenerateNewScheduleFormDisappeared(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for generate new schedule form disappeared");
			await this.popupGenerateNewSchedule.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForGenerateNewScheduleFormDisappeared, err.message);
		}
	}

	/**
	 * Submitting generate new schedule form
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<GenerateScheduleManager>}
	 * @memberof CreateNewScheduleForm
	 */
	public async submitGenerateNewSchedule(schedule: Schedule): Promise<GenerateScheduleManager> {
		try {
			await Logger.write(FunctionType.UI, "Submitting generate new schedule form");
			await this.fillGenerateNewSchedulesForm(schedule);
			await this.clickGenerateNewSchedule();
			return GenerateScheduleManager.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitGenerateNewSchedule, err.message);
		}
	}

	/**
	 * Wait for Create New Schedule Form
	 * @returns {Promise<ElementWrapper>}
	 * @memberof CreateNewEmployeeForm
	 */
	public async waitForGenerateNewScheduleForm(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Waiting for Create New schedule Form`);
			await this.popupGenerateNewSchedule.waitForPresenceOf(TestRunInfo.shortTimeout);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForGenerateNewScheduleForm, err.message);
		}
	}

	/**
 	* check if Automation option in new schedule form is filled
 	* @author  Phat.Truong
 	* @param {Schedule} schedule
 	* @returns {Promise<boolean>}
 	* @memberof GenerateScheduleManager
 	*/
	public async isForecasterFilled(schedule: Schedule): Promise<boolean> {
		try {
			if (schedule.planningSelect == await this.txtGeneratedForecast.getText()) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isForecasterFilled, err.message);
		}
	}

	/**
	 * check if Automation option in new schedule form is filled
	 * @author  Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isAutomationOptionFilled(schedule: Schedule): Promise<boolean> {
		try {
			if (await this.rdoStaffingPlan(schedule.staffingPlan).isSelected()) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAutomationOptionFilled, err.message);
		}
	}

	/**
	 * check if start date in new schedule form is filled
	 * @author  Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<boolean>}
	 * @memberof GenerateScheduleManager
	 */
	public async isStartDateFilled(schedule: Schedule): Promise<boolean> {
		try {
			let result: string = "";
			result = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('date-picker form-control ng-isolate-scope ng-dirty ng-touched ng-not-empty ng-valid ng-valid-parse ng-valid-date ng-valid-required')[0].value`)
			if (schedule.startDate == result) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isStartDateFilled, err.message);
		}
	}

	/**
	* check if Duration in new schedule form is filled
	* @author  Phat.Truong
	* @param {Schedule} schedule
	* @returns {Promise<this>}
	* @memberof GenerateScheduleManager
	*/
	public async isDurationFilled(schedule: Schedule): Promise<boolean> {
		try {
			if (schedule.duration == await this.selectedDuration.getText()) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDurationFilled, err.message);
		}
	}

	/**
	* check if Duration in new schedule form is filled
	* @author  Phat.Truong
	* @param {Schedule} schedule
	* @returns {Promise<this>}
	* @memberof GenerateScheduleManager
	*/
	public async isSchedulingUnitFilled(): Promise<boolean> {
		try {
			if (await this.txtSchedulingUnitSelected.getText() != " Scheduling Units") {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDurationFilled, err.message);
		}
	}

}
