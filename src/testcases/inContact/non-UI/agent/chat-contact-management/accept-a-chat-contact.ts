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
 * TC ID: AGV120006
 * Tested cluster: SC3
 */

let testCaseName: string = "Accept a chat contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startChatRes: APIResponse;
    let contactId: number;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/accept-a-chat-contact/accept-a-chat-contact-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await CustomAPIs.endAllContacts(chatAgent);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a chat contact
                await chatAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
                startChatRes = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
                await CustomAPIs.waitForContactRouteToAgent(chatAgent)
                contactId = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
                
                // Accept a chat contact
                res = await apiClass.acceptAChatContact(chatAgent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
