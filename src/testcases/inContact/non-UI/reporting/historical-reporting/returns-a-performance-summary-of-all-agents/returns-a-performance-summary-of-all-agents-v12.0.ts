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
 * TC ID: RPV120005
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

            for (let caseData of testCaseData.Data) {

                res = await apiCoreClass.returnsAPerformanceSummaryOfAllAgents(chatAgent, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");

            }
        });
    })
})