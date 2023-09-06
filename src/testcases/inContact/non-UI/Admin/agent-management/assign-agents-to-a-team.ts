import AgentManagement from "@apis/admin/agent-management/agent-management";
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
 * TC ID: ADV120047
 * Tested cluster: TC4
 */

let testCaseName: string = "Assign Agents to a Team";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let forceInactive: string = "false"
    let isCreateNew: boolean = false;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/assign-agents-to-a-team/assign-agents-to-a-team-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagement.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre condition            
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let teamIDOrg = await CustomAPIs.getTeamIDOfAgent(chatAgent);

            let teamId: string = await CustomAPIs.getRandomTeamId(chatAgent, teamIDOrg);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.assignAgentsToATeam(chatAgent, teamId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }

            await apiClass.assignAgentsToATeam(chatAgent, teamIDOrg);
        });
    })
})

