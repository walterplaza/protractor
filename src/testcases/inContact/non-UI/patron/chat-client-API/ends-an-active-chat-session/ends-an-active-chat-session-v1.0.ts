import CustomAPIs from "@apis/custom-apis";
import ChatClientAPI from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: PTV10002, PTV10003, PTV10004, PTV10005
 * Tested cluster: SC3
 */

let testCaseName: string = "Ends an active Chat Session";

describe(`${testCaseName} - ${APIVersion.V1}`, async function () {
    let chatAgent: Agent;
    let returnResponse: APIResponse;
    let chatSession: string;

    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
        await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
        let chatResponse: APIResponse = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
        chatSession = CustomAPIs.getChatSessionID(chatResponse);
        let chatContactID: number = await CustomAPIs.getContactID(chatResponse);
        await CustomAPIs.waitForContactRouteToAgent(chatAgent);
        await CustomAPIs.acceptContact(chatAgent, chatContactID);  
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`patron/chat-client-API/ends-an-active-chat-session/ends-an-active-chat-session-${APIVersion.V1}.json`);
    let chatClientClass = ChatClientAPI.getChatClientAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V1}`);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV10005") {
                    let specialCharChatSessions: string[] = Utility.injectTextWithSpecChars(chatSession);
                    for (let specialCharChatSession of specialCharChatSessions) {
                        returnResponse = await chatClientClass.endsAnActiveChatSession(chatAgent, specialCharChatSession);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "");
                    }
                } else {
                    if (testCaseData.Id == "PTV10004") {
                        chatSession = caseData.PathParams.chatSession;
                    } else if (testCaseData.Id == "PTV10003") {
                        chatAgent.accessToken = chatAgent.accessToken + Utility.createRandomString(10, "lgvn_");
                    }
                    returnResponse = await chatClientClass.endsAnActiveChatSession(chatAgent, chatSession);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not return as expectation");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header does not return as expectation");
                }
            }
        });
        
        afterEach(async () => {

            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await CustomAPIs.authorize(chatAgent);
                await CustomAPIs.endAllContacts(chatAgent)
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) {
            }
        }, TestRunInfo.conditionTimeout);
    })
})