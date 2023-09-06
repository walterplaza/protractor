import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 481900
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 481900", function () {

    let ibPhoneAgent: Agent;
    let getSkillResponse: APIResponse;
    let assignedSkill: number;
    let response: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `481900 - API V13 - GET Skills`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);

        // Pre-Condition
        getSkillResponse = await inContactAPIs.getAgentsAgentIdSkills(ibPhoneAgent, APIVersion.V9);
        assignedSkill = CustomAPIs.getSkillIdAssignedToAgent(getSkillResponse);

    }, TestRunInfo.conditionTimeout);

    it('481900 - API V13 GET Skills', async () => {

        // 4. Send API GET /services/v13.0/skills/Skill-Id
        response = await inContactAPIs.getSkillsSkillId(ibPhoneAgent, APIVersion.V13, assignedSkill);

        // VP: verify status code 200
        expect(await response.status).toBe(200, "Can not get Skill with version V13");

        // VP: Verify status description Success
        expect(await response.header).toBe("Success", "Success header is not displayed")
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_EMAIL);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});