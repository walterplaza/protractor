import SupervisorManagementVersion12 from "@apis/agent/supervisor-management/supervisor-management-v12";
import SupervisorManagementVersion2 from "@apis/agent/supervisor-management/supervisor-management-v2";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface ISupervisorManagement {
    givesTheAbilityToMonitorAnAgentOnALiveCall(agent: Agent, agent2: Agent);
    givesTheAbilityToCoachAnAgentOnALiveCall(agent: Agent);
    givesASupervisorTheAbilityToBargeAnAgentOnALiveCall(agent: Agent);
    givesTheAbilityToTakeOverAnAgentOnALiveCall(agent: Agent);
}

export default class SupervisorManagementInstance {

    static getAgentSessionManagementInstance(): ISupervisorManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new SupervisorManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new SupervisorManagementVersion2();
        }
    }
}