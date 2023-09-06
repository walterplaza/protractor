import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
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
 * TC ID: ADV120122
 * Tested cluster: TC4
 */

let testCaseName: string = "Removes Tags from a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent; let apiName: string = "removes-tags-from-a-skill";
    let SkillCampaignManagementAPI = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let tagId: string = await CustomAPIs.getRandomTagId(chatAgent);
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
            await SkillCampaignManagementAPI.assignsATagToASkill(chatAgent, skillId, tagId);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await SkillCampaignManagementAPI.removesTagsFromASkill(chatAgent, skillId, tagId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
