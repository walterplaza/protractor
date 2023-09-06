import WorkItemAPIVersion12 from "@apis/patron/workitem-api/workitem-api-v12";
import WorkItemAPIVersion2 from "@apis/patron/workitem-api/workitem-api-v2";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IWorkItemAPI {
    createANewWorkItem(agent: Agent, pointOfContact: any, workItemId?: any, workItemPayload?: any, workItemType?: any, from?: any);
}

export default class WorkItemAPI {
    static getWorkItemAPIInstance(): IWorkItemAPI {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new WorkItemAPIVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new WorkItemAPIVersion2();
        }
    }
}

