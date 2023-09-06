import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class UserTenant {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;

	/**
	 * Initialize data for User in Tenant
	 * @param {string} username
	 * @returns {UserTenant}
	 * @memberof UserTenant
	 */
	public initData(username: string): UserTenant {
		try {
			let randomPassword = Utility.createRandomString(9, "Lgvn1");
			this.username = username + "@mailinator.com";
			this.firstName = "lgvn_first";
			this.lastName = Utility.createRandomString(18, "lgvn_last");
			this.email = this.username;
			this.password = randomPassword;
			this.confirmPassword = randomPassword;
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.initData, err.message);
		}
	}
}