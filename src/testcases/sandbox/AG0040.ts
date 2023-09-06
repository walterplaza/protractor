import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import APInstanceCore from "@apis/incontact-apis-test";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 314458
 * Tested cluster: SC1
 */
let TC = "POST agent-sessions/{sessionId}/interactions/{contactId}/typing";
let version = "8.0";

describe('TC + version', async function () {
    let chatAgent: Agent;
    let skillId: any;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let configFile: string = `src/test-data/inContact/apis/Agents/ChatRequests/POST_agent-sessions.{sessionId}.interactions.{contactId}.typing/POST_agent-sessions.{sessionId}.interactions.{contactId}.typing_V${version}.json`
    let jsonPath: string = Utility.getPath(configFile);
    let dataTestCases = require(jsonPath);
    let apiClass = APInstanceCore.getInstanceAPICore(version);

    dataTestCases.map(async function (data) {
        it(`TC ${TC}, V${version} - ${data.Description}`, async function () {
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await Logger.write(FunctionType.TESTCASE, `TC ${TC}, V${version} - ${data.Description}`);

            // Step 2 start or join session inC-API
            // Step 3 start chat inC-API
            // Step 4 create chat contact inC-API
            // Step 5 accept chat contact inC-API
            // Step 6 POST agent-sessions.(sessionId).interactions.(contactId).typing
            // End chat

            await CustomAPIs.startOrJoinSession(chatAgent, "4000100010");
            let chatResponse: APIResponse = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            let bodyJson: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(chatAgent, APIVersion.V8)
            let chatSID: string = await TestHelpers.getChatSessionID(chatResponse);
            let chatCID: number = await TestHelpers.getContactID(chatResponse);
            await CustomAPIs.acceptContact(chatAgent, chatCID);

            for (let a = 0; a < data.Data.length; a++) {
                if (data.Id == "AG0040") {
                    let sendChatRes: APIResponse = await CustomAPIs.sendChat(chatAgent, chatSID, "me", "abc123");
                    expect(sendChatRes.status).toBe(data.Data[a].Expected.statusCode, "Chat is not sent");
                } else if (data.Id == "AG0052") {
                    let sendChatRes: APIResponse = await CustomAPIs.sendChat(chatAgent, chatSID + "abc", "me", "abc123");
                    expect(sendChatRes.status).toBe(data.Data[a].Expected.statusCode, "Chat is sent with invalid session");
                    expect(sendChatRes.getErrorDescription()).toBe(data.Data[a].Expected.statusDescription, "Describe Chat is sent with invalid session");
                }
                else if (data.Id == "AG0054") {
                    let sendChatRes: APIResponse = await CustomAPIs.sendChat(chatAgent, "", "me", "abc123");
                    expect(sendChatRes.status).toBe(data.Data[a].Expected.statusCode, "Chat is sent with empty session");
                    expect(sendChatRes.getErrorDescription()).toBe(data.Data[a].Expected.statusDescription, "Describe Chat is sent with empty session");
                }
                else if (data.Id == "AG0055") {
                    let sendChatRes: APIResponse = await CustomAPIs.sendChat(chatAgent, "#" + chatSID, "me", "abc123");
                    expect(sendChatRes.status).toBe(data.Data[a].Expected.statusCode, "Chat is sent with with special chars")
                    expect(sendChatRes.getErrorDescription()).toBe(data.Data[a].Expected.statusDescription, "Describe Chat is sent special character")
                }
            }
        });
    })

    afterEach(async () => {
        await CustomAPIs.endAllContacts(chatAgent);
    }, TestRunInfo.conditionTimeout);

})
