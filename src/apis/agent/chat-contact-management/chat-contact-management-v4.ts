import { IChatContactManagement } from "@apis/agent/chat-contact-management/chat-contact-management";
import { APIResponse, Options, APICore, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatContactManagementVersion4 implements IChatContactManagement {
    addAChatContact(agent: Agent) {
        throw new Error("Method not implemented.");
    } acceptAChatContact(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    rejectAChatContact(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    restoreAChatToAnActiveState(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    sendChatTextToThePatron(agent: Agent, contactId: any, chatText: any="Test"):Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }
    async transferToAgent(agent: Agent, contactId: any, targetAgentId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-agent`, Method.POST);
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
            let options = new Options(`${agent.baseUri}services/v4.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillId", targetSkillId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferToSkill, err.message);
        }
    }
    notifyPatronAgentIsTyping(agent: Agent, contactId: any, isTyping?: any, isTextEntered?: any) {
        throw new Error("Method not implemented.");
    }


}