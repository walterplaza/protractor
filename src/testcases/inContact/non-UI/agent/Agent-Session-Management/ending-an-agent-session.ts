
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * Tested cluster: SC3
 * ID: AGV120056
 */

let testCaseName: string = "Ending an agent session";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let chatAgentDefault: Agent;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
        await CustomAPIs.endAllContacts(chatAgent);
        chatAgentDefault = chatAgent;
    }, TestRunInfo.conditionTimeout);

    // Read Data  
    let apiClassAgentSessionManagement = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/ending-an-agent-session/ending-an-agent-session-${TestRunInfo.versionAPI}.json`);
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV20008") {
                    let sessionIdWithSpecialCharList: Array<string> = Utility.injectTextWithSpecChars(chatAgent.sessionId);
                    for (let sessionIdWithSpecialChar of sessionIdWithSpecialCharList) {
                        chatAgent.sessionId = sessionIdWithSpecialChar;
                        res = await apiClassAgentSessionManagement.endingAnAgentSession(chatAgent);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else {
                    if (testCaseData.Id == "AGV20006") {
                        chatAgent.accessToken = chatAgent.accessToken + "_Invalid";
                    } else if (testCaseData.Id == "AGV20007") {
                        chatAgent.sessionId = caseData.PathParams.sessionId
                    } else if (testCaseData.Id == "AGV20009") {
                        chatAgent.sessionId = chatAgent.sessionId + "_Invalid"
                    }
                    res = await apiClassAgentSessionManagement.endingAnAgentSession(chatAgent);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(chatAgentDefault, SkillType.CHAT);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
