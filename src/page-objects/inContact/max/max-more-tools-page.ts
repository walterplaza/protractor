import { Button } from "@data-objects/general/general";
import { ToolsOption } from "@data-objects/general/max";
import TestRunInfo from "@data-objects/general/test-run-info";
import MaxOverviewPage from "@page-objects/inContact/max/max-overview-page";
import MaxPage from "@page-objects/inContact/max/max-page";
import { FunctionType, Logger } from '@utilities/general/logger';
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Browser, by } from "protractor";
import { protractor } from "protractor/built/ptor";

export default class MaxMoreToolsPage {

	private static _maxMoreToolsPage: MaxMoreToolsPage = null;

	public static async getInstance(): Promise<MaxMoreToolsPage> {
		this._maxMoreToolsPage = new MaxMoreToolsPage();
		return this._maxMoreToolsPage;
	}

	protected pnlMoreToolsPanel = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']"));
	protected pnlInformationPanel = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel'][@data-current-context='information']"));
	protected btnClearEventLog = new ElementWrapper(by.xpath("//button[@class='event-clear-log']"));
	protected lblEventLog = new ElementWrapper(by.xpath("//ul[@class='event-log-item-list']/li[1]"));
	protected tbInformation = new ElementWrapper(by.xpath("//li[contains(@data-button-type, 'information')]"))
	protected lblAgentID = new ElementWrapper(by.xpath("//div[contains(@class,'information')]//div[contains(@class,'agent-id')]"));
	protected lblPhoneNumber = new ElementWrapper(by.xpath("//div[contains(@class,'information')]//div[contains(@class,'phone-number')]"));
	protected tbEventLog = new ElementWrapper(by.xpath("//li[contains(.,'Event Log')]"));
	protected btnBack = new ElementWrapper(by.xpath("//div[@class='popover-panel more-panel']//div[@class='clickthrough-back']/*[name()='svg' and @class='navigation-arrow-back-svg injected-svg']"));
	protected hdrEventLog = new ElementWrapper(by.xpath("//header[.='Event Log']"));
	protected lblEventLogSession = new ElementWrapper(by.xpath("//div[@class='event-header']"));
	protected hdrInformation = new ElementWrapper(by.xpath("//header[.='Information']"));
	protected lblStationID = new ElementWrapper(by.xpath("//div[.='Station ID']"));
	protected lblCallerID = new ElementWrapper(by.xpath("//div[.='Caller ID']"));
	protected lblCurrentContacts = new ElementWrapper(by.xpath("//div[.='Current Contacts']"));
	protected lblBrowserLanguage = new ElementWrapper(by.xpath("//div[.='Browser Language']"));
	protected divAgentID = new ElementWrapper(by.xpath("//div[contains(@class,'information')]//div[contains(@class,'agent-id')]"));
	protected lblBrowserVersion = new ElementWrapper(by.xpath("//div[.='Browser Version']"));
	protected lblVersion = new ElementWrapper(by.xpath("//div[.='Version']"));
	protected lblSessionID = new ElementWrapper(by.xpath("//div[.='Session ID']"));
	protected lblAgentLegID = new ElementWrapper(by.xpath("//div[.='Agent Leg ID']"));
	protected lblWebserver = new ElementWrapper(by.xpath("//div[@class='small-6 columns web-server']"));
	protected lblVirtualCluster = new ElementWrapper(by.xpath("//div[@class='small-6 columns virtual-cluster']"));
	protected lblBrowserLocalization = new ElementWrapper(by.xpath("//div[.='Browser Localization']"));
	protected lblCurrentTimeTimezone = new ElementWrapper(by.xpath("//div[@class='current-time-timezone-title-row']"));
	protected lblTeamName = new ElementWrapper(by.xpath("//div[.='Team Name']"));
	protected lblRouting = new ElementWrapper(by.xpath("//div[.='Routing']"));
	protected lblConcurrentChats = new ElementWrapper(by.xpath("//div[.='Concurrent Chats']"));
	protected pnlPopoverBackground = new ElementWrapper(by.xpath("//div[@class='popover-background']"));
	protected hdrMoreTools = new ElementWrapper(by.xpath("//header[@title='More Tools']"));

	// Dynamic controls
	protected btnToolbar(buttonName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//h1[@title ='${buttonName}']`));
	}

	protected toolbarItem(toolbarName: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//div[@id='toolBarSection']//button/div[contains(text(), '${toolbarName}')]`));
	}

