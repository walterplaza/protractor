import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 407331
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 407331", function () {

    let chatAgent: Agent;
    let startDate: string = Utility.addDateToCurrentDate(-1);
    let endDate: string = Utility.addDateToCurrentDate();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `407331 - inContact API Realtime GET Specific Team Performance Summary Single V3 Success`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('407331 - inContact API Realtime GET Specific Team Performance Summary Single V3 Success', async () => {

        // Execute API GET v3.0/teams/{teamId}/performance-total
        let response: APIResponse = await inContactAPIs.getTeamsTeamIdPerformanceTotal(chatAgent, APIVersion.V3, chatAgent.teamID, startDate, endDate);

        // Verify status
        expect(response.status).toBe(200, "Status code is not correct");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});