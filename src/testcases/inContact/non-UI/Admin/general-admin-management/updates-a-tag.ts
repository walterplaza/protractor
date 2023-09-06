import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120096
 * Tested cluster: HC16
 */

let testCaseName: string = "Updates a Tag";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let tagId: string;
    let tagName: string = "tag_";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/updates-a-tag/updates-a-tag-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {
                tagId = await CustomAPIs.getRandomTagId(agent);
                tagName += Utility.getRandomNumber(2, 1, 99);
                let res: APIResponse = await apiClass.updatesATag(agent, tagId, tagName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
})
