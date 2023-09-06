import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import StopWatch from "@utilities/general/stop-watch";
import TestRunInfo from "@data-objects/general/test-run-info";

export default class PromiseKeeperPage extends NavigationBar {

    private static _promiseKeeperPage: PromiseKeeperPage = null;

    protected cbbDatePicker = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_ReportOptions_ctrlDatePicker_txtDate']"));
    protected lblFilterLast7Day = new ElementWrapper(by.xpath("//li[@class='ui-daterangepicker-Last7Days ui-corner-all']"));
    protected lblFilterToday = new ElementWrapper(by.xpath("//li[@class='ui-daterangepicker-Today ui-corner-all']"));
    protected btnRuningReport = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_ReportOptions_btnRunReport_ShadowButton']"));
    protected lblShowOptions = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_collapsibleOptions_ctl05_Label1']"));
    protected tbReportDetail = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl09']"));
    protected lbSelectSkill = new SelectElementWrapper(by.xpath("//div[@id='modalImageColumn']//select[@class='msi-control-results']"));
    protected btnMoveRight = new ElementWrapper(by.xpath("//div[@id='modalImageColumn']//button[@class='UCNWebButton msi-move-right-button']"));
    protected btnDone = new ElementWrapper(by.xpath("//div[@id='modalImageColumn']//button[@class='UCNWebButton msi-search-ok-button primary-inline-real-button evolve-float-right']"));
    protected btnAddFilterSkill = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_collapsibleOptions_ctl07_ParametersControl_SkillMultiSelect_msSkills_btnAddItem']"));
    protected btnAddFilterAgent = new ElementWrapper(by.xpath("//div[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_collapsibleOptions_ctl07_ParametersControl_AgentsMultiSelect_msAgents_btnAddItem']"));
    protected lblNumberOfReportPage = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl05_ctl00_TotalPages']"));
    protected cbbReportSearchFiled = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl05_ctl03_ctl00']"));
    protected btnFind = new ElementWrapper(by.xpath("//a[@id='ctl00_ctl00_ctl00_BaseContent_ReportContent_reportViewerControl_ctl05_ctl03_ctl01']"));

    // Dynamic controls
    protected lblRowReportDetail(dateMadeSchedule: string, skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//td[./div[text()="${dateMadeSchedule}"]]/following-sibling::td[./div[text()="${skillName}"]]//parent::tr`));
    }

    public static getInstance(): PromiseKeeperPage {
        this._promiseKeeperPage = new PromiseKeeperPage();
        return this._promiseKeeperPage;
    }

    /**
     * Search agent in promise keeper
     * @author Huy.Nguyen
     * @param {string} option
     * @returns {Promise<MaxPage>}
     * @memberof MaxPage
     */
	public async searchAgentPromiseKeeper(searchString: string): Promise<PromiseKeeperPage> {
		try {
			await Logger.write(FunctionType.UI, `Searching agent ${searchString} in promise keeper`);
            await this.cbbReportSearchFiled.waitForVisibilityOf();
            await this.cbbReportSearchFiled.type(searchString);
            await this.btnFind.click();
            if (await BrowserWrapper.isAlertDisplay()==true) {
                await BrowserWrapper.acceptAlert();
                await this.cbbReportSearchFiled.waitUntilPropertyChange("enabled");
            }
            return this;  
		} catch (err) {
			throw new errorwrapper.CustomError(this.searchAgentPromiseKeeper, err.message);
		}
    }
    
    /**
     * Check schedule commitment is displayed in promise keeper report
     * @author Huy.Nguyen
     * @returns {Promise<boolean>}
     * @memberof PromiseKeeperPage
     */
    public async isSchedulePromiseKeeperDisplayed(agentSchedule: string, dateMadeSchedule: string, skillName: string, timeoutInSecond: number=15): Promise<boolean> {
        try {
            let isScheduleShown: boolean = false;
            await this.cbbDatePicker.click();
            await this.lblFilterLast7Day.waitForVisibilityOf();
            await this.lblFilterLast7Day.click();
            await this.btnRuningReport.click();
            await this.tbReportDetail.waitForVisibilityOf();

            let stopWatch = new StopWatch();
            stopWatch.startClock();
            while (stopWatch.getTimeLeftInSecond(timeoutInSecond) > 0 && isScheduleShown==false) {
                await this.searchAgentPromiseKeeper(agentSchedule);
                isScheduleShown = await this.lblRowReportDetail(dateMadeSchedule, skillName).isDisplayed(TestRunInfo.shortTimeout * 2);
            }
            return isScheduleShown;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulePromiseKeeperDisplayed, err.message);
        }
    }
}