import { IChatContactManagement } from "@apis/agent/chat-contact-management/chat-contact-management";
import { APIResponse, Options, APICore, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";


export default class ChatContactManagementVersion12 implements IChatContactManagement {

    async addAChatContact(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/add-chat`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.addAChatContact, err.message);
        }
    }

    async acceptAChatContact(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptAChatContact, err.message);
        }
    }

    async rejectAChatContact(agent: Agent, contactId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/reject`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.rejectAChatContact, err.message);
        }
    }

    async restoreAChatToAnActiveState(agent: Agent, contactId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/activate-chat`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.restoreAChatToAnActiveState, err.message);
        }
    }

    async sendChatTextToThePatron(agent: Agent, contactId: any, chatText: any="Test"):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/send-chat-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("chatText", chatText);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendChatTextToThePatron, err.message);
        }
    }

    async transferToAgent(agent: Agent, contactId: any, targetAgentId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferToAgent, err.message);
        }
    }
    async transferToSkill(agent: Agent, contactId: any, targetSkillId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillId", targetSkillId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferToSkill, err.message);
        }
    }
    async notifyPatronAgentIsTyping(agent: Agent, contactId: any, isTyping: any="", isTextEntered: any=""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/typing`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("isTyping", isTyping);
            options.addParam("isTextEntered", isTextEntered);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.notifyPatronAgentIsTyping, err.message);
        }
    }
}