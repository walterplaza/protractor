import GeneralContactManagementInstance from "@apis/admin/general-contact-management/general-contact-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120135
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns a single contact state";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let ibPhoneAgent: Agent;
    let res: APIResponse;
    let contactStateId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-contact-management/returns-a-single-contact-state/returns-a-single-contact-state-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralContactManagementInstance.getGeneralContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibPhoneAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
            for (let caseData of testCaseData.Data) {
                contactStateId = await CustomAPIs.getRandomContactStateId(ibPhoneAgent);
                
                res = await apiClass.returnsASingleContactState(ibPhoneAgent, contactStateId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
