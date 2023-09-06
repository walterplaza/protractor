import TopMenu from "@page-objects/CXone/general/top-menu";
import CoachingPlansDetailsPage from "@page-objects/CXone/coaching/coaching-plans/coaching-plan-details-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";

export default class CoachingPlansPage extends TopMenu {

    private static _CoachingPlansPage: CoachingPlansPage = null;

    protected lblCoachingPlan = new ElementWrapper(by.xpath("//h1[@id='coaching-plans-page-title']"));
    protected btnNewCoachingPlan = new ElementWrapper(by.xpath("//button[@id='coaching-plan-btn-new-plan']"));
    protected txtFilterPlan = new ElementWrapper(by.xpath("//div[@class='search-field ng-scope']//input[contains(@class,'ng-valid ng-empty search-on-keypress')]"));
    protected rowActiveCoachPlan = new ElementWrapper(by.xpath("//span[@class ='colStatus active'][1]"));
    protected txtSearchCoachingPlan = new ElementWrapper(by.xpath("//div[@class='inner-center']//input[@type='text']"));
    
    protected txtSearchBox = new ElementWrapper(by.xpath("//div/input[contains(@class,'search-on-keypress')]"));

    // Dynamic controls 
    protected popSuccessMessage(message: string) {
        return new ElementWrapper(by.xpath(`//div[@class='toast-message'][.='${message}']/ancestor::div[@class='toast toast-success animated fadeIn']`));
    }
    protected lblPlanStatus(planName: string) {
        return new ElementWrapper(by.xpath(`//div[@tooltip-text='${planName}']/ancestor::div[@role='row']//span[@class='ng-scope']`));
    }

    protected rowActiveCoachingPlan(planName: string) {
        return new ElementWrapper(by.xpath(`//span[@class ='colStatus active']/ancestor::div[@role='row']//div[text()='${planName}']`));
    }

    public static async getInstance(): Promise<CoachingPlansPage> {
        this._CoachingPlansPage = new CoachingPlansPage();
        await this._CoachingPlansPage.lblCoachingPlan.waitForVisibilityOf()
        await this._CoachingPlansPage.waitForLoadingDisappear();
        return this._CoachingPlansPage;
    }

    /**
     * Check if title of coaching plans page displayed
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof CoachingPlanPage
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCoachingPlan.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Clicking New Coaching Plan button
     * @author Tuan.Vu
     * @returns {Promise<CoachingPlansDetailsPage>}
     * @memberof CoachingPlansPage
     */
    public async openNewCoachingPlan(): Promise<CoachingPlansDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking New Coaching Plan button");
            await this.btnNewCoachingPlan.click();
            return await CoachingPlansDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openNewCoachingPlan, err.message);
        }
    }

    /**
     * Get coaching plan status
     * @author Tuan.Vu
     * @returns {Promise<string}
     * @memberof CoachingPlansPage
     */
    public async getPlanState(coachingPlanName: string): Promise<string> {
        try {
            await this.searchCoachingPlan(coachingPlanName);
            await this.lblPlanStatus(coachingPlanName).waitForControlStable();
             // Need to sleep 2 seconds before getting state.
             await BrowserWrapper.sleepInSecond(2);
            return await this.lblPlanStatus(coachingPlanName).getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openNewCoachingPlan, err.message);
        }
    }

    /**
     * Get coaching plan status
     * @author Phat.Truong
     * @returns {Promise<CoachingPlanPage}
     * @memberof CoachingPlansPage
     */
    public async clickActiveCoachingPlan(coachingPlanName: string): Promise<CoachingPlansPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on active coaching plan ${coachingPlanName}`);
            // Need to sleep 2 seconds before inputting.
            await BrowserWrapper.sleepInSecond(2);
            await this.txtFilterPlan.type(coachingPlanName);
            await this.rowActiveCoachingPlan(coachingPlanName).moveMouse();
            await this.rowActiveCoachingPlan(coachingPlanName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickActiveCoachingPlan, err.message);
        }
    }

    /**
     * Search coaching plan
     * @author Chinh.Nguyen
     * @param {string} coachingPlanName
     * @returns {Promise<CoachingPlansPage>}
     * @memberof CoachingPlansPage
     */
    public async searchCoachingPlan(coachingPlanName: string): Promise<CoachingPlansPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching coaching plan ${coachingPlanName}`);
            await this.txtSearchBox.waitForControlStable();
            await this.txtSearchBox.type(coachingPlanName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchCoachingPlan, err.message);
        }
    }
}