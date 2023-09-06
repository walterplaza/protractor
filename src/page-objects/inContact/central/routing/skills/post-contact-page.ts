import NavigationBar from "@page-objects/inContact/central/general/navigation-bar";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { by } from "protractor";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { FunctionType, Logger } from "@utilities/general/logger";

export default class PostContactPage extends NavigationBar {

    private static _postContactPage: PostContactPage = null;

    public static getInstance(): PostContactPage {
        this._postContactPage = new PostContactPage();
        return this._postContactPage;
    }

    protected rdoDisplayThankYouPage = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_radDisplayChatThankPage']"));
    protected rdoDefault = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_radNoneChatThankPage']"));
    protected btnInsertLink = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_btnInsertLink_ShadowButton']"));
    protected btnDone = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_btnDoneLink_ShadowButton']"));
    protected btnSave = new ElementWrapper(by.xpath("//button[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_btnSave_ShadowButton']"));
    protected txtTextToDisplayed = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_txtLinkText']"));
    protected txtUrlForTheLink = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_txtLinkURL']"));
    protected txtFromEmailAddress = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_txtChatFromAddress']"));
    protected txtChatThankYou = new ElementWrapper(by.xpath("//textarea[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_txtChatThankMessage']"));
    protected chkMakeTranscriptAvailable = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_chkCanDownload']"));
    protected txtMaxTimeLimit = new ElementWrapper(by.xpath("//td[@class='tdMaxLimitformat']/input[contains(@id,'tcSkillDetails_tpnlACW_uctSkillsACW_txtACWTimer')]"));
    protected rdoAutomaticWrapUp = new ElementWrapper(by.xpath("//input[@id='ctl00_ctl00_ctl00_BaseContent_Content_ManagerContent_tcSkillDetails_tpnlACW_uctSkillsACW_radAutoWrapUp']"));

    /**
     * Enable display thank you page
     * @param {boolean} state
     * @returns {Promise<void>}
     * @memberof PostContactPage
     */
    public async enableDisplayThankYouPage(state: boolean = true): Promise<void> {
        try {
            if (state) {
                await this.rdoDisplayThankYouPage.click();
            } else {
                await this.rdoDefault.click();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableDisplayThankYouPage, err.message);
        }
    }

    /**
     * Enable make transcript available
     * @param {boolean} state
     * @param {string} fromEmail
     * @returns {Promise<void>}
     * @memberof PostContactPage
     */
    public async enableMakeTranscriptAvailable(state: boolean = true): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Enable make transcript available`);

            let isChecked = await this.chkMakeTranscriptAvailable.isSelected();

            if (state) {
                if (isChecked == false) {
                    await this.chkMakeTranscriptAvailable.click();
                    await this.waitForSpinnerComponentDisappear();
                }

            } else {
                if (isChecked) {
                    await this.chkMakeTranscriptAvailable.click();
                    await this.waitForSpinnerComponentDisappear();
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.enableMakeTranscriptAvailable, err.message);
        }
    }

    /**
     * Add thank you message
     * @param {string} text
     * @param {string} url
     * @returns {Promise<void>}
     * @memberof PostContactPage
     */
    public async addThankYouMessage(text: string, url: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Adding thank you message`);
            await this.txtChatThankYou.clear();
            await this.btnInsertLink.click();
            await this.waitForSpinnerComponentDisappear();
            await this.txtTextToDisplayed.type(text);
            await this.txtUrlForTheLink.type(url);
            await this.btnDone.click();
            await this.waitForSpinnerComponentDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.addThankYouMessage, err.message);
        }
    }

    /**
     * Click on save button
     * @returns {Promise<void>}
     * @memberof PostContactPage
     */
    public async clickSave(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking save button`);
            await this.btnSave.click();
            await this.waitForSpinnerComponentDisappear();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.clickSave, err.message);
        }
    }

    /**
     * Setting Max time limit for acw counter time
     * @author Y.Le
     * @param {number} duration
     * @returns {Promise<this>}
     * @memberof PostContactPage
     */
    public async setMaxTimeLimit(duration: number): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Setting Max time limit for acw counter time");
            await this.txtMaxTimeLimit.type(duration);
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setMaxTimeLimit, err.message);
        }
    }

/**
     * Get Max time limit for acw counter time
     * @author Tuan.Vu
     * @param {number} duration
     * @returns {Promise<this>}
     * @memberof PostContactPage
     */
    public async getMaxTimeLimit(): Promise<number> {
        try {
            return parseInt(await this.txtMaxTimeLimit.getControlValue());
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMaxTimeLimit, err.message);
        }
    }

    /**
     * Click on save button
     * @returns {Promise<void>}
     * @memberof PostContactPage
     */
    public async clickAutomaticWrapUpRadioButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Automatic Wrap-up radio button`);
            await this.rdoAutomaticWrapUp.click();
            await this.waitForSpinnerComponentDisappear();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.clickAutomaticWrapUpRadioButton, err.message);
        }
    }
}