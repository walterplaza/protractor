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
 * TC ID: ADV120046
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns a Team’s Agents";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let teamName: string = "ADV120046" + Utility.createRandomString(5);
    let forceInactive: string = "false"

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/returns-a-team-agents/returns-a-team-agents-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagement.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let teamId: string = await CustomAPIs.getRandomTeamId(chatAgent);
            if(teamId == "No result"){
                await apiClass.createATeam(chatAgent, teamName);}
            for (let caseData of testCaseData.Data) {
                let teamId = await CustomAPIs.getTeamIdByName(chatAgent, teamName, TestRunInfo.versionAPI);
                let res: APIResponse = await apiClass.returnsATeamsAgents(chatAgent, teamId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
            if(teamId == "No result"){
                await apiClass.updateATeam(chatAgent, teamId, teamName, forceInactive);
            } 
        });
    })
})
