import TopMenu from "@page-objects/CXone/general/top-menu";
import CXOneDataDownloadPage from "@page-objects/CXone/reporting/acd-data-download/data-download-page";
import AgentSnapShotPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/agent-snapshot";
import CampaignPerformancePrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/campaign-performance";
import PerformanceSkillPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/skill-performance";
import SupervisorSnapshotPrebuiltReport from "@page-objects/CXone/reporting/prebuilt-report/supervisor-snapshot";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import ProjectPath from "@test-data/general/project-path";

export default class PrebuiltReportPage extends TopMenu {

    private static _prebuiltReportPage: PrebuiltReportPage = null;

    // constructor() { super(); }

    public static getInstance(): PrebuiltReportPage {
        this._prebuiltReportPage = new PrebuiltReportPage();
        return this._prebuiltReportPage;
    }

    protected lnkAgentSnapshot = new ElementWrapper(by.xpath("//a[@href='/inContact/Manage/Reports/CustomReports/AgentSnapshot.aspx']"));
    protected lnkCampaignPerformance = new ElementWrapper(by.xpath("//a[@href='/inContact/Manage/Reports/CustomReports/CampaignPerformance.aspx']"));
    protected lnkSkillPerformance = new ElementWrapper(by.xpath("//a[@href='/inContact/Manage/Reports/CustomReports/SkillPerformance.aspx']"));
    protected lnkSupervisorSnapshot = new ElementWrapper(by.xpath("//a[@href='/inContact/Manage/Reports/CustomReports/SupervisorSnapshot.aspx']"));
    protected lblPrebuiltReportName = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportTitle_ReportTitleLabel']"));
    protected btnRunReport = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportOptions_btnRunReport_ShadowButtonSpan']"));
    protected btnACDDataDownload = new ElementWrapper(by.xpath("//a[@id='dataDownload-sub-menu-header']"));
    protected btnDataDownload = new ElementWrapper(by.xpath("//a[@id='DataDownload-link']"));
    /**
     * Going to Agent Snapshot Page
     * @returns {Promise<AgentSnapShotPrebuiltReport>} 
     * @memberof PrebuiltReportPage
     */
    public async gotoAgentSnapShotPrebuiltReport(): Promise<AgentSnapShotPrebuiltReport> {
        try {
            await Logger.write(FunctionType.UI, `Going to Agent Snapshot Page`);
            await this.lnkAgentSnapshot.click();
            await this.waitForPageLoad();
            let agentSnapShotPrebuiltReport = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report/agent-snapshot`).default;
            return await agentSnapShotPrebuiltReport.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoAgentSnapShotPrebuiltReport, err.message);
        }
    }

    /**
     * Going to Skill Performance Page
     * @returns {Promise<PerformanceSkillPrebuiltReport>} 
     * @memberof PrebuiltReportPage
     */
    public async gotoSkillPerformancePrebuiltReport(): Promise<PerformanceSkillPrebuiltReport> {
        try {
            await Logger.write(FunctionType.UI, `Going to Skill Performance Page`);
            await this.lnkSkillPerformance.click();
            await this.waitForPageLoad();
            let performanceSkillPrebuiltReport = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report/skill-performance`).default;
            return await performanceSkillPrebuiltReport.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSkillPerformancePrebuiltReport, err.message);
        }
    }

    /**
     * Going to Campaign Performance Page
     * @returns {Promise<CampaignPerformancePrebuiltReport>} 
     * @memberof PrebuiltReportPage
     */
    public async gotoCampaignPerformancePage(): Promise<CampaignPerformancePrebuiltReport> {
        try {
            await Logger.write(FunctionType.UI, `Going to Campaign Performance Page`);
            await this.lnkCampaignPerformance.click();
            await this.waitForPageLoad();
            let campaignPerformancePrebuiltReport = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report/campaign-performance`).default;
            return await campaignPerformancePrebuiltReport.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCampaignPerformancePage, err.message);
        }
    }

    /**
     * Going to Supervisor Snapshot Page
     * @returns {Promise<SupervisorSnapshotPrebuiltReport>} 
     * @memberof PrebuiltReportPage
     */
    public async gotoSupervisorSnapshotPage(): Promise<SupervisorSnapshotPrebuiltReport> {
        try {
            await Logger.write(FunctionType.UI, `Going to Supervisor Snapshot Page`);
            await this.lnkSupervisorSnapshot.click();
            await this.waitForPageLoad();
            let suppervisorSnapshotPage = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report/supervisor-snapshot`).default;
            return await suppervisorSnapshotPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSupervisorSnapshotPage, err.message);
        }
    }

    /**
     * Running reporting
     * @returns {Promise<PrebuiltReportPage>}
     * @memberof PrebuiltReportPage
     */
    public async runReporting(): Promise<PrebuiltReportPage> {
        try {
            await Logger.write(FunctionType.UI, "Running reporting")
            await this.btnRunReport.click();
            await this.waitForSpinner();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.runReporting, err.message);
        }
    }

    /**
     * is title of pre-built report displayed
     * @returns {Promise<boolean>}
     * @memberof PrebuiltReportPage
     */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.lblPrebuiltReportName.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
	 * Go to data download page
	 * @returns {Promise<DataDownloadPage>} data download page
	 * @memberof PrebuiltReportPage
	 */
    public async gotoDataDownloadPage(): Promise<CXOneDataDownloadPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Data Download Page");
            await this.btnACDDataDownload.click();
            await this.btnDataDownload.click();
            return new CXOneDataDownloadPage();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoDataDownloadPage, err.message);
        }
    }
}