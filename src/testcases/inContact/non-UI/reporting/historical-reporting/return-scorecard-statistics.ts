import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
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
 * TC ID: RPV120025
 * Tested cluster: SC1
 */

let testCaseName: string = "Return Scorecard Statistics";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: any;
    let endDate: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/return-scorecard-statistics/return-scorecard-statistics-${TestRunInfo.versionAPI}.json`);
    let apiClass = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            for (let caseData of testCaseData.Data) {

                let res: APIResponse = await apiClass.returnScorecardStatistics(chatAgent, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
