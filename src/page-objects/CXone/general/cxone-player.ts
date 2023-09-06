import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";

export default class InteractionPlayer extends TopMenu {

	constructor() { super(); }

	private static _interactionPlayer: InteractionPlayer = null;

	public static async getInstance(): Promise<InteractionPlayer> {
		// this._interactionPlayer = (this._interactionPlayer == null) ? new InteractionPlayer() : this._interactionPlayer;
		this._interactionPlayer = new InteractionPlayer();
		await BrowserWrapper.switchWindow(1);
		await this._interactionPlayer.waitForLoading();
		return this._interactionPlayer;
	}

	protected lblCustomer = new ElementWrapper(by.xpath("(//div[@class='participantsSideBar']//span[contains(@class, 'participantName ')])[1]"));
	protected lblAgentName = new ElementWrapper(by.xpath("(//div[@class='participantsSideBar']//span[contains(@class, 'participantName ')])[2]"));
	protected lblCustomerName = new ElementWrapper(by.xpath("(//div[@class='participantsSideBar']//span[contains(@class, 'participantName ')])[3]"));
	protected lblStartTime = new ElementWrapper(by.xpath("//span[@id='recordingStartTime']"));
	protected lblEndTime = new ElementWrapper(by.xpath("//span[@id='recordingEndTime']"));
	protected lblCurrentTotalTime = new ElementWrapper(by.xpath("//span[@id='currentTimeTotalTime']"));
	protected lblTimeline = new ElementWrapper(by.xpath("//div[@id='timelineCanvas']"));
	protected btnPlay = new ElementWrapper(by.xpath("//button[@class='npSvgButton npPlayPauseButton npPlay']"));
	protected btnPause = new ElementWrapper(by.xpath("//button[@class='npSvgButton npPlayPauseButton npPause']"));
	protected lblSubject = new ElementWrapper(by.xpath("//div[@class='bodyContainer']//div[@class='subject ng-binding']"));
	protected lblEmailStartTime = new ElementWrapper(by.xpath("//div[@class='start']//span[@class='startDate ng-binding']"));
	protected lblEmailEndTime = new ElementWrapper(by.xpath("//div[@class='end']//span[@class='endTime ng-binding ng-scope']"));
	protected lblEmailDuration = new ElementWrapper(by.xpath("//div[@class='emailTitle']//div[@class='durationText ng-binding']"));
	protected lblEmailBody = new ElementWrapper(by.xpath("//div[@class='emailBody']/span[@class='bodyText ng-binding']"));
	protected lblEmailAgentName = new ElementWrapper(by.xpath("//div[@class='participantsContainer']//span[@class='participantName ng-scope ng-binding']"));

	protected lblChatStartTime = new ElementWrapper(by.xpath("//div[@class='contactInfo']//span[@id='chatStartDate']"));
	protected lblChatEndTime = new ElementWrapper(by.xpath("//div[@class='contactInfo']//span[@id='chatEndTime']"));
	protected lblChatStartDate = new ElementWrapper(by.xpath("//div[@class='contactInfo']//span[@id='chatStartDate']"));
	protected lblChatAgentName = new ElementWrapper(by.xpath("//div[@class='participantsData']//span[@class='user-name ng-binding ng-scope first']"));
	protected lblChatCustomerName = new ElementWrapper(by.xpath("//div[@class='customerList']//span[@class='user-name ng-binding']"));
	protected tblChartMsg = new ElementWrapper(by.xpath("//div[@class='chatBodyContainer']//table[@class='chatConversation']"));

	protected lblChatMsg(message: string) {
		return new ElementWrapper(by.xpath(`//td[@class='messageTd']/span[@class='chatText ng-binding agent'][text()='${message}']`))
	}

