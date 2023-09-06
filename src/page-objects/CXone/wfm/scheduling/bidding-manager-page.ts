import { Schedule, StaffingPlan } from "@data-objects/CXone/wfm/schedule-info";
import TestRunInfo from "@data-objects/general/test-run-info";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import StopWatch from "@utilities/general/stop-watch";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class BiddingManagerPage extends WFMMenu {

	private static _biddingManagerPage: BiddingManagerPage = null;

	public static getInstance(): BiddingManagerPage {
		this._biddingManagerPage = new BiddingManagerPage();
		return this._biddingManagerPage;
	}

	protected lblDurationSelector(duration: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='duration-selector-col']//label[text()='${duration}']`));
	}

	protected optSchedulingUnit(schedulingUnit: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='schedulingunits']//div[./span[contains(text(),'${schedulingUnit}')]]`));
	}

	protected rdoStaffingPlan(staffingPlan: StaffingPlan): ElementWrapper {
		return new ElementWrapper(by.xpath(`//input[@value='${staffingPlan}']`));
	}

	protected lblGeneratedForecast(forecast: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='ui-select-choices-content selectize-dropdown-content ng-scope']//span[text()='${forecast}']`));
	}

	protected btnOpenBid(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row']/div[@col-id='employeeGroupId'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/parent::div//button[@class='btn btn-sm btn-primary primary-action ng-binding'])[1]`));
	}

	protected lblStatus(schedule: Schedule): ElementWrapper {
		// let newFormat: string = Utility.formatDateTime(schedule.startDate, "MMM-DD-YYYY", "MMM D, YYYY") + " - " + Utility.formatDateTime(schedule.endDate, "MMM-DD-YYYY", "MMM D, YYYY");
		return new ElementWrapper(by.xpath(`(//div[@role='row']/div[@col-id='employeeGroupId'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='bidStartDate'][.//div[contains(text(),'${schedule.startDate} - ${schedule.endDate}')]]/following-sibling::div[@col-id='status'])[1]`));
	}

	protected bidItem(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@col-id='employeeGroupId'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/parent::div//div[@col-id='bidStartDate'][.//div[text()='${schedule.rangeDate}']]/parent::div)[1]`));
	}

	protected btnGenerateNewBid = new ElementWrapper(by.xpath("//button[@id='new-bidding']"));
	protected createNewBidForm = CreateNewBidForm.getInstance();

	protected lblStatusGenerator(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//div[@role='row']/div[@col-id='employeeGroupId'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='bidStartDate'][.//div[contains(text(),'${schedule.startDate}')]]/../div[@col-id='primary-action']//button)[1]`));
	}

	protected imgStatusBidGenerator(schedule: Schedule): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@role='row']/div[@col-id='employeeGroupId'][.//div[contains(text(),'${schedule.schedulingUnit}')]]/following-sibling::div[@col-id='bidStartDate'][.//div[contains(text(),'${schedule.startDate}')]]/../div[@col-id='status']//img[@class='loading ng-isolate-scope'][1]`));
	}

	/**
	 * Checking 'Generate New Bid' is displayed
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof BiddingManagerPage
	 */
	public async isGenerateButtonDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.btnGenerateNewBid.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isGenerateButtonDisplayed, err.message);
		}
	}

	/**
	 * Opening new bid form
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof BiddingManagerPage
	 */
	public async openGenerateNewBidForm(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Opening new bid form");
			await this.btnGenerateNewBid.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openGenerateNewBidForm, err.message);
		}
	}

	/**
	 * Generating new bid
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof BiddingManagerPage
	 */
	public async generateNewBid(schedule: Schedule): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Generating new bid");
			await this.createNewBidForm.submitGenerateNewBid(schedule);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.generateNewBid, err.message);
		}
	}

	/**
	 * Waiting for bid generated
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @param {number} [timeOut]
	 * @returns {Promise<this>}
	 * @memberof BiddingManagerPage
	 */
	public async waitForBidGenerate(schedule: Schedule, timeOut?: number): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for bid generated");

			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();
			let state: boolean = await this.imgStatusBidGenerator(schedule).isDisplayed(TestRunInfo.shortTimeout);

			while (state == true && stopTime < timeOut) {
				await Utility.delay(30);
				await BrowserWrapper.refreshPage();
				state = await this.imgStatusBidGenerator(schedule).isDisplayed(TestRunInfo.shortTimeout);
				stopTime = stopWatch.getElapsedTimeInSecond();
			}

			await Utility.delay(2);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForBidGenerate, err.message);
		}
	}

    /**
	 * Checking bid is generated
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof BiddingManagerPage
	 */
	public async isBidGenerated(schedule: Schedule, timeOut?: number): Promise<boolean> {
		try {
			return await this.lblStatusGenerator(schedule).isDisplayed(timeOut)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isBidGenerated, err.message);
		}
	}

    /**
     * Clicking open bib button
     * @author Y.Le
     * @param {Schedule} schedule
     * @returns {Promise<this>}
     * @memberof BiddingManagerPage
     */
	public async clickOpenBidButton(schedule: Schedule): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Clicking open bib button");
			let compId = await this.bidItem(schedule).getAttribute("comp-id");
			await BrowserWrapper.executeScript(`document.querySelector("div[comp-id='${compId}'] button[class='btn btn-sm btn-primary primary-action ng-binding']").click();`);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickOpenBidButton, err.message);
		}
	}

    /**
     * Getting status of bidding
     * @author Y.Le
     * @param {Schedule} schedule
     * @returns {Promise<string>}
     * @memberof BiddingManagerPage
     */
	public async getStatusBidding(schedule: Schedule): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting status of bidding");
			await this.lblStatus(schedule).waitUntilPropertyChange("text", TestRunInfo.shortTimeout);
			return await this.lblStatus(schedule).getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getStatusBidding, err.message);
		}
	}
}

