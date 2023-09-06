import { IEmailContactManagement } from "@apis/agent/email-contact-management/email-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { APIVersion } from "@data-objects/general/cluster";

export default class EmailContactManagementVersion7 implements IEmailContactManagement {
    addAnEmailContact(agent: Agent, sessionId: any) {
        throw new Error("Method not implemented.");
    }
    createsAnOutboundEmailContact(agent: Agent, skillId: any, toAddress?: any, parentContactId?: any) {
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

    async forwardsAnEmail(agent: Agent, contactId: any, skillId: any = "", toAddress: any = "", subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${APIVersion.V7}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-forward`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId",skillId);
            options.addBody("toAddress", toAddress);
            options.addBody("subject", subject);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.forwardsAnEmail, err.message);
        }
    };

    async parksAnEmail(agent: Agent, contactId: any, toAddress: any = "", fromAddress: any = "", ccAddress: any = "", bccAddress: any = "", subject: any = "", bodyHtml: any = "", attachments: any = "", attachmentNames: any = "", isDraft: any = "", originalAttachmentNames: any = "") {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-park`, Method.POST);
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

    unparksAnEmail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    restoreAnEmail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
}
