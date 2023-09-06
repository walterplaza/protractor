import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RTV10042, RTV10043
 * Tested cluster: TC4, HC22
 */
let testCaseName: string = "Returns active Contact states";

describe(`${testCaseName} - ${APIVersion.V1}`, async function () {
    let agent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-active-contact-states/returns-active-contact-states-${APIVersion.V1}.json`);
    let realTimeReportingAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`);

            agent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RTV10043") {
                    // Invalid token
                    agent.accessToken = "Invalid";
                }
                
                let response: APIResponse = await realTimeReportingAPI.returnsActiveContactStates(agent);
                expect(response.status).toBe(caseData.Expected.statusCode, "Status code does not match as expected");
                expect(response.header).toBe(caseData.Expected.statusDescription, "Description does not match as expected");
            }
        });
    })
})
