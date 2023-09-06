import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120026
 * Tested cluster: SC3
 */

let testCaseName: string = "Modify Skill assignments for an Agent";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let skillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/modify-skill-assignments-for-an-agent/modify-skill-assignments-for-an-agent-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                skillId = await CustomAPIs.getSkillIdFromSkillName(agent, SkillType.CHAT);
                let res: APIResponse = await apiClass.modifySkillAssignmentsForAnAgent(agent, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
})
