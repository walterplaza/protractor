import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120144
 * Tested cluster: SC3
 */

let testCaseName: string = "Expire Records from a DNC Group";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/expire-records-from-a-dnc-group/expire-records-from-a-dnc-group-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await chatAgent.createPhoneNumber();
            let expireDate = await Utility.getNowDate("/", 0);
            for (let caseData of testCaseData.Data) {
                let res1: APIResponse = await apiClass.returnsListOfDncGroups(chatAgent);
                let totalGroups = await parseInt(JsonUtility.getFieldValue(res1.body,"resultSet.totalGroups").replace(/"/g, ""));
                totalGroups = totalGroups-1;
                let dncGroupId = await parseInt(JsonUtility.getFieldValue(res1.body,`resultSet.dncGroups[${totalGroups}].dncGroupId`).replace(/"/g, ""));
                await apiClass.addRecordsToADncGroup(chatAgent,dncGroupId,chatAgent.phoneNumber,expireDate);
                let res2: APIResponse = await apiClass.expireRecordsFromADncGroup(chatAgent,dncGroupId,chatAgent.phoneNumber,expireDate);
                expect(res2.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
