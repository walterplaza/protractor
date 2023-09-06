import NavigationBar from '@page-objects/inContact/central/general/navigation-bar';
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from 'protractor';

export default class SupervisorPage extends NavigationBar {

	private static _supervisorPage: SupervisorPage = null;

	protected divAgentList = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected divSpinner = new ElementWrapper(by.xpath("//div[@id='index-loading-spinner']"));
	protected divMaxWrapper = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected btnYes = new ElementWrapper(by.xpath("//div[@class='dialog-buttons-panel']/button[@class='confirm-button']"));
	protected btnCancel = new ElementWrapper(by.xpath("//div[@class='dialog-buttons-panel']/button[@class='cancel-button']"));
	protected lblForceLogout = new ElementWrapper(by.xpath("//div[@class='dialog-contents']/h1[@title='Force Logout']"));
	protected txtSearchBox = new ElementWrapper(by.xpath("//div[@class='agent-list-tab-ui agentlisttabui']//div[@class='search-container']/input[@class='filter-search']"));
	protected divAgentDrillDown = new ElementWrapper(by.xpath("//div[@class='agent-drill-down']"));

	// Dynamic controls
	protected lblAgentItem(agent: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='agent-list-item']//span[@title='${agent}']`));
	}

	protected btnForgeLogoutOfAgent(agentID: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@data-agent-id='${agentID}']//button[@class='force-logout']`));
	}

	public static async getInstance(): Promise<SupervisorPage> {
		this._supervisorPage = new SupervisorPage();
		let handle: string = await BrowserWrapper.getNewWindowHandle();
		await BrowserWrapper.switchWindowByHandle(handle);
		await this._supervisorPage.waitForLoading();
		return this._supervisorPage;
	}

	/**
	 * Is Supervisor page displayed
	 * @returns {Promise<boolean>} the existence of Supervisor page
	 * @memberof SupervisorPage
	 */
	public async isPageDisplayed(): Promise<boolean> {
		try {
			return await this.divAgentList.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	* Is confirm dialog display displayed
	* @returns {Promise<boolean>} the existence of confirm dialog
 	* @memberof SupervisorPage
 	*/
	public async isConfirmDialogDisplayed(): Promise<boolean> {
		try {
			return await this.lblForceLogout.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isConfirmDialogDisplayed, err.message);
		}
	}

	/**
	 * Wait for loading
	 * @returns {Promise<SupervisorPage>} Supervisor Page
	 * @memberof SupervisorPage
	 */
	public async waitForLoading(): Promise<SupervisorPage> {
		try {
			await this.divSpinner.waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoading, err.message);
		}
	}

	/**
	 * Click on Forge logout button of Agent
	 * @returns {Promise<SupervisorPage>} Supervisor Page
	 * @param {string} agent information of the agent
	 * @memberof SupervisorPage
	 */
	public async forceLogoutAgent(agent: string): Promise<SupervisorPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking on Forge Out button`);
			await this.btnForgeLogoutOfAgent(agent).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.forceLogoutAgent, err.message);
		}
	}

	/**
	 * Select an Agent from list
	 * @returns {Promise<SupervisorPage>} MAX page
	 * @param {string} agent information of the agent
	 * @memberof SupervisorPage
	 */
	public async selectAgent(agent: string): Promise<SupervisorPage> {
		try {
			await Logger.write(FunctionType.UI, `Opening Agent Drill Down of ${agent}`);
			await this.txtSearchBox.waitForVisibilityOf();
			await this.txtSearchBox.type(agent);
			await this.lblAgentItem(agent).waitForControlStable();
			await this.lblAgentItem(agent).click();
			await this.divAgentDrillDown.waitForControlStable();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectAgent, err.message);
		}
	}

	/**
	 * Click on Yes button of confirmation dialog
	 * @returns {Promise<SupervisorPage>} MAX page
	 * @memberof SupervisorPage
	 */
	public async confirmForceLogOut(): Promise<SupervisorPage> {
		try {
			await Logger.write(FunctionType.UI, `Confirming force logout`);
			await this.btnYes.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.confirmForceLogOut, err.message);
		}
	}

	/**
	 * Is Supervisor page is displayed
	 * @returns {Promise<boolean>} the existence of MAX page
	 * @memberof MaxPage
	 */
	public async isAgentDrillDownDisplayed(): Promise<boolean> {
		try {
			return await this.divAgentDrillDown.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentDrillDownDisplayed, err.message);
		}
	}
}