import EmployeesPage from "@page-objects/CXone/admin/employees/employee-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from '@utilities/protractor-wrappers/element-wrapper';
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import LoginPage from "./login-page";

export default class SetPasswordPage {

	private static _setPasswordPage: SetPasswordPage = null;

	protected txtPassword = new ElementWrapper(by.xpath("//input[@id='passwordCognito']"));
	protected txtConfirmPassword = new ElementWrapper(by.xpath("//input[@name='confirmPassword']"));
	protected btnResetPassword = new ElementWrapper(by.xpath("//button[@id='createMyAccountBtn']"));

	public static getInstance(): SetPasswordPage {
		// this._setPasswordPage = (this._setPasswordPage == null) ? new SetPasswordPage() : this._setPasswordPage;
		this._setPasswordPage = new SetPasswordPage();
		return this._setPasswordPage;
	}

	/**
	 * Reset password
	 * @param {string} password Password value
	 * @returns {Promise<EmployeesPage>} Employees Page
	 * @memberof SetPasswordPage
	 */
	async resetPassword(password: string): Promise<LoginPage> {
		try {
			await Logger.write(FunctionType.UI, `Resetting password of agent`);
			await this.txtPassword.type(password);
			await this.txtConfirmPassword.type(password);
			await this.btnResetPassword.click();
			return await LoginPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.resetPassword, err.message);
		}
	}

	/**
	 * Check reset password page is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof SetPasswordPage
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnResetPassword.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}
}

