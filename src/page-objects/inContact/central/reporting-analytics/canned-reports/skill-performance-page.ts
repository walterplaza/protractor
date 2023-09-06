import GeneralReportPage from "@page-objects/inContact/central/reporting-analytics/general/general-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SkillPerformancePage extends GeneralReportPage {

    private static _skillPerformancePage: SkillPerformancePage = null;

    protected lblSkillPerformance = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportTitle_ReportTitleLabel'][text()='Skill Performance']"));
    protected lblSkillPerformanceResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Skill Performance']"));

    public static getInstance(): SkillPerformancePage {
        this._skillPerformancePage = new SkillPerformancePage();
        return this._skillPerformancePage;
    }

    /**
     * Check Agent Snapshot Report page is displayed or not
     * @returns {Promise<boolean>} the existence of Agent Snapshot Report page
     * @memberof SkillPerformancePage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblSkillPerformance.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Check Agent Snapshot Report Result is displayed or not
     * @returns {Promise<boolean>} the existence of Agent Snapshot Report result
     * @memberof SkillPerformancePage
     */
    public async isSkillPerformanceReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblSkillPerformanceResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillPerformanceReportResultDisplayed, err.message);
        }
    }

}