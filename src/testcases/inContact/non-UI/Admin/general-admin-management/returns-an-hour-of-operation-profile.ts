import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120075
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns an Hour of Operation profile";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "returns-an-hour-of-operation-profile";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let adminApi = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre-condition: get a profileId
            let allProfileIdRes: APIResponse = await inContactAPIs.getHoursOfOperation(chatAgent, APIVersion.V7);
            let profileId: string = await JsonUtility.getFieldValue(allProfileIdRes.body, `resultSet.hoursOfOperationProfiles[0].profileId`).replace(/"/g, "");

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await adminApi.returnsAnHourOfOperationProfile(chatAgent, profileId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
