import { IChatClientAPI } from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatClientAPIVersion8 implements IChatClientAPI {

    startsAChatSession(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }

    endsAnActiveChatSession(agent: Agent, chatSession: any) {
        throw new Error("Method not implemented.");
    }

    getsAnyInboundChatTextFromAnActiveChatSession(agent: Agent, chatSession: any, timeout: any = 30) {
        throw new Error("Method not implemented.");
    }

    sendsTextToMembersOfTheChatSession(agent: Agent, chatSession: any, label: any, message: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Notify Agent Patron is Typing
     * @param {Agent} agent 
     * @param chatSession 
     * @param isTyping 
     * @param isTextEntered 
     * @param label 
     * @memberof ChatClientAPIVersion8
     */
    async notifyAgentPatronIsTyping(agent: Agent, chatSession: any = "", isTyping: any = true, isTextEntered: any = true, label: any = "testLabel"): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v8.0/contacts/chats/${chatSession}/typing`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("isTyping", isTyping);
            options.addBody("isTextEntered", isTextEntered);
            options.addBody("label", label);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.notifyAgentPatronIsTyping, err.message);
        }
    }

    /**
     * Sends Agent a Chat Preview
     * @param {Agent} agent
     * @param {*} chatSession
     * @param {*} [previewText=""]
     * @param {*} [label="testLabel"]
     * @returns
     * @memberof ChatClientAPIVersion8
     */
    async sendsAgentAChatPreview(agent: Agent, chatSession: any = "", previewText: any = "", label: any = "testLabel"): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v8.0/contacts/chats/${chatSession}/typing-preview`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("previewText", previewText);
            options.addBody("label", label);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsAgentAChatPreview, err.message);
        }
    }

    sendsChatTranscriptViaEmail(agent: Agent, fromAddress: any = "", toAddress: any = "", emailBody: any = "test email body") {
        throw new Error("Method not implemented.");
    }

    returnsChatProfileConfig(agent: Agent, pointOfContact: any) {
        throw new Error("Method not implemented.");
    }
}