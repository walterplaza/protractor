import ChatClientAPIVersion1 from "@apis/patron/chat-client-api/chat-client-api-v1";
import ChatClientAPIVersion10 from "@apis/patron/chat-client-api/chat-client-api-v10";
import ChatClientAPIVersion12 from "@apis/patron/chat-client-api/chat-client-api-v12";
import ChatClientAPIVersion8 from "@apis/patron/chat-client-api/chat-client-api-v8";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IChatClientAPI {
    startsAChatSession(agent: Agent, pointOfContact: any);
    endsAnActiveChatSession(agent: Agent, chatSession: any);
    getsAnyInboundChatTextFromAnActiveChatSession(agent: Agent, chatSession: any, timeout: any);
    sendsTextToMembersOfTheChatSession(agent: Agent, chatSession: any, label: any, message: any);
    notifyAgentPatronIsTyping(agent: Agent, chatSession: any, isTyping: any, isTextEntered: any, label: any);
    sendsAgentAChatPreview(agent: Agent, chatSession: any, previewText: any, label: any);
    sendsChatTranscriptViaEmail(agent: Agent, fromAddress: any, toAddress: any, emailBody: any);
    returnsChatProfileConfig(agent: Agent, pointOfContact: any);
}

export default class ChatClientAPI {

    static getChatClientAPIInstance(): IChatClientAPI {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new ChatClientAPIVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V1) {
            return new ChatClientAPIVersion1();
        } else if (TestRunInfo.versionAPI == APIVersion.V8) {
            return new ChatClientAPIVersion8();
        } else if (TestRunInfo.versionAPI == APIVersion.V10) {
            return new ChatClientAPIVersion10();
        }
    }
}