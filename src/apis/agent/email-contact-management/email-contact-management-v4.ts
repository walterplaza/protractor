import { IEmailContactManagement } from "@apis/agent/email-contact-management/email-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { APIVersion } from "@data-objects/general/cluster";

export default class EmailContactManagementVersion4 implements IEmailContactManagement {
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
    async transferEmailToAnAgent(agent: Agent, contactId: any, targetAgentId: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-email-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferEmailToAnAgent, err.message);
        }
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
    async forwardsAnEmail(agent: Agent, contactId: any, skillId: any = "", toAddress: any = "", subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${APIVersion.V4}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-forward`, Method.POST);
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
}
