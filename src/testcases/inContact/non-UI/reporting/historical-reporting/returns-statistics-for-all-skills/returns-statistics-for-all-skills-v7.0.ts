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
 * TC ID: RPV70085,	RPV70086, RPV70087, RPV70088, RPV70089, RPV70090, RPV70091, RPV70092
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns statistics for all Skills";

describe(`${testCaseName} - ${APIVersion.V7}`, async function () {
    let chatAgent: Agent;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempToken: string;
    let tempMediaTypeId: string;
    let returnResponse: APIResponse;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-statistics-for-all-skills/returns-statistics-for-all-skills-${APIVersion.V7}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V7}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V7}`);

            for (let caseData of testCaseData.Data) {

                tempToken = chatAgent.accessToken;
                tempStartDate = startDate;
                tempEndDate = endDate;
                tempMediaTypeId = "";

                if (testCaseData.Id == "RPV70089") {
                    if (caseData.QueryParams.startDate != "" && caseData.QueryParams.startDate != "" && caseData.QueryParams.mediaTypeId != "") {
                        // Case: startDate and endDate with special characters  
                        let startDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");
                        let endDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempEndDate, ".-");
                        let mediaTypeIdSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempMediaTypeId, ".-");
                        for (let charOrder = 0; charOrder < startDateSpecialCharsArr.length; charOrder++) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, startDateSpecialCharsArr[charOrder], endDateSpecialCharsArr[charOrder], mediaTypeIdSpecialCharsArr[charOrder]);

                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.statusDescription, `Error Description is not correct as expected.`);

                        }
                    } else {
                        // Case: startDate with special characters   
                        let startDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                        for (let startDateWithSpecialChar of startDateSpecialCharsArr) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, startDateWithSpecialChar, tempEndDate, tempMediaTypeId);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.startDateStatusDescription, `Error Description is not correct as expected.`);

                        }
                        // Case: endDate with special characters   
                        let endDateSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                        for (let endDateWithSpecialChar of endDateSpecialCharsArr) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, tempStartDate, endDateWithSpecialChar, tempMediaTypeId);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toBe(caseData.Expected.endDateStatusDescription, `Error Description is not correct as expected.`);

                        }
                        // Case: mediaTypeId with special characters   
                        let mediaTypeIdSpecialCharsArr: Array<string> = Utility.injectTextWithSpecChars(tempMediaTypeId, ".-");

                        for (let mediaTypeIdWithSpecialChar of mediaTypeIdSpecialCharsArr) {

                            returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, tempStartDate, tempEndDate, mediaTypeIdSpecialCharsArr);
                            expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(returnResponse.header).toContain(caseData.Expected.mediaTypeIdStatusDescription, "Error Description is not correct as expected.");

                        }
                    }
                } else {
                    if (testCaseData.Id == "RPV70085" || testCaseData.Id == "RPV70092") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }

                    } else if (testCaseData.Id == "RPV70090") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }

                    } else if (testCaseData.Id == "RPV70087" || testCaseData.Id == "RPV70088") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempMediaTypeId = caseData.QueryParams.mediaTypeId;
                        } else {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV70091") {
                        chatAgent.accessToken = "invalid";
                    }

                    returnResponse = await reportingApis.returnsStatisticsForAllSkills(chatAgent, tempStartDate, tempEndDate, tempMediaTypeId);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, `Error Code is not correct as expected.`);
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, `Error Description is not correct as expected.`);
                }

            }
        });
    })
})