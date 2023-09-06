import TopMenu from "@page-objects/CXone/general/top-menu";
import ScheduleManagerPage from "@page-objects/CXone/wfm/schedule-manager/schedule-manager-page";
import BiddingManagerPage from "@page-objects/CXone/wfm/scheduling/bidding-manager-page";
import BiddingTemplatesPage from "@page-objects/CXone/wfm/setup/bidding-templates-page";
import DailyRules from "@page-objects/CXone/wfm/setup/daily-rules-page";
import WeeklyRules from "@page-objects/CXone/wfm/setup/weekly-rules-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { CoordinateType } from "@data-objects/general/general";
import TestRunInfo from "@data-objects/general/test-run-info";
import RealTimeAdherencePage from "@page-objects/CXone/wfm/real-time-adherence/real-time-adherence-page";
import RequestsPage from "../requests/requests-page";

export default class WFMMenu extends TopMenu {

    private static _WFMMenu: WFMMenu = null;

    protected btnSchedule = new ElementWrapper(by.xpath("//span[@class='base-link-icon module-link-icon icon-Icons_svg_generate-schedule']"));
    protected btnBiddingManager = new ElementWrapper(by.xpath("//a[@id='biddingManager-link']"));
    protected btnSetup = new ElementWrapper(by.xpath("//span[@class='base-link-icon module-link-icon icon-manager_setup']"));
    protected btnDailyRules = new ElementWrapper(by.xpath("//span[text()='Daily Rules']"));
    protected btnBiddingTemplates = new ElementWrapper(by.xpath("//a[@id='shiftBiddingTemplates-link']"));
    protected tabScheduling = new ElementWrapper(by.xpath("//li[@id='scheduling-wrapper']/a[@id='scheduling-sub-menu-header']"));
    protected tabGenerateSchedule= new ElementWrapper(by.xpath("//ul[@id='scheduling-sub-menu-items']//a[@id='generateschedule-link']"));
    protected tabBiddingManager = new ElementWrapper(by.xpath("//ul[@id='scheduling-sub-menu-items' and @class='sub-menu-items ng-scope']//a[@id='biddingManager-link']"));
    protected lnkSetup = new ElementWrapper(by.xpath("//a[@id='scheduler-setup-sub-menu-header']"));
    protected lnkActivityCodes = new ElementWrapper(by.xpath("//a[@id='activityCodes-link']"));
    protected lnkACDMapping = new ElementWrapper(by.xpath("//a[@id='acdActivitiesMapping-link']"));
    protected lnkDailyRules = new ElementWrapper(by.xpath("//a[@id='dailyRule-link']"));
    protected lnkWeeklyRules = new ElementWrapper(by.xpath("//a[@id='weeklyRules-link']"));
    protected lnkBiddingTemplates = new ElementWrapper(by.xpath("//a[@id='shiftBiddingTemplates-link']"));
    protected lnkScheduleManager = new ElementWrapper(by.xpath("//a[@id='scheduler']"));
    protected lnkForecasting = new ElementWrapper(by.xpath("//a[@id='forecaster-sub-menu-header']"));
    protected lnkGenerateForecasts = new ElementWrapper(by.xpath("//a[@id='generatedForecasts-link']"));
    protected lnkForecastingProfiles = new ElementWrapper(by.xpath("//a[@id='forecastingProfiles-link']"));
    protected lnkACDHistoricalData = new ElementWrapper(by.xpath("//a[@id='historicalData-link']"));
    protected lnkScheduling = new ElementWrapper(by.xpath("//a[@id='scheduling-sub-menu-header']"));
    protected lnkGenerateSchedule = new ElementWrapper(by.xpath("//a[@id='generateschedule-link']"));
    protected lnkBiddingManager = new ElementWrapper(by.xpath("//a[@id='biddingManager-link']"));
    protected lnkImportStaffingPlan = new ElementWrapper(by.xpath("//a[@id='importStaffingJob-link']"));
    protected divWFMMenu = new ElementWrapper(by.xpath("//div[@class='custom-scroller nice-scroll']"));
    protected lnkRealTimeAdherenceMenu = new ElementWrapper(by.xpath("//div[@class='nav-bar']//li[@id='realTimeAdherence-wrapper']"));
    protected foreCasterMenu = new ElementWrapper(by.xpath("//div[@class='nav-bar']//li[@id='forecaster-wrapper']"));
    protected generatedForecastsMenu = new ElementWrapper(by.xpath("//div[@class='nav-bar']//li[@id='forecaster-wrapper']//a[@id='generatedForecasts-link']"));
    protected forecastingProfileMenu = new ElementWrapper(by.xpath("//div[@class='nav-bar']//li[@id='forecaster-wrapper']//a[@id='forecastingProfiles-link']"));
    protected requestsMenu = new ElementWrapper(by.xpath("//div[@class='nav-bar']//li[contains(@id,'equests-wrapper')]"));
    protected lnkIntradayManager = new ElementWrapper(by.xpath("//a[@id='intradayManager']"))
    protected lnkRequests = new ElementWrapper(by.xpath("//a[@id='requests']"))
    
