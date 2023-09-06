import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import VoicemailContactManagementVersion12 from "@apis/agent/voicemail-contact-management/voicemail-contact-management-v12";
import { Agent } from "@data-objects/general/agent";
import VoicemailContactManagementVersion2 from "@apis/agent/voicemail-contact-management/voicemail-contact-management-v2";

export interface IVoicemailContactManagement {
    endAVoicemailContact(agent: Agent, contactId:any)
    playAVoicemail(agent: Agent, contactId:any, playTimestamp?:any, position?:any)
    pauseAVoicemail(agent: Agent, contactId:any);
    transferVoicemailToAnAgent(agent:Agent, sessionId: any, contactId:any, targetAgentId: any)
    transferVoicemailToASkill(agent:Agent, sessionId: any, contactId:any, targetSkillId: any)
}

export default class VoicemailContactManagementInstance {

    static getChatContactManagementInstance(): IVoicemailContactManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new VoicemailContactManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V2) {
            return new VoicemailContactManagementVersion2();
        }
    }
}