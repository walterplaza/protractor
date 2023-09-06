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
 * TC ID: RPV20215, RPV20216, RPV20217, RPV20218, RPV20219
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns performance summary of a Team";

describe(`${testCaseName} - ${APIVersion.V2}`, async function () {
    let chatAgent: Agent;
    let returnResponse: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempTeamId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-performance-summary-of-a-team/returns-performance-summary-of-a-team-${APIVersion.V2}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {

                tempTeamId = chatAgent.teamID;
                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV20219") {
                    // Case: special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempTeamId.toString(), ".-");

                    for (let teamIdWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, teamIdWithSpecialChar, tempStartDate, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                }
                else {
                    if (testCaseData.Id == "RPV20217") {
                        tempTeamId += "testChar";
                    } else if (testCaseData.Id == "RPV20216" || testCaseData.Id == "RPV20218") {
                        tempTeamId = caseData.PathParams.teamId;
                    }

                    returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                }
            }
        });
    })
})
