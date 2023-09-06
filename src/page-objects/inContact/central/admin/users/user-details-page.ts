import UserDetailsSystemPage from '@page-objects/inContact/central/admin/users/user-details/user-details-system-page';
import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import ProjectPath from '@test-data/general/project-path';
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";
import TestRunInfo from '@data-objects/general/test-run-info';

export default class UserDetailsPage extends NavigationBar {

    private static _userDetailsPage: UserDetailsPage = null;

    protected btnCreateNew = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_btnCreateNew_ShadowButton']"));
    protected btnEditSystem = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_btnEditUserSystem_ShadowButton']"));
    protected btnDoneSystem = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_btnUserSystemEdit_ShadowButton']"));
    protected btnDiscardChangesSystem = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_btnDiscardUserSystemChanges_ShadowButton']"));
    protected tabSystem = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_tab']"));
    protected txtAssignedSkill = new ElementWrapper(by.xpath("//input[@name='ctl00$ctl00$ctl00$BaseContent$Content$ManagerContent$tcUserDetails$tpnlUserSkills$UserSkills1$gsAssigned$tbSearchCriteria']"));
    protected txtAddSkill = new ElementWrapper(by.xpath("//input[@name='ctl00$ctl00$ctl00$BaseContent$Content$ManagerContent$tcUserDetails$tpnlUserSkills$UserSkills1$gsUnassigned$tbSearchCriteria']"));
    protected lblSystemTab = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_tab']"));
    protected tabLoginHistory = new ElementWrapper(by.xpath("//span[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlLoginHistory_tab']"));
    protected txtChatSeconds = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtChatRefusalTimeout']"));
    protected txtPhoneSeconds = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtPhoneCallRefusalTimeout']"));
    protected txtWorkItemSeconds = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtWorkItemRefusalTimeout']"));
    protected btnRemoveSkills = new ElementWrapper(by.xpath("//button[contains(@id,'btnRemoveSkills')]"));
    protected btnAddSkills = new ElementWrapper(by.xpath("//button[contains(@id,'btnAddSkills')]"));
    protected btnSaveProficiences = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlUserSkills_UserSkills1_btnSave_ShadowButton']"));
    protected txtLoginHistorySearch = new ElementWrapper(by.xpath("//input[contains(@name,'UserLoginHistory$tbSearchCriteria')]"));

    // Dynamic controls
    protected menuUserDetails(menuName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//span[contains(@id,'BaseContent_Content_ManagerContent_tcUserDetails') and contains(@id,'${menuName}_tab')]`)));
    }

    protected cellAssignedSkill(skillIDOrName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlUserSkills_UserSkills1_GridView1']//td[text()='${skillIDOrName}']`)));
    }

    protected chkAssignedSkils(skillIDOrName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlUserSkills_UserSkills1_GridView1']//td[text()='${skillIDOrName}']/..//span[@class = 'checkbox']/input`)));
    }

    protected chkAddSkills(skillIDOrName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlUserSkills_UserSkills1_GridView2']//td[text()='${skillIDOrName}']/..//span[@class = 'checkbox']/input`)));
    }

    protected cellLoginHistory(stationName: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlLoginHistory_ctrlUserLoginHistory_gvUserLoginHistory']//td[text()='${stationName}']`)));
    }

    protected cellPartialLoginHIstory(partialValue: string): ElementWrapper {
        return new ElementWrapper((by.xpath(`//table[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnlLoginHistory_ctrlUserLoginHistory_gvUserLoginHistory']//td[contains(text(),'${partialValue}')]`)));
    }

    public static getInstance(): UserDetailsPage {
        this._userDetailsPage = new UserDetailsPage();
        return this._userDetailsPage;
    }

	/**
     * Check User Details page is displayed or not 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isPageDisplayed(): Promise<boolean> {
        try {
            return await this.btnCreateNew.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Select User Details Menu
	 * @returns {Promise<UserDetailsPage>} return a page object UserDetailsPage
	 * @memberof UserDetailsPage
	 */
    public async selectUserDetailsMenu(menuName: string): Promise<UserDetailsPage> {
        try {
            await this.menuUserDetails(menuName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectUserDetailsMenu, err.message);
        }
    }

