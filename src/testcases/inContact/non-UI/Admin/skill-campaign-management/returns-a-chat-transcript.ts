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
import GeneralContactManagementInstance from "@apis/admin/general-contact-management/general-contact-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120127
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns a Chat Transcript";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let startChatRes: APIResponse;
    let contactId: any;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-a-chat-transcript/returns-a-chat-transcript-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralContactManagementInstance.getGeneralContactManagementInstance();

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
                contactId = await CustomAPIs.getContactID(startChatRes);
                if (testCaseData.Id == "ADV20002") {
                    contactId = contactId + "alphabetchars";
                }
                else if (testCaseData.Id == "ADV20003" || testCaseData.Id == "ADV20004") {
                    contactId = caseData.PathParams.contactId;
                }     
                    res = await apiClass.returnsAChatTranscript(chatAgent, contactId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");    
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            await CustomAPIs.endAllContacts(chatAgent)
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
