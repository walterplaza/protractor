import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 380819
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 380819", function () {

    let chatAgent: Agent;
    let pointOfContact: string;
    let chatResponse: APIResponse;
    let chatContactId: number;
    let bodyJson: APIResponse;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `380819 - [VC] Verify Single Chat Routability & Contact End`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);

    }, TestRunInfo.conditionTimeout);

    it('380819 - Verify Single Chat Routability Contact End', async () => {

        // 2. Session Established
        await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);

        // 3. Do test
        // 4. Set Agents's state is Available
        await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);

        // 5. Get Chat Point of contact
        pointOfContact = await CustomAPIs.getPointOfContactAddress(chatAgent, SkillType.CHAT);

        // 6. Start Chat session
        chatResponse = await inContactAPIs.postContactsChats(chatAgent, APIVersion.V9, pointOfContact);

        // 7. Get Chat Contact detail 
        chatContactId = CustomAPIs.getContactID(chatResponse);

        // 8. Logging Agent Accept
        // 8.1 Wait for Chat route to agent
        await CustomAPIs.waitForContactRouteToAgent(chatAgent);
        // 8.2 Accept Chat contact
        await CustomAPIs.acceptContact(chatAgent, chatContactId);

        // 9. Validate the chat contact is active
        bodyJson = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(chatAgent, APIVersion.V2);
        await expect(CustomAPIs.isContactActive(bodyJson, ContactName.CHAT)).toBe(true, "Chat contact is not active");

        // 10. End Chat contact
        await CustomAPIs.endContact(chatAgent, chatContactId);

        // 10.1 End session
        await CustomAPIs.endSession(chatAgent);
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