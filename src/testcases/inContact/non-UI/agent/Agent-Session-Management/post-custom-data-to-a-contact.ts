import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
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
 * TC ID: AGV120062
 * Tested cluster: SC3
 */

let testCaseName: string = "Post custom data to a Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/post-custom-data-to-a-contact/post-custom-data-to-a-contact-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            //Pre-condition: Start a chat contact
            await chatAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            let chatResponse: APIResponse = await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            let chatContactID: number = await CustomAPIs.getContactID(chatResponse);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV120062") {
                    let returnResponse: APIResponse = await apiClass.postCustomDataToAContact(chatAgent, chatContactID);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
    })
})
