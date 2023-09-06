import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class SupervisorSnapshotPrebuiltReport extends PrebuiltReportPage {

    private static _supervisorSnapshotPrebuiltReport: SupervisorSnapshotPrebuiltReport = null;

    public static getInstance(): SupervisorSnapshotPrebuiltReport  {
        this._supervisorSnapshotPrebuiltReport = new SupervisorSnapshotPrebuiltReport ();
        return this._supervisorSnapshotPrebuiltReport;
    }

    protected lblSupervisorSnapshotResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']"));
   
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