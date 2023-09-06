import TestRunInfo from "@data-objects/general/test-run-info";
import ACDSkillPage from "@page-objects/CXone/acd/contact-settings/acd-skills/acd-skill-page";
import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import LoginPage from "@page-objects/CXone/general/login-page";
import MaxPage from "@page-objects/CXone/max/max-page";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import FormManagerPage from "@page-objects/CXone/qm/form-manager/form-manager-page";
import PrebuiltReportPage from "@page-objects/CXone/reporting/prebuilt-report-page";
import SearchPage from "@page-objects/CXone/search/search-page";
import WFIMenu from "@page-objects/CXone/wfi/wfi-general/wfi-menu";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import MyDashBoards from "@page-objects/CXone/dashboard/my-dashboard-page";
import ACDMenu from "@page-objects/CXone/acd/acd-general/acd-menu";
import CoachingPackagePage from "@page-objects/CXone/coaching/coaching-package/coaching-package-page";

export default class TopMenu {

	protected btnAppLauncher = new ElementWrapper(by.xpath("//a[@id='launcher']/span"));
	protected btnLaunchMax = new ElementWrapper(by.xpath("//a[@id='max']"));
	protected ddlAgentOptions = new SelectElementWrapper(by.xpath("//div[@id='simple-dropdown']"));
	protected lnkLogout = new ElementWrapper(by.xpath("//a[@id='Logout']"));
	protected btnConfirmLogout = new ElementWrapper(by.xpath("//button[@ng-click='$ctrl.primaryBtnClick()']"));
	protected btnNavigationIcon = new ElementWrapper(by.xpath("//a[@id='module-picker-link']"));
	protected btnNavigationSearch = new ElementWrapper(by.xpath("//button[@id='select-search']"));
	protected btnACD = new ElementWrapper(by.xpath("//button[@id='select-acd']"));
	protected btnWFI = new ElementWrapper(by.xpath("//button[@id='select-wfi']"));
	protected btnWFM = new ElementWrapper(by.xpath("//button[@id='select-scheduler']"));
	protected btnQM = new ElementWrapper(by.xpath("//button[@id='select-formManager']"));
	protected btnReporting = new ElementWrapper(by.xpath("//button[@id='select-reporting']"));
	protected btnRules = new ElementWrapper(by.xpath("//a[@id='RuleList']"));
	protected lblNiceHeader = new ElementWrapper(by.xpath("//header[@class='nice-header']"));
	protected icoSpinner = new ElementWrapper(by.xpath("//div[@class='row wfmspinner']"));
	protected divSpinner = new ElementWrapper(by.xpath("//div[@id='spinner_main_component']"));
	protected lnkACDSkill = new ElementWrapper(by.xpath("//a[@id='SkillsList-link']"));
	protected lblAgentName = new ElementWrapper(by.xpath("//div[@class='loggedin-header ng-scope']//div[@class='titleText ng-binding']"));
	protected ddlMenu = new ElementWrapper(by.xpath("//ul[contains(@class,'uib-dropdown-menu')]"));
	protected btnLogout = new ElementWrapper(by.xpath("//li[@class='headerMenuItem ng-scope']/a[@id='Logout']"));
	protected dlgConfirm = new ElementWrapper(by.xpath("//div[@class='modal-dialog ']//div[@class='nice-message-modal-wrapper']"));
	protected pnlLoading = new ElementWrapper(by.xpath("//div[@class='spinner spinner-bounce-middle']"));
	protected lblLoggedUser = new ElementWrapper(by.xpath("//div[@id='simple-dropdown']/div[contains(@class,'titleText')]"));
	protected btnAdmin = new ElementWrapper(by.xpath("//button[@id='select-admin']"));
	protected btnMyZone = new ElementWrapper(by.xpath("//button[@id='select-my-space']"));
	protected btnDashboard = new ElementWrapper(by.xpath("//button[@id='select-dashboard']"));
	protected btnCoaching = new ElementWrapper(by.xpath("//button[@id='select-coaching']"));

