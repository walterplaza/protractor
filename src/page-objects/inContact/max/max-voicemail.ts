import { MAXWorkspaceSize } from "@data-objects/general/max";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by } from "protractor";
import MaxTransferPage from "./max-transfer-page";
import { ISize } from "selenium-webdriver";
import ProjectPath from "@test-data/general/project-path";
import MaxCall from "./max-call";

export default class MaxVoiceMailPage extends MaxPage {
    private static _maxVoiceMailPage: MaxVoiceMailPage = null;

    protected lblCustomerName = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//h1[@class='contact-name']"));
    protected lblContactTime = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[@class='contact-time']"));
    protected lblStartTime = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[contains (@class,'text-left')]"));
    protected lblEndTime = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[contains (@class,'reversed text-right')]"));
    protected btnBack = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='back-button']"));
    protected btnHold = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='hold-button']"));
    protected btnCallBack = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='callback']"));
    protected btnLaunch = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='launch']"));
    protected btnEnd = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='end']"));
    protected btnResume = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='resume']"));
    protected btnDiscard = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='confirm-end-contact']"));

    protected icoVMCustomerContact = new ElementWrapper(by.xpath("//div[@class='voice-mail-section']//div[@class='primary-info']/*[name()='svg']"));
    protected pbpProgress = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[@class='progress-section row']"));
    protected pulLaunchMenu = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[@class='popover-panel indicator-ui']"));
    protected pulCallBackMenu = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[@class='popover-panel voicemail-callback']"));

    //Launch menu
    protected btnNewCommitment = new ElementWrapper(by.xpath("//h1[text()='New Commitment']/ancestor::li[@class='clickable indicator-template']"));
    protected btnTransfer = new ElementWrapper(by.xpath("//h1[text()='Transfer']/ancestor::li[@class='clickable indicator-template']"));
    protected popCommitment = new ElementWrapper(by.xpath("//div[@class='popover-panel commitment-add-panel']"));

    //Callback menu
    protected btnCall = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//button[@class='call']"));
    protected txtPhoneNumber = new ElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//input[@class='phone-number']"));
    protected cbbSkill = new SelectElementWrapper(by.xpath("//div[@class='voice-mail voicemailcontactui']//div[@class='selectmenu-button skill-list']"));
    protected popCallBack = new ElementWrapper(by.xpath("//div[@class='popover-panel voicemail-callback']"));

    public static async getInstance(): Promise<MaxVoiceMailPage> {
        this._maxVoiceMailPage = new MaxVoiceMailPage();
        return this._maxVoiceMailPage;
    }

    // Dynamic controls
    protected lblSkillInfo(skillName: string, skillId: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='voicemail-contact-glance-ui voicemailcontactglanceui']//div[@class='skill-name'][text()='${skillName} (${skillId})']`));
    }

    protected lblCallBackSkillInfo(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='voice-mail voicemailcontactui']//div[@class='selectmenu-button skill-list']/div[@class='selectmenu-text'][text()='${skillName}']`));
    }

    /**
	 * Check Customer name is displayed or not
	 * @returns {Promise<boolean>} the existence of Customer name
	 * @memberof MaxVoiceMailPage
	 */
    public async isCustomerNameLabelDisplayed(): Promise<boolean> {
        try {
            return this.lblCustomerName.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCustomerNameLabelDisplayed, err.message);
        }
    }

    /**
	 * Check Contact time is displayed or not
	 * @returns {Promise<boolean>} the existence of Contact time
	 * @memberof MaxVoiceMailPage
	 */
    public async isContactTimeLabelDisplayed(): Promise<boolean> {
        try {
            return this.lblContactTime.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isContactTimeLabelDisplayed, err.message);
        }
    }

    /**
	 * Check End time is displayed or not
	 * @returns {Promise<boolean>} the existence of Start time
	 * @memberof MaxVoiceMailPage
	 */
    public async isStartTimeLabelDisplayed(): Promise<boolean> {
        try {
            return this.lblStartTime.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isStartTimeLabelDisplayed, err.message);
        }
    }

    /**
	 * Check End time is displayed or not
	 * @returns {Promise<boolean>} the existence of End time
	 * @memberof MaxVoiceMailPage
	 */
    public async isEndTimeLabelDisplayed(): Promise<boolean> {
        try {
            return await this.lblEndTime.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndTimeLabelDisplayed, err.message);
        }
    }

    /**
	 * Check Back button is displayed or not
	 * @returns {Promise<boolean>} the existence of Back button
	 * @memberof MaxVoiceMailPage
	 */
    public async isBackButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnBack.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBackButtonDisplayed, err.message);
        }
    }

    /**
    * Check Launch button is displayed or not
    * @returns {Promise<boolean>} the existence of Launch button
    * @memberof MaxVoiceMailPage
    */
    public async isLaunchButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnLaunch.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
        }
    }

    /**
	 * Check Callback button is displayed or not
	 * @returns {Promise<boolean>} the existence of Callback button
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallBackButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnCallBack.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallBackButtonDisplayed, err.message);
        }
    }

    /**
	 * Check End button is displayed or not
	 * @returns {Promise<boolean>} the existence of End button
	 * @memberof MaxVoiceMailPage
	 */
    public async isEndButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnEnd.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
        }
    }

    /**
	 * Check Hold button is displayed or not
	 * @returns {Promise<boolean>} the existence of Hold button
	 * @memberof MaxVoiceMailPage
	 */
    public async isHoldButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnHold.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isHoldButtonDisplayed, err.message);
        }
    }

    /**
	 * Check VM customer contact icon is displayed or not
	 * @returns {Promise<boolean>} the existence of VM customer contact icon
	 * @memberof MaxVoiceMailPage
	 */
    public async isVMCustomerContactIconDisplayed(): Promise<boolean> {
        try {
            return await this.icoVMCustomerContact.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isVMCustomerContactIconDisplayed, err.message);
        }
    }

    /**
	 * Open Launch menu
	 * @returns {Promise<void>}
	 * @memberof MaxVoiceMailPage
	 */
    public async openLaunchMenu(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Opening Launch menu`);
            await this.btnLaunch.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openLaunchMenu, err.message);
        }
    }

    /**
	 * Open Callback menu
	 * @returns {Promise<void>}
	 * @memberof MaxVoiceMailPage
	 */
    public async openCallbackMenu(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Opening Callback menu`);
            await this.btnCallBack.click();
            await this.popCallBack.waitForControlStable();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCallbackMenu, err.message);
        }
    }

    /**
	 * Check Launch menu is displayed or not
	 * @returns {Promise<boolean>} the existence of Launch menu
	 * @memberof MaxVoiceMailPage
	 */
    public async isLaunchMenuDisplayed(): Promise<boolean> {
        try {
            return await this.pulLaunchMenu.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchMenuDisplayed, err.message);
        }
    }

    /**
	 * Check Callback menu is displayed or not
	 * @returns {Promise<boolean>} the existence of Callback menu
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallBackMenuDisplayed(): Promise<boolean> {
        try {
            return await this.pulCallBackMenu.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallBackMenuDisplayed, err.message);
        }
    }

    /**
	 * Check Callback call button is displayed or not
	 * @returns {Promise<boolean>} the existence of call button
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallbackCallButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnCall.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallbackCallButtonDisplayed, err.message);
        }
    }

    /**
	 * Check Callback phone number is displayed or not
	 * @returns {Promise<boolean>} the existence of Callback phone number
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallbackPhoneNumberDisplayed(): Promise<boolean> {
        try {
            return await this.pulCallBackMenu.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallbackPhoneNumberDisplayed, err.message);
        }
    }

    /**
	 * Check Callback skill list is displayed or not
	 * @returns {Promise<boolean>} the existence of Callback skill list
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallbackSkillListDisplayed(): Promise<boolean> {
        try {
            return await this.cbbSkill.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallbackSkillListDisplayed, err.message);
        }
    }

    /**
     * Open New Commitment popup
     * @returns {Promise<void>}
     * @memberof MaxVoiceMailPage
     */
    public async openNewCommitment(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Opening New Commitment popup`);
            await this.btnNewCommitment.click();
            await this.popCommitment.waitForControlStable();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openNewCommitment, err.message);
        }
    }

    /**
	 * Open Transfer popup
	 * @returns {Promise<void>}
	 * @memberof MaxVoiceMailPage
	 */
    public async openTransfer(): Promise<MaxTransferPage> {
        try {
            await Logger.write(FunctionType.UI, `Opening Transfer popup`);
            await this.btnTransfer.click();
            await this.popAddressBook.waitForControlStable();
            return MaxTransferPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.openTransfer, err.message);
        }
    }

    /**
	 * Check New Commitment popup is displayed or not
	 * @returns {Promise<boolean>} the existence of New Commitment popup
	 * @memberof MaxVoiceMailPage
	 */
    public async isCommitmentPopupDisplayed(): Promise<boolean> {
        try {
            return await this.popCommitment.isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitmentPopupDisplayed, err.message);
        }
    }

    /**
     * Action end voice mail contact
     * @author Huy.Nguyen
     * @param {boolean} resume 
     * @returns {Promise<void>}
     */
    private async endVoiceMail(resume: boolean): Promise<void> {
        try {
            await this.voiceMailWorkingSpace.waitUntilCssValueNotChange("width");
            await this.btnEnd.waitForControlStable();
            await this.btnEnd.click();
            await this.btnEnd.waitUntilDisappear();

            if (resume) {
                await this.btnResume.waitForVisibilityOf();
                await this.btnResume.click();
            } else {
                await this.btnDiscard.waitForPresenceOf();
                await this.btnDiscard.click();
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.endVoiceMail, err.message);
        }
    }

    /**	
	 * End Voice mail contact without disposition require
     * @param {boolean} resume Want to resume or not
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
    public async endVoiceMailContact(resume: boolean = false): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Voicemail contact");
            await this.endVoiceMail(resume);
            await this.voiceMailWorkingSpace.waitUntilDisappear();
            return await MaxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endVoiceMailContact, err.message);
        }
    }

    /**	
	 * Check if Skill Info is displayed or not
     * @param {string} skillInfo Skill name or skill id
	 * @returns {Promise<boolean>}
	 * @memberof MaxVoiceMailPage
	 */
    public async isSkillInfoDisplayed(skillType: SkillType, skillId: number): Promise<boolean> {
        try {
            return await this.lblSkillInfo(SkillCore.getSkillName(skillType), skillId).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillInfoDisplayed, err.message);
        }
    }

    /**	
     * Check if VoiceMailWorkSpace is cut off or not
     * @author Chinh.Nguyen
     * @returns {Promise<boolean>}
     * @memberof MaxVoiceMailPage
     */
    public async isVoiceMailWorkSpaceCutOff(): Promise<Boolean> {
        try {
            let voicemailWorkSpace: string = await this.voiceMailWorkingSpace.getCssValue("width");
            let widthValue: number = parseInt(voicemailWorkSpace.substring(0, voicemailWorkSpace.length - 2));
            return (parseInt(MAXWorkspaceSize.WIDTH_VOICEMAIL) > widthValue);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isVoiceMailWorkSpaceCutOff, err.message);
        }
    }

    /**	
	 * End Voice mail contact and wait for disposition
     * @author Huy.Nguyen
     * @param {boolean} resume Want to resume or not
	 * @returns {Promise<MaxDispositionPage>}
	 * @memberof MaxVoiceMailPage
	 */
    public async endVoiceMailRequireDisposition(resume: boolean = false): Promise<MaxDispositionPage> {
        try {
            await Logger.write(FunctionType.UI, "Ending Voicemail contact with require disposition");
            await this.endVoiceMail(resume);
            return await MaxDispositionPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.endVoiceMailRequireDisposition, err.message);
        }
    }

    /**	
	 * Check if Skill display in the CallBack dropdowm menu
     * @param {string} skillType Skill type name
	 * @returns {Promise<boolean>}
	 * @memberof MaxVoiceMailPage
	 */
    public async isCallBackSkillInfoDisplayed(skillType: SkillType): Promise<boolean> {
        try {
            return await this.lblCallBackSkillInfo(SkillCore.getSkillName(skillType)).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallBackSkillInfoDisplayed, err.message);
        }
    }

    /**
     * Check size of call work space in range
     * @author W.Plaza
     * @param {number} expectedSize
     * @param {number} [tolerance]
     * @returns {Promise<boolean>}
     * @memberof MaxVoiceMailPage
     */
    public async isVoicemailWorkspaceSizeInRange(expectedSize: number, tolerance?: number): Promise<boolean> {
        try {
            let voicemailWorkspace: ISize = await this.getContactWorkSpaceSize(ContactName.VOICE_MAIL);
            return Utility.isNumberInRange(voicemailWorkspace.width, expectedSize, tolerance);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isVoicemailWorkspaceSizeInRange, err.message);
        }
    }

    /**
     * Check size of call work space in range
     * @author W.Plaza
     * @param {number} expectedSize
     * @param {number} [tolerance]
     * @returns {Promise<boolean>}
     * @memberof MaxVoiceMailPage
     */
    public async isVoicemailContactPanelHightSizeInRange(expectedSize: number, tolerance?: number): Promise<boolean> {
        try {
            let voicemailWorkspace: ISize = await this.getContactPanelSize();
            return Utility.isNumberInRange(voicemailWorkspace.height, expectedSize, tolerance);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isVoicemailContactPanelHightSizeInRange, err.message);
        }
    }

    /**
	 * Make Callback call
     * @author W.Plaza
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxVoiceMailPage
	 */
    public async makeCallbackCall(): Promise<MaxCall> {
        try {
            await Logger.write(FunctionType.UI, `Making a Callback call`);
            await this.btnCall.click();
            let maxCall = require(`${ProjectPath.pageObjects}/inContact/max/max-call`).default;
			return maxCall.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.makeCallbackCall, err.message);
        }
    }
}