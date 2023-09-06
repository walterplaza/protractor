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
 * TC ID: AGV120028
 * Tested cluster: SC3
 */

let testCaseName: string = "Restore an Email";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let apiName: string = "restore-an-email";
    let ibEmailAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.registerAgent(SkillType.IB_EMAIL);

            // Start a email contact
            await TestCondition.createInboundEmailForAgent(ibEmailAgent);

            // Get contactId
            let contactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await emailApis.restoreAnEmail(ibEmailAgent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Cannot Restore an Email");
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
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