	/**
	 * Wait for spinner component disappear
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForSpinnerComponentDisappear(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.divSpinner.waitUntilPropertyNotChange("style", timeoutInSecond);
			await this.waitForSpinnerDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSpinnerComponentDisappear, err.message);
		}
	}

	/**
	 * Wait for spinner appear then disappear
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForSpinner(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.waitForSpinnerAppear(TestRunInfo.shortTimeout);
			await this.waitForSpinnerDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSpinner, err.message);
		}
	}

	/**
	 * Wait for spinner appear
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForSpinnerAppear(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.icoSpinner.wait(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSpinnerAppear, err.message);
		}
	}

	/**
	 * Wait for spinner disappear
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForSpinnerDisappear(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.icoSpinner.waitUntilDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSpinnerDisappear, err.message);
		}
	}

	/**
	 * Log out
	 * @returns {Promise<LoginPage>} Login
	 * @memberof TopMenu
	 */
	public async logOut(): Promise<LoginPage> {
		try {
			await Logger.write(FunctionType.UI, "Logging out from CxOne");
			await this.lblNiceHeader.waitForVisibilityOf();
			await this.lblNiceHeader.waitForControlStable();
			await this.ddlAgentOptions.selectByID("Logout");
			await this.btnConfirmLogout.click();
			return LoginPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.logOut, err.message);
		}
	}

	/**
	 * Launch MAX
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof TopMenu
	 */
	public async launchMax(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Launching Max");
			await this.btnAppLauncher.click();
			await this.btnLaunchMax.click();
			return await MaxPage.getMaxInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.launchMax, err.message);
		}
	}

	/**
	 * Check CxOne home page is displayed or not
	 * @returns {Promise<boolean>} the existence of tenant page
	 * @memberof TopMenu
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnAppLauncher.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * Go to search page 
	 * @returns {Promise<SearchPage>} search page
	 * @memberof TopMenu
	 */
	public async gotoSearchPage(): Promise<SearchPage> {
		try {
			await Logger.write(FunctionType.UI, "Going to Search page");
			await this.btnNavigationIcon.click();
			await this.btnNavigationSearch.click();
			let searchPage = require(`${ProjectPath.pageObjects}/CXone/search/search-page`).default;
			return searchPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoSearchPage, err.message);
		}
	}

	/**
	 * Go to ACD page 
	 * @returns {Promise<ACDSkillPage>} ACD page
	 * @memberof TopMenu
	 */
	public async gotoACDPage(): Promise<ACDMenu> {
		try {
			await Logger.write(FunctionType.UI, "Going to ACD page");
			await this.btnNavigationIcon.click();
			this.btnACD.click();
			let acdSkillPage = require(`${ProjectPath.pageObjects}/CXone/acd/acd-general/acd-menu`).default;
			return acdSkillPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoACDPage, err.message);
		}
	}

	/**
     * Go to wfi page
     * @returns {Promise<WFIMenu>} WFI Page
	 * @memberof TopMenu
	 */
	public async gotoWFIPage(): Promise<WFIMenu> {
		try {
			await Logger.write(FunctionType.UI, `Going to WFI Page`);
			await this.btnNavigationIcon.click();
			await this.btnWFI.click();
			let wfiMenu = require(`${ProjectPath.pageObjects}/CXone/wfi/wfi-general/wfi-menu`).default;
			return await wfiMenu.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoWFIPage, err.message);
		}
	}

	/**
     * Go to QM page
	 * @author Tuan.Vu
     * @returns {Promise<FormManagerPage>} Form Manager Page
	 * @memberof TopMenu
	 */
	public async gotoQM(): Promise<FormManagerPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to QM Page`);
			await this.btnNavigationIcon.click();
			await this.btnQM.click();
			let qmMenu = require(`${ProjectPath.pageObjects}/CXone/qm/form-manager/form-manager-page`).default;
			return qmMenu.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoQM, err.message);
		}
	}

	/**
     * Go to prebuilt report page
     * @returns {Promise<PrebuiltReportPage>} Prebuilt report page
	 * @memberof TopMenu
	 */
	public async gotoPrebuiltReportsPage(): Promise<PrebuiltReportPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Prebuilt Report Page`);
			await this.btnNavigationIcon.click();
			await this.btnReporting.click();
			let prebuiltReportPage = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report-page`).default;
			return prebuiltReportPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoPrebuiltReportsPage, err.message);
		}
	}

	/**
	 * Wait for page load 
	 * @memberof TopMenu
	 */
	public async waitForPageLoad(): Promise<void> {
		try {
			await this.ddlAgentOptions.wait();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForPageLoad, err.message);
		}
	}

	/**
	 * Open Agent option
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async openAgentOption(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Opening Agent option");
			await this.lblNiceHeader.waitForControlStable();
			await this.lblAgentName.click();
			await this.ddlMenu.waitForControlStable();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openAgentOption, err.message);
		}
	}

	/**
	 *Click on logout button
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async clickLogout(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking on Logout");
			await this.btnLogout.click();
			await this.lnkLogout.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickLogout, err.message);
		}
	}

	/**
	 *Click on yes button
	 * @returns {Promise<LoginPage>}
	 * @memberof TopMenu
	 */
	public async clickYesButton(): Promise<LoginPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking on Yes button");
			await this.btnConfirmLogout.click();
			return await LoginPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickYesButton, err.message);
		}
	}

	/**
	 * Check Agent option is displayed or not
	 * @returns {Promise<boolean>} the existence of Agent option
	 * @memberof TopMenu
	 */
	public async isAgentOptionDisplayed(): Promise<boolean> {
		try {
			return await this.ddlMenu.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentOptionDisplayed, err.message);
		}
	}

	/**
	 * Check confirm dialog is displayed or not
	 * @returns {Promise<boolean>} the existence of confirm dialog
	 * @memberof TopMenu
	 */
	public async isConfirmDialogDisplayed(): Promise<boolean> {
		try {
			return await this.dlgConfirm.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isConfirmDialogDisplayed, err.message);
		}
	}

	/**
	 * Going to Reporting page
	 * @returns {Promise<PrebuiltReportPage>} 
	 * @memberof TopMenu
	 */
	public async gotoReportingPage(): Promise<PrebuiltReportPage> {
		try {
			await Logger.write(FunctionType.UI, "Going to Reporting page");
			await this.btnNavigationIcon.click();
			await this.btnReporting.click();
			await this.waitForPageLoad()
			let reportingPage = require(`${ProjectPath.pageObjects}/CXone/reporting/prebuilt-report-page`).default;
			return reportingPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoReportingPage, err.message);
		}
	}

	/**
     * Go to wfm page
	 * @author Tuan.Vu
     * @returns {Promise<ScheduleManagerPage>} Schedule manager Page
	 * @memberof TopMenu
	 */
	public async gotoWFMPage(): Promise<WFMMenu> {
		try {
			await Logger.write(FunctionType.UI, `Going to WFM`);
			await this.btnNavigationIcon.click();
			await this.btnWFM.click();
			let wfmMenu = require(`${ProjectPath.pageObjects}/CXone/wfm/wfm-general/wfm-menu`).default;
			return await wfmMenu.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoWFMPage, err.message);
		}
	}

	/**
	 * Wait for spinner appear then disappear
	 * @author Nhat.Nguyen
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForLoadingPanel(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.waitForLoadingAppear(TestRunInfo.shortTimeout);
			await this.waitForLoadingDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoadingPanel, err.message);
		}
	}

	/**
	 * Wait for spinner appear
	 * @author Nhat.Nguyen
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForLoadingAppear(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.pnlLoading.wait(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoadingAppear, err.message);
		}
	}

	/**
	 * Wait for spinner disappear
	 * @author Nhat.Nguyen
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForLoadingDisappear(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.pnlLoading.waitUntilDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoadingDisappear, err.message);
		}
	}

	/**
	 * Getting logged used
	 * @author Y.Le
	 * @returns {Promise<string>}
	 * @memberof TopMenu
	 */
	public async getLoggedUser(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting logged user");
			return await this.lblLoggedUser.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getLoggedUser, err.message);
		}
	}

	/** Go to employees page
	* @author Nhat.Nguyen
	* @returns {Promise<EmployeesPage>} EmployeesPage
	* @memberof TopMenu
	*/
	public async gotoEmployeesPage(): Promise<EmployeesPage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Employees Page`);
			await this.btnNavigationIcon.click();
			await this.btnAdmin.click();
			let employeesPage = require(`${ProjectPath.pageObjects}/CXone/admin/employees/employee-page`).default;
			return await employeesPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoEmployeesPage, err.message);
		}
	}

	/** Go to My zone page
	* @author Nhat.Nguyen
	* @returns {Promise<EmployeesPage>} EmployeesPage
	* @memberof TopMenu
	*/
	public async gotoMyZonePage(): Promise<MySchedulePage> {
		try {
			await Logger.write(FunctionType.UI, `Going to My Zone Page`);
			await this.btnNavigationIcon.click();
			await this.btnMyZone.click();
			let mySchedulePage = require(`${ProjectPath.pageObjects}/CXone/my-zone/my-schedule-page`).default;
			return mySchedulePage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoMyZonePage, err.message);
		}
	}

	/**
	 * Going to My Dashboard page
	 *@author Tung.Vo
	 * @returns {Promise<MyDashBoards>}
	 * @memberof TopMenu
	 */
	public async gotoMyDashboardsPage(): Promise<MyDashBoards> {
		try {
			await Logger.write(FunctionType.UI, "Going to My Dashboard page");
			await this.btnNavigationIcon.click();
			await this.btnDashboard.click();
			let myDashboards = require(`${ProjectPath.pageObjects}/CXone/dashboard/my-dashboard-page`).default;
			return myDashboards.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoMyDashboardsPage, err.message);
		}
	}

	/**
	 * Go to Coaching Page
	 * @author Tan.Ta
	 * @returns {Promise<CoachingPackage>}
	 * @memberof TopMenu
	 */
	public async gotoCoachingPage(): Promise<CoachingPackagePage> {
		try {
			await Logger.write(FunctionType.UI, `Going to Coaching Page`);
			await this.btnNavigationIcon.click();
			await this.btnCoaching.click();
			let coachingPage = require(`${ProjectPath.pageObjects}/CXone/coaching/coaching-package/coaching-package-page`).default;
			return coachingPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.gotoCoachingPage, err.message);
		}
	}
}