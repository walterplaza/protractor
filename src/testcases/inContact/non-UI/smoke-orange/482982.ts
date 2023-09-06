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
 * TC ID: 482982
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_Full - 482982", function () {

    let chatAgent: Agent;
    let skillId: number;
    let updateSkillResponse: APIResponse;
    let updateJson: string = '{"xsSettings":{"XSScriptID":null,"XSCheckinScriptID":null,"ExternalOutboundSkill_No":null,"XSSkillChangedActive":false,"XSGetContactsActive":true,"XSFreshThreshold":50,"XSAvailableThreshold":150,"XSReadyThreshold":100,"XSNumberToRetrieve":50}}';

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `482982 - API V13 - PUT Update Skill XS Settings`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('482982 - API V13 PUT Update Skill XS Settings', async () => {

        // Get SkillId
        skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);

        // Update skill
        updateSkillResponse = await inContactAPIs.putSkillsSkillIdParametersXsSettings(chatAgent, APIVersion.V13, skillId, updateJson);

        // Verify Status code
        expect(updateSkillResponse.status).toBe(200, "Status code is not correct");
        expect(updateSkillResponse.header).toBe("Success", "Status description is not correct");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) {
            }
        }
    }, TestRunInfo.conditionTimeout);
});