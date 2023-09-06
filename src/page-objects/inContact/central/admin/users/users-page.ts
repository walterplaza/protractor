import { FunctionType, Logger } from '@utilities/general/logger';
import { Key, by } from "protractor";

import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import UserDetailsPage from "@page-objects/inContact/central/admin/users/user-details-page";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import TestRunInfo from '@data-objects/general/test-run-info';

export default class UsersPage extends NavigationBar {
    private static _usersPage: UsersPage = null;

    protected txtSearch = new ElementWrapper(by.xpath("//input[contains(@name,'User$tbxSearch')]"));

    // Dynamic controls
    protected cellUsername(userName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[contains(@id,'BaseContent_Content_ManagerContent_agvsUser_gridView')]//td[text()='${userName}']`)));
    }

    public static getInstance(): UsersPage {
        this._usersPage = new UsersPage();
        return this._usersPage;
    }

	/**
     * Check Users file page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UsersPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.txtSearch.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Search users in Users page
	 * @returns {Promise<UsersPage>} return a page object UsersPage
	 * @memberof UsersPage
	 */
    public async searchUser(userName: string): Promise<UsersPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching user '${userName}'`);
            await this.txtSearch.type(userName);
            await this.txtSearch.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchUser, err.message);
        }
    }

    /**
     * Select user in Users page
	 * @returns {Promise<UserDetailsPage>} return a page object UserDetailsPage
	 * @memberof UsersPage
	 */
    public async selectUser(userName: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting user '${userName}'`);
            await this.cellUsername(userName).click();
            return await UserDetailsPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectUser, err.message);
        }
    }
}
