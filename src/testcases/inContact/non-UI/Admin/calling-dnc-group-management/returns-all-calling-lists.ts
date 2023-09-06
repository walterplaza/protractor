import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
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
 * TC ID: ADV120151
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns all Calling Lists";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "returns-all-calling-lists";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsAllCallingLists(chatAgent);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