    /**
     * Search Assigned Skill
	 * @returns {Promise<UserDetailsPage>} return a page object UserDetailsPage
	 * @memberof UserDetailsPage
	 */
    public async searchAssignedSkill(skillID: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching assigned skill '${skillID}'`);
            await this.txtAssignedSkill.type(skillID);
            await this.txtAssignedSkill.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchAssignedSkill, err.message);
        }
    }

    /**
     * Search Add Skill
	 * @returns {Promise<UserDetailsPage>} return a page object UserDetailsPage
	 * @memberof UserDetailsPage
	 */
    public async searchAddSkill(skillID: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching add skill '${skillID}'`);
            await this.txtAddSkill.type(skillID);
            await this.txtAddSkill.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchAddSkill, err.message);
        }
    }

    /**
     * Is Skill Assigned
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isSkillAssigned(skillIDOrName: string): Promise<boolean> {
        try {
            return this.cellAssignedSkill(skillIDOrName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillAssigned, err.message);
        }
    }

    /**
     * Search user information on UserDetailsPage
     * @author Chuong.Nguyen
     * @returns {Promise<UserDetailsSystemPage>}
     * @memberof UserDetailsPage
     */
    public async selectUserDetailsSystemTab(): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting System tab on User Details Page`);
            await this.lblSystemTab.click();
            let userDetailsSystemPage = require(`${ProjectPath.pageObjects}/inContact/central/admin/users/user-details/user-details-system-page`).default;
            return userDetailsSystemPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectUserDetailsSystemTab, err.message);
        }
    }

    /**
     * Select Login History tab on User Details page
     * @author W.Plaza
     * @returns {Promise<UserDetailsPage>}
     * @memberof UserDetailsPage
     */
    public async selectLoginHistoryTab(): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Login History tab on User Details Page`);
            await this.tabLoginHistory.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectLoginHistoryTab, err.message);
        }
    }

    /**
     * Assign a skill
	 * @returns {Promise<UserDetailsPage>}
	 * @memberof UserDetailsPage
	 */
    public async assignASkillToSelectedUser(skillIDOrName: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Assigning a skill`);
            await this.searchAddSkill(skillIDOrName);
            await this.chkAddSkills(skillIDOrName).setCheckBox(true);
            await this.btnAddSkills.click()
            await this.waitForSpinnerComponentDisappear();
            await this.btnSaveProficiences.click()
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignASkillToSelectedUser, err.message);
        }
    }
    /**
     * Remove a skill
	 * @returns {Promise<UserDetailsPage>}
	 * @memberof UserDetailsPage
	 */
    public async removeASkillFromSelectedUser(skillIDOrName: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Removing a skill`);
            await this.searchAssignedSkill(skillIDOrName);
            await this.chkAssignedSkils(skillIDOrName).setCheckBox(true);
            await this.btnRemoveSkills.click()
            await this.waitForSpinnerComponentDisappear();
            await this.btnSaveProficiences.click()
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeASkillFromSelectedUser, err.message);
        }
    }

    /**
     * Is value loggged on User Details Login History 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isLoginHistoryValueLogged(logValue: string): Promise<boolean> {
        try {
            return this.cellLoginHistory(logValue).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLoginHistoryValueLogged, err.message);
        }
    }

    /**
     * Search for a value on the User Details Login History
     * @author W.Plaza
	 * @returns {Promise<UserDetailsPage>}
	 * @memberof UserDetailsPage
	 */
    public async searchLoginHistory(value: string): Promise<UserDetailsPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching on Login History for: '${value}'`);
            await this.txtLoginHistorySearch.type(value);
            await this.txtLoginHistorySearch.pressButton(Key.ENTER);
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchLoginHistory, err.message);
        }
    }

    /**
     * Is a log for today's on UserDeatailsPage Login History 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof UserDetailsPage
	 */
    public async isTodayLoginHistoryValueLogged(logValue: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, `Searching on Login History for: '${logValue}'`);
            return this.cellPartialLoginHIstory(logValue).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTodayLoginHistoryValueLogged, err.message);
        }
    }
}