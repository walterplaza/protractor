import { IVoicemailContactManagement } from "@apis/agent/voicemail-contact-management/voicemail-contact-management";
import { Agent } from "@data-objects/general/agent";
import { APIResponse, APICore, Options, Method } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class VoicemailContactManagementVersion12 implements IVoicemailContactManagement{
    async endAVoicemailContact(agent: Agent, contactId:any): Promise<APIResponse> {
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.endAVoicemailContact, err.message);
        }
    }
    async playAVoicemail(agent: Agent, contactId:any, playTimestamp:any="", position:any=""): Promise<APIResponse> {
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/play-voicemail`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("playTimestamp",playTimestamp);
            options.addParam("position",position);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.playAVoicemail, err.message);
        }
    }
    async pauseAVoicemail(agent: Agent, contactId:any): Promise<APIResponse> {
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/pause-voicemail`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.pauseAVoicemail, err.message);
        }
    }
    async transferVoicemailToAnAgent(agent:Agent, sessionId: any, contactId:any, targetAgentId: any): Promise<APIResponse> {
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${sessionId}/interactions/${contactId}/transfer-voicemail-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("targetAgentId",targetAgentId)
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.transferVoicemailToAnAgent, err.message);
        }
    }
    async transferVoicemailToASkill(agent:Agent, sessionId: any, contactId:any, targetSkillId: any): Promise<APIResponse>{
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/agent-sessions/${sessionId}/interactions/${contactId}/transfer-voicemail-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("targetSkillId",targetSkillId)
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.transferVoicemailToAnAgent, err.message);
        }
    }
}