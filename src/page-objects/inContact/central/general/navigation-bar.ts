import { MaxConnectOption, PageName } from "@data-objects/general/cluster";
import { Browser } from "@data-objects/general/platform";
import TestRunInfo from "@data-objects/general/test-run-info";
import BusinessUnitPage from "@page-objects/inContact/central/admin/account-setting/business-unit/business-unit-page";
import QuickRepliesPage from "@page-objects/inContact/central/admin/communication/quick-replies/quick-replies";
import BrowserFilesPage from "@page-objects/inContact/central/admin/folders-&-files/browser-files-page";
import StationsPage from "@page-objects/inContact/central/admin/stations/stations-page";
import UsersPage from "@page-objects/inContact/central/admin/users/users-page";
import RulesListPage from "@page-objects/inContact/central/admin/workforce-intelligence/rule/rule-list-page";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import InternalBusinessUnitPage from "@page-objects/inContact/central/internal-admin/business-unit/internal-business-unit-page";
import ExtensibleReportsListPage from "@page-objects/inContact/central/internal-admin/extensible-reports/extensible-reports-list-page";
import CallingPage from "@page-objects/inContact/central/personal-connection/calling-page";
import ActiveContactsPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/active-contacts-page";
import AgentSnapshotPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/agent-snapshot-page";
import CampaignPerformancePage from "@page-objects/inContact/central/reporting-analytics/canned-reports/campaign-performance-page";
import ContactHistoryPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/contact-history-page";
import SkillPerformancePage from "@page-objects/inContact/central/reporting-analytics/canned-reports/skill-performance-page";
import SupervisorSnapshotPage from "@page-objects/inContact/central/reporting-analytics/canned-reports/supervisor-snapshot-page";
import CustomReportSchedulesListPage from "@page-objects/inContact/central/reporting-analytics/custom-reporting/schedules/custom-report-schedules-list-page";
import Dashboards from "@page-objects/inContact/central/reporting-analytics/dashboards/dashboards";
import AdminDataDownloadPage from "@page-objects/inContact/central/reporting-analytics/data-download/admin-data-download/admin-data-download-page";
import ReportSchedulesListPage from "@page-objects/inContact/central/reporting-analytics/data-download/report-schedule/report-schedules-list-page";
import PromiseKeeperPage from "@page-objects/inContact/central/reporting-analytics/prebuilt-reports/promise-keeper-page";
import ChatBrandingProfilePage from "@page-objects/inContact/central/routing/chat-profile/chat-branding-profile";
import PointOfContactActivePage from "@page-objects/inContact/central/routing/point-of-contact/point-of-contact-active";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import SupervisorPage from "@page-objects/inContact/supervisor/supervisor-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, WebElement } from "protractor";
import SecurityProfilesPage from "../admin/security-profiles/security-profiles-page";

export default class NavigationBar {

    protected btnLaunchSupervisor = new ElementWrapper(by.xpath("//*[name()='svg'][@class='launch-supervisor-svg injected-svg launch-supervisor-img']"));
    protected btnLaunchMAX = new ElementWrapper(by.xpath("//*[name()='svg'][@class='launch-agent-svg injected-svg launch-agent-image']"));
    protected btnLogout = new ElementWrapper(by.xpath("//*[name()='svg'][@class='logout-svg injected-svg logout-image']"));
    protected divLoading = new ElementWrapper(by.xpath("//div[@id='spinner_main_component'][@style='display: block;']"));
    protected divSpinner = new ElementWrapper(by.xpath("//div[@id='index-loading-spinner']"));
    protected formLaunchMAX = new ElementWrapper(by.xpath("//div[@class='agent-session-container']"));
    protected txtPhoneNumber = new ElementWrapper(by.xpath("//input[@class='textfield phoneNumber']"));
    protected btnContinue = new ElementWrapper(by.xpath("//button[@id='ctl00_BaseContent_btnSubmit_ShadowButton']"));
    protected radPhoneNumber = new ElementWrapper(by.xpath("//input[@id='ctl00_BaseContent_radPhone']"));
    protected radStationID = new ElementWrapper(by.xpath("//input[@id='ctl00_BaseContent_radStationID']"));
    protected radSoftPhone = new ElementWrapper(by.xpath("//input[@id='ctl00_BaseContent_radSoftPhone']"));
    protected dlgAgentSession = new ElementWrapper(by.xpath("//div[@class='agent-session-form']/div[@class='agent-session-container']"));
    protected dlgDashBoardUpdate = new ElementWrapper(by.xpath("//div[@id='dashboardUpdateDiv'][contains(@style,'block')]"))
    protected divAgentName = new ElementWrapper(by.xpath("//div[@id='simple-dropdown']"));
    protected btnLogoutBlue = new ElementWrapper(by.xpath("//a[@id='Logout']"));
    protected btnConfirmYesLogout = new ElementWrapper(by.xpath("//button[@class='btn btn-primary ng-binding ng-scope']"));
    protected lblErrorMessage = new ElementWrapper(by.xpath("//div[@id='ctl00_BaseContent_ValidationSummary']"));

