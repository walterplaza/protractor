import TestRunInfo from "@data-objects/general/test-run-info";
import TopMenu from "@page-objects/CXone/general/top-menu";
import EvaluationsPage from "@page-objects/CXone/my-zone/evaluations-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class QMFormPage extends TopMenu {

    constructor() { super(); }

    private static _qmFormPage: QMFormPage = null;

    protected bdQMForm = new ElementWrapper(by.xpath("//body[@class='bg-grey form-executor-body']"));
    protected chkChoice1 = new ElementWrapper(by.xpath("(//div[@class='choice-vertical'])[1]"));
    protected rdoChoice1 = new ElementWrapper(by.xpath("(//div[@class='choice-vertical']//input)[3]"));
    protected btnSendToAgent = new ElementWrapper(by.xpath("//button[@id='form-executor-workflow-btn-1']"));
    protected btnAcknowledge = new ElementWrapper(by.xpath("//button[contains(@id,'form-executor-workflow-btn') and contains(text(),'Acknowledge')]"));
    protected lblEvaluationScore = new ElementWrapper(by.xpath("//span[@class='score-percentage ng-binding ng-scope']"));
    protected msgEvaluationSentToAgent = new ElementWrapper(by.xpath("//div[@id='nice-toaster-container']//div[@class='toast toast-success animated fadeIn']"));
    protected btnClose = new ElementWrapper(by.xpath("//button[@id='form-executor-cancel-btn']"));
    protected btnRequestReview = new ElementWrapper(by.xpath("//button[contains(@id,'form-executor-workflow-btn') and contains(text(),'Request Review')]"));
    protected txtAreaRequestReview = new ElementWrapper(by.xpath("//textarea[contains(@class,'answer-text-area-in-form-area ng')]"));
    protected btnSubmitRequestReview = new ElementWrapper(by.xpath("//div[@ng-form='reviewForm']//button[@id='save']"));

    public static async getInstance(): Promise<QMFormPage> {
        this._qmFormPage = new QMFormPage();
        await this._qmFormPage.waitForLoadingPanel();
        return this._qmFormPage;
    }

    /**
     * Check page is displayed or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof SelectQMFormPage
     */
    public async isPageDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.bdQMForm.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Fill in QA form
     * @author Tan.Ta
     * @returns {Promise<SearchPage>}
     * @memberof QMFormPage
     */
    public async fillQAForm(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Filling in QA form");
            await this.chkChoice1.click();
            await this.rdoChoice1.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillQAForm, err.message);
        }
    }

    /**
     * Submit in QA form
     * @author Tuan.Vu
     * @returns {Promise<SearchPage>}
     * @memberof QMFormPage
     */
    public async submitQAForm(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Submiting QA form");
            await this.btnSendToAgent.click();
            // await this.bdQMForm.waitUntilDisappear();
            // await BrowserWrapper.switchWindow(0);
            // return SearchPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitQAForm, err.message);
        }
    }

    /**
     * wait for QM Form disappear
     * @author Tan.Ta
     * @returns {Promise<SearchPage>}
     * @memberof QMFormPage
     */
    public async waitForQMFormDisappear(): Promise<SearchPage> {
        try {
            await this.bdQMForm.waitUntilDisappear();
            await BrowserWrapper.switchWindow(0);
            return SearchPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForQMFormDisappear, err.message);
        }
    }

    /**
     * Click on Acknowledge button
     * @author Tan.Ta
     * @returns {Promise<EvaluationsPage>}
     * @memberof QMFormPage
     */
    public async clickAcknowledge(): Promise<EvaluationsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Acknowledge button");
            await this.btnAcknowledge.click();
            await BrowserWrapper.switchWindow(0);
            return EvaluationsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAcknowledge, err.message);
        }
    }

    /**
     * Get evaluation score
     * @author Tan.Ta
     * @returns {Promise<string>}
     * @memberof QMFormPage
     */
    public async getEvaluationScore(): Promise<string> {
        try {
            await this.lblEvaluationScore.waitForControlStable(TestRunInfo.shortTimeout);
            return await this.lblEvaluationScore.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEvaluationScore, err.message);
        }
    }

    /**
     * Check Evaluation sent to Agent message is displayed or not
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof SelectQMFormPage
     */
    public async isEvaluationSentToAgentMessageDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.msgEvaluationSentToAgent.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEvaluationSentToAgentMessageDisplayed, err.message);
        }
    }

    /**
    * Check acknowledge button display
    * @author Phat.Truong
    * @returns {Promise<boolean>}
    * @memberof SelectQMFormPage
    */
    public async isAcknowledButtonDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.btnAcknowledge.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAcknowledButtonDisplayed, err.message);
        }
    }

    /**
    * Get evaluation score
    * @author Phat.Truong
    * @returns {Promise<EvaluationsPage>}
    * @memberof QMFormPage
    */
    public async closeQMForm(): Promise<EvaluationsPage> {
        try {
            await Logger.write(FunctionType.UI, "Closing the QM form");
            await this.btnClose.click();
            await BrowserWrapper.switchWindow(0);
            return EvaluationsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEvaluationScore, err.message);
        }
    }


    /**
    * Check Request Review button display
    * @author Phat.Truong
    * @returns {Promise<boolean>}
    * @memberof SelectQMFormPage
    */
    public async isRequestReviewButtonDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.btnAcknowledge.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRequestReviewButtonDisplayed, err.message);
        }
    }


    /**
     * Click on Request Review button
     * @author Phat.Truong
     * @returns {Promise<void>}
     * @memberof QMFormPage
     */
    public async clickRequestReviewButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Request Review button");
            await this.btnRequestReview.click();
            // await BrowserWrapper.switchWindow(0);
            // return EvaluationsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickRequestReviewButton, err.message);
        }
    }

    /**
        * Fill in request review form
        * @author Phat.Truong
        * @returns {Promise<void>}
        * @memberof QMFormPage
        */
    public async fillInRequestReview(text: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "filling in Request Review form");
            await this.txtAreaRequestReview.type(text);
            // await BrowserWrapper.switchWindow(0);
            // return EvaluationsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillInRequestReview, err.message);
        }
    }

    /**
     * Click submit Request Review button
     * @author Phat.Truong
     * @returns {Promise<EvaluationsPage>}
     * @memberof QMFormPage
     */
    public async submitRequestReviewButton(): Promise<EvaluationsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Submit Request Review button");
            await this.btnSubmitRequestReview.click();
            await BrowserWrapper.switchWindow(0);
            return EvaluationsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.submitRequestReviewButton, err.message);
        }
    }


    /**
     * Click on Send to Agent button
     * @author Phat.Truong
     * @returns {Promise<void>}
     * @memberof QMFormPage
     */
    public async clickSendToAgentButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Send to Agent button");
            await this.btnSendToAgent.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSendToAgentButton, err.message);
        }
    }

}