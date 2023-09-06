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
 * TC ID: RPV120023
 * Tested cluster: SC3
 */
let testCaseName: string = "Start a Custom Reporting Job";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;
    let reportId: string;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/start-a-custom-reporting-job/start-a-custom-reporting-job-${APIVersion.V12}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);

            // Get report ID
            if (TestRunInfo.clusterID + "" == "SC3") {
                reportId = "-6116";
            } else {
                reportId = await CustomAPIs.getReportID(chatAgent);
            }

            for (let caseData of testCaseData.Data) {

                let returnResponse = await apiCoreClass.startACustomReportingJob(chatAgent, reportId);
                expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
            }
        });
    })
})