import TopMenu from "@page-objects/CXone/general/top-menu";
import EvaluationsPage from "@page-objects/CXone/my-zone/evaluations-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TimeOffRequestsPage from "./time-off-requests-page";
import SelfAssessment from "@page-objects/CXone/my-zone/self-assessment";
import ProjectPath from "@test-data/general/project-path";

export default class MySchedulePage extends TopMenu {

	private static _mySchedulePage: MySchedulePage = null;

	constructor() { super(); }

	protected lblEvaluations = new ElementWrapper(by.xpath("//div[@class='custom-scroller nice-scroll']//a[@id='evaluations']"))
	protected lblTimeOffRequests = new ElementWrapper(by.xpath("//div[@class='custom-scroller nice-scroll']//a[@id='myTimeOffRequests']"))
	protected btnDatePickerNext = new ElementWrapper(by.xpath("//button[contains(@class, 'date-picker-next')]"));
	protected lblSelfAssessments = new ElementWrapper(by.xpath("//div[@class='custom-scroller nice-scroll']//a[@id='selfAssessments']"));
	protected lblScheduleTitlePage = new ElementWrapper(by.xpath("//div[@class='my-schedule-wrapper ng-scope']//h1[text()='My Schedule']"));

	// Dynamic Controls
	protected divScheduleActivity(activityName: string) {
		return new ElementWrapper(by.xpath(`//div[text() = '${activityName}' ]`));
	}

	public static getInstance(): MySchedulePage {
		// this._mySchedulePage = (this._mySchedulePage == null) ? new MySchedulePage() : this._mySchedulePage;
		this._mySchedulePage = new MySchedulePage();
		return this._mySchedulePage;
	}

	public async gotoEvaluations(): Promise<EvaluationsPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Evaluation Page`);
			await this.lblEvaluations.click();
			return EvaluationsPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoEvaluations, err.message);
		}
	}

	public async gotoTimeOffRequests(): Promise<TimeOffRequestsPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Time Off Request Page`);
			await this.lblTimeOffRequests.click();
			return TimeOffRequestsPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoTimeOffRequests, err.message);
		}
	}

	public async isScheduleActivityDisplayed(activityName: string, startTime: string, endTime: string): Promise<boolean> {
		try {
			let text = startTime + '-' + endTime + ' - ' + activityName;
			return await this.divScheduleActivity(text).isDisplayed();
		} catch (error) {
			throw new errorwrapper.CustomError(this.isScheduleActivityDisplayed, error.message);
		}
	}

	/**
	 * Go to Self Assessments
	 * @author Nhat.Nguyen
	 * @returns {Promise<SelfAssessment>}
	 * @memberof MySchedulePage
	 */
	public async gotoSelfAssessments(): Promise<SelfAssessment> {
		try {
			await Logger.write(FunctionType.UI, `Going to Time Off Request Page`);
			await this.lblSelfAssessments.click();
			let selfAssessment = require(`${ProjectPath.pageObjects}/CXone/my-zone/self-assessment`).default;
			return selfAssessment.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoSelfAssessments, err.message);
		}
	}

	/**
	 * Is Schedule Page Displayed
	 * @author Nhat.Nguyen
	 * @param {number} [timeOutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MySchedulePage
	 */
	public async isSchedulePageDisplayed(timeOutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblScheduleTitlePage.isDisplayed(timeOutInSecond);
		} catch (error) {
			throw new errorwrapper.CustomError(this.isScheduleActivityDisplayed, error.message);
		}
	}
}