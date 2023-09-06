import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120141
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Contributing Skills for a DNC Group";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/returns-contributing-skills-for-a-dnc-group/returns-contributing-skills-for-a-dnc-group-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);
            for (let caseData of testCaseData.Data) {
                let resDncList: APIResponse = await apiClass.returnsListOfDncGroups(chatAgent);
                let dncGroupId = await parseInt(JsonUtility.getFieldValue(resDncList.body, "resultSet.dncGroups[0].dncGroupId").replace(/"/g, ""));
                await apiClass.assignAContributingSkill(chatAgent, dncGroupId, skillId);
                let resContrSKill: APIResponse = await apiClass.returnsContributingSkillsForADncGroup(chatAgent, dncGroupId);
                expect(resContrSKill.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                await apiClass.removesAContributingSkill(chatAgent, dncGroupId, skillId);
            }
        });
    })
})
