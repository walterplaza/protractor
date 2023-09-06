import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120042
 * Tested cluster: HC16
 */

let testCaseName: string = "Masks a recording with white noise";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let contactId: number;

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/masks-a-recording-with-white-noise/masks-a-recording-with-white-noise-${TestRunInfo.versionAPI}.json`);
    let apiClass = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            agent = await TestCondition.registerAgent(SkillType.IB_Phone);
            for (let caseData of testCaseData.Data) {

                // Pre-condition
                await agent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
                await CustomAPIs.setAgentState(agent, MaxState.AVAILABLE);
                let resCall: APIResponse = await CustomAPIs.startInboundCall(agent, SkillType.IB_Phone);
                await CustomAPIs.waitForContactRouteToAgent(agent)
                contactId = await CustomAPIs.getCurrentContactId(agent,SkillCore.getSkillName(SkillType.IB_Phone));
                await apiClass.recordACall(agent,contactId)

                let res: APIResponse = await apiClass.masksARecordingWithWhiteNoise(agent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            await apiClass.stopMaskingACallRecording(agent, contactId);
            await CustomAPIs.endAllContacts(agent);
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})