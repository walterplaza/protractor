import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120016
 * Tested cluster: HC16
 */

let testCaseName: string = "Get Agents List";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/get-agents-list/get-agents-list-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {

                let res: APIResponse = await apiClass.getAgentsList(agent);
                let expectedCode = caseData.Expected.statusCode;
                expect(res.status).toBe(expectedCode, "Status code does not match expected");
            }
        });
    });
})
