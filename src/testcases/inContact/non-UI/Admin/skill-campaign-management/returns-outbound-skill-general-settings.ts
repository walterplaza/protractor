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
 * TC ID: ADV120125
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns Outbound skill General Settings";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let apiName: string = "returns-outbound-skill-general-settings";
    let outboundStrategy: string = "Personal Connection";
    let SkillCampaignManagementAPI = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let skillId: string = await CustomAPIs.getSkillIdByOutboundStrategy(chatAgent, outboundStrategy);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await SkillCampaignManagementAPI.returnsOutboundSkillGeneralSettings(chatAgent, skillId, caseData.QueryParams.fields);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
