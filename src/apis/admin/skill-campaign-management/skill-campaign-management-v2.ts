
import { ISkillCampaignManagement } from "@apis/admin/skill-campaign-management/skill-campaign-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class SkillCampaignManagementVersion2 implements ISkillCampaignManagement {
    returnsAListOfCampaigns(agent: Agent, isActive?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    } returnsASingleCampaign(agent: Agent, campaignId: any) {
        throw new Error("Method not implemented.");
    }
    createsASkill(agent: Agent, skillName?: any, media?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSkillDetails(agent: Agent, fields?: any) {
        throw new Error("Method not implemented.");
    }
    updatesASkill(agent: Agent, skillId: any, skillName?: any) {
        throw new Error("Method not implemented.");
    }
    returnsConfigForThankYouPage(agent: Agent, skillId: any) {
        throw new Error("Method not implemented.");
    }
    startAPersonalConnectionSkill(agent: Agent, skillId: any) {
        throw new Error("Method not implemented.");
    }
    createANewDisposition(agent: Agent, dispositions: any) {
        throw new Error("Method not implemented.");
    }
    returnsADispositionConfiguration(agent: Agent, dispositionId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    modifiesTheConfigurationOfADisposition(agent: Agent, dispositionId: any, dispositionName: any, classificationId?: any, isPreviewDisposition?: any, isActive?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfDispositionClassifications(agent: Agent, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSkillsDetails(agent: Agent, updatedSince?: any, mediaTypeId?: any, outboundStrategy?: any, isActive?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    stopAPersonalConnectionSkill(agent: Agent, skillId: any, force?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSkillsAssignments(agent: Agent, fields?: any, updatedSince?: any, skills?: any) {
        throw new Error("Method not implemented.");
    }
    async removeSkillAgentAssignments(agent: Agent, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/skills/${skillId}/agents/${agent.agentID}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeSkillAgentAssignments, err.message);
        }
    }

    returnsAgentsAssignedToASkill(agent: Agent, skillId: any, updatedSince?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    async assignAgentsToASkill(agent: Agent, skillId: any, isActive?: any, proficiency?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/skills/${skillId}/agents/${agent.agentID}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let agentsValue: string = `{["active":"${isActive}","proficiency":"${proficiency}"}]}`;
            return await APICore.requestJson(options, agentsValue);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAgentsToASkill, err.message);
        }
    }
    updateSkillAgentAssignments(agent: Agent, skillID: any) {
        throw new Error("Method not implemented.");
    }
    getAgentsThatAreNotAssignedToSkill(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSummaryOfContactsForAllSkills(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsSummaryOfContactsForASkill(agent: Agent, skillID: any, startDate?: any, endDate?: any) {
        throw new Error("Method not implemented.");
    }
    returnsASkillsDispositions(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    returnsUnassignedDispositionsForASkill(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    removesTagsFromASkill(agent: Agent, skillId: any, tagId: any) {
        throw new Error("Method not implemented.");
    }
    returnsTagsForASkill(agent: Agent, skillId: any) {
        throw new Error("Method not implemented.");
    }
    assignsATagToASkill(agent: Agent, skillId: any, tagId: any) {
        throw new Error("Method not implemented.");
    }
    returnsOutboundSkillGeneralSettings(agent: Agent, skillId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    updatesOutboundSkillGeneralSettings() {
        throw new Error("Method not implemented.");
    }
}