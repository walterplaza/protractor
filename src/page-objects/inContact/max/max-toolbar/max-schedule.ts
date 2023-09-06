import { ScheduleFor } from "@data-objects/general/max";
import { ScheduleCommitment } from "@data-objects/inContact/max/schedule-commitment/schedule-commitment";
import MaxPage from "@page-objects/inContact/max/max-page";
import ProjectPath from "@test-data/general/project-path";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import ElementWrapper from "@utilities/protractor-wrappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import SelectElementWrapper from "@utilities/protractor-wrappers/select-element-wrapper";
import { by, Key, Browser } from "protractor";
import TestRunInfo from "@data-objects/general/test-run-info";
export default class MaxSchedulePopUp extends MaxPage {
    private static _maxSchedulePopUp: MaxSchedulePopUp = null;

    protected btnAddSchedule = new ElementWrapper(by.xpath("//span[@class='add-commitment']"));
    protected popSchedule = new ElementWrapper(by.xpath("//div[@class='popover-panel commitment-manager-popover']"));
    protected lblCommitment = new ElementWrapper(by.xpath("//div[@class='item-list-header clickthrough-header']//header[@title='Schedule a commitment']"));
    protected lblSelectedCommitmentTime = new ElementWrapper(by.xpath("//div[@class='selectmenu-button commitment-timezones']/div[@class='selectmenu-text']"));
    protected lblCommitmentTimeZone = new ElementWrapper(by.xpath("//div[@class='selectmenu-button commitment-timezones']/div[@class='selectmenu-text'][text()='Commitment Timezone']"));
    protected btnMe = new ElementWrapper(by.xpath("//button[@class='me-button columns button-selected']"));
    protected txtFisrtName = new ElementWrapper(by.xpath("//div[@class='names-container']/input[@type='text' and contains(@class,'commitment-first')]"));
    protected txtLastName = new ElementWrapper(by.xpath("//div[@class='names-container']/input[@type='text' and contains(@class,'commitment-last')]"));
    protected txtPhoneNumber = new ElementWrapper(by.xpath("//div/input[@type='text' and contains(@class,'commitment-phone')]"));
    protected btnScheduleCommitmentSkill = new SelectElementWrapper(by.xpath("//div[@class='selectmenu-button commitment-skill']"));
    protected btnCommitmentDatePicker = new ElementWrapper(by.xpath("//div[@class='times-container']/div[contains(@class,'date-picker-container')]"));
    protected txtCommitmentDate = new ElementWrapper(by.xpath("//input[@placeholder='Date']"));
    protected txtCommitmentTimeHour = new ElementWrapper(by.xpath("//div[@class='the-time']/input[@class='commitment-time-hour']"));
    protected txtCommitmentTimeMinute = new ElementWrapper(by.xpath("//div[@class='the-time']/input[@class='commitment-time-minutes']"));
    protected txtCommitmentTimeMeridian = new ElementWrapper(by.xpath("//div[@class='the-time']/input[@class='commitment-time-meridian']"));
    protected txtCommitmentNote = new ElementWrapper(by.xpath("//div/textarea[@class='commitment-notes']"));
    protected btnCommitmentTimeZone = new SelectElementWrapper(by.xpath("//div[@class='selectmenu-button commitment-timezones']"));
    protected txtNoteCommitment = new ElementWrapper(by.xpath("//textarea[@class='commitment-notes']"));
    protected txtFirstName = new ElementWrapper(by.xpath("//input[contains(@class,'commitment-first')]"));
    protected btnScheduleForMe = new ElementWrapper(by.xpath("//button[@class='me-button columns button-selected']"));
    protected btnScheduleForSkill = new ElementWrapper(by.xpath("//button[@class='skill-button columns']"));
    protected ddlSkill = new ElementWrapper(by.xpath("//div[@class='commitment-skill-container']"));
    protected cbbTypeOfScheduleTime = new ElementWrapper(by.xpath("//div[@class='times-container']//input[contains(@class,'commitment-time-meridian')]"));
    protected cbbScheduleTimeMinutes = new ElementWrapper(by.xpath("//input[contains(@class,'commitment-time-minutes')]"));
    protected cbbScheduleTimeHour = new ElementWrapper(by.xpath("//input[contains(@class,'commitment-time-hour')]"));
    protected cbbScheduleDate = new ElementWrapper(by.xpath("//input[contains(@class,'commitment-date')]"));
    protected btnSave = new ElementWrapper(by.xpath("//button[@class='submit']"));
    protected btnRemove = new ElementWrapper(by.xpath("//button[@class='remove']"));
    protected btnConfirmRemove = new ElementWrapper(by.xpath("//div[@class='dialog-contents']//div[@class='dialog-buttons-panel']/button[@class='confirm-button']"));
    protected btnCancelRemove = new ElementWrapper(by.xpath("//div[@class='dialog-contents']//div[@class='dialog-buttons-panel']/button[@class='cancel-button']"));
    protected btnCallSchedule = new ElementWrapper(by.xpath("//div[contains(@id,'commitmenthandleui')]//button[@class='call']"));
    protected btnReschedule = new ElementWrapper(by.xpath("//div[contains(@id,'commitmenthandleui')]//button[@class='reschedule']"));
    protected reschedulePopup = new ElementWrapper(by.xpath("//div[contains(@id,'commitmentaddui')]//div[@class='popover-panel commitment-add-panel']"));
    protected txtConfirmNote = new ElementWrapper(by.xpath("//div[@class='dialog-text-panel']/textarea[@class='confirm-delete-notes']"));    

