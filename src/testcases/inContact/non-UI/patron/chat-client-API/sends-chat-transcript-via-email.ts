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
 * TC ID: PTV120009
 * Tested cluster: SC3
 */

let testCaseName: string = "Sends chat transcript via email";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let chatTranscript: string = "[{ 'Label': '', 'PartyTypeId': 2,'PartyTypeValue': '2', 'Text': 'Hello, this a test', 'Timestamp': '2019-02-26T18:23:30.690Z' }, { 'Label': '', 'PartyTypeId': 2, 'PartyTypeValue': '2', 'Text': 'a', 'Timestamp': '2019-02-26T18:24:57.170Z' }]";
    let dataFullTest = Utility.readJsonAPI(`patron/chat-client-API/sends-chat-transcript-via-email/sends-chat-transcript-via-email-${TestRunInfo.versionAPI}.json`);
    let apiClassChat = ChatClientAPI.getChatClientAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV120009") {
                    let returnResponse: APIResponse = await apiClassChat.sendsChatTranscriptViaEmail(chatAgent, chatAgent.email, chatAgent.email, chatTranscript);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
    })
})
