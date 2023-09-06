import { IWorkItemAPI } from "@apis/patron/workitem-api/workitem-api";
import { Agent } from "@data-objects/general/agent";
import { APICore, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class WorkItemAPIVersion2 implements IWorkItemAPI {
    async createANewWorkItem(agent: Agent, pointOfContact: any = "", workItemId: any = "", workItemPayload: any = "", workItemType: any = "", from: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/interactions/work-items`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("pointOfContact", pointOfContact);
            options.addBody("workItemId", workItemId);
            options.addBody("workItemPayload", workItemPayload);
            options.addBody("workItemType", workItemType);
            options.addBody("from", from);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createANewWorkItem, err.message);
        }
    }
}

