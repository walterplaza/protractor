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
 * TC ID: AGV120008
 * Tested cluster: SC3
 */

let testCaseName: string = "Restore a chat to an active state";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let startChatRes1: APIResponse;
    let startChatRes2: APIResponse;
    let contactId1: number;
    let contactId2: number;
    let res: APIResponse;
    let maxConcurrentChats = `{"maxConcurrentChats": 5}`;
    // `{"emailParking":true}`;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/restore-a-chat-to-an-active-state/restore-a-chat-to-an-active-state-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.setUpAgent(SkillType.CHAT, null, null, maxConcurrentChats);
            for (let caseData of testCaseData.Data) {

                // Pre-condition: Start the first chat contact
                await chatAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
                await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
                startChatRes1 = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                contactId1 = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
                await CustomAPIs.waitForContactRouteToAgent(chatAgent);
                await CustomAPIs.acceptContact(chatAgent, contactId1);

                // Pre-condition: Start the second chat contact
                startChatRes2 = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                contactId2 = await CustomAPIs.getContactID(startChatRes2);
                await CustomAPIs.waitForContactRouteToAgent(chatAgent, 100);
                await CustomAPIs.acceptContact(chatAgent, contactId2);

                // Active a chat contact
                res = await apiClass.restoreAChatToAnActiveState(chatAgent, contactId1);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-91323 [TestAutomation][inC-API] Status code 404-Invalid contact Id is returned when accepting multi chat sessions with the API POST v2.0/agent-sessions/{sessionId}/interactions/{contactId}/accept");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(chatAgent);
            }
        });
    })
})
