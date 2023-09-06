import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120087
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns a single point of contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let pointOfContactID: string
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/returns-a-single-point-of-contact/returns-a-single-point-of-contact-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                pointOfContactID = await CustomAPIs.getPointContactIDByName(chatAgent,SkillCore.getSkillPOC(SkillType.WORK_ITEM));
                let res: APIResponse = await apiClass.returnsASinglePointOfContact(chatAgent,pointOfContactID);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
           }
        });
    })
})