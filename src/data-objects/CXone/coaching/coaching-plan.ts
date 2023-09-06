import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import moment = require("moment");
import { Utility } from "@utilities/general/utility";

export enum coachingPlanState {
    ACTIVE = "Active", 
    EXPIRED = "Expired"
}

export enum successfulMessage {
    SUBMIT_SUCCESS = "Plan has been submitted successfully",
    DELETE_SUCCESS = "Plan(s) deleted successfully."
}

export class CoachingPlan {
    name: string;
    coachingPackage: string;
    startDate: string;
    endDate: string;

    public initData(packageName?: string): CoachingPlan {
        try {
            this.name = `LGVN Test_${Utility.createRandomString(7)}`;
            if (packageName == null) {
                this.coachingPackage = "coaching package";
            } else {
                this.coachingPackage = packageName;
            }
            let date: Date = new Date();
            this.startDate = moment(date).format("MMM-DD-YYYY");
            this.endDate = this.startDate;
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}