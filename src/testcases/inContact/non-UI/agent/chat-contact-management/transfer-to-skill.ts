import ChatContactManagementInstance from "@apis/agent/chat-contact-management/chat-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
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

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let targetAgent: Agent;
    let startChatRes: APIResponse;
    let contactId: number;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/chat-contact-management/transfer-to-skill/transfer-to-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatContactManagementInstance.getChatContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            targetAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
            await TestCondition.setUpAndAssignSkill(targetAgent,SkillType.CHAT);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a chat contact
                await chatAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
                startChatRes = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
                await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
                await CustomAPIs.waitForContactRouteToAgent(chatAgent);
                contactId = await CustomAPIs.getCurrentContactId(chatAgent,SkillCore.getSkillName(SkillType.CHAT));
                await CustomAPIs.acceptContact(chatAgent, contactId);

                // Accept a chat contact
                await targetAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(targetAgent, targetAgent.phoneNumber);
                await CustomAPIs.setAgentState(targetAgent, MaxState.AVAILABLE);
                let targetSkillId = await CustomAPIs.getSkillIdFromSkillName(targetAgent, SkillType.IB_Phone);
                res = await apiClass.transferToSkill(chatAgent, contactId, targetSkillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
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
                await CustomAPIs.endAllContacts(targetAgent);
                await CustomAPIs.endAllContacts(chatAgent);
                await TestCondition.setUpAndRemoveSkill(targetAgent,SkillType.CHAT)
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
