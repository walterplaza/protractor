import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120139
 * Tested cluster: HC16
 */

let testCaseName: string = "Create a DNC Group";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let dncGroupName;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/create-a-dnc-group/create-a-dnc-group-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.IB_Phone);
            for (let caseData of testCaseData.Data) {
                
                dncGroupName = `DncTest_${Utility.getRandomNumber(4,10,9999)}`;
                let res: APIResponse = await apiClass.createADncGroup(agent, dncGroupName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
})
