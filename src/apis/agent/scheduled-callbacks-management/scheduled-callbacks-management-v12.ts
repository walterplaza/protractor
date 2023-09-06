import { IAgentScheduledCallbacksManagement } from "@apis/agent/scheduled-callbacks-management/scheduled-callbacks-management";
import { APIResponse, APICore, Options, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class AgentScheduledCallbacksManagementVersion12 implements IAgentScheduledCallbacksManagement {

    async dialAScheduledCallback(agent: Agent, callbackId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${callbackId}/dial`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("callbackId", callbackId)
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialAScheduledCallback, err.message);
        }
    }

    async reScheduleAScheduledCallback(agent: Agent, callbackId: any, rescheduleDate: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${callbackId}/reschedule`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("callbackId", callbackId);
            options.addBody("rescheduleDate", rescheduleDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.reScheduleAScheduledCallback, err.message);
        }
    }
    async cancelsAPresentedScheduledCallback(agent: Agent, callbackId: any, notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${callbackId}/cancel`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("callbackId", callbackId);
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.cancelsAPresentedScheduledCallback, err.message);
        }
    }
}