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
 * TC ID: ADV120149
 * Tested cluster: SC3
 */

let testCaseName: string = "Assign a Scrubbed Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let obPhoneAgent: Agent;
    let dncGroupId: string;
    let skillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/assign-a-scrubbed-skill/assign-a-scrubbed-skill-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
            dncGroupId = await CustomAPIs.getRandomDncGroupId(obPhoneAgent);
            skillId = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.PC_PHONE);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.assignAScrubbedSkill(obPhoneAgent, dncGroupId, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await apiClass.removeAScrubbedSkill(obPhoneAgent, dncGroupId, skillId);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
