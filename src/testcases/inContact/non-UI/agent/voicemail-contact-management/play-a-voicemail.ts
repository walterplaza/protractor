import ChatContactManagementInstance from "@apis/agent/chat-contact-management/chat-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import VoicemailContactManagementInstance from "@apis/agent/voicemail-contact-management/voicemail-contact-management";
import TestHelpers from "@test-helpers/test-helpers";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120014
 * Tested cluster: SC3
 */

let testCaseName: string = "Play a Voicemail";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {

    let voicemailAgent: Agent;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/voicemail-contact-management/play-a-voicemail/play-a-voicemail-${TestRunInfo.versionAPI}.json`);
    let apiClass = VoicemailContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            voicemailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
            for (let caseData of testCaseData.Data) {
                let playTimestamp = caseData.BodyParams.playTimestamp;
                let position = caseData.BodyParams.position;

                //Pre-condition: Start a voicemail contact
                await voicemailAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(voicemailAgent, voicemailAgent.phoneNumber);
                await CustomAPIs.setAgentState(voicemailAgent, MaxState.AVAILABLE);
                await TestHelpers.startVoiceMail(voicemailAgent);
                await TestHelpers.waitForContactRouteToAgent(voicemailAgent)
                let contactId: number = await TestHelpers.getCurrentContactId(voicemailAgent, SkillCore.getSkillName(SkillType.VOICEMAIL), false);
                // Accept a voicemail contact
                await apiClass.pauseAVoicemail(voicemailAgent, contactId);
                res = await apiClass.playAVoicemail(voicemailAgent,contactId,playTimestamp,position)

                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(voicemailAgent);
            }
        });
    })
})
