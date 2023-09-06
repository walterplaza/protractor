import CustomAPIs from "@apis/custom-apis";
import GeneralAdminManagementInstance from "@apis/admin/agent-management/agent-management";
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
 * TC ID: ADV120061
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns a list of dispositions";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/returns-a-list-of-dispositions/returns-a-list-of-dispositions-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getAgentManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let updateSince = caseData.QueryParams.updateSince;
                let fields = caseData.QueryParams.fields;
                let res: APIResponse = await apiClass.returnsSkillsAssignedToAnAgent(chatAgent,updateSince,fields);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
            }
        });
    })
})
