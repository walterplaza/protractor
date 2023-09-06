import { IAgentManagement } from "@apis/admin/agent-management/agent-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class AgentManagementVersion12 implements IAgentManagement {

    async getAgentsList(agent: Agent, updateSince: any = "", isActive: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updateSince", updateSince);
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsList, err.message);
        }
    }

    async createAnAgent(agent: Agent, agents: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createAnAgent, err.message);
        }
    }

    async getAgentDetailsByAgentId(agent: Agent, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentDetailsByAgentId, err.message);
        }
    }

    async updateAnAgent(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agent", agent);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateAnAgent, err.message);
        }
    }

    async setsAnAgentsState(agent: Agent, state: any = "", outStateId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/state`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("state", state);
            options.addBody("outStateId", outStateId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setsAnAgentsState, err.message);
        }
    }

    async returnsSkillsAssignedToAllAgents(agent: Agent, updatedSince: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = "", mediaTypeId: any = "", outboundStrategy: any = "", isSkillActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("isSkillActive", isSkillActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsAssignedToAllAgents, err.message);
        }
    }

    async returnsAListOfGroupsAnAgentIsAssigned(agent: Agent, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfGroupsAnAgentIsAssigned, err.message);
        }
    }
    async removeSkillAssignmentsForAnAgent(agent: Agent, skillId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skills`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let teams: string = `{"skills": [{"skillId": ${skillId}}]}`;
            return await APICore.requestJson(options,teams);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeSkillAssignmentsForAnAgent, err.message);
        }
    }
    async returnsSkillsAssignedToAnAgent(agent: Agent, updatedSince: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsAssignedToAnAgent, err.message);
        }
    }
    async assignsSkillsToAnAgent(agent: Agent, skillId: any = "", isActive: any = "", proficiency: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skills`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let teams: string = `{"skills": [{"skillId": ${skillId},"isActive": ${isActive},"proficiency": ${proficiency}}]}`;
            return await APICore.requestJson(options,teams);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsSkillsToAnAgent, err.message);
        }
    }
    /**
     * Modify Skill assignments for an Agent
     * @author Y.Le
     * @param {Agent} agent
     * @param {*} skills
     * @returns {Promise<APIResponse>}
     * @memberof AgentManagementVersion12
     */
    async modifySkillAssignmentsForAnAgent(agent: Agent,skillId: string ="",isActive: string ="",proficiency: string =""): Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skills`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let skills =`{"skills":[{"skillId":"${skillId}","isActive":"${isActive}","proficiency":"${proficiency}"}]}`
            return await APICore.requestJson(options, skills);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsAssignedToAnAgent, err.message);
        }
    }
    async returnsSkillsNotAssignedToAnAgent(agent: Agent, mediaTypeId: any = "", outboundStrategy: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = "", isSkillActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skills/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("isSkillActive", isSkillActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsNotAssignedToAnAgent, err.message);
        }
    }

    /**
     * Returns summary of all agent's contacts by skill
     * @author Y Le
     * @param {Agent} agent
     * @param {any} [startDate=""]
     * @param {any} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof AgentManagementVersion12
     */
    async returnsSummaryOfAllAgentsContactsBySkill(agent: Agent, startDate:any = "", endDate:any = ""): Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agents/skill-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.returnsSummaryOfAllAgentsContactsBySkill, err.message);
        }
    }
    /**
     * Returns summary of an agent's contacts by skill
     * @author Y Le
     * @param {Agent} agent
     * @param {string} [startDate=""]
     * @param {string} [endDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof AgentManagementVersion12
     */
    async returnsSummaryOfAnAgentsContactsBySkill(agent: Agent, startDate:string ="", endDate:string =""): Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/skill-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.returnsSummaryOfAnAgentsContactsBySkill, err.message);
        }
    }
    /**
     * Creates a Custom Agent Event
     * @author YLe
     * @param {Agent} agent
     * @param {string} [eventName=""]
     * @param {boolean} [persistInMemory=true]
     * @param {string} [data=""]
     * @returns {Promise<APIResponse>}
     * @memberof AgentManagementVersion12
     */
    async createsACustomAgentEvent(agent: Agent, eventName: string= "", persistInMemory: boolean= true, data:string= ""): Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/custom-event`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("eventName", eventName);
            options.addParam("persistInMemory", persistInMemory);
            options.addParam("data", data);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.createsACustomAgentEvent, err.message);
        }
    }
    async returnsAListOfQuickReplies(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/quick-replies`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfQuickReplies, err.message);
        }
    }
    async returnsAListOfQuickRepliesForAnAgent(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/quick-replies`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfQuickRepliesForAnAgent, err.message);
        }
    }
    async createAnAgentMessage(agent: Agent, agentMessages: any = "", startDate: any = "", validUntil: any = "", expireMinutes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/messages`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let agentMessage: string = `{"agentMessages":[{"message":"${agentMessages}","startDate":"${startDate}","subject":"${agentMessages}","targetId":${agent.agentID},"targetType":"Agent","validUntil":"${validUntil}","expireMinutes":${expireMinutes}}]}`;
            return await APICore.requestJson(options, agentMessage);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createAnAgentMessage, err.message);
        }
    }

    async deleteAgentMessage(agent: Agent, messageId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/messages/${messageId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAgentMessage, err.message);
        }
    }

    async returnsAnAgentMessageList(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/messages`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAnAgentMessageList, err.message);
        }
    }

    async returnsBrandingProfile(): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async returnsAnAgentIndicatorList(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/indicators`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAnAgentIndicatorList, err.message);
        }
    }

    async forcesAnAgentSessionToEnd(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/logout`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.forcesAnAgentSessionToEnd, err.message);
        }
    }

    async returnsAgentDialingPatterns(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-patterns`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAgentDialingPatterns, err.message);
        }
    }

    async returnsAListOfAgentStates(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents-states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfAgentStates, err.message);
        }
    }

    async returnsListOfTeams(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsListOfTeams, err.message);
        }
    }

    async createATeam(agent: Agent, teamName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let teams: string = `{"teams":[{"teamName":"${teamName}","isActive":true,"maxConcurrentChats":8,"wfoEnabled":false,"wfm2Enabled":false,"qm2Enabled":false,"inViewEnabled":false,"notes":"","maxEmailAutoParkingLimit":25,"inViewGamificationEnabled":false,"inViewChatEnabled":false,"inViewLMSEnabled":false,"analyticsEnabled":false,"requestContact":false,"chatThreshold":1,"emailThreshold":1,"workItemThreshold":1,"voiceThreshold":1,"contactAutoFocus":false,"teamUuid":"","teamLeadUuid":""}]}`;
            return await APICore.requestJson(options, teams);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createATeam, err.message);
        }
    }
    async returnsATeam(agent: Agent, teamId: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsATeam, err.message);
        }
    }
    async updateATeam(agent: Agent, teamId: any, teamName: any = "", forceInactive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"forceInactive":${forceInactive},"team":{"${teamName}":"team","isActive":true,"maxConcurrentChats":8,"wfoEnabled":false,"wfm2Enabled":false,"qm2Enabled":false,"inViewEnabled":false,"notes":"","maxEmailAutoParkingLimit":25,"inViewGamificationEnabled":false,"inViewChatEnabled":false,"inViewLMSEnabled":false,"analyticsEnabled":false,"requestContact":false,"chatThreshold":1,"emailThreshold":1,"workItemThreshold":1,"voiceThreshold":1,"contactAutoFocus":false,"teamUuid":"","teamLeadUuid":"","NICEAnalyticsEnabled":false,"NICEAudioRecordingEnabled":false,"NICECoachingEnabled":false,"NICEDesktopAnalyticsEnabled":false,"NICELessonManagementEnabled":false,"NICEPerformanceManagementEnabled":false,"NICEQmEnabled":false,"NICEQualityOptimizationEnabled":false,"NICEScreenRecordingEnabled":false,"NICEShiftBiddingEnabled":false,"NICESpeechAnalyticsEnabled":false,"NICEStrategicPlannerEnabled":false,"NICESurvey_CustomerEnabled":false,"NICEWfmEnabled":false}}`
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateATeam, err.message);
        }
    }
    async returnsAllTeamsAgents(agent: Agent, fields: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAllTeamsAgents, err.message);
        }
    }
    async removeAgentsFromATeam(agent: Agent, teamId: any, transferTeamId: any, removedAgent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"transferTeamId":"${transferTeamId}","agents":[{"agentId":"${removedAgent.agentID}"}]}`
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAgentsFromATeam, err.message);
        }
    }
    
    async returnsUnavailableCodesForATeam(agent: Agent, teamId: any = "", activeOnly: any = ""): Promise<APIResponse> {  try {
        let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/unavailable-codes`, Method.GET);
        options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
        options.addHeader("Content-Type", "application/json; charset=utf-8");
        options.addParam("fields", activeOnly);
        return await APICore.request(options);
    } catch (err) {
        throw new errorwrapper.CustomError(this.returnsUnavailableCodesForATeam, err.message);
    } }

    async assignUnavailableCodesToATeam(agent: Agent, teamId: any = "", outstateId: any): Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/unavailable-codes`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"codes":[{"outstateId":"${outstateId}"}]}`
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignUnavailableCodesToATeam, err.message);
        }
    }
    async removeUnavailableCodesFromATeam (agent: Agent, teamId: any = "", outstateId: any): Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/unavailable-codes`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"codes":[{"outstateId":"${outstateId}"}]}`
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeUnavailableCodesFromATeam, err.message);
        }
    }
    async returnsATeamsAgents (agent: Agent, teamId: any = "", fields: any = ""): Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
           throw new errorwrapper.CustomError(this.returnsATeamsAgents, err.message);
        }

    }
    async assignAgentsToATeam (agent: Agent, teamId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}/services/v12.0/teams/${teamId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"agents":[{"agentId":"${agent.agentID}"}]}`
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAgentsToATeam, err.message);
        }

    }
}