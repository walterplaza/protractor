import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
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
 * TC ID: ADV120112
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Skills assignments";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let apiName: string = "returns-skills-assignments";
    let skillsValue: string = `[{"skillId":1}]`;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);

    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsSkillsAssignments(chatAgent, "", "", skillsValue);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
