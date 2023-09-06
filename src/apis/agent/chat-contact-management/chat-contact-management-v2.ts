import { IChatContactManagement } from "@apis/agent/chat-contact-management/chat-contact-management";
import { APIResponse, Options, APICore, Method } from "@utilities/general/api-core";
import { Agent } from "@data-objects/general/agent";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatContactManagementVersion2 implements IChatContactManagement {
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
    async sendChatTextToThePatron(agent: Agent, contactId: any, chatText: any="Test"):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/send-chat-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("chatText", chatText);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendChatTextToThePatron, err.message);
        }
    }
    transferToAgent(agent: Agent, contactId: any, targetAgentId: any) {
        throw new Error("Method not implemented.");
    }
    transferToSkill(agent: Agent, contactId: any, targetSkillId: any) {
        throw new Error("Method not implemented.");
    }
    notifyPatronAgentIsTyping(agent: Agent, contactId: any, isTyping?: any, isTextEntered?: any) {
        throw new Error("Method not implemented.");
    }


}