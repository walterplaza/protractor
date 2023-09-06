import CustomAPIs from "@apis/custom-apis";
import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120101
 * Tested cluster: TC4
 */

let testCaseName: string = "Create a new disposition";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let dispositions = Utility.getRandomNumber(3,0,999) + "_creating_disposition"

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Admin/skill-campaign-management/create-a-new-disposition/create-a-new-disposition-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.createANewDisposition(chatAgent,dispositions);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected"); 
            }
        });
    })
})
