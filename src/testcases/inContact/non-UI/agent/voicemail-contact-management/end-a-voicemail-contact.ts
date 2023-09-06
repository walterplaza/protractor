import VoicemailContactManagementInstance from "@apis/agent/voicemail-contact-management/voicemail-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120013
 * Tested cluster: SC3
 */

let testCaseName: string = "End a Voicemail Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {

    let voicemailAgent: Agent;
    let res: APIResponse;
    let apiName: string = "end-a-voicemail-contact";
    let invalidString: string = "Invalid";
    let originSessionId: string;
    let originTokenId: string;
    let contactId: number;
    let generalContactId: any;

    beforeEach(async () => {
        voicemailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);

        //Pre-condition: Start a voicemail contact
        await voicemailAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(voicemailAgent, voicemailAgent.phoneNumber);
        await CustomAPIs.setAgentState(voicemailAgent, MaxState.AVAILABLE);
        await TestHelpers.startVoiceMail(voicemailAgent);
        await TestHelpers.waitForContactRouteToAgent(voicemailAgent)
        contactId = await CustomAPIs.getCurrentContactId(voicemailAgent, SkillCore.getSkillName(SkillType.VOICEMAIL));
        generalContactId = contactId;
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/voicemail-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let apiClass = VoicemailContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            originSessionId = voicemailAgent.sessionId;
            originTokenId = voicemailAgent.accessToken;
            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "AGV20112") {
                    let specialContactIdArray: Array<string> = Utility.injectTextWithSpecChars(contactId.toString());
                    for (let elementContactId of specialContactIdArray) {
                        res = await apiClass.endAVoicemailContact(voicemailAgent, elementContactId);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else {
                    if (testCaseData.Id == "AGV20108") {
                        voicemailAgent.accessToken = invalidString;
                    } else if (testCaseData.Id == "AGV20109") {
                        generalContactId = caseData.PathParams.contactId;
                    } else if (testCaseData.Id == "AGV20110") {
                        generalContactId = contactId.toString() + invalidString;
                    } else if (testCaseData.Id == "AGV20111") {
                        if (testCaseData.Data.indexOf(caseData) == 0) {
                            voicemailAgent.sessionId = caseData.PathParams.sessionId;
                        } else if (testCaseData.Data.indexOf(caseData) == 1) {
                            generalContactId = caseData.PathParams.contactId;
                        } else {
                            voicemailAgent.sessionId = caseData.PathParams.sessionId;
                            generalContactId = caseData.PathParams.contactId;
                        }
                    } else if (testCaseData.Id == "AGV20106") {
                        if (testCaseData.Data.indexOf(caseData) == 0) {
                            voicemailAgent.sessionId = invalidString;
                        } else {
                            generalContactId = caseData.PathParams.contactId
                        }
                    }
                    // End a voicemail contact
                    res = await apiClass.endAVoicemailContact(voicemailAgent, generalContactId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent.");
                    if (testCaseData.Id == "AGV120013") {
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent.");
                    }
                    else {
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent.");
                    }

                    // Return original sessionId for testcases have a lot of case data
                    if (testCaseData.Id == "AGV20111" || testCaseData.Id == "AGV20106") {
                        voicemailAgent.sessionId = originSessionId;
                    }
                }
            }
        });
    })

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // Post-condition: End all contact
            voicemailAgent.sessionId = originSessionId;
            voicemailAgent.accessToken = originTokenId;
            await CustomAPIs.endAllContacts(voicemailAgent);
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