class CreateNewBidForm {
	private static _createNewBidForm: CreateNewBidForm = null;

	public static getInstance(): CreateNewBidForm {
		this._createNewBidForm = new CreateNewBidForm();
		return this._createNewBidForm;
	}

	protected popupGenerateNewBid = new ElementWrapper(by.xpath("//div[@class='modal-content']"));
	protected txtSchedulingUnit = new ElementWrapper(by.xpath("//div[@id='schedulingunits']"));
	protected btnStartTime = new ElementWrapper(by.xpath("//button[contains(@class,'date-picker-calendar-button')]"));
	protected txtStartTime = new ElementWrapper(by.xpath("//date-picker[@id='start-date']//input[contains(@class,'date-picker')]"));
	protected btnGenerate = new ElementWrapper(by.xpath("//button[@id='generateBtn']"));
	protected btnGenerateAnyway = new ElementWrapper(by.xpath("//button[@class='btn btn-primary btn-min-width ng-scope']"));
	protected btnCaretSchedulingUnit = new ElementWrapper(by.xpath("//div[@class='nice-multiselect-dropdown ng-scope nice-split-dropdown']//div[@class='ui-caret']"));
	protected txtGeneratedForecast = new ElementWrapper(by.xpath("//div[@id='forecasterJobs']/div"));
	protected divAttentionPopUp = new ElementWrapper(by.xpath("//div[@class='popover-content']"));

	protected lblDurationSelector(duration: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='duration-selector-col']//label[text()='${duration}']`));
	}

	protected optSchedulingUnit(schedulingUnit: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='schedulingunits']//div[./span[contains(text(),'${schedulingUnit}')]]`));
	}

	protected rdoStaffingPlan(staffingPlan: StaffingPlan): ElementWrapper {
		return new ElementWrapper(by.xpath(`//input[@value='${staffingPlan}']`));
	}

	protected lblGeneratedForecast(forecast: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='ui-select-choices-content selectize-dropdown-content ng-scope']//span[text()='${forecast}']`));
	}

	/**
	 * Selecting scheduling unit
	 * @author Y.Le
	 * @param {string} schedulingUnit
	 * @returns {Promise<this>}
	 * @memberof CreateNewBidForm
	 */
	public async selectSchedulingUnit(schedulingUnit: string): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Selecting scheduling unit");
			await this.txtSchedulingUnit.waitForControlStable();
			await this.txtSchedulingUnit.click();
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
	 * @memberof CreateNewBidForm
	 */
	public async fillGenerateNewBidForm(schedule: Schedule): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Filling generate new schedules form");
			await this.selectSchedulingUnit(schedule.schedulingUnit);
			await this.txtStartTime.type(schedule.startDate);
			await this.lblDurationSelector(schedule.duration).click();
			await this.rdoStaffingPlan(schedule.staffingPlan).setCheckBox(true);
			if (schedule.staffingPlan == StaffingPlan.AUTOMATIC_PLANNING) {
				await this.txtGeneratedForecast.click();
				await this.lblGeneratedForecast(schedule.planningSelect);
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillGenerateNewBidForm, err.message);
		}
	}

	/**
	 * Clicking Generate Button on Create Schedule Form
	 * @author Y.Le
	 * @returns {Promise<BiddingManagerPage>}
	 * @memberof CreateNewBidForm
	 */
	public async clickGenerateNewSchedule(timeOut?: number): Promise<BiddingManagerPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Generate Button on Create Schedule Form");
			await this.btnGenerate.click();
			if (await this.divAttentionPopUp.isDisplayed(timeOut)) {
				await this.btnGenerateAnyway.click();
			}
			await this.popupGenerateNewBid.waitUntilDisappear();
			return BiddingManagerPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickGenerateNewSchedule, err.message);
		}
	}

	/**
	 * Submitting generate new schedule form
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<BiddingManagerPage>}
	 * @memberof CreateNewBidForm
	 */
	public async submitGenerateNewBid(schedule: Schedule): Promise<BiddingManagerPage> {
		try {
			await Logger.write(FunctionType.UI, "Submitting generate new schedule form");
			await this.fillGenerateNewBidForm(schedule);
			await this.clickGenerateNewSchedule();
			return BiddingManagerPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitGenerateNewBid, err.message);
		}
	}

	/**
	 * Waiting for Create New Employee Form
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof CreateNewBidForm
	 */
	public async waitForGenerateNewBidForm(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Waiting for Create New Employee Form`);
			await this.popupGenerateNewBid.waitForPresenceOf();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForGenerateNewBidForm, err.message);
		}
	}
}