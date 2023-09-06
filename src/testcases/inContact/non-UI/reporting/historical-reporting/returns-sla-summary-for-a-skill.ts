import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120017
 * Tested cluster: TC4
 */
let testCaseName: string = "Returns sla summary for a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: String;
    let endDate: String;
    let skillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-sla-summary-for-a-skill/returns-sla-summary-for-a-skill-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV120017") {
                    let res = await apiCoreClass.returnsSlaSummaryForASkill(chatAgent, skillId, startDate, endDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })
})