import MaxPage from "@page-objects/CXone/max/max-page";
import MAXWFOPanel from "@page-objects/CXone/max/max-wfo-panel";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by, Browser } from "protractor";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import TestRunInfo from "@data-objects/general/test-run-info";

export default class MAXMessagePanel extends MaxPage {

    private static _maxMessagePanel: MAXMessagePanel = null;
    public static async getInstance(): Promise<MAXMessagePanel> {
        this._maxMessagePanel = new MAXMessagePanel();
        return this._maxMessagePanel;
    }

    protected btnLaunchButtonFirstIndex = new ElementWrapper(by.xpath("//ul[@class='item-list']//li[1]//button[@class='launch-button']"));
    protected pnlMessage = new ElementWrapper(by.xpath("//div[@class='popover-panel agent-message-ui']"));
    protected pnlWFOWorkSpace = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace'][@class='workspace']"));
    protected btnLaunchButtonFirstIndexForSchedule = new ElementWrapper(by.xpath("//div[@data-state='Glance'][@class='popover-panel agent-message-ui']//ul[@class='item-list']//li[1]//span[contains(text(),'Schedule')]/following-sibling::span[@class='launch']/button"));
    protected btnCoachingWFO = new ElementWrapper(by.xpath("//ul[@class='item-list']//li[1]//span[contains(text(),'coaching')]/following-sibling::span[@class='launch']/button"));
    protected lblDateText = new ElementWrapper(by.xpath("//ul[@class='item-list']//li[1]//div[@class='time time-standard']//h5"));

    //Dynamic controls 

    protected btnLaunchButtonForSchedule(dateText: string ): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='time time-standard'][./h5[text()='${dateText}']]/following-sibling::div[@class='agent-message-content'][./span[contains(text(),'Schedule')]]//span[@class='launch']/button`));
    }

    /** 
     * Checking Launch WFO Button is displayed 
     * @author Phat.Truong
     * @returns {Promise<boolean>} the existence of Launch WFO button
     * @memberof MAXMessagePanel
     */
    public async isLaunchWFOButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {

            return await this.btnLaunchButtonFirstIndex.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchWFOButtonDisplayed, err.message);
        }
    }


    /**
     * Clicking on Launch WFO Button is displayed
     * @author Phat.Truong
     * @returns {Promise<MAXWFOPanel>} 
     * @memberof MAXMessagePanel
     */
    public async clickLaunchWFOButton(): Promise<MAXWFOPanel> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Launch WFO Button");
            await this.btnLaunchButtonFirstIndex.click();
            let maxWFOPanel = require("@page-objects/CXone/max/max-wfo-panel").default;
            return await maxWFOPanel.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchWFOButtonDisplayed, err.message);
        }
    }

    /**
     * Check WFO button displays
     * @author Phat Ngo
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MAXMessagePanel
     */
    public async isWFOButtonDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnLaunchButtonFirstIndex.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWFOButtonDisplayed, err.message);
        }
    }
    /**
     * Checking Message Panel is displayed msgSelfAssessmentInitiated
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Evaluations Panel
     * @memberof MAXWFOPanel
     */
    public async isMessageDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.pnlMessage.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMessageDisplayed, err.message);
        }
    }
    /**
     * Click default WFO button
     * @author Phat Ngo
     * @returns {Promise<void>}
     * @memberof MAXMessagePanel
     */
    public async clickDefaultWFOButton(): Promise<void> {
        try {
            await this.btnLaunchButtonFirstIndex.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickDefaultWFOButton, err.message);
        }
    }

    /**
     * Check WFO Workspace displays
     * @author Phat Ngo
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MAXMessagePanel
     */
    public async isWFOWorkspaceDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return  await this.pnlWFOWorkSpace.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWFOWorkspaceDisplayed, err.message);
        }
    }
    
 /**
     * Clicking on Launch WFO Button for schedule
     * @author Anh.Le
     * @returns {Promise<MAXWFOPanel>} 
     * @memberof MAXMessagePanel
     */
    public async clickFirstLaunchWFOScheduleButton(): Promise<MAXWFOPanel> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on newest Launch WFO Schedule button");
            await this.btnLaunchButtonFirstIndexForSchedule.waitForControlStable();       
            await this.btnLaunchButtonFirstIndexForSchedule.click();
            await this.btnLaunchButtonFirstIndexForSchedule.waitUntilDisappear(TestRunInfo.middleTimeout);    
			return await MAXWFOPanel.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickFirstLaunchWFOScheduleButton, err.message);
        }
    }

       
 /**
     * Clicking on Launch WFO Button for schedule
     * @author Anh.Le
     * @returns {Promise<MAXWFOPanel>} 
     * @memberof MAXMessagePanel
     */
    public async clickLaunchWFOScheduleButton(dateTime: string): Promise<MAXWFOPanel> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Launch WFO Schedule button identified by time");
            await this.btnLaunchButtonForSchedule(dateTime).waitForControlStable();
            await this.btnLaunchButtonForSchedule(dateTime).click();
            await this.btnLaunchButtonForSchedule(dateTime).waitUntilDisappear();
			return await MAXWFOPanel.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLaunchWFOButtonDisplayed, err.message);
        }
    }

    /**
	 * Check WFO button is displayed on Coaching package message
	 * @author Y.Le
	 * @param {number} [timeOut]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isWFOButtonCoachingMessageDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.btnCoachingWFO.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWFOButtonCoachingMessageDisplayed, err.message);
        }
    }

    /**
     * Clicking WFO coaching button
     * @author Y.Le
     * @returns {Promise<MAXWFOPanel>}
     * @memberof MAXMessagePanel
     */
    public async clickWFOCoachingButton(): Promise<MAXWFOPanel>{
        try{
            await Logger.write(FunctionType.UI,"Clicking WFO coaching button");
            await this.btnCoachingWFO.click();
            return await MAXWFOPanel.getInstance()
        } catch (err){
            throw new errorwrapper.CustomError(this.clickWFOCoachingButton, err.message);
        }
    }

    public async getDateTimeOfFirstSchedule(): Promise<string> {
        try {
            await this.lblDateText.waitForControlStable();
            let dateText = await this.lblDateText.getText();
            await Logger.write(FunctionType.UI, "Get date time of fist schedule");
			return dateText;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDateTimeOfFirstSchedule, err.message);
        }
    }
}   