import CustomAPIs from "@apis/custom-apis";
import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
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
 * TC ID: ADV120067
 * Tested cluster: TC4
 */

let testCaseName: string = "Marks a file to be processed";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let fileName: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/marks-a-file-to-be-processed/marks-a-file-to-be-processed-${TestRunInfo.versionAPI}.json`);

    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            fileName = Utility.createRandomString(10, "lgvn_");
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.marksAFileToBeProcessed(chatAgent, fileName);
                expect(caseData.Expected.statusCode).toBe(res.status,"Status code does not match expected");
            }
        });
    })
})
