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
 * TC ID: RPV50024,RPV50025, RPV50026, RPV50027, RPV50028, RPV50029, RPV50030, RPV50031, RPV50032, RPV50033, RPV50034
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Contact history for an Agent";

describe(`${testCaseName} - ${APIVersion.V5}`, async function () {
    let chatAgent: Agent;
    let startDate: string;
    let endDate: string;
    let response: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-history-for-an-agents/returns-contact-history-for-an-agent-${APIVersion.V5}.json`);
    let historicalReportingAPIs = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V5}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let agentID: string = chatAgent.agentID;
            let startDateOrg: string = startDate;
            let endDateOrg: string = endDate;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV50030") {
                    //with Path param contains special chars
                    let agentIdSpecialChars: Array<string> = Utility.injectTextWithSpecChars(chatAgent.agentID.toString(), "-");
                    for (chatAgent.agentID of agentIdSpecialChars) {
                        response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDate);
                        expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                        expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                    }
                }
                else if (testCaseData.Id == "RPV50032") {
                    //with Query param that contains special chars
                    if (caseData.QueryParams.startDate == "specChars") {
                        //startDate with special chars
                        let startDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(startDateOrg, ".-");
                        for (startDateOrg of startDateSpecialChars) {
                            response = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDateOrg, endDate);
                            expect(response.status).toBe(caseData.Expected.statusCode, "Status code is incorrect");
                            expect(response.header).toBe(caseData.Expected.statusDescription, "Status description is incorrect");
                        }
                    }
                    else if (caseData.QueryParams.endDate == "specChars") {
                        //endDate with special chars
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
                    if (testCaseData.Id == "RPV50025") {
                        //with valid required information
                        chatAgent.agentID = agentID;
                    }
                    else if (testCaseData.Id == "RPV50026") {
                        //with Invalid Token
                        chatAgent.accessToken = chatAgent.accessToken + "invalid";
                    }
                    else if (testCaseData.testData == "invalidAgentId") {
                        if (caseData.PathParams.agentId == "-" || testCaseData.Id == "RPV50028") {
                            //RPV50028: with numeric agentId Path param that contains alphabet chars
                            //RPV50027: with agentId Path param is invalid Number type - negative number
                            chatAgent.agentID = caseData.PathParams.agentId + agentID;
                        }
                        else {
                            //RPV50029: with empty Path param
                            //RPV50027: with agentId Path param is invalid Number type - remaining case
                            chatAgent.agentID = caseData.PathParams.agentId;
                        }
                    }
                    else {
                        //RPV50034: without all Required Query params
                        startDateOrg = caseData.QueryParams.startDate;
                        endDateOrg = caseData.QueryParams.endDate;
                        if (testCaseData.testData == "invalidQueryParams") {
                            //RPV50024: Invalid Query
                            //RPV50031: with invalid Query param
                            //RPV50033:  without Required Query param
                            if (caseData.QueryParams.endDate == "dynamicValue") {
                                endDateOrg = endDate;
                            }
                            else if (caseData.QueryParams.startDate == "dynamicValue") {
                                //without endDate or invalid endDate
                                startDateOrg = startDate;
                            }
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
