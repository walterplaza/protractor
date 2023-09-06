import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIVersion, ClusterID } from "@data-objects/general/cluster";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120022
 * Tested cluster: SC3
 */
let testCaseName: string = "Returns a Reporting Job";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;
    let jobId: string;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-a-reporting-job/returns-a-reporting-job-${APIVersion.V12}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);

            // Get job ID
            jobId = await CustomAPIs.getJobID(chatAgent);
            for (let caseData of testCaseData.Data) {

                let returnResponse = await apiCoreClass.returnsAReportingJob(chatAgent, jobId);
                expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
            }
        });
    })
})