import { ActivityCodes, WFMRule } from "@data-objects/CXone/wfm/rules/rule-info";
import { PublishSchedule } from "@data-objects/CXone/wfm/schedule-info";
import { ClusterID } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import WFMMenu from "@page-objects/CXone/wfm/wfm-general/wfm-menu";
import { FunctionType, Logger } from '@utilities/general/logger';
import { Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";

export default class ScheduleManagerPage extends WFMMenu {

    private static _scheduleManagerPage: ScheduleManagerPage = null;

    protected txtSearch = new ElementWrapper(by.xpath("//div[@class='search-bar-wrapper']//div[@class='inner-center']/input"));
    protected btnSearch = new ElementWrapper(by.xpath("//div[@class='search-bar-wrapper']//div[@class='inner-center']//span[@class='icon-wrapper']"));
    protected btnAddShift = new ElementWrapper(by.xpath("//span[text()='Add Shift']"));
    protected txtShiftStartTime = new ElementWrapper(by.xpath("//date-time-picker[@name='start']//div[@class='time-picker-wrapper']//input"));
    protected txtShiftEndTime = new ElementWrapper(by.xpath("//date-time-picker[@name='end']//div[@class='time-picker-wrapper']//input"));
    protected btnCreate = new ElementWrapper(by.xpath("//button[@id='save']"));
    protected lblScheduleManager = new ElementWrapper(by.xpath("//div[@class='row top-container']//h1[@class='page-title ng-binding']"));
    protected btnAddActivity = new ElementWrapper(by.xpath("//div[@id='shift-popover']//span[text()='Add Activity']"));
    protected txtActivityStartTime = new ElementWrapper(by.xpath("//label[text()='Start']//parent::div//div[@class='time-picker-wrapper']//input"));
    protected txtActivityEndTime = new ElementWrapper(by.xpath("//label[text()='End']//parent::div//div[@class='time-picker-wrapper']//input"));
    protected btnDownArrow = new ElementWrapper(by.xpath("//activity-code-dropdown[@id='activitycode']//div[@class='ui-caret']"));
    protected btnSave = new ElementWrapper(by.xpath("//div[@class='edit-buttons']/button[contains(text(),'Save')]"));
    protected btnPublish = new ElementWrapper(by.xpath("//button[text()='Publish']"));
    protected btnConfirmPublish = new ElementWrapper(by.xpath("//button[@id='generateBtn']"));
    protected cbbActivityCode = new ElementWrapper(by.xpath("//div[@name='activitycode']//div[@class='activity-code-label ng-binding']"));
    protected txtStartDay = new ElementWrapper(by.xpath("//label[text()='Start']//parent::div//div[@class='date-picker-wrapper']//input"));
    protected txtEndDay = new ElementWrapper(by.xpath("//label[text()='End']//parent::div//div[@class='date-picker-wrapper']//input"));
    protected txtComment = new ElementWrapper(by.xpath("//textarea[@id='inputComment']"));
    protected btnCancel = new ElementWrapper(by.xpath("//button[@id='cancel']"));
    protected lblPublishedSuccess = new ElementWrapper(by.xpath("//div[text()='Dates published successfully']"));
    protected pnlMaxPopup = new ElementWrapper(by.xpath("//div[.//div[text()='LAUNCH'] and contains(@class,'popover ng-scope')]"));
    protected btnFilter = new ElementWrapper(by.xpath("//a[@class='filter-button']"));
    protected btnFilterSkill = new ElementWrapper(by.xpath("//div[@data-filter-id='skills']//div[@class='ui-caret']"));
    protected chkOBPhoneAutomation = new ElementWrapper(by.xpath("//div[./span[text()='OBPhoneSkillAutomation']]/div"));
    protected chkIBPhoneAutomation = new ElementWrapper(by.xpath("//div[./span[text()='IBPhoneSkillAutomation']]/div"));
    protected btnPublishAnyway = new ElementWrapper(by.xpath("//button[text()='Publish Anyway']"));
    protected btnRemoveShift = new ElementWrapper(by.xpath("//li[@class='popover-remove-shift-activity']"));
    protected btnRemoveActivity = new ElementWrapper(by.xpath("//li[@class='popover-activity-remove']"));
    protected txtStartTimeShift = new ElementWrapper(by.xpath("//div//label[text()='Start']//parent::div//div[@name='datePickerForm']//input"));
    protected txtEndTimeShift = new ElementWrapper(by.xpath("//div//label[text()='End']//parent::div//div[@name='datePickerForm']//input"));
    protected btnPublishSchedule = new ElementWrapper(by.xpath("//button[@class='btn btn-primary publish ng-scope']"));
    protected mgsPublishSucess = new ElementWrapper(by.xpath("//div[@class='toast-message'][text()='Dates published successfully']"));
    protected publishNewScheduleForm = PublishNewScheduleForm.getInstance();

    protected txtTimeZone = new ElementWrapper(by.xpath("//div[contains(@class,'timezone-select')]//input[contains(@class, 'ui-select-search')]"));
    protected divTimeZone = new ElementWrapper(by.xpath("//div[contains(@class,'timezone-select')]"));
    protected divAddActivity = new ElementWrapper(by.xpath("//li[@class='popover-add-activity']"));
    protected pnlRemoveTimeShiftError = new ElementWrapper(by.xpath("//div[@class='toast-message' and text()='Cannot remove a shift or activity that goes beyond the visible range.' ]"));
    protected btnNextDay = new ElementWrapper(by.xpath("//button[@alt='Next day']"));
    protected pnlAddShiftAndActivity = new ElementWrapper(by.xpath("//div[@class='schedule-popover schedule-popover-menu popover fade top in'][@id='empty-popover']"));
    protected txtStartDateTimePicker = new ElementWrapper(by.xpath("//date-time-picker[@id='activityStart']//input[contains(@name, 'datePicker')]"));
    protected txtEndDateTimePicker = new ElementWrapper(by.xpath("//date-time-picker[@id='activityEnd']//input[contains(@name, 'datePicker')]"))

    // Dynamic controls
    protected lblScheduleCell(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@class='schedule-table']//tr[count(//table[@class='employee-table']//tr[./td[text()='${userName}']]/preceding-sibling::tr)+1]/td[count(//td[@class='nowhour']/preceding-sibling::td)+1]`));
    }

    protected lblScheduleRow(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@class='schedule-table']//tr[count(//table[@class='employee-table']//tr[./td[text()='${userName}']]/preceding-sibling::tr)+1]/td[count(//td[@class='nowhour']/preceding-sibling::td)+1]//parent::tr`));
    }

    protected lblScheduleData(scheduleId: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='schedule-data']/div[contains(@id,'shift') and @data-scheduleid='${scheduleId}'][1]`));
    }

    protected lblActivityCode(activityCodeName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@role='option']//div[text()='${activityCodeName}']`));
    }

    protected lblUsername(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//table[@class='employee-table']//td[@class='name' and text()='${userName}']`));
    }

    protected lblActivityInShift(activityName: string, dataResourceID: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='activity-code copyable editable removable' and @data-description='${activityName}' and @data-resourceid='${dataResourceID}']`));
    }

    protected lblTimeZone(timezone: string) {
        return new ElementWrapper(by.xpath(`//span[contains(text(),'${timezone}')]/ancestor::div[@class='ui-select-choices-group optgroup']/div[2]`));
    }

    protected lblTimeZoneNumber(timezoneNumber: string) {
        return new ElementWrapper(by.xpath(`(//div[@class='option ui-select-choices-row-inner']//span[contains(text(),'${timezoneNumber}')])[1]`));
    }

    protected lblActivityWithUserName(username: string, activity: ActivityCodes) {
        return new ElementWrapper(by.xpath(`//table[@class='employee-table']//td[@class='name' and text()='${username}']/ancestor::div[@class='scheduler-wrapper']//div[@class='schedule-data']/div[@data-description='${activity}']`));
    }

    protected lblActivityData(activityId: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='schedule-data']/div[contains(@class,'activity') and @data-scheduleid='${activityId}'][1]`));
    }

    protected lblActivityByIndex(index: number): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='schedule-data']/div[${index}]`));
    }

    protected iconGeneratedScheduleActivity(activity: string, startTime: string, endTime: string) {
        let currentDate = new Date();
        let month: number = currentDate.getMonth() + 1;
        let currentDate1 = month.toString() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();

        let newStartDateFormat = Utility.formatDateTime(`${currentDate1} ${startTime}`, "M/DD/YYYY h:mma", "M/DD/YYYY h:mm a");
        let newEndDateFormat = Utility.formatDateTime(`${currentDate1} ${endTime}`, `M/DD/YYYY h:mma`, 'M/DD/YYYY h:mm a');

        let dataStart = Date.parse(`'${newStartDateFormat}'`);
        let dataEnd = Date.parse(`'${newEndDateFormat}'`);

        return new ElementWrapper(by.xpath(`//div[contains(@class,'activity-code')][@data-description='${activity}' and @data-start='${dataStart}' and @data-end = '${dataEnd}']`));
    }

    public static getInstance(): ScheduleManagerPage {
        this._scheduleManagerPage = new ScheduleManagerPage();
        return this._scheduleManagerPage;
    }

    /**
     * @author Tuan.Vu
     *@param {number} [timeoutInSecond]
     * @return {Promise<boolean>}
     * @member ScheduleManagerPage
     */
    public async isPageDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return this.lblScheduleManager.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPageDisplayed, err.message);
        }
    }

    /**
     * Search user name
     * @author Nhat.Nguyen
     * @param {string} userName
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async searchUserName(userName: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Searching User Name");
            await this.txtSearch.type(userName);
            await this.btnSearch.click();
            await this.waitForLoadingPanel();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchUserName, err.message);
        }
    }

    /**
     * Click add shift button
     * @author Nhat.Nguyen
     * @param {string} name
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async clickAddShiftButton(name: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking add shift button");
            await this.waitForLoadingPanel();
            if (await this.lblScheduleCell(name).isDisplayed()) {
                // await this.lblScheduleCell(name).scrollToElement();
                await this.lblScheduleCell(name).scrollTo();
                await this.lblScheduleCell(name).click();
                await this.btnAddShift.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddShiftButton, err.message);
        }
    }

    /**
     * Add a shift
     * @author Nhat.Nguyen
     * @param {WFMRule} ruleData
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async addShift(ruleData: WFMRule): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Adding shift");
            await this.txtShiftStartTime.type(ruleData.scheduleStartTime);
            await this.txtShiftEndTime.type(ruleData.scheduleEndTime);
            let date: Date = new Date();
            date.setDate(date.getDate() + 1);
            let timeShift: string = Utility.formatDateTime(date.toString(), "ddd MMM DD YYYY", "MMM D, YYYY");
            await this.txtStartTimeShift.type(timeShift);
            await this.txtEndTimeShift.type(timeShift);
            await this.btnCreate.click();
            await this.btnCreate.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.addShift, err.message);
        }
    }

    /**
     * Add a activity
     * @author Anh.Le
     * @param {string} activityName
     * @param {string} activityStartTime
     * @param {string} activityEndTime
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async addActivity(activityName: string, activityStartTime: string, activityEndTime: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, `Adding ${activityName} activity`);
            await this.btnDownArrow.waitForControlStable();
            await this.btnDownArrow.click();
            await this.lblActivityCode(activityName).click();
            await this.txtActivityStartTime.type(activityStartTime.substring(activityStartTime.split(":")[0].lastIndexOf(" ") + 1, activityStartTime.length));
            await this.txtActivityEndTime.type(activityEndTime.substring(activityEndTime.split(":")[0].lastIndexOf(" ") + 1, activityEndTime.length));
            await this.btnCreate.click();
            await this.btnCreate.waitUntilDisappear();
            return ScheduleManagerPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.addActivity, err.message);
        }
    }

    /**
     * Click Add a activity button
     * @author Nhat.Nguyen
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async clickAddActivityButton(name: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking add activity button`);
            await this.waitForLoadingPanel();
            let dataResourceID: string = await this.lblScheduleRow(name).getAttribute("data-resourceid");
            await this.lblScheduleData(dataResourceID).scrollToElement();
            await this.lblScheduleData(dataResourceID).click();
            await this.btnAddActivity.click();
            await this.btnAddActivity.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddActivityButton, err.message);
        }
    }

    /**
     * Click Add a activity
     * @author Anh.Le
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async clickAddActivity(name: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, `Clicking add activity`);
            await BrowserWrapper.sleepInSecond(1);
            await BrowserWrapper.executeScript(`document.getElementsByClassName('nowhour')[0].scrollIntoView(true)`);
            await this.lblScheduleCell(name).scrollTo();
            await this.lblScheduleCell(name).wait();
            await this.lblScheduleCell(name).click();
            await this.divAddActivity.click();
            await this.divAddActivity.waitUntilDisappear();
            return ScheduleManagerPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickAddActivityButton, err.message);
        }
    }

    /**
     * Publish new schedule
     * @author Nhat.Nguyen
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async publishNewSchedule(): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Publishing new schedule");
            await this.waitForLoadingPanel(TestRunInfo.middleTimeout)
            if (await this.btnSave.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnSave.click();
            }
            await this.btnPublish.wait();
            await this.btnPublish.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.publishNewSchedule, err.message);
        }
    }

    /**
     * Click confirm publish new schedule
     * @author Nhat.Nguyen
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async pressConfirmPublishNewSchedule(): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking confirm publishing new schedule");
            await this.btnConfirmPublish.wait();
            await this.btnConfirmPublish.click();
            if (await this.btnPublishAnyway.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnPublishAnyway.click();
            }
            await this.btnConfirmPublish.waitUntilDisappear();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.pressConfirmPublishNewSchedule, err.message);
        }
    }

    /**
     * Check user is listed in Page
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isUserListed(userName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblUsername(Utility.capitalizeFirstLetter(userName)).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isUserListed, err.message);
        }
    }

    /**
     * Get activity code value
     * @author Nhat.Nguyen
     * @returns {Promise<string>} Activity code value
     * @memberof ScheduleManagerPage
     */
    public async getActivityCode(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting Activity Code");
            return await this.cbbActivityCode.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getActivityCode, err.message);
        }
    }

    /**
     * Check Start List Box displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof ScheduleManagerPage
     */
    public async isStartListBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtActivityStartTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isStartListBoxDisplayed, err.message);
        }
    }

    /**
     * Check End List Box displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof ScheduleManager
     */
    public async isEndListBoxDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtActivityEndTime.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndListBoxDisplayed, err.message);
        }
    }

    /**
     * Check Start Day displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof ScheduleManagerPage
     */
    public async isStartDayDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtStartDay.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isStartDayDisplayed, err.message);
        }
    }

    /**
     * Check End Day displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} Display=>true, not displayed=>false
     * @memberof ScheduleManager
     */
    public async isEndDayDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtEndDay.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndDayDisplayed, err.message);
        }
    }

    /**
     * Comments section displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isCommentSectionDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.txtComment.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommentSectionDisplayed, err.message);
        }
    }

    /**
     * Check Create button displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof ScheduleManagerPage
	 */
    public async isCreateButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCreate.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCreateButtonDisplayed, err.message);
        }
    }

    /**
     * Check Cancel button displayed
     * @author Nhat.Nguyen
	 * @returns {Promise<boolean>} Display=>true, not displayed=>false
	 * @memberof ScheduleManagerPage
	 */
    public async isCancelButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCancel.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCancelButtonDisplayed, err.message);
        }
    }

    /**
     * Get shift color
     * @author Nhat.Nguyen
     * @returns {Promise<string>} shift color
     * @memberof ScheduleManagerPage
     */
    public async isShiftWithGrayColor(name: string): Promise<boolean> {
        try {
            let dataResourceID: string = await this.lblScheduleRow(name).getAttribute("data-resourceid");
            let shiftStyle: string = await this.lblScheduleData(dataResourceID).getAttribute("style");
            if (shiftStyle.includes("background-color: rgb(224, 235, 245)")) {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isShiftWithGrayColor, err.message);
        }
    }

    /**
     * Check activity present in the Shift
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isActivityPresentInShift(activityName: string, name: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            let dataResourceID: string = await this.lblScheduleRow(name).getAttribute("data-resourceid");
            return await this.lblActivityInShift(activityName, dataResourceID).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isActivityPresentInShift, err.message);
        }
    }

    /**
     * Check publish new schedule displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isPublishNewScheduleDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnConfirmPublish.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPublishNewScheduleDisplayed, err.message);
        }
    }

    /**
     * Check publish new schedule displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isPublishedSuccessMgsDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblPublishedSuccess.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isPublishedSuccessMgsDisplayed, err.message);
        }
    }

    /**
     * Check publish new schedule displayed
     * @author Nhat.Nguyen
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async isMaxPopupDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.pnlMaxPopup.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaxPopupDisplayed, err.message);
        }
    }

    /**
     * Remove shift
     * @author Nhat.Nguyen
     * @param {string} name
     * @returns {Promise<ScheduleManagerPage>}
     * @memberof ScheduleManagerPage
     */
    public async removeShift(name: string): Promise<ScheduleManagerPage> {
        try {
            let dataResourceID: string = await this.lblScheduleRow(name).getAttribute("data-resourceid");
            let times: number = 0;

            while (await this.lblScheduleData(dataResourceID).isDisplayed(TestRunInfo.shortTimeout)) {
                await Logger.write(FunctionType.UI, "Clicking remove shift button");
                await this.lblScheduleData(dataResourceID).waitForPresenceOf();
                await this.lblScheduleData(dataResourceID).scrollTo();
                await this.lblScheduleData(dataResourceID).click();
                await this.btnRemoveShift.click();
                if (await this.pnlRemoveTimeShiftError.isDisplayed(TestRunInfo.shortTimeout)) {
                    await this.pnlRemoveTimeShiftError.waitUntilDisappear();
                    if (await this.btnSave.isDisplayed(TestRunInfo.shortTimeout)) {
                        await this.btnSave.click();
                        await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                    }
                    await this.btnNextDay.click();
                    await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                }
                times++;
                if (times >= 10) {
                    break;
                }
            }

            if (await this.btnSave.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnSave.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeShift, err.message);
        }
    }

    /**
     * Search user name
     * @author Nhat.Nguyen
     * @param {string} userName
     * @returns {Promise<ScheduleManager>}
     * @memberof ScheduleManager
     */
    public async filterUserName(): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Filtering User Name");
            if (TestRunInfo.clusterID == ClusterID.SO32) {
                await this.btnFilter.click();
                await this.btnFilterSkill.click();
                await this.chkOBPhoneAutomation.click();
                await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                await this.chkIBPhoneAutomation.click();
                await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                await this.btnFilter.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.filterUserName, err.message);
        }
    }

    /**
     * Search and remove time shift
     * @author Nhat.Nguyen
     * @param {string} userName
     * @returns {Promise<ScheduleManager>}
     * @memberof ScheduleManager
     */
    public async searchAndRemoveTimeShift(name: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Searching and remove time shift");
            await this.searchUserName(name);
            await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
            await this.removeShift(name);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchAndRemoveTimeShift, err.message);
        }
    }

    /**
     * Clicking on Publish schedule
     * @author Nhat.Nguyen
     * @returns {Promise<void>} display=>true, not display=>false
     * @memberof ScheduleManagerPage
     */
    public async clickPublishSchedule(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Publish schedule");
            await this.waitForSpinnerDisappear();
            await this.btnPublishSchedule.click();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isMaxPopupDisplayed, err.message);
        }
    }

    /**
	 * Filling Publish new schedules form
	 * @author Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<this>}
	 * @memberof CreateNewScheduleForm
	 */
    public async fillPublishNewSchedulesForm(publishSchedule: PublishSchedule): Promise<this> {
        try {
            await this.publishNewScheduleForm.fillPublishNewSchedulesForm(publishSchedule);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillPublishNewSchedulesForm, err.message);
        }
    }

	/**
	* check if Duration in Publish new schedule form is selected
	* @author  Phat.Truong
	* @param {Schedule} schedule
	* @returns {Promise<this>}
	* @memberof PublishNewScheduleForm
	*/
    public async isDurationSelected(publishSchedule: PublishSchedule): Promise<boolean> {
        try {
            return await this.publishNewScheduleForm.isDurationSelected(publishSchedule);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDurationSelected, err.message);
        }
    }

    /**
       * check if end date in new schedule form is filled
       * @author  Phat.Truong
       * @param {Schedule} schedule
       * @returns {Promise<boolean>}
       * @memberof PublishNewScheduleForm
       */
    public async isEndDateFilled(publishschedule: PublishSchedule): Promise<boolean> {
        try {
            return await this.publishNewScheduleForm.isEndDateFilled(publishschedule);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndDateFilled, err.message);
        }
    }

    /**
     * Generate a new Activity Schedule
     * @author Anh.Le
     * @param {Agent} agent which is used to clean up agent skills
     * @returns {Promise<void>}
     * @memberof ScheduleManager
     */
    public async generateActivitySchedule(name: string, activity: string, startTime: string, endTime: string, timezone: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, `Generating a new Activity Schedule`);
            let searchName: string = name;
            await this.setTimeZone(timezone);            
            if(name.includes(" "))
            {
                searchName = name +".";
            }
            await this.searchUserName(searchName);
            await this.clickAddActivity(name);
            await this.addActivity(activity, startTime, endTime);
            await this.publishNewSchedule();
            await this.pressConfirmPublishNewSchedule();
            return ScheduleManagerPage.getInstance();
        } catch (err) {
            throw new errorwrapper.CustomError(this.generateActivitySchedule, err.message);
        }
    }

    /**
     * Set time zone
     * @author Anh.Le
     * @param {string} timezone
     * @returns {Promise<ScheduleManager>}
     * @memberof ScheduleManager
     */
    public async setTimeZone(timezone: string): Promise<ScheduleManagerPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting time zone");
            await this.divTimeZone.click();
            await this.txtTimeZone.type(timezone);

            if (timezone.length > 6)
                await this.lblTimeZone(timezone).click();
            else
                await this.lblTimeZoneNumber(timezone).click();

            await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
            return ScheduleManagerPage.getInstance();

        } catch (error) {
            throw new errorwrapper.CustomError(this.setTimeZone, error.message);
        }
    }

    /**
     * Checking Schedule Publish success
     * @author Y.Le
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof ScheduleManagerPage
     */
    public async isSchedulePublishSuccess(timeOut?: number): Promise<boolean> {
        try {
            return this.mgsPublishSucess.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulePublishSuccess, err.message);
        }
    }

    /**
     * Check schedule activity displayed or not
     * @author Y.Le
     * @param {string} activity
     * @param {string} startTime
     * @param {string} endTime
     * @param {number} [timeOut]
     * @returns {Promise<boolean>}
     * @memberof ScheduleManagerPage
     */
    public async isScheduleActivityDisplayed(activity: string, startTime: string, endTime: string, timeOut?: number): Promise<boolean> {
        try {
            let className: string = await this.lblActivityByIndex(1).getAttribute('class');
            await BrowserWrapper.executeScript(`document.getElementsByClassName('${className}')[0].scrollIntoView(true)`)
            return this.iconGeneratedScheduleActivity(activity, startTime, endTime).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleActivityDisplayed, err.message);
        }
    }

    /**
    * Get ID of activity
    * @author Phat.Truong
    * @param {string} timezone
    * @returns {Promise<string>}
    * @memberof ScheduleManager
    */
    public async getActivityID(username: string, activity: ActivityCodes): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting activity ID");
            return await this.lblActivityWithUserName(username, activity).getAttribute('data-scheduleid');
        } catch (error) {
            throw new errorwrapper.CustomError(this.getActivityID, error.message);
        }
    }

    /**
    * Remove activity
    * @author Chinh.Nguyen
    * @param {string} name
    * @returns {Promise<ScheduleManagerPage>}
    * @memberof ScheduleManagerPage
    */
    public async removeActivity(name: string): Promise<ScheduleManagerPage> {
        try {
            let dataResourceID: string = await this.lblScheduleRow(name).getAttribute("data-resourceid");
            let times: number = 0;
            while (await this.lblActivityData(dataResourceID).isDisplayed(TestRunInfo.shortTimeout)) {

                await Logger.write(FunctionType.UI, "Clicking remove activity button");
                await this.lblActivityData(dataResourceID).waitForPresenceOf();
                await this.lblActivityData(dataResourceID).click();

                await this.btnRemoveActivity.click();
                if (await this.pnlRemoveTimeShiftError.isDisplayed(TestRunInfo.shortTimeout)) {
                    await this.pnlRemoveTimeShiftError.waitUntilDisappear();
                    if (await this.btnSave.isDisplayed(TestRunInfo.shortTimeout)) {
                        await this.btnSave.click();
                        await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                    }
                    await this.btnNextDay.click();
                    await this.waitForLoadingPanel(TestRunInfo.middleTimeout);
                }
                times++;
                if (times >= 10) {
                    break;
                }
            }

            if (await this.btnSave.isDisplayed(TestRunInfo.shortTimeout)) {
                await this.btnSave.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeActivity, err.message);
        }
    }

    /**
     * Check that add shift and activity panel is displayed or not
     * @author Chinh.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof ScheduleManagerPage
     */
    public async isAddShiftAndActivityDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return this.pnlAddShiftAndActivity.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isAddShiftAndActivityDisplayed, err.message);
        }
    }

    public async removeAllActivities(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "remove all activities")
            let i = 1;
            await this.waitForPageLoad();
            while (await this.lblActivityByIndex(i).isDisplayed(TestRunInfo.middleTimeout)) {
                let className: string = await this.lblActivityByIndex(i).getAttribute('class')
                await BrowserWrapper.executeScript(`document.getElementsByClassName('${className}')[0].scrollIntoView(true)`)
                await this.lblActivityByIndex(i).scrollTo();
                await this.lblActivityByIndex(i).click();
                await this.btnRemoveActivity.click();
                await this.btnSave.click();
                await this.waitForPageLoad();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAllActivities, err.message);
        }
    }
}
class PublishNewScheduleForm {
    private static _publishNewScheduleForm: PublishNewScheduleForm = null;

