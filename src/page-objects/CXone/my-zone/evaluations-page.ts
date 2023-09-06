import TopMenu from "@page-objects/CXone/general/top-menu";
import QMFormPage from "@page-objects/CXone/search/qm-form-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import StopWatch from "@utilities/general/stop-watch";

export default class EvaluationsPage extends TopMenu {

    private static _evaluationsPage: EvaluationsPage = null;

    protected lblEvaluations = new ElementWrapper(by.xpath("//div[@class='container page-container my-evaluations-page ng-scope' or @class='container page-container my-evaluations-page']//h1[@class='page-title ng-binding']"));
    protected lblNewestEvaluation = new ElementWrapper(by.xpath("(//div[@class='ag-body-container']/div)[1]//span[text()='New']"));
    protected lblNewestEvaluationStatus = new ElementWrapper(by.xpath("(//div[@class='ag-body-container']/div)[count(//div[@class='ag-body-container']/div)]/div[@col-id='status']//span[@class='colStatus completed']"));
    protected lblSortAscHidden = new ElementWrapper(by.xpath("//div[@class='ag-header-cell ag-header-cell-sortable'][@col-id='evaluationDate']//span[@class='ag-header-icon ag-sort-ascending-icon ag-hidden']"));
    protected lblSortDescHidden = new ElementWrapper(by.xpath("//div[@class='ag-header-cell ag-header-cell-sortable'][@col-id='evaluationDate']//span[@class='ag-header-icon ag-sort-descending-icon ag-hidden']"));
    protected lblEvaluatedOn = new ElementWrapper(by.xpath("//span[@class='ag-header-cell-text ng-scope'][text()='EVALUATED ON']"));
    protected lblNewCompletedEvaluation = new ElementWrapper(by.xpath("//div[@class='ag-body-container'] //div[@row-index='0']//div[@col-id='status']//span[@class='colStatus completed']"));
    protected icoDescending = new ElementWrapper(by.xpath("//span[@class='ag-header-icon ag-sort-descending-icon']/img")); 
    protected icoAscending = new ElementWrapper(by.xpath("//span[@class='ag-header-icon ag-sort-ascending-icon']/img")); 
    protected icoChallenged = new ElementWrapper(by.xpath("//span[@class='icon icon-status_challenged']")); 
    protected iconSpinInprogress = new ElementWrapper(by.xpath("div[@class='spinner spinner-bounce-middle in-progress-spinner ng-scope']")); 
    protected lblNewestChallenged = new ElementWrapper(by.xpath("//div[@class='ag-body-container']/div[1]//span[contains(text(),'Challenged')]"));
    protected lblNewesTReviewCompleted = new ElementWrapper(by.xpath("//div[@class='ag-body-container']/div[1]//span[contains(text(),'Review Completed')]"));
    
    
    constructor() { super(); }

    public static getInstance(): EvaluationsPage {
        this._evaluationsPage = new EvaluationsPage();
        return this._evaluationsPage;
    }

    /**
     * Check Evaluations page is displayed or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof EvaluationsPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return this.lblEvaluations.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Open newest evaluation
     * @author Tan.Ta
     * @returns {Promise<QMFormPage>}
     * @memberof EvaluationsPage
     */
    public async openNewestEvaluation(): Promise<QMFormPage> {
        try {
            await Logger.write(FunctionType.UI, `Opening Newest Evaluation`);           
            // Sorting Evaluation as Descending
            let state: boolean = await this.icoDescending.isDisplayed(TestRunInfo.shortTimeout);
            while(state == false)
            {
                await this.lblEvaluatedOn.click();
                await Utility.delay(2);           
                state = await this.icoDescending.isDisplayed(TestRunInfo.shortTimeout);     
            }
            await this.lblNewestEvaluation.click();
            await BrowserWrapper.switchWindow(1);
            return await QMFormPage.getInstance();
        } catch (err) {
           throw new errorwrapper.CustomError(this.openNewestEvaluation, err.message);
                   }
    }

    /**
     * Get status of newest evaluation
     * @author Tan.Ta
     * @returns {Promise<string>}
     * @memberof EvaluationsPage
     */
    public async getStatusNewestEvaluation(): Promise<string> {
        try {
            return await this.lblNewCompletedEvaluation.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getStatusNewestEvaluation, err.message);
        }
    }

    /**
     * Close CXone Player window
     * @author Tan.Ta
     * @returns {Promise<void>}
     * @memberof EvaluationsPage
     */
    public async closePlayer(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Closing CXone Player window`);

            let title: string = "CXone Player";
            await BrowserWrapper.sleepInSecond(3);
            await BrowserWrapper.switchWindowByTitle(title);
            await BrowserWrapper.close();
            await BrowserWrapper.switchWindow(0);
        } catch (err) {
            throw new errorwrapper.CustomError(this.closePlayer, err.message);
        }
    }


/**
	 * Waiting for schedule generated
	 * @author Phat.Truong
	 * @param {Schedule} schedule
	 * @param {number} [timeOut]
	 * @returns {Promise<this>}
	 * @memberof GenerateScheduleManager
	 */
	public async waitForChallengedStatus(timeOut?: number): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for challenged status");

			let stopTime: number = 0;
			let stopWatch = new StopWatch();
			stopWatch.startClock();
			
            let spiner : boolean = await this.iconSpinInprogress.isDisplayed(TestRunInfo.shortTimeout);
			while (spiner == false && stopTime < timeOut) {
                // Wait for Challenged status change, refresh page every 10 seconds
                await Utility.delay(10); 
				await BrowserWrapper.refreshPage();
				spiner = await this.iconSpinInprogress.isDisplayed(TestRunInfo.shortTimeout);
				stopTime = stopWatch.getElapsedTimeInSecond();
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForChallengedStatus, err.message);
		}
    }
    
    /**
     * Open newest evaluation
     * @author Phat.Truong
     * @returns {Promise<QMFormPage>}
     * @memberof EvaluationsPage
     */
    public async openNewestChallenged(): Promise<QMFormPage> {
        try {
            await Logger.write(FunctionType.UI, `Opening Newest Challenged`);           
            // Sorting Evaluation as Descending
            let state: boolean = await this.icoDescending.isDisplayed(TestRunInfo.shortTimeout);
            while(state == false)
            {
                await this.lblEvaluatedOn.click();
                await Utility.delay(2);           
                state = await this.icoDescending.isDisplayed(TestRunInfo.shortTimeout);     
            }
            await this.lblNewestChallenged.click();
            await BrowserWrapper.switchWindow(1);
            return await QMFormPage.getInstance();
        } catch (err) {
           throw new errorwrapper.CustomError(this.openNewestChallenged, err.message);
                   }
    }


        /**
     * Check newest Review Completed status is displayed or not
     * @author Phat.Truong
     * @returns {Promise<boolean>}
     * @memberof EvaluationsPage
     */
    public async isNewestReviewCompletedDisplayed(): Promise<boolean> {
        try {
            await BrowserWrapper.refreshPage();
            // Wait for Changlend status changing completly in 5 seconds
            await Utility.delay(5);    
            return this.lblNewesTReviewCompleted.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNewestReviewCompletedDisplayed, err.message);
        }
    }
}