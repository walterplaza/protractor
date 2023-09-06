
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
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
 */

let testCaseName: string = "Starts an agent session";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obAgent: Agent;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        obAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let apiClass = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/starts-an-agent-session/starts-an-agent-session-${TestRunInfo.versionAPI}.json`);
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV120054") {
                    await obAgent.createPhoneNumber();
                    let returnResponse: APIResponse = await apiClass.startsAnAgentSession(obAgent, obAgent.randomPhoneNumber(), "", "", "", "");
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(obAgent, SkillType.OB_PHONE);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);

})
