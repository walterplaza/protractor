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
 * TC ID: RPV10055, RPV10056, RPV10057, RPV10058, RPV10059, RPV10060, RPV10061
 * Tested cluster: TC4
 */
let testCaseName: string = "Returns SLA summary for all Skills";

describe(`${testCaseName} - ${APIVersion.V1}`, async function () {
    let chatAgent: Agent;
    let returnResponse: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-sla-summary-for-all-skills/returns-sla-summary-for-all-skills-${APIVersion.V1}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`);

            for (let caseData of testCaseData.Data) {

                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV10059") {
                    // Case: startDate contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                    for (let startDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsSlaSummaryForAllSkills(chatAgent, startDateWithSpecialChar, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.startDateStatusDescription, `Error Description is not correct as expected.`);

                    }
                    // Case: endDate contains special characters   
                    specialCharTextArr = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                    for (let endDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsSlaSummaryForAllSkills(chatAgent, tempStartDate, endDateWithSpecialChar);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.endDateStatusDescription, `Error Description is not correct as expected.`);

                    }

                }
                else {
                    if (testCaseData.Id == "RPV10057") {
                        chatAgent.accessToken = "Invalid";
                    } else if (testCaseData.Id == "RPV10055" || testCaseData.Id == "RPV10058" || testCaseData.Id == "RPV10061") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.endDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV10060") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    }

                    returnResponse = await reportingApis.returnsSlaSummaryForAllSkills(chatAgent, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, `Error Code is not correct as expected.`);
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, `Error Description is not correct as expected.`);
                }

            }

        });
    })
})