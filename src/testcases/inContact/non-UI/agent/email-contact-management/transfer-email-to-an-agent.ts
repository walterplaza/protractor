import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { MaxState } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120023
 * Tested cluster: SC3
 */

let testCaseName: string = "Transfer Email to an agent";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let apiName: string = "transfer-email-to-an-agent";
    let ibEmailAgent: Agent;
    let targetAgent: Agent

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.registerAgent(SkillType.IB_EMAIL);
            targetAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(ibEmailAgent, SkillType.IB_EMAIL);

            // Start a email contact
            await TestCondition.createInboundEmailForAgent(ibEmailAgent);
            await CustomAPIs.setAgentState(ibEmailAgent, MaxState.AVAILABLE);
            // Get contactId
            await CustomAPIs.waitForContactRouteToAgent(ibEmailAgent);
            let contactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

            //Pre-condition: Start a 2nd contact
            await targetAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgent, targetAgent.phoneNumber);
            await CustomAPIs.setAgentState(targetAgent, MaxState.AVAILABLE);

            // Transfer a ib email contact
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await emailApis.transferEmailToAnAgent(ibEmailAgent, contactId, targetAgent.agentID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status Code does not match expected");
                expect(res.header).toBe(caseData.Expected.statusDescription, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");
            }
        });
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(ibEmailAgent);
                await CustomAPIs.endAllContacts(targetAgent);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})