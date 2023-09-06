import RealTimeReportingVersion1 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v1";
import RealTimeReportingVersion12 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v12";
import RealTimeReportingVersion3 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v3";
import RealTimeReportingVersion4 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v4";
import RealTimeReportingVersion5 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v5";
import RealTimeReportingVersion6 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v6";
import RealTimeReportingVersion7 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v7";
import RealTimeReportingVersion8 from "@apis/real-time-data/real-time-reporting/real-time-reporting-v8";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IRealTimeReporting {
    returnsTheCurrentStateForAllAgents(agent: Agent, updatedSince?: any, fields?: any, reqBUIds?: any)
    returnsTheCurrentStateForAnAgent(agent: Agent, updatedSince?: any, fields?: any)
    returnsActiveContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, agentId?: any, teamId?: any, toAddr?: any, fromAddr?: any, stateId?: any)
    returnsParkedContacts(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, agentId?: any, teamId?: any, toAddr?: any, fromAddr?: any)
    returnsActiveContactStates(agent: Agent, updatedSince?: any)
    returnsActivityForAllSkills(agent: Agent, mediaTypeId?: any , isOutbound?: any, fields?: any, updatedSince?: any)
    returnsActivityForASkill(agent: Agent, skillId: any, updatedSince?: any, fields?: any)
}

export default class RealTimeReporting {
    static getRealTimeReportingInstance(): IRealTimeReporting {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new RealTimeReportingVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V1) {
            return new RealTimeReportingVersion1();
        } else if (TestRunInfo.versionAPI == APIVersion.V3) {
            return new RealTimeReportingVersion3();
        } else if (TestRunInfo.versionAPI == APIVersion.V4) {
            return new RealTimeReportingVersion4();
        } else if (TestRunInfo.versionAPI == APIVersion.V5) {
            return new RealTimeReportingVersion5();
        } else if (TestRunInfo.versionAPI == APIVersion.V6) {
            return new RealTimeReportingVersion6();
        } else if (TestRunInfo.versionAPI == APIVersion.V7) {
            return new RealTimeReportingVersion7();
        }else if (TestRunInfo.versionAPI == APIVersion.V8) {
            return new RealTimeReportingVersion8();
        }
    }
}