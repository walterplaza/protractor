import { IChatClientAPI } from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { Options, APICore, APIResponse, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class ChatClientAPIVersion12 implements IChatClientAPI {

    /**
     * Starts A Chat Session
     * @param {Agent} agent
     * @param pointOfContact
     * @memberof ChatClientAPIVersion12
     */
    async startsAChatSession(agent: Agent, pointOfContact: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("pointOfContact", pointOfContact);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startsAChatSession, err.message);
        }
    }

    /**
     * Ends an active Chat Session
     * @param {Agent} agent  
     * @param chatSession 
     * @memberof ChatClientAPIVersion12
     */
    async endsAnActiveChatSession(agent: Agent, chatSession: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/${chatSession}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endsAnActiveChatSession, err.message);
        }
    }

    /**
     * Gets any inbound chat text from an active chat session
     * @param {Agent} agent 
     * @param chatSession 
     * @param timeout 
     * @memberof ChatClientAPIVersion12
     */
    async getsAnyInboundChatTextFromAnActiveChatSession(agent: Agent, chatSession: any, timeout: any = 30) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/${chatSession}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("timeout", timeout);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getsAnyInboundChatTextFromAnActiveChatSession, err.message);
        }
    }

    /**
     * Sends text to members of the chat session
     * @param {Agent} agent  
     * @param chatSession 
     * @param label 
     * @param message 
     * @memberof ChatClientAPIVersion12
     */
    async sendsTextToMembersOfTheChatSession(agent: Agent, chatSession: any, label: any, message: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/${chatSession}/send-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("message", message);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsTextToMembersOfTheChatSession, err.message);

        }
    }

    /**
     * Notify Agent Patron is Typing
     * @param {Agent} agent 
     * @param chatSession 
     * @param isTyping 
     * @param isTextEntered 
     * @param label 
     * @memberof ChatClientAPIVersion12
     */
    async notifyAgentPatronIsTyping(agent: Agent, chatSession: any, isTyping: any = true, isTextEntered: any = true, label: any = "testLabel") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/${chatSession}/typing`, Method.POST);
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

    async sendsAgentAChatPreview(agent: Agent, chatSession: any, previewText: any = "", label: any = "testLabel") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/${chatSession}/typing-preview`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("previewText", previewText);
            options.addBody("label", label);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsAgentAChatPreview, err.message);
        }
    }

    /**
      *Sends chat transcript via email
     * @param {Agent} agent
     * @param fromAddress
     * @param toAddress
     * @param emailBody
     * @memberof ChatClientAPIVersion12
     */
    async sendsChatTranscriptViaEmail(agent: Agent, fromAddress: any = "", toAddress: any = "", emailBody: any = "test email body") {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/contacts/chats/send-email`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fromAddress", fromAddress);
            options.addBody("toAddress", toAddress);
            options.addBody("emailBody",emailBody )
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendsChatTranscriptViaEmail, err.message);
        }
    }

    async returnsChatProfileConfig(agent: Agent, pointOfContact: any) {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0//points-of-contact/${pointOfContact}/chat-profile`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsChatProfileConfig, err.message);
        }
    }
}