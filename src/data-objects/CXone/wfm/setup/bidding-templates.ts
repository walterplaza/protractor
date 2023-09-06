import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";


export enum WeekDay {
    MONDAY = "MON",
    TUESDAY = "TUE",
    WEDNESDAY = "WED",
    THURSDAY = "THU",
    FRIDAY = "FRI",
    SATURDAY = "SAT",
    SUNDAY = "SUN"
}

export enum ShiftType {
    INBOUND = "IB",
    OUTBOUND = "OB",
    DEFAULT = "Open (Default)"
}

export enum shiftLength {
    ONE = "1",
    ONE_HALF = "1.5",
    TWO = "2",
    TWO_HALF = "2.5",
    THREE = "3",
    THREE_HALF = "3.5",
    FOUR = "4",
    FOUR_HALF = "4.5",
    FIVE = "5",
    FIVE_HALF = "6.5",
    SIX = "6",
    SIX_HALF = "6.5",
    SEVEN = "7",
    SEVEN_HALF = "7.5",
    EIGHT = "8",
    EIGHT_HALF = "8.5",
    NINE = "9",
    NINE_HALF = "9.5",
    TEN = "10",
    TEN_HALF = "10.5",
    ELEVEN = "11",
    ELEVEN_HALF = "11.5",
    TWELVE = "12",
    TWELVE_HALF = "12.5",
    THIRTEEN = "13",
    THIRTEEN_HALF = "13.5",
    FOURTEEN = "14",
    FOURTEEN_HALF = "14.5",
    FIFTEEN = "15",
    FIFTEEN_HALF = "15.5",
    SIXTEEN = "16",
    SIXTEEN_HALF = "16.5",
    SEVENTEEN = "17",
    SEVENTEEN_HALF = "17.5",
    EIGHTEEN = "18",
    EIGHTEEN_HALF = "18.5",
    NINETEEN = "19",
    NINETEEN_HALF = "19.5",
    TWENTY = "20",
    TWENTY_HALF = "20.5",
    TWENTY_ONE = "21",
    TWENTY_ONE_HALF = "21.5",
    TWENTY_TWO = "22",
    TWENTY_TWO_HALF = "22.5",
    TWENTY_THREE = "23",
    TWENTY_THREE_HALF = "23.5",
    TWENTY_FOUR = "24",

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

export class BiddingTemplate {

    templateTitle: string;
    shiftLength: shiftLength;
    shiftStartTime: ShiftTime;
    shiftEndTime: ShiftTime;
    shiftType: ShiftType;
    weekDays: WeekDay[];

    public initData(templateName?: string): BiddingTemplate {
        try {
            if (templateName == null) {
                this.templateTitle = "LGVN_Test" + Utility.createRandomString(10);
            } else {
                this.templateTitle = templateName + Utility.createRandomString(10);
            }
            this.shiftLength = shiftLength.EIGHT;
            this.shiftStartTime = ShiftTime.NINE_AM;
            this.shiftEndTime = ShiftTime.NINE_PM;
            this.shiftType = ShiftType.DEFAULT;
            this.weekDays = [WeekDay.MONDAY, WeekDay.TUESDAY, WeekDay.WEDNESDAY, WeekDay.THURSDAY, WeekDay.FRIDAY];
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}