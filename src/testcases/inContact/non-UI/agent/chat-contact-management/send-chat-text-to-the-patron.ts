import ChatContactManagementInstance from "@apis/agent/chat-contact-management/chat-contact-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: AGV120009
 * Tested cluster: SC3
 */

let testCaseName: string = "Send chat text to the patron";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let startChatRes: APIResponse;
    let res: APIResponse;
    let invalidToken = "invalidToken12345671111";

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/send-chat-text-to-the-patron/send-chat-text-to-the-patron-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            //Pre-condition: Start a chat contact
            await chatAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
            startChatRes = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            await CustomAPIs.waitForContactRouteToAgent(chatAgent);
            let contactId = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
            await CustomAPIs.acceptContact(chatAgent, contactId);

            //Keep the valid tokens,id to use later
            let validToken = chatAgent.accessToken;
            let validSessionId = chatAgent.sessionId;
            let validContactId = contactId;

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "AGV20150") {
                    if (caseData.PathParams.sessionId == "specChars") {
                        // Case: with Path param that contains special chars                    
                        let sessionIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validSessionId.toString());
                        for (chatAgent.sessionId of sessionIdWithSpecialCharsArr) {
                            res = await apiClass.sendChatTextToThePatron(chatAgent, contactId, caseData.BodyParams.chatText)
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    }
                    else if (caseData.PathParams.contactId == "specChars") {
                        // Case: with Path param that contains special chars                    
                        let contactIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validContactId.toString(), "-");
                        for (contactId of contactIdWithSpecialCharsArr) {
                            res = await apiClass.sendChatTextToThePatron(chatAgent, contactId, caseData.BodyParams.chatText)
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    }
                }
                else if (testCaseData.Id == "AGV20151") {

                    // Case: with Body param that contains special chars                    
                    let chatTextWithSpecialCharsArr = Utility.injectTextWithSpecChars(caseData.BodyParams.chatText.toString());
                    for (caseData.BodyParams.chatText of chatTextWithSpecialCharsArr) {
                        res = await apiClass.sendChatTextToThePatron(chatAgent, contactId, caseData.BodyParams.chatText)
                        expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                    }
                }
                else {
                    if (testCaseData.Id == "AGV20143") {
                        chatAgent.sessionId = caseData.PathParams.sessionId;
                    }

                    else if (testCaseData.Id == "AGV20146") {
                        chatAgent.accessToken = invalidToken;
                    }

                    else if (testCaseData.Id == "AGV20147" || testCaseData.Id == "AGV20148" || testCaseData.Id == "AGV20144") {
                        contactId = caseData.PathParams.contactId;
                    }

                    else if (testCaseData.Id == "AGV20149") {
                        if (testCaseData.Data.indexOf(caseData) == 0) {
                            chatAgent.sessionId = validSessionId;
                            contactId = caseData.PathParams.contactId;
                        }
                        else if (testCaseData.Data.indexOf(caseData) == 1) {
                            chatAgent.sessionId = caseData.PathParams.sessionId;
                            contactId = validContactId;
                        }
                        else if (testCaseData.Data.indexOf(caseData) == 2) {
                            chatAgent.sessionId = caseData.PathParams.sessionId;
                            contactId = caseData.PathParams.contactId;
                        }
                    }
                    res = await apiClass.sendChatTextToThePatron(chatAgent, contactId, caseData.BodyParams.chatText);
                    expect(res.status).toBe(caseData.Expected.statusCode);
                }

                //Restore all path params to correct value after each running
                chatAgent.accessToken = validToken;
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        }
        catch (error) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(chatAgent);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
