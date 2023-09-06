import GeneralReportPage from "@page-objects/inContact/central/reporting-analytics/general/general-report-page";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class AgentSnapshotPage extends GeneralReportPage {

    private static _agentSnapshotPage: AgentSnapshotPage = null;

    protected lblAgentSnapshot = new ElementWrapper(by.xpath(" //span[@id='ctl00_ctl00_ctl00_BaseContent_ReportTitle_ReportTitleLabel'][text()='Agent Snapshot']"));
    protected lblAgentSnapshotResult = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']//div[text()='Agent Snapshot']"));

    public static getInstance(): AgentSnapshotPage {
        this._agentSnapshotPage = new AgentSnapshotPage();
        return this._agentSnapshotPage;
    }

    /**
     * Check Agent Snapshot Report page is displayed or not
     * @returns {Promise<boolean>} the existence of Agent Snapshot Report page
     * @memberof AgentSnapshotPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblAgentSnapshot.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Check Agent Snapshot Report result is displayed or not
     * @returns {Promise<boolean>} the existence of Agent Snapshot Report result
     * @memberof AgentSnapshotPage
     */
    public async isAgentSnapshotReportResultDisplayed(): Promise<boolean> {
        try {
            return await this.lblAgentSnapshotResult.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentSnapshotReportResultDisplayed, err.message);
        }
    }

}