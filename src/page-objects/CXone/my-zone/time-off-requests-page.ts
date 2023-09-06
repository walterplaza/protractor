import TopMenu from "@page-objects/CXone/general/top-menu";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { ActivityCode } from "@data-objects/CXone/myzone/time-off-request-info";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { Utility } from "@utilities/general/utility";
import TestRunInfo from "@data-objects/general/test-run-info";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";

export default class TimeOffRequestsPage extends TopMenu {

	private static _timeOffRequestsPage: TimeOffRequestsPage = null;

	protected btnNewRequest = new ElementWrapper(by.xpath("//button[@id='newTimeOffRequest']"));
	protected createNewTimeOffRequestForm = NewTimeOffRequestForm.getInstance();

	public static getInstance(): TimeOffRequestsPage {
		this._timeOffRequestsPage = new TimeOffRequestsPage();
		return this._timeOffRequestsPage;
	}

    /**
     * Click new requests button
     * @author Anh.Le
     * @returns {Promise<QMFormPage>}
     * @memberof EvaluationsPage
     */
	public async clickNewRequestButton(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, `Clicking new requests button`);
			await this.btnNewRequest.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickNewRequestButton, err.message);
		}
	}

    /**
	 * Generating new time off request
	 * @author Y.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async generateNewTimeOffRequest(activityCode: ActivityCode): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Generating new time off request");
			await this.clickNewRequestButton();
			await this.createNewTimeOffRequestForm.submitGenerateNewTimeOffRequest(activityCode);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.generateNewTimeOffRequest, err.message);
		}
	}
}

class NewTimeOffRequestForm {
	private static _newTimeOffRequestForm: NewTimeOffRequestForm = null;

	protected cbbActivityCode = new ElementWrapper(by.xpath("//div[contains(@class,'activity-code-dropdown')]"));
	protected btnCreate = new ElementWrapper(by.xpath("//button[contains(@class,'btn-primary btn-footer')]"));

	protected optActivityCode(activityCode: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'activity-code-label') and contains(text(),'${activityCode}')]`));
	}

	public static getInstance(): NewTimeOffRequestForm {
		this._newTimeOffRequestForm = new NewTimeOffRequestForm();
		return this._newTimeOffRequestForm;
	}

    /**
	 * Select Activity Code
	 * @author Anh.Le
	 * @param {string} activityCode
	 * @returns {Promise<this>}
	 * @memberof CreateNewScheduleForm
	 */
	public async selectActivityCode(activityCode: ActivityCode): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Selecting activity code");
			await this.cbbActivityCode.waitForPresenceOf();
			await this.cbbActivityCode.click();
			await this.optActivityCode(activityCode).waitForVisibilityOf();
			await this.optActivityCode(activityCode).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectActivityCode, err.message);
		}
	}

    /**
	 * Fill new time off requests form
	 * @author Anh.Le
	 * @param {Schedule} activityCode
	 * @returns {Promise<this>}
	 * @memberof NewTimeOffRequest
	 */
	public async fillNewTimeOffRequest(activityCode: ActivityCode): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Filling new time off requests form");
			await this.selectActivityCode(activityCode);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.fillNewTimeOffRequest, err.message);
		}
	}

    /**
	 * Click create Button on New Time Off Request form
	 * @author Anh.Le
	 * @returns {Promise<NewTimeOffRequest>}
	 * @memberof NewTimeOffRequest
	 */
	public async clickCreateNewTimeOffRequest(): Promise<TimeOffRequestsPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking create button on New Time Off Request form");
			await this.btnCreate.click();
			return TimeOffRequestsPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCreateNewTimeOffRequest, err.message);
		}
	}

    /**
	 * Submit New Time Off Request form
	 * @author Anh.Le
	 * @param {Schedule} schedule
	 * @returns {Promise<GenerateScheduleManager>}
	 * @memberof CreateNewScheduleForm
	 */
	public async submitGenerateNewTimeOffRequest(activityCode: ActivityCode): Promise<TimeOffRequestsPage> {
		try {
			await Logger.write(FunctionType.UI, "Submitting generate new schedule form");
			await this.fillNewTimeOffRequest(activityCode);
			await this.clickCreateNewTimeOffRequest();
			return TimeOffRequestsPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitGenerateNewTimeOffRequest, err.message);
		}
	}
}