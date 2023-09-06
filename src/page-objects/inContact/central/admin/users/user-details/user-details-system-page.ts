import TestRunInfo from '@data-objects/general/test-run-info';
import UserDetailsPage from '@page-objects/inContact/central/admin/users/user-details-page';
import { FunctionType, Logger } from '@utilities/general/logger';
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from '@utilities/protractor-wrappers/select-element-wrapper';
import { by } from "protractor";
import BrowserWrapper from '@utilities/protractor-wrappers/browser-wrapper';

export default class UserDetailsSystemPage extends UserDetailsPage {

    private static _userDetailsSystemPage: UserDetailsSystemPage = null;

    protected btnEdit = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_btnEditUserSystem_ShadowButton']"));
    protected btnDone = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_btnUserSystemEdit_ShadowButton']"));
    protected ddlConcurrentChats = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchChatDefaultCustom']"));
    protected txtNumberConcurrentChats = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_tbxSchChat']"));

    protected ddlChats = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlMchChatCustomDefault']"));
    protected txtNumberChats = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_tbxMchChat']"));
    protected lblDefaultChat = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlMchChatCustomDefault']/option[@value='Default']"));
    protected lblCustomChat = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlMchChatCustomDefault']/option[@value='Custom']"));
    protected txtChatSeconds = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtChatRefusalTimeout']"));
    protected lblConcurrentDefaultChat = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchChatDefaultCustom']/option[@value='Default']"));
    protected lblConcurrentCustomChat = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchChatDefaultCustom']/option[@value='Custom']"));

    protected ddlSchEmail = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchEmailDefaultCustom']"));
    protected cboAutoParkedEmailCustom = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchEmailDefaultCustom']/option[@value='Custom']"));
    protected cboAutoParkedEmailDefault = new ElementWrapper(by.xpath("//select[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_ddlSchEmailDefaultCustom']/option[@value='Default']"));
    protected txtAutoParkedEmail = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_tbxSchEmail']"));
    protected txtEmailRefusalTimeout = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtEmailRefusalTimeout']"));
    protected txtVoiceMailRefusalTimeout = new ElementWrapper(by.xpath("//input[@id = 'ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcUserDetails_tpnSystem_ctrlUserSystemEdit_txtVoiceMailRefusalTimeout']"));

    public static getInstance(): UserDetailsSystemPage {
        this._userDetailsSystemPage = new UserDetailsSystemPage();
        return this._userDetailsSystemPage;
    }

