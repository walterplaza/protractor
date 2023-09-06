import SkillCampaignManagementVersion12 from "@apis/admin/skill-campaign-management/skill-campaign-management-v12";
import SkillCampaignManagementVersion2 from "@apis/admin/skill-campaign-management/skill-campaign-management-v2";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface ISkillCampaignManagement {
    returnsAListOfCampaigns(agent: Agent, isActive?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    returnsASingleCampaign(agent: Agent, campaignId: any);
    createsASkill(agent: Agent, skillName?: any, media?: any);
    returnsSkillDetails(agent: Agent, fields?: any);
    updatesASkill(agent: Agent, skillId: any, json?: any);
    returnsConfigForThankYouPage(agent: Agent, skillId: any);
    startAPersonalConnectionSkill(agent: Agent, skillId: any);
    createANewDisposition(agent: Agent, dispositions: any);
    returnsADispositionConfiguration(agent: Agent, dispositionId: any, fields?: any);
    modifiesTheConfigurationOfADisposition(agent: Agent, dispositionId: any, dispositionName: any, classificationId?: any, isPreviewDisposition?: any, isActive?: any);
    returnsAListOfDispositionClassifications(agent: Agent, fields?: any);
    returnsSkillsDetails(agent: Agent, updatedSince?: any, mediaTypeId?: any, outboundStrategy?: any, isActive?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    stopAPersonalConnectionSkill(agent: Agent, skillId: any, force?: any);
    returnsSkillsAssignments(agent: Agent, fields?: any, updatedSince?: any, skills?: any);
    removeSkillAgentAssignments(agent: Agent, skillId: any);
    returnsAgentsAssignedToASkill(agent: Agent, skillId: any, updatedSince?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any);
    assignAgentsToASkill(agent: Agent, skillId: any, isActive?: any, proficiency?: any);
    updateSkillAgentAssignments(agent: Agent, skillID: any);
    getAgentsThatAreNotAssignedToSkill(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    returnsSummaryOfContactsForAllSkills(agent: Agent);
    returnsSummaryOfContactsForASkill(agent: Agent, skillID: any, startDate?: any, endDate?: any);
    returnsASkillsDispositions(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    returnsUnassignedDispositionsForASkill(agent: Agent, skillID: any, searchString?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    removesTagsFromASkill(agent: Agent, skillId: any, tagId: any);
    returnsTagsForASkill(agent: Agent, skillId: any);
    assignsATagToASkill(agent: Agent, skillId: any, tagId: any);
    returnsOutboundSkillGeneralSettings(agent: Agent, skillId: any, fields?: any);
    updatesOutboundSkillGeneralSettings();
}

export default class SkillCampaignManagementInstance {

    static getSkillCampaignManagementInstance(): ISkillCampaignManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new SkillCampaignManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new SkillCampaignManagementVersion2();
        } 
    }
}