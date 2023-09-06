import { IEmailContactManagement } from "@apis/agent/email-contact-management/email-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class EmailContactManagementVersion12 implements IEmailContactManagement {


    async addAnEmailContact(agent: Agent, sessionId: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/add-email`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.addAnEmailContact, err.message);
        }
    };

    async createsAnOutboundEmailContact(agent: Agent, skillId: any, toAddress: any = "", parentContactId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/email-outbound`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skillId", skillId);
            options.addParam("toAddress", toAddress);
            options.addParam("parentContactId", parentContactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createsAnOutboundEmailContact, err.message);
        }
    }

    async forwardsAnEmail(agent: Agent, contactId: any, skillId: any = "", toAddress: any = "", subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-forward`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"skillId":"${skillId}","toAddress":"${toAddress}","fromAddress":"","ccAddress":"","bccAddress":"","subject":"${subject}","bodyHtml":"","attachments":"","attachmentNames":"","originalAttachmentNames":""}`;
            return await APICore.requestJson(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.forwardsAnEmail, err.message);
        }
    };

    async replyToAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-reply`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"skillId":"${skillId}","toAddress":"${toAddress}","fromAddress":"","ccAddress":"","bccAddress":"","subject":"${subject}","bodyHtml":"","attachments":"","attachmentNames":"","originalAttachmentNames":""}`;
            return await APICore.requestJson(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.replyToAnEmail, err.message);
        }
    }

    async transferEmailToASkill(agent: Agent, contactId: any, targetSkillID: any ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-email-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("targetSkillID", targetSkillID);
            return await APICore.request(options);
            
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferEmailToASkill, err.message);
        }
    };
    async parksAnEmail(agent: Agent, contactId: any, toAddress: any = "", fromAddress: any = "", ccAddress: any = "", bccAddress: any = "", subject: any = "", bodyHtml: any = "", attachments: any = "", attachmentNames: any = "", isDraft: any = "", originalAttachmentNames: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-park`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("toAddress", toAddress);
            options.addParam("fromAddress", fromAddress);
            options.addParam("ccAddress", ccAddress);
            options.addParam("bccAddress", bccAddress);
            options.addParam("subject", subject);
            options.addParam("bodyHtml", bodyHtml);
            options.addParam("attachments", attachments);
            options.addParam("attachmentNames", attachmentNames);
            options.addParam("isDraft", isDraft);
            options.addParam("originalAttachmentNames", originalAttachmentNames);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.parksAnEmail, err.message);
        }
    };
    async previewAnEmail(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-preview`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.previewAnEmail, err.message);
        }
    }
    async unparksAnEmail(agent: Agent, contactId: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-unpark`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.previewAnEmail, err.message);
        }
    };
    async restoreAnEmail(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-restore`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.restoreAnEmail, error.message);
        }
    }
    async transferEmailToAnAgent(agent: Agent, contactId: any, targetAgentId: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-email-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferEmailToAnAgent, err.message);
        }
    };
    async sendsAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-send`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let bodyJson: string = `{"skillId":"${skillId}","toAddress":"${toAddress}","fromAddress":"","ccAddress":"","bccAddress":"","subject":"${subject}","bodyHtml":"","attachments":"","attachmentNames":"","originalAttachmentNames":""}`;
            return await APICore.requestJson(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsAnEmail, err.message);
        }
    };
}
