import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export enum ScheduleDuration {
    ONE_WEEK = "1W",
    TWO_WEEK = "2W",
    THREE_WEEK = "3W",
    FOUR_WEEK = "4W"
}

export enum StaffingPlan {
    MANUAL_PLANNING = "manualPlanning",
    AUTOMATIC_PLANNING = "automaticPlanning"
}
export class Schedule {
    schedulingUnit: string;
    multiSchedulingSkill: boolean;
    startDate: string;
    endDate: string;
    duration: string;
    staffingPlan: StaffingPlan;
    planningSelect: string
    rangeDate: string;

    public initData(schedulingUnit: string, staffingPlan: StaffingPlan, planningSelect: string, multiSchedulingSkill?: boolean): Schedule {
        try {
            this.schedulingUnit = schedulingUnit;
            let tmpDate: Date = new Date();
            let date: Date = new Date(tmpDate.setDate(tmpDate.getDate() + Utility.getRandomNumber(2, 1, 14)));
            this.startDate = Utility.formatDateTime(date.toString(), "ddd MMM DD YYYY", "MMM D, YYYY");
            this.duration = ScheduleDuration.TWO_WEEK;
            let endDate: Date = new Date(tmpDate.setDate(date.getDate() + parseInt(this.duration.slice(0, 1)) * 7 - 1))
            this.endDate = Utility.formatDateTime(endDate.toString(), "ddd MMM DD YYYY", "MMM D, YYYY");
            this.rangeDate = Utility.formatDateTime(this.startDate, "MMM-D-YYYY", "MMM D, YYYY") + " - " + Utility.formatDateTime(this.endDate, "MMM-D-YYYY", "MMM D, YYYY");
            this.staffingPlan = staffingPlan;
            this.planningSelect = planningSelect;
            this.multiSchedulingSkill = multiSchedulingSkill;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}

export class PublishSchedule {
    startDate: string;
    endDate: string;
    duration: string;
    public initData(): PublishSchedule {
        try {
            let tmpDate: Date = new Date();
            let date: Date = new Date(tmpDate.setDate(tmpDate.getDate() + Utility.getRandomNumber(2, 1, 14)));
            this.startDate = Utility.formatDateTime(date.toString(), "ddd MMM DD YYYY", "MMM D, YYYY");
            let randomDurationWeek: number = Utility.getRandomNumber(1, 1, 3);
            this.duration = randomDurationWeek + "W";
            let endDate: Date = new Date(tmpDate.setDate(date.getDate() + randomDurationWeek * 7 - 1))
            this.endDate = Utility.formatDateTime(endDate.toString(), "ddd MMM DD YYYY", "MMM D, YYYY");
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}