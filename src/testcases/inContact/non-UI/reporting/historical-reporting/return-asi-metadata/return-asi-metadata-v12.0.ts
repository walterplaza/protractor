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
 * TC ID: RPV120026
 * Tested cluster: SC1
 */

let testCaseName: string = "Return ASI Metadata";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {
    let agent: Agent;
    let startDate: any;
    let endDate: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/return-asi-metadata/return-asi-metadata-${APIVersion.V12}.json`);
    let historicalReportingAPI = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);
            agent = await TestCondition.registerAgent(SkillType.CHAT);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            for (let caseData of testCaseData.Data) {

                let response: APIResponse = await historicalReportingAPI.returnAsiMetadata(agent, startDate, endDate);
                expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
            }
        });
    })
})
