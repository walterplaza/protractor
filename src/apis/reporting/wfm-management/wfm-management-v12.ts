import { IWFMManagement } from "@apis/reporting/wfm-management/wfm-management";
import { APICore, Method, Options, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Agent } from "@data-objects/general/agent";

export default class WfmManagementVersion12 implements IWFMManagement {
    async returnsContactStatisticsForWfm(agent: Agent, startDate: any = "", endDate: any = "", fields: any = "", mediaTypeId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/skills/contacts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactStatisticsForWfm, err.message);
        }
    }

    async returnsAgentMetadata(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAgentMetadata, err.message);
        }
    }

    async returnsDailerContactStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = "", mediaTypeId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/skills/dialer-contacts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsDailerContactStatistics, err.message);
        }
    }

    async returnsAdherenceStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/agents/schedule-adherence`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAdherenceStatistics, err.message);
        }
    }

    async returnsScorecardStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/agents/schedule-adherence`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsScorecardStatistics, err.message);
        }
    }

    async returnsAgentPerformance(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfm-data/agents/schedule-adherence`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAgentPerformance, err.message);
        }
    }


}