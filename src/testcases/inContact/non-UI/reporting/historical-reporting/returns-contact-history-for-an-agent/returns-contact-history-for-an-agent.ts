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
 * TC ID: RPV120001, RPV20196, RPV20197, RPV20198, RPV20199, RPV20200, RPV20201, RPV20202, RPV20203, RPV20204, RPV20205
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Contact history for an Agent";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: string;
    let endDate: string;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-history-for-an-agents/returns-contact-history-for-an-agent-${TestRunInfo.versionAPI}.json`);
    let historicalReportingAPIs = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let agentID: string = chatAgent.agentID;
            let startDateOrg: string = startDate;
            let endDateOrg: string = endDate;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV20201") {
                    let agentIdSpecialChars: Array<string> = Utility.injectTextWithSpecChars(chatAgent.agentID.toString(), ".-");
                    for (chatAgent.agentID of agentIdSpecialChars) {
                        res = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDate);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else if (testCaseData.Id == "RPV20203") {
                    if (caseData.QueryParams.startDate == "") {
                        let startDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(startDateOrg, ".-");
                        for (startDateOrg of startDateSpecialChars) {
                            res = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDateOrg, endDate, caseData.QueryParams.mediaTypeName);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                    else if (caseData.QueryParams.endDate == "") {
                        let endDateSpecialChars: Array<string> = Utility.injectTextWithSpecChars(endDateOrg, ".-");
                        for (endDateOrg of endDateSpecialChars) {
                            res = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDateOrg, caseData.QueryParams.mediaTypeName);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                    else if (caseData.QueryParams.mediaTypeName != "") {
                        let mediaNameSpecialChars: Array<string> = Utility.injectTextWithSpecChars(caseData.QueryParams.mediaTypeName.toString());
                        for (caseData.QueryParams.mediaTypeName of mediaNameSpecialChars) {
                            res = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDate, endDate, caseData.QueryParams.mediaTypeName);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                }
                else {
                    if (testCaseData.Id == "RPV20197") {
                        chatAgent.accessToken = chatAgent.accessToken + "invalid";
                    }
                    else if (testCaseData.Id == "RPV20202") {
                        startDateOrg = startDate + caseData.QueryParams.startDate;
                        endDateOrg = endDate + caseData.QueryParams.endDate;
                    }
                    else if (testCaseData.Id == "RPV20204") {
                        if (caseData.QueryParams.startDate == "") {
                            startDateOrg = "";
                        }
                        else if (caseData.QueryParams.endDate == "") {
                            startDateOrg = endDate;
                            endDateOrg = "";
                        }
                    }
                    else if (testCaseData.Id == "RPV20205") {
                        startDateOrg = caseData.QueryParams.startDate;
                        endDateOrg = caseData.QueryParams.endDate;
                    }
                    else if (testCaseData.Id == "RPV20196") {
                        chatAgent.agentID = agentID;
                    }
                    else {
                        if (caseData.PathParams.agentId == "-" || testCaseData.Id == "RPV20199") {
                            chatAgent.agentID = caseData.PathParams.agentId + agentID;
                        }
                        else {
                            chatAgent.agentID = caseData.PathParams.agentId;
                        }
                    }
                    res = await historicalReportingAPIs.returnsContactHistoryForAnAgent(chatAgent, startDateOrg, endDateOrg, caseData.QueryParams.mediaTypeName);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
})
