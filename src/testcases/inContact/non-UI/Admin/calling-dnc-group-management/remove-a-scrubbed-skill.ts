import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";
import { SearchTimeRange } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120148
 * Tested cluster: SC3
 */

let testCaseName: string = "Remove a Scrubbed Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let obPhone: Agent;
    let dncGroupId: string;
    let skillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/remove-a-scrubbed-skill/remove-a-scrubbed-skill-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obPhone = await TestCondition.registerAgent(SkillType.OB_PHONE);
            dncGroupId = await CustomAPIs.getRandomDncGroupId(obPhone);
            skillId = await CustomAPIs.getSkillIdFromSkillName(obPhone,SkillType.PC_PHONE);          
            await apiClass.assignAScrubbedSkill(obPhone, dncGroupId, skillId);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.removeAScrubbedSkill(obPhone, dncGroupId, skillId);                
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
})
