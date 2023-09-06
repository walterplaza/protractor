import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 380816
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 380816", function () {
    let chatAgent: Agent;
    let ibCallAgent: Agent;
    let dialCallResponse: APIResponse;
    let setAgentStateResponse: APIResponse;
    let getContactActiveResponse: APIResponse;
    let bodyJson: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `380816 - [VC] Verify Inbound Phone Routability & Contact End`);
        ibCallAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('380816 - VC Verify Inbound Phone Routability Contact End', async () => {
        // 1. Establish agent session
        await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);

        // 2. Initiate an Inbound Phone call without any errors
        await CustomAPIs.startOrJoinSession(ibCallAgent, ibCallAgent.phoneNumber);
        dialCallResponse = await inContactAPIs.postAgentSessionsSessionIdDialSkill(ibCallAgent, APIVersion.V2, SkillCore.getSkillName(SkillType.IB_Phone));

        // VP: API calls should return a 202 response
        expect(dialCallResponse.status).toBe(202, "Cannot dial call API calls is not returned a 202 response");

        // 3. Set Agent 'Available so Phone call can route to the agent.
        setAgentStateResponse = await inContactAPIs.postAgentSessionsSessionIdState(chatAgent, APIVersion.V2, MaxState.AVAILABLE);

        // VP: API calls should return a 202 response
        expect(setAgentStateResponse.status).toBe(202, "Cannot set agent state API calls is not returned a 202 response");

        // 4. Wait for phone contact to become active
        await CustomAPIs.waitForContactRouteToAgent(chatAgent);
        getContactActiveResponse = await inContactAPIs.getContactsActive(chatAgent, APIVersion.V6);

        // VP: API calls should return a 202 response
        expect(getContactActiveResponse.status).toBe(200, "Cannot get contact active API calls is not returned a 202 response");

        // VP: Check that returned list has an active phone contact (MediaTypeId of 4)
        expect(await CustomAPIs.isContactActiveExist(getContactActiveResponse, "4")).toBe(true, "Returned list does not have an active phone contact");

        // VP: Validate phone call is active with logged in agent
        bodyJson = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(chatAgent, APIVersion.V2);
        expect(CustomAPIs.isContactActive(bodyJson, ContactName.PHONE_CALL)).toBe(true, "Call contact is not active");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        }
        catch (error) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
                await TestCondition.setAgentSkillsToDefault(ibCallAgent, SkillType.IB_Phone);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})