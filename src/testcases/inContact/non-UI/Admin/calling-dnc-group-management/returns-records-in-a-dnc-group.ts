import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120145
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Records in a DNC Group";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let oBPhoneAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/returns-records-in-a-dnc-group/returns-records-in-a-dnc-group-${TestRunInfo.versionAPI}.json`);
    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            oBPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {
                let fields = caseData.QueryParams.fields;
                let skip = caseData.QueryParams.skip;
                let top = caseData.QueryParams.top;
                let orderBy = caseData.QueryParams.orderBy;
                let expiredDate = await Utility.getNowDate("/", 0);
                let res1: APIResponse = await apiClass.returnsListOfDncGroups(oBPhoneAgent);
                let totalGroups = await parseInt(JsonUtility.getFieldValue(res1.body,"resultSet.totalGroups").replace(/"/g, ""));
                let dncGroupId = await parseInt(JsonUtility.getFieldValue(res1.body,`resultSet.dncGroups[${totalGroups-1}].dncGroupId`).replace(/"/g, ""));
                await apiClass.addRecordsToADncGroup(oBPhoneAgent,dncGroupId,oBPhoneAgent.randomPhoneNumber(),expiredDate)
                let res2: APIResponse = await apiClass.returnsRecordsInADncGroup(oBPhoneAgent,dncGroupId,fields,skip,top,orderBy);
                expect(res2.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        }
        catch (error) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(oBPhoneAgent);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
