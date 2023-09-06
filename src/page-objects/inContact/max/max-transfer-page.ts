import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { TransferTab } from "@data-objects/general/max";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { ILocation } from "selenium-webdriver";

export default class MaxTransferPage extends MaxPage {

	private static _maxTransferPage: MaxTransferPage = null;

	protected txtSearchAddress = new ElementWrapper(by.xpath("//div[@class='popover-panel advanced-address-book-ui']//input[@aria-label='Phone number or search term']"));
	protected popAddressBook = new ElementWrapper(by.xpath("//div[@class='popover-panel advanced-address-book-ui']"));
	protected btnTransferContact = new ElementWrapper(by.xpath("//div[@class='secondary-controls']//button[@class='init-transfer-contact' or @class='transfer']"));
	protected lstOtherSkill = new ElementWrapper(by.xpath("//li[@class='clickable queue-template popover-panel-item-template']/parent::ul[@class='item-list']"));

	// Dynamic controls

	protected lblAgentName(agentName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']/li[.//h1[text()='${agentName}']][@data-type='agent' or @data-type='queue']`));
	}
	protected lblAgentNameList(agentName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(` //ul[@class='result-list']/li[.//h1[contains(text(),'${agentName}')]]`));
	}

	protected lblEmailAddressBookItem(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='clickable queue-template popover-panel-item-template hover' or @class='clickable queue-template popover-panel-item-template'][@data-skillname='${skillName}']`));
	}

	protected addressBookItem(value: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[text()='${value}']/ancestor::ul/li[contains(@class,'template popover-panel-item-template')][1]`));
	}

	protected btnTransferContactInAddressBook(value: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[text()='${value}']/ancestor::ul/li[contains(@class,'agent-template')][1]//button[@class='transfer']`));
	}

	protected tabAdvanceAddressBook(tabName: TransferTab): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'advanced-address-book')]/ul[not(contains(@class,'hidden'))]/li[contains(@id,'${tabName}-tab')]`));
	}

	protected lblSearchResultAddressBook(text: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='search-content']/ul[@class='result-list']/li[.//h1[text()='${text}']]`))
	}

	protected tabTransfer(tabName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@data-tab-type='${tabName}']`));
	}

	protected lblOtherItem(item: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@data-addressbookname='${item}']`));
	}

	protected lblSkillItem(item: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='item-list']/li[@data-callbackvalue='${item}']`));
	}

	protected btnSkillItemTransfer(item: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='item-list']/li[@data-callbackvalue='${item}']//button[@title='Cold Transfer']`));
	}

	public static async getInstance(): Promise<MaxTransferPage> {
		this._maxTransferPage = new MaxTransferPage();
		this._maxTransferPage.waitForLoading();
		return this._maxTransferPage;
	}

	/**
	 * Check Address book is displayed or not
	 * @returns {Promise<boolean>} the existence of Add New dialog
	 * @memberof MaxPage
	 */
	public async isAddressBookDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.popAddressBook.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAddressBookDisplayed, err.message);
		}
	}

	/**
	 * Check Search text box exist to input number
	 * @returns {Promise<boolean>} the existence of Search text box
	 * @memberof MaxPage
	 */
	public async isSearchAddressDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.txtSearchAddress.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSearchAddressDisplayed, err.message);
		}
	}

	/**	
	 * Input value to address book
	 * @author Tan.Ta
	 * @param {string} searchingText
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async inputAddressBook(searchingText: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Inputting to address book`);
			await this.txtSearchAddress.type(searchingText);
			await this.addressBookItem(searchingText).waitForControlStable();
		} catch (err) {
			throw new errorwrapper.CustomError(this.inputAddressBook, err.message);
		}
	}

	/**
	 * Check contact is displayed or not in address book
	 * @author Tan.Ta
	 * @param { string } value contact want to check
	 * @returns { Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isContactInAddressBookDisplayed(value: string, timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.addressBookItem(value).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactInAddressBookDisplayed, err.message);
		}
	}

    /**
	 * Check transfer button is displayed or not in address book
	 * @author Tan.Ta
	 * @param {string} value contact want to check transfer button
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isTransferButtonInAddressBookDisplayed(value: string): Promise<boolean> {
		try {
			await this.addressBookItem(value).moveMouse();

			if (await this.btnTransferContactInAddressBook(value).getCssValue('display') == 'block') {
				return true;
			} else {
				return false;
			};
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTransferButtonInAddressBookDisplayed, err.message);
		}
	}

	/** 	
	 * Checking tab name is display in advance address book
	 * @author Y.Le
	 * @param {string} tabName
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isAdvancedAddressBookTabDisplayed(tabName: TransferTab, timeOut?: number): Promise<boolean> {
		try {
			return await this.tabAdvanceAddressBook(tabName).isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAdvancedAddressBookTabDisplayed, err.message);
		}
	}

	/** 
	 * Check search filed is top od address book advance
	 * @author Y.Le
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isSearchFieldOnTopAddressBook(): Promise<boolean> {
		try {
			let searchLocation: ILocation = await this.txtSearchAddress.getLocation();
			let addressBookLocation: ILocation = await this.popAddressBook.getLocation();
			return searchLocation.y - addressBookLocation.y <= 5
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSearchFieldOnTopAddressBook, err.message);
		}
	}

	/**
	 * Wait for popover address book disappeared
	 * @author Huy.Nguyen
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForPopAddressBookTransferDisappear(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for popover address book disappear");
			await this.txtSearchAddress.waitUntilDisappear();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForPopAddressBookDisappear, err.message);
		}
	}

	/** Getting skill name transfer
	 * @author Y.Le
	 * @param {Agent} agent
	 * @param {string} mediaType
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getSkillNameTransfer(agent: Agent, mediaType: string): Promise<string> {
		try {
			await Logger.write(FunctionType.API, "Getting skill name transfer");
			let listKillsTransfer: string[] = await CustomAPIs.getListSkillNameOfMediaType(agent, mediaType);
			if (listKillsTransfer.length == 0) {
				throw new errorwrapper.CustomError(this.getSkillNameTransfer, "There is no skill available");
			}
			return listKillsTransfer[Utility.getRandomNumber(1, 0, listKillsTransfer.length - 1)];
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSkillNameTransfer, err.message);
		}
	}

	/**	
	* Select Transfer tab
	* @param {string} tabName
	* @returns {Promise<MaxVoiceMailPage>}
	* @memberof MaxVoiceMailPage
	*/
	public async selectTransferTab(tabName: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Selecting Transfer Tab");
			await this.tabTransfer(tabName).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectTransferTab, err.message);
		}
	}

	/**	
     * Select Other tab's item
	 * @author Chinh.Nguyen
     * @param {string} item
     * @returns {Promise<MaxVoiceMailPage>}
     * @memberof MaxVoiceMailPage
     */
	public async selectOtherTabItem(item: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Selecting Other Tab Item");
			await this.lblOtherItem(item).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectOtherTabItem, err.message);
		}
	}

	/**
	 * Check list of available skill of Other tab displays
	 * @author Chinh.Nguyen
	 * @returns {Promise<boolean>} the existence of available skill
	 * @memberof MaxVoiceMailPage
	 */
	public async isAvailableSkillListDisplays(): Promise<boolean> {
		try {
			return await this.lstOtherSkill.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAvailableSkillListDisplays, err.message);
		}
	}

	/**	
	* Make cold transfer
	* @param {string} skillItem
	* @returns {Promise<MaxVoiceMailPage>}
	* @memberof MaxVoiceMailPage
	*/
	public async makeColdTransfer(skillItem: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Making cold transfer");
			await this.lblSkillItem(skillItem).moveMouse();
			await this.btnSkillItemTransfer(skillItem).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.makeColdTransfer, err.message);
		}
	}

	/**
     * Checked agent result displayed
     * @author Lien.Nguyen
     * @param {string} agentName
     * @returns {Promise<boolean>}
     * @memberof MaxTransfer
     */
	public async isAgentSearchResultDisplayedList(agentName: string, timeOut?: number): Promise<boolean> {
		try {

			return await this.lblAgentNameList(agentName).isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentSearchResultDisplayedList, err.message);
		}
	}
}