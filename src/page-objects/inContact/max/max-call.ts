import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxEmailPage from "@page-objects/inContact/max/max-email";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { Browser, ILocation, ISize, Key } from "selenium-webdriver";

export default class MaxCall extends MaxPage {

    private static _maxCall: MaxCall = null;

    constructor() { super(); }

    protected lblDialling = new ElementWrapper(by.xpath("//div[@class='contact-info']//span[@class='state-name'][text()='Dialing']"));
    protected lblTotalContactTime = new ElementWrapper(by.xpath("//h3[@class='total-contact-time']"));
    protected lblAni = new ElementWrapper(by.xpath("//h3[@class='ani']"));
    protected lblCustomerContact = new ElementWrapper(by.xpath("//div[@class='primary-info']/h1[@class='contact-label']"));
    protected lblNoResultMsg = new ElementWrapper(by.xpath("//ul[@class='result-list']/li[@class='no-results popover-panel-item-template hover']"))
    protected lblACW = new ElementWrapper(by.xpath("//div[@class='acw-ui acwui']"));
    protected lblConference = new ElementWrapper(by.xpath("//h1[@class='contact-label' and text()='Conference']"));
    protected lblHoldTimer = new ElementWrapper(by.xpath("//span[@class='state-name']/following-sibling::span[@class='state-time']"));
    protected lblHolding = new ElementWrapper(by.xpath("//span[@class='state-name']"));
    protected lblContactPanelToggle = new ElementWrapper(by.xpath("//div[@id='call-container']//span[@class='contact-panel-toggle']"));

    protected icoCustomerContact = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui']//div[@class='primary-info']/*[name()='svg']"));
    protected txtTransferAddress = new ElementWrapper(by.xpath("//div[@id='advancedaddressbooksearchui-0']/form/input[@type='search']"))

