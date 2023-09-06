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
 * TC ID: AGV120010
 * Tested cluster: SC3
 */

let testCaseName: string = "Transfer to Agent";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let targetAgent: Agent;
    let res: APIResponse;
    let startChatRes: APIResponse

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
        targetAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(targetAgent, SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/transfer-to-agent/transfer-to-agent-${TestRunInfo.versionAPI}.json`);
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

            // Accept a chat contact
            await CustomAPIs.acceptContact(chatAgent, contactId);

            //Pre-condition: Start a 2nd contact
            await targetAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgent, targetAgent.phoneNumber);
            await CustomAPIs.setAgentState(targetAgent, MaxState.AVAILABLE);

            //Keep the valid tokens,id to use later
            let validSessionId = chatAgent.sessionId;
            let validContactId = contactId;

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV40074") {
                    if (caseData.PathParams.sessionId == "specChars") {
                        // Case: with Path param that contains special chars                    
                        let sessionIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validSessionId.toString());
                        for (chatAgent.sessionId of sessionIdWithSpecialCharsArr) {
                            res = await apiClass.transferToAgent(chatAgent, contactId, targetAgent.agentID);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    }
                    else if (caseData.PathParams.contactId == "specChars") {
                        chatAgent.sessionId = validSessionId;
                        // Case: with Path param that contains special chars                    
                        let contactIdWithSpecialCharsArr = Utility.injectTextWithSpecChars(validContactId.toString(), "-");
                        for (contactId of contactIdWithSpecialCharsArr) {
                            res = await apiClass.transferToAgent(chatAgent, contactId, targetAgent.agentID);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    }
                }
                else {
                    if (testCaseData.Id == "AGV40071") {
                        contactId = caseData.PathParams.contactId;
                    }
                    else if (testCaseData.Id == "AGV40072") {
                        contactId = "abc" + contactId;
                    }
                    else if (testCaseData.Id == "AGV40073") {
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
                    else if (testCaseData.Id == "AGV40075") {
                        targetAgent.agentID = caseData.BodyParams.targetAgentId;
                    }
                    else if (testCaseData.Id == "AGV40076") {
                        targetAgent.agentID = "abc" + targetAgent.agentID;
                    }

                    res = await apiClass.transferToAgent(chatAgent, contactId, targetAgent.agentID);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
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
                await TestCondition.setUpAndRemoveSkill(targetAgent,SkillType.CHAT )
                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(chatAgent);
                await CustomAPIs.endAllContacts(targetAgent);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
