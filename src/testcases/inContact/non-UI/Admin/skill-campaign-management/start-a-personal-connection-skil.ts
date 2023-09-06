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
 * TC ID: ADV120110
 * Tested cluster: HC16
 */

let testCaseName: string = "Start a Personal Connection Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obAgent: Agent;
    let skillId: number;

    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/start-a-personal-connection-skill/start-a-personal-connection-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            skillId = await CustomAPIs.getSkillIdFromSkillName(obAgent, SkillType.PC_PHONE);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.startAPersonalConnectionSkill(obAgent, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await apiClass.stopAPersonalConnectionSkill(obAgent, skillId);
        } catch (err) { }
        finally {
            try { } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})