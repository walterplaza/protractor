import TestRunInfo from "@data-objects/general/test-run-info";
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Key } from "protractor";
import { ILocation } from "selenium-webdriver";

export default class MaxSMSPage extends MaxPage {
	constructor() { super(); }
	private static _maxSMSPage: MaxSMSPage = null;
	protected btnEndSMS = new ElementWrapper(by.xpath("//button[@class = 'end-contact']"));
	protected btnConfirmEndSMSContact = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
	protected SMSWorkingSpace = new ElementWrapper(by.xpath("//div[@id='chatWorkspace']//div[@class='chat-contact-ui chatcontactui']"));
	protected chatContactUI = new ElementWrapper(by.xpath("//div[starts-with(@id,'chatcontactui')]"));
	protected lblCustomerContact = new ElementWrapper(by.xpath("//h1[@class='contact-label']"));
	protected icoCustomerContact = new ElementWrapper(by.xpath("//div[@class='chat-contact-body-ui']//div[@class='contact-info']//div[@class='contact-info-bar']/*[name()='svg']"));
	protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='chat-contact-body-ui']//button[@class='init-transfer-contact' or @class='transfer']"));
	protected btnEndContact = new ElementWrapper(by.xpath("//button[@class='end-contact' or @class='end-contact disabled']"));
	protected btnLaunch = new ElementWrapper(by.xpath("//button[@class='launch']"));
	protected txtInput = new ElementWrapper(by.xpath("//textarea[contains(@class,'message-text-input')]"));
	protected lblPOC = new ElementWrapper(by.xpath("//h3[@class='text-point-of-contact']"));
	protected lblTextCounter = new ElementWrapper(by.xpath("//div[@class='text-message-counter'][text()[contains(.,'/700')]]"));
	protected btnMoreHistory = new ElementWrapper(by.xpath("//h4[@class='button-text'][text()[contains(.,'+ More History')]]"));

	// Dynamic controls
	protected lblSkillInfo(skillName: string, skillId: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-info']//div[@class='chat-info']//h3[@class='skill-name'][text()='${skillName} (${skillId})']`));

	}

	public static getInstance(): MaxSMSPage {
		this._maxSMSPage = new MaxSMSPage();
		return this._maxSMSPage;
	}

	/**
	 * End SMS contact on MAX
	 * @returns {Promise<MaxPage>} MaxPage
	 * @memberof MaxSMSPage
	 */
	public async endSMSContact(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending SMS contact");
			await this.btnEndSMS.wait();
			await this.btnEndSMS.click();
			await this.btnEndSMS.waitUntilDisappear();
			await this.btnConfirmEndSMSContact.click();
			return await MaxPage.getMaxInstance(false);
		} catch (err) {
			throw new errorwrapper.CustomError(this.endSMSContact, err.message);
		}
	}

	/**
	 * SMS Working space is displayed or not
	 * @returns {Promise<boolean>} Return value of isSMSWorkingSpaceDisplayed
	 * @memberof MaxSMSPage
	 */
	public async isSMSWorkingSpaceDisplayed(): Promise<boolean> {
		try {
			return await this.SMSWorkingSpace.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSMSWorkingSpaceDisplayed, err.message);
		}
	}


	public async isCustomerContactLabelDisplayed(): Promise<boolean> {
		try {
			return await this.lblCustomerContact.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerContactLabelDisplayed, err.message);
		}
	}
    /**	
	 * Check if Customer Contact Icon is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isCustomerContactIconDisplayed(): Promise<boolean> {
		try {
			return await this.icoCustomerContact.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerContactIconDisplayed, err.message);
		}
	}

	/**	
	 * Check if Transfer Contact Button is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isTransferContactButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnTransferContact.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTransferContactButtonDisplayed, err.message);
		}
	}

    /**	
	 * Check if End Button is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isEndButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnEndContact.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
		}
	}

    /**	
	 * Check if Launch Button is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isLaunchButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnLaunch.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
		}
	}

	/**	
	* Check if POC is displayed or not
	* @returns {Promise<boolean>}
	* @memberof MaxSMSPage
	*/
	public async islabelPOCDisplayed(): Promise<boolean> {
		try {
			return await this.lblPOC.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.islabelPOCDisplayed, err.message);
		}
	}

	/**	
	 * Check if text input is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isTextInputDisplayed(): Promise<boolean> {
		try {
			return await this.txtInput.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTextInputDisplayed, err.message);
		}
	}


	/**	
	 * Check if Skill Info is displayed or not
     * @param {string} skillName 
	 * @param {string} skillId
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isSkillInfoDisplayed(skillName: string, skillId: number): Promise<boolean> {
		try {
			return await this.lblSkillInfo(skillName, skillId).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSkillInfoDisplayed, err.message);
		}
	}

	/**	
	 * Check if Text Counter is displayed or not
     * @param 
	 * 
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
	public async isMoreHistoryButtonDisplayed(): Promise<boolean> {
		try {
			return await this.lblTextCounter.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMoreHistoryButtonDisplayed, err.message);
		}
	}

	/**	
	 * Check if button "+ More History" is displayed or not
     * @param 
	 * 
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
	public async isTextCounterDisplayed(): Promise<boolean> {
		try {
			return await this.lblTextCounter.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTextCounterDisplayed, err.message);
		}
	}

}