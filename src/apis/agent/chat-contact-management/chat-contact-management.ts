import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import ChatContactManagementVersion12 from "@apis/agent/chat-contact-management/chat-contact-management-v12";
import { Agent } from "@data-objects/general/agent";
import ChatContactManagementVersion2 from "@apis/agent/chat-contact-management/chat-contact-management-v2";
import ChatContactManagementVersion4 from "@apis/agent/chat-contact-management/chat-contact-management-v4";

export interface IChatContactManagement {
    addAChatContact(agent: Agent)
    acceptAChatContact(agent: Agent, contactId: any)
    rejectAChatContact(agent: Agent, contactId: any)
    restoreAChatToAnActiveState(agent: Agent, contactId: any)
    sendChatTextToThePatron(agent: Agent, contactId: any, chatText?: any)
    transferToAgent(agent: Agent, contactId: any, targetAgentId: any)
    transferToSkill(agent: Agent, contactId: any, targetSkillId: any)
    notifyPatronAgentIsTyping(agent: Agent, contactId: any, isTyping?: any, isTextEntered?: any)
}

export default class ChatContactManagementInstance {

    static getChatContactManagementInstance(): IChatContactManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new ChatContactManagementVersion12();
        }
        else if (TestRunInfo.versionAPI == APIVersion.V2){
            return new ChatContactManagementVersion2();
        }
        else if (TestRunInfo.versionAPI == APIVersion.V4){
            return new ChatContactManagementVersion4();
        }
    }
}