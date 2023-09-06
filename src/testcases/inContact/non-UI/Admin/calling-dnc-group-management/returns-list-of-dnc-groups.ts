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
 * TC ID: ADV120137
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns list of DNC Groups";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/returns-list-of-dnc-groups/returns-list-of-dnc-groups-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsListOfDncGroups(agent);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
})
