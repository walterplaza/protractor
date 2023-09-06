import { IRealTimeReporting } from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class RealTimeReportingVersion1 implements IRealTimeReporting {

    returnsActiveContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, toAddr?: any, fromAddr?: any, stateId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsParkedContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, toAddr?: any, fromAddr?: any) {
        throw new Error("Method not implemented.");
    }

    async returnsTheCurrentStateForAllAgents(agent: Agent) {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheCurrentStateForAllAgents, err.message);
        }
    }

    async returnsActiveContactStates(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/contacts/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActiveContactStates, err.message);
        }
    }
    returnsTheCurrentStateForAnAgent() {
        throw new Error("Method not implemented.");
    }

    returnsActivityForAllSkills(agent: Agent): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    returnsActivityForASkill(agent: Agent, skillId: any) {
        throw new Error("Method not implemented.");
    }
}