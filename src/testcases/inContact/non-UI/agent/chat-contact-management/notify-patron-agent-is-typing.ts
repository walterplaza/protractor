import ChatContactManagementInstance from "@apis/agent/chat-contact-management/chat-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120012
 * Tested cluster: SC3
 */

let testCaseName: string = "Notify Patron Agent is Typing";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startChatRes: APIResponse;
    let contactId: number;
    let res: APIResponse;
    let skillJson: string = `{"agentTypingIndicator": true}`;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/notify-patron-agent-is-typing/notify-patron-agent-is-typing-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.setUpAgent(SkillType.CHAT,null, null, skillJson);
            // let skillId: number = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
            // await CustomAPIs.updateSkillBySkillId(chatAgent,skillId,skillJson);
            for (let caseData of testCaseData.Data) {
                let isTyping = caseData.BodyParams.isTyping;
                let isTextEntered = caseData.BodyParams.isTextEntered;

                //Pre-condition: Start a chat contact
                await chatAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
                await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
                startChatRes = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                contactId = await CustomAPIs.getContactID(startChatRes);

                // Accept a chat contact
                await CustomAPIs.acceptContact(chatAgent, contactId);

                res = await apiClass.notifyPatronAgentIsTyping(chatAgent, contactId, isTyping, isTextEntered);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                
                // Post-condition: End all contact
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
                await CustomAPIs.endAllContacts(chatAgent);
            }
        });
    })
})