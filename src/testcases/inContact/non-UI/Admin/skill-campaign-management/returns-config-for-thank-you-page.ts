import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
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
 * TC ID: ADV120109
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns config for thank you page";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let skillId: number;

    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-config-for-thank-you-page/returns-config-for-thank-you-page-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsConfigForThankYouPage(chatAgent, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})