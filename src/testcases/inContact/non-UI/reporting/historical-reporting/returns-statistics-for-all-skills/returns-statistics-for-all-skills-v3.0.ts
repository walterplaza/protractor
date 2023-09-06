import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV30064, RPV30065, RPV30066, RPV30067, RPV30068, RPV30069, RPV30070, RPV30071
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns statistics for all Skills";

describe(`${testCaseName} - ${APIVersion.V3}`, async function () {
    let chatAgent: Agent;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let returnResponse: APIResponse;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-statistics-for-all-skills/returns-statistics-for-all-skills-${APIVersion.V3}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`);

            for (let caseData of testCaseData.Data) {

                tempStartDate = startDate;
                tempEndDate = endDate;
                if (testCaseData.Id == "RPV30068") {
                    if (caseData.QueryParams.startDate != "" && caseData.QueryParams.startDate != "") {
                        // Case: startDate and endDate with special characters  
                        let startDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");
                        let endDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempEndDate, ".-");
                        for (let charOrder = 0; charOrder < startDateSpecialCharsArr.length; charOrder++) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, startDateSpecialCharsArr[charOrder], endDateSpecialCharsArr[charOrder]);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                        }
                    } else {
                        // Case: startDate with special characters   
                        let startDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                        for (let startDateWithSpecialChar of startDateSpecialCharsArr) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, startDateWithSpecialChar, tempEndDate);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.startDateStatusDescription, "Error Description is not correct as expected.");

                        }
                        // Case: endDate with special characters   
                        let endDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                        for (let endDateWithSpecialChar of endDateSpecialCharsArr) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, tempStartDate, endDateWithSpecialChar);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.endDateStatusDescription, "Error Description is not correct as expected.");

                        }
                    }
                } else {
                    if (testCaseData.Id == "RPV30064" || testCaseData.Id == "RPV30071" || testCaseData.Id == "RPV30066" || testCaseData.Id == "RPV30067") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }

                    } else if (testCaseData.Id == "RPV30069") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }

                    } else if (testCaseData.Id == "RPV30070") {
                        chatAgent.accessToken = "invalid";
                    }

                    returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, `Error Code is not correct as expected.`);
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, `Error Description is not correct as expected.`);
                }

            }
        });
    })
})