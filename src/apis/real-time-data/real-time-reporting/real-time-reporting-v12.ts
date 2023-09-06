import { IRealTimeReporting } from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { Method, Options, APICore, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class RealTimeReportingVersion12 implements IRealTimeReporting {
    async returnsTheCurrentStateForAllAgents(agent: Agent, updatedSince: any = "", fields: any = "", reqBUIds: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("reqBUIds", reqBUIds);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheCurrentStateForAllAgents, err.message);
        }
    }
    async returnsTheCurrentStateForAnAgent(agent: Agent, updatedSince: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheCurrentStateForAnAgent, err.message);
        }
    }
    async returnsActiveContacts(agent: Agent, stateId: any = "", updatedSince: any = "", fields: any = "", mediaTypeId: any = "", skillId: any = "", campaignId: any = "",  toAddr: any = "", fromAddr: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/active`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("stateId", stateId);
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentID", agent.agentID);
            options.addParam("teamID", agent.teamID);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            options.addParam("fromAddr", fromAddr);           
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActiveContacts, err.message);
        }
    }
        
    async returnsParkedContacts(agent: Agent, updatedSince: any = "", fields: any = "", mediaTypeId: any = "", skillId: any = "", campaignId: any = "", agentId: string = "",teamId: string= "",  toAddr: any = "", fromAddr: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/parked`, Method.GET);
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

    async returnsActiveContactStates(agent: Agent, updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActiveContactStates, err.message);
        }
    }

    async returnsActivityForAllSkills(agent: Agent, fields: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActivityForAllSkills, err.message);
        }
    }

    async returnsActivityForASkill(agent: Agent, skillId: any, updatedSince: any = "", fields: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/activity`, Method.GET);
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