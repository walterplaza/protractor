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
 * TC ID: ADV120120
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns a Skill's Dispositions";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let skillID: any;

    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-a-skill-s-dispositions/returns-a-skill-s-dispositions-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillID = (await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT));

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsASkillsDispositions(chatAgent, skillID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
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