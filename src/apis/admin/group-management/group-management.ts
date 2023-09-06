import GroupManagementVersion12 from "@apis/admin/group-management/group-management-v12";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IGroupManagement {
    getGroups(agent: Agent, top?: any, skip?: any, orderBy?: any, searchString?: any, isActive?: any, fields?: any);
    createGroups(agent: Agent, groupName: any);
    returnsAGroupConfig(agent: Agent, groupId: any,fields?: any);
    modifiesAGroup(agent: Agent, groupId: any, groupName: any,isActive?: any,notes?: any);
    removesAgentsFromAGroup(agent: Agent, groupId: any, removedAgentId: any);
    returnsAListOfAgentsAssignedToAGroup(agent: Agent, groupId: any, fields?: any);
    assignsAgentsToAGroup(agent: Agent, groupId: any, assignedAgentId: any);
}

export default class GroupManagementInstance {

    static getGroupManagementInstance(version?: APIVersion): IGroupManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new GroupManagementVersion12();
        }
    }
}