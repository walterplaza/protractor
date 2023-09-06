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
 * TC ID: RPV50047, RPV50048, RPV50050, RPV50051, RPV50052, RPV50053
 * Tested cluster: HC22
 */

let testCaseName: string = "Return Scorecard Statistics";

describe(`${testCaseName} - ${APIVersion.V5}`, async function () {
    let agent: Agent;
    let startDate: string;
    let endDate: string;
    let validStartDate: string;
    let validEndDate: string;
    let response: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/return-scorecard-statistics/return-scorecard-statistics-${APIVersion.V5}.json`);
    let historicalReportingAPI = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`);

            agent = await TestCondition.registerAgent(SkillType.CHAT);
            validStartDate = Utility.getNowDate("/", -12);
            validEndDate = Utility.getNowDate("/", 0);

            for (let caseData of testCaseData.Data) {
                startDate = validStartDate
                endDate = validEndDate;

                if (testCaseData.Id == "RPV50053") {
                    // Query param that contains special chars                    
                    if (caseData.QueryParams.startDate == "specChar") {
                        // startDate with special characters                        
                        let specCharArray: string[] = Utility.injectTextWithSpecChars(startDate, ".-");
                        for (startDate of specCharArray) {
                            response = await historicalReportingAPI.returnScorecardStatistics(agent, startDate, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");                            
                        }
                    } else if (caseData.QueryParams.endDate == "specChar") {
                        // endDate with special characters                           
                        let specCharArray: string[] = Utility.injectTextWithSpecChars(endDate, ".-");
                        for (endDate of specCharArray) {
                            response = await historicalReportingAPI.returnScorecardStatistics(agent, startDate, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");                            
                        }
                    }
                } else {
                    // TC ID: RPV50047, RPV50048, RPV50050,RPV50051, RPV50052 
                    if (caseData.TestData == "invalidToken") {                        
                        agent.accessToken = "Invalid";
                    } else if (caseData.TestData == "invalidDateRange") {
                        startDate = Utility.getNowDate("/", 12);
                    } else if (caseData.TestData == "invalidStartDate") {
                        startDate = caseData.QueryParams.startDate;
                    } else if (caseData.TestData == "invalidEndDate") {
                        endDate = caseData.QueryParams.endDate;
                    } else if (caseData.TestData == "invalidData") {
                        // Invalid startDate and endDate
                        // Without startDate and endDate filled
                        startDate = caseData.QueryParams.startDate;
                        endDate = caseData.QueryParams.endDate;
                    }
                    response = await historicalReportingAPI.returnScorecardStatistics(agent, startDate, endDate);
                    expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                    expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match as expected");                    
                }
            }
        });
    })
})