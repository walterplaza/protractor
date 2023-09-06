import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export enum PossibleDay {
    MONDAY = "MON",
    TUESDAY = "TUE",
    WEDNESDAY = "WED",
    THURSDAY = "THU",
    FRIDAY = "FRI",
    SATURDAY = "SAT",
    SUNDAY = "SUN",

}

export enum RuleName {
    QA_DAILY_RULE = "QA Daily Rule",
    QA_WEEKLY_RULE = "QA Weekly Rule",
}

export enum ActivityCodes {
    BREAK = "Break",
    LUNCH = "Lunch",
    MEETING = "Meeting",
    OPEN_DEFAULT = "Open (Default)",
    OVERTIME = "Overtime",
    PAID_TIME_OFF = "Paid Time Off",
    TRAINING = "Training",
    UNPAID_TIME_OFF = "Unpaid Time Off",
}

export enum TimeIncrement {
    ZERO_MINUTES = "0:00",
    FIFTEEN_MINUTES = "0:15",
    THIRTY_MINUTES = "0:30",
    FOURTY_FIVE_MINUTES = "0:45",
    ONE_HOURS = "1:00",
}

export enum ShiftTime {
    TWELVE_AM = "12:00am",
    QUARTER_TWELVE_AM = "12:15am",
    HALFTWELVE_AM = "12:30am",
    QUARTER_TO_ONE_AM = "12:45am",
    ONE_AM = "1:00am",
    QUARTER_ONE_AM = "1:15am",
    HALF_AM = "1:30am",
    QUARTER_TO_TWO_AM = "1:45am",
    TWO_AM = "2:00am",
    QUARTER_TWO_AM = "2:15am",
    HALFTWO_AM = "2:30am",
    QUARTER_TO_THREE_AM = "2:45am",
    THREEE_AM = "3:00am",
    QUARTER_THREEE_AM = "3:15am",
    HALFTHREE_AM = "3:30am",
    QUARTER_TO_FOUR_AM = "3:45am",
    FOUR_AM = "4:00am",
    QUARTER_FOUR_AM = "4:15am",
    HALFFOUR_AM = "4:30am",
    QUARTER_TO_FIVE_AM = "4:45am",
    FIVE_AM = "5:00am",
    QUARTER_FIVE_AM = "5:15am",
    HALFFIVE_AM = "5:30am",
    QUARTER_TO_SIX_AM = "5:45am",
    SIX_AM = "6:00am",
    QUARTER_SIX_AM = "6:15am",
    HALFSIX_AM = "6:30am",
    QUARTER_TO_SEVEN_AM = "6:45am",
    SEVEN_AM = "7:00am",
    QUARTER_SEVEN_AM = "7:15am",
    HALFSEVEN_AM = "7:30am",
    QUARTER_TO_EIGHT_AM = "7:45am",
    EIGHT_AM = "8:00am",
    QUARTER_EIGHT_AM = "8:15am",
    HALFEIGHT_AM = "8:30am",
    QUARTER_TO_NINE_AM = "8:45am",
    NINE_AM = "9:00am",
    QUARTER_NINE_AM = "9:15am",
    HALFNINE_AM = "9:30am",
    QUARTER_TO_TEN_AM = "9:45am",
    TEN_AM = "10:00am",
    QUARTER_TEN_AM = "10:15am",
    HALFTEN_AM = "10:30am",
    QUARTER_TO_ELEVEN_AM = "10:45am",
    ELEVEN_AM = "11:00am",
    QUARTER_ELEVEN_AM = "11:15am",
    HALFELEVEN_AM = "11:30am",
    QUARTER_TO_TWELVE_PM = "11:45am",
    TWELVE_PM = "12:00pm",
    QUARTER_TWELVE_PM = "12:15pm",
    HALFTWELVE_PM = "12:30pm",
    QUARTER_TO_ONE_PM = "12:45pm",
    ONE_PM = "1:00pm",
    QUARTER_ONE_PM = "1:15pm",
    HALF_PM = "1:30pm",
    QUARTER_TO_TWO_PM = "1:45pm",
    TWO_PM = "2:00pm",
    QUARTER_TWO_PM = "2:15pm",
    HALFTWO_PM = "2:30pm",
    QUARTER_TO_THREE_PM = "2:45pm",
    THREEE_PM = "3:00pm",
    QUARTER_THREEE_PM = "3:15pm",
    HALFTHREE_PM = "3:30pm",
    QUARTER_TO_FOUR_PM = "3:45pm",
    FOUR_PM = "4:00pm",
    QUARTER_FOUR_PM = "4:15pm",
    HALFFOUR_PM = "4:30pm",
    QUARTER_TO_FIVE_PM = "4:45pm",
    FIVE_PM = "5:00pm",
    QUARTER_FIVE_PM = "5:15pm",
    HALFFIVE_PM = "5:30pm",
    QUARTER_TO_SIX_PM = "5:45pm",
    SIX_PM = "6:00pm",
    QUARTER_SIX_PM = "6:15pm",
    HALFSIX_PM = "6:30pm",
    QUARTER_TO_SEVEN_PM = "6:45pm",
    SEVEN_PM = "7:00pm",
    QUARTER_SEVEN_PM = "7:15pm",
    HALFSEVEN_PM = "7:30pm",
    QUARTER_TO_EIGHT_PM = "7:45pm",
    EIGHT_PM = "8:00pm",
    QUARTER_EIGHT_PM = "8:15pm",
    HALFEIGHT_PM = "8:30pm",
    QUARTER_TO_NINE_PM = "8:45pm",
    NINE_PM = "9:00pm",
    QUARTER_NINE_PM = "9:15pm",
    HALFNINE_PM = "9:30pm",
    QUARTER_TO_TEN_PM = "9:45pm",
    TEN_PM = "10:00pm",
    QUARTER_TEN_PM = "10:15pm",
    HALFTEN_PM = "10:30pm",
    QUARTER_TO_ELEVEN_PM = "10:45pm",
    ELEVEN_PM = "11:00pm",
    QUARTER_ELEVEN_PM = "11:15pm",
    HALFELEVEN_PM = "11:30pm",
    QUARTER_TO_TWELVE_AM = "11:45pm",
}

export class WFMRule {
    qaDailyRule: string;
    qaWeeklyRule: string;
    earliestStartTime: string;
    latestStartTime: string;
    timeIncrement: string;
    activityCode: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    possibleDays: Array<string>;
    defaultShitLength: string;
    defaultMinPeerWeek: string;
    defaultMaxPeerWeek: string;

    public initData(): WFMRule {
        try {
            this.qaDailyRule = RuleName.QA_DAILY_RULE;
            this.qaWeeklyRule = RuleName.QA_WEEKLY_RULE;
            this.earliestStartTime = ShiftTime.SIX_AM;
            this.latestStartTime = ShiftTime.NINE_AM;
            this.timeIncrement = TimeIncrement.FIFTEEN_MINUTES;
            this.activityCode = ActivityCodes.BREAK;
            this.scheduleStartTime = ShiftTime.NINE_AM;
            this.scheduleEndTime = ShiftTime.SEVEN_PM
            this.possibleDays = [PossibleDay.MONDAY, PossibleDay.TUESDAY, PossibleDay.WEDNESDAY, PossibleDay.THURSDAY, PossibleDay.FRIDAY];
            this.defaultShitLength = "8";
            this.defaultMinPeerWeek = "40";
            this.defaultMaxPeerWeek = "40";
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
