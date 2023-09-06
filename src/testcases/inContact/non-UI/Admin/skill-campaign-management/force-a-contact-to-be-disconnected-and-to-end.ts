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
 * TC ID: ADV120130
 * Tested cluster: SC3
 */

let testCaseName: string = "Force a contact to be disconnected and to end";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let startChatRes: APIResponse;
    let contactId: number;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/force-a-contact-to-be-disconnected-and-to-end/force-a-contact-to-be-disconnected-and-to-end-${TestRunInfo.versionAPI}.json`);
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

                // Accept a chat contact
                res = await apiClass.forceAContactToBeDisconnectedAndToEnd(chatAgent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                
                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(chatAgent);
            }
        });
    })
})
