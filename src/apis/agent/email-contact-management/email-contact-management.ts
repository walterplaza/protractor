import EmailContactManagementVersion12 from "@apis/agent/email-contact-management/email-contact-management-v12";
import EmailContactManagementVersion4 from "@apis/agent/email-contact-management/email-contact-management-v4";
import EmailContactManagementVersion7 from "@apis/agent/email-contact-management/email-contact-management-v7";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import EmailContactManagementVersion10 from "@apis/agent/email-contact-management/email-contact-management-v10";

export interface IEmailContactManagement {
    addAnEmailContact(agent: Agent, sessionId: any);
    createsAnOutboundEmailContact(agent: Agent, skillId: any, toAddress?: any, parentContactId?: any);
    forwardsAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any);
    replyToAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any);
    sendsAnEmail(agent: Agent, contactId: any, skillId: any, toAddress: any, subject: any);
    transferEmailToAnAgent(agent: Agent, contactId: any, targetAgentId: any);
    transferEmailToASkill(agent: Agent, contactId: any, targetSkillID: any);
    previewAnEmail(agent: Agent, contactId: any);
    parksAnEmail(agent: Agent, contactId: any, toAddress: any, fromAddress: any, ccAddress: any, bccAddress: any, subject: any, bodyHtml: any, attachments?: any, attachmentNames?: any, isDraft?: any, originalAttachmentNames?: any);
    unparksAnEmail(agent: Agent, contactId: any);
    restoreAnEmail(agent: Agent, contactId: any);
}
export default class EmailContactManagementInstance {

    static getEmailContactManagementInstance(): IEmailContactManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new EmailContactManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V7) {
            return new EmailContactManagementVersion7();
        } else if (TestRunInfo.versionAPI == APIVersion.V10) {
            return new EmailContactManagementVersion10();
        }
        else if (TestRunInfo.versionAPI == APIVersion.V4) {
            return new EmailContactManagementVersion4();
        }
    }
}