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
 * TC ID: RTV120002
 * Tested cluster: TC4
 */
let testCaseName: string = "Returns the current state for an agent";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-the-current-state-for-an-agent/returns-the-current-state-for-an-agent-${TestRunInfo.versionAPI}.json`);
    let realTimeReportingAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RTV30022" || testCaseData.Id == "RTV30025" || testCaseData.Id == "RTV40118" || testCaseData.Id == "RTV40121")
                    chatAgent.agentID = caseData.PathParams.agentId;
                else if (testCaseData.Id == "RTV30024" || testCaseData.Id == "RTV40120")
                    chatAgent.accessToken = caseData.PathParams.token;
                else if (testCaseData.Id == "RTV30026" || testCaseData.Id == "RTV40122")
                    chatAgent.agentID = caseData.PathParams.agentId + chatAgent.agentID;

                let res: APIResponse = await realTimeReportingAPI.returnsTheCurrentStateForAnAgent(chatAgent);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})