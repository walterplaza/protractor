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
 * TC ID: RPV40126,RPV40127,RPV40128, RPV40129, RPV40130, RPV40131, RPV40132, RPV40133, RPV40134, RPV40135, RPV40136 (Question 160)
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Contact history for an Agent";

describe(`${testCaseName} - ${APIVersion.V4}`, async function () {
    let chatAgent: Agent;
    let startDate: string;
    let endDate: string;
    let response: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-history-for-an-agents/returns-contact-history-for-an-agent-${APIVersion.V4}.json`);
    let historicalReportingAPIs = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V4}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V4}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let agentID: string = chatAgent.agentID;
            let startDateOrg: string = startDate;
            let endDateOrg: string = endDate;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV40132") {
                    //with Path param contains special chars
                    let agentIdSpecialChars: Array<string> = Utility.injectTextWithSpecChars(chatAgent.agentID.toString(), "-");
                    for (chatAgent.agentID of agentIdSpecialChars) {
                        response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDate);
                        expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                        expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                    }
                }
                else if (testCaseData.Id == "RPV40134") {
                    //with Query param that contains special chars
                    if (caseData.QueryParams.startDate == "specChars") {
                        let startDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(startDateOrg, ".-");
                        for (startDateOrg of startDateSpecialChars) {
                            response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDateOrg, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                        }
                    }
                    else if (caseData.QueryParams.endDate == "specChars") {
                        let endDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(endDateOrg, ".-");
                        for (endDateOrg of endDateSpecialChars) {
                            response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDateOrg);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                        }
                    }
                    else if (caseData.QueryParams.mediaTypeId != "null") {
                        //mediaTypeId with special chars
                        let mediaNameSpecialChars: Array<string> = Utility.injectTextWithSpecChars(caseData.QueryParams.mediaTypeId.toString());
                        for (caseData.QueryParams.mediaTypeId of mediaNameSpecialChars) {
                            response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDate, caseData.QueryParams.mediaTypeId);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                        }
                    }
                }
                else {
                    if (testCaseData.Id == "RPV40128") {
                        //with Invalid Token
                        chatAgent.accessToken = chatAgent.accessToken + "invalid";
                    }
                    else if (testCaseData.Id == "RPV40135" || testCaseData.Id == "RPV40133" || testCaseData.Id == "RPV40126") {
                        //RPV40126: Invalid Query
                        //RPV40133: with invalid Query param
                        //RPV40135:  without Required Query param
                        if (caseData.QueryParams.updatedSince == "Invalid") {
                            startDateOrg = caseData.QueryParams.startDate;
                            endDateOrg = caseData.QueryParams.endDate;
                        }
                        else if (caseData.QueryParams.startDate == "null" || caseData.QueryParams.endDate == "Dynamic") {
                            startDateOrg = caseData.QueryParams.startDate;
                            endDateOrg = endDate;
                        }
                        else if (caseData.QueryParams.endDate == "null" || caseData.QueryParams.startDate == "Dynamic") {
                            startDateOrg = startDate;
                            endDateOrg = caseData.QueryParams.endDate;
                        }
                    }
                    else if (testCaseData.Id == "RPV40136") {
                        //without all Required Query params
                        startDateOrg = caseData.QueryParams.startDate;
                        endDateOrg = caseData.QueryParams.endDate;
                    }
                    else if (testCaseData.Id == "RPV40127") {
                        //with valid required information
                        chatAgent.agentID = agentID;
                    }
                    else {
                        if (caseData.PathParams.agentId == "-" || testCaseData.Id == "RPV40130") {
                            //with numeric agentId Path param that contains alphabet chars
                            chatAgent.agentID = caseData.PathParams.agentId + agentID;
                        }
                        else {
                            chatAgent.agentID = caseData.PathParams.agentId;
                        }
                    }
                    response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDateOrg, endDateOrg, caseData.QueryParams.updatedSince);
                    expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                    expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                }
            }
        });
    })
})
