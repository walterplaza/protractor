import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: RPV120015
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Statistics For A Skill";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let chatAgent: Agent;
    let skillId: any;
    let startDate: String;
    let endDate: String;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-statistics-for-a-skill/returns-statistics-for-a-skill-${APIVersion.V12}.json`);
    let apiClass = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                startDate = await Utility.getNowDate("/", -10);
                endDate = await Utility.getNowDate("/", -3);

                skillId = (await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT));

                let res: APIResponse = await apiClass.returnsStatisticsForASkill(chatAgent, skillId, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
