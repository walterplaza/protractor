import CustomAPIs from "@apis/custom-apis";
import ChatClientAPI from "@apis/patron/chat-client-api/chat-client-api";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: PTV120003
 * Tested cluster: SC3
 */

let testCaseName: string = "Starts a Chat Session";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let dataFullTest = Utility.readJsonAPI(`patron/chat-client-API/starts-a-chat-session/starts-a-chat-session-${TestRunInfo.versionAPI}.json`);
    let apiClass = ChatClientAPI.getChatClientAPIInstance();

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            let chatPOC: string = await CustomAPIs.getPointOfContactAddress(chatAgent, SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV120003") {
                    let chatResponse: APIResponse = await apiClass.startsAChatSession(chatAgent, chatPOC);
                    expect(chatResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
