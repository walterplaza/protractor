import PhoneCallManagementVersion12 from "@apis/agent/phone-call-management/phone-call-management-v12";
import PhoneCallManagementVersion6 from "@apis/agent/phone-call-management/phone-call-management-v6";
import PhoneCallManagementVersion2 from "@apis/agent/phone-call-management/phone-call-management-v2";
import PhoneCallManagementVersion8 from "@apis/agent/phone-call-management/phone-call-management-v8";
import PhoneCallManagementVersion7 from "@apis/agent/phone-call-management/phone-call-management-v7";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";

export interface IPhoneCallManagement {
    dialsAnAgentsPersonalQueue(agent: Agent, targetAgentId: any, parentContactId?: any)
    dialsAnOutboundCall(agent: Agent, phoneNumber: any, skillName?: any, skillID?: any, parentContactId?: any)
    dialsASkill(agent: Agent, skillID: any)
    dialAgentConsult(agent: Agent, agentUserName?: any, targetAgentId?: any, parentContactId?: any)
    sendDtmfTones(agent: Agent, dtmfSequence: any, toneDurationMS: any, toneSpacingMS?: any)
    acceptConsultRequest(agent: Agent, contactId: any)
    transferCall(agent: Agent);
    conferenceCallsTogether(agent: Agent);
    overrideAmdOnACall()
    recordACall(agent: Agent, contactId: any)
    masksARecordingWithWhiteNoise(agent: Agent, contactId: any)
    stopMaskingACallRecording(agent: Agent, contactId: any)
    dialAnIndependentCall()
    dispositionAnIndependentCall()

}
export default class PhoneCallManagementInstance {

    static getPhoneCallManagementInstance(): IPhoneCallManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new PhoneCallManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new PhoneCallManagementVersion2();
        } else if (TestRunInfo.versionAPI == APIVersion.V8) {
            return new PhoneCallManagementVersion8();
        } else if (TestRunInfo.versionAPI == APIVersion.V6) {
            return new PhoneCallManagementVersion6();
        } else if (TestRunInfo.versionAPI == APIVersion.V7) {
            return new PhoneCallManagementVersion7();
        }
    }
}  
