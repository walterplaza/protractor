import { CoordinateType, State } from "@data-objects/general/general";
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
import { ILocation, ISize } from "selenium-webdriver";

export default class MaxChatPage extends MaxPage {

	private static _maxChatPage: MaxChatPage = null;

	protected btnEndChat = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'end-contact']"));
	protected btnConfirmEndChatContact = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class='confirm-end-contact']"));
	protected btnTransfer = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'init-transfer-contact']"));
	protected btnLaunch = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'launch']"));
	protected chatWorkingSpace = new ElementWrapper(by.xpath("//div[@id='chatWorkspace']"));
	protected chatContactUI = new ElementWrapper(by.xpath("//div[starts-with(@id,'chatcontactui')]"));
	protected lblChatStartTime = new ElementWrapper(by.xpath("//div[@class='time-divider-text start-time']"));
	protected chatContactSection = new ElementWrapper(by.xpath("//div[@id='chatWorkspace']//div[@class='contact-section']"));
	protected lblUnreadMarketLabel = new ElementWrapper(by.xpath("//div[@class='unread-marker-label']"));
	protected lblUnreadMarketHidden = new ElementWrapper(by.xpath("//div[@class='unread-marker hidden']//div[@class='unread-marker-label']"));
	protected txtInputMessage = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//div[contains(@class,'message-text-input')]"));
	protected popNewContact = new ElementWrapper(by.xpath("//div[@class='contact-accept-container']"));
	protected iconMultiChatGlanceSession = new ElementWrapper(by.xpath("//div[@class ='glance glance-overlay']//div[@id='glanceActiveContact']//div[@class='chat-multi-glance-ui chatmultiglanceui']/div[@class='media-icon-shade']/*[name()='svg']"));
	protected pnlIndicator = new ElementWrapper(by.xpath("//div[@class='popover-panel indicator-ui']"));
	protected txtInputMssGpu = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//div[@class='message-text-input']"));
	protected lblChatTimer = new ElementWrapper(by.xpath("//h3[@class='total-contact-time'][text()[contains(.,':')]]"));
	protected lblChatStartTimeWithTime = new ElementWrapper(by.xpath("//div[@class='time-divider-text start-time'][text()[contains(.,':')]]"));
	protected lblCustomerContact = new ElementWrapper(by.xpath("//h1[contains(@class,'contact-label')]"));
	protected lblContact = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui']//h1[@class='contact-label']"));
	protected btnContactPanelToggle = new ElementWrapper(by.xpath("//span[@class='contact-panel-toggle']//button[@class='contact-panel-toggle']"));
	protected chkDispositionCheckbox = new ElementWrapper(by.xpath("//div[@class='toggle-acw-button']"));
	protected pnlChatInbox = new ElementWrapper(by.xpath("//div[@class= 'summary-section']"));
	protected pnlChatContainer = new ElementWrapper(by.xpath("//div[@id='chat-container']"));
	protected icoCustomerContact = new ElementWrapper(by.xpath("//div[@class='contact-info']/div[@class='contact-info-bar']//*[name()='svg']"));
	protected lblSkillName = new ElementWrapper(by.xpath("//div[@class='contact-info']/div[@class='chat-info']/h3[@class='skill-name']"));
	protected lblCustomerContactName = new ElementWrapper(by.xpath("//div[@class='contact-info']/div[@class='contact-info-bar']/h1[@class='contact-label']"));
	protected lblContactTime = new ElementWrapper(by.xpath("//div[@class='contact-info']/div[@class='chat-info']/h3[@class='total-contact-time']"));

	// Dynamic controls
	protected icoChatContact(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'chatcontactsummaryui')][@data-contactid='${contactId}']/div`));
	}
	protected plnChatWorkSpace(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@data-contactid='${contactId}']/div[@class='chat-contact-ui chatcontactui']/div[@id='chat-container']`));
	}

	protected lblClientChatMessage(clientName: string, chatMessage: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='message-header']/span[@title='${clientName}']/../following-sibling::p[@class='message-text' and @title='${chatMessage}']`));
	}

	protected divChatMessage(chatRule: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[starts-with(@id,'chatcontactui')]//div[@class='message-template' and @data-party-type='${chatRule}']/p[@class='message-text']`));
	}

	protected divChatMessageHeader(chatRule: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[starts-with(@id,'chatcontactui')]//div[@class='message-template' and @data-party-type='${chatRule}']`));
	}

	protected btnDynLaunch(contactID: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-section']//div[@data-contactid='${contactID}']//button[@class='launch']`));
	}

	protected btnDynEndChat(contactID: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-section']//div[@data-contactid='${contactID}']//button[@class = 'end-contact']`));
	}

	protected btnDynEndChatByIndex(index: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//button[@class='end-contact'])[${index}]`));
	}

	protected btnDynConfirmEndChatByIndex(index: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`(//button[@class='confirm-end-contact'])[${index}]`));
	}

	protected btnDynConfirmEndChat(contactID: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-section']//div[@data-contactid='${contactID}']//button[@class='confirm-end-contact']`));
	}

	protected txaQuickReplyMessage(text: string) {
		return new ElementWrapper(by.xpath(`//span[@class='content']/p[text()='${text}']`));
	}

	protected txaQuickReplyTitle(title: string) {
		return new ElementWrapper(by.xpath(`//div[@class='quick-replies-section']//span[@class='subject'][text()='${title}']`));
	}

	protected pnlChatContact(contactId: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@id,'chatcontactui') and @data-contactid='${contactId}']/div`));
	}

	protected lblSkillInfo(skillName: string, skillId: number): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='contact-info']//div[@class='chat-info']//h3[@class='skill-name'][text()='${skillName} (${skillId})']`));
	}
	protected lblLaunchButton(title: string) {
		return new ElementWrapper(by.xpath(`//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'launch']//h4[@title='${title}']`));
	}

	protected lblTransferButton(title: string) {
		return new ElementWrapper(by.xpath(`//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'init-transfer-contact']//h4[@title='${title}']`));
	}

	protected lblEndButton(title: string) {
		return new ElementWrapper(by.xpath(`//div[@class='chat-contact-ui chatcontactui' and @data-status='Active']//button[@class = 'end-contact']//h4[@title='${title}']`));
	}

	public static getInstance(): MaxChatPage {
		this._maxChatPage = new MaxChatPage();
		return this._maxChatPage;
	}

	/**
	 * End chat contact on MAX
	 * @returns {Promise<MaxPage>} MaxPage
	 * @memberof MaxChatPage
	 */
	public async endChatContact(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending chat contact");
			await this.btnEndChat.wait();
			await this.btnEndChat.click();
			await this.btnEndChat.waitUntilDisappear();
			await this.btnConfirmEndChatContact.click();
			await this.pnlChatWorkspace.waitUntilDisappear();
			let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
			return await maxPage.getMaxInstance(false);
		} catch (err) {
			throw new errorwrapper.CustomError(this.endChatContact, err.message);
		}
	}

    /**
	 * Check chat contact is accepted or not
	 * @param {string} contactId
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isChatActive(contactId: string, timeoutInsecond?: number): Promise<boolean> {
		try {
			return await this.icoChatContact(contactId).isDisplayed(timeoutInsecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatActive, err.message);
		}
	}

	/**
	 * Wait for Chat work space with specific contact ID disappears
	 * @author Anh.Le
	 * @param {string} contactId
	 * @memberof MaxChatPage
	 */
	public async waitForChatWorkSpaceDisappeared(contactId: string, timeoutInsecond?: number): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for chat workspace disappeared");
			await this.plnChatWorkSpace(contactId).waitUntilDisappear(timeoutInsecond);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForChatWorkSpaceDisappeared, err.message);
		}
	}

	/**
	 * End chat require disposition contact on MAX
	 * @returns {Promise<MaxChatPage>} MaxChatPage
	 * @memberof MaxChatPage
	 */
	public async endChatRequireDisposition(): Promise<MaxDispositionPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending chat contact");
			await this.btnEndChat.waitForControlStable();
			await this.btnEndChat.click();
			await this.btnEndChat.waitUntilDisappear();
			await this.btnConfirmEndChatContact.click();
			return await MaxDispositionPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.endChatRequireDisposition, err.message);
		}
	}

	/**	
	 * Get chat start time color
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getChatStartTimeColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting chat start time color");
			let returnedColor: string = await this.lblChatStartTime.getCssValue("color");
			return await Utility.convertRgbToHex(returnedColor);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatStartTimeColor, err.message);
		}
	}

	/**	
	 * Get Customer contact label title
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getlblCustomerContactTitle(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Customer contact label title");
			await this.lblCustomerContact.waitUntilPropertyChange("title", TestRunInfo.shortTimeout);
			let returnedTitle: string = await this.lblCustomerContact.getControlTitle();
			return returnedTitle;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getlblCustomerContactTitle, err.message);
		}
	}

	/**
	 * Open launch menu with Contact ID
	 * @param {number} contactID
	 * @returns {Promise<MaxChatPage>}
	 * @memberof MaxChatPage
	 */
	public async openLaunchMenuWithContactID(contactID: number): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, `Opening launch menu with contactID ${contactID}`);
			await this.btnDynLaunch(contactID).click();
			await this.pnlIndicator.waitForControlStable();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openLaunchMenuWithContactID, err.message);
		}
	}

	/**
	 * Chat Message displayed or not
	 * @author Nhat.Nguyen
	 * @param {string} clientName
	 * @param {string} chatMessage
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isChatMessageDisplayed(clientName: string, chatMessage: string): Promise<boolean> {
		try {
			return await this.lblClientChatMessage(clientName, chatMessage).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatMessageDisplayed, err.message);
		}
	}

	/**
	 * Get color launch button with contact ID
	 * @param {number} contactID
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getColorLaunchButtonWithContactID(contactID: number): Promise<string> {
		try {
			return await this.btnDynLaunch(contactID).getCssValue('background-color');
		} catch (err) {
			throw new errorwrapper.CustomError(this.openLaunchMenuWithContactID, err.message);
		}
	}

	/**
	 * Unread Market displayed or not
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Return value of is isUnreadMarkerDisplayed
	 * @memberof MaxChatPage
	 */
	public async isUnreadMarkerDisplayed(): Promise<boolean> {
		try {
			return await this.lblUnreadMarketLabel.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isUnreadMarkerDisplayed, err.message);
		}
	}

	/**
	 * End chat contact by contactID on MAX
	 * @author Chuong.Nguyen
	 * @returns {Promise<void>} MaxPage
	 * @memberof MaxChatPage
	 */
	public async endChatContactByContactID(contactID: number): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending chat contact");
			await this.btnDynEndChat(contactID).click();
			await this.btnDynEndChat(contactID).waitUntilDisappear();
			await this.btnDynConfirmEndChat(contactID).click();
			await this.btnDynConfirmEndChat(contactID).waitUntilDisappear();
			let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
			return await maxPage.getMaxInstance(false);
		} catch (err) {
			throw new errorwrapper.CustomError(this.endChatContactByContactID, err.message);
		}
	}

	/**
	 * End all multi chat contact on MAX
	 * @author Chuong.Nguyen
	 * @returns {Promise<void>} MaxPage
	 * @memberof MaxChatPage
	 */
	public async endAllChatContacts(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending all chat contacts");
			let numberOfChat = parseInt(await this.getNumberChatContacts());
			while (numberOfChat > 0) {
				await this.btnDynEndChatByIndex(numberOfChat).click();
				await this.btnDynEndChatByIndex(numberOfChat).waitUntilDisappear();
				await this.btnDynConfirmEndChatByIndex(numberOfChat).click();
				await this.btnDynConfirmEndChatByIndex(numberOfChat).waitUntilDisappear();
				numberOfChat--;
			}
			let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
			return await maxPage.getMaxInstance(false);
		} catch (err) {
			throw new errorwrapper.CustomError(this.endAllChatContacts, err.message);
		}
	}

	/**
	 * Unread Market displayed or not
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Return value of is isUnreadMarkerDisplayed
	 * @memberof MaxChatPage
	 */
	public async isUnreadMarkerHidden(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblUnreadMarketHidden.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isUnreadMarkerDisplayed, err.message);
		}
	}

	/**
	 * Send Agent message
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxChatPage>} MaxChatPage
	 * @memberof MaxChatPage
	 */
	public async sendAgentMessage(agentMessage: string): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Sending Agent message");
			if (await this.txtInputMessage.isDisplayed(TestRunInfo.longTimeout)) {
				await this.txtInputMessage.waitForControlStable();
				await this.txtInputMessage.click();
				await this.txtInputMessage.sendKeys(agentMessage);
				await this.txtInputMessage.sendKeys(Key.ENTER);
			}
			else {
				await this.txtInputMssGpu.waitForControlStable();
				await this.txtInputMessage.click();
				await this.txtInputMssGpu.sendKeys(agentMessage);
				await this.txtInputMssGpu.sendKeys(Key.ENTER);
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.sendAgentMessage, err.message);
		}
	}



	/**
	 * End chat contact on MAX
	 * @author Chuong.Nguyen
	 * @returns {Promise<void>} MaxPage
	 * @memberof MaxChatPage
	 */
	public async getNumberChatContacts(): Promise<string> {
		try {
			let result: string = "";
			result = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('chat-contact-ui chatcontactui').length`)
			return result;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getNumberChatContacts, err.message);
		}
	}

	/**
	 * Refresh Max Chat Page
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxChatPage>} MaxChatPage
	 * @memberof MaxChatPage
	 */
	public async refreshMaxChatPage(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Refreshing Max Call Page");
			await BrowserWrapper.refreshPage();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.refreshMaxChatPage, err.message);
		}
	}

	/**
	 * Reject new chat contact (case multiple chats)
	 * @author Chinh.Nguyen
	 * @returns {Promise<MaxChatPage>} Return MaxChatPage
	 * @memberof MaxChatPage
	 */
	public async rejectNewChatContact(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Rejecting new chat contact pop up");
			await this.btnReject.click();
			await this.btnReject.waitUntilDisappear();
			// Wait 5 seconds so that rejected chat is re-queued
			await Utility.delay(5);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.rejectNewChatContact, err.message);
		}
	}

	/**
	 * Check isMultiChatGlanceSessionDisplayed displays
	 * @author Anh.Le
	 * @param {number} timeoutInSecond
	 * @returns {Promise<boolean>} displayed or not
	 * @memberof MaxPage
	 */
	public async isMultiChatGlanceSessionDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.iconMultiChatGlanceSession.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMultiChatGlanceSessionDisplayed, err.message);
		}
	}

	/**
     * Chat UI conversation bubbles match the mockup
     * @author Y.Le
     * @param {string} chatRule
     * @returns {Promise<boolean>}
     * @memberof MaxChatPage
     */
	public async isChatConversationBubbleMatched(chatRule: string): Promise<boolean> {
		try {
			let chatMessageBody: ILocation = await this.divChatMessage(chatRule).getLocation();
			let chatMessageHeader: ILocation = await this.divChatMessageHeader(chatRule).getLocation();
			return chatMessageHeader.y < chatMessageBody.y
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatConversationBubbleMatched, err.message);
		}
	}

	/**
	 * Highlighting chat conversation
	 * @author Y.Le
	 * @param {string} chatRule
	 * @returns {Promise<this>}
	 * @memberof MaxChatPage
	 */
	public async highlightChatConversation(chatRule: string): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Highlighting chat conversation");
			await this.divChatMessage(chatRule).selectTextByClassName('message-text');
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.highlightChatConversation, err.message);
		}
	}

	/**
	 * Pasting text into chat text box
	 * @author Y.Le
	 * @returns {Promise<this>}
	 * @memberof MaxChatPage
	 */
	public async pasteTextIntoChatBox(): Promise<this> {
		try {
			await Logger.write(FunctionType.UI, "Pasting text into chat text box");
			let copiedText: string = await new PageBase().getClipboardContent();
			if (await this.txtInputMessage.isDisplayed(TestRunInfo.shortTimeout)) {
				await this.txtInputMessage.click();
				await this.txtInputMessage.wait();
				await this.txtInputMessage.sendKeys(copiedText);
			}
			else {
				await this.txtInputMssGpu.click();
				await this.txtInputMssGpu.wait();
				await this.txtInputMssGpu.sendKeys(copiedText);
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.pasteTextIntoChatBox, err.message);
		}
	}

	/** Click to Chat client
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxChatPage>} MaxChatPage
	 * @memberof MaxChatPage
	 */
	public async clickToChatClient(contactId: string): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Clicking to Chat Client");
			await this.icoChatContact(contactId).wait();
			await this.icoChatContact(contactId).click();
			await this.pnlChatContact(contactId).waitUntilPropertyChange("data-status", TestRunInfo.shortTimeout);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickToChatClient, err.message);
		}
	}

	/**
	 * Getting entered chat content from chat text box
	 * @author Y.Le
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getChatContentTextBox(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting entered chat content from chat text box");
			let chatMessage: string;
			if (await this.txtInputMessage.isDisplayed(TestRunInfo.shortTimeout)) {
				chatMessage = await this.txtInputMessage.getText();
			}
			else {
				chatMessage = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName("message-text-input")[0].value`);
			}
			return chatMessage;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatContentTextBox, err.message);
		}
	}

	/**
	 * End specified chat contact on MAX
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxChatPage>} MaxPage
	 * @memberof MaxChatPage
	 */
	public async endSpecifiedChatWithContactId(contactId: string): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, `Ending chat ${contactId}`);
			await this.btnEndChat.click();
			await this.btnEndChat.waitUntilDisappear();
			await this.btnConfirmEndChatContact.click();
			await this.pnlChatContact(contactId).waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.endSpecifiedChatWithContactId, err.message);
		}
	}

	/**
	 * Chat bubble MAX width displays in range
	 * @author Phat.Truong
	 * @returns {Promise<MaxChatPage>} MaxPage
	 * @chatFrom: agent/client
	 * @memberof MaxChatPage
	 */
	public async isChatBubbleDisplayedInsideChat(chatFrom: string, maxRange: number): Promise<Boolean> {
		try {
			await Logger.write(FunctionType.UI, `Getting chat bubble MAX width of ${chatFrom}`);
			let sizeChatContact, sizeBubble: ISize;
			let minRange = 70;

			sizeChatContact = await this.chatContactUI.getSize();
			let chatContactWidth = sizeChatContact.width;
			sizeBubble = await this.divChatMessageHeader(chatFrom.charAt(0).toUpperCase() + chatFrom.slice(1)).getSize();
			let bubbleWidth = sizeBubble.width;
			let percentage = bubbleWidth / chatContactWidth * 100;
			return (await percentage >= minRange && percentage < maxRange);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatBubbleDisplayedInsideChat, err.message);
		}
	}

	/**
	 * Transfer button displayed or not
	 * @author Tung Vo
	 * @returns {Promise<boolean>} Return transfer button displayed or not
	 * @memberof MaxChatPage
	 */
	public async isTransferButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnTransfer.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTransferButtonDisplayed, err.message);
		}
	}

	/**
	 * Launch button displayed or not
	 * @author Tung Vo
	 * @returns {Promise<boolean>} Return launch button displayed or not
	 * @memberof MaxChatPage
	 */
	public async isLaunchButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnLaunch.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLaunchButtonDisplayed, err.message);
		}
	}

	/**
	 * End button displayed or not
	 * @author Tung Vo
	 * @returns {Promise<boolean>} Return end button displayed or not
	 * @memberof MaxChatPage
	 */
	public async isEndButtonDisplayed(): Promise<boolean> {
		try {
			return await this.btnEndChat.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEndButtonDisplayed, err.message);
		}
	}

	/**
		 * Chat Timer displayed or not
		 * @author Devi Venkatachalam
		 * @returns {Promise<boolean>} Return end button displayed or not
		 * @memberof MaxChatPage
		 */
	public async isChatTimerDisplayed(): Promise<boolean> {
		try {
			return await this.lblChatTimer.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatTimerDisplayed, err.message);
		}
	}

	/**
	 * Chat start time label displayed with time
	 * @author Devi Venkatachalam
	 * @returns {Promise<boolean>} Return Chat start time label displayed with time or not
	 * @memberof MaxChatPage
	 */
	public async isChatStartTimerWithTimeDisplayed(): Promise<boolean> {
		try {

			return await this.lblChatStartTimeWithTime.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatStartTimerWithTimeDisplayed, err.message);
		}
	}

	/**
	 * Text input area displayed with time or not
	 * @author Devi Venkatachalam
	 * @returns {Promise<boolean>} Return end button displayed or not
	 * @memberof MaxChatPage
	 */
	public async isTextInputAreaDisplayed(): Promise<boolean> {
		try {
			return await this.txtInputMessage.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isTextInputAreaDisplayed, err.message);
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
	 * Check if Customer Contact Name is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxSMSPage
	 */
	public async isCustomerContactNameDisplayed(): Promise<boolean> {
		try {
			return await this.lblCustomerContact.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerContactNameDisplayed, err.message);
		}
	}

	/**	
 	* Check Chat Contact Icon positioned at left side
 	* @param {string} contactId Id of contact
 	* @returns {Promise<boolean>}
 	* @memberof MaxPage
 	*/
	public async isChatContactIconPositionedAtLeftSide(contactId: string): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, `Comparing left of chat contact icon and left of chat pane`);
			let locationChatContactIcon: ISize = await this.icoChatContact(contactId).getSize();
			let leftChatWorkspace: number = await this.plnChatWorkSpace(contactId).getElementCoordinate(CoordinateType.LEFT);
			let leftChatContactIcon: number = await this.icoChatContact(contactId).getElementCoordinate(CoordinateType.LEFT);
			return (leftChatContactIcon + locationChatContactIcon.width < leftChatWorkspace);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatContactIconPositionedAtLeftSide, err.message);
		}
	}
	/**
	* Get Transfer button label
	* @returns {Promise<string>}
	* @memberof MaxChatPage
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
	* Get Launch button label
	* @returns {Promise<string>}
	* @memberof MaxChatPage
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
     * @memberof MaxChatPage
     */
	public async getEndButtonLabel(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting End button label`);
			let className = await this.btnEndChat.getAttribute("class");
			let label: string = String(await BrowserWrapper.executeScript(`return document.getElementsByClassName("${className}")[0].innerText;`));
			return label.trim();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEndButtonLabel, err.message);
		}
	}
	/**
     * Get Chat Contact label
     * @returns {Promise<string>}
     * @memberof MaxChatPage
     */
	public async getChatContactLabel(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting Chat Contact label`);
			let label = await this.lblContact.getText();
			return label.trim();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatContactLabel, err.message);
		}
	}
	/**
     * Get Chat Workspace color
     * @returns {Promise<string>}
     * @memberof MaxChatPage
     */
	public async getChatWorkspaceColor(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting Chat workspace color`);
			let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//div[@id='chatWorkspace']");`);
			return colorCode
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatWorkspaceColor, err.message);
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
			let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//div[@class='contact-section']//button[@class='init-transfer-contact']");`);
			return colorCode
		} catch (err) {
			throw new errorwrapper.CustomError(this.getTransferButtonColor, err.message);
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
			let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//div[@class='contact-section']//button[@class='launch']");`);
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
			let colorCode = <string>await BrowserWrapper.executeScript(`function getElementByXpath(path){return document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};function getcss(path){var result='';var element=getElementByXpath(path);var style=getComputedStyle(element);var result=style.getPropertyValue('background-color');return result};return getcss("//div[@class='contact-section']//button[@class='end-contact']");`);
			return colorCode
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEndButtonColor, err.message);
		}
	}


	/**
	 * Check label of launch button
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async isLabelLaunchButtonDisplayed(expectedLabel: string): Promise<boolean> {
		try {
			return await this.lblLaunchButton(expectedLabel).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelLaunchButtonDisplayed, err.message);
		}
	}

	/**
	 * Check label of transfer button
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async isLabelTransferButtonDisplayed(expectedLabel: string): Promise<boolean> {
		try {
			return await this.lblTransferButton(expectedLabel).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelTransferButtonDisplayed, err.message);
		}
	}

	/**
		 * Click on contact panel toggle 
		 * @author Devi Venkatachalam
		 * @returns {Promise<string>}
		 * @memberof MaxChatPage
		 */
	public async clickOnContactPanelToggle(): Promise<MaxChatPage> {
		try {
			await this.btnContactPanelToggle.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickOnContactPanelToggle, err.message);
		}
	}



	/**
	 * Check label of end button
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async isLabelEndButtonDisplayed(expectedLabel: string): Promise<boolean> {
		try {
			return await this.lblEndButton(expectedLabel).isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelEndButtonDisplayed, err.message);
		}
	}

	/**
	 * Get color of chat workspace
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getColorChatWorkspace(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting color of chat workspace`);
			return Utility.convertRgbToHex(await this.chatWorkingSpace.getCssValue("background-color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getColorChatWorkspace, err.message);
		}
	}

	/**
	 * Get color of launch button
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getColorLaunchButton(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting color of launch button`);
			await this.btnLaunch.waitUntilCssValueNotChange("background-color");
			return Utility.convertRgbToHex(await this.btnLaunch.getCssValue("background-color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getColorLaunchButton, err.message);
		}
	}

	/**
	 * Get color of transfer button
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getColorTransferButton(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting color of transfer button`);
			await this.btnTransfer.waitUntilCssValueNotChange("background-color");
			return Utility.convertRgbToHex(await this.btnTransfer.getCssValue("background-color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getColorTransferButton, err.message);
		}
	}

	/**
	 * Get color of button end
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async getColorEndButton(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting color of button end`);
			await this.btnEndChat.waitUntilCssValueNotChange("background-color");
			return Utility.convertRgbToHex(await this.btnEndChat.getCssValue("background-color"));
		} catch (err) {
			throw new errorwrapper.CustomError(this.getColorEndButton, err.message);
		}
	}

	/**
	 * Click on chat workspace
	 * @author Huy.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxChatPage
	 */
	public async clickOnChatWorkspace(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking on chat workspace`);
			await this.chatWorkingSpace.waitForVisibilityOf();
			await this.chatWorkingSpace.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickOnChatWorkspace, err.message);
		}
	}

	/**
    * Toggle disposition to show on or show off disposition popup
    * @author Huy.Nguyen
    * @param {string} mode
    * @returns {Promise<MaxPage>}
    * @memberof MaxDispositionPage
    */
	public async toggleDispositionPopup(mode: string): Promise<MaxDispositionPage> {
		try {
			await Logger.write(FunctionType.UI, `Toggling disposition popup ${mode}`);
			await this.chkDispositionCheckbox.waitForPresenceOf();
			if ((mode == State.ON || mode == State.OFF)) {
				await this.chkDispositionCheckbox.click();
			}
			return await MaxDispositionPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.toggleDispositionPopup, err.message);
		}
	}



	/**
	 * Get chat workspace size
	 * @author Huy.Nguyen
	 * @returns {Promise<ISize>}
	 * @memberof MaxChatPage
	 */
	public async getChatSize(): Promise<ISize> {
		try {
			await Logger.write(FunctionType.UI, `Getting chat workspace size`);
			let locationChatWorkspace: ISize = await this.chatWorkingSpace.getSize();
			return locationChatWorkspace;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatSize, err.message);
		}
	}

	/**
	 * Get chat workspace size by contact id
	 * @author Phat TTruong
	 * @param {number} contactId 
	 * @returns {Promise<ISize>}
	 * @memberof MaxChatPage
	 */
	public async getChatSizeByContactId(contactId: string): Promise<ISize> {
		try {
			await Logger.write(FunctionType.UI, `Getting chat workspace size by contact id`);
			let locationChatWorkspace: ISize = await this.plnChatWorkSpace(contactId).getSize();
			return locationChatWorkspace;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatSizeByContactId, err.message);
		}
	}

	/**
	 * Check quick replies at right side of chat workspace
	 * @author Huy.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isQuickRepliesAtRightSide(): Promise<boolean> {
		try {
			await Logger.write(FunctionType.UI, `Comparing position of chat workspace and position of quick replies panel`);
			let locationChatWorkspace: ISize = await this.pnlChatContainer.getSize();
			let leftChatWorkspace: number = await this.pnlChatContainer.getElementCoordinate(CoordinateType.LEFT);
			let leftQuickReplies: number = await this.pnlQuickReplies.getElementCoordinate(CoordinateType.LEFT);
			return (leftChatWorkspace + locationChatWorkspace.width <= leftQuickReplies);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isQuickRepliesAtRightSide, err.message);
		}
	}


	/**
	 * Check chat workspace is not overlaped
	 * @author Huy.nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isChatWorkSpaceNotOverlaped(): Promise<boolean> {
		try {
			let chatWorkspaceSize: ISize = await this.getChatSize();			
			let maxPanelSize: ISize = await this.getMaxWrapPanelSize("ISize");					
			if(Utility.isNumberInRange(chatWorkspaceSize.height,maxPanelSize.height,10) && Utility.isNumberInRange(chatWorkspaceSize.width,maxPanelSize.width,35)){
			return true;
			} else return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatWorkSpaceNotOverlaped, err.message);
		}
	}

	/* Get size of Chat inbox
	* @returns {Promise<boolean>} Return value of isCallWorkspaceDisplayed()
	* @memberof MaxPage
	*/
	public async getChatInboxSize(): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, "getting MAX glance size");
			let sizeChatInbox: ISize = await this.pnlChatInbox.getSize();
			let sizeChatInboxWidth = sizeChatInbox.width;
			return sizeChatInboxWidth;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatInboxSize, err.message);
		}
	}

	/**	
	 * Get Chat Contact inbox position
	 * @author Lien.Nguyen
	 * @returns {Promise<number>}
	 * @memberof MaxPage
	 */
	public async getChatInboxLeftPosition(): Promise<number> {
		try {
			await Logger.write(FunctionType.UI, `Get Chat Contact inbox position`);
			let leftOfChatInbox: number = await this.pnlChatInbox.getElementCoordinate(CoordinateType.LEFT);
			return leftOfChatInbox;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getChatInboxLeftPosition, err.message);
		}
	}

	/**
	 * Get skill name chat contact
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async getSkillNameChatContact(timeoutInSecond?: number): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Getting skill name chat contact`);
			await this.lblSkillName.waitForVisibilityOf();
			let skill: string = await this.lblSkillName.getText(timeoutInSecond);
			return skill;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSkillNameChatContact, err.message);
		}
	}

	/**
	 * Check time counter chat contact is displayed
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isChatTimeCounterDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblContactTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatTimeCounterDisplayed, err.message);
		}
	}

	/**
	 * Check message text input of chat contact is displayed
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isMessageTextInputDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.txtInputMessage.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMessageTextInputDisplayed, err.message);
		}
	}

	/**
	 * Check chat start time of chat workspace is displayed
	 * @author Huy.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxChatPage
	 */
	public async isChatStartTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatStartTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatStartTimeDisplayed, err.message);
		}
	}
}
