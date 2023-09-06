import { Agent } from "@data-objects/general/agent";
import AgentPhoneManagementVersion12 from "@apis/agent/agent-phone-management/agent-phone-management-v12";
import AgentPhoneManagementVersion2 from "@apis/agent/agent-phone-management/agent-phone-management-v2";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";

export interface IAgentPhoneManagement {
    dialAgentPhone(agent: Agent)
    muteAgentPhone(agent: Agent)
    unmuteAgentLeg(agent: Agent)
    endsTheAgentsPhoneCall(agent: Agent)
}

export default class AgentPhoneManagementInstance {

    static getAgentPhoneManagementInstance(): IAgentPhoneManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new AgentPhoneManagementVersion12();
        }else if(TestRunInfo.versionAPI == APIVersion.V2){
            return new AgentPhoneManagementVersion2();
        }
    }
}