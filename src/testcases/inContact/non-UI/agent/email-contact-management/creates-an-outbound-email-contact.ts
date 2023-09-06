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
import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120019
 * Tested cluster: SC3
 */

let testCaseName: string = "Creates an outbound Email Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let emailAgent: Agent;
    let res: APIResponse;
    let apiName: string = "creates-an-outbound-email-contact";
    let skillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            emailAgent = await TestCondition.registerAgent(SkillType.OB_EMAIL);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a email contact
                await emailAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(emailAgent, emailAgent.phoneNumber);
                await CustomAPIs.setAgentState(emailAgent, MaxState.AVAILABLE);
                skillId = await CustomAPIs.getSkillIdFromSkillName(emailAgent, SkillType.OB_EMAIL);

                // Create a ob email contact
                res = await emailApis.createsAnOutboundEmailContact(emailAgent, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(emailAgent);
            }
        });
    })
})
