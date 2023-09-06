
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import CustomAPIs from "@apis/custom-apis";
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
 * Tested cluster: SC3
 */

let testCaseName: string = "Set agent status";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
        await CustomAPIs.endAllContacts(chatAgent)
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let apiClass = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/set-agent-status/set-agent-status-${TestRunInfo.versionAPI}.json`);
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);     
            await chatAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());          
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV120060") {                    
                    let returnResponse: APIResponse = await apiClass.setAgentStatus(chatAgent, MaxState.AVAILABLE);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);

})
