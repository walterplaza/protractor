import { IHistoricalReporting } from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class HistoricalReportingVersion5 implements IHistoricalReporting {
    returnsAListOfCustomReports(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    async returnsContactHistoryForAnAgent(agent: Agent, startDate: any = "", endDate: any = "", updatedSince: any = "", mediaTypeId: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v5.0/agents/${agent.agentID}/interaction-history`, Method.GET);
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
    returnsInfoOnRecentContacts(agent: Agent, startDate: any, endDate: any, top?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAgentLoginHistory(agent: Agent, startDate: any, endDate: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    returnsStateDurationForAnAgent(agent: Agent, startDate: any, endDate: any, mediaTypeId?: any, searchString?: any, outboundStrategy?: any, fields?: any, skip?: any, top?: any, orderBy?: any, updatedSince?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAPerformanceSummaryOfAllAgents(agent: Agent, startDate: any, endDate: any, fields?: any) {
        throw new Error("Method not implemented.");
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
    returnsStatisticsForAllSkills(agent: Agent, startDate?: any, endDate?: any, mediaTypeId?: any, isOutbound?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsStatisticsForASkill(agent: Agent, skillId: any, startDate: any, endDate: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSlaSummaryForAllSkills(agent: Agent, startDate?: any, endDate?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSlaSummaryForASkill(agent: Agent, startDate: any, endDate: any, skillId: any, listVar?: any) {
        throw new Error("Method not implemented.");
    }
    returnsPerformanceSummaryOfAllTeams(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsPerformanceSummaryOfATeam(agent: Agent, teamId: any, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
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

    async returnScorecardStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v5.0/wfo-data/ascm`, Method.GET);
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
            let options = new Options(`${agent.baseUri}services/v5.0/wfo-data/asi`, Method.GET);
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
            let options = new Options(`${agent.baseUri}services/v5.0/wfo-data/csi`, Method.GET);
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

    returnsFtciAdherenceStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    
    async returnsOsiStatistics(agent: Agent, startDate: any = "", endDate: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v5.0/wfo-data/osi`, Method.GET);
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

    returnsQualityManagementStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
}