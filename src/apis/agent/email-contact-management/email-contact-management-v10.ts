import { IEmailContactManagement } from "@apis/agent/email-contact-management/email-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class EmailContactManagementVersion10 implements IEmailContactManagement {
    addAnEmailContact(agent: Agent, sessionId: any) {
        throw new Error("Method not implemented.");
    }
    async createsAnOutboundEmailContact(agent: Agent, skillId: any, toAddress?: any, parentContactId?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v10.0/agent-sessions/${agent.sessionId}/interactions/email-outbound`, Method.POST);
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
    forwardsAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any) {
        throw new Error("Method not implemented.");
    }
    replyToAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any) {
        throw new Error("Method not implemented.");
    }
    sendsAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any) {
        throw new Error("Method not implemented.");
    }
    transferEmailToAnAgent(agent: Agent, contactId: any, targetAgentId: any) {
        throw new Error("Method not implemented.");
    }
    transferEmailToASkill(agent: Agent, contactId: any, targetSkillID: any) {
        throw new Error("Method not implemented.");
    }
    previewAnEmail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    parksAnEmail(agent: Agent, contactId: any, toAddress: any, fromAddress: any, ccAddress: any, bccAddress: any, subject: any, bodyHtml: any, attachments?: any, attachmentNames?: any, isDraft?: any, originalAttachmentNames?: any) {
        throw new Error("Method not implemented.");
    }
    unparksAnEmail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    restoreAnEmail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
}