    // Blue
    protected btnAppLauncher = new ElementWrapper(by.xpath("//a[@id='launcher']/span"));
    protected btnLaunchMax = new ElementWrapper(by.xpath("//a[@id='max']"));
    protected lgNice = new ElementWrapper(by.xpath("//div[@class='niceLogoWrapper ng-scope']"));


    /**
	 * Open launch MAX dialog
	 * @returns {Promise<any>}
	 * @memberof NavigationBar
	 */
    public async openAgentSession(): Promise<any> {
        try {
            if (await this.btnAppLauncher.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnAppLauncher.click();
                await this.btnLaunchMax.click();
                return await MaxPage.getMaxNewBUInstance();
            }
            else {
                await this.btnLaunchMAX.waitForControlStable();
                await this.btnLaunchMAX.click();
                await this.formLaunchMAX.waitForControlStable();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.openAgentSession, err.message);
        }
    }

    /**
	 * Select mode before launching MAX
     * @param {string} mode Mode want to select
	 * @returns {Promise<void>}
	 * @memberof NavigationBar
	 */
    public async selectMode(phoneType: MaxConnectOption): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Selecting mode for launching MAX`);

            if (phoneType.match(MaxConnectOption.PHONE)) {
                await this.radPhoneNumber.click();
            } else if (phoneType.match(MaxConnectOption.STATION_ID)) {
                await this.radStationID.click();
            } else if (phoneType.match(MaxConnectOption.SOFT_PHONE)) {
                await this.radSoftPhone.click();
                await this.txtPhoneNumber.waitUntilDisappear();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectMode, err.message);
        }
    }

    /**
	 * Launch MAX
     * @param {phoneNumber} number Phone number want to input
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof NavigationBar
	 */
    public async launchMAX(phoneNumber: string, phoneType: MaxConnectOption = MaxConnectOption.PHONE, rememberMe?: boolean, loopTimes?: number): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Launching MAX`);

            if (await this.btnAppLauncher.isDisplayed(TestRunInfo.shortTimeout)) {
                let totalWindows: number = await BrowserWrapper.getTotalWindows();
                await this.btnAppLauncher.click();
                await this.btnLaunchMax.click();
                await BrowserWrapper.waitForNumberOfWindows(totalWindows + 1);
                let maxPage = await MaxPage.getMaxNewBUInstance();
                await maxPage.enterLaunchForm(phoneType, phoneNumber, rememberMe, loopTimes);
                return await maxPage.connectMax();
            } else {
                await this.openAgentSession();
                await this.fillAgentSession(phoneNumber, phoneType);
                return await this.clickContinueButton();
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.launchMAX, err.message);
        }
    }

    /**
	 * Join MAX session
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof NavigationBar
	 */
    public async joinMAXSession(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Joining MAX session`);
            await this.openAgentSession();
            return await this.clickContinueButton();
        } catch (err) {
            throw new errorwrapper.CustomError(this.joinMAXSession, err.message);
        }
    }


    /**
     * Launch Supervisor
     * @param {phoneNumber} number Phone number want to input
     * @returns {Promise<MaxPage>} MAX page
     * @memberof NavigationBar
     */
    public async launchSupervisor(): Promise<SupervisorPage> {
        try {
            await Logger.write(FunctionType.UI, `Launching Supervisor`);
            let lengthHandles: number = await BrowserWrapper.getTotalWindows();
            await this.divSpinner.waitUntilDisappear();
            await this.btnLaunchSupervisor.moveMouse();
            await this.btnLaunchSupervisor.click();
            await BrowserWrapper.waitForNumberOfWindows(lengthHandles + 1);
            let supervisorPage = require(`${ProjectPath.pageObjects}/inContact/supervisor/supervisor-page`).default;
            return supervisorPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.launchSupervisor, err.message);
        }
    }

    /**
	 * Log out
	 * @returns {Promise<LoginPage>} Login
	 * @memberof NavigationBar
	 */
    public async logOut(): Promise<LoginPage> {
        try {
            await Logger.write(FunctionType.UI, `Logging out Central Page`);

            if (await this.btnLogout.isDisplayed(TestRunInfo.shortTimeout))
                await this.btnLogout.click();
            else {
                await this.divAgentName.click();
                await this.btnLogoutBlue.click();
                await this.btnConfirmYesLogout.click();
            }
            if (TestRunInfo.browser == Browser.IE) {
                await BrowserWrapper.clearSessionStorage();
            }
            return await LoginPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.logOut, err.message);
        }
    }

    /**
	 * Go to Calling page
	 * @returns {Promise<any>} Calling page
	 * @memberof NavigationBar
	 */
    public async gotoCallingPage(): Promise<CallingPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.CALLING_PAGE));

            let callingPage = require(`${ProjectPath.pageObjects}/inContact/central/personal-connection/calling-page`).default;
            return callingPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCallingPage, err.message);
        }
    }

    /**
     * Go to rule list page
     * @returns {Promise<any>} rule Page
     * @memberof NavigationBar
     */
    public async gotoRuleListPage(): Promise<RulesListPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Rule List Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.RULES_PAGE));
            let rulePage = require(`${ProjectPath.pageObjects}/inContact/central/admin/workforce-intelligence/rule/rule-list-page`).default;
            return rulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoRuleListPage, err.message);
        }
    }

    /**
	 * Go to Browser file page
	 * @returns {Promise<any>} Browser file page
	 * @memberof NavigationBar
	 */
    public async gotoBrowserFilesPage(): Promise<BrowserFilesPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.BROWSE_FILES_PAGE));

            let browserFilesPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/folders-&-files/browser-files-page`).default;
            return browserFilesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoBrowserFilesPage, err.message);
        }
    }

    /**
	 * Go to Skill list page
	 * @returns {Promise<any>} Skill list page
	 * @memberof NavigationBar
	 */
    public async gotoSkillsListPage(): Promise<SkillsListPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to 'Skill List' page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SKILLS_PAGE));

            let skillListPage = require(`${ProjectPath.pageObjects}/inContact/central/routing/skills/skills-list-page`).default;
            return skillListPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSkillsListPage, err.message);
        }
    }

    /**
	 * Go to Schedule list page
	 * @returns {Promise<any>} Schedule list page
	 * @memberof NavigationBar
	 */
    public async gotoScheduleListPage(): Promise<ReportSchedulesListPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SCHEDULES_LIST_PAGE));
            let schedulePage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/data-download/report-schedule/report-schedules-list-page`).default;
            return schedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoScheduleListPage, err.message);
        }
    }

    /**
	 * Go to Custom reporting schedule list page
	 * @returns {Promise<any>} Custom reporting schedule list page
	 * @memberof NavigationBar
	 */
    public async gotoCustomReportingScheduleListPage(): Promise<CustomReportSchedulesListPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Custom Reporting Schedule List Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SCHEDULES_PAGE));
            let schedulePage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/custom-reporting/schedules/custom-report-schedules-list-page`).default;
            return schedulePage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCustomReportingScheduleListPage, err.message);
        }
    }

    /**
	 * Go to Extensible Reports list page
	 * @returns {Promise<any>} Extensible Reports list page
	 * @memberof NavigationBar
	 */
    public async gotoExtensibleReportsListPage(): Promise<ExtensibleReportsListPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Extensible Reports List Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.EXTENSIBLE_REPORT_PAGE));
            let extensibleReportsListPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/extensible-reports/extensible-reports-list-page`).default;
            return extensibleReportsListPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoExtensibleReportsListPage, err.message);
        }
    }

    /**
	 * Go to Reporting/Analytics > Dashboards
	 * @returns {Promise<any>} Dashboards
	 * @memberof NavigationBar
	 */
    public async gotoDashBoards(): Promise<Dashboards> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.DASHBOARD_PAGE));
            let dashboards = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/dashboards/dashboards`).default;
            return dashboards.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoDashBoards, err.message);
        }
    }

    /**
     * Go to Agent Snapshot page
     * @returns {Promise<any>} Agent Snapshot page
     * @memberof NavigationBar
     */
    public async gotoAgentSnapshot(): Promise<AgentSnapshotPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Agent Snapshot Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.AGENT_SNAPSHOT_PAGE));
            let agentSnapshotPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/agent-snapshot-page`).default;
            return agentSnapshotPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoAgentSnapshot, err.message);
        }
    }

    /**
	 * Go to Campaign Performance page
	 * @returns {Promise<any>} Campaign Performance page
	 * @memberof NavigationBar
	 */
    public async gotoCampaignPerformancePage(): Promise<CampaignPerformancePage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Campaign Performance Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.CAMPAIGN_PERFORMANCE_PAGE));
            let agentSnapshotPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/campaign-performance-page`).default;
            return agentSnapshotPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCampaignPerformancePage, err.message);
        }
    }

    /**
     * Go to Active Contacts page
     * @author Chinh.Nguyen
     * @returns {Promise<any>} Active Contacts page
     * @memberof NavigationBar
     */
    public async gotoActiveContacts(): Promise<ActiveContactsPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Active Contacts Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.ACTIVE_CONTACTS_PAGE));
            let activeContactsPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/active-contacts-page`).default;
            return activeContactsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoActiveContacts, err.message);
        }
    }

    /**
	 * Go to Skill Performance page
	 * @returns {Promise<any>} Skill Performance page
	 * @memberof NavigationBar
	 */
    public async gotoSkillPerformancePage(): Promise<SkillPerformancePage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Skill Performance Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SKILL_PERFORMANCE_PAGE));
            let agentSnapshotPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/skill-performance-page`).default;
            return agentSnapshotPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSkillPerformancePage, err.message);
        }
    }

    /**
	 * Go to Supervisor Snapshot page
	 * @returns {Promise<any>} Supervisor Snapshot page
	 * @memberof NavigationBar
	 */
    public async gotoSupervisorSnapshotPage(): Promise<SupervisorSnapshotPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Skill Performance Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SKILL_PERFORMANCE_PAGE));
            let agentSnapshotPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/supervisor-snapshot-page`).default;
            return agentSnapshotPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoSupervisorSnapshotPage, err.message);
        }
    }

    /**
     * Going to Chat Branding Profile Page
     * 
     * @returns {Promise<ChatBrandingProfilePage>} 
     * @memberof NavigationBar
     */
    public async gotoBrandingChatProfile(): Promise<ChatBrandingProfilePage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Branding Chat Profile`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.CHAT_PROFILES_PAGE));
            let chatBrandingProfile = require(`${ProjectPath.pageObjects}/inContact/central/routing/chat-profile/chat-branding-profile`).default;
            return chatBrandingProfile.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoCustomReportingScheduleListPage, err.message);
        }
    }

    public async gotoPointOfContactActive(): Promise<PointOfContactActivePage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Point of contact active page");
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.POINTS_OF_CONTACT_PAGE));
            let pointOfContact = require(`${ProjectPath.pageObjects}/inContact/central/routing/point-of-contact/point-of-contact-active`).default;
            return pointOfContact.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoPointOfContactActive, err.message);
        }
    }

    /**
	 * Wait for page load 
	 * @memberof NavigationBar
	 */
    public async waitForPageLoad(): Promise<void> {
        try {
            if (await this.lgNice.isDisplayed(TestRunInfo.shortTimeout)) {

            } else {
                await this.btnLogout.wait();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForPageLoad, err.message);
        }
    }

    /**
     * Go to Schedule list page
     * @returns {Promise<any>} Schedule list page
     * @memberof NavigationBar
     */
    public async gotoAdminDataDownloadPage(): Promise<AdminDataDownloadPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.DATA_DOWNLOAD_PAGE));
            let dataDownloadPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/data-download/admin-data-download/admin-data-download-page`).default;
            return dataDownloadPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoAdminDataDownloadPage, err.message);
        }
    }

    /**
     * Go to Business Unit page
     * @returns {Promise<any>} Schedule list page
     * @memberof NavigationBar
     */
    public async gotoBusinessUnitPage(): Promise<BusinessUnitPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.BUSINESS_UNITS_PAGE_EXTERNAL));
            let dataDownloadPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/account-setting/business-unit/business-unit-page`).default;
            return dataDownloadPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoBusinessUnitPage, err.message);
        }
    }

    /**
     * Going to internal business unit page
     * @returns {Promise<InternalBusinessUnitPage>} 
     * @memberof NavigationBar
     */
    public async gotoInternalBusinessUnitPage(): Promise<InternalBusinessUnitPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to internal business unit page");
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.BUSINESS_UNITS_PAGE_INTERNAL));
            let businessUnitPage = require(`${ProjectPath.pageObjects}/inContact/central/internal-admin/business-unit/internal-business-unit-page`).default;
            return businessUnitPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoInternalBusinessUnitPage, err.message);
        }
    }

    /**
     * Going to Quick Replies page
     * @returns {Promise<InternalBusinessUnitActive>} 
     * @memberof NavigationBar
     */
    public async gotoQuickRepliesPage(): Promise<QuickRepliesPage> {
        try {
            await Logger.write(FunctionType.UI, "Going to Quick Replies page");
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.QUICK_REPLIES_PAGE));
            let quickReplies = require(`${ProjectPath.pageObjects}/inContact/central/admin/communication/quick-replies/quick-replies`).default;
            return quickReplies.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoQuickRepliesPage, err.message);
        }
    }

    /**
     * Wait for spinner component disappear
     * @returns {Promise<void>}
     * @memberof NavigationBar
     */
    public async waitForSpinnerComponentDisappear(timeoutInSecond: number = TestRunInfo.middleTimeout): Promise<void> {
        try {
            await this.divLoading.waitForVisibilityOf(TestRunInfo.shortTimeout);
            await this.divLoading.waitUntilDisappear(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForSpinnerComponentDisappear, err.message);
        }
    }

    /**
     * Wait for spinner component disappear
     * @returns {Promise<void>}
     * @memberof Dashboards
     */
    public async waitForDashboardUpdated(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
        try {
            await this.dlgDashBoardUpdate.wait(timeoutInSecond);
            await this.dlgDashBoardUpdate.waitUntilDisappear(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForDashboardUpdated, err.message);
        }
    }

    /**
	 * Log out in blue theme
	 * @returns {Promise<LoginPage>} Login
	 * @memberof NavigationBar
	 */
    public async logOutBlueTheme(): Promise<LoginPage> {
        try {
            await Logger.write(FunctionType.UI, `Logging out Central Page`);

            if (await this.btnLogout.isDisplayed(TestRunInfo.shortTimeout))
                await this.btnLogout.click();
            else {
                await this.divAgentName.click();
                await this.btnLogoutBlue.click();
                await this.btnConfirmYesLogout.click();
            }

            return await LoginPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.logOutBlueTheme, err.message);
        }
    }

    /**
    * Go to users page
    * @returns {Promise<any>} Users Page
    * @memberof NavigationBar
    */
    public async gotoUsersPage(): Promise<UsersPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Users Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.USERS_PAGE));
            let usersPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/users/users-page`).default;
            return usersPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoUsersPage, err.message);
        }
    }

    /**
     * Filling join agent session to launch MAX
     * @author Y.Le
     * @param {string} phoneNumber
     * @param {string} [mode]
     * @returns {Promise<this>}
     * @memberof NavigationBar
     */
    public async fillAgentSession(phoneNumber: string, phoneType?: MaxConnectOption): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, `Filling 'Join Agent Session' form to launch MAX`);
            await this.selectMode(phoneType);
            await this.dlgAgentSession.waitForControlStable();
            await this.txtPhoneNumber.type(phoneNumber);
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillAgentSession, err.message);
        }
    }

    /**
     * Clicking Continue button on join agent session
     * @author Y.Le
     * @returns {Promise<MaxPage>}
     * @memberof NavigationBar
     */
    public async clickContinueButton(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking 'Continue' button")
            let lengthHandles: number = await BrowserWrapper.getTotalWindows();
            await this.btnContinue.click();
            await this.formLaunchMAX.waitUntilDisappear();

            await BrowserWrapper.waitForNumberOfWindows(lengthHandles + 1);
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickContinueButton, err.message);
        }
    }

    /**
     * Launching Max failed
     * @author Y.Le
     * @param {string} phoneNumber
     * @param {string} [mode]
     * @returns {Promise<this>}
     * @memberof NavigationBar
     */
    public async launchMAXWithError(phoneNumber: string, phoneType?: MaxConnectOption): Promise<CentralPage> {
        try {
            await Logger.write(FunctionType.UI, "Launching Max with error");
            await this.openAgentSession();
            await this.fillAgentSession(phoneNumber, phoneType)
            await this.btnContinue.click();
            await this.lblErrorMessage.waitForPresenceOf();
            let centralPage = require('@page-objects/inContact/central/general/central-page').default;
            return await centralPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.launchMAXWithError, err.message);
        }
    }

    /**
     * Getting Error message on Join session
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof NavigationBar
     */
    public async getErrorMessage(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting error message on 'Join Agent Session` form");
            return await this.lblErrorMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessage, err.message);
        }
    }

    /**
     * Is error message displayed
     * @author Tung.Vo
     * @returns {Promise<boolean>}
     * @memberof NavigationBar
     */
    public async isErrorMessageDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.lblErrorMessage.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isErrorMessageDisplayed, err.message);
        }
    }

	/**
     * Getting entered phone number
     * @author Y.Le
     * @param {string} mode
     * @returns {Promise<string>}
     * @memberof NavigationBar
     */
    public async getEnteredPhone(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered phone number");
            return <string>await BrowserWrapper.executeScript("return document.getElementById('ctl00_BaseContent_txtPhoneNumber').value;");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredPhone, err.message);
        }
    }

    /**
     * Getting the color of error message
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof NavigationBar
     */
    public async getColorErrorMessage(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of error message");
            let style: string = await this.lblErrorMessage.getAttribute("style");
            return style.slice(style.indexOf(" ") + 1, style.indexOf(";"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorErrorMessage, err.message);
        }
    }

    /**
     * Check Phone Number or Station ID' pop up is displayed
     * @author Phat.Ngo
     * @returns {Promise<boolean>}
     * @memberof NavigationBar
     */
    public async isAgentSessionFormDisplayed(timeout?: number): Promise<boolean> {
        try {
            return await this.formLaunchMAX.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentSessionFormDisplayed, err.message);
        }
    }

    /**
     * Launch Max with error new BU
     * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @param {string} [mode]
     * @returns {Promise<this>}
     * @memberof NavigationBar
     */
    public async launchMAXWithErrorNewBU(phoneNumber: string, phoneType: MaxConnectOption = MaxConnectOption.PHONE, rememberMe?: boolean, loopTimes?: number): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Launching Max with error");
            await this.btnAppLauncher.click();
            await this.btnLaunchMax.click();
            let maxPage = await MaxPage.getMaxNewBUInstance();
            await maxPage.enterLaunchForm(phoneType, phoneNumber, rememberMe, loopTimes);
            return await maxPage.connectMaxError();

        } catch (err) {
            throw new errorwrapper.CustomError(this.launchMAXWithErrorNewBU, err.message);
        }
    }

    /**
     * is using new BU
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>}
     * @memberof NavigationBar
     */
    public async isUsingBlueTheme(timeout?: number): Promise<boolean> {
        try {
            return await this.btnAppLauncher.isDisplayed(timeout);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isUsingBlueTheme, err.message);
        }
    }

    /**
     * Get title of current web page
     * @returns {Promise<void>}
     * @memberof CentralPage
     */
    public async getTitleOfWebPage(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting title of webpage");
            return await BrowserWrapper.getDriverInstance().getTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTitleOfWebPage, err.message);
        }
    }

    /**
     * Get title of current web page URL
     * @returns {Promise<string>}
     * @memberof CentralPage
     */
    public async getTitleOfWebPageURL(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting title of webpage URL");
            return await BrowserWrapper.getDriverInstance().getCurrentUrl();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTitleOfWebPageURL, err.message);
        }
    }

    /**
     * Find an element from a web page
     * @param {string} elementXpath Xpath of the element
     * @returns {Promise<WebElement>}
     * @memberof CentralPage
     */
    public async getElementInWebPage(elementXpath: string): Promise<WebElement> {
        try {
            await Logger.write(FunctionType.UI, "Getting title of webpage URL");
            return await BrowserWrapper.getDriverInstance().findElement(by.xpath(elementXpath));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getElementInWebPage, err.message);
        }
    }

    /**
	 * Go to Promise Keeper page
	 * @returns {Promise<any>} Calling page
	 * @memberof NavigationBar
	 */
    public async gotoPromiseKeeperPage(): Promise<PromiseKeeperPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.PROMISE_KEEPER_PAGE));

            let promiseKeeperPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/prebuilt-reports/promise-keeper-page`).default;
            return promiseKeeperPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoPromiseKeeperPage, err.message);
        }
    }

    /*
	 * Go to Contact History page
     * @author Tuan.Vu
	 * @returns {Promise<ContactHistoryPage>} Contact History page
	 * @memberof NavigationBar
	 */
    public async gotoContactHistoryPage(): Promise<ContactHistoryPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to Contact History Page`);
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.CONTACT_HISTORY_PAGE));
            let contactHistoryPage = require(`${ProjectPath.pageObjects}/inContact/central/reporting-analytics/canned-reports/contact-history-page`).default;
            return contactHistoryPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoContactHistoryPage, err.message);
        }
    }

    /**
     * Get title of current web page
     * @returns {Promise<void>}
     * @memberof CentralPage
     */
    public async closeCurrentTab(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Closing current tab");
            await BrowserWrapper.close();
        } catch (err) {
            throw new errorwrapper.CustomError(this.closeCurrentTab, err.message);
        }
    }

    /**
     * Wait for new tab is opening
     * @returns {Promise<string>}
     * @memberof NavigationBar
     */
    public async waitForNewTab(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for new tab opening");
            return await BrowserWrapper.waitForNewTabIsOpening();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForNewTab, err.message);
        }
    }

    /*
     * Go to security profiles page
     * @returns {Promise<any>} security profiles page
     * @memberof NavigationBar
     */
    public async goToSecurityProfilesPage(): Promise<SecurityProfilesPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.SECURITY_PROFILES_PAGE));
            let securityProfilesPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/security-profiles/security-profiles-page`).default;
            return securityProfilesPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.goToSecurityProfilesPage, err.message);
        }
    }

    /**
	 * Go to stations page
	 * @returns {Promise<any>} Calling page
	 * @memberof NavigationBar
	 */
    public async gotoStationsPage(): Promise<StationsPage> {
        try {
            await BrowserWrapper.get(TestRunInfo.cluster.getURL(PageName.STATIONS_PAGE));
            let stationPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/stations/stations-page`).default;
            return stationPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.gotoStationsPage, err.message);
        }
    }
}

