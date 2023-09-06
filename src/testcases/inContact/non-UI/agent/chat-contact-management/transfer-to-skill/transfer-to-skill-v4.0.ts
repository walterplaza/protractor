import ChatContactManagementInstance from "@apis/agent/chat-contact-management/chat-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120011
 * Tested cluster: SC3
 */

let testCaseName: string = "Transfer to Skill";

describe(`${testCaseName} - ${APIVersion.V4}`, function () {
    let chatAgent: Agent;
    let targetAgent: Agent;
    let startChatRes: APIResponse;
    let res: APIResponse;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/transfer-to-skill/transfer-to-skill-${APIVersion.V4}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V4}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V4}`);

            //Pre-condition: Start a chat contact
            await chatAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
            startChatRes = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            await CustomAPIs.waitForContactRouteToAgent(chatAgent);
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            let contactId = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
            await CustomAPIs.acceptContact(chatAgent, contactId);
            let targetSkillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);

            //Keep the valid tokens,id to use later
            let validSessionId = chatAgent.sessionId;
            let validContactId = contactId;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV40081") {
                    if (caseData.PathParams.sessionId == "specChars") {
                        // Case: with Path param that contains special chars                    
                        let sessionIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validSessionId.toString());
                        for (chatAgent.sessionId of sessionIdWithSpecialCharsArr) {
                            res = await apiClass.transferToSkill(chatAgent, contactId, targetSkillId);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code does not match expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description does not match expected.");
                        }
                    }
                    else if (caseData.PathParams.contactId == "specChars") {
                        chatAgent.sessionId = validSessionId;
                        // Case: with Path param that contains special chars                    
                        let contactIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validContactId.toString(), "-");
                        for (contactId of contactIdWithSpecialCharsArr) {
                            res = await apiClass.transferToSkill(chatAgent, contactId, targetSkillId);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code does not match expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description does not match expected.");
                        }
                    }
                } else {
                    if (testCaseData.Id == "AGV40078") {
                        contactId = caseData.PathParams.contactId;
                    }
                    else if (testCaseData.Id == "AGV40079") {
                        contactId = "abc" + contactId;
                    }
                    else if (testCaseData.Id == "AGV40080") {
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
                    else if (testCaseData.Id == "AGV40082"||testCaseData.Id == "AGV40083") {
                        targetSkillId = caseData.BodyParams.targetSkillId;
                    }
                
                    res = await apiClass.transferToSkill(chatAgent, contactId, targetSkillId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Error Code does not match expected.");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description does not match expected.");
                }
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
                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(chatAgent);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
