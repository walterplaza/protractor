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
 * TC ID: RPV120003, RPV70055, RPV70056, RPV70057, RPV70058, RPV70059
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Agent Login History";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: any;
    let endDate: any;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-agent-login-history/returns-agent-login-history-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let agentID = chatAgent.agentID;

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "RPV70059") {
                    let agentIdspecialChars: Array<string> = Utility.injectTextWithSpecChars(chatAgent.agentID.toString());

                    for (let id of agentIdspecialChars) {
                        chatAgent.agentID = id;
                        res = await apiCoreClass.returnsAgentLoginHistory(chatAgent, startDate, endDate);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else if (testCaseData.Id == "RPV120003") {
                    chatAgent.agentID = agentID;
                    res = await apiCoreClass.returnsAgentLoginHistory(chatAgent, startDate, endDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
                else {
                    if (caseData.PathParams.agentId == "-" || testCaseData.Id == "RPV70057" || testCaseData.Id == "RPV70055") {
                        chatAgent.agentID = caseData.PathParams.agentId + agentID;
                    }

                    else {
                        chatAgent.agentID = caseData.PathParams.agentId;
                    }

                    res = await apiCoreClass.returnsAgentLoginHistory(chatAgent, startDate, endDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
})