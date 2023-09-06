import { IPhoneCallManagement } from "@apis/agent/phone-call-management/phone-call-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class PhoneCallManagementVersion8 implements IPhoneCallManagement {
    
    acceptConsultRequest(agent: Agent, contactId: any) {
        throw new Error("Method not implemented.");
    }

    dialsAnAgentsPersonalQueue(agent: Agent, agentUserName: any = ""): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    async dialsAnOutboundCall(agent: Agent, phoneNumber: any, skillName: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v8.0/agent-sessions/${agent.sessionId}/dial-phone`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber", phoneNumber);
            options.addParam("skillName", skillName);            
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.dialsAnOutboundCall, err.message);
        }
    }

    dialsASkill(agent: Agent, skillID: any): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    sendDtmfTones(agent: Agent, dtmfSequence: any, toneDurationMS: any, toneSpacingMS: any = ""): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    dialAgentConsult(agent: Agent, agentUserName: any = ""):Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    transferCall(agent: Agent): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    conferenceCallsTogether(agent: Agent): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    aacceptConsultRequest(agent: Agent, contactId: any):Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }
    overrideAmdOnACall() {
        throw new Error("Method not implemented.");
    }

    masksARecordingWithWhiteNoise(agent: Agent, contactId: any): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    stopMaskingACallRecording(agent: Agent, contactId: any = ""): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }

    dialAnIndependentCall() {
        throw new Error("Method not implemented.");
    }
    dispositionAnIndependentCall() {
        throw new Error("Method not implemented.");
    }

    recordACall(agent: Agent, contactId: any): Promise<APIResponse> {
        throw new Error("Method not implemented.");
    }
}