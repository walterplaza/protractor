import GeneralReportPage from "@page-objects/inContact/central/reporting-analytics/general/general-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SupervisorSnapshotPage extends GeneralReportPage {

    private static _supervisorSnapshotPagePage: SupervisorSnapshotPage = null;

    protected lblSupervisorSnapshot = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportTitle_ReportTitleLabel'][text()='Skill Performance']"));
    protected lblSupervisorSnapshotResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Skill Performance']"));

    public static getInstance(): SupervisorSnapshotPage {
        this._supervisorSnapshotPagePage = new SupervisorSnapshotPage();
        return this._supervisorSnapshotPagePage;
    }

    /**
     * Check Supervisor Snapshot Report page is displayed or not
     * @returns {Promise<boolean>} the existence of Supervisor Snapshot Report page
     * @memberof SupervisorSnapshotPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblSupervisorSnapshot.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Check Supervisor Snapshot Report result is displayed or not
     * @returns {Promise<boolean>} the existence of Supervisor Snapshot Report result
     * @memberof SupervisorSnapshotPage
     */
    public async isSupervisorSnapshotReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblSupervisorSnapshotResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSupervisorSnapshotReportResultDisplayed, err.message);
        }
    }

}