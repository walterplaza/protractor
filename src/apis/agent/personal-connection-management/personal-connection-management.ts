import PersonalConnectionManagementVersion12 from "@apis/agent/personal-connection-management/personal-connection-management-v12";
import PersonalConnectionManagementVersion2 from "@apis/agent/personal-connection-management/personal-connection-management-v2";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IPersonalConnectionManagement {
    logIntoADialerCampaign(agent: Agent, skillName: any);
    logOutOfADialerCampaign(agent: Agent);
    snoozeAPreviewContact()
}

export default class PersonalConnectionManagementInstance {
    static getPersonalConnectionManagementInstance(): IPersonalConnectionManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new PersonalConnectionManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new PersonalConnectionManagementVersion2();
        }
    }
}