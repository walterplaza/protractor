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
 * TC ID: ADV120157
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns the status of calling list upload jobs";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let skillId: any;
    let startDate: any;
    let endDate: any;
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/returns-the-status-of-calling-list-upload-jobs/returns-the-status-of-calling-list-upload-jobs-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillId = (await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT));
            startDate = await Utility.getNowDate("-", -3);
            endDate = await Utility.getNowDate("-", 0);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsTheStatusOfCallingListUploadJobs(chatAgent, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})