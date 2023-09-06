import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion7 implements IHistoricalReporting {

    returnsContactHistoryForAnAgent() {
        throw new Error("Method not implemented.");
    }

    returnsInfoOnRecentContacts() {
        throw new Error("Method not implemented.");
    }

    async returnsAgentLoginHistory(agent: Agent, startDate: any = "", endDate: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/agents/${agent.agentID}/login-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAgentLoginHistory, err.message);
        }
    }

    returnsStateDurationForAnAgent() {
        throw new Error("Method not implemented.");
    }

    returnsAPerformanceSummaryOfAllAgents() {
        throw new Error("Method not implemented.");
    }

    returnsAPerformanceSummaryOfAnAgent() {
        throw new Error("Method not implemented.");
    }

    returnsContactDetails() {
        throw new Error("Method not implemented.");
    }

    returnsSmsTranscriptsForADateRangeAndTransportCode() {
        throw new Error("Method not implemented.");
    }

    returnsSmsTranscriptsForAContactId() {
        throw new Error("Method not implemented.");
    }

    async returnsCompletedContacts(agent: Agent, startDate: any = "", endDate: any = "", updatedSince: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = "", mediaTypeId: any = "", skillId: any = "", agentId: any = "", campaignId: any = "", teamId: any = "", toAddr: any = "", fromAddr: any = "", isLogged: any = "", isRefused: any = "", isTakeover: any = "", tags: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/contacts/completed`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentId", agentId);
            options.addParam("teamId", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            options.addParam("isLogged", isLogged);
            options.addParam("isRefused", isRefused);
            options.addParam("isTakeover", isTakeover);
            options.addParam("tags", tags);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsCompletedContacts, err.message);
        }
    }

    returnsContactCallQuality() {
        throw new Error("Method not implemented.");
    }

    returnsContactStateHistory() {
        throw new Error("Method not implemented.");
    }

    returnsContactCustomData() {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns statistics for all Skills
     * @param {Agent} agent
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @param {*} [mediaTypeId=""]
     * @param {*} [isOutbound=""]
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion7
     */
    async returnsStatisticsForAllSkills(agent: Agent, startDate: any = "", endDate: any = "", mediaTypeId: any = "", isOutbound: any = "", fields: any = ""): Promise<APIResponse> {

        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsStatisticsForAllSkills, err.message);
        }
    }

    returnsSlaSummaryForAllSkills() {
        throw new Error("Method not implemented.");
    }

    returnsSlaSummaryForASkill() {
        throw new Error("Method not implemented.");
    }

    returnsPerformanceSummaryOfAllTeams() {
        throw new Error("Method not implemented.");
    }


    returnsPerformanceSummaryOfATeam() {
        throw new Error("Method not implemented.");
    }

    returnsAListOfCustomReports() {
        throw new Error("Method not implemented.");
    }

    returnsAListOfReportingJobs() {
        throw new Error("Method not implemented.");
    }

    returnsAReportingJob() {
        throw new Error("Method not implemented.");
    }

    startACustomReportingJob() {
        throw new Error("Method not implemented.");
    }

    generatesALinkToADataDownloadReport() {
        throw new Error("Method not implemented.");
    }

    returnScorecardStatistics() {
        throw new Error("Method not implemented.");
    }
    returnAsiMetadata() {
        throw new Error("Method not implemented.");
    }
    returnsCsiStatistics() {
        throw new Error("Method not implemented.");
    }
    returnsFtciAdherenceStatistics() {
        throw new Error("Method not implemented.");
    }
    returnsOsiStatistics() {
        throw new Error("Method not implemented.");
    }
    returnsQualityManagementStatistics() {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns statistics for a Skill
     * @param {Agent} agent
     * @param {*} skillId
     * @param {*} startDate
     * @param {*} endDate
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion7
     */
    async returnsStatisticsForASkill(agent: Agent, skillId: any, startDate: any, endDate: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/${skillId}/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skillId", skillId);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsStatisticsForASkill, err.message);
        }
    }
}