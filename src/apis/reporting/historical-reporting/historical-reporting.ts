import HistoricalReportingVersion12 from "@apis/reporting/historical-reporting/historical-reporting-v12";
import HistoricalReportingVersion2 from "@apis/reporting/historical-reporting/historical-reporting-v2";
import HistoricalReportingVersion3 from "@apis/reporting/historical-reporting/historical-reporting-v3";
import HistoricalReportingVersion4 from "@apis/reporting/historical-reporting/historical-reporting-v4";
import HistoricalReportingVersion5 from "@apis/reporting/historical-reporting/historical-reporting-v5";
import HistoricalReportingVersion6 from "@apis/reporting/historical-reporting/historical-reporting-v6";
import HistoricalReportingVersion7 from "@apis/reporting/historical-reporting/historical-reporting-v7";
import HistoricalReportingVersion8 from "@apis/reporting/historical-reporting/historical-reporting-v8";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import HistoricalReportingVersion1 from "@apis/reporting/historical-reporting/historical-reporting-v1";

export interface IHistoricalReporting {
    returnsAListOfCustomReports(agent: Agent);
    returnsContactHistoryForAnAgent(agent: Agent, startDate: any, endDate: any, mediaTypeName?: any, mediaTypeId?: any, updatedSince?: any, fields?: any, skip?: any, top?: any, orderBy?: any);
    returnsInfoOnRecentContacts(agent: Agent, startDate: any, endDate: any, top?: any, fields?: any);
    returnsAgentLoginHistory(agent: Agent, startDate: any, endDate: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    returnsStateDurationForAnAgent(agent: Agent, startDate: any, endDate: any, mediaTypeId?: any, searchString?: any, outboundStrategy?: any, fields?: any, skip?: any, top?: any, orderBy?: any, updatedSince?: any)
    returnsAPerformanceSummaryOfAllAgents(agent: Agent, startDate: any, endDate: any, fields?: any);
    returnsAPerformanceSummaryOfAnAgent(agent: Agent, startDate: any, endDate: any, fields?: any);
    returnsContactDetails(agent: Agent, contactId: any, fields?: any);
    returnsSmsTranscriptsForAContactId(agent: Agent, contactId: any, transportCode: any, startDate: any, endDate: any, skip?: any, top?: any);
    returnsSmsTranscriptsForADateRangeAndTransportCode(agent: Agent, transportCode: any, startDate: any, endDate: any, skip?: any, top?: any, orderBy?: any)
    returnsCompletedContacts(agent: Agent, startDate: any, endDate: any, updatedSince?: any, fields?: any, skip?: any, top?: any, orderby?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, teamId?: any, toAddr?: any, isLogged?: any, isRefused?: any, isTakeover?: any, tags?: any, analyticsProcessed?: any)
    returnsContactCallQuality(agent: Agent, contactId?: any);
    returnsContactStateHistory(agent: Agent, contactId?: any);
    returnsContactCustomData(agent: Agent, contactId?: any);
    returnsStatisticsForAllSkills(agent: Agent, startDate?: any, endDate?: any, mediaTypeId?: any, isOutbound?: any, fields?: any);
    returnsStatisticsForASkill(agent: Agent, skillId: any, startDate: any, endDate: any, fields?: any);
    returnsSlaSummaryForAllSkills(agent: Agent, startDate?: any, endDate?: any);
    returnsSlaSummaryForASkill(agent: Agent, startDate: any, endDate: any, skillId: any, listVar?: any);
    returnsPerformanceSummaryOfAllTeams(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsPerformanceSummaryOfATeam(agent: Agent, teamId: any, startDate?: any, endDate?: any, fields?: any);
    returnsAListOfReportingJobs(agent: Agent, fields?: any, reportId?: any, jobStatus?: any, jobSpan?: any);
    returnsAReportingJob(agent: Agent, jobId: any, fields?: any);
    startACustomReportingJob(agent: Agent, reportId: any, fileType?: any, includeHeaders?: any, appendDate?: any, deleteAfter?: any, overwrite?: any, startDate?: any, endDate?: any);
    generatesALinkToADataDownloadReport(agent: Agent, reportId: any, saveAsFile: any, fileName: any, startDate: any, endDate: any, includeHeaders: any);
    returnScorecardStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnAsiMetadata(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsCsiStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsFtciAdherenceStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsOsiStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsQualityManagementStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
}

export default class HistoricalReporting {
    static getHistoricalReportingInstance(): IHistoricalReporting {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new HistoricalReportingVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V1) {
            return new HistoricalReportingVersion1();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new HistoricalReportingVersion2();
        } else if (TestRunInfo.versionAPI == APIVersion.V3) {
            return new HistoricalReportingVersion3();
        } else if (TestRunInfo.versionAPI == APIVersion.V4) {
            return new HistoricalReportingVersion4();
        } else if (TestRunInfo.versionAPI == APIVersion.V5) {
            return new HistoricalReportingVersion5();
        } else if (TestRunInfo.versionAPI == APIVersion.V6) {
            return new HistoricalReportingVersion6();
        } else if (TestRunInfo.versionAPI == APIVersion.V7) {
            return new HistoricalReportingVersion7();
        } else if (TestRunInfo.versionAPI == APIVersion.V8) {
            return new HistoricalReportingVersion8();
        }
    }
}
