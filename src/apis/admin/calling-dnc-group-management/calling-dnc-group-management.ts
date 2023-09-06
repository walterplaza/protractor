import CallingDNCGroupManagementVersion12 from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management-v12";
import CallingDNCGroupManagementVersion4 from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management-v4";
import CallingDNCGroupManagementVersion6 from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management-v6";
import CallingDNCGroupManagementVersion7 from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management-v7";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface ICallingDNCGroupManagement {
    returnsListOfDncGroups(agent: Agent, fields?: any, updatedSince?: any);
    createADncGroup(agent: Agent, dncGroupName: any, dncGroupDescription?: any);
    returnsADncGroup(agent: Agent, groupId: any, fields?: any);
    updateADncGroup(agent: Agent, groupId: any, dncGroupName?: any, dncGroupDescription?: any, isActive?: any);
    returnsContributingSkillsForADncGroup(agent: Agent, groupId: any);
    removesAContributingSkill(agent: Agent, groupId: any, skillId: any);
    assignAContributingSkill(agent: Agent, groupId: any, skillId: any);
    expireRecordsFromADncGroup(agent: Agent, groupId: any, phoneNumber: any, expiredDate?: any);
    returnsRecordsInADncGroup(agent: Agent, groupId: any, fields?: any, skip?: any, top?: any, orderBy?: any);
    returnsScrubbedSkillsForADncGroup(agent: Agent, groupId: any);
    removeAScrubbedSkill(agent: Agent, groupId: any, skillId: any);
    assignAScrubbedSkill(agent: Agent, groupId: any, skillId: any);
    searchForAPhoneNumber(agent: Agent, phoneNumber: any);
    addRecordsToADncGroup(agent: Agent, groupId: any, phoneNumber: any, expiredDate?: any);
    returnsAllCallingLists(agent: Agent);
    createACallingListMapping(agent: Agent, listName?: any, skillID?: any, fileName?: any, forceOverwrite?: any, listFile?: any, externalIdColumn?: any, destinationMappingsFieldName?: any, destinationMappingsFieldValue?: any);
    removeACallingList(agent: Agent, listId: any, forceInactive: any, forceDelete: any);
    downloadACallingList(agent: Agent, listId: any, updatedSince?: any, finalized?: any, includeRecords?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    downloadACallingListsAttempts(agent: Agent, listId: any, updatedSince: any, finalized?: any, includeRecords?: any, fields?: any, skip?: any, top?: any, orderby?: any);
    uploadNewRecordsToACallList(agent: Agent, listId: any, skillId: any, fileName: any, listFile: any, forceOverwrite?: any);
    returnsTheStatusOfCallingListUploadJobs(agent: Agent, startDate: any, endDate: any, fields?: any, top?: any, skip?: any, orderBy?: any);
    cancelPendingProcessingListProcess(agent: Agent, jobId: any);
    returnsTheStatusOfCallingListUploadJob(agent: Agent, jobId: any, fields?: any);
}
export default class CallingDNCGroupManagementInstance {

    static getCallingDNCGroupManagementInstance(): ICallingDNCGroupManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new CallingDNCGroupManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V4) {
            return new CallingDNCGroupManagementVersion4();
        } else if (TestRunInfo.versionAPI == APIVersion.V6) {
            return new CallingDNCGroupManagementVersion6();
        } else if (TestRunInfo.versionAPI == APIVersion.V7) {
            return new CallingDNCGroupManagementVersion7();
        }
    }
}