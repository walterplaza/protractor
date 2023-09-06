import { IChatClientAPI } from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatClientAPIVersion10 implements IChatClientAPI {

    startsAChatSession(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }

    endsAnActiveChatSession(agent: Agent, chatSession: any) {
        throw new Error("Method not implemented.");
    }

    getsAnyInboundChatTextFromAnActiveChatSession(agent: Agent, chatSession: any, timeout: any = 30) {
        throw new Error("Method not implemented.");
    }

    /**
     * Sends text to members of the chat session
     * @param {Agent} agent
     * @param {*} chatSession
     * @param {*} label
     * @param {*} message
     * @returns
     * @memberof ChatClientAPIVersion10
     */
    async sendsTextToMembersOfTheChatSession(agent: Agent, chatSession: any = "", label: any = "", message: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v10.0/contacts/chats/${chatSession}/send-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("message", message);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsTextToMembersOfTheChatSession, err.message);
        }
    }

    notifyAgentPatronIsTyping(agent: Agent, chatSession: any, isTyping: any = true, isTextEntered: any = true, label: any = "testLabel") {
        throw new Error("Method not implemented.");
    }

    sendsAgentAChatPreview(agent: Agent, chatSession: any, previewText: any = "", label: any = "testLabel") {
        throw new Error("Method not implemented.");
    }

    sendsChatTranscriptViaEmail(agent: Agent, fromAddress: any = "", toAddress: any = "", emailBody: any = "test email body") {
        throw new Error("Method not implemented.");
    }

    returnsChatProfileConfig(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }
}