import TestRunInfo from "@data-objects/general/test-run-info";
import QMSupervisor from "@page-objects/CXone/dashboard/qm-supervisor-page";
import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import SearchPage from "@page-objects/CXone/search/search-page";
import ProjectPath from "@test-data/general/project-path";

export default class MyDashBoards extends TopMenu {

    private static _myDashBoards: MyDashBoards = null;

    protected btnPredefinedDashboard = new ElementWrapper(by.xpath("//a[@id='PredefinedDashboard-sub-menu-header']"));
    protected btnQMSupervisor = new ElementWrapper(by.xpath("//ul[contains(@id,'PredefinedDashboard') and @class='sub-menu-items ng-scope']//a[@id='qmSupervisor-link']"));
    protected btnNewDashboard = new ElementWrapper(by.xpath("//button[contains(@class,'newDashboardBtn')]"));
    protected ddlSelectDashboard = new ElementWrapper(by.xpath("//div[@class='info-col pull-left']//div[.//div[text()='Select Dashboard'] and @class='selectize-input' and ./div[@class='ui-caret']]"));
    protected divTopCategoriesVolBar = new ElementWrapper(by.xpath("//div[.//span[text()='Top Categories']]//div[@class='category-table']//div[@class='ag-body-container']/div[.//div[.='Agent Polite']]//div[@class='vol-bar-actual']"));
    protected divSegmentsInSearchLink = new ElementWrapper(by.xpath("//div[@class='popover-content']//div[text()='Open segments in Search']"));
    protected divSelectDashboardName(dashBoardName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@class,'ui-select-choices-row')]/div[text()='${dashBoardName}']`));
    }

    protected divDashBoardWidgets(widgetName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='dashboard-container']//div[.//span[text()='${widgetName}'] and @class='widget-wrapper']`));
    }

    public static getInstance(): MyDashBoards {
        this._myDashBoards = new MyDashBoards();
        return this._myDashBoards;
    }

    /**
     * Is My Dashboard Page displayed
     * @author Y.le
     * @returns {Promise<boolean>}
     * @memberof MyDashBoards
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnNewDashboard.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Going to predefined dashboard
     * @author Y.le
     * @returns {Promise<QMSupervisor>}
     * @memberof MyDashBoards
     */
    public async gotoQMSupervisor(): Promise<QMSupervisor> {
        try {
            await Logger.write(FunctionType.UI, "Going to predefined dashboard");
            await this.expandPredefinedDashboard(true);
            await this.btnQMSupervisor.click();
            return QMSupervisor.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoQMSupervisor, err.message);
        }
    }

    /**
    * Checking QM supervisor is displayed
    * @author Y.Le
    * @param {number} [timeout]
    * @returns
    * @memberof MyDashBoards
    */
    public async isQMSupervisorMenuDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.btnQMSupervisor.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isQMSupervisorMenuDisplayed, err.message);
        }
    }

    /**
     * Expanding Predefined Dashboard
     * @author Y.Le
     * @param {boolean} [option=true]
     * @returns {Promise<this>}
     * @memberof MyDashBoards
     */
    public async expandPredefinedDashboard(option: boolean = true): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "expanding Predefined Dashboard");
            let expanded: boolean = await this.btnQMSupervisor.isDisplayed(TestRunInfo.middleTimeout);
            if (option == true && expanded == false) {
                await this.btnPredefinedDashboard.click();
                await this.btnQMSupervisor.wait();
            } else if (option == false && expanded == true) {
                await this.btnPredefinedDashboard.click();
                await this.btnQMSupervisor.wait();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.expandPredefinedDashboard, err.message)
        }
    }

    /**
     * Selecting the dashboard
     * @author Nhat.Nguyen
     * @param {string} dashBoardName
     * @returns {Promise<void>}
     * @memberof MyDashBoards
     */
    public async selectDashboardName(dashBoardName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Selecting the '${dashBoardName}' Dashboard`);
            await this.ddlSelectDashboard.click();
            await this.divSelectDashboardName(dashBoardName).waitForPresenceOf();
            await this.divSelectDashboardName(dashBoardName).click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDashboardName, err.message)
        }
    }

    /**
     * Is Dashboard Widget displayed
     * @author Nhat.Nguyen
     * @param {string} widgetName
     * @param {number} [timeout]
     * @returns {Promise<boolean>}
     * @memberof MyDashBoards
     */
    public async isDashboardWidgetDisplayed(widgetName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.divDashBoardWidgets(widgetName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDashboardWidgetDisplayed, err.message);
        }
    }

    /**
     * Clicking on any category
     * @author Nhat.Nguyen
     * @returns {Promise<void>}
     * @memberof MyDashBoards
     */
    public async clickTopCategoriesVolBar(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on any category`);
            await this.divTopCategoriesVolBar.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTopCategoriesVolBar, err.message)
        }
    }


    /**
     * Is Segments In Search Link Displayed
     * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MyDashBoards
     */
    public async isSegmentsInSearchLinkDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.divSegmentsInSearchLink.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSegmentsInSearchLinkDisplayed, err.message);
        }
    }

    /**
     * click Segments In Search Link
     * @author Nhat.Nguyen
     * @returns {Promise<void>}
     * @memberof MyDashBoards
     */
    public async clickSegmentsInSearchLink(): Promise<SearchPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Segments In Search Link`);
            await this.divSegmentsInSearchLink.click();
            let searchPage = require(`${ProjectPath.pageObjects}/CXone/search/search-page`).default;
			return searchPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSegmentsInSearchLink, err.message)
        }
    }
}