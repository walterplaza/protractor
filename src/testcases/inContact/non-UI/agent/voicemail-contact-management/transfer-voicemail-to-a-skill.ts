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
 * TC ID: AGV120017
 * Tested cluster: SC3
 */

let testCaseName: string = "Transfer Voicemail to a skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {

    let voicemailAgent: Agent;
    let skillId: number;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/voicemail-contact-management/transfer-voicemail-to-a-skill/transfer-voicemail-to-a-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = VoicemailContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            voicemailAgent = await TestCondition.setUpAgent(SkillType.VOICEMAIL);
            skillId = await CustomAPIs.getSkillIdFromSkillName(voicemailAgent, SkillType.VOICEMAIL);

            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a voicemail contact
                await voicemailAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(voicemailAgent, voicemailAgent.phoneNumber);
                await CustomAPIs.setAgentState(voicemailAgent, MaxState.AVAILABLE);
                await TestHelpers.startVoiceMail(voicemailAgent);
                await TestHelpers.waitForContactRouteToAgent(voicemailAgent)
                let contactId: number = await TestHelpers.getCurrentContactId(voicemailAgent, SkillCore.getSkillName(SkillType.VOICEMAIL), false);
                // transfer a voicemail contact
                res = await apiClass.transferVoicemailToASkill(voicemailAgent, voicemailAgent.sessionId, contactId, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(voicemailAgent);
            }
        });
    })
})
