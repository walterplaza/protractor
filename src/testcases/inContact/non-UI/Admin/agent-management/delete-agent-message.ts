import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility, JsonUtility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120034
 * Tested cluster: SC3
 */

let testCaseName: string = "Delete agent message";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "delete-agent-message";
    let agentMessage: string = `test`;
    let createMessageRes: APIResponse;
    let messageId: string;
    let startDate: string;
    let validUntil: string;
    let expireMinute: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre-condition: create an agent message
            startDate = Utility.getNowDate("-", 0);
            validUntil = Utility.getNowDate("-", 2);
            expireMinute = Utility.getRandomNumber(1);
            createMessageRes = await apiClass.createAnAgentMessage(chatAgent, agentMessage, startDate, validUntil, expireMinute);
            messageId = JsonUtility.getFieldValue(createMessageRes.body, `agentMessageResults[0].agentMessageId`);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.deleteAgentMessage(chatAgent, messageId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
