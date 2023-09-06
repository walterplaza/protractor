import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion1 implements IHistoricalReporting {
    returnsAListOfCustomReports() {
        throw new Error("Method not implemented.");
    }
    returnsContactHistoryForAnAgent() {
        throw new Error("Method not implemented.");
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

/**
 * Returns SLA summary for all Skills
 * @param {Agent} agent
 * @param {*} [startDate=""]
 * @param {*} [endDate=""]
 * @returns {Promise<APIResponse>}
 * @memberof HistoricalReportingVersion1
 */
async returnsSlaSummaryForAllSkills(agent: Agent, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/skills/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSlaSummaryForAllSkills, err.message);
        }
    }

    returnsPerformanceSummaryOfAllTeams() {
        throw new Error("Method not implemented.");
    }

    returnsSlaSummaryForASkill() {
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