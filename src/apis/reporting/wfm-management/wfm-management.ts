import WfmManagementVersion12 from "@apis/reporting/wfm-management/wfm-management-v12";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import { Agent } from "@data-objects/general/agent";

export interface IWFMManagement {
    returnsContactStatisticsForWfm(agent: Agent, startDate?: any, endDate?: any, fields?: any, mediaTypeId?: any);
    returnsAgentMetadata(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsDailerContactStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any, mediaTypeId?: any);
    returnsAdherenceStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsScorecardStatistics(agent: Agent, startDate?: any, endDate?: any, fields?: any);
    returnsAgentPerformance(agent: Agent, startDate?: any, endDate?: any, fields?: any);
}

export default class WfmManagement {
    static getWfmManagementInstance(): IWFMManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new WfmManagementVersion12();
        }
    }
}