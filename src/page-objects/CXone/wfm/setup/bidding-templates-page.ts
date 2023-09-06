import TopMenu from "@page-objects/CXone/general/top-menu";
import { FunctionType, Logger } from "@utilities/general/logger";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { by } from "protractor";
import { WeekDay, ShiftTime, ShiftType } from "@data-objects/CXone/wfm/setup/bidding-templates";
import { Utility } from "@utilities/general/utility";

export default class BiddingTemplatesPage extends TopMenu {

    private static _BiddingTemplatesPage: BiddingTemplatesPage = null;

    protected btnNewTemplate = new ElementWrapper(by.xpath("//button[@id='newTemplate']"));
    protected btnCreate = new ElementWrapper(by.xpath("//button[@id='save']"));

    protected txtTemplateTitle = new ElementWrapper(by.xpath("//input[@name='TemplateTitle']"));
    
    //protected cbbShiftTime = new SelectElementWrapper(by.xpath(""));
    //protected cbbShiftStartTime = new SelectElementWrapper(by.xpath("//time-picker[@id='earliestStart']"));
    protected cbbShiftStartTime = new ElementWrapper(by.xpath("//input[@name='earliestStart']"));
    //protected cbbShiftEndTime = new SelectElementWrapper(by.xpath("//time-picker[@id='latestStart']"));
    protected cbbShiftEndTime = new ElementWrapper(by.xpath("//input[@name='latestStart']"));
    protected cbbStartTimeIncrement = new SelectElementWrapper(by.xpath("//div[contains(@class,'startTimeIncrement nice-dropdown')]"));
    protected cbbShiftType = new ElementWrapper(by.xpath("//div[@class='ui-select-container selectize-control single ng-not-empty ng-valid ng-valid-required']"));
    protected cbbActivityCodes = new SelectElementWrapper(by.xpath("//div[@class='ui-select-container selectize-control single ng-empty ng-valid']"));
    
    protected popBiddingTemplate = new ElementWrapper(by.xpath("//h3[text()='Create New Bidding Template']/ancestor::div[@class='modal-content']"));

    //Dynamic Controls
    protected btnWeekDay(Day: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='daysWrapper']/div[text()='${Day}']`));
    }

    protected miTime(Time: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//li[contains(@class,'ui-timepicker') and text()='${Time}']`));
    }

    protected shiftTypeOption(shiftType: ShiftType) {
        return new ElementWrapper(by.xpath(`//div[@class='option ui-select-choices-row-inner']//div[text()='${shiftType}']`));
    }
    
    protected tbrBiddingTemplate(biddingTemplateName: string) {
        return new ElementWrapper(by.xpath(`//div[@tooltip-text='${biddingTemplateName}']/ancestor::div[@role='row']`));
    }

    public static getInstance(): BiddingTemplatesPage {
        this._BiddingTemplatesPage = new BiddingTemplatesPage();
        return this._BiddingTemplatesPage;
    }

    /**
     * Enter Bidding Template name
     * @author Tuan.Vu
     * @param {string} biddingTemplateName
     * @returns {Promise<BiddingTemplatesPage>}
     * @memberof BiddingTemplatesPage
     */
    public async enterBiddingTemplateName(biddingTemplateName: string): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Entering Bidding Template name");
            await this.txtTemplateTitle.type(biddingTemplateName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterBiddingTemplateName, err.message);
        }              
    }

    /**
     * Select Shift duration time
     * @author Tuan.Vu
     * @param {ShiftTime} timeStart
     * @param {ShiftTime} timeEnd
     * @returns {Promise<BiddingTemplatesPage>}
     * @memberof BiddingTemplatesPage
     */
    public async enterShiftDuration(timeStart: ShiftTime, timeEnd: ShiftTime): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "enter shift duration time");
            await this.cbbShiftStartTime.type(timeStart);
            await this.cbbShiftEndTime.type(timeEnd);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.enterShiftDuration, err.message);
        }              
    }
    
    /**
     * Select week days
     * @author Tuan.Vu
     * @param {WeekDay} weekDay
     * @returns {Promise<BiddingTemplatesPage>}
     * @memberof BiddingTemplatesPage
     */
    public async selectWeekDays(weekDay: WeekDay[]): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting week days");
            for (let i = 0; i < weekDay.length; i++) {
                this.btnWeekDay(weekDay[i]).click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectWeekDays, err.message);
        }              
    }

     /**
     * Select shift type
     * @author Tuan.Vu
     * @param {ShiftType} shiftType
     * @returns {Promise<CoachingPackageDesigner>}
     * @memberof BiddingTemplatesPage
     */
    public async selectShiftType(shiftType: ShiftType): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Selecting shift type");
            await this.cbbShiftType.click();
            await this.shiftTypeOption(shiftType).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectShiftType, err.message);
        }              
    }

    /**
     * Click on New Template button
     * @author Tuan.Vu
     * @returns {Promise<BiddingTemplatesPage>}
     * @memberof BiddingTemplatesPage
     */
    public async clickNewTemplate(): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on New Template button");
            await this.btnNewTemplate.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickNewTemplate, err.message);
        }
    }

    /**
     * Click on Create button
     * @author Tuan.Vu
     * @returns {Promise<BiddingTemplatesPage>}
     * @memberof BiddingTemplatesPage
     */
    public async clickCreateButton(): Promise<BiddingTemplatesPage> {
        try {
            await Logger.write(FunctionType.UI, "Clicking on Create button");
            await this.btnCreate.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clickCreateButton, err.message);
        }
    }

    /**
     * Check Bidding Template window displays
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof BiddingTemplatesPage
     */
    public async isBiddingTemplateWindowDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return  await this.popBiddingTemplate.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBiddingTemplateWindowDisplayed, err.message);
        }
    }

    /**
     * Check if Bidding Template created and listed in the Bidding Templates page
     * @author Tuan.Vu
     * @returns {Promise<boolean>}
     * @memberof BiddingTemplatesPage
     */
    public async isBiddingTemplateCreated(biddingTemplateName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Check if Bidding Template created and listed in the Bidding Templates page");
            //await this.tbrBiddingTemplate(biddingTemplateName).waitForControlStable();
            return await this.tbrBiddingTemplate(biddingTemplateName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBiddingTemplateCreated, err.message);
        }
    }
    
}