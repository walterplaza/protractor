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
 * TC ID: ADV120081
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns a Message Template";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/returns-a-message-template/returns-a-message-template-${TestRunInfo.versionAPI}.json`);
    let GeneralAdminManagementAPI = GeneralAdminManagement.getGeneralAdminManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre condition
            let templateId = await CustomAPIs.getRandomTemplateId(chatAgent);
            if (templateId == "No result") {
                let templateName: string = "ADV120082_" + Utility.createRandomString(5);
                await GeneralAdminManagementAPI.createsAMessageTemplate(chatAgent, templateName, "1", "test");

            }

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await GeneralAdminManagementAPI.returnsAMessageTemplate(chatAgent, templateId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
