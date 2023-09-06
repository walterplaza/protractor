import GeneralReportPage from "@page-objects/inContact/central/reporting-analytics/general/general-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CampaignPerformancePage extends GeneralReportPage {

    private static _campaignPerformancePage: CampaignPerformancePage = null;

    protected lblCampaignPerformance = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportTitle_ReportTitleLabel'][text()='Campaign Performance']"));
    protected lblCampaignPerformanceResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Campaign Performance']"));

    public static getInstance(): CampaignPerformancePage {
        this._campaignPerformancePage = new CampaignPerformancePage();
        return this._campaignPerformancePage;
    }

    /**
     * Check Campaign Performance Report page is displayed or not
     * @returns {Promise<boolean>} the existence of Campaign Performance Report page
     * @memberof CampaignPerformancePage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblCampaignPerformance.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Check Campaign Performance Report result is displayed or not
     * @returns {Promise<boolean>} the existence of Campaign Performance Report
     * @memberof CampaignPerformancePage
     */
    public async isCampaignPerformanceReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblCampaignPerformanceResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCampaignPerformanceReportResultDisplayed, err.message);
        }
    }

}