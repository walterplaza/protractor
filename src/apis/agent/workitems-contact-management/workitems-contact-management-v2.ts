import { IWorkItemsContactManagement } from "@apis/agent/workitems-contact-management/workitems-contact-management";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Agent } from "@data-objects/general/agent";

export default class WorkItemsContactManagementVersion2 implements IWorkItemsContactManagement {

    async holdAWorkItem(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/hold`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.holdAWorkItem, err.message);
        }
    }

    async  resumeAWorkItem(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/resume`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.resumeAWorkItem, err.message);
        }
    }
    async endAWorkItem(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endAWorkItem, err.message);
        }
    }
    async acceptAWorkItem(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptAWorkItem, err.message);
        }
    }
    async rejectAWorkItem(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/reject`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.rejectAWorkItem, err.message);
        }
    }
}