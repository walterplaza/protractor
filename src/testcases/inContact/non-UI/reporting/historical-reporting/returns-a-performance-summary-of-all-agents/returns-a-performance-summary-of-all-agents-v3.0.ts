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
 * TC ID: RPV30049, RPV30050, RPV30051, RPV30052, RPV30053, RPV30054
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns a performance summary of all Agents";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let startDate: any;
    let endDate: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-a-performance-summary-of-all-agents/returns-a-performance-summary-of-all-agents-${APIVersion.V12}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let startDateOrg = startDate;
            let endDateOrg = endDate;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV30052") {
                    //with Query param that contains special chars
                    if (caseData.QueryParams.startDate == "") {
                        let startDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(startDateOrg.toString(), ".-");
                        for (startDateOrg of startDateSpecialChars) {
                            res = await apiCoreClass.returnsAPerformanceSummaryOfAllAgents(chatAgent, startDateOrg, endDate);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                    else if (caseData.QueryParams.endDate == "") {
                        let endDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(endDateOrg.toString(), ".-");
                        for (endDateOrg of endDateSpecialChars) {
                            res = await apiCoreClass.returnsAPerformanceSummaryOfAllAgents(chatAgent, startDate, endDateOrg);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                }
                else {
                    if (testCaseData.Id == "RPV30050") {
                        //with invalid Token
                        chatAgent.accessToken = chatAgent.accessToken + "invalid";
                    }
                    else if (testCaseData.Id == "RPV30053") {
                        //without Required Query param
                        if (caseData.QueryParams.startDate == "") {
                            startDateOrg = "";
                        }
                        else if (caseData.QueryParams.endDate == "") {
                            startDateOrg = startDate;
                            endDateOrg = "";
                        }
                    }
                    else if (testCaseData.Id == "RPV30054") {
                        //without all Required Query param
                        startDateOrg = "";
                        endDateOrg = "";
                    }
                    else if (testCaseData.Id == "RPV30051") {
                        //invalid Query param
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            startDateOrg = endDate;
                            endDateOrg = startDate;
                        }
                        else {
                            startDateOrg = caseData.QueryParams.startDate;
                            endDateOrg = caseData.QueryParams.endDate;
                        }
                    }
                    res = await apiCoreClass.returnsAPerformanceSummaryOfAllAgents(chatAgent, startDateOrg, endDateOrg);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
})