import { IAgentPhoneManagement } from "@apis/agent/agent-phone-management/agent-phone-management";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Options, APICore, Method, APIResponse } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";

export default class AgentPhoneManagementVersion2 implements IAgentPhoneManagement {

    async dialAgentPhone(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/agent-phone/dial`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialAgentPhone, err.message);
        }
    }

    async muteAgentPhone(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/agent-phone/mute`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.muteAgentPhone, err.message);
        }
    }

    async unmuteAgentLeg(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/agent-phone/unmute`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.unmuteAgentLeg, err.message);
        }
    }

    async endsTheAgentsPhoneCall(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/agent-phone/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endsTheAgentsPhoneCall, err.message);
        }
    }
}