    /**
     * Select Edit button on User Details System tab
     * @author Chuong.Nguyen
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
	 * @memberof UserDetailsSystemPage
	 */
    public async selectEditUserDetailsSystem(): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting 'Edit' button on 'User Details System' page`);
            await BrowserWrapper.executeScript(`window.scrollTo(document.documentElement.clientWidth,0);`);
            await this.btnEdit.waitForControlStable();
            await this.btnEdit.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEditUserDetailsSystem, err.message);
        }
    }

    /**
     * Edit Concurrent chats
     * @author Chuong.Nguyen
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param userID User information to search
     * @param number number of concurrent chats 
	 * @memberof UserDetailsSystemPage
	 */
    public async editConcurrentChats(type: string, number?: number): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Editing 'Concurrent Chats' with type '${type}'`);
            if (type.toLowerCase() == "custom") {
                await this.ddlConcurrentChats.click();
                await this.lblConcurrentCustomChat.click();
                await this.waitForSpinnerComponentDisappear();
                await this.txtNumberConcurrentChats.type(number);
            } else if (type.toLowerCase() == "default") {
                await this.ddlConcurrentChats.click();
                await this.lblConcurrentDefaultChat.click();
                await this.waitForSpinnerComponentDisappear();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editConcurrentChats, err.message);
        }
    }

    /**
     * Finish edit User Details System tab
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
	 * @memberof UserDetailsSystemPage
	 */
    public async finishEditUserDetailsSystem(): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Finishing edit 'User Details System' tab`);
            await this.btnDone.waitForControlStable();
            await this.btnDone.scrollToElement();
            await this.btnDone.click();
            await this.waitForSpinnerComponentDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.finishEditUserDetailsSystem, err.message);
        }
    }

    /**
     * Edit Current chats
     * @author Nhat.Nguyen
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param userID User information to search
     * @param number number of concurrent chats 
	 * @memberof UserDetailsSystemPage
	 */
    public async editCurrentChats(custom: boolean = false, number?: number): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Editing 'Current Chats'`);
            if (custom) {
                if (await this.txtNumberConcurrentChats.isDisplayed(TestRunInfo.shortTimeout)) {
                    await this.editConcurrentChats("Custom", number)
                }
                else {
                    await this.ddlChats.click();
                    await this.lblCustomChat.click();
                    await this.waitForSpinnerComponentDisappear();
                    await this.txtNumberChats.type(number);
                }
            } else {
                if (await this.txtNumberConcurrentChats.isDisplayed(TestRunInfo.shortTimeout)) {
                    await this.editConcurrentChats("Default")
                }
                else {
                    await this.ddlChats.click();
                    await this.lblDefaultChat.click();
                    await this.waitForSpinnerComponentDisappear();
                }
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editCurrentChats, err.message);
        }
    }

    /**
     * Edit Refusal Time Out
     * @author Anh.Le
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param number number of Refusal Time Out
	 * @memberof UserDetailsSystemPage
	 */
    public async editRefusalChatTimeOut(number: number): Promise<UserDetailsSystemPage> {
        try {
            if (number == 0) {
                await this.txtChatSeconds.clear();
            } else {
                await this.txtChatSeconds.type(number);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editRefusalChatTimeOut, err.message);
        }
    }

    /**
     * Get Refusal Time Out
     * @author Anh.Le
     * @returns {Promise<number>} get Refusal Chat Time Out
     * @param number number of Refusal Time Out
     * @memberof UserDetailsSystemPage
     */
    public async getRefusalChatTimeOut(): Promise<number> {
        try {
            if (await this.txtChatSeconds.getControlValue() == "") {
                return 0;
            }
            return parseInt(await this.txtChatSeconds.getControlValue());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRefusalChatTimeOut, err.message);
        }
    }

    /**
     * Edit Auto Parked Email
     * @author Anh.Ho
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param userID User information to search
     * @param number auto parked email value
	 * @memberof UserDetailsSystemPage
	 */
    public async editAutoParkedEmails(type: string, number?: number): Promise<UserDetailsSystemPage> {
        try {
            await Logger.write(FunctionType.UI, `Editing 'Auto Parked Emails' with type '${type}'`);
            if (type.toLowerCase() == "custom") {
                await this.ddlSchEmail.click();
                await this.cboAutoParkedEmailCustom.click();
                await this.waitForSpinnerComponentDisappear();
                await this.txtAutoParkedEmail.type(number);
            } else if (type.toLowerCase() == "default") {                
                await this.ddlSchEmail.click();
                await this.cboAutoParkedEmailDefault.click();
                await this.waitForSpinnerComponentDisappear();               
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editAutoParkedEmails, err.message);
        }
    }

    /**
     * Edit Email Refusal Time Out
     * @author Anh.Ho
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param number number of Refusal Time Out
	 * @memberof UserDetailsSystemPage
	 */
    public async editEmailRefusalTimeout(number: number): Promise<UserDetailsSystemPage> {
        try {            
            if (number == 0) {
                await this.txtEmailRefusalTimeout.clear();
            } else {
                await this.txtEmailRefusalTimeout.type(number);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editEmailRefusalTimeout, err.message);
        }
    }

    /**
     * Edit Voice Email Refusal Time Out
     * @author Anh.Ho
	 * @returns {Promise<UserDetailsSystemPage>} UserDetailsSystemPage
     * @param number number of Refusal Time Out
	 * @memberof UserDetailsSystemPage
	 */
    public async editVoiceEmailRefusalTimeout(number: number): Promise<UserDetailsSystemPage> {
        try {            
            if (number == 0) {
                await this.txtVoiceMailRefusalTimeout.clear();
            } else {
                await this.txtVoiceMailRefusalTimeout.type(number);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.editVoiceEmailRefusalTimeout, err.message);
        }
    }
}
