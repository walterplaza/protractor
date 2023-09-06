
import { ISkillCampaignManagement } from "@apis/admin/skill-campaign-management/skill-campaign-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class SkillCampaignManagementVersion12 implements ISkillCampaignManagement {

    async returnsAListOfCampaigns(agent: Agent, isActive: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/campaigns`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfCampaigns, err.message);
        }
    }

    async returnsASingleCampaign(agent: Agent, campaignId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/campaigns/${campaignId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASingleCampaign, err.message);
        }
    }
    async createANewDisposition(agent: Agent, dispositions: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dispositions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, `{"dispositions":[{"dispositionName":"${dispositions}","isPreviewDisposition":false,"classificationId":1}]}`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createANewDisposition, err.message);
        }
    }
    async returnsADispositionConfiguration(agent: Agent, dispositionId: any = "", fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dispositions/${dispositionId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsADispositionConfiguration, err.message);
        }
    }
    async modifiesTheConfigurationOfADisposition(agent: Agent, dispositionId: any = "", dispositionName: any = "", classificationId: any = "", isPreviewDisposition: any = "", isActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dispositions/${dispositionId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dispositionName", dispositionName);
            options.addParam("classificationId", classificationId);
            options.addParam("isPreviewDisposition", isPreviewDisposition);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.modifiesTheConfigurationOfADisposition, err.message);
        }
    }
    async returnsAListOfDispositionClassifications(agent: Agent, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dispositions/classifications`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfDispositionClassifications, err.message);
        }
    }
    async returnsSkillsDetails(agent: Agent, updatedSince: any = "", mediaTypeId: any = "", outboundStrategy: any = "", isActive: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsDetails, err.message);
        }
    }
    async returnsSkillDetails(agent: Agent, skillID: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillDetails, err.message);
        }
    }
    async createsASkill(agent: Agent, skillName: string = "", mediaTypeId: number = 1): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let skill: string = `{"skills":[{"mediaTypeId":${mediaTypeId},"skillName":"${skillName}","isOutbound":true,"outboundStrategy":"Personal Connection","campaignId":1,"callerIdOverride":"8015554422","emailFromAddress":"test@test.com","emailFromEditable":false,"emailBccAddress":"","scriptId":2,"reskillHours":4,"minWFIAgents":null,"minWFIAvailableAgents":null,"interruptible":false,"enableParking":false,"minWorkingTime":4,"agentless":false,"agentlessPorts":6,"notes":"this is a test note","acwTypeId":3,"requireDisposition":false,"allowSecondaryDisposition":false,"scriptDisposition":false,"stateIdACW":2,"maxSecondsACW":3,"acwPostTimeoutStateId":53,"agentRestTime":4,"displayThankyou":false,"thankYouLink":"no","popThankYou":true,"popThankYouURL":"tester.com","makeTranscriptAvailable":true,"transcriptFromAddress":"fromMe@email.com","priorityBlending":false,"callSuppressionScriptId":4,"useScreenPops":true,"screenPopTriggerEvent":0,"useCustomScreenPops":false,"screenPopType":"webpage","screenPopDetails":"http://not","initialPriority":4,"acceleration":5,"maxPriority":10,"serviceLevelThreshold":51,"serviceLevelGoal":24,"enableShortAbandon":true,"shortAbandonThreshold":123,"countShortAbandons":true,"countOtherAbandons":true,"chatWarningTheshold":0,"agentTypingIndicator":false,"patronTypingPreview":false,"smsTransportCodeId":null,"messageTemplateId":null,"deliverMultipleNumbersSerially":false,"cradleToGrave":false,"priorityInterrupt":false,"treatProgressAsRinging":false,"preConnectCPAEnabled":false,"agentOverrideFax":true,"agentOverrideAnsweringMachine":true,"agentOverrideBadNumber":true,"dispositions":[{"dispositionId":1,"priority":1}]}]}`;
            return await APICore.requestJson(options, skill);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.createsASkill, err.message);
        }
    }
    async updatesASkill(agent: Agent, skillId: any, json: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}/services/v12.0/skills/${skillId}`, Method.PUT);
            let updateJson: string = `{"skill": ${json}}`;
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options, updateJson);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.updatesASkill, err.message);
        }
    }
    async returnsConfigForThankYouPage(agent: Agent, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/thank-you-page`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skillId", skillId);
            return await APICore.request(options);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.returnsConfigForThankYouPage, err.message);
        }
    }
    async startAPersonalConnectionSkill(agent: Agent, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/start`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.startAPersonalConnectionSkill, err.message);
        }
    }

    async stopAPersonalConnectionSkill(agent: Agent, skillId: any, force: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/stop`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("force", force);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.stopAPersonalConnectionSkill, err.message);
        }
    }

    async returnsSkillsAssignments(agent: Agent, fields: any = "", updatedSince: any = "", skills: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("skills", skills);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSkillsAssignments, err.message);
        }
    }

    async removeSkillAgentAssignments(agent: Agent, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let agentsValue: string = `{"agents":[{"agentId":"${agent.agentID}"}]}`
            return await APICore.requestJson(options, agentsValue);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeSkillAgentAssignments, err.message);
        }
    }

    async returnsAgentsAssignedToASkill(agent: Agent, skillId: any = "", updatedSince: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("searchString", searchString);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAgentsAssignedToASkill, err.message);
        }
    }

    async assignAgentsToASkill(agent: Agent, skillId: any, isActive: any = "", proficiency: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let agentsValue: string = `{"agents":[{"agentId":"${agent.agentID}","isActive":"${isActive}","proficiency":"${proficiency}"}]}`;
            return await APICore.request(options, agentsValue);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAgentsToASkill, err.message);
        }
    }

    async updateSkillAgentAssignments(agent: Agent, skillID: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}/agents`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, `{"agents":[{"agentId":"${agent.agentID}","isActive":"","proficiency":""}]}`);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateSkillAgentAssignments, err.message);
        }
    }

    async getAgentsThatAreNotAssignedToSkill(agent: Agent, skillID: any, searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}/agents/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsThatAreNotAssignedToSkill, err.message);
        }
    }

    async returnsSummaryOfContactsForAllSkills(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/call-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSummaryOfContactsForAllSkills, err.message);
        }
    }

    async returnsSummaryOfContactsForASkill(agent: Agent, skillID: any, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}/call-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSummaryOfContactsForASkill, err.message);
        }
    }

    async returnsASkillsDispositions(agent: Agent, skillID: any, searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillID}/dispositions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASkillsDispositions, err.message);
        }
    }

    async returnsUnassignedDispositionsForASkill(agent: Agent, skillId: any, searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/dispositions/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsUnassignedDispositionsForASkill, err.message);
        }
    }

    async removesTagsFromASkill(agent: Agent, skillId: any, tagId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/tags`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"tags":[{"tagId":"${tagId}"}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesTagsFromASkill, err.message);
        }
    }

    async returnsTagsForASkill(agent: Agent, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/tags`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTagsForASkill, err.message);
        }
    }

    async assignsATagToASkill(agent: Agent, skillId: any, tagId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"tags":[{"tagId":"${tagId}"}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsATagToASkill, err.message);
        }
    }
    async returnsOutboundSkillGeneralSettings(agent: Agent, skillId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/parameters/general-settings`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTagsForASkill, err.message);
        }
    }
    updatesOutboundSkillGeneralSettings() {
        throw new Error("Method not implemented.");
    }


}