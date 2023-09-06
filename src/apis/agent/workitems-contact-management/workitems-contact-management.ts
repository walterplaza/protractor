import { Agent } from "@data-objects/general/agent";
import WorkItemsContactManagementVersion12 from "@apis/agent/workitems-contact-management/workitems-contact-management-v12";
import WorkItemsContactManagementVersion2 from "@apis/agent/workitems-contact-management/workitems-contact-management-v2";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";

export interface IWorkItemsContactManagement {
    holdAWorkItem(agent: Agent, contactId?: any);
    resumeAWorkItem(agent: Agent, contactId: any);
    endAWorkItem(agent: Agent, contactId: any);
    acceptAWorkItem(agent: Agent, contactId: any);
    rejectAWorkItem(agent: Agent, contactId?: any);
}

export default class WorkItemsContactManagementInstance {

    static getWorkItemsContactManagementInstance(): IWorkItemsContactManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new WorkItemsContactManagementVersion12();
        }else if(TestRunInfo.versionAPI == APIVersion.V2){
            return new WorkItemsContactManagementVersion2();
        }
    }
}