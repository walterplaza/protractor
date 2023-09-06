import TestRunInfo from "@data-objects/general/test-run-info";
import { APIVersion } from "@data-objects/general/cluster";
import GeneralContactManagementVersion12 from "@apis/admin/general-contact-management/general-contact-management-v12";
import GeneralContactManagementVersion7 from "@apis/admin/general-contact-management/general-contact-management-v7";
import { Agent } from "@data-objects/general/agent";
import GeneralContactManagementVersion2 from "@apis/admin/general-contact-management/general-contact-management-v2";

export interface IGeneralContactManagement {
    returnsAChatTranscript(agent: Agent, contactId: any)
    returnsAnEmailTranscript(agent: Agent, contactId: any,includeAttachments?: any)
    returnsAContactsFiles(agent: Agent, contactId: any,fields?: any)
    forceAContactToBeDisconnectedAndToEnd(agent: Agent, contactId: any)
    startsMonitoringAPhoneCall(agent: Agent, contactId: any, phoneNumber: any);
    allowsToBeginTheRecordingOfAnActivePhoneCall(agent: Agent, contactId: any);
    assignsTagsToAContact(agent: Agent, contactId: any, tagId: any);
    returnsAListOfContactStates(agent: Agent)
    returnsASingleContactState(agent: Agent, contactStateId: any)
    createASignalForAContact(agent: Agent, contactId: any, customData?: any)
}
export default class GeneralContactManagementInstance {
    static getGeneralContactManagementInstance(): IGeneralContactManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new GeneralContactManagementVersion12();
        }else if (TestRunInfo.versionAPI == APIVersion.V7){
                return new GeneralContactManagementVersion7();
        } else if (TestRunInfo.versionAPI == APIVersion.V2){
                return new GeneralContactManagementVersion2(); }
    }
}