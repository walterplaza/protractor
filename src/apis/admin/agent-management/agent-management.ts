import AgentManagementVersion12 from "@apis/admin/agent-management/agent-management-v12";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IAgentManagement {

    getAgentsList(agent: Agent, updateSince?: any, isActive?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    createAnAgent(agent: Agent, agents?: any);
    getAgentDetailsByAgentId(agent: Agent, fields?: any);
    updateAnAgent(agent: Agent);
    setsAnAgentsState(agent: Agent, state?: any, outStateId?: any);
    returnsSkillsAssignedToAllAgents(agent: Agent, updatedSince?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any, mediaTypeId?: any, outboundStrategy?: any, isSkillActive?: any);
    returnsAListOfGroupsAnAgentIsAssigned(agent: Agent, fields?: any);
    removeSkillAssignmentsForAnAgent(agent: Agent, skillId: any);
    returnsSkillsAssignedToAnAgent(agent: Agent, updatedSince?: any, fields?: any);
    assignsSkillsToAnAgent(agent: Agent, skillId: any, isActive?: any, proficiency?: any);
    modifySkillAssignmentsForAnAgent(agent: Agent, skillId?: any, isActive?: any, proficiency?: any);
    returnsSkillsNotAssignedToAnAgent(agent: Agent, mediaTypeId?: any, outboundStrategy?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any, isSkillActive?: any);
    returnsSummaryOfAllAgentsContactsBySkill(agent: Agent, startDate: any, endDate: any);
    returnsSummaryOfAnAgentsContactsBySkill(agent: Agent, startDate: any, endDate: any);
    createsACustomAgentEvent(agent: Agent, eventName?: any, persistInMemory?: any, data?: any);
    returnsAListOfQuickReplies(agent: Agent);
    returnsAListOfQuickRepliesForAnAgent(agent: Agent);
    createAnAgentMessage(agent: Agent, agentMessages: any, startDate: any, validUntil: any, expireMinutes: any);
    deleteAgentMessage(agent: Agent, messageId: any);
    returnsAnAgentMessageList(agent: Agent);
    returnsAnAgentIndicatorList(agent: Agent);
    forcesAnAgentSessionToEnd(agent: Agent);
    returnsAgentDialingPatterns(agent: Agent);
    returnsAListOfAgentStates(agent: Agent);
    returnsListOfTeams(agent: Agent);
    createATeam(agent: Agent, teamName?: any);
    returnsATeam(agent: Agent, teamId?: any, fields?: any);
    updateATeam(agent: Agent, teamId: any, teamName?: any, forceInactive?: any);
    returnsAllTeamsAgents(agent: Agent, fields?: any, updatedSince?: any);
    removeAgentsFromATeam(agent: Agent, teamId: any, transferTeamId: any, removedAgent: Agent);
    returnsATeamsAgents(agent: Agent, teamId: any, fields?: any);
    assignAgentsToATeam(agent: Agent, teamId: any);
    removeUnavailableCodesFromATeam(agent: Agent, teamId: any, outstateId?: any);
    returnsUnavailableCodesForATeam(agent: Agent, teamId: any, activeOnly?: any);
    assignUnavailableCodesToATeam(agent: Agent, teamId: any, outstateId?: any);
}
export default class AgentManagementInstance {

    static getAgentManagementInstance(): IAgentManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new AgentManagementVersion12();
        }
    }
}