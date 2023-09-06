import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120014
 * Tested cluster: TC4
 */
let testCaseName: string = "Returns statistics for all Skills";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
        await Logger.write(FunctionType.TESTCASE, `agentID is ${chatAgent.agentID}`);
    }, TestRunInfo.conditionTimeout);
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-statistics-for-all-skills/returns-statistics-for-all-skills-${APIVersion.V12}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV120014") {
                    let returnResponse = await apiCoreClass.returnsStatisticsForAllSkills(chatAgent, caseData.QueryParams.startDate, caseData.QueryParams.endDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })
})