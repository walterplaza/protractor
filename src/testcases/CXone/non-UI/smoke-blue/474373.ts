import { Agent, AgentType } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: API
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 474373
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Blue_Full - 474373", function () {
    let adminAgent: Agent;
    let currentDate = new Date();
    let date: number;
    let json: string;
    let response: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `474373 - CXone > Dashboards > Unavailable Statistics > Capture JSON response > Verify the status 200 (OK) of the service for Unavailable statistics`);
        adminAgent = TestRunInfo.cluster.getCxOneAgent(AgentType.CXONE_ADMIN);
        date = Utility.convertDateToTimestamp(currentDate.toString(), "ddd MMM DD YYYY");
        json = `{"userId":"","startDate":"\/Date(${date})\/","endDate":"\/Date(${date})\/","agents":[${adminAgent.agentID}],"teams":[]}`;
    }, TestRunInfo.conditionTimeout);

    it('474373 - Post Unavailable Statistics', async () => {

        // Post Unavailable Statistics request
        response = await TestHelpers.postUnavailableStatistics(adminAgent, json);

        // VP: Status code 200
        expect(response.status).toBe(200, "The status does not return as expectation")
    });
});