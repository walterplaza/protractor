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
 * TC ID: 380152
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 380152", function () {

    let chatAgent: Agent;
    let response: APIResponse;
    let startDate: string = Utility.addDateToCurrentDate(0, -1);
    let endDate: string = Utility.addDateToCurrentDate(-1);

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `380152 - inContact API > Reporting > GET contacts/completed > V8 > Success`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT)
    }, TestRunInfo.conditionTimeout);

    it('380152 - inContact API Reporting GET contacts completed V8 Success', async () => {

        // Execute API GET v8.0/contacts/completed
        response = await inContactAPIs.getContactsCompleted(chatAgent, APIVersion.V8, startDate, endDate, "10");

        // Verify status 
        expect(response.status).toBe(200, "Status code is not correct");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);

});