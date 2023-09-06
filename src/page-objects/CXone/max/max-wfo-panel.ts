import MaxPage from "@page-objects/CXone/max/max-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
import { ILocation, ISize } from "selenium-webdriver";

export default class MAXWFOPanel extends MaxPage {

    private static _maxWFOPanel: MAXWFOPanel = null;
    public static async getInstance(): Promise<MAXWFOPanel> {
        this._maxWFOPanel = new MAXWFOPanel();
        return this._maxWFOPanel;
    }

    protected btnShiftBidding = new ElementWrapper(by.xpath("//li[@id='shiftBidding-wrapper']/a[@id='shiftBidding']/span[contains(@class,'icon-shift_bidding')]"));
    protected btnCoaching = new ElementWrapper(by.xpath("//li[@id='coachings-wrapper']/a[@id='coachings']/span[contains(@class,'icon-coaching')]"));
    protected btnTimeOffRequests = new ElementWrapper(by.xpath("//li[@id='myTimeOffRequests-wrapper']/a[@id='myTimeOffRequests']/span[contains(@class,'icon-timeoff_requests')]"));
    protected btnEvaluations = new ElementWrapper(by.xpath("//li[@id='evaluations-wrapper']/a[@id='evaluations']/span[contains(@class,'icon-MyEvaluations')]"));
    protected btnMyDashboard = new ElementWrapper(by.xpath("//li[@id='myDashboards-wrapper']/a[@id='myDashboards']/span[contains(@class,'icon-dashboard')]"));
    protected btnMySchedule = new ElementWrapper(by.xpath("//li[@id='mySchedule-wrapper']/a[@id='mySchedule']/span[contains(@class,'icon-Icons_svg_my-schedule')]"));
    protected pnlShiftBidding = new ElementWrapper(by.xpath("//div[@class='shift-bidding-page page-container']"));
    protected pnlCoaching = new ElementWrapper(by.xpath("//div[@class='container page-container my-coaching-page']"));
    protected pnlEvaluations = new ElementWrapper(by.xpath("//div[@class='container page-container my-evaluations-page']"));
    protected pnlTimeOffRequests = new ElementWrapper(by.xpath("//div[@id='my-time-off-requests-page']"));
    protected pnlMySchedule = new ElementWrapper(by.xpath("//div[@class='my-schedule-wrapper ng-scope']"));
    protected pnlMyDashboard = new ElementWrapper(by.xpath("//div[@class='my-dashboards-page noselect']"));
    protected lblTitle = new ElementWrapper(by.xpath("//h1[@class='page-title ng-binding']"));
    protected ifrWFOPanel = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace'][@class='workspace']//iframe[@frameborder='0']"));
    protected btnCloseWFOPanel = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace'][@class='workspace']//div[@class='wfo-workspace-close-button wfo-workspace-top-bar-button']"));
    protected iconCloseWFOPanel = new ElementWrapper(by.xpath("//div[@class='wfo-workspace-close-button wfo-workspace-top-bar-button']/*[name()='svg'][@data-src='close.svg']"));
    protected pnlWFOWorkspace = new ElementWrapper(by.xpath("//div[@class='workspace-wrapper'][@data-mediatype='WFO']//div[@class='wfo-workspace-content']"));
    protected divWFOPanel = new ElementWrapper(by.xpath("//div[@id='wfoWorkspace'][@class='workspace']//div[@class='wfo-workspace-content']"));
    protected divUIFrame = new ElementWrapper(by.xpath("//div[@class='ui-frame']"));
    protected btnToday = new ElementWrapper(by.xpath("//button[@class='btn btn-secondary btn-default date-picker-today ng-scope']"));
    protected txtSearchBox = new ElementWrapper(by.xpath("//div/input[contains(@class,'search-on-keypress')]"));
    protected lblEventName = new ElementWrapper(by.xpath("//span[@class='user-agenda-event-label title ng-binding']"));
    protected lblEventDates = new ElementWrapper(by.xpath("//span[@class='user-agenda-event-label dates ng-binding']"));
    protected pnlWFOPanelTitle = new ElementWrapper(by.xpath("//h1[@class='page-title ng-binding']"));
    protected tblCoaching = new ElementWrapper(by.xpath("//div[@id='my-coaching-grid-container']//div[@class='ag-body-container']"));

