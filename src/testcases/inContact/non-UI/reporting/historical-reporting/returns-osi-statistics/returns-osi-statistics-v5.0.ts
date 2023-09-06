import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV50074 ,RPV50075 ,RPV50076 ,RPV50077 ,RPV50078 ,RPV50079 ,RPV50080 ,RPV50081
 * Tested cluster: HC22
 */

let testCaseName: string = "Returns OSI Statistics";

describe(`${testCaseName} - ${APIVersion.V5}`, async function () {
    let agent: Agent;
    let startDate: string;
    let endDate: string;
    let validStartDate: string;
    let validEndDate: string;
    let response: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-osi-statistics/returns-osi-statistics-${APIVersion.V5}.json`);
    let historicalReportingAPI = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`, async function () {

            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`);

            agent = await TestCondition.registerAgent(SkillType.CHAT);

            validStartDate = Utility.getNowDate("/", 0);
            validEndDate = Utility.getNowDate("/", 0);

            for (let caseData of testCaseData.Data) {
                startDate = validStartDate;
                endDate = validEndDate;
                if (testCaseData.Id == "RPV50079") {
                    // Query param that contains special chars
                    if (caseData.QueryParams.startDate == "specChar") {
                        let specCharArray: string[] = Utility.injectTextWithSpecChars(startDate, ".-");
                        for (startDate of specCharArray) {
                            // startDate with special characters
                            response = await historicalReportingAPI.returnsOsiStatistics(agent, startDate, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");
                        }
                    } else if (caseData.QueryParams.endDate == "specChar") {
                        // endDate with special characters
                        let specCharArray: string[] = Utility.injectTextWithSpecChars(endDate, ".-");
                        for (endDate of specCharArray) {
                            response = await historicalReportingAPI.returnsOsiStatistics(agent, startDate, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");
                        }
                    }
                } else {

                    // TC ID: RPV50074, RPV50075, RPV50076, RPV50078, RPV50080, RPV50081
                    if (caseData.TestData == "invalidToken") {
                        agent.accessToken = "Invalid";
                    } else if (caseData.TestData == "invalidDateRange") {
                        startDate = Utility.getNowDate("/", -31);
                    } else if (caseData.TestData == "invalidData") {
                        // Invalid startDate and endDate
                        // QueryParam not filled
                        startDate = caseData.QueryParams.startDate;
                        endDate = caseData.QueryParams.endDate;
                    } else if (caseData.TestData == "invalidStartDate") {
                        startDate = caseData.QueryParams.startDate;
                    } else if (caseData.TestData == "invalidEndDate") {
                        endDate = caseData.QueryParams.endDate;
                    }

                    response = await historicalReportingAPI.returnsOsiStatistics(agent, startDate, endDate);
                    expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                    expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");
                }
            }
        });
    })
})
