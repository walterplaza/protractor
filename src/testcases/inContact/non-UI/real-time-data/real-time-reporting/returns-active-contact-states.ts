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
 * TC ID: RTV120005
 * Tested cluster: TC4, HC22
 */
let testCaseName: string = "Returns active Contact states";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let agent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-active-contact-states/returns-active-contact-states-${TestRunInfo.versionAPI}.json`);
    let realTimeReportingAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            agent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                
                let response: APIResponse = await realTimeReportingAPI.returnsActiveContactStates(agent);
                expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                expect(response.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
            }
        });
    })
})
