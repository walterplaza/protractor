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
 * TC ID: RPV120018, RPV20220, RPV20221, RPV20222, RPV20223, RPV20224, RPV20225, RPV20226, RPV20227, RPV20228, RPV30083, RPV30084, RPV30085, RPV30086, RPV30087, RPV30088, RPV30089, RPV30090, RPV30091
 * Tested cluster: TC4, SC10, HC22
 */
let testCaseName: string = "Returns performance summary of all Teams";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let agent: Agent;
    let startDate: any;
    let endDate: any;
    let validStartDate: any;
    let validEndDate: any;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-performance-summary-of-all-teams/returns-performance-summary-of-all-teams-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.CHAT);
            validStartDate = await Utility.getNowDate("/", -3);
            validEndDate = await Utility.getNowDate("/", 0);
            startDate = validStartDate;
            endDate = validEndDate;

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "RPV20224" || testCaseData.Id == "RPV30087") {
                    // Query Param that contains special chars
                    let dateArr: string[];

                    if (caseData.QueryParams.startDate == "specChar") {
                        dateArr = Utility.injectTextWithSpecChars(validStartDate);
                        endDate = validEndDate;
                        for (startDate of dateArr) {
                            res = await apiCoreClass.returnsPerformanceSummaryOfAllTeams(agent, startDate, endDate);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    } else {
                        startDate = validStartDate;
                        dateArr = Utility.injectTextWithSpecChars(validEndDate);
                        for (endDate of dateArr) {
                            res = await apiCoreClass.returnsPerformanceSummaryOfAllTeams(agent, startDate, endDate);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }

                } else {

                    if (testCaseData.Id == "RPV20220" || testCaseData.Id == "RPV30083" || testCaseData.Id == "RPV20225" || testCaseData.Id == "RPV30088") {

                        // Invalid Query Test
                        // Without Query Params                                              
                        if (caseData.QueryParams.startDate == "") {
                            startDate = validStartDate;
                            endDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            startDate = caseData.QueryParams.startDate;
                            endDate = validEndDate;
                        }
                    } else if (testCaseData.Id == "RPV20222" || testCaseData.Id == "RPV30085") {

                        // Invalid Token
                        agent.accessToken = caseData.PathParams.token;
                    } else if (testCaseData.Id == "RPV20223" || testCaseData.Id == "RPV30086") {

                        // Invalid Query Params
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.endDate != "") {
                            startDate = caseData.QueryParams.startDate;
                            endDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.endDate == "" && caseData.QueryParams.startDate != "") {
                            startDate = caseData.QueryParams.startDate;
                            endDate = validEndDate;
                        } else if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            startDate = await Utility.getNowDate("/", -31);
                            endDate = await Utility.getNowDate("/", 0);
                        }
                    } else if (testCaseData.Id == "RPV20226" || testCaseData.Id == "RPV30089" || testCaseData.Id == "RPV20228" || testCaseData.Id == "RPV30091") {
                        
                        // Without all Query Params
                        // All empty Query Pamrams
                        startDate = caseData.QueryParams.startDate;
                        endDate = caseData.QueryParams.endDate;
                    } else if (testCaseData.Id == "RPV20227" || testCaseData.Id == "RPV30090") {
                   
                        // Empty Query Params
                        if (caseData.QueryParams.startDate != "") {
                            startDate = validStartDate;
                            endDate = caseData.QueryParams.endDate;
                        } else {
                            startDate = caseData.QueryParams.startDate;
                            endDate = validEndDate;
                        }
                    }
                    
                    res = await apiCoreClass.returnsPerformanceSummaryOfAllTeams(agent, startDate, endDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");           
                }
            }
        });
    })
})