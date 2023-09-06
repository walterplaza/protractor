import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: API
 * Suite: Smoke_Automated_Blue_Full
 * TC ID: 474379
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Blue_Full - 474379", function () {

    let chatAgent: Agent;
    let currentDate = new Date();
    let date: number = Utility.convertDateToTimestamp(currentDate.toString(), "ddd MMM DD YYYY");

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `474379 - CXone > Dashboards > ACD > Agent Performance by Hour > JSON - Verify the status 200 (OK) of the service for Agent Performance by Hour`);
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('474379 - CXone Dashboards ACD Agent Performance by Hour JSON Verify the status 200 OK of the service for Agent Performance by Hour', async () => {

        let json: string = `{"userId":"","startDate":"\/Date(${date})\/","endDate":"\/Date(${date})\/","agents":[${chatAgent.agentID}],"teams":[]}`;

        // Send API POST /ReportService/WCFEvolveService.svc/rest/Reporting/GetAgentPerformanceByHourEntryList
        let response: APIResponse = await inContactAPIs.postAgentPerformanceByHourEntryList(chatAgent, json);

        //VP: Status should be 200 OK.
        expect(response.status).toBe(200, "Status code is not correct");
    });
});