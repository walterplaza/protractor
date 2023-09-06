import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120155
 * Tested cluster: SC3
 */

let testCaseName: string = "Download a Calling List's attempts";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "download-a-calling-list's-attempts";
    let listId: string;
    let callingListRes: APIResponse;
    let updatedSince: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Get listId
            callingListRes = await inContactAPIs.getListsCallLists(chatAgent, APIVersion.V12);
            listId = await JsonUtility.getFieldValue(callingListRes.body, `callingLists[1].listId`).replace(/"/g, "");

            // Get updatedSince value
            updatedSince = Utility.getNowDate("/", 0);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.downloadACallingListsAttempts(chatAgent, listId, updatedSince);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
