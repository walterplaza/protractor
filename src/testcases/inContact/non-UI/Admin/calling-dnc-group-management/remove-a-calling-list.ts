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
 * TC ID: ADV120153
 * Tested cluster: SC3
 */

let testCaseName: string = "Remove a Calling List";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "remove-a-calling-list";
    let createCallingListRes: APIResponse;
    let listId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let callingDNCGroupManagementApi = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre-condition: create a calling list
            let listName: string = "QA test" + Utility.createRandomString(5);
            let externalColumnId: number = Utility.getRandomNumber(1);
            let destinationMappingsFieldName: string = "PhoneNumber";
            let destinationMappingsFieldValue: string = "phone";
            let createCallingListRes: APIResponse = await callingDNCGroupManagementApi.createACallingListMapping(chatAgent, listName, externalColumnId, destinationMappingsFieldName, destinationMappingsFieldValue);
            let listId: string = await JsonUtility.getFieldValue(createCallingListRes.body, `listId`);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await callingDNCGroupManagementApi.removeACallingList(chatAgent, listId, true, true);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }

        });
    })
})
