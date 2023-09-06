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
 * TC ID: RPV120019
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns performance summary of a Team";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempTeamId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-performance-summary-of-a-team/returns-performance-summary-of-a-team-${TestRunInfo.versionAPI}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                tempTeamId = chatAgent.teamID;
                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV20219") {
                    // Case: special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempTeamId.toString());
                    for (let teamIdWithSpecialChar of specialCharTextArr) {
                        res = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, teamIdWithSpecialChar, tempStartDate, tempEndDate);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");
                    }
                }
                else if (testCaseData.Id == "RPV120019") {
                    res = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, tempEndDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");
                }
                else {
                    if (testCaseData.Id == "RPV20217") {
                        tempTeamId += "testChar";
                    } else if (testCaseData.Id == "RPV20216") {
                        tempTeamId = caseData.Expected.statusCode;
                    } else if (testCaseData.Id == "RPV20218") {
                        tempTeamId = "";
                    }
                    res = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, tempEndDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected. Failed by ticket:IC-29652 is marked as Won't Fix because Marc Owen commented on 13Sep2018: This was found forever ago, its on a v2/v3 api. A fix would require a new version of the API. However, this is low risk, and no customer has ever complained about it or reported it as a bug.");

                }
            }
        });
    })
})
