import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { IHistoricalReporting } from "./historical-reporting";

export default class HistoricalReportingVersion12 implements IHistoricalReporting {

    async returnsContactHistoryForAnAgent(agent: Agent, startDate: any = "", endDate: any = "", updatedSince: any = "", mediaTypeId: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/interaction-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("updatedSince", updatedSince);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactHistoryForAnAgent, err.message);
        }
    }

    async returnsInfoOnRecentContacts(agent: Agent, startDate: any = "", endDate: any = "", top: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/interaction-recent`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("top", top);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsInfoOnRecentContacts, err.message);
        }
    }

    async returnsAgentLoginHistory(agent: Agent, startDate: any = "", endDate: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/login-history`, Method.GET);
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

    async returnsStateDurationForAnAgent(agent: Agent, startDate: any = "", endDate: any = "", mediaTypeId: any = "", searchString: any = "", outboundStrategy: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/statehistory`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("searchString", searchString);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsStateDurationForAnAgent, err.message);
        }
    }

    /**
     * Returns a performance summary of all Agents
     * @param {Agent} agent
     * @param {*} startDate
     * @param {*} endDate
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsAPerformanceSummaryOfAllAgents(agent: Agent, startDate: any, endDate: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/performance`, Method.GET);
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

    async returnsAPerformanceSummaryOfAnAgent(agent: Agent, startDate: any, endDate: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/performance`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAPerformanceSummaryOfAnAgent, err.message);
        }
    }

    async returnsContactDetails(agent: Agent, contactId: any = "", fields: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);

        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactDetails, err.message);
        }

    }

    async returnsSmsTranscriptsForADateRangeAndTransportCode(agent: Agent, transportCode: any, startDate: any, endDate: any, skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/sms-transcripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("transportCode", transportCode);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSmsTranscriptsForADateRangeAndTransportCode, err.message);
        }
    }
    async returnsSmsTranscriptsForAContactId(agent: Agent, contactId: any, transportCode: any, startDate: any, endDate: any, skip: any = "", top: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/sms-transcripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("transportCode", transportCode);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("skip", skip);
            options.addParam("top", top);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSmsTranscriptsForAContactId, err.message);
        }
    }

    async returnsCompletedContacts(agent: Agent, startDate: any = "", endDate: any = "", updatedSince: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = "", mediaTypeId: any = "", skillId: any = "", agentId: any = "", campaignId: any = "", teamId: any = "", toAddr: any = "", fromAddr: any = "", isLogged: any = "", isRefused: any = "", isTakeover: any = "", tags: any = "", analyticsProcessed: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/completed`, Method.GET);
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
            options.addParam("analyticsProcessed", analyticsProcessed);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsCompletedContacts, err.message);
        }
    }
    async returnsContactCallQuality(agent: Agent, contactId: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/call-quality`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactCallQuality, err.message);
        }
    }
    async returnsContactStateHistory(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/statehistory`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactStateHistory, err.message);
        }
    }
    async returnsContactCustomData(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/custom-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactCustomData, err.message);
        }
    }

    /**
     * Returns statistics for all Skills
     * @param {Agent} agent
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsStatisticsForAllSkills(agent: Agent, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/summary`, Method.GET);
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
     * Returns SLA summary for all Skills
     * @param {Agent} agent
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsSlaSummaryForAllSkills(agent: Agent, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSlaSummaryForAllSkills, err.message);
        }
    }

    /**
     * Returns SLA summary for a Skill
     * @param {Agent} agent
     * @param {*} skillId
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @param {*} [listVar=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsSlaSummaryForASkill(agent: Agent, skillId: any, startDate: any = "", endDate: any = "", listVar: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("listVar", listVar);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSlaSummaryForASkill, err.message);
        }
    }

    async returnsPerformanceSummaryOfAllTeams(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/performance-total`, Method.GET);
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

    /**
     * Returns performance summary of a Team
     * @param {Agent} agent
     * @param {*} teamId
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsPerformanceSummaryOfATeam(agent: Agent, teamId: any, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/performance-total`, Method.GET);
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

    async returnsAListOfCustomReports(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/reports`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfCustomReports, err.message);
        }
    }

    async returnsAListOfReportingJobs(agent: Agent, fields: any = "", reportId: any = "", jobStatus: any = "", jobSpan: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/report-jobs`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("reportId", reportId);
            options.addParam("jobStatus", jobStatus);
            options.addParam("jobSpan", jobSpan);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfReportingJobs, err.message);
        }
    }

    async returnsAReportingJob(agent: Agent, jobId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/report-jobs/${jobId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAReportingJob, err.message);
        }
    }

    async startACustomReportingJob(agent: Agent, reportId: any, fileType: any = "", includeHeaders: any = "", appendDate: any = "", deleteAfter: any = "", overwrite: any = "", startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/report-jobs/${reportId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileType", fileType);
            options.addParam("includeHeaders", includeHeaders);
            options.addParam("appendDate", appendDate);
            options.addParam("deleteAfter", deleteAfter);
            options.addParam("overwrite", overwrite);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startACustomReportingJob, err.message);
        }
    }

    async generatesALinkToADataDownloadReport(agent: Agent, reportId: any, saveAsFile: any, fileName: any, startDate: any, endDate: any, includeHeaders: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/report-jobs/datadownload/${reportId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("saveAsFile", saveAsFile);
            options.addParam("fileName", fileName);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("includeHeaders", includeHeaders);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.generatesALinkToADataDownloadReport, err.message);
        }
    }

    async returnScorecardStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/ascm`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnScorecardStatistics, err.message);
        }
    }
    async returnAsiMetadata(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/asi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnAsiMetadata, err.message);
        }
    }
    async returnsCsiStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/csi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsCsiStatistics, err.message);
        }
    }
    async returnsFtciAdherenceStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/ftci`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsFtciAdherenceStatistics, err.message);
        }
    }
    async returnsOsiStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/osi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsOsiStatistics, err.message);
        }
    }
    async returnsQualityManagementStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/wfo-data/qm`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsQualityManagementStatistics, err.message);
        }
    }

    /**
     * Returns statistics for a Skill
     * @param {Agent} agent
     * @param {*} [skillId=""]
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion12
     */
    async returnsStatisticsForASkill(agent: Agent, skillId: any = "", startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/summary`, Method.GET);
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