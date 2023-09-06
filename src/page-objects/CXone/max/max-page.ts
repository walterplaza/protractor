import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, Environment, MaxConnectOption, MaxState } from "@data-objects/general/cluster";
import { Button, State } from "@data-objects/general/general";
import { ContactName, ToolbarButton } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxCall from "@page-objects/CXone/max/max-call-page";
import MAXMessagePanel from "@page-objects/CXone/max/max-message-panel";
import MaxMoreToolsPage from "@page-objects/CXone/max/max-more-tools-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import PageBase from "@page-objects/page-base";
import ProjectPath from "@test-data/general/project-path";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import StopWatch from "@utilities/general/stop-watch";
import { JsonUtility, Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { ISize } from "selenium-webdriver";
import MaxEmailPage from "./max-email";
import MaxChatPage from "./max-chat-page";
import { Browser } from "@data-objects/general/platform";

export default class MaxPage extends PageBase {

	private static _maxPage: MaxPage = null;

	protected divSpinner = new ElementWrapper(by.xpath("//div[@id='index-loading-spinner']"));
	protected divMaxWrapper = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected btnStateSection = new ElementWrapper(by.xpath("//div[@id='agentStateSection']//div[@class='state-body']//span[@class='current-state']"));
	protected btnConfirmLogoutMAX = new ElementWrapper(by.xpath("//button[@class='confirm-button'][text()='Log out']"));
	protected radPhone = new ElementWrapper(by.xpath("//div[@class='item phone-option'][./input[@id='radioPhone']]"));
	protected radStation = new ElementWrapper(by.xpath("//div[@class='item station-option'][./input[@id='radioStation']]"));
	protected radSoftPhone = new ElementWrapper(by.xpath("//div[@class='item softphone-option'][./input[@id='radioSoftPhone']]"));
	protected txtPhone = new ElementWrapper(by.xpath("//input[@id='phoneNumberText']"));
	protected txtStation = new ElementWrapper(by.xpath("//input[@id='stationIdText']"));
	protected chkRememberMe = new ElementWrapper(by.xpath("//input[@id='cbRememberMe']"));
	protected btnConnect = new ElementWrapper(by.xpath("//div[@class='select-options']/button[@class='button connect']/h4"));
	protected btnClose = new ElementWrapper(by.xpath("//div[@class='select-options']/button[@class='button close']/h4"));
	protected divStateBar = new ElementWrapper(by.xpath("//div[@class='state-bar']"));
	protected divMaxLaunchForm = new ElementWrapper(by.xpath("//div[@class='set-station-container']"));
	protected btnWFO = new ElementWrapper(by.xpath("//button[.//div[text()='WFO' or text()='Schedule']]"));
	protected pnlWFO = new ElementWrapper(by.xpath("//div[.//header[@title='My Schedule'] and @class='item-list-container clickthrough-container']"));
	protected btnCloseWFO = new ElementWrapper(by.xpath("//button[.//div[text()='WFO'] and @class='tiny secondary active']"));
	protected divScheduleList = new ElementWrapper(by.xpath("//div[@class='popover-panel commitment-manager-popover']//ul[@class='item-list']"))
	protected pnlGlanceWorkspace = new ElementWrapper(by.xpath("//div[@class='glance-workspace']"));
	protected pnlMore = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']"));
	protected btnBackArrow = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']//div[@class='clickthrough-back']"));
	protected lbl24HourClockStatus = new ElementWrapper(by.xpath("//li[@data-button-type='Use24HourTime']/span[@class='right settings-value']"));
	protected btn24HourClock = new ElementWrapper(by.xpath("//li[@data-button-type='Use24HourTime']"));
	protected icoStatus = new ElementWrapper(by.xpath("//div[@class='state-bar']/div[@class='icon-status']"));
	protected btnMore = new ElementWrapper(by.xpath("//div[@id='toolBarSection']//button[@data-button-type='more']"));
	protected btnSetting = new ElementWrapper(by.xpath("//li[@data-button-type='settings']"));
	protected lblADAHighContrastStatus = new ElementWrapper(by.xpath("//li[@data-button-type='AdaHighContrast']/span[@class='right settings-value']"));
	protected btnADAHighContrast = new ElementWrapper(by.xpath("//li[@data-button-type='AdaHighContrast']"));
	protected panelTile = new ElementWrapper(by.xpath("//html[@dir='ltr']//title"));
	protected ifrWFOPanel = new ElementWrapper(by.xpath("//div[@id='wfoworkspaceui-0_container']//iframe[@frameborder='0']"));
	protected ifrWFOWorkspace = new ElementWrapper(by.xpath("//div[@class='ui-core']//div[@class='workspace-wrapper']//div[@id='wfoWorkspace']"));
	protected ifrWFOBrandEmbassyContainer = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace']//div[contains(@class,'wfo-workspace-ui') and @data-wfoworkspaceid='-2']//iframe[@frameborder='0' and contains(@src,'brand')]"));
	protected ifrWFOBrandEmbassyContainerParent = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace']//div[contains(@class,'wfo-workspace-ui') and @data-wfoworkspaceid='-2']/parent::div[contains(@id,'wfoworkspaceui-')]"));
	protected btnWFOBrandEmbassyWorkspaceClose = new ElementWrapper(by.xpath("//div[@data-wfoworkspaceid='-2']//div[contains(@class,'wfo-workspace-close-button')]"));
	protected ifrWFOPanelBrandEmbassy = new ElementWrapper(by.xpath("//div[@class='ui-core']//div[@class='workspace-wrapper']//div[@id='wfoWorkspace']//div[@id='wfoworkspaceui-0_container']//div[@id='wfoworkspaceui-0']//div[@class='wfo-workspace-content']//iframe[@frameborder='0']"));
	protected btnNew = new ElementWrapper(by.xpath("//div[@id='toolBarSection']//button[@data-button-type='new-contact']"));
	protected lblDigitalEngagementWorkspace = new ElementWrapper(by.xpath("//div[@class='digitalWorkSpaceGlanceSection glance-media']//div[@class='media-type-name' and @title='Digital Channels']"));

	protected pnlModuleContainer = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected pnlMaxGlanceOverlay = new ElementWrapper(by.xpath("//div[@class='glance glance-overlay']"));
	protected pnlEmailWorkSpace = new ElementWrapper(by.xpath("//div[@id='emailworkspaceui-0']//div[@class='email-contact-ui emailcontactui']"));
	protected pnlWorkItemWorkSpace = new ElementWrapper(by.xpath("//div[@class='work-item-section']"));
	protected pnlChatWorkspace = new ElementWrapper(by.xpath("//div[@class='chat-contact-ui chatcontactui']"));
	protected pnlVoiceMailWorkSpace = new ElementWrapper(by.xpath("//div[@class='workspace']//div[@class='voice-mail voicemailcontactui']/ancestor::div[@id='contactSection']"));
	protected newContactPopUp = new ElementWrapper(by.xpath("//div[@class='contact-accept-container']"));
	protected btnAccept = new ElementWrapper(by.xpath("//button[@class='accept']"));
	protected btnReject = new ElementWrapper(by.xpath("//button[@class='reject']"));
	protected btnMessage = new ElementWrapper(by.xpath("//button[@class='tiny secondary' and @data-button-type='messages']"));

	// Toolbar Section Item
	protected btnNewToolbar = new ElementWrapper(by.xpath("//li[@class='toolbar-button-template']//div[@class='button-text' and contains(text(),'New')]"));

	// Add New Popover
	protected pnlAddNewPopover = new ElementWrapper(by.xpath("//header[contains(@class,'new-media-panel') and @title='Add New']"));
	protected lblNewOutboundCall = new ElementWrapper(by.xpath("//ul[@class='new-media-list']//span[@title='Outbound Call']"));

	// Advanced address book
	protected txtSearch = new ElementWrapper(by.xpath("//div[@id='advancedAddressBookSection']//div[@class='search-section']//input[@type='search']"));
	protected pnlAdvancedAddressBook = new ElementWrapper(by.xpath("//div[@id='advancedAddressBookSection']//div[@class='popover-panel advanced-address-book-ui']"));
	protected btnCall = new ElementWrapper(by.xpath("//ul[@class='result-list']//button[@class='call']"));
	protected lbSkillList = new ElementWrapper(by.xpath("//div[@class='selectmenu-button skill-list']"));
	protected ddlSelectSkill = new ElementWrapper(by.xpath("//select[@class='skills-dropdown']"))
	protected pnlSelectSkill = new ElementWrapper(by.xpath("//div[@class='selectmenu-text' and text()='Choose a skill']"));

	// Call workspace
	protected divCallWorkspace = new ElementWrapper(by.xpath("//div[@id='contactSection']"));
	protected pnlCallWorkspace = new ElementWrapper(by.xpath("//div[@id='workspace']//div[contains(@id,'callcontactui')][contains(@id,'container')]"));
	protected btnHangUp = new ElementWrapper(by.xpath("//button[@class='end-contact']"));
	protected btnConfirmHangUp = new ElementWrapper(by.xpath("//button[@class='confirm-end-contact']"));
	protected lblDialling = new ElementWrapper(by.xpath("//div[@class='contact-info']//span[@class='state-name'][text()='Dialing']"));
	protected btnRecord = new ElementWrapper(by.xpath("//button[@class='record' or @class='record disabled']"));
	protected btnCallContact = new ElementWrapper(by.xpath("//div[contains(@id,'contactacceptui')]//button[@title='Accept']"));
	protected divMaxFull = new ElementWrapper(by.xpath("//div[@id='uimanager_container']"));
	protected btnRecordSelected = new ElementWrapper(by.xpath("//button[@class='record selected']"));
	// WFO popover
	protected btnWFOPanel = new ElementWrapper(by.xpath("//span[@class='commitment-manager-wfo-url left']"));
	// Open WFO Button/link
	protected btnOpenWFO = new ElementWrapper(by.xpath("//div[@class='wfo-link-container']//span[@class='wfo-link-name' and contains(text(),'Open WFO')]"));

	// Message popover
	protected pnlMessage = new ElementWrapper(by.xpath("//div[@class='popover-panel agent-message-ui']"));

	// Dynamic controls
	protected lblWFOItem(itemName: string, startTime: string, endTime: string, fullClock: boolean = false): ElementWrapper {
		if (fullClock) {
			return new ElementWrapper(by.xpath(`//body[@data-clock-full="true"]//div[@class='popover-panel commitment-manager-popover']//li[@class='clickable commitment-template']//div[@class='content-left'][.//div[@title='${itemName}']]/following-sibling::div[@class='content-right']//p[@class='start time-full' and text()='${startTime}']/following-sibling::p[@class='end time-full' and text()='${endTime}']`));
		} else {
			return new ElementWrapper(by.xpath(`//body[@data-clock-full="false"]//div[@class='popover-panel commitment-manager-popover']//li[@class='clickable commitment-template']//div[@class='content-left'][.//div[@title='${itemName}']]/following-sibling::div[@class='content-right']//p[@class='start time-standard' and text()='${startTime}']/following-sibling::p[@class='end time-standard' and text()='${endTime}']`));
		}

	}

	protected lblMaxMoreToolItem(itemName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='toolBarSection']//ul[@class='more-item-list']//h1[@title='${itemName}']`));
	}

	protected btnToolbar(name: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@class='toolbar-button-template']//div[@class='button-text' and contains(text(),'${name}')]`));
	}

	protected ddlSkillList(phoneNumber: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='skills-dropdown']//div[./h1[text()='${phoneNumber}']]//select[@class='skill-list']`));
	}

	protected miCallSkill(skillName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[contains(@class,'skill-list-container')]//li[@class='selectmenu-menu-item'][@title='${skillName}']`));
	}

	protected lblSearchValueResult(value: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']//h1[contains(text(),'${value}')]`));
	}

	protected lblMaxStateItem(maxState: MaxState): ElementWrapper {
		return new ElementWrapper(by.xpath(`//li[@data-state='${maxState}' and not(@class ='state-item-template')]`));
	}

	protected lblPhoneNumber(phoneNumber: string) {
		return new ElementWrapper(by.xpath(`//li[@id='abEntry_searchexternalresult']//h1[text()='${phoneNumber}']`));
	}

	protected lblResultItem(phoneNumber: string) {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']//li[@data-callbackvalue='${phoneNumber}'][1]`));
	}

	protected pnlSkillList(phoneNumber: string) {
		return new ElementWrapper(by.xpath(`//ul[@class='result-list']//li[@data-callbackvalue='${phoneNumber}'][1]//ul[@class='selectmenu-menu-list']`));
	}

	protected lblCustomerWorkspace(label: string) {
		return new ElementWrapper(by.xpath(`//ul[@class='quick-links-item-list']/li[@class='quick-links-template']/div[@title='${label}']`));
	}

	protected divScheduleItem(activityName: string, startTime: string, endTime: string) {
		return new ElementWrapper(by.xpath(`//div[text()='${activityName}']/ancestor::li//p[text() = '${startTime}']/ancestor::div[contains(@class, 'time')]/p[text()='${endTime}']`));
	}
	protected divComingUpItem(activity: string, activeTime): ElementWrapper {
		return new ElementWrapper(by.xpath(`//ul[@class='coming-up-item-list']/li[./span[text()='${activity}']/following-sibling::span[text()='${activeTime}']]`))
	}
	protected btnEmailAddressBook(emailAddress: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@class='search-content']//li[.//h1[.='${emailAddress}']]//button[text()='Email']`));
	}

	public static async getMaxInstance(newMax: boolean = true): Promise<MaxPage> {
		this._maxPage = new MaxPage();
		if (newMax) {
			let handle: string = await BrowserWrapper.getNewWindowHandle();
			await BrowserWrapper.switchWindowByHandle(handle);
		}
		await this._maxPage.waitForLoading();
		return this._maxPage;
	}

	/**
	 * Open MAX popover by clicking toolbar button
	 * @param {string} name Name of MAX pop over
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async openMaxPopOver(name: ToolbarButton): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Opening MAX Popover");
			await this.btnToolbar(name).click();
			await this.txtSearch.wait();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openMaxPopOver, err.message);
		}
	}

	/**
	 * Search address book
	 * @param {string} value value to search
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async searchAddressBook(value: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Searching address book");
			await this.txtSearch.type(value);
		} catch (err) {
			throw new errorwrapper.CustomError(this.searchAddressBook, err.message);
		}
	}

	/**
	 * Click search result button
	 * @param {string} value click search result button based on value
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async clickSearchResult(value: string): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Search Result");
			await this.lblSearchValueResult(value).click();
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickSearchResult, err.message);
		}
	}

	/**
	 * Check if Agent has multi OB skills
	 * @param {Agent} agent agent name
	 * @returns {Promise<boolean>} the existence of multi OB skills
	 * @memberof MaxPage
	 */
	public async doesAgentHaveMultiOBSkills(agent: Agent): Promise<boolean> {
		try {
			let skillCount: number = 0;
			let stringAgentSkill: APIResponse = await inContactAPIs.getAgentsAgentIdSkills(agent, APIVersion.V4);
			let fieldCount: number = JsonUtility.getFieldCount(stringAgentSkill.body, "resultSet.agentSkillAssignments");

			for (let i = 0; i < fieldCount; i++) {
				let isOutbound: string = JsonUtility.getFieldValue(stringAgentSkill.body, `resultSet.agentSkillAssignments[${i}].isOutbound`);
				let mediaTypeName: string = JsonUtility.getFieldValue(stringAgentSkill.body, `resultSet.agentSkillAssignments[${i}].mediaTypeName`);
				if (isOutbound == "\"True\"" && mediaTypeName == "\"Phone Call\"") {
					skillCount += 1;
				}
			}

			if (skillCount > 1) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.doesAgentHaveMultiOBSkills, err.message);
		}
	}

	/**
	 * Call phone number
	 * @param {string} phoneNumber phone number to call out
	 * @param {string} skillName skill name
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async callPhoneNumber(agent: Agent, phoneNumber: string, skillType: SkillType, openMenu: boolean = true, timeOut: number = 1): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, `Calling phone number ${phoneNumber}`);
			let skillName: string
			if (TestRunInfo.environment == Environment.USERHUB) {
				skillName = SkillCore.getSkillName(skillType);
			} else if (TestRunInfo.environment == Environment.CXONE) {
				skillName = SkillCore.getEvolveSkillName(skillType);
			}
			let isMultiSkill: boolean = await this.doesAgentHaveMultiOBSkills(agent);
			let isPopoverOpened: boolean = await this.pnlAdvancedAddressBook.isDisplayed(TestRunInfo.shortTimeout);

			if (openMenu || isPopoverOpened == false)
				await this.openMaxPopOver(ToolbarButton.NEW);

			await this.searchAddressBook(phoneNumber);
			await this.lblResultItem(phoneNumber).wait();
			await this.lblResultItem(phoneNumber).moveMouse();
			await this.btnCall.click();

			if (isMultiSkill) {
				await this.pnlSkillList(phoneNumber).waitUntilCssValueNotChange("height", 1);
				await this.pnlSkillList(phoneNumber).waitUntilPropertyChange("aria-hidden", 1);
				await this.miCallSkill(skillName).click();
			}

			await this.btnCall.waitUntilDisappear();
			await this.divCallWorkspace.wait();
			await this.waitForCallDialling();
		} catch (err) {
			if (timeOut > 0) {
				timeOut--;
				await this.callPhoneNumber(agent, phoneNumber, skillType, false, timeOut);
			} else
				throw new errorwrapper.CustomError(this.callPhoneNumber, err.message);
		}
	}

	/**
	 * Check MAX page is displayed or not
	 * @returns {Promise<boolean>} the existence of MAX page
	 * @memberof MaxPage
	 */
	public async isPageDisplayed(): Promise<boolean> {
		try {
			return await this.btnStateSection.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * Change MAX state
	 * @param {MaxState} maxState State of agent
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async changeState(maxState: MaxState): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Changing MAX state to ${maxState}`);
			await this.btnStateSection.click();
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.
			await this.lblMaxStateItem(maxState).click();
			await this.lblMaxStateItem(maxState).waitUntilDisappear();
			await BrowserWrapper.sleepInSecond(2); //Handle for Agent crash issue sleep 2 seconds.
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeState, err.message);
		}
	}

	/**
	 * Log out MAX
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async logOut(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Logging out from MAX");
			await this.changeState(MaxState.LOGOUT);
			await this.btnConfirmLogoutMAX.click();
			await BrowserWrapper.waitForNumberOfWindows(1);
			await BrowserWrapper.switchWindow(0);
		} catch (err) {
			throw new errorwrapper.CustomError(this.logOut, err.message);
		}
	}


	/**
 * Change MAX state in Max glance overlay
 * @param {MaxState} maxState State of agent
 * @returns {Promise<MaxPage>} 
 * @memberof MaxPage
 */
	public async changeStateInMaxGlanceOverlay(maxState: MaxState): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Changing MAX state to ${maxState}`);
			await this.btnStateSection.click();
			await BrowserWrapper.sleepInSecond(1);
			await this.lblMaxStateItem(maxState).waitForControlStable();
			await this.lblMaxStateItem(maxState).click();
			await this.lblMaxStateItem(maxState).waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeStateInMaxGlanceOverlay, err.message);
		}
	}

	/**
	 * Log out MAX in Max glance overlay
	 * @returns {Promise<void>} 
	 * @memberof MaxPage
	 */
	public async logOutInMaxGlanceOverlay(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Logging out from MAX");
			await this.changeStateInMaxGlanceOverlay(MaxState.LOGOUT);
			await this.btnConfirmLogoutMAX.click();
			await BrowserWrapper.waitForNumberOfWindows(1);
			await BrowserWrapper.switchWindow(0);
		} catch (err) {
			throw new errorwrapper.CustomError(this.logOutInMaxGlanceOverlay, err.message);
		}
	}
	/**
	 * Wait for loading
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async waitForLoading(): Promise<MaxPage> {
		try {
			await this.divSpinner.waitUntilDisappear();
			await this.divMaxWrapper.wait();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoading, err.message);
		}
	}

	/**
	 * Enter launch MAX form
	 * @param {MaxConnectOption} phoneType Phone Type value
	 * @param {string} phoneNumber Phone number value
	 * @param {boolean} [rememberMe=false] Select Remember Me checkbox, default value is false
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async enterLaunchForm(phoneType: MaxConnectOption, phoneNumber: string, rememberMe: boolean = false, loopTimes: number = 1): Promise<MaxPage> {
		try {
			let sw: StopWatch = new StopWatch();
			sw.startClock();

			await BrowserWrapper.sleepInSecond(TestRunInfo.shortTimeout);

			if (phoneType == MaxConnectOption.SOFT_PHONE) {
				await this.radSoftPhone.click();
			} else {
				await Logger.write(FunctionType.UI, "Entering information to the Launching Max form");

				try {
					if (phoneType == MaxConnectOption.PHONE) {
						await this.radPhone.click();
						await this.txtPhone.waitForControlStable();
						await this.txtPhone.type(phoneNumber);
					} else if (phoneType == MaxConnectOption.STATION_ID) {
						await this.radStation.click();
						await this.txtStation.type(phoneNumber);
					}
				} catch (error) {
					if (sw.getElapsedTimeInSecond() >= 30 && loopTimes > 0) {
						await BrowserWrapper.refreshPage();
						loopTimes--;
						await this.enterLaunchForm(phoneType, phoneNumber, rememberMe, loopTimes);
					}
				}
			}

			if (rememberMe) {
				await this.chkRememberMe.click();
			}
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.enterLaunchForm, err.message);
		}
	}

	/**
	 * Submit MAX launch form
	 * @param {MaxConnectOption} phoneType Phone Type value
	 * @param {string} phoneNumber Phone number value
	 * @param {boolean} [rememberMe=false] Select Remember Me checkbox, default value is false
	 * @returns {Promise<MaxPage>} 
	 * @memberof MaxPage
	 */
	public async submitLaunchForm(phoneType: MaxConnectOption, phoneNumber: string, rememberMe: boolean = false, loopTimes: number = 3): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Submitting MAX launch form");
			await this.enterLaunchForm(phoneType, phoneNumber, rememberMe, loopTimes);
			await this.btnConnect.click();
			await this.btnNewToolbar.wait();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.submitLaunchForm, err.message);
		}
	}

	/**
	 * Connect MAX
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async connectMax(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Connecting MAX");
			await this.btnConnect.click();
			await this.btnNewToolbar.wait();
			await this.btnStateSection.waitForVisibilityOf();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.connectMax, err.message);
		}
	}

	/**
	 * Connect MAX for MAX glance preview
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async connectMaxForMAXGlancePreview(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Connecting MAX - opens to MAX glance preview");
			await this.btnConnect.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.connectMaxForMAXGlancePreview, err.message);
		}
	}

	/**
	 * Get entered phone number
	 * @param {MaxConnectOption} phoneType Phone Type value
	 * @returns {Promise<string>} phone number 
	 * @memberof MaxPage
	 */
	public async getEnteredPhone(phoneType: MaxConnectOption): Promise<string> {
		try {
			let result: {} = "";
			if (phoneType == MaxConnectOption.PHONE) {
				await Logger.write(FunctionType.UI, "Getting entered phone number");
				result = await BrowserWrapper.executeScript("return document.getElementById('phoneNumberText').value;");
			}
			else if (phoneType == MaxConnectOption.STATION_ID) {
				await Logger.write(FunctionType.UI, "Getting entered station ID");
				result = await BrowserWrapper.executeScript("return document.getElementById('stationIdText').value;");
			}
			return <string>result;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEnteredPhone, err.message);
		}
	}

	/**
	 * Check MAX is launched or not 
	 * @author Phat.Ngo
	 * @returns {Promise<boolean>} the existence of MAX
	 * @memberof MaxPage
	 */
	public async isMaxLaunched(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnStateSection.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxLaunched, err.message);
		}
	}

	/**
	 * Get agent status
	 * @returns {Promise<string>} Agent state
	 * @memberof MaxPage
	 */
	public async getAgentStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting Agent Status");
			await this.btnStateSection.waitForControlStable();
			return await this.btnStateSection.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentStatus, err.message);
		}
	}

	/**
	 * Check the call is accepted or not 
	 * @returns {Promise<boolean>} existence of Workspace and Hang Up button
	 * @memberof MaxPage
	 */
	public async isCallAccepted(): Promise<boolean> {
		try {
			if (await this.divCallWorkspace.isDisplayed()) {
				return await this.btnHangUp.isDisplayed();
			} else {
				return false;
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallAccepted, err.message);
		}
	}

	/**
	 * End call
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async endCall(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Ending call");

			//Vary the call length, then at least 10 seconds but no more than 30
			await BrowserWrapper.sleepInSecond(Utility.getRandomNumber(2, 10, 30));
			await this.btnHangUp.click();
			await this.btnConfirmHangUp.click();
			await this.btnConfirmHangUp.waitUntilDisappear();
			await this.divCallWorkspace.waitUntilDisappear();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.endCall, err.message);
		}
	}

	/**
	 * Check the call is ended or not
	 * @returns {Promise<boolean>} the Agent state
	 * @memberof MaxPage
	 */
	public async isCallEnded(): Promise<boolean> {
		try {
			await this.btnStateSection.waitUntilPropertyChange("title");
			return (await this.getAgentStatus() == MaxState.AVAILABLE.toUpperCase());
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCallEnded, err.message);
		}
	}

	/**
	 * Waiting for call dialling
	 * @returns {Promise<void>} the Agent state
	 * @memberof MaxPage
	 */
	public async waitForCallDialling(timeoutInSecond: number = TestRunInfo.longTimeout): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for call dialling");
			await this.lblDialling.waitUntilDisappear(timeoutInSecond);
			await this.btnRecord.waitUntilPropertyNotChange("value", timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForCallDialling, err.message);
		}
	}

	/**	
	 * Wait for call workspace
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async waitForCallWorkspace(timeoutInSecond?: number): Promise<MaxCall> {
		try {
			await this.pnlCallWorkspace.wait(timeoutInSecond);
			await Utility.delay(5); //Add wait 5 second after receive call to make call valid
			let maxCall = require("./max-call-page").default;
			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForCallWorkspace, err.message);
		}
	}

	/**
	 * Click WFO button
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async clickWFO(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking WFO button");
			if (await this.divScheduleList.isDisplayed(TestRunInfo.shortTimeout) == false) {
				await this.btnWFO.click();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickWFO, err.message);
		}
	}

	/**
	 * Check the present of Session Connect Section
	 * @author Phat.Ngo
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isSessionConnectSectionDisplayed(): Promise<boolean> {
		try {
			return await this.divMaxLaunchForm.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isSessionConnectSectionDisplayed, err.message);
		}
	}

	/**
	 * Accepting the inbound call transfer
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async acceptInBoundCallContactTransfer(): Promise<MaxCall> {
		try {
			await Logger.write(FunctionType.UI, "Accepting the inbound call transfer");
			await this.btnCallContact.waitForPresenceOf();
			await this.btnCallContact.click();
			await this.pnlCallWorkspace.wait();
			await Utility.delay(5);//Add wait 5 second after receive call to make call valid
			let maxCall = require("./max-call-page").default;
			return maxCall.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptInBoundCallContactTransfer, err.message);
		}
	}

	/** is WFO Page displayed
	 * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} MAX page
	 * @memberof MaxPage
	 */
	public async isWFOTabDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlWFO.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isWFOTabDisplayed, err.message);
		}
	}

	/**
	 * Close WFO
	 * @author Nhat.Nguyen
	 * @returns {Promise<MaxPage>} MAX page
	 * @memberof MaxPage
	 */
	public async closeWFO(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Closing WFO");
			await BrowserWrapper.pressKey(Button.ESCAPE)
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeWFO, err.message);
		}
	}

	/**
	 * Checking schedule list is displayed on wfo
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isScheduleListDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.divScheduleList.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScheduleListDisplayed, err.message);
		}
	}

	/**
	 * Opening WFO panel
	 * @author Y.Le
	 * @returns {Promise<MAXWFOPanel>}
	 * @memberof MaxPage
	 */
	public async openWFOPanel(): Promise<MAXWFOPanel> {
		try {
			await Logger.write(FunctionType.UI, "Opening WFO panel");
			await this.btnWFOPanel.click();
			let maxWFOPanel = require("@page-objects/CXone/max/max-wfo-panel").default;
			return await maxWFOPanel.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openWFOPanel, err.message);
		}
	}

	/**
 	* Hide MAX glance
 	* @author Y.Le
 	* @returns {Promise<void>}
 	* @memberof MaxPage
 	*/
	public async hideMaxGlance(): Promise<void> {
		try {
			if (await this.pnlMaxGlanceOverlay.isDisplayed(TestRunInfo.shortTimeout)) {

				await Logger.write(FunctionType.UI, "Hiding MAX glance");
				let sizeContainer: ISize = await this.pnlModuleContainer.getSize();
				await Logger.write(FunctionType.UI, "container height " + sizeContainer.height);
				await Logger.write(FunctionType.UI, "container width " + sizeContainer.width);
				let sizeGlance: ISize = await this.pnlGlanceWorkspace.getSize();
				await Logger.write(FunctionType.UI, "contact workspace height " + sizeGlance.height);
				await Logger.write(FunctionType.UI, "contact workspace width " + sizeGlance.width);
				let x: number;
				let y: number;
				if (TestRunInfo.browser === Browser.CHROME || TestRunInfo.browser === Browser.EDGE) //handle for Chrome: Control coordinate is start at central
				{
					x = (sizeContainer.width - sizeGlance.width) / 4 + sizeGlance.width;
					y = sizeContainer.height / 2;
				}
				else //handle for FF and IE: Control coordinate is start at top left corner
				{
					x = ((sizeContainer.width - sizeGlance.width) / 2 + sizeGlance.width) - (sizeContainer.width / 2);
					y = 0;
				}

				// await this.pnlModuleContainer.moveMouse({ x: x, y: y });
				if (sizeContainer.width > 0) {
					await BrowserWrapper.mouseMove({ x: x, y: y });
					await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.hideMaxGlance, err.message);
		}
	}


	/** Close Session Connect Section form
	* @author Phat.Ngo
	* @returns {Promise<void>}
	* @memberof MaxPage
	*/
	public async closeSessionConnectSection(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Closing 'Session Connect Section' form");
			await BrowserWrapper.close();
			await BrowserWrapper.waitForNumberOfWindows(1);
			await BrowserWrapper.switchWindow(0);
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeSessionConnectSection, err.message);
		}
	}

	/** Check schedule displayed correctly
	* @author Anh.Le
	* @param activityName: string
	* @param startTime: string
	* @param endTime: string
	* @returns {Promise<boolen>}
	* @memberof MaxPage
	*/
	public async isScheduleItemDisplayed(activityName: string, startTime: string, endTime: string): Promise<boolean> {
		try {
			let activityType1 = await this.divScheduleItem(activityName, startTime, endTime).isDisplayed(TestRunInfo.middleTimeout);
			let activityType2 = await this.divComingUpItem(activityName, startTime).isDisplayed(TestRunInfo.middleTimeout);
			return activityType1 ? activityType1 : activityType2 ? activityType2 : null;
		} catch (error) {
			throw new errorwrapper.CustomError(this.isScheduleItemDisplayed, error.message);
		}
	}

	/**
	 * Check contact workspace is displayed or not
	 * @param {string} contactType
	 * @param {boolean} [state=true]
	 * @returns {Promise<boolean>} the existence of contact workspace
	 * @memberof MaxPage
	 */
	public async isContactWorkSpaceDisplayed(contactName: ContactName, timeoutInSecond?: number): Promise<boolean> {
		try {
			switch (contactName) {
				case ContactName.EMAIL: {
					return await this.pnlEmailWorkSpace.isDisplayed(timeoutInSecond);
				}
				case ContactName.PHONE_CALL: {
					return await this.pnlCallWorkspace.isDisplayed(timeoutInSecond);
				}
				case ContactName.WORK_ITEM: {
					return await this.pnlWorkItemWorkSpace.isDisplayed(timeoutInSecond);
				}
				case ContactName.CHAT: {
					return await this.pnlChatWorkspace.isDisplayed(timeoutInSecond);
				}
				case ContactName.VOICE_MAIL: {
					return await this.pnlVoiceMailWorkSpace.isDisplayed(timeoutInSecond);
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.isContactWorkSpaceDisplayed, err.message);
		}
	};



	/**
	 * Select Max more tool item 
	 * @author Chinh.Nguyen
	 * @param {string} itemName
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async selectMaxMoreToolItem(itemName: string): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Selecting MAX more tool ${itemName}`);
			await this.lblMaxMoreToolItem(itemName).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectMaxMoreToolItem, err.message);
		}
	}

	/**
	 * Change button 'New' is disable
	 * @author Chinh.Nguyen
	 * @param {State} state
	 * @param {boolean} [closeMoreTools]
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async changeMax24HourClockSetting(state: State, closeMoreTools?: boolean): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Changing 24 hour clock setting");
			await this.btnToolbar("More").click();
			await this.setMax24HourClockSetting(state);
			if (closeMoreTools) {
				await this.closePopover();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeMax24HourClockSetting, err.message);
		}
	}

	/**
	 * Close popover
     * @author Y.Le
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async closePopover(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Closing Popover`);
			await BrowserWrapper.pressKey(Button.ESCAPE);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.closePopover, err.message);
		}
	}

	/**
	 * Open More Toolbar on MAX
	 * @author Y.Le
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async openMoreToolbar(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking More button`);
			await this.btnMore.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.openMoreToolbar, err.message);
		}
	}

	/**
	 * Wait for MAX Glance stable
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async waitForMAXGlanceStable(): Promise<MaxPage> {
		try {
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForMAXGlanceStable, err.message);
		}
	}

	/**
	 * Set Max 24 hour clock mode
	 * @author Chinh.Nguyen
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async setMax24HourClockSetting(state: State): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting MAX 24 hour clock setting`);

			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.selectMaxMoreToolItem("Settings");
			let HourMode: string = await this.lbl24HourClockStatus.getText();

			if (state.toLocaleLowerCase() != HourMode) {
				await this.btn24HourClock.click();

				if (state == State.ON) {
					await this.waitForMAXGlanceStable();
					await BrowserWrapper.sleepInSecond(10); // Wait for MAX glance changing contrast completely
				}
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.setMax24HourClockSetting, err.message);
		}
	}

    /**
	 * Set Max Panels mode
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async setMaxADASetting(state: State): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Setting MAX Panels`);
			let panelName: string = await this.pnlMore.getAttribute('data-current-context');
			let i: number = 0;

			while (panelName != 'more' && i < TestRunInfo.shortTimeout) {
				await this.btnBackArrow.click();
				panelName = await this.pnlMore.getAttribute('data-current-context');
				i++;
			}
			await this.btnSetting.click()
			let ADAMode: string = await this.lblADAHighContrastStatus.getText();

			if (state.toLocaleLowerCase() != ADAMode) {
				await this.btnADAHighContrast.click();

				if (state == State.ON) {
					await this.waitForMAXGlanceStable();
					await BrowserWrapper.sleepInSecond(10); // Wait for MAX glance changing contrast completely
				}
			}

			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.setMaxADASetting, err.message);
		}
	}

	/**
	 * Get 24 hour clock mode
	 * @author Chinh.Nguyen
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async get24HourClockMode(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting 24 hour clock mode");

			return this.lbl24HourClockStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.get24HourClockMode, err.message);
		}
	}

	/**
	 * Checking button 'New' is disable
	 * @author Y.Le
	 * @param {string} title
	 * @returns {Promise<void>}
	 * @returns {Promise<boolean>} disable or not
	 * @memberof MaxPage
	 */
	public async changeMaxADASetting(state: State, closeMoreTools?: boolean): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Changing ADA setting");
			await this.openMoreToolbar();
			await this.setMaxADASetting(state);
			if (closeMoreTools) {
				await this.closePopover();
			}
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.changeMaxADASetting, err.message);
		}
	}

	/**
	 * Get ADA High Contrast status
	 * @returns {Promise<string>} status
	 * @memberof MaxPage
	 */
	public async getADAHighContrastStatus(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "Getting ADA High Contrast status")
			await this.lblADAHighContrastStatus.waitUntilPropertyNotChange('width');
			return await this.lblADAHighContrastStatus.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getADAHighContrastStatus, err.message);
		}
	}

	/**
	 * Check schedule is displayed in WFO panel or not
	 * @author Chinh.Nguyen
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isScheduleDisplayedInWFOPanel(itemName: string, startTime: string, endTime: string, timeoutInSecond: number, fullClock: boolean = false): Promise<boolean> {
		try {
			return await this.lblWFOItem(itemName, startTime, endTime, fullClock).isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isScheduleDisplayedInWFOPanel, err.message);

		}
	}

	/** Getting Size of full Max window
	 * @author Y.Le
	 * @returns {Promise<ISize>}
	 * @memberof MaxPage
	 */
	public async getSizeMaxFullWindow(): Promise<ISize> {
		try {
			await Logger.write(FunctionType.UI, "Getting Size of full Max window");
			return await this.divMaxFull.getSize();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSizeMaxFullWindow, err.message);
		}
	}

	/**
	 * Check customer workspace label is displayed
	 * @author Y.Le
	 * @param {string} label
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isCustomerWorkspaceLabelDisplayed(label: string, timeOut?: number): Promise<boolean> {
		try {
			return await this.lblCustomerWorkspace(label).isDisplayed(timeOut)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerWorkspaceLabelDisplayed, err.message);
		}
	}

	/**
	 * Check Digital Engagement workspace link is displayed on the MAX glance
	 * @author Devi
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isDigitalEngementWorkspaceLinkDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.lblDigitalEngagementWorkspace.isDisplayed(timeOut)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDigitalEngementWorkspaceLinkDisplayed, err.message);
		}
	}

	/**
 * Click a specific customer workspace label/link on MAX
 * @author Devi K V
 * @param {string} label
 * @param {number} [timeOut]
 * @returns {Promise<MaxPage>}
 * @memberof MaxPage
 */
	public async clickCustomerWorkspaceLink(label: string, timeOut?: number): Promise<MaxPage> {
		try {
			await this.lblCustomerWorkspace(label).click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickCustomerWorkspaceLink, err.message);
		}
	}

	/**
	 * Check BE workspca close button is displayed
	 * @author Devi K V
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isBEWorkspaceCloseButtonDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.btnWFOBrandEmbassyWorkspaceClose.isDisplayed(timeOut)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isBEWorkspaceCloseButtonDisplayed, err.message);
		}
	}

	/**
	 * Check Open WFO link/button is displayed
	 * @author Devi K V
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isOpenWFODisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.btnOpenWFO.isDisplayed(timeOut)
		} catch (err) {
			throw new errorwrapper.CustomError(this.isOpenWFODisplayed, err.message);
		}
	}

	/**
	 * Getting customer workspace panel title
	 * @author Y.Le
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getCustomerWorkspacePanelTitle(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "getting customer workspace panel title");
			let panelTitle = await this.ifrWFOPanel.getAttribute('src');
			return panelTitle;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCustomerWorkspacePanelTitle, err.message);
		}
	}

	/**
	 * Getting customer workspace panel url of Brand Embassy
	 * @author Devi K V
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getCustomerWorkspacePanelUrlBrandEmbassy(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "getting customer workspace panel url of Brand Embassy");
			//await this.ifrWFOBrandEmbassyContainer.switchToFrame();
			let panelTitle = await this.ifrWFOBrandEmbassyContainer.getAttribute('src');
			await BrowserWrapper.switchToDefaultContent();
			return panelTitle;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getCustomerWorkspacePanelUrlBrandEmbassy, err.message);
		}
	}

	/**
	 * Getting customer workspace panel visibility for Brand Embassy
	 * @author Devi K V
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getBECustomerWorkspaceVisibility(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "getting customer workspace panel title of Brand Embassy");
			let panelVisibility = await this.ifrWFOBrandEmbassyContainerParent.getAttribute('class');
			return panelVisibility;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getBECustomerWorkspaceVisibility, err.message)
			;
		}
	}

	/**
	 * Getting WFO workspace visibility
	 * @author Devi K V
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getWFOWorkspaceVisibility(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, "getting WFO workspace visibility");
			let panelVisibility = await this.ifrWFOWorkspace.getAttribute('class');
			return panelVisibility;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getWFOWorkspaceVisibility, err.message)
			;
		}
	}

	/**
		 * Close Brand Embassy customworkspace on MAX
		 * @returns {Promise<MaxPage>}
		 * @memberof MaxPage
		 */
	public async clickBECustomWorkspaceCloseButton(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Brand Embassy CustomWorkspace Close Button`);
			await BrowserWrapper.sleepInSecond(1);
			await BrowserWrapper.executeScript(`document.querySelector('div[data-wfoworkspaceid="-2"] div.wfo-workspace-close-button').click()`);
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickBECustomWorkspaceCloseButton, err.message);
		}
	}


	/**
	 * Check Max glance is displayed
	 * @author Lien.Nguyen
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMaxGlanceDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.pnlGlanceWorkspace.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMaxGlanceDisplayed, err.message);
		}
	}

	/**
	 * Show MAX glance
	 * @author Y.Le
	 * @returns {Promise<void>}
	 * @memberof MaxPage
	 */
	public async showMaxGlance(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Showing MAX glance");
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			await this.icoStatus.moveMouse();
			await this.pnlGlanceWorkspace.waitUntilPropertyNotChange('width');
			await this.icoStatus.wait();
		} catch (err) {
			throw new errorwrapper.CustomError(this.showMaxGlance, err.message);
		}
	}



	/**
	 * Check new contact pop up is displayed or not
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>} Return value of isNewContactPopUpDisplayed()
	 * @memberof MaxPage
	 */
	public async isNewContactPopUpDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.newContactPopUp.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isNewContactPopUpDisplayed, err.message);
		}
	}

	/**
	 * Check Max Message popover is displayed
	 * @author Phat Ngo
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
	public async isMessagePopoverDisplayed(timeOut?: number): Promise<boolean> {
		try {
			return await this.pnlMessage.isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMessagePopoverDisplayed, err.message);
		}
	}

	/**
	 * Accept new chat contact
	 * @returns {Promise<MaxChatPage>} Return MaxChatPage
	 * @memberof MaxPage
	 */
	public async acceptNewChatContact(): Promise<MaxChatPage> {
		try {
			await Logger.write(FunctionType.UI, "Accepting new chat contact pop up");
			await this.btnAccept.waitForControlStable();
			await this.btnAccept.click();
			await this.btnAccept.waitUntilDisappear();
			let maxChatPage = require(`${ProjectPath.pageObjects}/CXone/max/max-chat-page`).default;
			return maxChatPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.acceptNewChatContact, err.message);
		}
	}

	/**
	 * Refresh Max Page
	 * @author Phat.Truong
	 * @returns {Promise<MaxPage>} MaxPage
	 * @memberof MaxPage
	 */
	public async refreshMaxPage(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Refreshing Max Page");
			await BrowserWrapper.refreshPage();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.refreshMaxPage, err.message);
		}
	}

	/**
	 * Getting event in devtools
	 * @author Phat.Truong
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getSchedulesUserEvent(): Promise<any> {
		let tempArr = []

		try {
			await Logger.write(FunctionType.UI, "Getting schedule event in Devtools");
			await BrowserWrapper.getDriverInstance().manage().logs().get('performance').then((browserLogs) => {
				browserLogs.forEach(async (browserLog) => {
					try {
						let message = JSON.parse(browserLog.message).message;
						if (message.method == "Network.requestWillBeSent") {
							if (message.params.request.url.indexOf("schedules/user/") > -1) {
								await tempArr.push(message.params.request.url);
							}
						}
					} catch (e) {
					}
				});

			})
			return await tempArr[tempArr.length - 1];
		} catch (err) {
			throw new errorwrapper.CustomError(this.getSchedulesUserEvent, err.message);
		}
	}

	/**
	 * Click Messages button
	 * @author Phat.Truong
	 * @returns {Promise<MAXMessagePanel>} MAX page
	 * @memberof MaxPage
	 */
	public async clickMessagesButton(): Promise<MAXMessagePanel> {
		try {
			await Logger.write(FunctionType.UI, "Clicking Messages button");
			await this.waitForLoading();
			await this.btnMessage.waitForVisibilityOf();
			await this.btnMessage.moveMouse();
			await this.btnMessage.click();
			let MAXMessagePanel = require(`${ProjectPath.pageObjects}/CXone/max/max-message-panel`).default;
			return MAXMessagePanel.getInstance();

		} catch (err) {
			throw new errorwrapper.CustomError(this.clickMessagesButton, err.message);
		}
	}

	/**	
	 * Click on Record button
     * @author Y.Le
	 * @returns {Promise<MaxCall>}
	 * @memberof MaxPage
	 */
	public async clickRecordButton(): Promise<MaxPage> {
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
	 * Open toolbar button
	 * @author Anh.Le
	 * @param {string} buttonName name of button
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async openToolbarButton(buttonName: string): Promise<any> {
		try {
			await Logger.write(FunctionType.UI, `Opening toolbar button ${buttonName}`);
			await this.btnToolbar(buttonName).click();

			if (buttonName = "More") {
				return await MaxMoreToolsPage.getInstance();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.openToolbarButton, err.message);
		}
	}

	/**
	 * Click New button on MAX
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async clickNew(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, `Clicking New button`);
			await this.btnNew.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickNew, err.message);
		}
	}

	/**
	 * Get value in search address book.
	 * @author Tan.Ta
	 * @returns {Promise<MaxPage>}
	 * @memberof MaxPage
	 */
	public async getValueInSearchAddressBook(): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Clicking New button`);
			return await this.txtSearch.getControlValue();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getValueInSearchAddressBook, err.message);
		}
	}

	/**
	 * Click email button
	 * @author Tan.Ta
	 * @param {string} [emailAddress]
	 * @returns {Promise<MaxEmailPage>}
	 * @memberof MaxPage
	 */
	public async selectEmailFromAddressBook(emailAddress?: string): Promise<MaxEmailPage> {
		try {
			await this.btnEmailAddressBook(emailAddress).click();
			let maxEmail = require(`${ProjectPath.pageObjects}/CXone/max/max-email`).default;
			return await maxEmail.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.selectEmailFromAddressBook, err.message);
		}

	}

	/**	
	* Wait for chat workspace
	* @author Nhat.Nguyen
	* @returns {Promise<MaxChatPage>}
	* @memberof MaxPage
	*/
	public async waitForChatWorkspace(): Promise<MaxChatPage> {
		try {
			await this.pnlChatWorkspace.wait();
			let maxChatPage = require(`${ProjectPath.pageObjects}/CXone/max/max-chat-page`).default;

			return maxChatPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForChatWorkspace, err.message);
		}
	}

}