    public static async getInstance(): Promise<MaxSchedulePopUp> {
        this._maxSchedulePopUp = new MaxSchedulePopUp();
        return this._maxSchedulePopUp;
    }

    // Dynamic controls
    protected btnScheduleFor(name: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//button[@title='${name}']`));
    }

    protected lblScheduleCommitment(commitmentName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@title,'${commitmentName}')]/ancestor::li[@class='clickable commitment-template']`));
    }

    protected optionScheduleSkill(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='commitment-skill-container']//ul[@class='selectmenu-menu-list']/li[@class='selectmenu-menu-item selected'][@title='${skillName}']`));
    }

    protected itemScheduleCommitment(userName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@title='${userName}']//ancestor::li[@class='clickable commitment-template']`));
    }

    protected scheduleCallPopup(scheduleName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[contains(@id,'commitmenthandleui')]//div[@title='${scheduleName}']`));
    }

    protected lblScheduleCallPhoneNumber(phoneNumber: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='contact-number left'][@title='${phoneNumber}']`));
    }

    protected lblScheduleCallSkill(skillName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@id='contactContainer']//div[@class='skill-name'][contains(@title,'${skillName}')]`));
    }

    protected lblHour(hourTime: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='hour-container']//div[@class='item'][text()='${hourTime}']`));
    }

    protected lblMinute(minuteTime: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='minutes-container']//div[@class='item'][text()='${minuteTime}']`));
    }

    protected lblMeridian(meridian: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='meridian-container']//div[@class='item'][text()='${meridian}']`));
    }

    protected lblTimeZone(timeZone: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//ul[@class='selectmenu-menu-list']/li[text()='${timeZone}']`));
    }

    protected btnDatePickerArrow(bntName: string): ElementWrapper {
        return new ElementWrapper(by.xpath(`//div[@class='times-container']//div[@class='date-picker-container']//div[@class='pika-lendar']//button[contains(@class, 'pika-${bntName}')]`));
    }

    /**
     * Check add schedule button displayed
     * @author Y.Le
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxSchedulePopUp
     */
    public async isBtnAddScheduleDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return this.btnAddSchedule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isBtnAddScheduleDisplayed, err.message);
        }
    }

    /**
     * Check add schedule pop up displayed
     * @author Y.Le
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxSchedulePopUp
     */
    public async isSchedulePopUpDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return this.popSchedule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulePopUpDisplayed, err.message);
        }
    }

    /**
     * Opening commitment popup
     * @author Y.Le
     * @returns {Promise<this>}
     * @memberof MaxSchedulePopUp
     */
    public async openCommitmentPopup(): Promise<this> {
        try {
            await Logger.write(FunctionType.UI, "Opening commitment popup");
            await this.btnAddSchedule.click();
            return await this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.openCommitmentPopup, err.message);
        }
    }

    /**
     * Check commitment is displayed
     * @author Y.Le
     * @returns {Promise<boolean>}
     * @memberof MaxSchedulePopUp
     */
    public async isCommitmentPopDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblCommitment.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitmentPopDisplayed, err.message);
        }
    }

    /**
     * Get Me button color
     * @author Anh.Le
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getColorMeButtonSchedule(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of button Me");
            await this.btnMe.waitUntilCssValueNotChange("color");
            return Utility.convertRgbToHex(await this.btnMe.getCssValue("color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorMeButtonSchedule, err.message);
        }
    }

    /**
     * Getting selected commitment time zone
     * @author Y.Le
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedTimeZoneCommitment(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected commitment time zone");
            await this.lblCommitmentTimeZone.waitUntilDisappear();
            let timeZone: string = await this.lblSelectedCommitmentTime.getText();
            return timeZone.slice(timeZone.indexOf("(") + 4, timeZone.indexOf(")"));// Get time zone: +07:00
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedTimeZoneCommitment, err.message);
        }
    }

    /**
      * Filling in schedule commitment 
      * @author Phat.Truong
      * @returns {Promise<string>}
      * @memberof MaxSchedulePopUp
      */
    public async fillInScheduleCommitment(schedule: ScheduleCommitment): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling in schedule commitment ");
            await this.txtFisrtName.type(schedule.firstName);
            await this.txtLastName.type(schedule.lastName);
            await this.txtPhoneNumber.type(schedule.phoneNumber);
            await this.btnScheduleFor(schedule.scheduleFor).click();
            await this.txtCommitmentDate.type(schedule.commitmentDate);

            let tempCommitmentMinutes: number = parseInt(schedule.commitmentMinutes);
            let tempCommitmentHours: number = parseInt(schedule.commitmentHour);

            // Convert hours from 24 hours to 12 hours
            if (tempCommitmentHours == 0 || tempCommitmentHours == 24) {
                tempCommitmentHours = 12;
            } else {
                tempCommitmentHours %= 12;
            }

            // Convert minutes to multiples of 5
            if (tempCommitmentMinutes % 5 != 0) {
                tempCommitmentMinutes = tempCommitmentMinutes - (tempCommitmentMinutes % 5);
            }

            if (schedule.commitmentHour != "") {
                await this.cbbScheduleTimeHour.click();
                if (tempCommitmentHours <= 9) {
                    await this.lblHour("0" + tempCommitmentHours).click();
                } else {
                    await this.lblHour(tempCommitmentHours.toString()).click();
                }
            }

            if (schedule.commitmentMinutes != "") {
                await this.cbbScheduleTimeMinutes.click();
                if (tempCommitmentMinutes <= 9) {
                    await this.lblMinute("0" + tempCommitmentMinutes).click();
                } else {
                    await this.lblMinute(tempCommitmentMinutes.toString()).click();
                }
            }

            if (schedule.commitmentMeridian != "") {
                await this.cbbTypeOfScheduleTime.click();
                if (parseInt(schedule.commitmentHour) < 12 || parseInt(schedule.commitmentHour) == 24) {
                    await this.lblMeridian("am").click();
                } else {
                    await this.lblMeridian("pm").click();
                }
            }

            await this.txtCommitmentNote.type(schedule.note);
            if (schedule.timeZone != "") {
                await this.btnCommitmentTimeZone.selectOptionByTextContains(schedule.timeZone);
            }
            await this.btnSave.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillInScheduleCommitment, err.message);
        }
    }

    /** Check if Schedule commitment is sorted 
	 * @author Phat.Truong
	 * @returns {Promise<boolean>}
	 * @memberof MaxSchedulePopUp
	 */
    public async isScheduleCommitmentSorted(commitmentAbove: string, commitmentBelow: string): Promise<boolean> {
        try {
            let soonerCommitmentID: string = await this.lblScheduleCommitment(commitmentAbove).getAttribute("data-id");
            let laterCommitmentID: string = await this.lblScheduleCommitment(commitmentBelow).getAttribute("data-id");
            return soonerCommitmentID < laterCommitmentID;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleCommitmentSorted, err.message);
        }
    }

    /** Is Schedule commitment saved 
	 * @author Phat.Truong
	 * @returns {Promise<boolean>}
	 * @memberof MaxSchedulePopUp
	 */
    public async isCommitmentSaved(commitmentName: string): Promise<boolean> {
        try {
            return await this.lblScheduleCommitment(commitmentName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCommitmentSaved, err.message);
        }
    }

    /**
     * Fill first name to schedule a commitment popover
     * @author Huy.Nguyen
     * @param {string} firstName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async fillFirstNameSchedule(firstName: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling first name to a schedule commitment popover");
            await this.txtFirstName.waitForVisibilityOf();
            await this.txtFirstName.type(firstName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillFirstNameSchedule, err.message);
        }
    }

    /**
     * Fill last name to schedule a commitment popover
     * @author Huy.Nguyen
     * @param {string} lastName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async fillLastNameSchedule(lastName: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling last name to a schedule commitment popover");
            await this.txtLastName.waitForVisibilityOf();
            await this.txtLastName.type(lastName);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillLastNameSchedule, err.message);
        }
    }

    /**
     * Fill number phone to schedule a commitment popover
     * @author Huy.Nguyen
     * @param {string} numberPhone
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async fillNumberPhoneSchedule(numberPhone: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling phone number to a schedule commitment popover");
            await this.txtPhoneNumber.waitForVisibilityOf();
            await this.txtPhoneNumber.type(numberPhone);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillNumberPhoneSchedule, err.message);
        }
    }

    /**
     * Choose schedule mode for ME or SKILL
     * @author Huy.Nguyen
     * @param {ScheduleFor} scheduleFor
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async selectScheduleFor(scheduleFor: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, `Selecting schedule for ${scheduleFor}`);
            if (scheduleFor == ScheduleFor.ME) {
                await this.btnScheduleForMe.waitForVisibilityOf();
                await this.btnScheduleForMe.moveMouse();
                await this.btnScheduleForMe.click();
            } else {
                await this.btnScheduleForSkill.waitForVisibilityOf();
                await this.btnScheduleForSkill.moveMouse();
                await this.btnScheduleForSkill.click();
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectScheduleFor, err.message);
        }
    }

    /**
     * Select aa skill name for schedule
     * @author Huy.Nguyen
     * @param {string} skillName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async selectSkillSchedule(skillName: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Selecting skill name for a schedule commitment popover");
            await this.ddlSkill.waitForVisibilityOf();
            await this.ddlSkill.click();
            await this.optionScheduleSkill(skillName).waitForPresenceOf();
            await this.optionScheduleSkill(skillName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectSkillSchedule, err.message);
        }
    }

    /**
     * Select a date for schedule a commitment popover
     * @author Huy.Nguyen
     * @param {string} scheduleDate
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async selectDateSchedule(scheduleDate: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Selecting date for a schedule commitment popover");
            await this.cbbScheduleDate.waitForVisibilityOf();
            await this.cbbScheduleDate.type(scheduleDate);
            await this.cbbScheduleDate.pressButton(Key.TAB);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectDateSchedule, err.message);
        }
    }

    /**
     * Fill some notes to schedule commitment
     * @author Huy.Nguyen
     * @param {string} note
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async fillNoteSchedule(note: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling note for a schedule commitment popover");
            await this.txtNoteCommitment.waitForVisibilityOf();
            await this.txtNoteCommitment.type(note);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillNoteSchedule, err.message);
        }
    }

    /**
     * Get entered first name in schedule commitment popover
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getEnteredFirstName(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered first name");
            return await this.txtFirstName.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredFirstName, err.message);
        }
    }

    /**
     * Get entered last name in schedule commitment popover
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getEnteredLastName(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered last name");
            return await this.txtLastName.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredLastName, err.message);
        }
    }

    /**
     * Get entered number phone in schedule commitment popover
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getEnteredNumberPhone(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered phone number");
            return await this.txtPhoneNumber.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredNumberPhone, err.message);
        }
    }

    /**
     * Get SKILL button color
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getColorSkillButtonSchedule(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting color of button Skill schedule");
            await this.btnScheduleForSkill.waitUntilCssValueNotChange("color");
            return Utility.convertRgbToHex(await this.btnScheduleForSkill.getCssValue("color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorSkillButtonSchedule, err.message);
        }
    }

    /**
     * Get entered schedule date
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedScheduleDate(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected schedule date");
            return await this.cbbScheduleDate.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedScheduleDate, err.message);
        }
    }

    /**
     * Get skill name selected in schedule
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedSkillName(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected schedule skill name");
            let selectedSkill: string = await this.ddlSkill.getText();
            if (TestRunInfo.browser == Browser.EDGE) {
                selectedSkill = selectedSkill.replace(/[\n\s*]/g,"");
            }
            return selectedSkill;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedSkillName, err.message);
        }
    }

    /**
     * Get hour selected of schedule
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedHourSchedule(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected schedule hours");
            return await this.cbbScheduleTimeHour.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedHourSchedule, err.message);
        }
    }

    /**
     * Get minutes selected of schedule
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedMinuteSchedule(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected schedule minute");
            return await this.cbbScheduleTimeMinutes.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedMinuteSchedule, err.message);
        }
    }

    /**
     * Get meridian selected of time in schedule
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getSelectedMeridianSchedule(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting selected schedule meridian");
            return await this.cbbTypeOfScheduleTime.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSelectedMeridianSchedule, err.message);
        }
    }

    /**
     * Get the note entered in schedule popover
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getEnteredScheduleNote(): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Getting entered schedule note");
            return await this.txtNoteCommitment.getControlValueByClassName();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getEnteredScheduleNote, err.message);
        }
    }

    /**
     * Fill all data to "schedule a commitment" popover. 
     * @author Huy.Nguyen
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async fillScheduleCommitment(schedule: ScheduleCommitment): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling data to a schedule commitment popover");
            await this.fillFirstNameSchedule(schedule.firstName);
            await this.fillLastNameSchedule(schedule.lastName);
            await this.fillNumberPhoneSchedule(schedule.phoneNumber);
            await this.selectScheduleFor(schedule.scheduleFor);
            await this.selectSkillSchedule(schedule.commitmentSkill);
            if (schedule.commitmentDate != "") {
                await this.selectDateSchedule(schedule.commitmentDate);
            }
            if (schedule.commitmentHour != "") {
                await this.cbbScheduleTimeHour.click();
                await this.lblHour(schedule.commitmentHour).click();
            }
            if (schedule.commitmentMinutes != "") {
                await this.cbbScheduleTimeMinutes.click();
                await this.lblMinute(schedule.commitmentMinutes).click();
            }
            if (schedule.commitmentMeridian != "") {
                await this.cbbTypeOfScheduleTime.click();
                await this.lblMeridian(schedule.commitmentMeridian).click();
            }
            if (schedule.timeZone != "") {
                await this.lblSelectedCommitmentTime.click();
                await this.lblTimeZone(schedule.timeZone).scrollToElement();
                await this.lblTimeZone(schedule.timeZone).click();
            }
            if (schedule.note != "") {
                await this.fillNoteSchedule(schedule.note);
            }

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillScheduleCommitment, err.message);
        }
    }

    /**
     * Save data to a schedule commitment popover
     * @author Huy.Nguyen
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async saveScheduleCommitment(): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Saving data to a schedule commitment popover");
            await this.btnSave.waitForVisibilityOf();
            await this.btnSave.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.saveScheduleCommitment, err.message);
        }
    }

    /**
     * Fill all data to "schedule a commitment" popover and save it. 
     * @author Huy.Nguyen
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} numberPhone
     * @param {ScheduleFor} scheduleFor
     * @param {string} skillName
     * @param {string} [note]
     * @param {string} [dateTime]
     * @param {string} [hourTime]
     * @param {string} [minutesTime]
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async fillAndSaveScheduleCommitment(schedule: ScheduleCommitment): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Filling and saving data to a schedule commitment popover");
            await this.fillScheduleCommitment(schedule);
            await this.saveScheduleCommitment();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.fillAndSaveScheduleCommitment, err.message);
        }
    }

    /**
     * Check schedule items is displayed in My Schedule
     * @author Huy.Nguyen
     * @param {string} itemUserName
     * @returns {Promise<boolean>}
     * @memberof MaxSchedulePopUp
     */
    public async isItemScheduleDisplayed(itemUserName: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.UI, "Checking item schedule commitment is displayed");
            await this.itemScheduleCommitment(itemUserName).waitForVisibilityOf();
            return await this.itemScheduleCommitment(itemUserName).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isItemScheduleDisplayed, err.message);
        }
    }

    /**
     * Remove schedule item from My Schedule
     * @author Huy.Nguyen
     * @param {string} itemUserName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async removeItemSchedule(itemUserName: string, note?: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Removing an item schedule commitment");
            await this.btnRemove.waitForVisibilityOf();
            await this.btnRemove.click();
            if (note != null) {
                await this.txtConfirmNote.type(note);
            }
            await this.btnConfirmRemove.click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeItemSchedule, err.message);
        }
    }

    /**
     * Check highlighted background color of schedule item when we focus on it
     * @author Huy.Nguyen
     * @param {string} itemUserName
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async getColorScheduleItemHighlighted(itemUserName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Checking background color of schedule item");
            await this.itemScheduleCommitment(itemUserName).waitForVisibilityOf();
            await this.itemScheduleCommitment(itemUserName).moveMouse();
            return Utility.convertRgbToHex(await this.itemScheduleCommitment(itemUserName).getCssValue("background-color"));
        } catch (err) {
            throw new errorwrapper.CustomError(this.getColorScheduleItemHighlighted, err.message);
        }
    }

    /**
     * Choose schedule button Call or Reschedule
     * @author Chinh.Nguyen
     * @param {string} scheduleButton
     * @returns {Promise<MaxPage>}
     * @memberof MaxSchedulePopUp
     */
    public async selectScheduleType(scheduleButton: string): Promise<MaxPage> {
        try {
            await Logger.write(FunctionType.UI, `Selecting schedule ${scheduleButton} button type `);
            if (scheduleButton == "Call") {
                await this.btnCallSchedule.waitForVisibilityOf();
                await this.btnCallSchedule.moveMouse();
                await this.btnCallSchedule.click();

            } else if (scheduleButton == "Reschedule") {
                await this.btnReschedule.waitForVisibilityOf();
                await this.btnReschedule.moveMouse();
                await this.btnReschedule.click();
            }
            let maxPage = require(`${ProjectPath.pageObjects}/inContact/max/max-page`).default;
            return await maxPage.getMaxInstance(false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectScheduleType, err.message);
        }
    }

    /** 
     * Select an exist schedule item from My Schedule
     * @author Huy.Nguyen
     * @param {string} itemUserName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async selectExistingSchedule(itemUserName: string): Promise<MaxSchedulePopUp> {
        try {
            await Logger.write(FunctionType.UI, "Selecting an exists item schedule commitment");
            await this.itemScheduleCommitment(itemUserName).waitForVisibilityOf();
            await this.itemScheduleCommitment(itemUserName).click();
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.selectExistingSchedule, err.message);
        }
    }

    /**
     * Check whether the schedule pop up displays or not
     * @author Chinh.Nguyen
     * @param {string} scheduleName
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxPage
     */
    public async isCallSchedulePopUpDisplayed(scheduleName: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.scheduleCallPopup(scheduleName).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isCallSchedulePopUpDisplayed, err.message);
        }
    }

	/**
	 * Check whether the schedule phonenumber displays in schedule pop up or not
	 * @author Chinh.Nguyen
	 * @param {string} phoneNumber
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isSchedulePhoneNumberDisplayedInSchedulePopup(phoneNumber: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblScheduleCallPhoneNumber(phoneNumber).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSchedulePhoneNumberDisplayedInSchedulePopup, err.message);
        }
    }

	/**
	 * Check whether the schedule skill displays in schedule pop up or not
	 * @author Chinh.Nguyen
	 * @param {string} scheduleSkill
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isScheduleSkillDisplayedInSchedulePopup(scheduleSkill: string, timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.lblScheduleCallSkill(scheduleSkill).isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleSkillDisplayedInSchedulePopup, err.message);
        }
    }

	/**
	 * Check whether the schedule call button displays in schedule pop up or not
	 * @author Chinh.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isScheduleCallButtonDisplayedInSchedulePopup(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnCallSchedule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleCallButtonDisplayedInSchedulePopup, err.message);
        }
    }

	/**
	 * Check whether the schedule reschedule button displays in schedule pop up or not
	 * @author Chinh.Nguyen
	 * @param {number} [timeoutInSecond]
	 * @returns {Promise<boolean>}
	 * @memberof MaxPage
	 */
    public async isScheduleRescheduleButtonDisplayedInSchedulePopup(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnReschedule.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isScheduleRescheduleButtonDisplayedInSchedulePopup, err.message);
        }
    }

    /** 
     * Check remove button exist on Schedule commitment setting
     * @author Huy.Nguyen
     * @param {string} itemUserName
     * @returns {Promise<MaxSchedulePopUp>}
     * @memberof MaxSchedulePopUp
     */
    public async isRemoveButtonDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.btnRemove.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isRemoveButtonDisplayed, err.message);
        }
    }

    /**
     * Check whether the reschedule pop up displays or not
     * @author Chinh.Nguyen
     * @param {number} [timeoutInSecond]
     * @returns {Promise<boolean>}
     * @memberof MaxSchedulePopUp
     */
    public async isReschedulePopupDisplayed(timeoutInSecond?: number): Promise<boolean> {
        try {
            return await this.reschedulePopup.isDisplayed(timeoutInSecond);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isReschedulePopupDisplayed, err.message);
        }
    }

    /**       
     * Generate a date we had made a schedule report (Example timezone format is 5/3/2019 5:30:00 PM)
     * @author Huy.Nguyen
     * @param {string} scheduleDate
     * @param {string} hourSchedule
     * @param {string} minuteSchedule
     * @param {string} meridian
     * @returns {Promise<string>}
     * @memberof MaxSchedulePopUp
     */
    public async generateScheduleReportDateTime(scheduleDate: string, hourSchedule: string, minuteSchedule: string, meridian: string): Promise<string> {
        try {
            await Logger.write(FunctionType.UI, "Generating date made a schedule report");
            
            // Add 1 hour to handle for daylight saving time (GMT -07:00 will be -06:00)
            // TODO: Please remove lines code below after DST is finish.
            let hourDST: number = (parseInt(hourSchedule)+1)
            if (hourDST > 11 && meridian=="pm") {
                meridian = "am";
                let JulianNextDate: number = Utility.convertDateToJulianNumber(new Date())+1; // Pass to new date by add 1
                scheduleDate = Utility.convertJulianNumberToDate(JulianNextDate);
            }
            hourSchedule = hourDST.toString(); // Ending handle DST.

            let expectTimeZone: string = `${scheduleDate.replace(/0(?=\d\/)/gi, "")} ${hourSchedule}:${minuteSchedule}:00 ${meridian.toLocaleUpperCase()}`;
            
            // let expectTimeZone: string = `${scheduleDate.replace(/0(?=\d\/)/gi, "")} ${hourSchedule.slice(-1)}:${minuteSchedule}:00 ${meridian.toLocaleUpperCase()}`;
            return expectTimeZone;
        } catch (err) {
            throw new errorwrapper.CustomError(this.generateScheduleReportDateTime, err.message);
        }
    }

    /**
	 * Click New button on MAX
     * @author W.Plaza
	 * @returns {Promise<MaxSchedulePopUp>}
	 * @memberof MaxPage
	 */
	public async clickDateTextBox(): Promise<MaxSchedulePopUp> {
		try {
			await Logger.write(FunctionType.UI, `Clicking Date text-box`);
			await this.cbbScheduleDate.click();
			return this;
		} catch (err) {
			throw new errorwrapper.CustomError(this.clickDateTextBox, err.message);
		}
    }
    
    /**
	 * Click New button on MAX
     * @author W.Plaza
     * @param {string} btnName // previous button: prev, next button: next. 
	 * @returns {Promise<string>}
	 * @memberof MaxPage
	 */
	public async getDatePickerArrowImageUrl(btnName: string): Promise<string> {
		try {
			await Logger.write(FunctionType.UI, `Validating that date-picker ${btnName} arrows are diplayed`);
			return await this.btnDatePickerArrow(btnName).getCssValue('background-image');
		} catch (err) {
			throw new errorwrapper.CustomError(this.getDatePickerArrowImageUrl, err.message);
		}
	}
}