    protected btnHold = new ElementWrapper(by.xpath("//button[@class='hold']"));
    protected btnHoldSelected = new ElementWrapper(by.xpath("//button[@class='hold selected']"));
    protected btnMute = new ElementWrapper(by.xpath("//button[@class='mute']"));
    protected btnMuteSelected = new ElementWrapper(by.xpath("//button[@class='mute selected']"));
    protected btnMask = new ElementWrapper(by.xpath("//button[@class='mask']"));
    protected btnMaskSelected = new ElementWrapper(by.xpath("//button[@class='mask selected']"));
    protected btnRecord = new ElementWrapper(by.xpath("//div[@class='primary-controls']//button[contains(@class,'record')]"));
    protected btnRecordSelected = new ElementWrapper(by.xpath("//button[@class='record selected']"));
    protected btnCommit = new ElementWrapper(by.xpath("//div[@id='contactSection']//button[@class='commitment active-add-commitment']"));
    protected btnEndContact = new ElementWrapper(by.xpath("//div[@class='secondary-controls']//button[contains(@class,'end-contact')]"));
    protected btnLaunch = new ElementWrapper(by.xpath("//div[@id='contactSection']//button[@class='launch']"));
    protected btnConfirmEndContact = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
    protected btnResume = new ElementWrapper(by.xpath("//button[@class='resume']"));
    protected btnSaveCloseButton = new ElementWrapper(by.xpath("//button[@class='save-close-acw-submit submit']"));
    protected btnColdTransfer = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui' and @data-status='Active']//button[@class='transfer-contact left']"));
    protected btnConference = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui' and @data-status='Active']//button[@class='conference-contact right']"));
    protected btnAddContact = new ElementWrapper(by.xpath("//div[@id='callcontactui-0']//button[@class='add-contact hidden']"));
    protected btnCallTransferContact = new ElementWrapper(by.xpath("//div[contains(@class,'call-contact-body-ui')]//div[@class='secondary-controls']//button[@class='init-transfer-contact']"));
    protected btnEndConference = new ElementWrapper(by.xpath("//div[@id='callcontactui-0']//button[@class='end-conference hidden']"));
    protected btnConfirmEndConference = new ElementWrapper(by.xpath("//div[@id='callcontactui-0']//button[@class='confirm-end-conference hidden']"));
    protected btnEndContactConference = new ElementWrapper(by.xpath("//div[@id='callcontactui-0']//button[@class='end-contact' or @class='end-contact disabled']"));
    protected btnConfirmEndContactConference = new ElementWrapper(by.xpath("//div[@id='callcontactui-0']//button[@class='confirm-end-contact']"));
    protected btnAcceptInErrorDialog = new ElementWrapper(by.xpath("//div[@class='dialog-buttons-panel']/button[@title='Accept']"));
    protected btnHangUpDisable = new ElementWrapper(by.xpath("//button[@class='end-contact disabled']"));
    protected btnConferenceColdTransfer = new ElementWrapper(by.xpath(`//div[@data-status='Dialing']//button[@class='cold-transfer-contact']`));
    protected btnLaunchPopover = new ElementWrapper(by.xpath("//div[@class='popover-panel indicator-ui']"));
    protected btnHangUp = new ElementWrapper(by.xpath("//button[@class='end-contact']"));
    protected btnHoldButtonInCallActive = new ElementWrapper(by.xpath("//div[@data-status='Active']//div[@class='child-call-controls']/button[./h4[text()='Hold']]"));
    protected btnSaveAndCallback = new ElementWrapper(by.xpath("//button[text()='Save and Callback']"));
    protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='secondary-controls']//button[@class='init-transfer-contact' or @class='transfer']"));

    protected pnlKeyPad = new ElementWrapper(by.xpath("//div[contains(@id,'keypadui')]//a/*[name()='svg']"));
    protected pnlAddressBook = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel advanced-address-book-ui']"));
    protected pnlCommitment = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel commitment-add-panel']"));
    protected pnlIndicator = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel indicator-ui']"));
    protected pnlBackground = new ElementWrapper(by.xpath("//div[@class='popover-background']"));
    protected pnlDisposition = new ElementWrapper(by.xpath("//form[contains (@class,'acw-form')]"));
    protected pnlDispositionTime = new ElementWrapper(by.xpath("//span[@class='disposition-time']"));
    protected btnSaveAndRedial = new ElementWrapper(by.xpath("//button[@class='save-redial-acw-submit submit']"));
    protected lblIvrText = new ElementWrapper(by.xpath("//span[@class='dtmf-text']"));
    protected btnConferenceHolding = new ElementWrapper(by.xpath("//div[@id='callcontactui-1_container' and @data-status='Holding']//button[@class='conference-contact right']"));

    public static async getInstance(): Promise<MaxCall> {
        this._maxCall = new MaxCall();
        await this._maxCall.waitForLoading(TestRunInfo.middleTimeout);
        return this._maxCall;
    }

    // Dynamic controls
    protected lblSkillInfo(skillName: string, skillId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='contact-info']//h3[@class='skill-name'][text()='${skillName} (${skillId})']`));
    }

    protected btnKeyPad(key: string | number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='keypad-section-element']//a[@data-key='${key}']`));
    }

    protected btnTransferCall(key: string | number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='search-content']//div[@class='entry left']/*[text()='${key}']/../div/button[@class='call']`));
    }

    protected lblTransferAddress(key: string | number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='search-content']//div[@class='entry left']/*[text()='${key}']`));
    }

    protected btnConferenceTransferCall(contactOrder: number, callNumber: string | number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@data-status='Joined'][${contactOrder}]//h3[@title='${callNumber}']//following-sibling::div/button[@class='transfer hidden left']`));
    }

    protected btnHoldWithPhoneNumber(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[./h3[text()='${phoneNumber}' and @class='ani']]//button[./h4[text()='Hold']]`));
    }

    protected btnHangUpWithPhoneNumber(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[./h3[text()='${phoneNumber}' and @class='ani']]//button[@class='hangup']`));
    }

    protected lblNewCall(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//h3[text()='${phoneNumber}' and @class='ani']`));
    }

    protected lblMainCall(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//h3[text()='${phoneNumber}' and @class='contact-label-secondary']`));
    }

    protected btnConferenceWithCallNumber(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[.//h3[@class='ani' and text()='${phoneNumber}'] and @id='call-container']//button[@class='conference-contact right']`));
    }

    protected btnTransferWithCallNumber(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//h3[text()='${phoneNumber}']/parent::div//button[@class='transfer hidden left']`));
    }

    protected btnTransferContactInAddressBook(value: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//h1[text()='${value}']/parent::div//button[@class='transfer']`));
    }

    /**	
	 * Check if ToTal Contact Time is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isToTalContactTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblTotalContactTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToTalContactTimeDisplayed, err.message);
        }
    }

    /**	
	 * Check if Ani is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isAniDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblAni.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAniDisplayed, err.message);
        }
    }

    /**	
	 * Check if Customer Contact Label is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCustomerContactLabelDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCustomerContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerContactLabelDisplayed, err.message);
        }
    }

    /**	
	 * Check if Customer Contact Icon is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCustomerContactIconDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.icoCustomerContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerContactIconDisplayed, err.message);
        }
    }

    /**	
	 * Check if Hold Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHoldButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnHold.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Mute Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isMuteButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnMute.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMuteButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Mask Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isMaskButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnMask.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaskButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Record Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isRecordButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnRecord.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRecordButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Commit Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCommitButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCommit.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if End Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isEndButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnEndContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Launch Button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isLaunchButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnLaunch.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Key Pad is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isKeyPadDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlKeyPad.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isKeyPadDisplayed, err.message);
        }
    }

    /**	
	 * Check if Skill Info is displayed or not
     * @param {string} skillName
     * @param {number} skillId
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isSkillInfoDisplayed(skillType: SkillType, skillId: number, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblSkillInfo(SkillCore.getSkillName(skillType), skillId).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillInfoDisplayed, err.message);
        }
    }

    /**	
	 * Click Key Pad
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickKeypad(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Key Pad`);
            await this.pnlKeyPad.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickKeypad, err.message);
        }
    }

    /**	
	 * Check if key is displayed on Key Pad or not
     * @param {(string | number)} key
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isKeyDisplayed(key: string | number, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnKeyPad(key).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isKeyDisplayed, err.message);
        }
    }

    /**	
	 * Check if Address Book is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isAddressBookDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlAddressBook.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddressBookDisplayed, err.message);
        }
    }

    /**	
	 * Click on Commit button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickCommitButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking commit button`);
            await this.btnCommit.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCommitButton, err.message);
        }
    }

    /**	
	 * Check if Commitment is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCommitmentDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlCommitment.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitmentDisplayed, err.message);
        }
    }

    /**	
	 * Click on Launch button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickLaunchButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Launch button`);
            await this.btnLaunch.click();
            await this.btnLaunch.waitForControlStable();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickLaunchButton, err.message);
        }
    }

    /**	
	 * Check if Indicator is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isIndicatorDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlIndicator.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isIndicatorDisplayed, err.message);
        }
    }

    /**	
	 * Click on Hold button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickHoldButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Hold button`);
            await this.btnHold.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickHoldButton, err.message);
        }
    }

    /**	
	 * Click on UnHold button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickUnHoldButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking UnHold button`);
            await this.btnHoldSelected.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickUnHoldButton, err.message);
        }
    }

    /**	
	 * Click on Mute button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickMuteButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Mute button`);
            await this.btnMute.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickMuteButton, err.message);
        }
    }

    /**	
	 * Click on UnMute button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickUnMuteButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking UnMute button`);
            await this.btnMuteSelected.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickUnMuteButton, err.message);
        }
    }

    /**	
	 * Click on Mask button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickMaskButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Mask button`);
            await this.btnMask.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickMaskButton, err.message);
        }
    }

    /**	
	 * Click on UnMask button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickUnMaskButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking UnMask button`);
            await this.btnMaskSelected.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickUnMaskButton, err.message);
        }
    }

    /**	
	 * Click on Record button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickRecordButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Record button`);
            await this.btnRecord.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickRecordButton, err.message);
        }
    }

    /**	
	 * Check if Call is held or not
     * @param {boolean} [state=true]
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallHeld(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnHoldSelected.isDisplayed(timeoutInSecond);
            else
                return await this.btnHold.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallHeld, err.message);
        }
    }

    /**	
	 * Check if Call is muted or not
     * @param {boolean} [state=true]
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallMuted(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnMuteSelected.isDisplayed(timeoutInSecond);
            else
                return await this.btnMute.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallMuted, err.message);
        }
    }

    /**	
	 * Check if Call is masked or not
     * @param {boolean} [state=true]
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallMasked(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnMaskSelected.isDisplayed(timeoutInSecond);
            else
                return await this.btnMask.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallMasked, err.message);
        }
    }

    /**	
	 * Check if Call is recorded or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCallRecorded(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnRecordSelected.isDisplayed(timeoutInSecond);
            else
                return await this.btnRecord.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallRecorded, err.message);
        }
    }

    /**	
	 * Click on End Contact button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickEndContactButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking End button`);
            await this.btnEndContact.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickEndContactButton, err.message);
        }
    }

    /**	
	 * Click on Confirm End Contact button
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxCall
	 */
    public async clickConfirmEndContactButton(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Confirm button`);
            await this.btnConfirmEndContact.click();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConfirmEndContactButton, err.message);
        }
    }

    /**	
     * Click on Confirm End Contact button (Case: interrupt email)
     * @author Chinh.Nguyen
     * @returns {Promise<MaxEmailPage>}
     * @memberof MaxCall
     */
    public async clickConfirmEndContactButtonInterruptedEmail(): Promise<MaxEmailPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Confirm button`);
            await this.btnConfirmEndContact.click();
            return await MaxEmailPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConfirmEndContactButtonInterruptedEmail, err.message);
        }
    }

    /**	
    * Click on Confirm End Contact button
    * @returns {Promise<MaxPage>}
    * @memberof MaxCall
    */
    public async clickConfirmEndContactButtonACW(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Confirm button`);
            await this.btnConfirmEndContact.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConfirmEndContactButtonACW, err.message);
        }
    }

    /**	
	 * Check if Resume button is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isResumeButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnResume.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isResumeButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Confirm End Contact is displayed or not
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isConfirmEndContactDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnConfirmEndContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConfirmEndContactDisplayed, err.message);
        }
    }

    /**
	 * Waiting for call dialling
	 * @returns {Promise<void>}
	 * @memberof MaxCall
	 */
    public async waitForCallDialling(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for call dialling");
            await this.lblDialling.waitUntilDisappear();
            await this.btnRecord.wait();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCallDialling, err.message);
        }
    }

    /**
	 * Check Save and Close button is displayed or not
     * @author Anh.Ho
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isSaveCloseButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnSaveCloseButton.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaveCloseButtonDisplayed, err.message);
        }
    }

    /**
	 * is Launch button activated
	 * @returns {Promise<boolean>} Active -> true not active -> false
	 * @memberof MaxCall
	 */
    public async isLaunchButtonActivated(): Promise<boolean> {
        try {
            if (await this.btnLaunch.getAttribute("data-opened") == "true") {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonActivated, err.message);
        }
    }

    /**	
     * Fill in Transfer search address
     * @author Phat.Truong
     * @param {string} inputText
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async fillTransferAddress(inputText: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Filling transfer address box`);
            await this.txtTransferAddress.waitForVisibilityOf();
            await this.txtTransferAddress.type(inputText);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillTransferAddress, err.message);
        }
    }

    /**	
     * Check if No Result Founds message is displayed in transfer search
     * @author Phat.Truong
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isNoResultMsgDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblNoResultMsg.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNoResultMsgDisplayed, err.message);
        }
    }

    /**	
     * Check if ACW is displayed
     * @author Phat.Truong
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isACWDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblACW.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isACWDisplayed, err.message);
        }
    }

    /**
    * Waiting for ACW disappear
    * @author Phat.Truong
    * @returns {Promise<MaxPage>}
    * @memberof MaxCall
    */
    public async waitForACWTimeout(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for ACW disappear after timeout");
            await this.lblACW.waitUntilDisappear();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForACWTimeout, err.message);
        }
    }

    /**
     * End a call contact 
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async endCallContact(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Ending a call contact\n`);
            await this.btnEndContact.waitForPresenceOf();
            await this.clickEndContactButton();
            await this.btnEndContact.waitUntilDisappear();
            return await this.clickConfirmEndContactButton();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endCallContact, err.message);
        }
    }

    /** 
    * Hanging a call that have ACW skill
    * @author Phat.Truong
    * @returns { Promise<MaxDispositionPage>}
    * @memberof MaxCall
    */
    public async hangUpCallACW(): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, "Hanging up a call that have ACW skill");
            await this.clickEndContactButton();
            await this.clickConfirmEndContactButtonACW();
            return await MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.hangUpCallACW, err.message);
        }
    }

    /**	
     * Check if transfer Call button is displayed
     * @author Phat.Truong
     * @param {(string | number)} transferAddress address to transfer
     * @param {number} [timeoutInSecond] Time to wait for element before checking
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isTransferCallButtonDisplayed(transferAddress: string | number, timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.lblTransferAddress(transferAddress).moveMouse();
            return await this.btnTransferCall(transferAddress).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferCallButtonDisplayed, err.message);
        }
    }

    /**
	 * Call external from transfer call
     * @author Phat.Truong
     * @param {(string | number)} transferAddress address to transfer
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async callExternalTransfer(transferAddress: string | number): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on External call button in transfer for ${transferAddress}`);
            await this.lblTransferAddress(transferAddress).moveMouse();
            await this.btnTransferCall(transferAddress).waitUntilPropertyChange("height", TestRunInfo.shortTimeout);
            await this.btnTransferCall(transferAddress).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.callExternalTransfer, err.message);
        }
    }

    /**
     * Transfer a call
     * @author Phat.Truong
     * @returns {Promise<MaxPage>}
     * @memberof MaxCall
     */
    public async clickTransferCall(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Transfer call button in transfer");
            await this.btnColdTransfer.click();
            await this.btnColdTransfer.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferCall, err.message);
        }
    }

    /**
	 * Click on Transfer and Conference button
	 * @author Tan.Ta
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
    public async clickTransferConferenceButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on Transfer Conference button`);
            await this.btnTransferContact.waitForVisibilityOf();
            await this.btnTransferContact.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }

    /**
   * Call second contact in transfer call
   * @author Phat.Truong
   * @returns {Promise<MaxCall>}
   * @memberof MaxCall
   */
    public async callSecondContact(inputText: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Calling second contact ${inputText} to transfer`);
            await this.clickTransferConferenceButton();
            await this.fillTransferAddress(inputText);
            await this.callExternalTransfer(inputText);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.callSecondContact, err.message);
        }
    }

    /**	
    * Check if transfer Call button is displayed
    * @author Phat.Truong
     * @param {number} [timeoutInSecond] Time to wait for element before checking
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isConferenceOptionDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnConference.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConferenceOptionDisplayed, err.message);
        }
    }

    /**
    * Add contact to conference
    * @author Phat.Truong
     * @param {string} inputText Input contact phoneNumber or name
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async addContactConference(inputText: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Adding contact to Conference");
            await this.btnAddContact.waitForVisibilityOf();
            await this.btnAddContact.click();
            await this.fillTransferAddress(inputText);
            await this.callExternalTransfer(inputText);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addContactConference, err.message);
        }
    }

    /**
         * Click on Conference button
         * @author Phat.Truong
         * @returns {Promise<MaxPage>}
         * @memberof MaxCall
         */
    public async clickConference(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Conference button in transfer");
            await this.btnConference.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConference, err.message);
        }
    }

    /**
    * End conference 
    * @author Phat.Truong
    * @returns {Promise<MaxCall>}
    * @memberof MaxCall
    */
    public async endConference(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Ending Conference\n`);
            await this.btnEndConference.click();
            await this.btnConfirmEndConference.click();
            await this.btnConfirmEndContactConference.waitUntilDisappear();
            await BrowserWrapper.sleepInSecond(5);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.endConference, err.message);
        }
    }

    /**
     * End a call contact after conference
     * @author Phat.Truong
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async endCallContactConference(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Ending a call contact\n`);
            await this.btnEndContactConference.click();
            await this.btnConfirmEndContactConference.click();
            return MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endCallContactConference, err.message);
        }
    }

    /**
         * Click on Conference button
         * @author Phat.Truong
         * @returns {Promise<MaxPage>}
         * @memberof MaxCall
         */
    public async clickAcceptErrorDialog(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Accept button in error dialog");
            await this.btnAcceptInErrorDialog.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAcceptErrorDialog, err.message);
        }
    }

    /**
      * Check Disposition Displayed
      * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isDispositionDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.pnlDisposition.wait();
            return await this.pnlDisposition.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionDisplayed, err.message);
        }
    }

    /**
	* Check Disposition Time Displayed
    * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isDispositionTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            await this.pnlDispositionTime.wait();
            return await this.pnlDispositionTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDispositionTimeDisplayed, err.message);
        }
    }

    /**
	* Check Conference Mode Active
    * @author Tung.Vo
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isConferenceModeActive(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblConference.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConferenceModeActive, err.message);
        }
    }

    /**
	* Transfer Call in Conference
    * @author Tung.Vo
     * @param {number} contactOrder
     * @param {(string | number)} transferAddress
     * @returns {Promise<MaxPage>}
     * @memberof MaxCall
     */
    public async transferConferenceCall(contactOrder: number, transferAddress: string | number): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Transferring call of contact order ${contactOrder} with number ${transferAddress}`);
            await this.btnConferenceTransferCall(contactOrder, transferAddress).click();
            return await MaxPage.getMaxInstance(false);;
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferConferenceCall, err.message);
        }
    }

    /**
* Cold Transfer Call in Conference
* @author Tung.Vo
* @returns {Promise<Max>} Max Page
* @memberof MaxCall
*/
    public async coldTransferConferenceCall(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Cold transferring call in conference`);
            await this.btnColdTransfer.click();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.coldTransferConferenceCall, err.message);
        }
    }
    /**	
	 * Click on Hold button in call active
     * @author Nhat.Nguyen
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickHoldButtonInCallActive(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Hold button in call active`);
            await this.btnHoldButtonInCallActive.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickHoldButtonInCallActive, err.message);
        }
    }

    /**	
	 * Get color Hold button in call active
     * @author Chinh.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxCall
	 */
    public async getHoldButtonInCallActiveColor(phoneNumber: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting color Hold button in call active`);
            return Utility.convertRgbToHex(await this.btnHoldWithPhoneNumber(phoneNumber).getCssValue("color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getHoldButtonInCallActiveColor, err.message);
        }
    }

    /**	
	 * Click on Hang Up button with phone number
     * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async clickHangUpWithPhoneNumber(phoneNumber: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Hang Up button with call number`);
            await this.btnHangUpWithPhoneNumber(phoneNumber).click();
            await this.btnHangUpWithPhoneNumber(phoneNumber).waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickHangUpWithPhoneNumber, err.message);
        }
    }

    /**	
	 * is Conference Displayed
     * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isConferenceDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblConference.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConferenceDisplayed, err.message);
        }
    }

    /**	
	 * is Hang up button displayed
     * @author Nhat.Nguyen
     * @param {boolean} [state=true]
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHungUpDisplayed(state: boolean = true, timeoutInSecond?: number): Promise<boolean> {
        try {
            if (state) {
                return await this.btnHangUpDisable.isDisplayed(timeoutInSecond);
            } else {
                return await this.btnHangUp.isDisplayed(timeoutInSecond);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHungUpDisplayed, err.message);
        }
    }

    /**	
	 * is Hold timer displayed
     * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHoldTimerDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblHoldTimer.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldTimerDisplayed, err.message);
        }
    }

    /**	
	 * is Hold title displayed
     * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHoldTitleDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblHolding.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldTitleDisplayed, err.message);
        }
    }

    /**	
     * is Hang up button disable
     * @author Nhat.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isHangUpDisabled(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnHangUpDisable.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHangUpDisabled, err.message);
        }
    }

    /**	
     * Check if "Save and Callback" button displayed
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isSaveAndCallbackButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnSaveAndCallback.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaveAndCallbackButtonDisplayed, err.message);
        }
    }

    /**	
     * Get "Save and Callback" button help text when hovered over
     * @author Tuan.Vu
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async getSaveAndCallbackButtonHelpText(): Promise<string> {
        try {
            return await this.btnSaveAndCallback.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSaveAndCallbackButtonHelpText, err.message);
        }
    }

    /**	
    * check Red Color Of Holding Button
    * @author Nhat.Nguyen
    * @returns {Promise<boolean>}
    * @memberof MaxCall
    */
    public async checkRedColorOfHoldingButton(): Promise<boolean> {
        try {
            let colorName: string = Utility.getColorNameByCode(await this.btnHoldSelected.getCssValue("background-color"));
            return (colorName == "red");
        } catch (err) {
            throw new errorwrapper.CustomError(this.checkRedColorOfHoldingButton, err.message);
        }
    }

    /**	
    * check new call active
    * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async checkNewCallActive(phoneNumber: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblNewCall(phoneNumber).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.checkNewCallActive, err.message);
        }
    }

    /**	
    * click Conference With Call Number
    * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async clickConferenceWithCallNumber(phoneNumber: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Conference button`);
            await this.btnConferenceWithCallNumber(phoneNumber).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConferenceWithCallNumber, err.message);
        }
    }

    /**	
    * check Main call active
    * @author Nhat.Nguyen
     * @param {string} phoneNumber
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async checkMainCallActive(phoneNumber: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblMainCall(phoneNumber).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.checkMainCallActive, err.message);
        }
    }

    /**	
    * Click transfer with call number
    * @author Nhat.Nguyen
     * @param {string} phoneNumber 
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async clickTransferWithCallNumber(phoneNumber: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking transfer button`);
            await this.btnTransferWithCallNumber(phoneNumber).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferWithCallNumber, err.message);
        }
    }

    /**
     * Click Add Contact button
     * @author Tan.Ta
     * @returns {Promise<MaxCall>}
     * @memberof MaxCall
     */
    public async clickAddContactButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Clicking Add Contact button");
            await this.btnAddContact.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddContactButton, err.message);
        }
    }

    /**
    * End a call require disposition contact 
    * @author Tan.Ta
    * @returns {Promise<MaxCall>}
    * @memberof MaxCall
    */
    public async endCallRequireDispositionContact(): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, `Ending a call disposition contact`);
            await this.clickEndContactButton();
            await this.btnConfirmEndContact.click();
            return MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endCallRequireDispositionContact, err.message);
        }
    }

    /**	
     * Check the narrow button is center below launch button or not
     * @author Anh.Ho
     * @param {number} [timeoutInSecond] Time to wait for element 
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isNarrowCenterBelowLaunchButton(timeoutInSecond?: number): Promise<boolean> {
        try {

            // Get bottom center position of Launch button
            let locationLaunchButton: ILocation = await this.btnLaunch.getLocation(timeoutInSecond);
            let sizeLaunchButton: ISize = await this.btnLaunch.getSize(timeoutInSecond);
            let x_bottomCenter: number = await locationLaunchButton.x + sizeLaunchButton.width / 2;
            let y_bottomCenter: number = await locationLaunchButton.y + sizeLaunchButton.height;

            // Get center position of arrow
            let left_arrow: number = parseFloat(String(await BrowserWrapper.executeScript(`return window.getComputedStyle(document.querySelector("[data-state='callContact']"), ":after").getPropertyValue('left').replace("px","");`)))
            let top_arrow: number = parseFloat(String(await BrowserWrapper.executeScript(`return window.getComputedStyle(document.querySelector("[data-state='callContact']"), ":after").getPropertyValue('top').replace("px","");`)))
            let width_arrow: number = parseFloat(String(await BrowserWrapper.executeScript(`return window.getComputedStyle(document.querySelector("[data-state='callContact']"), ":after").getPropertyValue('width').replace("px","");`)))

            // Get Launch Popover
            let locationLaunchPopover: ILocation = await this.btnLaunchPopover.getLocation(timeoutInSecond);
            let sizeLaunchPopover: ISize = await this.btnLaunchPopover.getSize(timeoutInSecond);

            // On IE, the arrow left value equal with a half of launch popover size plus a constant (27px)
            // The arrow width value will be approximate with height value (height=top, top value according to launch popover)
            if (TestRunInfo.browser == Browser.IE) {
                left_arrow = sizeLaunchPopover.width / 2 + 27;
                width_arrow = Math.abs(top_arrow);
            }

            // Get top center arrow
            let x_topCenterArrow: number = (locationLaunchPopover.x + left_arrow + width_arrow / 2);
            let y_topCenterArrow: number = (locationLaunchPopover.y + (top_arrow / 2));

            // Compare position between bottom center of Launch button and top center of arrow
            let x_tolerance: number = x_bottomCenter - x_topCenterArrow;
            let y_tolerance: number = y_bottomCenter - y_topCenterArrow;

            let x_compare: number = Math.abs(x_tolerance);
            let y_compare: number = Math.abs(y_tolerance);

            if (x_compare <= 5 && y_compare <= 5) {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isNarrowCenterBelowLaunchButton, err.message);
        }
    }

    /**
	 * Check if Transfer Contact Button is displayed or not
	 * @author Tan.Ta
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isTransferContactButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnTransferContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferContactButtonDisplayed, err.message);
        }
    }

    /**	
     * Get "Save and Redial" button help text when hovered over
     * @author Anh.Ho
     * @returns {Promise<string>}
     * @memberof MaxCall
     */
    public async getSaveAndRedialButtonHelpText(): Promise<string> {
        try {
            return await this.btnSaveAndRedial.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSaveAndRedialButtonHelpText, err.message);
        }
    }

    /**	
     * Check if "Save and Redial" button displayed
     * @author Anh.Ho
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isSaveAndRedialButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnSaveAndRedial.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSaveAndRedialButtonDisplayed, err.message);
        }
    }

    /**
	 * Check if Call Transfer Contact Button is displayed or not
	 * @author Chinh.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isCallTransferContactButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCallTransferContact.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallTransferContactButtonDisplayed, err.message);
        }
    }

    /**
     * Getting color of call workspace
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof MaxCall
     */
    public async getCallWorkSpaceColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of call workspace")
            return await this.pnlCallWorkspace.getCssValue("color");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCallWorkSpaceColor, err.message);
        }
    }

    /**
     * Check size of call work space in range
     * @author Y.Le
     * @param {number} expectedSize
     * @param {number} [tolerance]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallWorkspaceSizeInRange(expectedSize: number, tolerance?: number): Promise<boolean> {
        try {
            let callWorkspace: ISize = await this.getContactWorkSpaceSize(ContactName.PHONE_CALL);
            return Utility.isNumberInRange(callWorkspace.width, expectedSize, tolerance);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallWorkspaceSizeInRange, err.message);
        }
    }

    /**	
        * Click on Transfer/Conf button
        * @author Chinh.Nguyen
        * @returns {Promise<MaxPage>}
        * @memberof MaxCall
        */
    public async clickTransferConfButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Transfer/Conf button`);
            await this.btnCallTransferContact.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConfButton, err.message);
        }
    }    

    /**	
	 * Get fill color IVR pad
     * @author W.Plaza
	 * @returns {Promise<string>}
	 * @memberof MaxCall
	 */
    public async getKeyPadFillColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting fill color of IVR pad`);
            return await this.pnlKeyPad.getCssValue("fill");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getKeyPadFillColor, err.message);
        }
    }

    /**	
	 * Check if IVR buttom key pad is displayed
     * @author W.Plaza
     * @param {(string | number)} key
     * @param {number} [timeoutInSecond]
     * @returns {Promise<string>}
     * @memberof MaxCall
     */
    public async getBtnKeyPadFillColor(key: string | number, timeoutInSecond?: number): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, `Getting fill color of IVR button key pad`);
            return await this.btnKeyPad(key).getCssValue("fill");
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBtnKeyPadFillColor, err.message);
        }
    }

    /**	
	 * Click Key Pad button
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickBtnKeypad(key: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking on IVR key pad button number: ${key}`);
            await this.btnKeyPad(key).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickBtnKeypad, err.message);
        }
    }

    /**	
     * Get IVR number text
     * @author W.Plaza
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async getIvrTypedNumberText(): Promise<string> {
        try {
            return await this.lblIvrText.getControlTitle();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getIvrTypedNumberText, err.message);
        }
    }

    /**	
     * Get IVR typed number color
     * @author W.Plaza
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async getIvrTextColor(): Promise<string> {
        try {
            return await this.lblIvrText.getCssValue('color');
        } catch (err) {
            throw new errorwrapper.CustomError(this.getIvrTextColor, err.message);
        }
    }

    /**
         * Click on Conference button while holding 
         * @author W.plaza
         * @returns {Promise<MaxPage>}
         * @memberof MaxCall
         */
        public async clickConferenceWhileHolding(): Promise<MaxCall> {
            try {
                await Logger.write(FunctionType.UI, "Clicking on Conference while holding button in transfer");
                await this.btnConferenceHolding.click();
                return this;
            } catch (err) {
                throw new errorwrapper.CustomError(this.clickConferenceWhileHolding, err.message);
            }
        }
}
