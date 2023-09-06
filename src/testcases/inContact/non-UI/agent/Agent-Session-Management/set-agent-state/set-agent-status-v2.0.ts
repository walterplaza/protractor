
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV20173, AGV20174, AGV20175, AGV20176, AGV20177
 * Tested cluster: SC3
 */

let testCaseName: string = "Set agent status";

describe(`${testCaseName} - ${APIVersion.V2}`, function () {
    let chatAgent: Agent;
    let specialCharacterStates: string[];
    let specialCharacterReasons: string[];
    let validToken: string;
    let returnResponse: APIResponse

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await chatAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let agentSessionManagementClass = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/set-agent-status/set-agent-status-${APIVersion.V2}.json`);
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);
            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "AGV20176") {
                    let specialCharSessionIds: string[] = Utility.injectTextWithSpecChars(chatAgent.sessionId);
                    for (let specialCharSessionId of specialCharSessionIds) {
                        chatAgent.sessionId = specialCharSessionId;
                        returnResponse = await agentSessionManagementClass.setAgentStatus(chatAgent, MaxState.AVAILABLE);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code doesn't return as expectation");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header doesn't return as expectation");
                    }
                } else if (testCaseData.Id == "AGV20177") {

                    if (caseData.BodyParams.state == "specChars") {
                        specialCharacterStates = Utility.injectTextWithSpecChars(MaxState.AVAILABLE);
                        for (let specialCharacterState of specialCharacterStates) {
                            caseData.BodyParams.state = specialCharacterState;
                            returnResponse = await agentSessionManagementClass.setAgentStatus(chatAgent, caseData.BodyParams.state);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code doesn't return as expectation");
                            expect(returnResponse.header).toContain(caseData.Expected.statusDescription, "Header doesn't return as expectation");
                        }
                    } else if (caseData.BodyParams.reason == "specChars") {
                        specialCharacterReasons = Utility.injectTextWithSpecChars(Utility.createRandomString(12));
                        for (let specialCharacterReason of specialCharacterReasons) {
                            returnResponse = await agentSessionManagementClass.setAgentStatus(chatAgent, MaxState.AVAILABLE, specialCharacterReason);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code doesn't return as expectation");
                            expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header doesn't return as expectation");
                        }
                    }
                } else {               
                    if (testCaseData.Id == "AGV20174") {
                        chatAgent.accessToken = validToken + Utility.createRandomString(10, "lgvn_");
                    } else if (testCaseData.Id == "AGV20175") {
                        chatAgent.sessionId = caseData.PathParams.sessionId;
                    }

                    returnResponse = await agentSessionManagementClass.setAgentStatus(chatAgent, MaxState.AVAILABLE, caseData.BodyParams.reason);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code doesn't return as expectation");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header doesn't return as expectation");
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.authorize(chatAgent);
            await CustomAPIs.endAllContacts(chatAgent);
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
