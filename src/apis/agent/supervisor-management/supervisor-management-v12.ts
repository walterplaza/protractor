import { ISupervisorManagement } from "@apis/agent/supervisor-management/supervisor-management";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class SupervisorManagementVersion12 implements ISupervisorManagement {

    
    async givesTheAbilityToMonitorAnAgentOnALiveCall(agent: Agent, targetAgentId: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/monitor`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId.agentID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.givesTheAbilityToMonitorAnAgentOnALiveCall, err.message);
        } 
    }

    
    async givesTheAbilityToCoachAnAgentOnALiveCall(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/coach`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.givesTheAbilityToCoachAnAgentOnALiveCall, err.message);
        }
    }
     
    async givesASupervisorTheAbilityToBargeAnAgentOnALiveCall(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/barge`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.givesASupervisorTheAbilityToBargeAnAgentOnALiveCall, err.message);
        }
    }

    
    async givesTheAbilityToTakeOverAnAgentOnALiveCall(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/take-over`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.givesTheAbilityToTakeOverAnAgentOnALiveCall, err.message);
        }
    }
}