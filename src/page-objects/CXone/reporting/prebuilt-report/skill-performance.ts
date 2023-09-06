import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class PerformanceSkillPrebuiltReport extends PrebuiltReportPage {

    private static _performanceSkillPrebuiltReport: PerformanceSkillPrebuiltReport = null;

    public static getInstance(): PerformanceSkillPrebuiltReport {
        this._performanceSkillPrebuiltReport = new PerformanceSkillPrebuiltReport();
        return this._performanceSkillPrebuiltReport;
    }

    protected lblSkillPerformanceResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Skill Performance']"));

    /**
     * is Skill Performance Report Result displayed
     * @returns {Promise<boolean>} 
     * @memberof PerformanceSkillPrebuiltReport
     */
    public async isSkillPerformanceReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblSkillPerformanceResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillPerformanceReportResultDisplayed, err.message);
        }
    }

}