import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120100
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns a single Campaign";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let campaignId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-a-single-campaign/returns-a-single-campaign-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {

                let resAllCampaigns: APIResponse = await apiClass.returnsAListOfCampaigns(agent);
                let bodyAllCampaigns = JSON.parse(resAllCampaigns.body).resultSet;
                let totalCampaignRecords: number = parseInt(bodyAllCampaigns.totalRecords);

                if (totalCampaignRecords > 0) {
                    campaignId = bodyAllCampaigns.campaigns[0].campaignId;
                    let resSingleCampaign: APIResponse = await apiClass.returnsASingleCampaign(agent, campaignId);
                    let expectedCode = caseData.Expected.statusCode;
                    expect(resSingleCampaign.status).toBe(expectedCode, "Status code does not match expected");
                }
            }
        });
    });
})
