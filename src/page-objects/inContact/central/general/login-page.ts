import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Browser, by } from "protractor";

export default class LoginPage {

	private static _loginPage: LoginPage = null;

	protected txtNewUsername = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_BaseContent')][contains(@id,'txtUsername')]"));
	protected txtUsername = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_BaseContent')][contains(@id,'tbxUserName')]"));
	protected txtPassword = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_BaseContent')][contains(@id,'tbxPassword')]"));
	protected btnLogin = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_BaseContent')][contains(@id,'btnLogin')]"));
	protected btnNext = new ElementWrapper(by.xpath("//input[contains(@id,'ctl00_BaseContent')][contains(@id,'btnNext')]"));
	protected icoSpinner = new ElementWrapper(by.xpath("//div[@class='row wfmspinner']"));

	public static getInstance(): LoginPage {
		this._loginPage = new LoginPage();
		return this._loginPage;
	}

	/**
	 * Submit login form
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<void>} 
	 * @memberof LoginPage
	 */
	public async submitLoginForm(agent: Agent): Promise<void> {
		try {

			if (await this.txtPassword.isDisplayed(TestRunInfo.shortTimeout)) {
				await this.txtUsername.type(agent.email);
				await this.txtPassword.type(agent.password);
			} else {
				await this.txtNewUsername.type(agent.email);
				await this.btnNext.waitForControlStable();
				await this.btnNext.click();
				await this.waitForSpinner();
				await this.txtPassword.waitForControlStable();
				await this.txtPassword.type(agent.password);
			}
			await this.btnLogin.waitForControlStable();
			await this.btnLogin.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitLoginForm, err.message);
		}
	}

	/**
	 * Wait for spinner appear then disappear
	 * @returns {Promise<void>}
	 * @memberof TopMenu
	 */
	public async waitForSpinner(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await this.icoSpinner.wait(TestRunInfo.shortTimeout);
			await this.icoSpinner.waitUntilDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForSpinner, err.message);
		}
	}

	/**
	 * Login as admin account
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<CentralPage>} "Employee" page
	 * @memberof LoginPage
	 */
	public async loginInContact(agent: Agent): Promise<CentralPage> {
		try {
			await Logger.write(FunctionType.UI, `Logging in using ${agent.email}`);
			await this.submitLoginForm(agent);
			await this.waitForLoginSuccess();
			if (TestRunInfo.browser == Browser.IE) {
				await BrowserWrapper.setSessionStorage(agent.accessToken, agent.refreshToken);
			}
			return await CentralPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.loginInContact, err.message);
		}
	}

	/**
     * Check login page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
	public async isPageDisplayed(): Promise<boolean> {
		try {
			return await this.txtUsername.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
     * Wait for login successful 
	 * @memberof LoginPage
	 */
	public async waitForLoginSuccess(): Promise<void> {
		try {
			await this.btnLogin.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoginSuccess, err.message);
		}
	}
}
