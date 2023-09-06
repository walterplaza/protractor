import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class CampaignPerformancePrebuiltReport extends PrebuiltReportPage {

    private static _campaignPerformancePrebuiltReport: CampaignPerformancePrebuiltReport = null;

    public static getInstance(): CampaignPerformancePrebuiltReport  {
        this._campaignPerformancePrebuiltReport = new CampaignPerformancePrebuiltReport ();
        return this._campaignPerformancePrebuiltReport;
    }

    protected lblCampaignPerformanceResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Campaign Performance']"));

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