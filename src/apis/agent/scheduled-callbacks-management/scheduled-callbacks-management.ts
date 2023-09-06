import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import AgentScheduledCallbacksManagementVersion12 from "@apis/agent/scheduled-callbacks-management/scheduled-callbacks-management-v12";

export interface IAgentScheduledCallbacksManagement {
      
    dialAScheduledCallback(agent: Agent, callbackId: any);
    reScheduleAScheduledCallback(agent: Agent, callbackId: any, rescheduleDate: any);
    cancelsAPresentedScheduledCallback(agent: Agent, callbackId: any, notes?: any) ;
    
}
export default class AgentScheduledCallbacksManagementInstance {

    static getAgentScheduledCallbacksManagementInstance(): IAgentScheduledCallbacksManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new AgentScheduledCallbacksManagementVersion12();
        }
    }
}