import { ICallingDNCGroupManagement } from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, Method, Options, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class CallingDNCGroupManagementVersion12 implements ICallingDNCGroupManagement {

    async returnsListOfDncGroups(agent: Agent, fields: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsListOfDncGroups, err.message);
        }
    };

    async createADncGroup(agent: Agent, dncGroupName: any, dncGroupDescription: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("dncGroupName", dncGroupName);
            options.addBody("dncGroupDescription", dncGroupDescription);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createADncGroup, err.message);
        }
    }
    async returnsADncGroup(agent: Agent, groupId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsADncGroup, err.message);
        }
    }
    async updateADncGroup(agent: Agent, groupId: any, dncGroupName: any = "", dncGroupDescription: any = "", isActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dncGroupName", dncGroupName);
            options.addParam("dncGroupDescription", dncGroupDescription);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateADncGroup, err.message);
        }
    }
    async returnsContributingSkillsForADncGroup(agent: Agent, groupId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/contributing-skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsContributingSkillsForADncGroup, err.message);
        }
    }
    async removesAContributingSkill(agent: Agent, groupId: any, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/contributing-skills/${skillId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesAContributingSkill, err.message);
        }
    }
    async assignAContributingSkill(agent: Agent, groupId: any, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/contributing-skills/${skillId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAContributingSkill, err.message);
        }
    }
    async expireRecordsFromADncGroup(agent: Agent, groupId: any, phoneNumber: any = "", expiredDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/records`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let dncGroupRecords: string = `{"dncGroupRecords":[{"phoneNumber":"${phoneNumber}","expiredDate":"${expiredDate}"}]}`;
            return await APICore.request(options, dncGroupRecords);
        } catch (err) {
            throw new errorwrapper.CustomError(this.expireRecordsFromADncGroup, err.message);
        }
    }

    async returnsRecordsInADncGroup(agent: Agent, groupId: any, fields: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/records`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsRecordsInADncGroup, err.message);
        }
    }
    async addRecordsToADncGroup(agent: Agent, groupId: any, phoneNumber: any = "", expiredDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/records`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let dncGroupRecords: string = `{"dncGroupRecords":[{"phoneNumber":"${phoneNumber}","expiredDate":"${expiredDate}"}]}`;
            return await APICore.request(options, dncGroupRecords);
        } catch (err) {
            throw new errorwrapper.CustomError(this.addRecordsToADncGroup, err.message);
        }
    }
    async returnsScrubbedSkillsForADncGroup(agent: Agent, groupId: any):Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/scrubbed-skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsScrubbedSkillsForADncGroup, err.message);
        }
    };
    async removeAScrubbedSkill(agent: Agent, groupId: any, skillId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/scrubbed-skills/${skillId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAScrubbedSkill, err.message);
        }
     };
    async assignAScrubbedSkill(agent:Agent, groupId: any, skillId:any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/${groupId}/scrubbed-skills/${skillId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAScrubbedSkill, err.message);
        }
     };
    async searchForAPhoneNumber(agent:Agent, phoneNumber:any =""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dnc-groups/search`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber",phoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.searchForAPhoneNumber, err.message);
        }
     };
    
    async returnsAllCallingLists(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAllCallingLists, err.message);
        }
    };
    async createACallingListMapping(agent: Agent, listName: any, externalIdColumn: any, destinationMappingsFieldName: any, destinationMappingsFieldValue: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"listName":"${listName}","listExpirationDate":"","externalIdColumn":"${externalIdColumn}","scoreColumn":"","customer1Column":"","customer2Column":"","callerIdColumn":"","priorityColumn":"","complianceReqColumn":"","firstNameColumn":"","lastNameColumn":"","addressColumn":"","cityColumn":"","stateColumn":"","zipColumn":"","timeZoneColumn":"","confirmReqColumn":"","overrideFinalizationColumn":"","agentIdColumn":"","callRequestTimeColumn":"","callRequestStaleColumn":"","notesColumn":"","expirationDateColumn":"","destinationMappings":[{"fieldName":"${destinationMappingsFieldName}","fieldValue":"${destinationMappingsFieldValue}"}],"customFieldMappings":[{"fieldName":"","fieldValue":""}]}`;
            return await APICore.requestJson(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createACallingListMapping, err.message);
        }
    };
    async removeACallingList(agent: Agent, listId: any, forceInactive: any = "", forceDelete: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/${listId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceInactive", forceInactive);
            options.addParam("forceDelete", forceDelete);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.downloadACallingList, err.message);
        }
    };
    async downloadACallingList(agent: Agent, listId: any, updatedSince: any = "", finalized: any = "", includeRecords: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/${listId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("finalized", finalized);
            options.addParam("includeRecords", includeRecords);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.downloadACallingList, err.message);
        }
    }
    async downloadACallingListsAttempts(agent: Agent, listId: any, updatedSince: any = "", finalized: any = "", includeRecords: any = "", fields: any = "", skip: any = "", top: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/${listId}/attempts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("finalized", finalized);
            options.addParam("includeRecords", includeRecords);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.downloadACallingListsAttempts, err.message);
        }
    }

    async uploadNewRecordsToACallList(agent: Agent, listId: any, skillId: any, fileName: any, listFile: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/${listId}/upload`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"skillId":"${skillId}","fileName":"${fileName}","forceOverwrite":"false","expirationDate":"","listFile":"${listFile}","startSkill":"false"}`;
            return await APICore.request(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.uploadNewRecordsToACallList, err.message);
        }
    };

    async returnsTheStatusOfCallingListUploadJobs(agent: Agent, startDate: any, endDate: any, fields: any = "", top: any = "", skip: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/jobs`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderBy", orderBy);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheStatusOfCallingListUploadJobs, err.message);
        }
    }

    async cancelPendingProcessingListProcess(agent: Agent, jobId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/jobs/${jobId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.cancelPendingProcessingListProcess, err.message);
        }
    };

    async returnsTheStatusOfCallingListUploadJob(agent: Agent, jobId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/lists/call-lists/jobs/${jobId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheStatusOfCallingListUploadJob, err.message);
        }
    };

}