    public static getInstance(): PublishNewScheduleForm {
        this._publishNewScheduleForm = new PublishNewScheduleForm();
        return this._publishNewScheduleForm;
    }
    protected txtSchedulingUnit = new ElementWrapper(by.xpath("//div[@class='form-group scheduling-unit-field']//div[@class='selectize-input']"));
    protected txtSchedulingSelectedUnit = new ElementWrapper(by.xpath("//div[@class='form-group scheduling-unit-field']//div[@class='selectize-input']//div[@class='ui-select-holder ng-binding ng-hide']"));
    protected selectedDuration = new ElementWrapper(by.xpath("//div[@class='btn-group duration-selector']//label[contains(@class,'active')]"));
    protected txtStartTime = new ElementWrapper(by.xpath("//date-picker[@id='start-date']//input[contains(@class,'date-picker')]"));
    protected txtEndDate = new ElementWrapper(by.xpath("//input[@class='from-to-date-picker ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required']"));

    protected lblDurationSelector(duration: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='btn-group duration-selector']//label[text()='${duration}']`));
    }

    /**
     * is Scheduling Unit Selected
     * @author Phat.Truong
     * @returns {Promise<boolean>} display=>true, not display=>false
     * @memberof PublishNewScheduleForm
     */
    public async isSchedulingUnitSelected(): Promise<boolean> {
        try {
            if (await this.txtSchedulingSelectedUnit.getText() != " Scheduling Units") {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulingUnitSelected, err.message);
        }
    }

    /**
    * check if Duration in Publish new schedule form is selected
    * @author  Phat.Truong
    * @param {Schedule} schedule
    * @returns {Promise<this>}
    * @memberof PublishNewScheduleForm
    */
    public async isDurationSelected(publishSchedule: PublishSchedule): Promise<boolean> {
        try {
            if (publishSchedule.duration == await this.selectedDuration.getText()) {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDurationSelected, err.message);
        }
    }

    /**
 * Filling Publish new schedules form
 * @author Phat.Truong
 * @param {Schedule} schedule
 * @returns {Promise<this>}
 * @memberof PublishNewScheduleForm
 */
    public async fillPublishNewSchedulesForm(publishschedule: PublishSchedule): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Filling generate new schedules form");
            await this.txtStartTime.type(publishschedule.startDate);
            await this.lblDurationSelector(publishschedule.duration).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillPublishNewSchedulesForm, err.message);
        }
    }

    /**
	 * check if end date in new schedule form is filled
	 * @author  Phat.Truong
	 * @param {Schedule} schedule
	 * @returns {Promise<boolean>}
	 * @memberof PublishNewScheduleForm
	 */
    public async isEndDateFilled(publishschedule: PublishSchedule): Promise<boolean> {
        try {
            let result: string = await this.txtEndDate.getControlValue();
            let endDate = Utility.formatDateTime(publishschedule.endDate, "MMM-D-YYYY", "MMM D, YYYY");

            if (endDate == result) {
                return true;
            }
            return false;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isEndDateFilled, err.message);
        }
    }
}


