import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 482082
 * Tested cluster: SC1
 * Note:
 * - Failed by ticket IC-65838 - [TestAutomation] [inC-API] Status code 0 is returned when calling API "GET /services/v13.0/skills/{skillId}/parameters/schedule" with required valid information
 */

describe("SMOKE_Automated_Orange_OF - 482082", function () {

    let getSkillResponse: APIResponse;
    let assignedSkill: number;
    let getSkillsScheduleResponse: APIResponse;
    let adminAgent: Agent;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `482082 - API V13 - GET Skill Schedule - /services/v13.0/skills/{skillId}/parameters/schedule-settings`);
        adminAgent = await TestCondition.setUpAgent(SkillType.CONFIG);
    }, TestRunInfo.conditionTimeout);

    it('482082 - inContact API Admin DELETE files V8 Success', async () => {

        // 4. Send API GET  GET /services/v9.0/agents/{agentId}/skills
        getSkillResponse = await TestHelpers.getAgentsAgentIdSkills(adminAgent, APIVersion.V9);
        assignedSkill = TestHelpers.getSkillIdAssignedToAgent(getSkillResponse);

        // 5. Send API GET /services/v13.0/skills/{skillId}/parameters/schedule-settings
        getSkillsScheduleResponse = await TestHelpers.getSkillsSkillIdParametersScheduleSettings(adminAgent, APIVersion.V13, assignedSkill);

        // VP: Verify status code 200
        expect(await getSkillsScheduleResponse.status).toBe(200, `Failed by ticket IC-65838 - [TestAutomation] [inC-API] Status code 0 is returned when calling API "GET /services/v13.0/skills/{skillId}/parameters/schedule" with required valid information`);

        // VP: Verify status description Success
        expect(await getSkillsScheduleResponse.header).toBe("Success", "Success header is not displayed");
    });
});