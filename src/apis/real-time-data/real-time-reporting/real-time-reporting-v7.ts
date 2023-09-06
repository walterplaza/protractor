import { IRealTimeReporting } from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class RealTimeReportingVersion7 implements IRealTimeReporting {
    async returnsActiveContacts(agent: Agent, updatedSince: any = "", fields: any = "", mediaTypeId: any = "", skillId: any = "", campaignId: any = "", agentId: any = "", teamId: any = "", toAddr: any = "", fromAddr: any = "", stateId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/contacts/active`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentID", agentId);
            options.addParam("teamID", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            options.addParam("stateId", stateId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActiveContacts, err.message);
        }
    }
   
    async returnsParkedContacts(agent: Agent, updatedSince: any = "", fields: any = "", mediaTypeId: any = "", skillId: any = "", campaignId: any = "", agentId: string = "",teamId: string= "",  toAddr: any = "", fromAddr: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/contacts/parked`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentId", agentId);
            options.addParam("teamID", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsParkedContacts, err.message);
        }
    }    

    returnsActiveContactStates(agent: Agent, updatedSince?: any) {
        throw new Error("Method not implemented.");
    }
    returnsTheCurrentStateForAllAgents(agent: Agent, updatedSince: any = ""): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    returnsTheCurrentStateForAnAgent(agent: Agent, updatedSince: any = ""): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    async returnsActivityForAllSkills(agent: Agent, mediaTypeId: any = "", isOutbound: any = "", fields: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActivityForAllSkills, err.message);
        }
    }

    async returnsActivityForASkill(agent: Agent, skillId: any, updatedSince: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/${skillId}/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActivityForASkill, err.message);
        }
    }
}