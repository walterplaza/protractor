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
 * TC ID: ADV120045
 * Tested cluster: TC4
 */

let testCaseName: string = "Remove Agents from a Team";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;          
    let teamName1: string = "ADV120045_" + Utility.createRandomString(5) + "_1";
    let teamName2: string = "ADV120045_" + Utility.createRandomString(5) + "_2";
    
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/remove-agents-from-a-team/remove-agents-from-a-team-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagement.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {

                // 1. Create 2 teams
                await apiClass.createATeam(chatAgent, teamName1);
                await apiClass.createATeam(chatAgent, teamName2);

                // 2. Get team ID from 2 teams
                let teamId1 = await CustomAPIs.getTeamIdByName(chatAgent, teamName1, TestRunInfo.versionAPI);
                let teamId2 = await CustomAPIs.getTeamIdByName(chatAgent, teamName2, TestRunInfo.versionAPI);

                // Remove team 2 from Chat Agent                
                let res: APIResponse = await apiClass.removeAgentsFromATeam(chatAgent, teamId2, teamId1, chatAgent);                                
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
