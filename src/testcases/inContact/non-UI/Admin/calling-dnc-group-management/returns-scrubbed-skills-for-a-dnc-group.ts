import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
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
 * TC ID: ADV120147
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Scrubbed Skills for a DNC Group";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let obAgent: Agent;
    let dncGroupId: string;
    let skillId: number;
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/returns-scrubbed-skills-for-a-dnc-group/returns-scrubbed-skills-for-a-dnc-group-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            dncGroupId = await CustomAPIs.getRandomDncGroupId(obAgent);
            skillId = await CustomAPIs.getSkillIdFromSkillName(obAgent, SkillType.PC_PHONE);
            await apiClass.assignAScrubbedSkill(obAgent, dncGroupId, skillId);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsScrubbedSkillsForADncGroup(obAgent, dncGroupId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await apiClass.removeAScrubbedSkill(obAgent, dncGroupId, skillId);
        } catch (err) { }
        finally {
            try {} catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
