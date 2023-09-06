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
 * TC ID: 476213
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Blue_Full - 476213", function () {

    let chatAgent: Agent;
    let date: Date = new Date();
    let lastUpdateTime: number = Utility.convertDateToTimestamp(date.toString(), "ddd MMM DD YYYY");
    let bodyJson: string = `{"campaigns":"","deltasOnly":true,"lastUpdateTime":${lastUpdateTime},"mediaTypes":"","skills":"","userId":""}`;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `476213 - CXone > Dashboards > Skill Summary > Capture JSON response > Cachesite > Verify the status 200 (OK) of the service for Skill Summary`);
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('476213 - CXone Dashboards Skill Summary Capture JSON response Cachesite Verify the status 200 (OK) of the service for Skill Summary', async () => {

        // Send API POST  POST cacheSite/EvolveCacheService.svc/rest/GetSkillActivityEntryList
        let response: APIResponse = await inContactAPIs.postSkillSummary(chatAgent, bodyJson);

        // VP: You get a Status Code: 200
        expect(response.status).toBe(200, "Status code is not correct");
    });
});