import CustomAPIs from "@apis/custom-apis";
import ChatClientAPI from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: PTV120008
 * Tested cluster: SC3
 */

let testCaseName: string = "Sends Agent a Chat Preview";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;


    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, `{"patronTypingPreview":true}`);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`patron/chat-client-API/sends-agent-a-chat-preview/sends-agent-a-chat-preview-${TestRunInfo.versionAPI}.json`);
    let apiClassChat = ChatClientAPI.getChatClientAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            let chatResponse: APIResponse = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            await CustomAPIs.waitForContactRouteToAgent(chatAgent)
            let chatSession: string = CustomAPIs.getChatSessionID(chatResponse);
            let chatContactID: number = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
            await CustomAPIs.acceptContact(chatAgent, chatContactID);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV120008") {
                    let returnResponse: APIResponse = await apiClassChat.sendsAgentAChatPreview(chatAgent, chatSession, "testing text", "testLabel");
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
        afterEach(async () => {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await CustomAPIs.endAllContacts(chatAgent)
            }
            catch (err) {
            }

        }, TestRunInfo.conditionTimeout);
    })
})