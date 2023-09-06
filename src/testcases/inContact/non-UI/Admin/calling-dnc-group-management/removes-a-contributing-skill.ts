import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120142
 * Tested cluster: SC3
 */

let testCaseName: string = "Removes a Contributing Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/removes-a-contributing-skill/removes-a-contributing-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);
            for (let caseData of testCaseData.Data) {
                let res1: APIResponse = await apiClass.returnsListOfDncGroups(chatAgent);
                let dncGroupId = await parseInt(JsonUtility.getFieldValue(res1.body,"resultSet.dncGroups[0].dncGroupId").replace(/"/g, ""));
                await apiClass.assignAContributingSkill(chatAgent,dncGroupId,skillId);
                let res2: APIResponse = await apiClass.removesAContributingSkill(chatAgent,dncGroupId,skillId);
                expect(res2.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
