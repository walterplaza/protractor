import CustomAPIs from "@apis/custom-apis";
import ChatClientAPI from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: PTV100007, PTV100008, PTV100009, PTV100010, PTV100011, PTV100012, PTV100013, PTV100014
 * Tested cluster: SC3
 */

let testCaseName: string = "Sends text to members of the chat session";

describe(`${testCaseName} - ${APIVersion.V10}`, async function () {
    let chatAgent: Agent;
    let label: string;
    let message: string;
    let returnResponse: APIResponse;

    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`patron/chat-client-API/sends-text-to-members-of-the-chat-session/sends-text-to-members-of-the-chat-session-${APIVersion.V10}.json`);
    let patronApis = ChatClientAPI.getChatClientAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V10}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V10}`);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);

            // Start chat
            let chatResponse: APIResponse = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            let chatSession: string = CustomAPIs.getChatSessionID(chatResponse);
            let chatContactID: number = await CustomAPIs.getContactID(chatResponse);

            // Accept chat
            await CustomAPIs.acceptContact(chatAgent, chatContactID);

            let label: string = "you";
            let message: string = "This is a test message";

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV100009") {
                    // Case: chatSession contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(chatSession, ".-");

                    for (let chatSessionWithSpecialChar of specialCharTextArr) {

                        returnResponse = await patronApis.sendsTextToMembersOfTheChatSession(chatAgent, chatSessionWithSpecialChar, label, message);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                } else if (testCaseData.Id == "PTV100010") {
                    // Case: message contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(message, ".-");

                    for (let messageWithSpecialChar of specialCharTextArr) {

                        returnResponse = await patronApis.sendsTextToMembersOfTheChatSession(chatAgent, chatSession, label, messageWithSpecialChar);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                } else {
                    if (testCaseData.testData == "invalidBodyField") {
                        // "PTV100011", "PTV100012": without Required Body field  
                        // "PTV100013", "PTV100014": empty Body fields            
                        label = caseData.BodyParams.label;
                        message = caseData.BodyParams.message;
                    } else if (testCaseData.Id == "PTV100008") {
                        chatSession = caseData.PathParams.chatSession;
                    }

                    returnResponse = await patronApis.sendsTextToMembersOfTheChatSession(chatAgent, chatSession, label, message);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.")
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.")

                }
            }
        });

    })
})
