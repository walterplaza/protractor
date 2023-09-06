import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Utility } from "@utilities/general/utility";

export enum DragElement {
    INTERACTIONS = "interactions",
    ATTACHMENT = "attachment",
    SECTION = "section",
    HYPERLINK = "hyperlink",
    LABEL = "label"
}

export enum SaveOption {
    SAVE = "save",
    SAVE_AND_ACTIVATE = "saveAndActivate"
}

export enum SuccessfulMessage {
    ADD_SUCCESS = "Coaching package added successfully.",
    DUPLICATE_SUCCESS = "Coaching package duplicated successfully.",
    ACTIVATE_SUCCESS = "Coaching package(s) activated successfully.",
    DEACTIVATE_SUCCESS = "Coaching package(s) deactivated successfully.",
    DELETE_SUCCESS = "Coaching package(s) deleted successfully."
}

export enum coachingPackageState {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}

export enum Duration {
    ZERO_QUARTERS = "0:15",
    ZERO_HALF = "0:30",
    ZERO_THREE_QUARTERS = "0:45",
    ONE = "1:00",
    ONE_QUATERS = "1:15",
    ONE_HALF = "1:",
    ONE_THREE_QUARTERS = "1:",
    TWO = "2:00",
    TWO_QUARTERS = "2:15",
    TWO_HALF = "2:",
    TWO_THREE_QUARTERS = "2:",
    THREE = "3:00",
    THREE_QUARTERS = "3:15",
    THREE_HALF = "3:",
    THREE_THREE_QUARTERS = "3:",
    FOUR = "4:00",
    FOUR_QUARTERS = "4:15",
    FOUR_HALF = "4:",
    FOUR_THREE_QUARTERS = "4:",
    FIVE = "5:00",
    FIVE_QUARTERS = "5:15",
    FIVE_HALF = "5:",
    FIVE_THREE_QUARTERS = "5:",
    SIX = "6:00",
    SIX_QUARTERS = "6:15",
    SIX_HALF = "",
    SIX_THREE_QUARTERS = "6:",
    SEVEN = "7:00",
    SEVEN_QUARTERS = "7:15",
    SEVEN_HALF = "7:",
    SEVEN_THREE_QUARTERS = "7:",
    EIGHT = "8:00",
    EIGHT_QUARTERS = "8:15",
    EIGHT_HALF = "8:",
    EIGHT_THREE_QUARTERS = "8:",
    NINE = "9:00",
    NINE_QUARTERS = "9:15",
    NINE_HALF = "9:",
    NINE_THREE_QUARTERS = "9:",
    TEN = "10:00",
    TEN_QUARTERS = "10:15",
    TEN_HALF = "10:",
    TEN_THREE_QUARTERS = "10:",
    ELEVEN = "11:00",
    ELEVEN_QUARTERS = "11:15",
    ELEVEN_HALF = "11:",
    ELEVEN_THREE_QUARTERS = "11:",
    TWELVE = "12:00",
    TWELVE_QUARTERS = "12:15",
    TWELVE_HALF = "12:",
    TWELVE_THREE_QUARTERS = "12:",
}

export class CoachingPackage {
    name: string;
    subTitle: string;
    duration: Duration;
    elements: DragElement[];

    public initData(packageName?: string): CoachingPackage {
        try {
            if (packageName == null) {
                this.name = "QATest_" + Utility.createRandomString(10);
            } else {
                this.name = packageName + Utility.createRandomString(10);
            }
            this.subTitle = "Test_" + Utility.createRandomString(10);
            this.duration = Duration.EIGHT;
            this.elements = [DragElement.ATTACHMENT, DragElement.INTERACTIONS];
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}
