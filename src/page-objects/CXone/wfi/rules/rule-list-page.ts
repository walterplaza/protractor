import TopMenu from "@page-objects/CXone/general/top-menu";
import CreateRulePage from "@page-objects/CXone/wfi/rules/create-rule-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";

export default class RulesListPage extends TopMenu {
    private static _rulesListPage: RulesListPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_btnCreateNewInAdvancedGridView_ShadowButton']"));
    protected btnSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_btnSearch']"));
    protected btnClearSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_btnClearSearch']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_tbxSearchText']"));
    protected imgLoading = new ElementWrapper(by.xpath("//div[@id='Spinner_msgPanelLoading']"));
    protected tblRuleList = new ElementWrapper(by.xpath("//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_gridView']"));
    protected cbbShow = new SelectElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_MainContent_agvsSkills_lbxActiveInactive']/option[text()='Active']"));

    // Dynamic controls
    protected lblReportItem(reportName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//tbody//td[text()='${reportName}']`));
    }

    public static getInstance(): RulesListPage {
        this._rulesListPage = new RulesListPage();
        return this._rulesListPage;
    }

    /**
     * Clicking Create New Rule button
     * @returns {Promise<CreateRulePage>}
     * @memberof RulesListPage
     */
    public async clickCreateNewRule(): Promise<CreateRulePage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Create New Rule Button");
            await this.btnCreateNew.click();
            return await CreateRulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateNewRule, err.message);
        }
    }

    /**
     * Search Report Schedules
     * @param {value} text value to search
     * @returns {Promise<RulesListPage>}
     * @memberof RulesListPage
     */
    public async searchCustomReportSchedules(value: string): Promise<RulesListPage> {
        try {
            await Logger.write(FunctionType.UI, "Searching Custom Report Schedules");
            await this.txtSearch.type(value);
            await this.btnSearch.click();
            await this.imgLoading.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchCustomReportSchedules, err.message);
        }
    }

    /**
     * Is Rules page Displayed
     * @param {reportName} text report name
     * @param {string} reportName
     * @returns {Promise<boolean>}
     * @memberof RulesListPage
     */
    public async isRulesDisplayed(reportName: string): Promise<boolean> {
        try {
            return await this.lblReportItem(reportName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRulesDisplayed, err.message);
        }
    }

    /**
     * Is list of active rules Displayed
     * @returns {Promise<boolean>}
     * @memberof RulesListPage
     */
    public async isListOfActiveRulesDisplayed(): Promise<boolean> {
        try {
            return await this.tblRuleList.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isListOfActiveRulesDisplayed, err.message);
        }
    }

}
