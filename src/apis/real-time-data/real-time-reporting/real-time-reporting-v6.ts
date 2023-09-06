import { IRealTimeReporting } from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class RealTimeReportingVersion6 implements IRealTimeReporting {
    returnsParkedContacts() {
        throw new Error("Method not implemented.");
    }
    returnsTheCurrentStateForAllAgents() {
        throw new Error("Method not implemented.");
    }
    returnsTheCurrentStateForAnAgent() {
        throw new Error("Method not implemented.");
    }
    returnsActiveContactStates() {
        throw new Error("Method not implemented.");
    }
    returnsActivityForAllSkills() {
        throw new Error("Method not implemented.");
    }
    returnsActivityForASkill() {
        throw new Error("Method not implemented.");
    }

    async returnsActiveContacts(agent: Agent, updatedSince: any = "", fields: any = "", mediaTypeId: any = "", skillId: any = "", campaignId: any = "", agentId: any = "", teamId: any = "", toAddr: any = "", fromAddr: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v6.0/contacts/active`, Method.GET);
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

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsActiveContacts, err.message);
        }
    }
}