    protected tbrCoachingPlanName(coachingPlanName: string) {
        return new ElementWrapper(by.xpath(`//div[@col-id='coachingPlanName'][.//div[text()='${coachingPlanName}']]`));
    }

    protected divShiftBidding(dateRange: string, status: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`(//div[@col-id='datesRange'][.//div[contains(text(),'${dateRange}')]]/following-sibling::div[@col-id='status'][.//span[text()='${status}']])[1]`))
    }

    protected lblScheduleItem(activity: string, startTime: string, endTime: string): ElementWrapper {
        let newStartTime = Utility.formatDateTime(startTime, 'h:mma', 'h:mm A');
        let newEndTime = Utility.formatDateTime(endTime, 'h:mma', 'h:mm A');
        return new ElementWrapper(by.xpath(`//span[@class='user-agenda-event-label title ng-binding'][text()='${activity}']/following-sibling::span[text()='${newStartTime}-${newEndTime}']`))
    }

    /**
     * Waiting for page load
     * @author Y.Le
     * @returns {Promise<void>}
     * @memberof MAXWFOPanel
     */
    public async waitForPanelOpen(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Waiting for panel open");
            await this.divWFOPanel.moveMouse();
            await this.ifrWFOPanel.switchToFrame();
            await this.lblTitle.waitForPresenceOf();
            await this.lblTitle.waitForVisibilityOf();
            await this.lblTitle.waitForControlStable();
            await BrowserWrapper.switchToDefaultContent();
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForPanelOpen, err.message);
        }
    }

    /**
     * Opening Shift Bidding
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openShiftBiddingPanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening Shift Bidding");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnShiftBidding.wait();
            await BrowserWrapper.executeScript("document.getElementById('shiftBidding').click();");
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openShiftBiddingPanel, err.message);
        }
    }

    /**
     * Open Coaching
     * @author Tuan.Vu
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openCoachingPanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening Coaching");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnCoaching.wait(TestRunInfo.middleTimeout);
            await BrowserWrapper.executeScript(`document.getElementById("coachings").click();`);
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCoachingPanel, err.message);
        }
    }

    /**
     * Open Time Off Requests
     * @author Anh.Le
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openTimeOffRequestsPanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening Time Off Requests");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnTimeOffRequests.wait()
            await BrowserWrapper.executeScript(`document.getElementById("myTimeOffRequests").click();`);
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openTimeOffRequestsPanel, err.message);
        }
    }

    /**
     * Open Evaluations
     * @author Anh.Le
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openEvaluationsPanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening Evaluations");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnEvaluations.wait()
            await BrowserWrapper.executeScript("document.getElementById('evaluations').click();");
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openEvaluationsPanel, err.message);
        }
    }

    /**
     * Open My Dashboard
     * @author Anh.Le
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openMyDashboardPanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening My Dashboard");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnMyDashboard.wait()
            await this.btnMyDashboard.click();
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openMyDashboardPanel, err.message);
        }
    }

    /**
     * Open My Schedule
     * @author Anh.Le
     * @returns {Promise<this>}
     * @memberof MAXWFOPanel
     */
    public async openMySchedulePanel(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening My Schedule");
            await this.ifrWFOPanel.switchToFrame();
            await this.btnMySchedule.wait()
            await BrowserWrapper.executeScript(`document.getElementById("mySchedule").click();`);
            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openMySchedulePanel, err.message);
        }
    }

    /**
     * Checking Shift Bidding Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Shift Bidding Panel
     * @memberof MAXWFOPanel
     */
    public async isShiftBiddingPanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isShiftBiddingPanelDisplayed: boolean = await this.pnlShiftBidding.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isShiftBiddingPanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isShiftBiddingPanelDisplayed, err.message);
        }
    }

    /**
     * Checking Coaching Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Coaching Panel
     * @memberof MAXWFOPanel
     */
    public async isCoachingPanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isCoachingPanelDisplayed: boolean = await this.pnlCoaching.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isCoachingPanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCoachingPanelDisplayed, err.message);
        }
    }

    /**
     * Checking Time Off Requests Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Time Off Requests Panel
     * @memberof MAXWFOPanel
     */
    public async isTimeOffRequestsPanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isTimeOffRequestsPanelDisplayed: boolean = await this.pnlTimeOffRequests.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isTimeOffRequestsPanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isTimeOffRequestsPanelDisplayed, err.message);
        }
    }

    /**
     * Checking Evaluations Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of Evaluations Panel
     * @memberof MAXWFOPanel
     */
    public async isEvaluationsPanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isEvaluationsPanelDisplayed: boolean = await this.pnlEvaluations.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isEvaluationsPanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEvaluationsPanelDisplayed, err.message);
        }
    }

    /**
     * Checking My Dashboard Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of My Dashboard Panel
     * @memberof MAXWFOPanel
     */
    public async isMyDashboardPanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isMyDashboardPanelDisplayed: boolean = await this.pnlMyDashboard.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isMyDashboardPanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMyDashboardPanelDisplayed, err.message);
        }
    }

    /**
     * Checking My Schedule Panel is displayed
     * @author Anh.Le
     * @returns {Promise<boolean>} the existence of My Schedule
     * @memberof MAXWFOPanel
     */
    public async isMySchedulePanelDisplayed(): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isMySchedulePanelDisplayed: boolean = await this.pnlMySchedule.isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return isMySchedulePanelDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMySchedulePanelDisplayed, err.message);
        }
    }

    /**
     * Checking Shift Bidding is displayed
     * @author Y.Le
     * @param {string} dateRange
     * @param {string} status
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isShiftBiddingDisplayed(dateRange: string, status: string, timeOut?: number): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let isShiftBiddingDisplayed: boolean = await this.divShiftBidding(dateRange, status).isDisplayed(timeOut);
            await BrowserWrapper.switchToDefaultContent();
            return isShiftBiddingDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isShiftBiddingDisplayed, err.message);
        }
    }

    /**
     * Checking Shift Bidding is displayed
     * @author Y.Le
     * @param {string} dateRange
     * @param {string} status
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isCoachingPlanDisplayed(coachingPlanName: string, timeOutInSecond?: number): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            await this.txtSearchBox.type(coachingPlanName);
            let isDisplay: boolean = await this.tbrCoachingPlanName(coachingPlanName).isDisplayed(timeOutInSecond);
            await BrowserWrapper.switchToDefaultContent();
            return isDisplay;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCoachingPlanDisplayed, err.message);
        }
    }

    /* Closing max WFO panel
    * @author Y.Le
    * @returns {Promise<MaxPage>}
    * @memberof MAXWFOPanel
    */
    public async closeWFOPanel(): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, "Closing max WFO panel");
            // await BrowserWrapper.switchToDefaultContent();
            // await this.btnCloseWFOPanel.click();
            // await this.btnCloseWFOPanel.click();
            // User Javascript to click on 'X' button because this element is unfocusable
            await BrowserWrapper.executeScript(`document.getElementsByClassName('wfo-workspace-close-button wfo-workspace-top-bar-button')[0].click()`)
            await this.pnlWFOWorkspace.waitUntilDisappear();
            return await MaxPage.getMaxInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.closeWFOPanel, err.message);
        }
    }

    /**
     * Check close bar on top WFM Panel
     * @author Y.Le
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isCloseBarOnTopWFMPanel(tolerance: number = 10): Promise<boolean> {
        try {
            let wfoPanelLocation: ILocation = await this.pnlWFOWorkspace.getLocation();
            let closeBarLocation: ILocation = await this.btnCloseWFOPanel.getLocation();
            return (wfoPanelLocation.y - closeBarLocation.y) <= tolerance // 10 is tolerance of element's location
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCloseBarOnTopWFMPanel, err.message);
        }
    }

    /**
     * Getting color of WFO close bar
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof MAXWFOPanel
     */
    public async getCloseBarColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of WFO close bar");
            let color: string = await this.btnCloseWFOPanel.getCssValue('color');
            return Utility.convertRgbToHex(color);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCloseBarColor, err.message);
        }
    }

    /**
     * Getting color of X close button in WFO panel
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof MAXWFOPanel
     */
    public async getXButtonColor(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of X close button in WFO panel");
            let color = await this.iconCloseWFOPanel.getCssValue('fill');
            return Utility.convertRgbToHex(color);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getXButtonColor, err.message);
        }
    }

    /**
     * Check X button on top right corner
     * @author Y.Le
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isXButtonOnTopRightConner(tolerance: number = 10): Promise<boolean> {
        try {
            let locationXButton: ILocation = await this.iconCloseWFOPanel.getLocation();
            let sizeXButton: ISize = await this.iconCloseWFOPanel.getSize();
            let wfoPanelLocation: ILocation = await this.pnlWFOWorkspace.getLocation();
            let sizeWFOPanel: ISize = await this.pnlWFOWorkspace.getSize();
            return (wfoPanelLocation.y - locationXButton.y) <= tolerance && ((wfoPanelLocation.x + sizeWFOPanel.width) - (locationXButton.x + sizeXButton.width) <= tolerance)
        } catch (err) {
            throw new errorwrapper.CustomError(this.isXButtonOnTopRightConner, err.message);
        }
    }

    /**
     * Check WFO panel is displayed
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isWFOPanelDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return this.pnlWFOWorkspace.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isWFOPanelDisplayed, err.message);
        }
    }

    /**
     * Getting size of WFO panel
     * @author Y.Le
     * @returns {Promise<ISize>}
     * @memberof MAXWFOPanel
     */
    public async getWFOPanelSize(): Promise<ISize> {
        try {
            await Logger.write(FunctionType.UI, "Getting size of WFO panel");
            return await this.pnlWFOWorkspace.getSize();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWFOPanelSize, err.message);
        }
    }
    /**
         * Get Event Name
         * @author Phat Ngo
         * @returns {Promise<string>}
         * @memberof MAXWFOPanel
         */
    public async getEventName(): Promise<string> {
        try {
            return this.lblEventName.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEventName, err.message);
        }
    }

    /**
     * Get Event Dates
     * @author Phat Ngo
     * @returns {Promise<string>}
     * @memberof MAXWFOPanel
     */
    public async getEventDates(): Promise<string> {
        try {
            return this.lblEventDates.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEventDates, err.message);
        }
    }


	/**
	 * Getting customer workspace panel title
	 * @author Anh.Le
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
    public async getWFOPanelTitle(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "getting customer workspace panel title");
            let panelTitle = await this.pnlWFOPanelTitle.getText();
            return panelTitle;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWFOPanelTitle, err.message);
        }
    }

    /**
     * Search coaching plan on MAX
     * @author Chinh.Nguyen
     * @param {string} coachingPlanName
     * @returns {Promise<CoachingPlansPage>}
     * @memberof CoachingPlansPage
     */
    public async searchCoachingPlanOnMAX(coachingPlanName: string): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Searching coaching plan ${coachingPlanName}`);
            await this.ifrWFOPanel.switchToFrame();
            await this.tblCoaching.waitUntilPropertyChange("height", TestRunInfo.shortTimeout);
            await this.txtSearchBox.type(coachingPlanName);

            let isDisplay: boolean = await this.tbrCoachingPlanName(coachingPlanName).isDisplayed(TestRunInfo.shortTimeout);

            if (isDisplay == false) {
                await this.txtSearchBox.type(coachingPlanName);
            }

            await BrowserWrapper.switchToDefaultContent();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchCoachingPlanOnMAX, err.message);
        }
    }

    /**
     * Check schedule item is displayed or not
     * @author Tan.Ta
     * @param {string} activity
     * @param {string} startTime
     * @param {string} endTime
     * @returns {Promise<boolean>}
     * @memberof MAXWFOPanel
     */
    public async isScheduleItemDisplayed(activity: string, startTime: string, endTime: string): Promise<boolean> {
        try {
            await this.ifrWFOPanel.switchToFrame();
            let state: boolean = await this.lblScheduleItem(activity, startTime, endTime).isDisplayed();
            await BrowserWrapper.switchToDefaultContent();
            return state;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleItemDisplayed, err.message);
        }
    }
}   