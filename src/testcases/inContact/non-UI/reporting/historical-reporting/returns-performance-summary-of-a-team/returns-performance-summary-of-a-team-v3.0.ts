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
 * TC ID: RPV30072,	RPV30073, RPV30074, RPV30075, RPV30076, RPV30077, RPV30078, RPV30079, RPV30080, RPV30081, RPV30082,
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns performance summary of a Team";

describe(`${testCaseName} - ${APIVersion.V3}`, async function () {
    let chatAgent: Agent;
    let returnResponse: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempTeamId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-performance-summary-of-a-team/returns-performance-summary-of-a-team-${APIVersion.V3}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {

                tempTeamId = chatAgent.teamID;
                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV30076") {
                    // Case: special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempTeamId.toString(), ".-");

                    for (let teamIdWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, teamIdWithSpecialChar, tempStartDate, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                } else if (testCaseData.Id == "RPV30078") {
                    // Case: startDate contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                    for (let startDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, startDateWithSpecialChar, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected. ");

                    }
                    // Case: endDate contains special characters   
                    specialCharTextArr = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                    for (let endDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, endDateWithSpecialChar);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }

                }
                else {
                    if (testCaseData.Id == "RPV30074") {
                        tempTeamId += "testChar";
                    } else if (testCaseData.Id == "RPV30073") {
                        tempTeamId = caseData.Expected.statusCode;
                    } else if (testCaseData.Id == "RPV30075") {
                        tempTeamId = "";
                    } else if (testCaseData.Id == "RPV30077" || testCaseData.Id == "RPV30079" || testCaseData.Id == "RPV30080") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.startDate != "") {
                            if (caseData.QueryParams.startDate == "invalidDateRange") {
                                tempStartDate = await Utility.getNowDate("/", -31);
                                tempEndDate = await Utility.getNowDate("/", 0);
                            } else {
                                tempStartDate = caseData.QueryParams.startDate;
                                tempEndDate = caseData.QueryParams.endDate;
                            }
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV30081") {
                        if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV30082") {
                        tempStartDate = caseData.QueryParams.startDate;
                        tempEndDate = caseData.QueryParams.endDate;
                    }

                    returnResponse = await reportingApis.returnsPerformanceSummaryOfATeam(chatAgent, tempTeamId, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                }
            }
        });
    })
})
