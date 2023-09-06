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
 * TC ID: 481910
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_Full - 481910", function () {
    let pcPhoneAgent: Agent;
    let updateJson: string = '{"skill":{"skillName":"Update12345","isActive":false}}';
    let defaultJson: string = `{"skill":{"skillName":"PCPhone","isActive":false}}`;


    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `481910 - API V13 - PUT Update Skill`);
        pcPhoneAgent = await TestCondition.setUpAgent(SkillType.CHAT, true);
    }, TestRunInfo.conditionTimeout);

    it('481910 - API V13 PUT Update Skill', async () => {

        // Get SkillId
        let skillId: number = await CustomAPIs.getSkillIdFromSkillName(pcPhoneAgent, SkillType.PC_PHONE);

        // Update skill
        let updateSkillResponse: APIResponse = await inContactAPIs.putSkillsSkillId(pcPhoneAgent, APIVersion.V13, skillId, updateJson);

        // Verify Status code
        expect(updateSkillResponse.status).toBe(200, "Status code is not correct");
        expect(updateSkillResponse.header).toBe("Success", "Status description is not correct");

        // Return default setting
        await inContactAPIs.putSkillsSkillId(pcPhoneAgent, APIVersion.V13, skillId, defaultJson);
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(pcPhoneAgent, SkillType.CHAT);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});