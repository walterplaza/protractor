import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Agent } from "@data-objects/general/agent";


export class ScheduleCommitment {
    agentOBPhone: Agent;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    scheduleFor: string;
    commitmentSkill: string;
    commitmentDate: string;
    commitmentHour: string;
    commitmentMinutes: string;
    commitmentMeridian: string;
    timeZone: string;
    note: string;

    public initData(firstName: string = "the", lastName: string = "tester", phoneNumber: string, scheduleFor: string = 'Me', commitmentSkill: string = 'MAX_OBPhone', commitmentDate: number = 0, commitmentHour: string = "", commitmentMinutes: string = "", commitmentMeridian: string = "", timeZone: string = "", note: string = ""): ScheduleCommitment {
        try {
            this.phoneNumber = phoneNumber;
            this.scheduleFor = scheduleFor;
            this.commitmentSkill = commitmentSkill;
            this.commitmentDate = Utility.getNowDate("/", commitmentDate);;
            this.firstName = firstName;
            this.lastName = lastName;
            this.commitmentHour = commitmentHour;
            this.commitmentMinutes = commitmentMinutes;
            this.commitmentMeridian = commitmentMeridian;
            this.timeZone = timeZone;
            this.note = note;

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.initData, err.message);
        }
    }
}