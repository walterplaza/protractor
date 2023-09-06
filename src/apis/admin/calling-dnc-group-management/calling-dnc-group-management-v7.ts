import { ICallingDNCGroupManagement } from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class CallingDNCGroupManagementVersion7 implements ICallingDNCGroupManagement {
    returnsListOfDncGroups(agent: Agent, fields?: any, updatedSince?: any) {
        throw new Error("Method not implemented.");
    }
    createADncGroup(agent: Agent, dncGroupName: any, dncGroupDescription?: any) {
        throw new Error("Method not implemented.");
    }
    returnsADncGroup(agent: Agent, groupId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    updateADncGroup(agent: Agent, groupId: any, dncGroupName?: any, dncGroupDescription?: any, isActive?: any) {
        throw new Error("Method not implemented.");
    }
    returnsContributingSkillsForADncGroup(agent: Agent, groupId: any) {
        throw new Error("Method not implemented.");
    }
    removesAContributingSkill(agent: Agent, groupId: any, skillId: any) {
        throw new Error("Method not implemented.");
    }
    assignAContributingSkill(agent: Agent, groupId: any, skillId: any) {
        throw new Error("Method not implemented.");
    }
    expireRecordsFromADncGroup(agent: Agent, groupId: any, phoneNumber: any, expiredDate?: any) {
        throw new Error("Method not implemented.");
    }
    returnsRecordsInADncGroup(agent: Agent, groupId: any, fields?: any, skip?: any, top?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    returnsScrubbedSkillsForADncGroup(agent: Agent, groupId: any) {
        throw new Error("Method not implemented.");
    }
    removeAScrubbedSkill(agent: Agent, groupId: any, skillId: any) {
        throw new Error("Method not implemented.");
    }
    assignAScrubbedSkill(agent: Agent, groupId: any, skillId: any) {
        throw new Error("Method not implemented.");
    }
    searchForAPhoneNumber(agent: Agent, phoneNumber: any) {
        throw new Error("Method not implemented.");
    }
    addRecordsToADncGroup(agent: Agent, groupId: any, phoneNumber: any, expiredDate?: any) {
        throw new Error("Method not implemented.");
    }
    createACallingListMapping(agent: Agent, listName: any, externalIdColumn: any, destinationMappingsFieldName: any, destinationMappingsFieldValue: any) {
        throw new Error("Method not implemented.");
    }
    removeACallingList(agent: Agent, listId: any, forceInactive: any, forceDelete: any) {
        throw new Error("Method not implemented.");
    }
    downloadACallingListsAttempts(agent: Agent, listId: any, updatedSince: any, finalized?: any, includeRecords?: any, fields?: any, skip?: any, top?: any, orderby?: any) {
        throw new Error("Method not implemented.");
    }
    returnsTheStatusOfCallingListUploadJobs(agent: Agent, startDate: any, endDate: any, fields?: any, top?: any, skip?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    cancelPendingProcessingListProcess(agent: Agent, jobId: any) {
        throw new Error("Method not implemented.");
    }
    returnsTheStatusOfCallingListUploadJob(agent: Agent, jobId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }

    downloadACallingList(agent: Agent, listId: any, updatedSince: any, finalized: any, includeRecords: any, fields: any, skip: any, top: any, orderby: any): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }
    async returnsAllCallingLists(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/lists/call-lists`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAllCallingLists, err.message);
        }
    };
    async uploadNewRecordsToACallList(agent: Agent, listId: any, skillId: any, fileName: any, listFile: any, forceOverwrite: any = "false"): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/lists/call-lists/${listId}/upload`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"skillId":"${skillId}","fileName":"${fileName}","forceOverwrite":"${forceOverwrite}","expirationDate":"","listFile":"${listFile}","startSkill":"false"}`;
            return await APICore.request(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.uploadNewRecordsToACallList, err.message);
        }
    };

}
