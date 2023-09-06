import WfmManagement from "@apis/reporting/wfm-management/wfm-management";
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
 * TC ID: RPV120032
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns agent metadata";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: any;
    let endDate: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/wfm-Management/returns-agent-metadata/returns-agent-metadata-${TestRunInfo.versionAPI}.json`);
    let apiClass = WfmManagement.getWfmManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", 0);
            endDate = await Utility.getNowDate("/", 0);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsAgentMetadata(chatAgent, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
