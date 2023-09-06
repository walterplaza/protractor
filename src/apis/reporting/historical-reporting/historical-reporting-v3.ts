import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion3 implements IHistoricalReporting {
    returnsAListOfCustomReports(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsContactHistoryForAnAgent(agent: Agent, startDate?: any, endDate?: any, updatedSince?: any, mediaTypeId?: any, fields?: any, skip?: any, top?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    returnsInfoOnRecentContacts(agent: Agent, startDate: any, endDate: any, top?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAgentLoginHistory(agent: Agent, startDate: any, endDate: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    returnsStateDurationForAnAgent(agent: Agent, startDate: any, endDate: any, mediaTypeId?: any, searchString?: any, outboundStrategy?: any, fields?: any, skip?: any, top?: any, orderBy?: any, updatedSince?: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns a performance summary of all Agents
     * @param {Agent} agent
     * @param {*} startDate
     * @param {*} endDate
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion3
     */
    async returnsAPerformanceSummaryOfAllAgents(agent: Agent, startDate: any, endDate: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/agents/performance`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAPerformanceSummaryOfAllAgents, err.message);
        }
    }

    returnsAPerformanceSummaryOfAnAgent(agent: Agent, startDate: any, endDate: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsContactDetails(agent: Agent, contactId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSmsTranscriptsForAContactId(agent: Agent, contactId: any, transportCode: any, startDate: any, endDate: any, skip?: any, top?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSmsTranscriptsForADateRangeAndTransportCode(agent: Agent, transportCode: any, startDate: any, endDate: any, skip?: any, top?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    returnsCompletedContacts(agent: Agent, startDate: any, endDate: any, updatedSince?: any, fields?: any, skip?: any, top?: any, orderby?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, teamId?: any, toAddr?: any, isLogged?: any, isRefused?: any, isTakeover?: any, tags?: any, analyticsProcessed?: any) {
        throw new Error("Method not implemented.");
    }
    returnsContactCallQuality(agent: Agent, contactId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsContactStateHistory(agent: Agent, contactId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsContactCustomData(agent: Agent, contactId?: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns statistics for all Skills
     * @param {Agent} agent
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion3
     */
    async returnsStatisticsForAllSkills(agent: Agent, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/skills/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsStatisticsForAllSkills, err.message);
        }
    }

    /**
     * Returns statistics for a Skill
     * @param {Agent} agent
     * @param {*} skillId
     * @param {*} startDate
     * @param {*} endDate
     * @param {*} [fields]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion3
     */
    async returnsStatisticsForASkill(agent: Agent, skillId: any, startDate: any, endDate: any, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/skills/${skillId}/summary`, Method.GET);
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

    returnsSlaSummaryForAllSkills(agent: Agent, startDate?: any, endDate?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSlaSummaryForASkill(agent: Agent, startDate: any, endDate: any, skillId: any, listVar?: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns performance summary of a Team
     * @param {Agent} agent
     * @param {*} teamId
     * @param {*} [startDate]
     * @param {*} [endDate]
     * @param {*} [fields]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion3
     */
    async returnsPerformanceSummaryOfATeam(agent: Agent, teamId: any, startDate?: any, endDate?: any, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/teams/${teamId}/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsPerformanceSummaryOfATeam, err.message);
        }
    }

    returnsAListOfReportingJobs(agent: Agent, fields?: any, reportId?: any, jobStatus?: any, jobSpan?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAReportingJob(agent: Agent, jobId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    startACustomReportingJob() {
        throw new Error("Method not implemented.");
    }
    generatesALinkToADataDownloadReport(agent: Agent, reportId: any, saveAsFile: any, fileName: any, startDate: any, endDate: any, includeHeaders: any) {
        throw new Error("Method not implemented.");
    }
    returnScorecardStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnAsiMetadata(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsCsiStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsFtciAdherenceStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsOsiStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsQualityManagementStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    async returnsPerformanceSummaryOfAllTeams(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/teams/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsPerformanceSummaryOfAllTeams, err.message);
        }
    }
}