    public static getInstance(): WFMMenu {
        this._WFMMenu = new WFMMenu();
        return this._WFMMenu;
    }

    /**
     * Go to daily rules page
     * @author Nhat.Nguyen
     * @returns {Promise<DailyRules>} daily rules Page
     * @memberof WFMMenu
     */
    public async gotoDailyRulesPage(): Promise<DailyRules> {
        try {
            await Logger.write(FunctionType.UI, `Going to Daily Rules Page`);

            if (!await this.lnkDailyRules.isDisplayed()) {
                await this.lnkSetup.click();
            }

            await this.lnkDailyRules.click();
            let dailyRulesPage = require(`${ProjectPath.pageObjects}/CXone/wfm/setup/daily-rules-page`).default;
            return dailyRulesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoDailyRulesPage, err.message);
        }
    }

    /**
      * Go to bidding templates page
      * @author Tuan.Vu
      * @returns {Promise<BiddingTemplatesPage>} bidding templates Page
      * @memberof WFMMenu
      */
    public async gotoBiddingTemplatesPage(): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Bidding Report Page");
            await this.btnSetup.click();
            await this.btnBiddingTemplates.click();
            return BiddingTemplatesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoBiddingTemplatesPage, err.message);
        }
    }

    /** 
     * Go to weekly rules page
     * Going to generate schedule page
     * @returns {Promise<any>}
     * @memberof WFMMenu
     */
    public async gotoGenerateSchedulePage(): Promise<any> {
        try {
            await Logger.write(FunctionType.UI,"Going to generate schedule page");
            await this.tabScheduling.click();
            await this.tabGenerateSchedule.click();
            let scheduleManagerPage = require(`${ProjectPath.pageObjects}/CXone/wfm/scheduling/generate-schedule`).default;
            return await scheduleManagerPage.getInstance();
        } catch(err){
            throw new errorwrapper.CustomError(this.gotoGenerateSchedulePage, err.message);
        }
    }

    /** Go to weekly rules page
     * @author Nhat.Nguyen
     * @returns {Promise<WeeklyRules>} daily rules Page
     * @memberof WFMMenu
     */
    public async gotoWeeklyRulesPage(): Promise<WeeklyRules> {
        try {
            await Logger.write(FunctionType.UI, `Going to Weekly Rules Page`);

            if (!await this.lnkWeeklyRules.isDisplayed()) {
                await this.lnkSetup.click();
            }

            await this.lnkWeeklyRules.click();
            let weeklyRulesPage = require(`${ProjectPath.pageObjects}/CXone/wfm/setup/weekly-rules-page`).default;
            return weeklyRulesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoWeeklyRulesPage, err.message);
        }
    }

    /**      
     * Going to bidding manager page
     * @returns {Promise<BiddingManagerPage>}
     * @memberof WFMMenu
     */
    public async gotoBiddingManagerPage(): Promise<BiddingManagerPage> {
        try{
            await Logger.write(FunctionType.UI, "Going to bidding manager page");
            if(await this.tabBiddingManager.isDisplayed(TestRunInfo.shortTimeout)){
                await this.tabBiddingManager.click();
            } else {
                await this.tabScheduling.click();
                await this.tabBiddingManager.click();
            }
            let biddingManagerpage= require('@page-objects/CXone/wfm/scheduling/bidding-manager-page').default;
            return await biddingManagerpage.getInstance();
        } catch(err){
            throw new errorwrapper.CustomError(this.gotoBiddingManagerPage, err.message);
        }
    }

    /** Go to Schedule Manager page
     * @author Nhat.Nguyen
     * @returns {Promise<ScheduleManagerPage>} Schedule Manager Page
     * @memberof WFMMenu
     */
    public async gotoScheduleManager(): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Schedule Manager Page`);
            await this.lnkScheduleManager.click();
            let scheduleManagerPage = require(`${ProjectPath.pageObjects}/CXone/wfm/schedule-manager/schedule-manager-page`).default;
            await this.waitForLoadingPanel();
            return scheduleManagerPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoScheduleManager, err.message);
        }
    }

    /**
     * Click Forecasting Menu
     * @author Nhat.Nguyen
     * @returns {Promise<WFMMenu>} WFM Menu
     * @memberof WFMMenu
     */
    public async clickForecastingMenu(): Promise<WFMMenu> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Forecasting Menu`);
            await this.lnkForecasting.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickForecastingMenu, err.message);
        }
    }

    /**
     * Check Generate Forecasts is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isGenerateForecastsDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkGenerateForecasts.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isGenerateForecastsDisplayed, err.message);
        }
    }

    /**
     * Check Forecasting Profiles Displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isForecastingProfilesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkForecastingProfiles.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isForecastingProfilesDisplayed, err.message);
        }
    }

    /**
     * Check ACD Historical Data Displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isACDHistoricalDataDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkACDHistoricalData.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isACDHistoricalDataDisplayed, err.message);
        }
    }

    /**
     * Click Scheduling Menu
     * @author Nhat.Nguyen
     * @returns {Promise<WFMMenu>} WFM Menu
     * @memberof WFMMenu
     */
    public async clickSchedulingMenu(): Promise<WFMMenu> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Scheduling Menu`);
            await this.lnkScheduling.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSchedulingMenu, err.message);
        }
    }

    /**
     * Check Generate Schedule is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isGenerateScheduleDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkGenerateSchedule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isGenerateScheduleDisplayed, err.message);
        }
    }

    /**
     * Check Bidding Manager is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isBiddingManagerDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkBiddingManager.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBiddingManagerDisplayed, err.message);
        }
    }

    /**
     * Check Import Staffing Plan is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isImportStaffingPlanDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkImportStaffingPlan.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isImportStaffingPlanDisplayed, err.message);
        }
    }

    /**
     * Click Setup Menu
     * @author Nhat.Nguyen
     * @returns {Promise<WFMMenu>} WFM Menu
     * @memberof WFMMenu
     */
    public async clickSetupMenu(): Promise<WFMMenu> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Setup Menu`);
            await this.lnkSetup.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSetupMenu, err.message);
        }
    }

    /**
     * Check Activity Codes is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isActivityCodesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkActivityCodes.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActivityCodesDisplayed, err.message);
        }
    }

    /**
     * Check ACD Mapping is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isACDMappingDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkACDMapping.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isACDMappingDisplayed, err.message);
        }
    }

    /**
     * Check Daily Rules is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isDailyRulesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkDailyRules.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDailyRulesDisplayed, err.message);
        }
    }

    /**
     * Check Weekly Rules is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isWeeklyRulesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkWeeklyRules.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWeeklyRulesDisplayed, err.message);
        }
    }

    /**
     * Check Bidding Templates is displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof WFMMenu
	 */
    public async isBiddingTemplatesDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkBiddingTemplates.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBiddingTemplatesDisplayed, err.message);
        }
    }

    /**
     * Checking wfm menu is on left
     * @author Y.Le
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isSchedulerMenuOnLeft(): Promise<boolean> {
        try{
            return await this.divWFMMenu.getElementCoordinate(CoordinateType.LEFT)<5;// 5 is the tolerant of Schedule menu with page location
        } catch(err) {
            throw new errorwrapper.CustomError(this.isSchedulerMenuOnLeft, err.message);
        }
    }

   /**
     * goto Real Time Adherence Menu
     * @author Phat.Truong
     * @returns {Promise<RealTimeAdherencePage>} WFM Menu
     * @memberof WFMMenu
     */
    public async gotoRealTimeAdherenceMenu(): Promise<RealTimeAdherencePage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Forecasting Menu`);
            await this.lnkRealTimeAdherenceMenu.click();
            let realTimeAdherencePage = require(`${ProjectPath.pageObjects}/CXone/wfm/real-time-adherence/real-time-adherence-page`).default;
			return await realTimeAdherencePage.getInstance();
           
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoRealTimeAdherenceMenu, err.message);
        }
    }

    /**
     * Go to Requests page
     * @author Anh.Le
     * @returns {Promise<RealTimeAdherencePage>} WFM Menu
     * @memberof WFMMenu
     */
    public async gotoRequestsPage(): Promise<RequestsPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Requests Menu`);
            await this.requestsMenu.click();
            let requestsPage = require(`${ProjectPath.pageObjects}/CXone/wfm/requests/requests-page`).default;
			return await requestsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoRequestsPage, err.message);
        }
    }

    /**
     * Check Real Time Adherence menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isRealTimeAdherenceMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkRealTimeAdherenceMenu.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRealTimeAdherenceMenuDisplayed, err.message);
        }
    }

    /**
     * Check Intraday Manager menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isIntradayManagerMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkIntradayManager.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isIntradayManagerMenuDisplayed, err.message);
        }
    }

    /**
     * Check Forecasting menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isForecastingMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkForecasting.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isForecastingMenuDisplayed, err.message);
        }
    }

    /**
     * Check Scheduling menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isSchedulingMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkScheduling.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulingMenuDisplayed, err.message);
        }
    }

    /**
     * Check Request menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isRequestMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkRequests.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRequestMenuDisplayed, err.message);
        }
    }

    /**
     * Check Setup menu is displayed or not
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof WFMMenu
     */
    public async isSetupMenuDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lnkSetup.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSetupMenuDisplayed, err.message);
        }
    }

}