import GroupManagement from "@apis/admin/group-management/group-management";
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
 * TC ID: ADV120164
 * Tested cluster: TC4
 */

let testCaseName: string = "Removes agents from a group";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {

    let chatAgent: Agent;
    let dataFullTest = Utility.readJsonAPI(`admin/group-management/removes-agents-from-a-group/removes-agents-from-a-group-${TestRunInfo.versionAPI}.json`);
    let groupManagementAPI = GroupManagement.getGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let groupName: string = "ADV120164_" + Utility.createRandomString(5);
            let isActive: string = "false";

            for (let caseData of testCaseData.Data) {
                await groupManagementAPI.createGroups(chatAgent, groupName);
                let groupId: string = await CustomAPIs.getGroupIdByName(chatAgent, groupName);

                // Assign current agent to group
                await groupManagementAPI.assignsAgentsToAGroup(chatAgent, groupId, chatAgent.agentID);

                // Remove current agent from group created above
                let res: APIResponse = await groupManagementAPI.removesAgentsFromAGroup(chatAgent, groupId, chatAgent.agentID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");

                // Clean up                               
                await groupManagementAPI.modifiesAGroup(chatAgent, groupId, groupName, isActive);
            }
        });
    })
})
