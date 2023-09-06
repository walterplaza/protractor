import AgentManagement from "@apis/admin/agent-management/agent-management";
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
 * TC ID: ADV120025
 * Tested cluster: SC1
 */

let testCaseName: string = "Assigns Skills to an Agent";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let skillId: number;
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/assigns-skills-to-an-agent/assigns-skills-to-an-agent-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagement.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.assignsSkillsToAnAgent(chatAgent, skillId, 0, true);              
                
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");                
            }
        });
    })
})
