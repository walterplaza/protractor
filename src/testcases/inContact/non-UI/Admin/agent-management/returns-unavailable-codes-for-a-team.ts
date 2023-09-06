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
 * TC ID: ADV120049
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns Unavailable Codes for a Team";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let teamName: string = "ADV120049_" + Utility.createRandomString(5);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/returns-unavailable-codes-for-a-team/returns-unavailable-codes-for-a-team-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagement.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                await apiClass.createATeam(chatAgent, teamName);
                let teamId = await CustomAPIs.getTeamIdByName(chatAgent, teamName, TestRunInfo.versionAPI);
                let res: APIResponse = await apiClass.returnsUnavailableCodesForATeam (chatAgent, teamId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
