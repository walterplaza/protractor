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
 * TC ID: ADV120161
 * Tested cluster: TC4
 */

let testCaseName: string = "Create Groups";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {

    let chatAgent: Agent;
    let dataFullTest = Utility.readJsonAPI(`admin/group-management/create-groups/create-groups-${TestRunInfo.versionAPI}.json`);
    let groupManagementAPI = GroupManagement.getGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            let groupName: string = "ADV120161_" + Utility.createRandomString(5);
            let isActive: string = "false";
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await groupManagementAPI.createGroups(chatAgent, groupName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");

                // Clean up
                let groupId: string = await CustomAPIs.getGroupIdByName(chatAgent, groupName);
                await groupManagementAPI.modifiesAGroup(chatAgent, groupId, groupName, isActive);
            }
        });
    })
})
