import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";
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
 * TC ID: RTV120001
 * Tested cluster: TC4, HC16
 */
let testCaseName: string = "Returns the current state for all Agents";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let updatedSince: any;
    let res: APIResponse;

    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-the-current-state-for-all-agents/returns-the-current-state-for-all-agents-${TestRunInfo.versionAPI}.json`);
    let realTimeReportingAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {

            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            updatedSince = "";

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RTV30031") {
                    let specCharArray: string[] = Utility.injectTextWithSpecChars(caseData.QueryParams.updatedSince);
                    for (let updatedSince of specCharArray) {
                        res = await realTimeReportingAPI.returnsTheCurrentStateForAllAgents(chatAgent, updatedSince);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    }
                } else {
                    if (testCaseData.Id == "RTV10041" || testCaseData.Id == "RTV30029" || testCaseData.Id == "RTV40125") {
                        chatAgent.accessToken = caseData.PathParams.token;
                    } else if (testCaseData.Id == "RTV30027" || testCaseData.Id == "RTV30030" || testCaseData.Id == "RTV40123") {
                        updatedSince = caseData.QueryParams.updatedSince;
                    }
                    res = await realTimeReportingAPI.returnsTheCurrentStateForAllAgents(chatAgent, updatedSince);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })
})