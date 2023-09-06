import AgentSessionManagementVersion12 from "@apis/agent/agent-session-management/agent-session-management-v12";
import AgentSessionManagementVersion2 from "@apis/agent/agent-session-management/agent-session-management-v2";
import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";

export interface IAgentSessionManagement {
    startsAnAgentSession(agent: Agent, stationPhoneNumber: string, stationId?: any, inactivityTimeout?: any, inactivityForceLogout?: any, apiApplicationContext?: any);
    joinsAnExistingAgentSession(agent: Agent);
    endingAnAgentSession(agent: Agent, forceLogoff?: any, endContacts?: any, ignorePersonalQueue?: any);
    getsTheNextAgentEventDescription(agent: Agent, timeout?: any);
    continueOrCancelAReskillCallDuringClosedHours(agent: Agent, continueReskill?: any);
    dispositionsAContact(agent: Agent, contactId: any, primaryDispositionId: any, primaryDispositionNotes?: any, primaryCallbackTime?: string, primaryCallbackNumber?: any, secondaryDispositionId?: any, primaryCommitmentAmount?: any, previewDispositionId?: any);
    setAgentStatus(agent: Agent, state: any, reason?: any);
    postAFeedback(agent: Agent, categoryId?: any, priority?: any, comment?: any, customData?: any, contactId?: any);
    postCustomDataToAContact(agent: Agent, contactId?: any, indicatorName?: any, data?: any);
    addsAMediaTypeToRoute(agent: Agent, chat?: any, email?: any, workItem?: any);
    movesAnEmailIntoFocus(agent: Agent, contactId: any);
}

export default class AgentSessionManagementInstance {
    
    static getAgentSessionManagementInstance(): IAgentSessionManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new AgentSessionManagementVersion12();
        }else if(TestRunInfo.versionAPI == APIVersion.V2){
            return new AgentSessionManagementVersion2();
        }
    }
}