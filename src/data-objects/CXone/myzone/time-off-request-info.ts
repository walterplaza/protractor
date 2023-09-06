import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export enum ActivityCode {
    PAIDTIMEOFF = "Paid Time Off",
    UNPAIDTIMEOFF = "Unpaid Time Off",
}

export class TimeOffRequest {
    activityCode: string;

    public initData(activityCode: ActivityCode, startDate?: string, endDate?: string, comment?: string): TimeOffRequest {
        try {
            this.activityCode = activityCode;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}