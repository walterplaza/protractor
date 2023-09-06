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
 * TC ID: ADV120165
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns a list of agents assigned to a group";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {

    let chatAgent: Agent;
    let dataFullTest = Utility.readJsonAPI(`admin/group-management/returns-a-list-of-agents-assigned-to-a-group/returns-a-list-of-agents-assigned-to-a-group-${TestRunInfo.versionAPI}.json`);
    let groupManagementAPI = GroupManagement.getGroupManagementInstance();
    let groupName: string;
    let groupId: string;

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            // Pre condition            
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            groupName = "ADV120165" + Utility.createRandomString(5);
            groupId = await CustomAPIs.getRandomGroupId(chatAgent);
            if (groupId == "No result") {
                await groupManagementAPI.createGroups(chatAgent, groupName);
                groupId = await CustomAPIs.getRandomGroupId(chatAgent);
            }
            for (let caseData of testCaseData.Data) {
                await groupManagementAPI.assignsAgentsToAGroup(chatAgent, groupId, chatAgent.agentID);
                let res: APIResponse = await groupManagementAPI.returnsAListOfAgentsAssignedToAGroup(chatAgent, groupId, groupName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post condition
            await groupManagementAPI.modifiesAGroup(chatAgent, groupId, groupName, "false");
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