	/**
	 * Show more tools option
	 * @param {string} option
	 * @returns {Promise<any>}
	 * @memberof MaxMoreToolsPage
	 */
	public async showMoreTools(option: string): Promise<any> {
		try {
			await Logger.write(FunctionType.UI, `Showing more tools option item ${option}`);
			await this.btnToolbar(option).click();
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.showMoreTools, err.message);
		}
	}

	/**
	 * Clear Content of Event Log
	 * @returns {Promise<MaxMoreToolsPage>}
	 * @memberof MaxMoreToolsPage
	 */
	public async ClearEventLog(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, "Clearing Event Log Content");
			await this.btnClearEventLog.click();
			return await this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.ClearEventLog, err.message);
		}
	}

	/**
	 * Check Event Log Content is displayed or not
	 * @returns {Promise<boolean>} the existence of Event Log Content
	 * @memberof MaxMoreToolsPage
	 */
	public async isEventLogDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEventLog.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEventLogDisplayed, err.message);
		}
	}

	/**
	 * Show Information
	 * @author: Phat.Ngo
	 * @returns {Promise<MaxMoreToolsPage>}
	 * @memberof MaxMoreToolsPage
	 */
	public async goToMoreInformation(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, "Going To More Information");
			await this.tbInformation.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.goToMoreInformation, err.message);
		}
	}

	/**
	 * Check Agent ID from Information 
	 * @author: Phat.Ngo
	 * @returns {Promise<String>}
	 * @memberof MaxMoreToolsPage 
	 */
	public async getAgentID(): Promise<string> {
		try {
			return await this.lblAgentID.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentID, err.message);
		}
	}

	/**
	 * Check Agent Phone form Information
	 * @author: Phat.Ngo
	 * @returns {Promise<String>}
	 * @memberof MaxMoreToolsPage
	 */
	public async getAgentPhoneNumber(): Promise<string> {
		try {
			return await this.lblPhoneNumber.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentPhoneNumber, err.message);
		}
	}

	/**
	 * Check More Tools Panel Displayed
	 * @author Phat.Ngo
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxMoreToolsPage
	 */
	public async isMoreToolsPanelDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.pnlMoreToolsPanel.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isMoreToolsPanelDisplayed, err.message);
		}
	}

	/**
	 * Check Information Panel Displayed
	 * @author: Phat.Ngo
	 * @returns {Promise<boolean>}
	 * @memberof MaxMoreToolsPage
	 */
	public async isInformationPanelDisplayed(): Promise<boolean> {
		try {
			return await this.pnlMoreToolsPanel.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isInformationPanelDisplayed, err.message);
		}
	}

	/**
	 * Go To More Event Log
	 * @returns {Promise<MaxMoreToolsPage>} Return MaxMoreToolsPage
     * @author Tung.Vo
	 * @memberof MaxMoreToolsPage
	 */
	public async goToMoreEventLog(): Promise<MaxMoreToolsPage> {
		try {
			await Logger.write(FunctionType.UI, "Go To More Event Log");
			await this.tbEventLog.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.goToMoreEventLog, err.message);
		}
	}

	/**
     * Check Header Event Log is displayed or not
     * @returns {Promise<boolean>} Header Event Log is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isHeaderEventLogDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.hdrEventLog.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isHeaderEventLogDisplayed, err.message);
		}
	}

    /**
     *Check Button Clear Event Log is displayed or not
     * @returns {Promise<boolean>} Button Clear Event Log is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isButtonClearEventLogDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.btnClearEventLog.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isButtonClearEventLogDisplayed, err.message);
		}
	}

    /**
     *Check Label Event Log Session is displayed or not
     * @returns {Promise<boolean>} Label Event Log Session is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelEventLogSessionDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEventLogSession.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelEventLogSessionDisplayed, err.message);
		}
	}

    /**
     *Check Header Information is displayed or not
     * @returns {Promise<boolean>} Header Information is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isHeaderInformationDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.hdrInformation.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isHeaderInformationDisplayed, err.message);
		}
	}

    /**
     *Check Label Agent ID is displayed or not
     * @returns {Promise<boolean>} Label Agent ID is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelAgentIDDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblAgentID.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelAgentIDDisplayed, err.message);
		}
	}

    /**
     *Check Label Station ID is displayed or not
     * @returns {Promise<boolean>} Label Station ID is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelStationIDDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblStationID.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelStationIDDisplayed, err.message);
		}
	}

    /**
     *Check Label Phone Number is displayed or not
     * @returns {Promise<boolean>} Label Phone Number is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelPhoneNumberDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblPhoneNumber.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelPhoneNumberDisplayed, err.message);
		}
	}

    /**
     *Check Label Caller ID is displayed or not
     * @returns {Promise<boolean>} Label Caller ID is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelCallerIDDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCallerID.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelCallerIDDisplayed, err.message);
		}
	}

    /**
     *Check Label Current Contacts is displayed or not
     * @returns {Promise<boolean>} Label Current Contacts is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelCurrentContactsDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCurrentContacts.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelCurrentContactsDisplayed, err.message);
		}
	}

    /**
     *Check Label Browser Language is displayed or not
     * @returns {Promise<boolean>} Label Browser Language is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelBrowserLanguageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblBrowserLanguage.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelBrowserLanguageDisplayed, err.message);
		}
	}

    /**
     * Get Agent ID in Information
     * @returns {Promise<string>} returned id of agent
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async getAgentIDInformation(): Promise<string> {
		try {
			return await this.divAgentID.getText();
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAgentIDInformation, err.message);
		}
	}

	/**
	 * Close Toolbar
	 * @returns {Promise<MaxPage>} Return MaxPage
     * @author Tung.Vo
	 * @memberof MaxMoreToolsPage
	 */
	public async closeToolbar(): Promise<MaxPage> {
		try {
			await Logger.write(FunctionType.UI, "Closing More toolbar");
			await this.btnBack.click();
			await this.btnBack.waitUntilDisappear(TestRunInfo.shortTimeout);
			await this.hdrMoreTools.waitForControlStable(TestRunInfo.shortTimeout);
			if (TestRunInfo.browser === Browser.EDGE) {
				await BrowserWrapper.getActions().sendKeys(protractor.Key.ESCAPE).perform();
			}
			else {
				await BrowserWrapper.pressKey(Button.ESCAPE);
			}
			await this.pnlMoreToolsPanel.waitUntilDisappear(TestRunInfo.shortTimeout);
			return await MaxPage.getMaxInstance(false);
		} catch (err) {
			throw new errorwrapper.CustomError(this.closeToolbar, err.message);
		}
	}

    /**
     *Check Label Browser Version is displayed or not
     * @returns {Promise<boolean>} Label Browser Version is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelBrowserVersionDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblBrowserVersion.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelBrowserVersionDisplayed, err.message);
		}
	}

	/**
     *Check Label Version is displayed or not
     * @returns {Promise<boolean>} Label Version is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelVersionDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblVersion.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelVersionDisplayed, err.message);
		}
	}

	/**
     *Check Label Session ID is displayed or not
     * @returns {Promise<boolean>} Label Session ID is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelSessionIDDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblSessionID.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelSessionIDDisplayed, err.message);
		}
	}

	/**
     *Check Label Agent Leg ID is displayed or not
     * @returns {Promise<boolean>} Label Agent Leg ID is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelAgentLegIDDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblAgentLegID.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelAgentLegIDDisplayed, err.message);
		}
	}

	/**
     *Check Label Webserver is displayed or not
     * @returns {Promise<boolean>} Label Webserver is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelWebserverDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblWebserver.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelWebserverDisplayed, err.message);
		}
	}

	/**
     *Check Label Virtual Cluster is displayed or not
     * @returns {Promise<boolean>} Label Virtual Cluster is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelVirtualClusterDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblVirtualCluster.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelVirtualClusterDisplayed, err.message);
		}
	}

	/**
     *Check Label Browser Localization is displayed or not
     * @returns {Promise<boolean>} Label Browser Localization is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelBrowserLocalizationDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblBrowserLocalization.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelBrowserLocalizationDisplayed, err.message);
		}
	}

	/**
     *Check Label Current Time Timezone is displayed or not
     * @returns {Promise<boolean>} Label Current Time Timezone is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelCurrentTimeTimezoneDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCurrentTimeTimezone.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelCurrentTimeTimezoneDisplayed, err.message);
		}
	}

	/**
     *Check Label Team Name is displayed or not
     * @returns {Promise<boolean>} Label Team Name is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelTeamNameDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblTeamName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelTeamNameDisplayed, err.message);
		}
	}

	/**
     *Check Label Routing is displayed or not
     * @returns {Promise<boolean>} Label Routing is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelRoutingDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblRouting.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelRoutingDisplayed, err.message);
		}
	}

	/**
     *Check Label Concurrent Chats is displayed or not
     * @returns {Promise<boolean>} Label Concurrent Chats is display or not
     * @author Tung.Vo
     * @memberof MaxMoreToolsPage
     */
	public async isLabelConcurrentChatsDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblConcurrentChats.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLabelConcurrentChatsDisplayed, err.message);
		}
	}

	/**
     * Open Help page     
     * @author Anh.Ho
	 * @returns {Promise<MaxOverviewPage>} 
     * @memberof MaxMoreToolsPage
     */
	public async openHelpPage(timeoutInSecond?: number): Promise<MaxOverviewPage> {
		try {
			await Logger.write(FunctionType.UI, "Opening Max Help page");
			let index = await BrowserWrapper.getTotalWindows();
			let handles: string;
			let windowHandles: string[] = await BrowserWrapper.getAllWindowHandles();
			await this.showMoreTools(ToolsOption.HELP);
			let newWindowHandles: string[] = await BrowserWrapper.getAllWindowHandles();
			await BrowserWrapper.waitForNumberOfWindows(index + 1);
			for (let i: number = 0; i < windowHandles.length; i++) {
				for (let j: number = 0; j < newWindowHandles.length; j++) {
					if (windowHandles[i] == newWindowHandles[j]) {
						i++;
					} else {
						handles = newWindowHandles[j];
					}
				}
			}
			await BrowserWrapper.switchWindowByHandle(handles);
			return await MaxOverviewPage.getInstance();
		} catch (err) {
			throw new errorwrapper.CustomError(this.openHelpPage, err.message);
		}
	}
}