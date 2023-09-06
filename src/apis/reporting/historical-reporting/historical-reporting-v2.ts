import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion2 implements IHistoricalReporting {
    returnsAListOfCustomReports(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    async returnsContactHistoryForAnAgent(agent: Agent, startDate: any, endDate: any, mediaTypeName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agents/${agent.agentID}/interaction-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeName", mediaTypeName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContactHistoryForAnAgent, err.message);
        }
    }
    returnsInfoOnRecentContacts() {
        throw new Error("Method not implemented.");
    }

    returnsAgentLoginHistory() {
        throw new Error("Method not implemented.");
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

    returnsCompletedContacts() {
        throw new Error("Method not implemented.");
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

    returnsStatisticsForAllSkills() {
        throw new Error("Method not implemented.");
    }

    returnsSlaSummaryForAllSkills() {
        throw new Error("Method not implemented.");
    }

    returnsPerformanceSummaryOfAllTeams() {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns SLA summary for a Skill
     * @param {Agent} agent
     * @param {*} skillId
     * @param {*} [startDate=""]
     * @param {*} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof HistoricalReportingVersion2
     */
    async returnsSlaSummaryForASkill(agent: Agent, skillId: any, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/skills/${skillId}/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSlaSummaryForASkill, err.message);
        }
    }

    /**
     * Returns performance summary of a Team
     * @param {Agent} agent
     * @param {*} teamId
     * @param {*} [startDate]
     * @param {*} [endDate]
     * @param {*} [fields]
     * @returns
     * @memberof HistoricalReportingVersion2
     */
    async returnsPerformanceSummaryOfATeam(agent: Agent, teamId: any, startDate?: any, endDate?: any, fields?: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/teams/${teamId}/performance-total`, Method.GET);
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

    returnsStatisticsForASkill() {
        throw new Error("Method not implemented.");
    }
}