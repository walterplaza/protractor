import { IPhoneCallManagement } from "@apis/agent/phone-call-management/phone-call-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
export default class PhoneCallManagementVersion2 implements IPhoneCallManagement {

    async dialsAnAgentsPersonalQueue(agent: Agent, agentUserName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/dial-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agentUserName", agentUserName);            
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialsAnAgentsPersonalQueue, err.message);
        }
    }

    async dialsAnOutboundCall(agent: Agent, phoneNumber: any, skillName: any): Promise<APIResponse> {        
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/dial-phone`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber", phoneNumber);
            options.addParam("skillName", skillName);            
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialsAnOutboundCall, err.message);
        }
    }

    async dialsASkill(agent: Agent, skillName: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/dial-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skillName", skillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialsASkill, err.message);
        }
    }

    async sendDtmfTones(agent: Agent, dtmfSequence: any, toneDurationMS: any, toneSpacingMS: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/send-dtmf`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dtmfSequence", dtmfSequence);
            options.addParam("toneDurationMS", toneDurationMS);
            options.addParam("toneSpacingMS", toneSpacingMS);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendDtmfTones, err.message);
        }
    }

    async dialAgentConsult(agent: Agent, agentUserName: any = ""):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/consult-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agentUserName", agentUserName);            
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialAgentConsult, err.message);
        }
    }

    async transferCall(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/transfer-calls`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.transferCall, err.message);
        }
    }

    async conferenceCallsTogether(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/conference-calls`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.conferenceCallsTogether, err.message);
        }
    }

    async acceptConsultRequest(agent: Agent, contactId: any):Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept-consult`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptConsultRequest, err.message);
        }
    }
    overrideAmdOnACall() {
        throw new Error("Method not implemented.");
    }

    async masksARecordingWithWhiteNoise(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/mask`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.masksARecordingWithWhiteNoise, err.message);
        }
    }

    async stopMaskingACallRecording(agent: Agent, contactId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/unmask`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.stopMaskingACallRecording, err.message);
        }
    }

    dialAnIndependentCall() {
        throw new Error("Method not implemented.");
    }
    dispositionAnIndependentCall() {
        throw new Error("Method not implemented.");
    }

    async recordACall(agent: Agent, contactId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/record`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.recordACall, err.message);
        }
    }
}