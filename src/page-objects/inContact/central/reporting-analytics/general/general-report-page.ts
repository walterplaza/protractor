import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class GeneralReportPage extends NavigationBar {

    protected dlgLoading = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_AsyncWait_Wait'][contains(@style,'visibility: visible')]"));
    protected btnRun = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_ReportOptions_btnRunReport_ShadowButton']"));

    /**
     * Click on Run button
     * @returns {Promise<void>} Agent Snapshot Report Page
     * @memberof GeneralReportPage
     */
    public async clickRun(): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, "Running report");
            await this.btnRun.waitForControlStable();
            await this.btnRun.click();
            await this.waitForServerLoad();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickRun, err.message);
        }
    }

    /**
     * Wait for loading dialog disappear
     * @returns {Promise<void>}
     * @memberof SupervisorSnapshotPage
     */
    public async waitForServerLoad(): Promise<void> {
        try {
            await this.dlgLoading.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForServerLoad, err.message);
        }
    }
}