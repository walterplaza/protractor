
import MaxDispositionPage from "@page-objects/CXone/max/max-disposition";
import MaxPage from "@page-objects/CXone/max/max-page";
import MaxTransfer from "@page-objects/CXone/max/max-transfer-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { TimeOffRequest } from "@data-objects/CXone/myzone/time-off-request-info";
import StopWatch from "@utilities/general/stop-watch";
import TestRunInfo from "@data-objects/general/test-run-info";
export default class MaxCall extends MaxPage {

    private static _maxCall: MaxCall = null;

    constructor() { super(); }

    protected lblDialling = new ElementWrapper(by.xpath("//div[@class='contact-info']//span[@class='state-name'][text()='Dialing']"));
    protected lblTotalContactTime = new ElementWrapper(by.xpath("//h3[@class='total-contact-time']"));
    protected lblAni = new ElementWrapper(by.xpath("//h3[@class='ani']"));
    protected lblCustomerContact = new ElementWrapper(by.xpath("//h1[@class='contact-label']"));
    protected icoCustomerContact = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui']//div[@class='primary-info']/*[name()='svg']"));
    protected btnHold = new ElementWrapper(by.xpath("//button[@class='hold']"));
    protected btnHoldSelected = new ElementWrapper(by.xpath("//button[@class='hold selected']"));
    protected btnMute = new ElementWrapper(by.xpath("//button[@class='mute']"));
    protected btnMuteSelected = new ElementWrapper(by.xpath("//button[@class='mute selected']"));
    protected btnMask = new ElementWrapper(by.xpath("//button[@class='mask']"));
    protected btnMaskSelected = new ElementWrapper(by.xpath("//button[@class='mask selected']"));
    protected btnRecord = new ElementWrapper(by.xpath("//button[@class='record' or @class='record disabled']"));
    protected btnRecordSelected = new ElementWrapper(by.xpath("//button[@class='record selected']"));
    protected btnCommit = new ElementWrapper(by.xpath("//div[@id='contactSection']//button[@class='commitment active-add-commitment']"));
    protected btnTransferContact = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='secondary-controls']//button[@class='init-transfer-contact' or @class='transfer']"));
    protected btnEndContact = new ElementWrapper(by.xpath("//button[@class='end-contact' or @class='end-contact disabled']"));
    protected btnLaunch = new ElementWrapper(by.xpath("//div[@id='contactSection']//button[@class='launch']"));
    protected pnlKeyPad = new ElementWrapper(by.xpath("//div[@id='keypadui-0']//a/*[name()='svg']"));
    protected pnlAddressBook = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel advanced-address-book-ui']"));
    protected pnlCommitment = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel commitment-add-panel']"));
    protected pnlIndicator = new ElementWrapper(by.xpath("//div[@id='contactSection']//div[@class='popover-panel indicator-ui']"));
    protected btnConfirmEndContact = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
    protected btnResume = new ElementWrapper(by.xpath("//button[@class='resume']"));
    protected pnlBackground = new ElementWrapper(by.xpath("//div[@class='popover-background']"));
    protected btnTransferActiveConference = new ElementWrapper(by.xpath("//div[@data-status='Active']//div[@class = 'conference-transfer-controls']//button[@class = 'transfer-contact left']"));
    protected btnCall = new ElementWrapper(by.xpath("//ul[@class='result-list']//div[@class='call-controls']/button[@class='call']"))
    protected btnTransfer = new ElementWrapper(by.xpath("//div[@class='call-contact-body-ui' and @data-status='Active']//button[@class='transfer-contact left']"));
    protected pnlActiveCall = new ElementWrapper(by.xpath("//div[@class='workspace-wrapper']//div[@class='call-contact-body-ui']"));
    protected btnColdTransfer = new ElementWrapper(by.xpath("//div[@id='callcontactui-1_container']//button[@class='cold-transfer-contact']"));

    // Transfer
    protected tabRecentAddressBook = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='recent']"));
    protected tabHistoryAddressBook = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='history']"));
    protected tabMyTeamAddressBook = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='my-team']"));
    protected tabOther = new ElementWrapper(by.xpath("//li[contains(@id,'advancedaddressbookui')][@data-tab-type='other']"));
    protected txtSearchAgentAddressBook = new ElementWrapper(by.xpath("//div[contains(@id,'advancedaddressbooksearchui')]//input[@type='search']"));


    public static async getInstance(): Promise<MaxCall> {
        this._maxCall = new MaxCall();
        await this._maxCall.waitForLoading();
        return this._maxCall;
    }

    // Dynamic controls
    protected lblSkillInfo(skillName: string, skillId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='contact-info']//h3[@class='skill-name'][text()='${skillName} (${skillId})']`));
    }

    protected btnKeyPad(key: string | number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='keypad-section-element']//a[@data-key='${key}']`));
    }

    protected lblAgentName(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='result-list']/li[.//h1[text()='${agentName}']]`));
    }

    protected lblAgentStatusAddressBook(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'advancedaddressbookmyteamui')]//li[.//h1[text()='${agentName}']]//p[@class='state ellipsis']`));
    }

    protected btnCallAddressBook(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='result-list']/li[.//h1[text()='${agentName}']]//button[@title='Call']`));
    }

    protected pnlCallAgentSection(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='call-container'][.//h1[text()='${agentName}']]`));
    }

    protected btnConferenceAgent(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'callcontactui')][.//h1[text()='${agentName}']]//button[contains(@class,'conference-contact')]`));
    }

    protected btnTransferAgent(agentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@data-status='Active' and .//h1[text()='${agentName}']]//button[@class='transfer-contact left']`));
    }

    protected pnlCallSession(contactId: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'callcontactui')][@data-contactid='${contactId}']`));
    }

    protected lblMainCall(name: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//h1[text()='${name}' and @class='contact-label']`));
    }
    /**	
	 * Check if ToTal Contact Time is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isToTalContactTimeDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.lblTotalContactTime.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isToTalContactTimeDisplayed, err.message);
        }
    }

    /**	
	 * Check if Ani is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isAniDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.lblAni.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAniDisplayed, err.message);
        }
    }
    /**	
	 * Check if Customer Contact Label is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCustomerContactLabelDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.lblCustomerContact.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerContactLabelDisplayed, err.message);
        }
    }
    /**	
	 * Check if Customer Contact Icon is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCustomerContactIconDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.icoCustomerContact.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerContactIconDisplayed, err.message);
        }
    }

    /**	
	 * Check if Hold Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isHoldButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnHold.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Mute Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isMuteButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnMute.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMuteButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Mask Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isMaskButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnMask.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaskButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Record Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isRecordButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnRecord.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRecordButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Commit Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCommitButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnCommit.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Transfer Contact Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isTransferContactButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnTransferContact.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTransferContactButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if End Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isEndButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnEndContact.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Launch Button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isLaunchButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.btnLaunch.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Key Pad is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isKeyPadDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.pnlKeyPad.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isKeyPadDisplayed, err.message);
        }
    }

    /**	
	 * Check if Skill Info is displayed or not
     * @author Y.Le
     * @param {string} skillInfo Skill name or skill id
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isSkillInfoDisplayed(skillName: string, skillId: number, timeOut?: number): Promise<boolean> {
        try {
            return await this.lblSkillInfo(skillName, skillId).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillInfoDisplayed, err.message);
        }
    }

    /**	
	 * Click Key Pad
     * @author Y.Le
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
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isKeyDisplayed(key: string | number, timeOut?: number): Promise<boolean> {
        try {
            return this.btnKeyPad(key).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isKeyDisplayed, err.message);
        }
    }

    /**	
	 * Click on Transfer and Conference button
     * @author Y.Le
	 * @returns {Promise<MaxTransfer>}
	 * @memberof MaxCall
	 */
    public async clickTransferConferenceButton(): Promise<MaxTransfer> {
        try {
            await this.btnTransferContact.click();
            return MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }
    
    /**	
	 * Click on Transfer and Conference button
     * @author Lien.Nguyen
	 * @returns {Promise<MaxTransfer>}
	 * @memberof MaxCall
	 */
    public async clickTransferActiveConferenceButton(): Promise<MaxTransfer> {
        try {
            await this.btnTransferActiveConference.click();
            return MaxTransfer.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferConferenceButton, err.message);
        }
    }

    /**	
	 * Check if Address Book is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isAddressBookDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlAddressBook.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddressBookDisplayed, err.message);
        }
    }

    /**	
	 * Click on Commit button
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickCommitButton(): Promise<MaxCall> {
        try {
            await this.btnCommit.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCommitButton, err.message);
        }
    }

    /**	
	 * Check if Commitment is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCommitmentDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlCommitment.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitmentDisplayed, err.message);
        }
    }

    /**	
	 * Click on Launch button
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickLaunchButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Launch button`);
            await this.btnLaunch.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickLaunchButton, err.message);
        }
    }

    /**	
	 * Check if Indicator is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isIndicatorDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlIndicator.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isIndicatorDisplayed, err.message);
        }
    }

    /**	
	 * Click on Hold button
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickHoldButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Hold button`);
            await this.btnHold.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickHoldButton, err.message);
        }
    }

    /**	
	 * Click on UnHold button
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickUnHoldButton(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking UnHold button`);
            await this.btnHoldSelected.click();
            await this.btnHoldSelected.waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickUnHoldButton, err.message);
        }
    }

    /**	
	 * Click on Mute button
     * @author Y.Le
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
     * @author Y.Le
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
     * @author Y.Le
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
     * @author Y.Le
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
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxCall
	 */
    public async clickRecordButton(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Record button`);
            await this.btnRecord.click();
            await this.btnRecordSelected.waitForPresenceOf();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickRecordButton, err.message);
        }
    }

    /**	
	 * Check if Call is held or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCallHeld(state: boolean = true, timeOutInSeconds?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnHoldSelected.isDisplayed(timeOutInSeconds);
            else
                return await this.btnHold.isDisplayed(timeOutInSeconds);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallHeld, err.message);
        }
    }

    /**	
	 * Check if Call is muted or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCallMuted(state: boolean = true, timeOut?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnMuteSelected.isDisplayed(timeOut);
            else
                return await this.btnMute.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallMuted, err.message);
        }
    }

    /**	
	 * Check if Call is maksed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCallMasked(state: boolean = true, timeOut?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnMaskSelected.isDisplayed(timeOut);
            else
                return await this.btnMask.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallMasked, err.message);
        }
    }

    /**	
	 * Check if Call is recorded or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isCallRecorded(state: boolean = true, timeOut?: number): Promise<boolean> {
        try {
            if (state)
                return await this.btnRecordSelected.isDisplayed(timeOut);
            else
                return await this.btnRecord.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallRecorded, err.message);
        }
    }

    /**	
	 * Click on End Contact button
     * @author Y.Le
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
     * @author Y.Le
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxCall
	 */
    public async clickConfirmEndContactButton(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Confirm button`);
            await this.btnConfirmEndContact.click();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConfirmEndContactButton, err.message);
        }
    }

    /**	
	 * Check if Resume button is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isResumeButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnResume.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isResumeButtonDisplayed, err.message);
        }
    }

    /**	
	 * Check if Confirm End Contact is displayed or not
     * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isConfirmEndContactDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnConfirmEndContact.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConfirmEndContactDisplayed, err.message);
        }
    }

    /**
	 * Wating for call dialling
     * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof MaxCall
	 */
    public async waitForCallDialling(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for call dialling");
            await this.lblDialling.waitUntilDisappear();
            await this.btnRecord.waitForControlStable();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCallDialling, err.message);
        }
    }

    /**
     * Opening my team tab in address book
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async openMyTabAddressBook(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening my team tab in address book");
            await this.tabMyTeamAddressBook.click();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openMyTabAddressBook, err.message);
        }
    }
    /**
     * Filtering agent name in address book
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async filterAgentNameAddressBook(agentName: string): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Filtering agent name in address book");
            await this.txtSearchAgentAddressBook.type(agentName);
            await this.lblAgentName(agentName).waitForControlStable();
            return MaxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.filterAgentNameAddressBook, err.message);
        }
    }

    /**
     * Getting status of agent in address book
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<string>}
     * @memberof MaxCall
     */
    public async getAgentStatusAddressBook(agentName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting status of agent in address book");
            let status: string = await this.lblAgentStatusAddressBook(agentName).getControlTitle();
            return await status;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentStatusAddressBook, err.message);
        }
    }

    /**
     * Checked agent result displayed
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isAgentResultDisplayed(agentName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.lblAgentName(agentName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAgentResultDisplayed, err.message);
        }
    }

    /**
     * Calling to agent from address book agent list
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async callAgentFromAddressBook(agentName: string): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Calling to agent from address book agent list");
            await this.lblAgentName(agentName).moveMouse();
            await this.btnCallAddressBook(agentName).wait();
            await this.btnCallAddressBook(agentName).moveMouse();
            await this.btnCallAddressBook(agentName).click();
            await this.pnlCallAgentSection(agentName).waitForVisibilityOf();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.callAgentFromAddressBook, err.message);
        }
    }

    /**
     * Creating conference with agent name
     * @author Y.Le
     * @param {string} agentName
     * @returns {Promise<this>}
     * @memberof MaxCall
     */
    public async clickConferenceWithAgent(agentName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Creating conference with agent name");
            await this.btnConferenceAgent(agentName).click();
            await this.btnConferenceAgent(agentName).waitUntilDisappear();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickConferenceWithAgent, err.message);
        }
    }

    /**
     * Checking conferencer button is displayed
     * @author Y.Le
     * @param {string} agentName
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isConferenceButtonDisappeared(agentName: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.btnConferenceAgent(agentName).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isConferenceButtonDisappeared, err.message)
        }
    }

    /**
     * Ending a call disposition contact
     * @author Y.Le
     * @returns {Promise<MaxDispositionPage>}
     * @memberof MaxCall
     */
    public async endCallRequireDispositionContact(): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, `Ending a call disposition contact\n`);
            await this.clickEndContactButton();
            await this.clickConfirmEndContactButton();
            return await MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endCallRequireDispositionContact, err.message);
        }
    }

    /**
     * Transfer a call
     * @author Chinh.Nguyen
     * @returns {Promise<MaxPage>}
     * @memberof MaxCall
     */
    public async clickTransferCall(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Transfer call button in transfer section");
            await this.btnTransfer.click();
            await this.btnTransfer.waitUntilDisappear();
            return MaxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferCall, err.message);
        }
    }

    /**
     * Click transfer button to finish a transfering a call
     * @author Huy.Nguyen
     * @returns {Promise<MaxPage>}
     * @memberof MaxCall
     */
    public async completeTransferCall(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Complete transfer a call\n`);
            await this.btnTransfer.waitForPresenceOf();
            await this.btnTransfer.click();
            let maxPage = require("./max-page").default;
            return maxPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.completeTransferCall, err.message);
        }
    }

    /**
     * Check call is resumed
     * @author Tan.Ta
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallResumed(timeOutInSeconds?: number): Promise<boolean> {
        try {
            return await this.pnlActiveCall.isDisplayed(timeOutInSeconds);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallResumed, err.message);
        }
    }

    /**
     * Transfer Active Conference call
     * @author Tung.Vo
     * @returns {Promise<this>}
     * @memberof MaxPage
     */
    public async transferActiveConferenceCall(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `transferring an active conference call\n`);
            await this.btnTransferActiveConference.click()
            return MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferActiveConferenceCall, err.message);
        }
    }
    /**	
    * Click on Transfer with agent
    * @author Nhat.Nguyen
    * @returns {Promise<MaxPage>}
    * @memberof MaxCall
    */
    public async clickTransferWithAgent(agentName: string): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking transfer with agent`);
            await this.btnTransferAgent(agentName).click();
            return MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickTransferWithAgent, err.message);
        }
    }

    /**
     * Check call session by contactId in call conference call or multi-contact displayed or not
     * @author Y.Le
     * @param {string} contactId
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async isCallSessionDisplayed(contactId: string, timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlCallSession(contactId).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallSessionDisplayed, err.message);
        }
    }

    /**	
    * check Main call active
    * @author Y
     * @param {string} phoneNumber
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxCall
     */
    public async checkMainCallActive(name: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblMainCall(name).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.checkMainCallActive, err.message);
        }
    }

    /**
     * Click Cold transfer button
     * @author Tan.Ta
     * @param {string} name
     * @param {number} [timeoutInSecond]
     * @returns {Promise<void>}
     * @memberof MaxCall
     */
    public async clickColdTransfer(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Clicking Cold transfer button`);
            await this.btnColdTransfer.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.checkMainCallActive, err.message);
        }
    }

    public async waitForCallWorkspaceDisappear(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Waiting for Call workspace disappear`);
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            let state: boolean = await this.pnlCallWorkspace.isDisplayed(TestRunInfo.shortTimeout);

            while (state == true && stopTime <= 60) {
                state = await this.pnlCallWorkspace.isDisplayed(TestRunInfo.shortTimeout);
                stopTime = stopWatch.getElapsedTimeInSecond();
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCallWorkspaceDisappear, err.message);
        }
    }
}


