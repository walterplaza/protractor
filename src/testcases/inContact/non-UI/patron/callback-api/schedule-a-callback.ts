import CustomAPIs from "@apis/custom-apis";
import callbackAPIInstance from "@apis/patron/callback-api/callback-api";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: PTV120002
 * Tested cluster: SC3
 */

let testCaseName: string = "Schedule a callback";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let monitorAgent: Agent;
    let promiseDate: String;

    let dataFullTest = Utility.readJsonAPI(`patron/callback-api/schedule-a-callback/schedule-a-callback-${TestRunInfo.versionAPI}.json`);
    let requestCallbackAPI = callbackAPIInstance.getCallbackAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            monitorAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);
            let skillId = await CustomAPIs.getSkillIdFromSkillName(monitorAgent, SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {
                promiseDate = await Utility.getNowDate("/", +5);
                let returnResponse: APIResponse = await requestCallbackAPI.scheduleACallback(monitorAgent, caseData.BodyParams.firstName, caseData.BodyParams.lastName, monitorAgent.phoneNumber, skillId, promiseDate);
                expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }
        });

        afterEach(async () => {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.OB_PHONE);
            }
            catch (err) {
            }

        }, TestRunInfo.conditionTimeout);
    })
})
