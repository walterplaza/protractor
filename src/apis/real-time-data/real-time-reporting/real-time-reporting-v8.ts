import { IRealTimeReporting } from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class RealTimeReportingVersion8 implements IRealTimeReporting {

    returnsActiveContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, toAddr?: any, fromAddr?: any, stateId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsParkedContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, toAddr?: any, fromAddr?: any) {
        throw new Error("Method not implemented.");
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
            let options = new Options(`${agent.baseUri}services/v8.0/skills/activity`, Method.GET);
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
            let options = new Options(`${agent.baseUri}services/v8.0/skills/${skillId}/activity`, Method.GET);
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