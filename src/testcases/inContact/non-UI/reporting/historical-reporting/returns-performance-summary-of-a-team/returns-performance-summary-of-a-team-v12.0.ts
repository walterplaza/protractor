import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120019
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns performance summary of a Team";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempTeamId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-performance-summary-of-a-team/returns-performance-summary-of-a-team-${APIVersion.V12}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                tempTeamId = chatAgent.teamID;
                tempStartDate = startDate;
                tempEndDate = endDate;

                res = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, tempEndDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");

            }
        });
    })
})
