import { IVoicemailContactManagement } from "@apis/agent/voicemail-contact-management/voicemail-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APIResponse, Options, APICore, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";


export default class VoicemailContactManagementVersion2 implements IVoicemailContactManagement {
    
    async endAVoicemailContact(agent: Agent, contactId:any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch(err) {
            throw new errorwrapper.CustomError(this.endAVoicemailContact, err.message);
        }
    }
    playAVoicemail(agent: Agent, contactId: any, playTimestamp?: any, position?: any) {
        throw new Error("Method not implemented.");
    }
    pauseAVoicemail(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }
    transferVoicemailToAnAgent(agent: Agent, sessionId: any, contactId: any, targetAgentId: any) {
        throw new Error("Method not implemented.");
    }
    transferVoicemailToASkill(agent: Agent, sessionId: any, contactId: any, targetSkillId: any) {
        throw new Error("Method not implemented.");
    }


}