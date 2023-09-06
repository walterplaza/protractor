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
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120064
 * Tested cluster: SC3
 */

let testCaseName: string = "Moves an email into focus";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startChatRes1: APIResponse;
    let startChatRes2: APIResponse;
    let startChatRes3: APIResponse;
    let contactId1: number;
    let contactId2: number;
    let contactId3: number;
    let res: APIResponse;

    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/moves-an-email-into-focus/moves-an-email-into-focus-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();
    let apiClassAgent = AgentSessionManagementInstance.getAgentSessionManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a chat contact
                await chatAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
                startChatRes1 = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                startChatRes2 = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                startChatRes3 = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                contactId1 = await CustomAPIs.getContactID(startChatRes1);
                contactId2 = await CustomAPIs.getContactID(startChatRes2);
                contactId3 = await CustomAPIs.getContactID(startChatRes3);
                await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);

                await apiClass.acceptAChatContact(chatAgent, contactId1);

                apiClass.addAChatContact(chatAgent)
                await apiClass.acceptAChatContact(chatAgent, contactId2);

                apiClass.addAChatContact(chatAgent)
                await apiClass.acceptAChatContact(chatAgent, contactId3);

                res = await apiClassAgent.movesAnEmailIntoFocus(chatAgent, contactId1);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(chatAgent);
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
