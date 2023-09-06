import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120024
 * Tested cluster: SC3
 */

let testCaseName: string = "Generates a link to a datadownload report";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let apiName: string = "generates-a-link-to-a-datadownload-report";
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let reportingApi = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);

            // Pre-condition: prepare data
            let startDate: string = await Utility.getNowDate("/", -3);
            let endDate: string = await Utility.getNowDate("/", 0);
            let fileName: string = "QA test " + Utility.createRandomString(5) + ".csv";
            let reportId: string = await CustomAPIs.getReportID(chatAgent);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await reportingApi.generatesALinkToADataDownloadReport(chatAgent, reportId, true, fileName, startDate, endDate, false);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
