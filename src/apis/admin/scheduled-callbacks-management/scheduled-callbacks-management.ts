import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import ScheduledCallbacksManagementVersion12 from "./scheduled-callbacks-management-v12";

export interface IScheduledCallbacksManagement {
    returnsScheduledCallbacksForAnAgent(agent: Agent);
    createsAScheduledCallback(agent: Agent, firstName?: any, lastName?: any, phoneNumber?: any, skillId?: any, targetAgentId?: any, scheduleDate?: any, notes?: any);
    deletesAScheduledCallback(agent: Agent, callbackId?: any, description?: any);
    updatesAScheduledCallback(agent: Agent, callbackId?: any, firstName?: any, lastName?: any, phoneNumber?: any, skillId?: any, targetAgentId?: any, scheduleDate?: any, notes?: any);
    returnsScheduledCallbacksForASkill(agent: Agent, skillID?: any);
}

export default class ScheduledCallbacksManagementInstance {

    static getScheduledCallbacksManagementInstance(): IScheduledCallbacksManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new ScheduledCallbacksManagementVersion12();
        }
    }
}