	/**
	 * Check info agent is displayed correctly
	 * @param {string} agentName name of the agent to check 
	 * @param {string} customerName name of the customer to check 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isInfoDisplayedCorrectly(agentName: string, customerName: string): Promise<boolean> {
		try {

			let isAgentDisplayed: boolean;
			let isCustomerDisplayed: boolean;

			if (customerName == "Customer") {
				isAgentDisplayed = await this.isCustomerLabelDisplayed(agentName);
				isCustomerDisplayed = await this.isAgentDisplayed(customerName);
			} else {

				if (await this.isCustomerLabelDisplayed("Customer") == true) {
					isAgentDisplayed = await this.isAgentDisplayed(agentName);

					if (await this.lblCustomerName.isDisplayed(TestRunInfo.shortTimeout)) {
						isCustomerDisplayed = await this.isCustomerDisplayed(customerName);
					}

				} else {
					isAgentDisplayed = await this.isCustomerLabelDisplayed(agentName);
					isCustomerDisplayed = await this.isAgentDisplayed(customerName);
				}
			}

			let isDirectionDisplayed: boolean = await this.isDirectionDisplayed();
			let isRecordedTimeDisplayed: boolean = await this.isRecordedTimeDisplayed();
			return (true == isAgentDisplayed == isCustomerDisplayed == isDirectionDisplayed == isRecordedTimeDisplayed);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isInfoDisplayedCorrectly, err.message);
		}
	}

	/**
	 * Check agent is displayed
	 * @param {string} agentName name of the agent to check 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isAgentDisplayed(agentName: string): Promise<boolean> {
		try {
			let actualAgent: string = await this.lblAgentName.getText();
			return (actualAgent == agentName);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isAgentDisplayed, err.message);
		}
	}

	/**
	 * Check customer is displayed
	 * @param {string} customerName name of the customer to check 
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isCustomerDisplayed(customerName: string): Promise<boolean> {
		try {
			let actualCus: string = await this.lblCustomerName.getText();
			return (actualCus == customerName);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerDisplayed, err.message);
		}
	}

	/**
	 * Check direction is displayed
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isDirectionDisplayed(): Promise<boolean> {
		try {
			return await this.lblTimeline.isDisplayed();
		} catch (err) {
			throw new errorwrapper.CustomError(this.isDirectionDisplayed, err.message);
		}
	}


	/**
	 * Check Customer label is displayed
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isCustomerLabelDisplayed(name: string): Promise<boolean> {
		try {
			let actualAgent: string = await this.lblCustomer.getText();

			return (actualAgent == name);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isCustomerLabelDisplayed, err.message);
		}
	}

	/**
	 * Check recorded time is displayed
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isRecordedTimeDisplayed(): Promise<boolean> {
		try {
			let endDate: Date = await this.getEndTime();
			let expectedDate: Date = await this.getExpectedEndTime();

			//we have +-1 as tolerance for the end-date
			if (endDate.getTime() === expectedDate.getTime()) {
				return true;
			} else if (endDate.getTime() === expectedDate.setSeconds(expectedDate.getSeconds() + 1)) {
				return true;
			}
			else if (endDate.getTime() === expectedDate.setSeconds(expectedDate.getSeconds() - 1)) {
				return true;
			}
			return false;
		} catch (err) {
			throw new errorwrapper.CustomError(this.isRecordedTimeDisplayed, err.message);
		}
	}

	/**
	 * Get expected end time of player
	 * @returns {Promise<Date>} expected end time
	 * @memberof InteractionPlayer
	 */
	public async getExpectedEndTime(): Promise<Date> {
		try {
			let startTime: Date = await this.getStartTime();
			let duration: number = await this.getDuration();
			let expectedEndTime = new Date(startTime);
			expectedEndTime.setSeconds(startTime.getSeconds() + duration);
			return expectedEndTime;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getExpectedEndTime, err.message);
		}
	}

	/**
	 * Get start time of player
	 * @returns {Promise<Date>} start time
	 * @memberof InteractionPlayer
	 */
	public async getStartTime(): Promise<Date> {
		try {
			let value: string = await this.lblStartTime.getText();
			return new Date(value);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getStartTime, err.message);
		}
	}

	/**
	 * Get end time of player
	 * @returns {Promise<Date>} end time
	 * @memberof InteractionPlayer
	 */
	public async getEndTime(): Promise<Date> {
		try {
			let value: string = await this.lblEndTime.getText();
			return new Date(value);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEndTime, err.message);
		}
	}

	/**
	 * Get duration of player
	 * @returns {Promise<number>} duration
	 * @memberof InteractionPlayer
	 */
	public async getDuration(): Promise<number> {
		try {
			let totalTime: string = await this.lblCurrentTotalTime.getText();
			let value: string = totalTime.split("/ ")[1];
			let totalSeconds: number = (parseInt(value.split(":")[0]) * 60) + parseInt(value.split(":")[1]);
			return totalSeconds;
		} catch (err) {
			throw new errorwrapper.CustomError(this.getDuration, err.message);
		}
	}

	/**
	 * Close Interaction player
	 * @returns {Promise<void>} the interaction player is closed
	 * @memberof InteractionPlayer
	 */
	public async close(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Closing Interaction Player");
			await BrowserWrapper.close();
			await BrowserWrapper.switchWindow(0);
		} catch (err) {
			throw new errorwrapper.CustomError(this.close, err.message);
		}
	}

	/**
	 * Wait for time line control is displayed
	 * @returns {Promise<InteractionPlayer>} the existence of interaction player
	 * @memberof InteractionPlayer
	 */
	public async waitForLoading(): Promise<InteractionPlayer> {
		try {
			await Logger.write(FunctionType.UI, "Waiting for page to load");
			await this.lblTimeline.wait();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.waitForLoading, err.message);
		}
	}

	/**
	 * Click play button
	 * @author Tan.Ta
	 * @returns {Promise<void>}
	 * @memberof InteractionPlayer
	 */
	public async clickPlay(): Promise<void> {
		try {
			await Logger.write(FunctionType.UI, "Clicking play button");
			let state: boolean = await this.btnPause.isDisplayed();
			if (state == false) {
				await this.btnPlay.waitForVisibilityOf();
				await this.btnPlay.click();
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickPlay, err.message);
		}
	}

	/**
	 * Check "Timeline" bar is displayed in "Player" page
	 * @author Tuan.Vu
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof InteractionPlayer
	 */
	public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblTimeline.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
		}
	}

	/**
	 * is Lbl Agent Displayed
	 * @author Nhat.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isLblAgentDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblAgentName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLblAgentDisplayed, err.message);
		}
	}

	/**
	 * is Lbl Customer Displayed
	 * @author Nhat.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isLblCustomerDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblCustomer.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isLblCustomerDisplayed, err.message);
		}
	}

	/**
	 * Check email subject is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailSubjectDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblSubject.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailSubjectDisplayed, err.message);
		}
	}

	/**
	 * Check email body is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailBodyDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmailBody.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailBodyDisplayed, err.message);
		}
	}

	/**
	 * Check email start time is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailStartTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmailStartTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailStartTimeDisplayed, err.message);
		}
	}

	/**
	 * Check email end time is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailEndTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmailEndTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailEndTimeDisplayed, err.message);
		}
	}

	/**
	 * Check email duration time is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailDurationDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmailDuration.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailDurationDisplayed, err.message);
		}
	}

	/**
	 * Check email agent name is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isEmailAgentNameDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblEmailAgentName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailAgentNameDisplayed, err.message);
		}
	}

	/**
	 * Check chat agent name is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isChatAgentNameDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatAgentName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isEmailAgentNameDisplayed, err.message);
		}
	}

	/**
	 * Check chat customer name is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isChatCustomerNameDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatCustomerName.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatCustomerNameDisplayed, err.message);
		}
	}

	/**
	 * Check chat start time is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isChatStartTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatStartTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatStartTimeDisplayed, err.message);
		}
	}

	/**
	 * Check chat end time is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isChatEndTimeDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatEndTime.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatEndTimeDisplayed, err.message);
		}
	}

	/**
	 * Check chat start date is displayed or not
	 * @author Tan.Ta
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof InteractionPlayer
	 */
	public async isChatStartDateDisplayed(timeoutInSecond?: number): Promise<boolean> {
		try {
			return await this.lblChatStartDate.isDisplayed(timeoutInSecond);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatStartDateDisplayed, err.message);
		}
	}

	/**
	 * Check chat message is displayed or not
	 * @author Tan.Ta
	 * @param {string} message
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof SearchPage
	 */
	public async isChatMessageDisplayed(message: string, timeOut?: number): Promise<boolean> {
		try {
			return await this.lblChatMsg(message).isDisplayed(timeOut);
		} catch (err) {
			throw new errorwrapper.CustomError(this.isChatMessageDisplayed, err.message);
		}
	}

}
