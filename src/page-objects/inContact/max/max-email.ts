import { Agent } from "@data-objects/general/agent";
import { Button } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import { Email, EmailButtonTitle, EmailMode, EmailParkMode, EmailTinyToolButton } from "@data-objects/inContact/max/email/email-info";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import MaxTransferPage from "@page-objects/inContact/max/max-transfer-page";
import TestHelpers from "@test-helpers/test-helpers";
import { FunctionType, Logger } from '@utilities/general/logger';
import StopWatch from "@utilities/general/stop-watch";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, ProtractorBrowser } from "protractor";
import { Browser, ISize, Key } from "selenium-webdriver";
export default class MaxEmailPage extends MaxPage {

    private static _maxEmail: MaxEmailPage = null;

    constructor() { super(); }

    protected btnSort = new ElementWrapper(by.xpath("//button[@class='sort-button']/h4[@class='button-text']"));
    protected txtSearch = new ElementWrapper(by.xpath("//input[@class='search-input']"))
    protected btnOutboundEmail = new ElementWrapper(by.xpath("//span[@title='Outbound Email']"));
    protected btnOutboundCall = new ElementWrapper(by.xpath("//span[@title='Outbound Call']"));
    protected lblEmailDetail = new ElementWrapper(by.xpath("//input[@class='from-address']"));
    protected imgCustomerIcon = new ElementWrapper(by.xpath("//div[@class='contact-info']/div[@class='contact-icon text enabled']"));
    protected imgOBCustomerIcon = new ElementWrapper(by.xpath("//div[@class='item-list-container outbound-email-list']//div[@class='contact-icon text enabled']"));
    protected lblTimeStamp = new ElementWrapper(by.xpath("//div[contains(@class,'item-list-container')]//h3[@class='time time-standard']"));
    protected lblSkillName = new ElementWrapper(by.xpath("//li[contains(@class,'clickable email-template focus')]/h3[@class='skill-name']"));
    protected imgOBExpander = new ElementWrapper(by.xpath("//div[@class='email-expander outbound-expander']"));
    protected imgWorkingExpander = new ElementWrapper(by.xpath("//div[@class='email-expander working-expander']"));
    protected imgParkedExpander = new ElementWrapper(by.xpath("//div[@class='email-expander parked-expander']"));
    protected lblOutbound = new ElementWrapper(by.xpath("//div[@class='email-expander-title outbound-title']"));
    protected lblWorking = new ElementWrapper(by.xpath("//div[@class='email-expander-title working-title']"));
    protected lblParked = new ElementWrapper(by.xpath("//div[@class='email-expander-title parked-title']"));
    protected lblTimeState = new ElementWrapper(by.xpath("//div[@class='state-time']"));
    protected lblFromSkillName = new ElementWrapper(by.xpath("//div[@class='from-skill-label']"));
    protected tblObDetailBox = new ElementWrapper(by.xpath("//div[@class='item-list-container outbound-email-list']"));
    protected lblContactStartTime = new ElementWrapper(by.xpath("//div[@class='received-time time-standard']"));
    protected btnDiscard = new ElementWrapper(by.xpath("//button[@class='discard'][not(@disabled)]"));
    protected btnSend = new ElementWrapper(by.xpath("//button[@class='send']"));
    protected btnTransfer = new ElementWrapper(by.xpath("//div[@class='email-contact-section']//button[@class='transfer']"));
    protected btnRequeue = new ElementWrapper(by.xpath("//button[@class='requeue']"));
    protected btnLaunch = new ElementWrapper(by.xpath("//button[@class='launch']"));
    protected btnEnd = new ElementWrapper(by.xpath("//div[@class='email-contact-ui emailcontactui']//button[@class='end']"));
    protected txtToAddress = new ElementWrapper(by.xpath("//input[@id='emailcontactui-0-to-address' or @class='to-address']"));
    protected lblCCAddress = new ElementWrapper(by.xpath("//label[@class='cc-address-label']"));
    protected txtCCAddress = new ElementWrapper(by.xpath("//input[@class='cc-address']"));
    protected lblBCCAddress = new ElementWrapper(by.xpath("//label[@class='bcc-address-label']"));
    protected txtBCCAddress = new ElementWrapper(by.xpath("//input[@class='bcc-address']"));
    protected txtSubject = new ElementWrapper(by.xpath("//input[contains(@class,'subject')]"));
    protected btnAttachment = new ElementWrapper(by.xpath("//div[@class='add-attachment noselect']"));
    protected lblPatronAddress = new ElementWrapper(by.xpath("//div[@class='patron-address-label ellipsis']"));
    protected lblOBPatronAddress = new ElementWrapper(by.xpath("//li[@class='clickable email-template focus']//h1[@class='from-address']"));
    protected lblSubject = new ElementWrapper(by.xpath("//li[@class='clickable email-template focus']//h3[@class='subject']"));
    protected txtAddAttachment = new ElementWrapper(by.xpath("//input[contains(@id,'add-attachment-input')]"));
    protected lblAddedAttachment = new ElementWrapper(by.xpath("//div[@class='draft-attachments-container noselect']/div[@class='email-attachment']"));
    protected imgRemoveAttachment = new ElementWrapper(by.xpath("//div[contains(@class,'draft-attachments-container noselect')]//div[contains(@class,'attachment-remove-container')]"));
    protected mnLaunch = new ElementWrapper(by.xpath("//div[@class='popover-panel indicator-ui']//div[@class='item-list-container clickthrough-container']"));
    protected lblLaunchNotice = new ElementWrapper(by.xpath("//div[@class='popover-panel-parent']//div[@class='notice']/h1"));
    protected dlgEmailDialog = new ElementWrapper(by.xpath("//div[@class='dialog-contents']"));
    protected btnErrorConfirm = new ElementWrapper(by.xpath("//div[@class='dialog-contents']//button[@class='confirm-button']"));
    protected btnCancel = new ElementWrapper(by.xpath("//div[@class='dialog-contents']//button[@class='cancel-button']"));
    protected btnContactPanelToggle = new ElementWrapper(by.xpath("//button[@class='contact-panel-toggle']"));
    protected lblDialogTitle = new ElementWrapper(by.xpath("//div[@class='dialog-contents']/h1[@class='dialog-title']"));
    protected lblDialogMessage = new ElementWrapper(by.xpath("//div[@class='dialog-contents']/div[@class='dialog-message']"));
    protected lblEmailInterrupted = new ElementWrapper(by.xpath("//div[not(contains(@class,'interrupted hidden'))]/span[text()='Email interrupted']"));
    protected txtEmailSubject = new ElementWrapper(by.xpath("//input[@ name='subject']"));
    protected pnlInboxEmailList = new ElementWrapper(by.xpath("//div[@class='item-list-container working-email-list']"));
    protected pnlQuickReplySection = new ElementWrapper(by.xpath("//div[@class='quick-replies-section']"));
    protected divEMailEditor = new ElementWrapper(by.xpath("//div[@class='email-editor']//div[@class='mce-tinymce mce-container mce-panel']"));
    protected btnForward = new ElementWrapper(by.xpath("//div[@class='email-header-section']//button[@class='forward']"));
    protected pnlDiscardedEmail = new ElementWrapper(by.xpath("//div[@class='email-contact-ui emailcontactui' and @data-status='Discarded']"));
    protected lblParkedEmail = new ElementWrapper(by.xpath("//div[@id='emailGlanceSection']//div[@class='contact-name parked-contact-title']"));
    protected pnlHiddenEmailWorkspace = new ElementWrapper(by.xpath("//div[@id='emailWorkspace'][@class='workspace hidden']"));
    protected tlbTinyTool = new ElementWrapper(by.xpath("//div[@class='mce-container mce-toolbar mce-first mce-last mce-stack-layout-item']"));
    protected cbbFontSize = new ElementWrapper(by.xpath("//div[@class='mce-widget mce-btn mce-menubtn mce-fixed-width mce-listbox mce-last']/button"));
    protected cbbFont = new ElementWrapper(by.xpath("//div[@class='mce-widget mce-btn mce-menubtn mce-fixed-width mce-listbox mce-first']/button"));
    protected cbbTextColorCaret = new ElementWrapper(by.xpath("//div[@class='mce-widget mce-btn mce-colorbutton mce-first']//i[@class='mce-caret']/parent::button"));
    protected cbbTextBackgroundColorCaret = new ElementWrapper(by.xpath("//div[@class='mce-widget mce-btn mce-colorbutton mce-last']//i[@class='mce-caret']/parent::button"));
    protected lblEmailText = new ElementWrapper(by.xpath("//body[@id='tinymce']//span[@data-mce-style or @style]"));
    protected lblEmailTextBold = new ElementWrapper(by.xpath("//body[@id='tinymce']//strong//span"));
    protected lblEmailTextItalic = new ElementWrapper(by.xpath("//body[@id='tinymce']//em//span"));
    protected lblEmailTextStrikeThrough = new ElementWrapper(by.xpath("//body[@id='tinymce']//span[contains(@style,'text-decoration: line-through')]"));
    protected btnReply = new ElementWrapper(by.xpath("//button[@class='reply']"));
    protected btnReplyAll = new ElementWrapper(by.xpath("//button[@class='reply-all']"));
    protected btnParkEmail = new ElementWrapper(by.xpath("//button[@class='park-email']"));
    protected btnUndo = new ElementWrapper(by.xpath("//i[@class = 'mce-ico mce-i-undo']"));
    protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='secondary-controls']//button[@class='init-transfer-contact' or @class='transfer']"));
    protected imgPatronIcon = new ElementWrapper(by.xpath("//div[@class='email-contact-container']//div[@class='module-container']//div[@class='contact-icon text enabled']"));
    protected tblRichText = new ElementWrapper(by.xpath("//div[contains(@class,'mce-container mce-toolbar')][contains(@class,'mce-stack-layout-item')][contains(@class,'mce-first mce-last')]"));
    protected txtBody = new ElementWrapper(by.xpath("//div[contains(@class,'mce-edit-area mce-container mce-panel')][contains(@class,'mce-stack-layout-item')][contains(@class,'mce-last')]"));

    // Element in iframe
    protected pnlEmailWorkspace = new ElementWrapper(by.xpath("//div[@id='emailWorkspace']//div[@class='email-contact-ui emailcontactui']"));
    protected pnlEmailSummary = new ElementWrapper(by.xpath("//div[@id='emailWorkspace']//div[@class='email-summary-section']"));

    // Element in iframe
    protected ifmEmailContentInEditMode = new ElementWrapper(by.xpath("//iframe[contains(@id,'mce')]"));
    protected ifmEmailContentInReadMode = new ElementWrapper(by.xpath("//iframe[@class='email-body']"));
    protected txtEmailContent = new ElementWrapper(by.xpath("//body[@id='tinymce']"));
    protected lblEmailBody = new ElementWrapper(by.xpath("//body"));

    // Dynamic controls
    protected btnUnpark(contactId: number, mode: EmailParkMode): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@data-contactid='${contactId}']//button[@class='${mode}']`));
    }
    protected btnEmail(buttonName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='email-contact-ui emailcontactui'][@data-status='Active']//div[@id='email-container']//button[@class='${buttonName}']`));
    }

    protected btnEmailBottomTinyTool(buttonName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@class,'mce-widget mce-btn')][@aria-label='${buttonName}']`));
    }

    protected lblTextColor(color: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='mceu_36']//div[@title='${color}']`));
    }

    protected lblTextBackgroundColor(color: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='mceu_37']//div[@title='${color}']`));
    }

    protected lblFontType(fontType: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='mce-container mce-panel mce-floatpanel mce-menu mce-menu-align'][not(contains(@style,'display: none;'))]//div[@class='mce-menu-item mce-menu-item-normal mce-first mce-stack-layout-item']/span[text()='${fontType}']`));
    }

    protected lblFontSize(fontSize: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='mce-menu-item mce-menu-item-normal mce-stack-layout-item']/span[text()='${fontSize}']`));
    }

    protected lblParkedItem(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='item-list-container parked-email-list']//li[@class='clickable email-template'][@data-contact-id='${contactId}']`));
    }

    protected lblWorkingItem(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='item-list-container working-email-list']//li[contains(@class,'clickable email-template')][@data-contact-id='${contactId}']`));
    }

    protected btnEndEmailByContactId(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@data-contactid='${contactId}']//button[@class='end']`));
    }
    protected liTimeStandard(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(` //ul[@class = "item-list noselect parked-emails"]/li[@class = "clickable email-template"][${index}]//h3[@class= "time time-standard"]`));
    }

    protected pnlEmailSplitWorkSpace(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='emailWorkspace']/div[contains(@id,'emailworkspaceui')][${index}]`));
    }

    protected lblParkedEmaillistItemSelected(contactId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='item-list-container parked-email-list']//li[@class='clickable email-template focus'][@data-contact-id='${contactId}']`));
    }

    public static async getInstance(): Promise<MaxEmailPage> {
        this._maxEmail = new MaxEmailPage();
        await this._maxEmail.pnlEmailWorkspace.waitUntilPropertyNotChange('width');
        await this._maxEmail.waitForLoading(TestRunInfo.middleTimeout);
        return this._maxEmail;
    }

    /**
     * Get sort button content
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getSortButtonTitle(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting sort content");
            return "Date & Time " + await this.btnSort.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSortButtonTitle, err.message);
        }
    }

    /**
     * Get Launch menu notice
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getLaunchMenuNotice(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Launch notice");
            return await this.lblLaunchNotice.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getLaunchMenuNotice, err.message);
        }
    }

    /**
     * Enter to address
     * @param {string} address
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async enterToAddress(address: string): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Entering To Address");
            await this.txtToAddress.type(address);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterToAddress, err.message);
        }
    }

    /**
     * Move mouse over attached file
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async moveMouseOverAttachedFile(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Moving mouse over attached file");
            await this.lblAddedAttachment.moveMouse();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.moveMouseOverAttachedFile, err.message);
        }
    }

    /**
     * Click Launch button
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmail
     */
    public async clickLaunch(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Launch button");
            await this.btnLaunch.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickLaunch, err.message);
        }
    }

    /**
     * Click Send button
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async clickSend(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Send button");
            await this.btnSend.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickSend, err.message);
        }
    }

    /**
     * Click Discard button
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async clickDiscard(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Discard button");
            await this.btnDiscard.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickDiscard, err.message);
        }
    }

    /**
     * Click End Email button
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async endEmail(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking End button");
            await this.btnEnd.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.endEmail, err.message);
        }
    }

    /**
     * Click Got it button to confirm Error message
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async confirmError(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking 'Got It' button in Error dialog");
            await this.btnErrorConfirm.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.confirmError, err.message);
        }
    }

    /**
     * Click discard error button
     * @returns {Promise<MaxPage>}
     * @memberof MaxEmailPage
     */
    public async clickDiscardError(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Discard error button");
            await this.btnErrorConfirm.click();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickDiscardError, err.message);
        }
    }

    /**
     * Discard email draft
     * @author ChinhNguyen
     * @param {boolean} true to discard
     * @param {boolean} false to cancel discard
     * @returns {Promise<MaxPage>}
     * @memberof MaxEmailPage
     */
    public async discardEmailDraft(option: boolean = true): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Discarding email draft");
            await this.clickDiscard();
            if (option) {
                await this.btnErrorConfirm.click();
            } else {
                await this.btnCancel.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.discardEmailDraft, err.message);
        }
    }

    /**
     * Click proceed error button
     * @returns {Promise<MaxPage>}
     * @memberof MaxEmailPage
     */
    public async proceedEndEmail(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Proceed error button");
            await this.btnErrorConfirm.click();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.proceedEndEmail, err.message);
        }
    }

    /**
     * Click cancel error button
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async clickCancelError(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Cancel error button");
            await this.btnCancel.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCancelError, err.message);
        }
    }

    /**
     * Enter email subject
     * @param {string} subject
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async enterEmailSubject(subject: string): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Entering Email subject");
            await this.txtSubject.type(subject);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterEmailSubject, err.message);
        }
    }

    /**
     * Add email attachment
     * @param {string} subject
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async addEmailAttachment(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Adding Email attachment");
            let attachmentFile = Utility.getPath("src/test-data/inContact/Attachment.txt");
            await BrowserWrapper.executeScript("document.getElementById('emailcontactui-0-add-attachment-input').setAttribute('class','add-attachment-input')");
            await this.txtAddAttachment.uploadFile(attachmentFile);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addEmailAttachment, err.message);
        }
    }

    /**
     * Check Error dialog is displayed or not
     * @returns {Promise<boolean>} the existence of Error dialog
     * @memberof MaxEmailPage
     */
    public async isErrorDialogDisplayed(): Promise<boolean> {
        try {
            return await this.dlgEmailDialog.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isErrorDialogDisplayed, err.message);
        }
    }

    /**
     * Check Launch menu is displayed or not
     * @returns {Promise<boolean>} the existence of Launch menu
     * @memberof MaxEmailPage
     */
    public async isLaunchMenuDisplayed(): Promise<boolean> {
        try {
            return await this.mnLaunch.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchMenuDisplayed, err.message);
        }
    }

    /**
     * Check Email Attachment is added to draft
     * @returns {Promise<boolean>} the existence of Email attachment file
     * @memberof MaxEmailPage
     */
    public async isEmailAttachmentDisplayed(): Promise<boolean> {
        try {
            return await this.lblAddedAttachment.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailAttachmentDisplayed, err.message);
        }
    }

    /**
     * Check Remove Email Attachment icon displays 
     * @returns {Promise<boolean>} the existence of Remove Email Attachment icon
     * @memberof MaxEmailPage
     */
    public async isRemoveEmailAttachmentIconDisplayed(): Promise<boolean> {
        try {
            return await this.imgRemoveAttachment.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRemoveEmailAttachmentIconDisplayed, err.message);
        }
    }

    /**
     * Check Email search textbox is displayed or not
     * @returns {Promise<boolean>} the existence of Email search textbox
     * @memberof MaxEmailPage
     */
    public async isEmailSearchDisplayed(): Promise<boolean> {
        try {

            return await this.txtSearch.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailSearchDisplayed, err.message);
        }
    }

    /**
     * Check OB Email detail box displays
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isOBEmailDetailBoxDisplayed(): Promise<boolean> {
        try {
            return await this.tblObDetailBox.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isOBEmailDetailBoxDisplayed, err.message);
        }
    }

    /**
     * Check Discard error button is displayed 
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isDiscardErrorButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnErrorConfirm.isDisplayed();

        } catch (err) {
            throw new errorwrapper.CustomError(this.isDiscardErrorButtonDisplayed, err.message);
        }
    }

    /**
     * Check cancel button is displayed 
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isCancelButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnCancel.isDisplayed();

        } catch (err) {
            throw new errorwrapper.CustomError(this.isCancelButtonDisplayed, err.message);
        }
    }

    /**
      * Get Email Skill name
      * @returns {Promise<string>}
      * @memberof MaxEmailPage
      */
    public async getEmailSkillName(): Promise<string> {
        try {
            return await this.lblSkillName.getControlTitle();

        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailSkillName, err.message);
        }
    }

    /**
     * Get error message title
     * @author Tuan.Vu
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getErrorMessageTitle(): Promise<string> {
        try {
            return await this.lblDialogTitle.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessageTitle, err.message);
        }
    }

    /**
     * Get Error message content
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getErrorMessageContent(): Promise<string> {
        try {
            return await this.lblDialogMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessageContent, err.message);
        }
    }

    /**
     * Get confirm error button title
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getConfirmErrorTitle(): Promise<string> {
        try {
            return await this.btnErrorConfirm.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getConfirmErrorTitle, err.message);
        }
    }

    /**
      * Get Attached file tooltip
      * @returns {Promise<string>}
      * @memberof MaxEmailPage
      */
    public async getAttachedFileTooltip(): Promise<string> {
        try {
            return await this.lblAddedAttachment.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAttachedFileTooltip, err.message);
        }
    }

    /**
      * Get Email subject on contact box
      * @returns {Promise<string>}
      * @memberof MaxEmailPage
      */
    public async getContactBoxEmailSubject(): Promise<string> {
        try {
            return await this.lblSubject.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactBoxEmailSubject, err.message);
        }
    }

    /**
     * Check customer icon is displayed or not
     * @returns {Promise<boolean>} the existence of customer icon
     * @memberof MaxEmailPage
     */
    public async isCustomerIconDisplayed(): Promise<boolean> {
        try {
            return await this.imgOBCustomerIcon.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerIconDisplayed, err.message);
        }
    }

    /**
     * Check time stamp is displayed or not
     * @returns {Promise<boolean>} the existence of time stamp
     * @memberof MaxEmailPage
     */
    public async isTimeStampDisplayed(): Promise<boolean> {
        try {
            return await this.lblTimeStamp.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTimeStampDisplayed, err.message);
        }
    }

    /**
     * Check Send button is disabled or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isSendButtonDisabled(): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript("return document.getElementsByClassName('send')[0].disabled");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSendButtonDisabled, err.message);
        }
    }

    /**
     * Check Send button is disabled or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isDiscardButtonDisabled(): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript("return document.getElementsByClassName('discard')[0].disabled");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDiscardButtonDisabled, err.message);
        }
    }

    /**
     * Check End button is disabled or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEndButtonDisabled(): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript("return document.getElementsByClassName('end')[0].disabled");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisabled, err.message);
        }
    }

    /**
     * Check Launch button is disabled or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isLaunchButtonDisabled(number: number = 0): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript(`return document.getElementsByClassName('launch')[${number}].disabled`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisabled, err.message);
        }
    }

    /**
     * Check Requeue button is disabled or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRequeueButtonDisabled(): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript("return document.getElementsByClassName('requeue')[0].disabled");
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRequeueButtonDisabled, err.message);
        }
    }

    /**
     * Check Transfer button is disabled or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isTransferButtonDisabled(number: number = 0): Promise<boolean> {
        try {
            return <boolean>await BrowserWrapper.executeScript(`return document.getElementsByClassName('transfer')[${number}].disabled`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferButtonDisabled, err.message);
        }
    }

    /**
     * Get Patron address on form header
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getFormHeaderPatronAddress(): Promise<string> {
        try {
            return await this.lblPatronAddress.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFormHeaderPatronAddress, err.message);
        }
    }

    /**
     * Get Patron address on contact box
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getContactBoxPatronAddress(): Promise<string> {
        try {
            return await this.lblOBPatronAddress.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactBoxPatronAddress, err.message);
        }
    }


    /**
      * Check working box is displayed or not
      * @returns {Promise<boolean>}
      * @memberof MaxEmailPage
      */
    public async isWorkingBoxDisplayed(): Promise<boolean> {
        try {
            return await this.lblWorking.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWorkingBoxDisplayed, err.message);
        }
    }

    /**
     * Check OB box is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isOBBoxDisplayed(): Promise<boolean> {
        try {
            return await this.lblOutbound.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isOBBoxDisplayed, err.message);
        }
    }

    /**
     * Check Parked box is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isParkedBoxDisplayed(): Promise<boolean> {
        try {
            return await this.lblParked.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isParkedBoxDisplayed, err.message);
        }
    }

    /**
     * Check Parker expander is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isParkedExpanderDisplayed(): Promise<boolean> {
        try {
            return await this.imgParkedExpander.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isParkedExpanderDisplayed, err.message);
        }
    }

    /**
     * Check Working expander is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isWorkingExpanderDisplayed(): Promise<boolean> {
        try {
            return await this.imgWorkingExpander.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWorkingExpanderDisplayed, err.message);
        }
    }

    /**
     * Check OB expander is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isOBExpanderDisplayed(): Promise<boolean> {
        try {
            return await this.imgOBExpander.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isOBExpanderDisplayed, err.message);
        }
    }

    /**
     * Check Email body is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailBodyDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtBody.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailBodyDisplayed, err.message);
        }
    }

    /**
     * Check Rich text tool bar is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRichTextBarDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.tblRichText.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRichTextBarDisplayed, err.message);
        }
    }

    /**
     * Check Attachment button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isAttachmentButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnAttachment.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAttachmentButtonDisplayed, err.message);
        }
    }

    /**
     * Check subject is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isSubjectDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtSubject.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSubjectDisplayed, err.message);
        }
    }

    /**
     * Check BCC Address is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isBCCAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblBCCAddress.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBCCAddressDisplayed, err.message);
        }
    }

    /**
     * Check CC Address is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isCCAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCCAddress.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCCAddressDisplayed, err.message);
        }
    }

    /**
     * Check To address is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isToAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtToAddress.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToAddressDisplayed, err.message);
        }
    }

    /**
     * Check End button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEndButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnEnd.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
        }
    }

    /**
     * Check Requeue button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRequeueButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnRequeue.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRequeueButtonDisplayed, err.message);
        }
    }

    /**
     * Check Transfer button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isTransferButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnTransfer.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferButtonDisplayed, err.message);
        }
    }

    /**
     * Check Launch button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isLaunchButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnLaunch.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
        }
    }

    /**
     * Check Send button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isSendButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnSend.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSendButtonDisplayed, err.message);
        }
    }

    /**
     * Check discard button is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isDiscardButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnDiscard.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDiscardButtonDisplayed, err.message);
        }
    }

    /**
     * Check Right Frame Contact Start Time is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRightFrameContactStartTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblContactStartTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRightFrameContactStartTimeDisplayed, err.message);
        }
    }

    /**
     * Check Right Frame From address is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRightFrameFromAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblEmailDetail.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRightFrameFromAddressDisplayed, err.message);
        }
    }

    /**
     * Check Right Frame Skill Name is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRightFrameSkillNameDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblFromSkillName.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRightFrameSkillNameDisplayed, err.message);
        }
    }

    /**
     * Check Right Frame time counter is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRightFrameTimeCounterDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblTimeState.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRightFrameTimeCounterDisplayed, err.message);
        }
    }

    /**
     * Check Right frame customer icon is displayed or not
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isRightFrameCustomerIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.imgCustomerIcon.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRightFrameCustomerIconDisplayed, err.message);
        }
    }

    /**	Anh Le
	 * End Email contact
     * @param {boolean} resume Want to resume or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxEmailPage
	 */
    public async endEmailContact(resume?: boolean): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Email contact");
            await this.btnEnd.waitForVisibilityOf();
            await this.btnEnd.click();
            if (resume) {
                await this.btnCancel.click();
            } else {
                await this.btnErrorConfirm.click();
                await this.btnErrorConfirm.waitUntilDisappear();
                await this.emailWorkingSpace.waitUntilDisappear();
                await this.divMaxWrapper.waitForControlStable();
                return await MaxPage.getMaxInstance(false);
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.endEmailContact, err.message);
        }
    }

    /**	
	 * End Email contact with disposition
     * @author Tuan.Vu
     * @returns {Promise<void>}
	 * @memberof MaxEmailPage
	 */
    public async endEmailWithDisposition(): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Email contact with disposition");
            await this.emailWorkingSpace.waitUntilPropertyNotChange("width");
            await this.btnEnd.waitUntilPropertyNotChange("width");
            await this.btnEnd.click();
            await this.btnErrorConfirm.click();
            await this.btnErrorConfirm.waitUntilDisappear();
            return MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endEmailWithDisposition, err.message);
        }
    }

    /**	
	 * End Email contact in parked mode
     * @author Chinh.Nguyen
     * @returns {Promise<void>}
	 * @memberof MaxEmailPage
	 */
    public async endEmailInParkedMode(resume: boolean): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Email contact in Parked mode");
            await this.btnEnd.click();
            if (resume) {
                await this.btnCancel.click();
            } else {
                await this.btnErrorConfirm.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.endEmailInParkedMode, err.message);
        }
    }

    /**	
     * Select Email button
     * @author ChinhNguyen
     * @param {EmailButtonTitle} buttonName
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async selectEmailButton(buttonName: EmailButtonTitle): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting Email button ${buttonName}`);
            if (buttonName == EmailButtonTitle.SEND) {
                await BrowserWrapper.executeScript(`document.querySelector('.${EmailButtonTitle.SEND}').click();`)
            } else {
                await this.btnEmail(buttonName).waitUntilPropertyNotChange('width');
                await this.btnEmail(buttonName).waitForVisibilityOf();
                await this.btnEmail(buttonName).wait();
                await this.btnEmail(buttonName).click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEmailButton, err.message);
        }
    }

    /**
     * Check To address is populated
     * @author ChinhNguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isToAddressContentPopulated(): Promise<boolean> {
        try {
            if (await this.txtToAddress.getControlValue() != '') {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToAddressContentPopulated, err.message);
        }
    }

    /**
     * Check CC address is populated
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isCCAddressContentPopulated(): Promise<boolean> {
        try {
            if (await this.txtCCAddress.getControlValue() != '') {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCCAddressContentPopulated, err.message);
        }
    }

    /**
     * Check Email Interrupt header is displayed
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailInterruptedHeaderDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblEmailInterrupted.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailInterruptedHeaderDisplayed, err.message);
        }
    }

    /**
     * Get Email mode (read or edit)
     * @author Chinh.Nguyen
     * @returns {Promise<EmailMode>}
     * @memberof MaxEmailPage
     */
    public async getEmailMode(): Promise<EmailMode> {
        try {
            await Logger.write(FunctionType.UI, "Getting email mode");
            let disabled: boolean = <boolean>await BrowserWrapper.executeScript("return document.getElementsByClassName('subject-container')[0].children[0].disabled");
            if (disabled) {
                return EmailMode.READ;
            }
            return EmailMode.EDIT;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailMode, err.message);
        }
    }

    /**
     * Getting size of Email Inbox
     * @author Y.Le
     * @returns {Promise<ISize>}
     * @memberof MaxEmailPage
     */
    public async getSizeEmailInbox(): Promise<ISize> {
        try {
            Logger.write(FunctionType.UI, "Getting size of Email Inbox");
            return await this.pnlInboxEmailList.getSize();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSizeEmailInbox, err.message);
        }
    }

    /** @author Anh Le
	 * Email Working space is displayed or not
	 * @returns {Promise<boolean>} Return value of isChatWorkingSpaceDisplayed
	 * @memberof MaxEmailPage
	 */
    public async isEmailWorkingSpaceDisplayed(): Promise<boolean> {
        try {
            return this.emailWorkingSpace.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailWorkingSpaceDisplayed, err.message);
        }
    }
    /**
     * Verifying width of email inbox is range 260 to 265
     * @author Y.Le
     * @param {number} widthSize
     * @returns {boolean}
     * @memberof MaxEmailPage
     */
    public isWidthSizeEmailInboxCorrect(widthSize: number): boolean {
        try {
            return widthSize >= 260 && widthSize <= 265
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWidthSizeEmailInboxCorrect, err.message);
        }
    }

    /**
     * Enter email body
     * @author Chinh.Nguyen
     * @param {string} address
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async enterEmailBody(content: string, cleanup?: boolean): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Entering Email Body");
            await this.ifmEmailContentInEditMode.waitForPresenceOf();
            await this.ifmEmailContentInEditMode.switchToFrame();
            if (cleanup) {
                await this.txtEmailContent.clear();
            }

            await this.txtEmailContent.click();
            if (TestRunInfo.browser != Browser.IE) {
                await this.txtEmailContent.sendKeys(content);
            } else {
                await this.txtEmailContent.type(content);
            }

            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterEmailBody, err.message);

        }
    }

    /**
     * Click on Forward button
     * @author Tan.Ta
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async clickForward(): Promise<MaxEmailPage> {
        try {
            Logger.write(FunctionType.UI, "Clicking Forward");
            await this.btnForward.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickForward, err.message);
        }
    }

    /**
     * Open quick replies panel
     * @author Tan.Ta
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailEditorDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.divEMailEditor.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailEditorDisplayed, err.message);
        }
    }

    /**
     * Clean up email content
     * @author Tan.Ta
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async cleanUpEmailContent(): Promise<MaxEmailPage> {
        try {
            await this.ifmEmailContentInEditMode.switchToFrame();
            await this.txtEmailContent.clear();
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpEmailContent, err.message);
        }
    }

    /**
     * Get email content
     * @author Tan.Ta
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEmailContentInEditMode(): Promise<string> {
        try {
            await this.ifmEmailContentInEditMode.switchToFrame();
            let content: string = await this.txtEmailContent.getText();
            await BrowserWrapper.switchToDefaultContent();
            return content;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailContentInEditMode, err.message);
        }
    }

    /**
     * Get email body content
     * @author Phat.Ngo
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEmailContentInReadMode(): Promise<string> {
        try {
            if (TestRunInfo.browser == Browser.IE) {
                return (<string>await BrowserWrapper.executeScript("return document.getElementsByClassName('email-body')[0].contentDocument.getElementsByTagName('body')[0].innerText;")).trim();
            }
            await this.ifmEmailContentInReadMode.switchToFrame();
            let content: string = await this.lblEmailBody.getText();
            await BrowserWrapper.switchToDefaultContent();
            return content;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailContentInReadMode, err.message);
        }
    }

    /**
     * Checking email is discarded
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailDiscarded(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlDiscardedEmail.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailDiscarded, err.message);
        }
    }
    /**	
     * Check if Call is in queue or not in amount of time
     * @author Chinh.Nguyen
     * @param {number} timeoutInSecond
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isCallInQueueInTime(timeoutInSecond: number): Promise<boolean> {
        try {
            let stateTimeInSecond: number = Utility.convertStringMinutesToSeconds(await this.lblTimeState.getText());
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            stopWatch.startClock();

            while (stateTimeInSecond < timeoutInSecond && stopTime < timeoutInSecond) {

                if (!parseInt((await this.lblInboundPhoneQueue.getText()).replace(/"/g, ""))) {
                    return false;
                }
                stateTimeInSecond = Utility.convertStringMinutesToSeconds(await this.lblTimeState.getText());
                stopTime = stopWatch.getElapsedTimeInSecond();
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallInQueueInTime, err.message);
        }
    }

    /**	
     * Check if Email workspace is hidden or not
     * @author Chinh.Nguyen
     * @param {number} timeoutInSecond
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailWorkSpaceHidden(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlHiddenEmailWorkspace.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailWorkSpaceHidden, err.message);
        }
    }

    /**
     * Send outbox email
     * @author Tung.Vo
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async sendOutboundEmailACW(email: Email): Promise<MaxEmailPage> {
        try {
            await this.enterToAddress(email.toAddress);
            await this.enterEmailSubject(email.emailSubject);
            await this.enterEmailBody(email.emailBody);
            await this.clickSend();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendOutboundEmailACW, err.message);
        }
    }
    /**
     * Get email subject
     * @author Tuan.Vu
     * @return {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEmailSubject(): Promise<string> {
        try {
            let result: {} = "";
            let length: {} = await BrowserWrapper.executeScript("return document.getElementsByClassName('subject').length;");
            for (let i: number = 0; i < length; i++) {
                result = await BrowserWrapper.executeScript(`return document.getElementsByClassName('subject')[${i}].value`);
                if (result != null) {
                    break;
                }
            }
            return result.toString();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailSubject, err.message);
        }
    }

    /**
     * Get email to address value
     * @author Tuan.Vu
     * @return {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getToAddressValue(): Promise<string> {
        try {
            return await this.txtToAddress.getControlValue();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getToAddressValue, err.message);
        }
    }

    /**	
     * Select email tiny tool button 
     * @author Chinh.Nguyen
     * @param {string} buttonName
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async selectEmailTinyToolButton(buttonName: string): Promise<MaxEmailPage> {
        try {
            await this.btnEmailBottomTinyTool(buttonName).moveMouse();
            await this.btnEmailBottomTinyTool(buttonName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectEmailTinyToolButton, err.message);
        }
    }

    /**
     * Check if Email tiny toolbar is displayed or not
     * @author Chinh.Nguyen
     * @param { number } timeoutInSecond
     * @returns { Promise<boolean>}
     * @memberof MaxEmailPage
    */
    public async isEmailTinyToolbarDisplays(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.tlbTinyTool.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailTinyToolbarDisplays, err.message);
        }
    }

    /**
     * Change Email text font type
     * @author Chinh.Nguyen
     * @param {string} fontName
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async changeTextFont(fontName: string): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Changing Email text font ${fontName}`);
            await this.cbbFont.click();
            await this.lblFontType(fontName).moveMouse();
            await this.lblFontType(fontName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.changeTextFont, err.message);
        }
    }

    /**
     * Change Email text font size
     * @author Chinh.Nguyen
     * @param {string} fontSize
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async changeTextFontSize(fontSize: string): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Changing Email text font size to ${fontSize}`);
            await this.cbbFontSize.click();
            await this.lblFontSize(fontSize).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.changeTextFontSize, err.message);
        }
    }

    /**
     * Change Email text color
     * @author Chinh.Nguyen
     * @param {string} color
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async changeTextColor(color: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Changing Email text color to ${color}`);
            await this.cbbTextColorCaret.click();
            await this.lblTextColor(color).click();
            if (TestRunInfo.browser == Browser.IE) {
                let colorString: string = await this.lblTextColor(color).getAttribute("style");
                return colorString.match(/(?<=color\:\s)[\S\s]+/gm)[0];
            } else return this.lblTextColor(color).getAttribute("data-mce-color");
        } catch (err) {
            throw new errorwrapper.CustomError(this.changeTextColor, err.message);
        }
    }

    /**
     * Change Email text background color
     * @author Chinh.Nguyen
     * @param {string} color
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async changeTextBackgroundColor(color: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Changing Email text background color to ${color}`);
            await this.cbbTextBackgroundColorCaret.click();
            await this.lblTextBackgroundColor(color).click();
            if (TestRunInfo.browser == Browser.IE) {
                let colorString: string = await this.lblTextColor(color).getAttribute("style");
                return colorString.match(/(?<=background-color\:\s)[\S\s]+/gm)[0];
            } else return this.lblTextBackgroundColor(color).getAttribute("data-mce-color");
        } catch (err) {
            throw new errorwrapper.CustomError(this.changeTextBackgroundColor, err.message);
        }
    }

    /**
     * Get Email Text style
     * @author Chinh.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEmailTextStyle(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting email text style");
            await this.ifmEmailContentInEditMode.waitForVisibilityOf();
            await this.ifmEmailContentInEditMode.switchToFrame();
            let cssValue: string;
            if (TestRunInfo.browser == Browser.IE) {
                cssValue = await this.lblEmailText.getAttribute("style");
            } else {
                cssValue = await this.lblEmailText.getAttribute("data-mce-style");
            }
            await BrowserWrapper.switchToDefaultContent();
            return cssValue;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailTextStyle, err.message);
        }
    }

    /**
     * Check if the email body text is in format or not
     * @author Chinh.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailBodyTextInFormat(format: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            let bool: boolean = false;
            await this.ifmEmailContentInEditMode.switchToFrame();
            if (format == EmailTinyToolButton.BOLD) {
                bool = await this.lblEmailTextBold.isDisplayed(timeoutInSecond);
            } else if (format == EmailTinyToolButton.ITALIC) {
                bool = await this.lblEmailTextItalic.isDisplayed(timeoutInSecond);
            } else if (format == EmailTinyToolButton.STRIKETHROUGH) {
                bool = await this.lblEmailTextStrikeThrough.isDisplayed(timeoutInSecond);
            }
            await BrowserWrapper.switchToDefaultContent();
            return bool;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailBodyTextInFormat, err.message);
        }
    }

    /**
     * Highlight Email Body Text
     * @author Chinh.Nguyen
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async highLightEmailBodyText(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Highlighting email text");

            if (TestRunInfo.browser == Browser.FIREFOX || TestRunInfo.browser == Browser.INTERNET_EXPLORER) {
                await this.ifmEmailContentInEditMode.switchToFrame();
                await this.txtEmailContent.click();
                await BrowserWrapper.switchToDefaultContent();
                await BrowserWrapper.pressKey(Button.CTRL_A);
            } else {
                await BrowserWrapper.switchToFrame(0);
                await this.txtEmailContent.click();
                await this.txtEmailContent.waitForControlStable(TestRunInfo.shortTimeout);
                await this.pressControlKey("a", TestRunInfo.shortTimeout);
                await BrowserWrapper.switchToDefaultContent();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.highLightEmailBodyText, err.message);
        }
    }

    /**
     *Forward inbound email
     * @author Tuan.Vu
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async forwardIBEmail(toAddress: string = "Email" + Utility.createRandomString(7) + "@email.com"): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Forwarding email to ${toAddress}`);
            await this.selectEmailButton(EmailButtonTitle.FORWARD);
            await this.enterToAddress(toAddress);
            await this.btnSend.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.forwardIBEmail, err.message);
        }
    }

    /**
     * Get highlighted Email Body Text
     * @author Chinh.Nguyen
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async getHighLightedEmailBodyText(): Promise<string> {
        try {
            await this.ifmEmailContentInEditMode.switchToFrame();
            let bodyText: string = <string>await BrowserWrapper.executeScript(`return window.getSelection().toString()`);
            await BrowserWrapper.switchToDefaultContent();
            return bodyText.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getHighLightedEmailBodyText, err.message);
        }
    }

    /**
     * Click Reply Button
     * @author Phat.Ngo
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async clickReplyButton(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Reply Button");
            await this.btnReply.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickReplyButton, err.message);
        }
    }

    /**
     * Check Email body displays the content
     * @author Phat.Ngo
     * @param {string} emailContent
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailContentDisplayed(emailContent: string): Promise<boolean> {
        try {
            let emailReply = await this.getEmailContentInReadMode();
            return emailReply.includes(emailContent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailContentDisplayed, err.message);
        }
    }

    /**
     * CONTROL key combination with another
     * @author Anh.Ho
     * @param {string} [key,timeoutInSecond]
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async pressControlKey(key: string, timeoutInSecond?: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Pressing Control key combined with key ${key}`);
            if (TestRunInfo.browser == Browser.IE) {
                await this.ifmEmailContentInEditMode.click();
                await this.ifmEmailContentInEditMode.waitForControlStable(timeoutInSecond);
                if (key == "v") {
                    await BrowserWrapper.pressKey(Button.BACKSPACE);
                    await this.btnUndo.waitUntilPropertyChange("aria-disabled", timeoutInSecond);
                    await BrowserWrapper.pressKey(Button.CTRL_V);
                    await this.btnUndo.waitUntilPropertyChange("aria-disabled", timeoutInSecond);
                } else
                    if (key == "a") {
                        await BrowserWrapper.pressKey(Button.CTRL_A);
                    } else
                        if (key == "c") {
                            await BrowserWrapper.pressKey(Button.CTRL_C);
                        }
                await this.btnUndo.waitUntilPropertyChange("aria-disabled", timeoutInSecond);
            } else {
                let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
                var body_editor = await currentBrowser.element(by.id('tinymce'));
                if (key == "v") {
                    //should use this.txtEmailContent.sendKeys
                    await body_editor.sendKeys(Key.BACK_SPACE);
                    await body_editor.sendKeys(Key.chord(Key.CONTROL, `'${key}'`));
                } else {
                    await body_editor.sendKeys(Key.chord(Key.CONTROL, `'${key}'`));
                }
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.pressControlKey, err.message);
        }
    }
    /** 
     * Check Launch button is disabled or not
     * @author Chinh.Nguyen
     * @param {number} contactId
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailParked(contactId: number, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblParkedItem(contactId).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailParked, err.message);
        }
    }

    /**
     * Check Launch button is disabled or not
     * @author Chinh.Nguyen
     * @param {number} contactId
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async selectItemInParkedList(contactId: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting item in parked list");
            await this.lblParkedItem(contactId).moveMouse();
            await this.lblParkedItem(contactId).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectItemInParkedList, err.message);
        }
    }

    /**
     * Check Launch button is disabled or not
     * @author Chinh.Nguyen
     * @param {number} contactId
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async selectItemInWorkingList(contactId: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting item in working list");
            await this.lblWorkingItem(contactId).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectItemInWorkingList, err.message);
        }
    }

    /**
     * Check Email patron icon is displayed or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailPatronIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.imgPatronIcon.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailPatronIconDisplayed, err.message);
        }
    }

    /**
     * Park email by mode
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async unparkEmail(mode: EmailParkMode = EmailParkMode.UNPARK_WORK_NOW, contactId: number): Promise<MaxEmailPage> {
        try {
            if (mode == EmailParkMode.UNPARK_WORK_NOW) {
                await Logger.write(FunctionType.UI, "Unparking email to work now");
            } else if (mode == EmailParkMode.UNPARK_MOVE_TO_QUEUE) {
                await Logger.write(FunctionType.UI, "Unparking email to move to queue");
            }
            else {
                await Logger.write(FunctionType.UI, "Parking email");
            }
            await this.btnUnpark(contactId, mode).waitForControlStable();
            await this.btnUnpark(contactId, mode).waitForVisibilityOf();
            await this.btnUnpark(contactId, mode).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.unparkEmail, err.message);
        }
    }

    /**
     * Wait for parked email displays
     * @author Chinh.Nguyen
     * @param {number} contactId
     * @param {boolean} display
     * @param {string} timeoutInSecond
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async waitForParkedEmailDisplays(contactId: number, display: boolean, timeoutInSecond?: number): Promise<MaxEmailPage> {
        try {
            if (display) {
                await this.btnUnpark(contactId, EmailParkMode.UNPARK_MOVE_TO_QUEUE).waitForVisibilityOf();
            } else {
                await this.btnUnpark(contactId, EmailParkMode.UNPARK_MOVE_TO_QUEUE).waitUntilDisappear(timeoutInSecond);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForParkedEmailDisplays, err.message);
        }
    }

    /**
     * Copy and paste all email contents
     * @author Anh.Ho
     * @param {number} timeoutInSecond
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async copyPasteAllEmailContents(timeoutInSecond?: number): Promise<MaxEmailPage> {
        try {

            if (TestRunInfo.browser == Browser.FIREFOX) {
                await this.ifmEmailContentInEditMode.switchToFrame();
                await this.txtEmailContent.click();
                await this.txtEmailContent.waitForControlStable();
            } else if (TestRunInfo.browser == Browser.IE) {
                await this.ifmEmailContentInEditMode.click();
            } else {
                await BrowserWrapper.switchToFrame(0);
                await this.txtEmailContent.click();
                await this.txtEmailContent.waitForControlStable(timeoutInSecond);
            }

            // Select all contents of email then copy and paste
            await this.pressControlKey("a", timeoutInSecond);
            await this.pressControlKey("c", timeoutInSecond);
            await this.pressControlKey("v", timeoutInSecond);
            if (TestRunInfo.browser == Browser.EDGE) {
                this.waitForPasteOperationCompleted(timeoutInSecond);
            }
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.copyPasteAllEmailContents, err.message);
        }
    }

    /**
     * Checking email contents about header text are Copied and Pasted Correctly or not
     * @author Anh.Ho
     * @param {string,number} [headerText,timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isHeaderTextCopiedPasted(headerText: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Getting header text");
            let elementID: string = await this.ifmEmailContentInEditMode.getAttribute("id");
            let h1Length: string = <string>await BrowserWrapper.executeScript(`iframeID = document.getElementById('${elementID}'); return iframeID.contentWindow.document.getElementsByTagName('h1').length`);
            let intH1Len: number = parseInt(h1Length, 10);
            for (let i: number = 0; i < intH1Len; i++) {
                let bodyText: string = <string>await BrowserWrapper.executeScript(`var iframeID = document.getElementById('${elementID}'); var test = iframeID.contentWindow.document.getElementsByTagName('h1')['${i}']; return test.innerText;`);
                if (bodyText == headerText) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHeaderTextCopiedPasted, err.message);
        }
    }

    /**
     * Checking email contents about underline text are Copied and Pasted Correctly or not
     * @author Anh.Ho
     * @param {string,number} [UnderlineText,timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isUnderlineTextCopiedPasted(UnderlineText: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Getting underline text");
            let elementID: string = await this.ifmEmailContentInEditMode.getAttribute("id");
            let pLength: string = <string>await BrowserWrapper.executeScript(`iframeID = document.getElementById('${elementID}'); return iframeID.contentWindow.document.getElementsByTagName('p').length`);
            let intPLen: number = parseInt(pLength, 10);
            for (let i: number = 0; i < intPLen; i++) {
                let bodyText: string = <string>await BrowserWrapper.executeScript(`var iframeID = document.getElementById('${elementID}'); var test = iframeID.contentWindow.document.getElementsByTagName('p')['${i}']; return test.innerText;`);
                if (bodyText == UnderlineText) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isUnderlineTextCopiedPasted, err.message);
        }
    }

    /**
     * Checking email contents about italic text are Copied and Pasted Correctly or not
     * @author Anh.Ho
     * @param {string, number} [ItalicText,timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isItalicTextCopiedPasted(ItalicText: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Getting italic text");
            let elementID: string = await this.ifmEmailContentInEditMode.getAttribute("id");
            let emLength: string = <string>await BrowserWrapper.executeScript(`iframeID = document.getElementById('${elementID}'); return iframeID.contentWindow.document.getElementsByTagName('p').length`);
            let intEmLen: number = parseInt(emLength, 10);
            for (let i: number = 0; i < intEmLen; i++) {
                let bodyText: string = <string>await BrowserWrapper.executeScript(`var iframeID = document.getElementById('${elementID}'); var test = iframeID.contentWindow.document.getElementsByTagName('em')['${i}']; return test.innerText;`);
                if (bodyText == ItalicText) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isItalicTextCopiedPasted, err.message);
        }
    }

    /**
     * Wait for paste operation completed
     * @author Anh.Ho
     * @param {number} [timeoutInSecond]
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async waitForPasteOperationCompleted(timeoutInSecond?: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for Paste Operation completed");
            let selectedText: string = await BrowserWrapper.getSelectedText();
            let count: number = 0;
            while (selectedText != "" || count > timeoutInSecond) {
                selectedText = await BrowserWrapper.getSelectedText();
                count = count + 1;
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForPasteOperationCompleted, err.message);
        }
    }

    /**
	 * Click on Transfer and Conference button
	 * @author Tan.Ta
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
    public async clickTransferConferenceButton(): Promise<MaxTransferPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Transfer Conference button`);
            await this.btnTransferContact.waitForVisibilityOf();
            await this.btnTransferContact.click();
            return MaxTransferPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }

    public async clickEndEmailButton(contactId: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `End contact ${contactId}`);
            await this.btnEndEmailByContactId(contactId).click();
            await this.btnErrorConfirm.click();
            await this.btnErrorConfirm.waitUntilDisappear();
            await this.emailWorkingSpace.waitUntilDisappear();
            await this.divMaxWrapper.waitForControlStable();
            return this;
        } catch (error) {
            throw new errorwrapper.CustomError(this.clickEndEmailButton, error.message);
        }
    }

    /**
	 * Reply email with content
	 * @author Anh.Ho
	 * @returns {Promise<any>}
	 * @memberof MaxEmailPage
	 */
    public async replyEmailWithContent(replyEmail: boolean, emailBody: string, sendEmail: boolean): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, `Reply email with content ${emailBody}`);
            if (replyEmail) {
                await this.selectEmailButton(EmailButtonTitle.REPLY);
            }
            await this.cleanUpEmailContent();
            await this.enterEmailBody(emailBody);
            if (sendEmail) {
                await BrowserWrapper.executeScript(`document.querySelector('.${EmailButtonTitle.SEND}').click();`)
                // await this.selectEmailButton(EmailButtonTitle.SEND);
            }
            if (emailBody == "") {
                return this;
            } else {
                return await MaxPage.getMaxInstance();
            }

        } catch (error) {
            throw new errorwrapper.CustomError(this.replyEmailWithContent, error.message);
        }
    }
    /**
     * Checking Date Time sort opiion
     * @author Lien.Nguyen
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isDateTimeSortOptionDisPlayed(timeOut?: number): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Check date time sort option displayed");
            return await this.btnSort.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDateTimeSortOptionDisPlayed, err.message);
        }
    }
    /**
    * Checking Date Time is Sorted
    * @author Lien.Nguyen
    * @returns {Promise<boolean>}
    * @param {descending} [boolean] //true is descending, false is ascending
    * @memberof MaxEmailPage
    */
    public async isDateTimeSorted(descending: boolean = true): Promise<boolean> {
        try {
            if (descending) {
                await Logger.write(FunctionType.UI, "Check date time is descending");
            } else {
                await Logger.write(FunctionType.UI, "Check date time is ascending");
            }

            let i = 1;
            let getTimeNumberCompare: number;
            let tmpTimeNumber: number
            while (await this.liTimeStandard(i).isDisplayed(TestRunInfo.shortTimeout)) {
                let getTimeTex: string = (await this.liTimeStandard(i).getText()).trim().replace(" ", ":");
                let arrayTimeItem: Array<string> = getTimeTex.split(":");

                if (arrayTimeItem[2] == "PM") {
                    tmpTimeNumber = parseFloat(arrayTimeItem[0]) * 60 + parseFloat(arrayTimeItem[1]) + 12 * 60;
                } else {
                    tmpTimeNumber = parseFloat(arrayTimeItem[0]) * 60 + parseFloat(arrayTimeItem[1]);
                }
                if (i == 1) {
                    getTimeNumberCompare = tmpTimeNumber;
                }
                if (descending) {
                    if (getTimeNumberCompare >= tmpTimeNumber) {
                        getTimeNumberCompare = tmpTimeNumber;
                    } else {
                        return false;
                    }
                } else {
                    if (getTimeNumberCompare <= tmpTimeNumber) {
                        getTimeNumberCompare = tmpTimeNumber;
                    } else {
                        return false;
                    }
                }
                i++;
            }
            return true;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDateTimeSorted, err.message);
        }
    }

    /**
	 * Checking email splits two or more sessions
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isEmailWorkSpaceNotSplit(timeOut?: number): Promise<boolean> {
        try {
            let emailWorkingSpace: boolean = await this.pnlEmailSplitWorkSpace(1).isDisplayed(timeOut);
            let splitEmailWorkingSpace: boolean = await this.pnlEmailSplitWorkSpace(2).isDisplayed(timeOut);
            return emailWorkingSpace == true && splitEmailWorkingSpace == false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailWorkSpaceNotSplit, err.message);
        }
    }

    /** Check Parked Email icon is displayed on the glance view or not
    * @author Anh.Ho
    * @returns {Promise<boolean>}
    * @memberof MaxEmailPage
    */
    public async isParkedEmailOnGlanceViewDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblParkedEmail.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isParkedEmailOnGlanceViewDisplayed, err.message);
        }
    }

    /**
     * Select Parked Email icon on the glance view
     * @author Anh.Ho
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async selectParkedEmailOnGlanceView(): Promise<MaxEmailPage> {
        try {
            await this.lblParkedEmail.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectParkedEmailOnGlanceView, err.message);
        }
    }

    /**
	* This method is used to check current max email section is matched with expectation with the allowable range (default is +-10)
	* @author Tung.Vo 
	* @param {number} expectedSize expected size to check
	* @param {number} range tolerance to adjust acceptable checking value
	* @returns {Promise<boolean>}
	* @memberof MaxPage
	*/
    public async isEmailWorkingSpaceSizeInRange(expectedSize: number, range: number): Promise<boolean> {
        try {
            await this.emailWorkingSpace.waitUntilCssValueNotChange("width");
            let sizeGlance: ISize = await this.getContactWorkSpaceSize(ContactName.EMAIL);
            return await Utility.isNumberInRange(sizeGlance.width, expectedSize, range);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailWorkingSpaceSizeInRange, err.message);
        }
    }
    /**
     * Check datetime sort is displayed or not
     * @returns {Promise<boolean>} the existence of time stamp
     * @memberof MaxEmailPage
     */
    public async isSortButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnSort.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSortButtonDisplayed, err.message);
        }
    }
    /**
     * Check Skill Name label is displayed or not
     * @returns {Promise<boolean>} the existence of time stamp
     * @memberof MaxEmailPage
     */
    public async isSkillNameLabelDisplayed(): Promise<boolean> {
        try {
            return await this.lblSkillName.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillNameLabelDisplayed, err.message);
        }
    }
    /**
     * Get Skill Name label
     * @returns {Promise<string>} 
     * @memberof MaxEmailPage
     */
    public async getSkillNameLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Skill Name label`);
            let className = await this.lblFromSkillName.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillNameLabelDisplayed, err.message);
        }
    }
    /**
     * Get Email Header label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEmailHeaderLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Email Header Name label`);
            let className = await this.lblPatronAddress.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailHeaderLabel, err.message);
        }
    }
    /**
     * Get Discard Draft label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getDiscardDraftLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Discard Draft label`);
            let className = await this.btnDiscard.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDiscardDraftLabel, err.message);
        }
    }
    /**
     * Get Send button label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getSendButtonLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Send button label`);
            let className = await this.btnSend.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSendButtonLabel, err.message);
        }
    }
    /**
     * Get Transfer button label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getTransferButtonLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Transfer button label`);
            let className = await this.btnTransfer.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTransferButtonLabel, err.message);
        }
    }
    /**
     * Get Requeue button label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getRequeueButtonLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Requeue button label`);
            let className = await this.btnRequeue.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRequeueButtonLabel, err.message);
        }
    }
    /**
     * Get Launch button label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getLaunchButtonLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Launch button label`);
            let className = await this.btnLaunch.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getLaunchButtonLabel, err.message);
        }
    }
    /**
     * Get End button label
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getEndButtonLabel(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting End button label`);
            let className = await this.btnEnd.getAttribute("class");
            let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
            return label.trim();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEndButtonLabel, err.message);
        }
    }
    /**
     * Get title of Parked Email number
     * @author Anh.Ho
     * @returns {Promise<number>}
     * @memberof MaxEmailPage
     */
    public async getParkedEmailNumber(): Promise<number> {
        try {
            let title: string = await this.lblParked.getText();
            let reg = /\d+/g;
            let queueArr = reg.exec(title);
            let queueNumber: number = parseInt(queueArr[0])
            return queueNumber;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getParkedEmailNumber, err.message);
        }
    }

    /**
     * Check To address is populated
     * @author ChinhNguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isBCCAddressContentPopulated(): Promise<boolean> {
        try {
            if (await this.txtBCCAddress.getControlValue() != '') {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBCCAddressContentPopulated, err.message);
        }
    }

    /** Waiting for value on parked email box changed
     * @author Anh.Ho
     * @returns {Promise<void>}
     * @memberof MaxEmailPage
     */
    public async waitForParkedEmailBoxChange(number: number): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for parked email number change");
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            let queueNumber: number;
            queueNumber = await this.getParkedEmailNumber();
            while (queueNumber != number && stopTime < TestRunInfo.elementTimeout * 3) {
                queueNumber = await this.getParkedEmailNumber();
                stopTime = stopWatch.getElapsedTimeInSecond();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForParkedEmailBoxChange, err.message);
        }
    }

    /** 
	 * Send an outbound email
     * @author Chinh.Nguyen
	 * @param {SkillType} skillType
	 * @param {string} [emailAddress]
	 * @param {boolean} [requiredDisposition]
	 * @param {boolean} [acw]
	 * @returns {Promise<MaxEmailPage>}
	 * @memberof MaxEmail
	 */
    public async sendOutboundEmail(toAddress: string, emailBody: string, emailSubject: string): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Sending Outbound Email`);
            await this.enterToAddress(toAddress);
            await this.enterEmailSubject(emailSubject);
            await this.cleanUpEmailContent();
            await this.enterEmailBody(emailBody);
            await this.clickSend();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.makeOutboundEmail, err.message);
        }
    }

    /**
     * Get Skill Name color
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getSkillNameColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Skill Name label color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('color');return result};return getcss("//div[@class='from-skill-label']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillNameColor, err.message);
        }
    }

    /**
    * Get EmailHeader color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getEmailHeaderColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Email Header label color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('color');return result};return getcss("//div[@class='patron-address-label ellipsis']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillNameColor, err.message);
        }
    }

    /**
    * Get Email Workspace color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getEmailWorkspaceColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Email workspace color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//div[@id='emailWorkspace']");`);
            if (colorCode == "transparent") {
                return "rgba(0, 0, 0, 0)";
            }
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailWorkspaceColor, err.message);
        }
    }

    /**
    * Get Discard button Color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getDiscardButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Discard button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='discard']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEmailWorkspaceColor, err.message);
        }
    }

    /**
     * Get Send Button Color
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getSendButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Send button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='send']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSendButtonColor, err.message);
        }
    }

    /**
     * Get Transfer Button Color
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getTransferButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Transfer button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='transfer']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTransferButtonColor, err.message);
        }
    }

    /**
    * Get Requeue Button Color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getRequeueButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Requeue button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='requeue']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRequeueButtonColor, err.message);
        }
    }

    /**
    * Get Launch Button Color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getLaunchButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Launch button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='launch']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getLaunchButtonColor, err.message);
        }
    }

    /**
    * Get End Button Color
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getEndButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting End button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='end']");`);
            return colorCode
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEndButtonColor, err.message);
        }
    }

    /**	
     * Check button in tiny tool
     * @author Y.Le
     * @param {string} buttonName
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailTinyToolButtonDisplayed(buttonName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.btnEmailBottomTinyTool(buttonName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailTinyToolButtonDisplayed, err.message);
        }
    }

    /**
     * Check reply button is displayed or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isReplyButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnReply.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReplyButtonDisplayed, err.message);
        }
    }

    /**
     * Check reply all button is displayed or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isReplyAllButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnReplyAll.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReplyAllButtonDisplayed, err.message);
        }
    }

    /**
     * Check forward button is displayed or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isForwardButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnForward.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isForwardButtonDisplayed, err.message);
        }
    }

    /**
     * Check park email button is displayed or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isParkEmailButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnParkEmail.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isParkEmailButtonDisplayed, err.message);
        }
    }

    /**
    * Get reply button Color
    * @author Chinh.Nguyen
    * @returns {Promise<string>}
    * @memberof MaxEmailPage
    */
    public async getReplyButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Reply button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='reply']");`);
            return colorCode;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReplyButtonColor, err.message);
        }
    }

    /**
     * Get reply all button Color
     * @author Chinh.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getReplyAllButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting reply all button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='reply-all']");`);
            return colorCode;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReplyAllButtonColor, err.message);
        }
    }

    /**
     * Get forward button Color
     * @author Chinh.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getForwardButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Forward button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='forward']");`);
            return colorCode;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getForwardButtonColor, err.message);
        }
    }

    /**
     * Get park email button Color
     * @author Chinh.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async getParkEmailButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting Park Email button color`);
            let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//button[@class='park-email']");`);
            return colorCode;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getParkEmailButtonColor, err.message);
        }
    }

    /** 
     * Resize email working space to the right side
     * @author Anh.Ho
     * @returns {Promise<string>}
     * @memberof MaxEmailPage
     */
    public async resizeEmailWorkingSpace(widthSize: number): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Resizing email working space`);

            await this.resizeMaxByDropAndDrag(widthSize, 0);
            let iSize: number;
            let sizeEmail: ISize = await this.emailWorkingSpace.getSize();
            let currentSize: number = sizeEmail.width;
            let maxSize: number = currentSize + widthSize;
            iSize = currentSize;
            while (iSize <= maxSize) {
                await BrowserWrapper.executeScript(`return document.getElementById("email-container").style.width = "${iSize}px"`);
                iSize = iSize + 1;
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillNameColor, err.message);
        }
    }

    /** 
     * Check if an item from the email parked list is selected
     * @author W.Plaza
     * @param {number} contactId
     * @returns {Promise<boolean>}
     * @memberof MaxEmailPage
     */
    public async isEmailParkedListItemSelected(contactId: number, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblParkedEmaillistItemSelected(contactId).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEmailParkedListItemSelected, err.message);
        }
    }

    /** Waiting for number of contactId returned
     * @author Anh.Ho
     * @returns {Promise<any>}
     * @memberof MaxEmailPage
     */
    public async waitForCurrentContactIdReturn(numberOfContact: number, agent: Agent, skillName: string): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for current contactId returned");
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            let contactIdArr: number[] = await TestHelpers.getCurrentContactId(agent, skillName, true);
            let lengthOfContactId: number = contactIdArr.length;
            while (lengthOfContactId < numberOfContact && stopTime < TestRunInfo.elementTimeout * 3) {
                contactIdArr = await TestHelpers.getCurrentContactId(agent, skillName, true);
                lengthOfContactId = contactIdArr.length;
                stopTime = stopWatch.getElapsedTimeInSecond();
            }

            return contactIdArr;

        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCurrentContactIdReturn, err.message);
        }
    }

    /**
     * Clean up email Subject content using Key controls
     * @author W.Plaza
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxEmailPage
     */
    public async cleanUpEmailSubject(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting and deleting email subject");
            await this.txtSubject.sendKeys(Key.chord(Key.CONTROL, "a"));
            await this.txtSubject.sendKeys(Key.DELETE);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.cleanUpEmailSubject, err.message);
        }
    }
}