import { IGeneralContactManagement } from "@apis/admin/general-contact-management/general-contact-management";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, Method, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class GeneralContactManagementVersion7 implements IGeneralContactManagement {
    returnsAContactsFiles(agent: Agent, contactId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    forceAContactToBeDisconnectedAndToEnd(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    startsMonitoringAPhoneCall(agent: Agent, contactId: any, phoneNumber: any) {
        throw new Error("Method not implemented.");
    }
    allowsToBeginTheRecordingOfAnActivePhoneCall(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    assignsTagsToAContact(agent: Agent, contactId: any, tagId: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfContactStates(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsASingleContactState(agent: Agent, contactStateId: any) {
        throw new Error("Method not implemented.");
    }
    createASignalForAContact(agent: Agent, contactId: any, customData?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAChatTranscript(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    
    
    async returnsAnEmailTranscript(agent: Agent, contactId: any, includeAttachments: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/contacts/${contactId}/email-transcript`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeAttachments", includeAttachments)
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAnEmailTranscript, err.message);
        }
    }

    
}