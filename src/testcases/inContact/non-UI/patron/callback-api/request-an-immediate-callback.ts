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
 * TC ID: PTV120001
 * Tested cluster: TC4
 */

let testCaseName: string = "Request an immediate callback";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let monitorAgent: Agent;
    
    let dataFullTest = Utility.readJsonAPI(`patron/callback-api/request-an-immediate-callback/request-an-immediate-callback-${TestRunInfo.versionAPI}.json`);
    let requestCallbackAPI = callbackAPIInstance.getCallbackAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            monitorAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await CustomAPIs.endAllContacts(monitorAgent);
            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);

            for (let caseData of testCaseData.Data) {
                    let returnResponse: APIResponse = await requestCallbackAPI.requestAnImmediateCallback(monitorAgent,monitorAgent.phoneNumber);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }
        });

        afterEach(async () => {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.CHAT);
            }
            catch (err) {
            }

        }, TestRunInfo.conditionTimeout);
    })
})
