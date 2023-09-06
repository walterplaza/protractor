import GeneralAdminManagement from "@apis/admin/general-admin-management/general-admin-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: ADV120082
 * Tested cluster: TC4
 */

let testCaseName: string = "Updates a Message Template";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/updates-a-message-template/updates-a-message-template-${TestRunInfo.versionAPI}.json`);
    let GeneralAdminManagementAPI = GeneralAdminManagement.getGeneralAdminManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre condition
            let templateId = await CustomAPIs.getRandomTemplateId(chatAgent);
            let templateName: string = "ADV120082_" + Utility.createRandomString(5);
            if (templateId == "No result") {
                await GeneralAdminManagementAPI.createsAMessageTemplate(chatAgent, templateName, "1", "test");

            }

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await GeneralAdminManagementAPI.updatesAMessageTemplate(chatAgent, templateId, templateName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
