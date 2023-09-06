import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion4 implements IHistoricalReporting {
    returnsAListOfCustomReports(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    async returnsContactHistoryForAnAgent(agent: Agent, startDate: any = "", endDate: any = "", updatedSince: any = "", mediaTypeId: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agents/${agent.agentID}/interaction-history`, Method.GET);
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

    returnsSlaSummaryForASkill(){
        throw new Error("Method not implemented.");
    }

    returnsPerformanceSummaryOfATeam() {
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

    returnsStatisticsForASkill() {
        throw new Error("Method not implemented.");
    }
}