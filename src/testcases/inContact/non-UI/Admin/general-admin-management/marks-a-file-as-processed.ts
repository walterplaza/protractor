import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";
import { TestCondition } from "@test-helpers/test-condition";
import { SkillType } from "@data-objects/general/skill-core";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120068
 * Tested cluster: TC4
 */

let testCaseName: string = "Marks a file as processed";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let fileName: string = Utility.createRandomString(10, "lgvn_")

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/marks-a-file-as-processed/marks-a-file-as-processed-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await apiClass.marksAFileToBeProcessed(chatAgent, fileName);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.marksAFileAsProcessed(chatAgent, fileName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
