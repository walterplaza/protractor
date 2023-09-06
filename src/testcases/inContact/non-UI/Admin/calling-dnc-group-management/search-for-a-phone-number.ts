import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: ADV120150
 * Tested cluster: SC3
 */

let testCaseName: string = "Search for a Phone Number";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let obAgent: Agent;
    let expiredDate: string;
    let groupId: string;
    let phoneNumber: string = "+1 (801) 244-0005";
    let coveredNumber: string = "8012440005";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/search-for-a-phone-number/search-for-a-phone-number-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            obAgent.createPhoneNumber();
            expiredDate = await Utility.getNowDate("/", 0);
            groupId = await CustomAPIs.getRandomDncGroupId(obAgent);
            await apiClass.addRecordsToADncGroup(obAgent, groupId, phoneNumber, expiredDate);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.searchForAPhoneNumber(obAgent, coveredNumber);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await apiClass.expireRecordsFromADncGroup(obAgent, groupId, coveredNumber, expiredDate);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
