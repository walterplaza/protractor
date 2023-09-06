import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120024
 * Tested cluster: HC20
 */

let testCaseName: string = "Transfer Email to a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let apiName: string = "transfer-email-to-a-skill";    
    let ibEmailAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.registerAgent(SkillType.IB_EMAIL);
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(ibEmailAgent, SkillType.IB_EMAIL);

            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a email contact                
                await TestCondition.createInboundEmailForAgent(ibEmailAgent);

                // Transfer email to a skill
                let contactId: string = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
                let res: APIResponse = await emailApis.transferEmailToASkill(ibEmailAgent, contactId, skillId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");

            }
        });
    });

    afterEach(async () => {
        // Post-condition: End all contact
        await CustomAPIs.endAllContacts(ibEmailAgent);
    });
})
