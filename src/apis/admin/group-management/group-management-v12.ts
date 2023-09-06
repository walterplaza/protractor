import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { IGroupManagement } from "./group-management";
export default class GroupManagementVersion12 implements IGroupManagement {

    async getGroups(agent: Agent, top: any = "", skip: any = "", orderBy: any = "", searchString: any = "", isActive: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderBy", orderBy);
            options.addParam("searchString", searchString);
            options.addParam("isActive", isActive);
            options.addParam("field", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getGroups, err.message);
        }
    }
    async createGroups(agent: Agent, groupName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let groups: string = `{"groups":[{"groupName":"${groupName}","isActive":true,"notes":""}]}`;
            return await APICore.requestJson(options, groups);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createGroups, err.message);
        }
    }
    async returnsAGroupConfig(agent: Agent, groupId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups/${groupId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("field", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAGroupConfig, err.message);
        }
    }

    async modifiesAGroup(agent: Agent, groupId: any, groupName: any, isActive: any = "true", notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups/${groupId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"groupName":"${groupName}","isActive":${isActive},"notes":"${notes}"}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.modifiesAGroup, err.message);
        }
    }

    async removesAgentsFromAGroup(agent: Agent, groupId: any, removedAgentId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups/${groupId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"agents":[{"agentId":${removedAgentId}}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesAgentsFromAGroup, err.message);
        }
    }
    
    async assignsAgentsToAGroup(agent: Agent, groupId: any, assignedAgentId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups/${groupId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"agents":[{"agentId":${assignedAgentId}}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsAgentsToAGroup, err.message);
        }
    }
    async returnsAListOfAgentsAssignedToAGroup(agent: Agent, groupId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/groups/${groupId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("field", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfAgentsAssignedToAGroup, err.message);
        }
    }
}