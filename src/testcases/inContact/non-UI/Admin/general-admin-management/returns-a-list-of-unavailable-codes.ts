import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120098
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns a list of Unavailable Codes";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/returns-a-list-of-unavailable-codes/returns-a-list-of-unavailable-codes-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {

                let res: APIResponse = await apiClass.returnsAListOfUnavailableCodes(agent);
                let expectedCode = caseData.Expected.statusCode;
                expect(res.status).toBe(expectedCode, "Status code does not match expected");
            }
        });
    });
})
