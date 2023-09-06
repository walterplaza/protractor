import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class AgentSnapShotPrebuiltReport extends PrebuiltReportPage {

    private static _agentSnapshotPage: AgentSnapShotPrebuiltReport = null;

    public static getInstance(): AgentSnapShotPrebuiltReport {
        this._agentSnapshotPage = new AgentSnapShotPrebuiltReport();
        return this._agentSnapshotPage;
    }

    protected lblAgentSnapshotResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Agent Snapshot']"));

    /**
     * is Agent Snapshot Report Result Displayed ?
     * @returns {Promise<boolean>} 
     * @memberof AgentSnapShotPrebuiltReport
     */
    public async isAgentSnapshotReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblAgentSnapshotResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentSnapshotReportResultDisplayed, err.message);
        }
    }
}