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
 * TC ID: 380818
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 380818", function () {
    let workitemAgent: Agent;
    let bodyJson: APIResponse;
    let workItemResponse: APIResponse;
    let currentContactID: number;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `380818 - [VC] Verify Work Item Routability & Contact End`);
        workitemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);

    }, TestRunInfo.conditionTimeout);

    it('380818 - Verify Work Item Routability and Contact End', async () => {

        // 2. Start Agent session
        // 3. Launch MAX
        await CustomAPIs.startOrJoinSession(workitemAgent, workitemAgent.phoneNumber);

        // 4. Set Agents's state is Available
        await CustomAPIs.setAgentState(workitemAgent, MaxState.AVAILABLE);

        // 5. Get a valid WorkItem point of contact
        // 6. Create a workitem for the point of contact
        workItemResponse = await inContactAPIs.postInteractionsWorkItems(workitemAgent, APIVersion.V7, SkillCore.getSkillPOC(SkillType.WORK_ITEM));

        //7	Get the Work Item contact details
        currentContactID = CustomAPIs.getContactID(workItemResponse);

        //8	Logged in agent 'Accepts' the work item 
        // Wait for Chat route to agent
        await CustomAPIs.waitForContactRouteToAgent(workitemAgent);

        // Accept Chat contact
        await CustomAPIs.acceptContact(workitemAgent, currentContactID);

        // 9. Validate the Work Item is active with the logged in agent
        bodyJson = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(workitemAgent, APIVersion.V2);
        await expect(CustomAPIs.isContactActive(bodyJson, ContactName.WORK_ITEM)).toBe(true, "WorkItem is not active");

        // 10. End Work Item
        await CustomAPIs.endContact(workitemAgent, currentContactID);

        // 11. End session
        await CustomAPIs.endSession(workitemAgent);

    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(workitemAgent, SkillType.WORK_ITEM);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});