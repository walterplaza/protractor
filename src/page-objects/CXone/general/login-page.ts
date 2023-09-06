import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmployeesPage from '@page-objects/CXone/admin/employees/employee-page';
import TopMenu from "@page-objects/CXone/general/top-menu";
import MySchedulePage from "@page-objects/CXone/my-zone/my-schedule-page";
import TenantPage from "@page-objects/CXone/tenant/tenant-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import EvaluationsPage from "@page-objects/CXone/my-zone/evaluations-page";


export default class LoginPage extends TopMenu {

	private static _loginPage: LoginPage = null;

	protected txtUsername = new ElementWrapper(by.xpath("//input[@id='emailFieldNext']"));
	protected txtPassword = new ElementWrapper(by.xpath("//input[@id='mfaPassField']"));
	protected btnNext = new ElementWrapper(by.id("nextBtn"));
	protected btnBack = new ElementWrapper(by.id("backBtn"));
	protected btnLogin = new ElementWrapper(by.id("mfaLoginBtn"));
	protected lblRequiredMsg = new ElementWrapper(by.xpath("//div[@ng-message='required']"));
	protected lblEmailMsg = new ElementWrapper(by.xpath("//div[@ng-message='userNameCharacters']"));
	protected lnkForgotPassword = new ElementWrapper(by.xpath("//a[@id='mfa-forgot-password-link']"));
	protected lblUserName = new ElementWrapper(by.xpath("//label[@id='mfaEmailField']"));
	protected lblActiveMsg = new ElementWrapper(by.xpath("//div[@id='nice-toaster-container']//div[@class='toast toast-success animated fadeIn']"));

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
			await this.txtUsername.waitForVisibilityOf();
			await this.txtUsername.type(agent.email);
			await this.btnNext.waitForControlStable();
			await this.btnNext.click();
			await this.waitForSpinner();
			await this.txtPassword.waitForControlStable();
			await this.txtPassword.type(agent.password);
			await this.btnLogin.waitForControlStable();
			await this.btnLogin.click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitLoginForm, err.message);
		}
	}

	/**
	 * Enter username in login form
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<void>} 
	 * @memberof LoginPage
	 */
	public async enterUsername(agent: Agent): Promise<void> {
		try {
			await this.txtUsername.type(agent.email);
		} catch (err) {
			throw new errorwrapper.CustomError(this.enterUsername, err.message);
		}
	}

	/**
	 * Enter password in login form
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<void>} 
	 * @memberof LoginPage
	 */
	public async enterPassword(agent: Agent): Promise<void> {
		try {
			await this.txtPassword.waitForControlStable();
			await this.txtPassword.type(agent.password);
		} catch (err) {
			throw new errorwrapper.CustomError(this.enterPassword, err.message);
		}
	}

	/**
	 * Click Next Button in login form
	 * @returns {Promise<void>} 
	 * @memberof LoginPage
	 */
	public async clickNextButton(): Promise<void> {
		try {
			await this.btnNext.waitForControlStable();
			await this.btnNext.click();
			await this.waitForSpinner();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickNextButton, err.message);
		}
	}

	/**
	 * Click Sign In Button in login form
	 * @returns {Promise<EmployeesPage>} "Employee" page 
	 * @memberof LoginPage
	 */
	public async clickSignInButton(): Promise<EmployeesPage> {
		try {
			await this.btnLogin.waitForControlStable();
			await this.btnLogin.click();
			await this.btnLogin.waitUntilDisappear();
			await this.waitForPageLoad();
			return await EmployeesPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickSignInButton, err.message);
		}
	}

	/**
	 * Login as admin account
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<EmployeesPage>} "Employee" page
	 * @memberof LoginPage
	 */
	public async loginAsAdmin(agent: Agent): Promise<EmployeesPage> {
		try {
			await Logger.write(FunctionType.UI, `Logging in using Admin ${agent.email}`);
			await this.submitLoginForm(agent);
			await this.waitForLoginSuccess();
			return await EmployeesPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.loginAsAdmin, err.message);
		}
	}

	/**
	 * Login as agent account
	 * @author Tuan.Vu
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<MySchedulePage>} "My Schedule" page
	 * @memberof LoginPage
	 */
	public async loginAsAgent(agent: Agent): Promise<MySchedulePage> {
		try {
			await Logger.write(FunctionType.UI, `Logging in using Agent ${agent.email}`);
			await this.submitLoginForm(agent);
			await this.waitForLoginSuccess();
			return await MySchedulePage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.loginAsAgent, err.message);
		}
	}

	/**
	 * Login as new agent account
	 * @author Tan.Ta
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<EvaluationsPage>} "My Schedule" page
	 * @memberof LoginPage
	 */
	public async loginAsNewAgent(agent: Agent): Promise<EvaluationsPage> {
		try {
			await Logger.write(FunctionType.UI, `Logging in using Agent ${agent.email}`);
			await this.submitLoginForm(agent);
			await this.waitForLoginSuccess();
			return EvaluationsPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.loginAsNewAgent, err.message);
		}
	}

	/**
	 * Login as super admin account
	 * @param {Agent} agent information of the agent
	 * @returns {Promise<TenantPage>} "Tenant" page
	 * @memberof LoginPage
	 */
	public async loginAsSuperAdmin(agent: Agent): Promise<TenantPage> {
		try {
			await Logger.write(FunctionType.UI, `Logging in using Super Admin ${agent.email}`);
			await this.submitLoginForm(agent);
			await this.waitForLoginSuccess();
			return await TenantPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.loginAsSuperAdmin, err.message);
		}
	}

	/**
     * Check login page is displayed or not 
	 * @author Chinh.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.txtUsername.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
     * Check login page's controls is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
	public async isLoginControlsDisplayed(): Promise<boolean> {
		try {
			let isUserNameDisplayed: boolean = await this.lblUserName.isDisplayed();
			let isPasswordDisplayed: boolean = await this.txtPassword.isDisplayed();
			let isBackButtonDisplayed: boolean = await this.btnBack.isDisplayed();
			let isSignInButtonDisplayed: boolean = await this.btnLogin.isDisplayed();
			let isForgotLinkDisplayed: boolean = await this.lnkForgotPassword.isDisplayed();

			if (isUserNameDisplayed == isPasswordDisplayed == isBackButtonDisplayed
				== isSignInButtonDisplayed == isSignInButtonDisplayed == isForgotLinkDisplayed) {
				return true;
			} else {
				return false;
			}

		} catch (err) {
			throw new errorwrapper.CustomError(this.isLoginControlsDisplayed, err.message);
		}
	}

	/**
     * Check username text box is displayed or not 
	 * @author Phat.Ngo
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
	public async isUserNameTextBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.txtUsername.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isUserNameTextBoxDisplayed, err.message);
		}
	}

	/**
     * Wait for login successful 
	 * @memberof LoginPage
	 */
	public async waitForLoginSuccess(timeoutInSecond: number = TestRunInfo.longTimeout) {
		try {
			await this.btnLogin.waitUntilDisappear(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoginSuccess, err.message);
		}
	}

	/**
     * Check username text box is editable 
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Editable=>true, not Editable=>false
	 * @memberof LoginPage
	 */
	public async isUserNameTextBoxEditable(): Promise<boolean> {
		try {
			return await this.txtUsername.isEnabled();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isUserNameTextBoxEditable, err.message);
		}
	}

	/**
     * Get username 
	 * @author Nhat.Nguyen
	 * @returns {Promise<string>} get user name textbox
	 * @memberof LoginPage
	 */
	public async getUserNameTextbox(): Promise<string> {
		try {
			return await this.txtUsername.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getUserNameTextbox, err.message);
		}
	}

	/**
     * Check password text box is editable 
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Editable=>true, not Editable=>false
	 * @memberof LoginPage
	 */
	public async isPasswordTextBoxEditable(): Promise<boolean> {
		try {
			return await this.txtPassword.isEnabled();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPasswordTextBoxEditable, err.message);
		}
	}

	/**
     * Check back button is displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not Display=>false
	 * @memberof LoginPage
	 */
	public async isBackButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnBack.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isBackButtonDisplayed, err.message);
		}
	}

	/**
     * Check sign in button is displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not Display=>false
	 * @memberof LoginPage
	 */
	public async isSignInButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnLogin.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSignInButtonDisplayed, err.message);
		}
	}

	/**
     * Check forgot password is displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not Display=>false
	 * @memberof LoginPage
	 */
	public async isForgotPasswordDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lnkForgotPassword.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isForgotPasswordDisplayed, err.message);
		}
	}

	/**
	 * Get user name text box
	 * @author Nhat.Nguyen
	 * @returns {Promise<string>} text of username
	 * @memberof LoginPage
	 */
	public async getUsernameText(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting user name textbox`);

			return await this.lblUserName.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getUsernameText, err.message);
		}
	}

	/**
     * Check user name label is displayed
	 * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not Display=>false
	 * @memberof LoginPage
	 */
	public async isUsernameDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {

			return await this.lblUserName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isUsernameDisplayed, err.message);
		}
	}

	/**
     * Check enter password page's controls is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof LoginPage
	 */
	public async isEnterPasswordControlsDisplayed(): Promise<boolean> {
		try {
			let isPasswordDisplayed: boolean = await this.txtPassword.isDisplayed();
			let isBackButtonDisplayed: boolean = await this.btnBack.isDisplayed();
			let isSignInButtonDisplayed: boolean = await this.btnLogin.isDisplayed();
			let isForgotLinkDisplayed: boolean = await this.lnkForgotPassword.isDisplayed();

			if (isPasswordDisplayed == isBackButtonDisplayed
				== isSignInButtonDisplayed == isSignInButtonDisplayed == isForgotLinkDisplayed) {
				return true;
			} else {
				return false;
			}

		} catch (err) {
			throw new errorwrapper.CustomError(this.isEnterPasswordControlsDisplayed, err.message);
		}
	}

	/**
	 * Check User activated successfully message is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof LoginPage
	 */
	public async isActivatedSuccessfullyMessageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return this.lblActiveMsg.isDisplayed(timeoutInSecond)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isActivatedSuccessfullyMessageDisplayed, err.message);
		}
	}
}
