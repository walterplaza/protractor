import { IChatClientAPI } from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, Method, APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatClientAPIVersion1 implements IChatClientAPI {
    startsAChatSession(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }
    /**
     * Ends a chat session previously started with StartChat
     * @author Y.Le
     * @param {Agent} agent
     * @param {*} chatSession
     * @returns
     * @memberof ChatClientAPIVersion1
     */
    async endsAnActiveChatSession(agent: Agent, chatSession: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/contacts/chats/${chatSession}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endsAnActiveChatSession, err.message);
        }
    }
    getsAnyInboundChatTextFromAnActiveChatSession(agent: Agent, chatSession: any, timeout: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Sends text to members of the chat session
     * @param {Agent} agent
     * @param {*} chatSession
     * @param {*} label
     * @param {*} message
     * @returns
     * @memberof ChatClientAPIVersion1
     */
    async sendsTextToMembersOfTheChatSession(agent: Agent, chatSession: any = "", label: any = "", message: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/contacts/chats/${chatSession}/send-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("message", message);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsTextToMembersOfTheChatSession, err.message);
        }
    }

    notifyAgentPatronIsTyping(agent: Agent, chatSession: any, isTyping: any, isTextEntered: any, label: any) {
        throw new Error("Method not implemented.");
    }
    sendsAgentAChatPreview(agent: Agent, chatSession: any, previewText: any, label: any) {
        throw new Error("Method not implemented.");
    }
    sendsChatTranscriptViaEmail(agent: Agent, fromAddress: any, toAddress: any, emailBody: any) {
        throw new Error("Method not implemented.");
    }
    returnsChatProfileConfig(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }
}