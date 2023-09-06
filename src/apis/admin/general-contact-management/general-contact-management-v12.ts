import { IGeneralContactManagement } from "@apis/admin/general-contact-management/general-contact-management";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, Method, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class GeneralContactManagementVersion12 implements IGeneralContactManagement {
    async returnsAChatTranscript(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/chat-transcript`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAChatTranscript, err.message);
        }
    }
    async returnsAContactsFiles(agent: Agent, contactId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/files`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields)
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAContactsFiles, err.message);
        }
    }
    async forceAContactToBeDisconnectedAndToEnd(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.forceAContactToBeDisconnectedAndToEnd, err.message);
        }
    }
    async startsMonitoringAPhoneCall(agent: Agent, contactId: any, phoneNumber: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/monitor`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber", phoneNumber)
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.startsMonitoringAPhoneCall, error.message);
        }
    }
    async allowsToBeginTheRecordingOfAnActivePhoneCall(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/record`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.allowsToBeginTheRecordingOfAnActivePhoneCall, error.message);
        }
    }
    async assignsTagsToAContact(agent: Agent, contactId: any, tagId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"tags": [{"tagId": "${tagId}"}]}`
            return await APICore.request(options, json);
        } catch (error) {
            throw new errorwrapper.CustomError(this.assignsTagsToAContact, error.message);
        }
    }
    async returnsAnEmailTranscript(agent: Agent, contactId: any, includeAttachments: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/${contactId}/email-transcript`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeAttachments", includeAttachments)
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAnEmailTranscript, err.message);
        }
    }

    async returnsAListOfContactStates(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contact-state-descriptions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfContactStates, err.message);
        }
    }

    async returnsASingleContactState(agent: Agent, contactStateId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contact-state-descriptions/${contactStateId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASingleContactState, err.message);
        }
    }

    async createASignalForAContact(agent: Agent, contactId: any, customData: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/interactions/${contactId}/signal`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("customData", customData);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createASignalForAContact, err.message);
        }
    }
}