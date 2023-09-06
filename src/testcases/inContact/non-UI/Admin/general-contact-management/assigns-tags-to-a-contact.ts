import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
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
 * TC ID: ADV120133
 * Tested cluster: HC16
 */

let testCaseName: string = "Assigns Tags to a Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let ibPhone: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Admin/general-contact-management/assigns-tags-to-a-contact/assigns-tags-to-a-contact-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralContactManagementInstance.getGeneralContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibPhone = await TestCondition.registerAgent(SkillType.IB_Phone);

            // Get ContactId 
            let res_ibPhone: APIResponse = await CustomAPIs.startInboundCall(ibPhone, SkillType.IB_Phone);
            let contactId: number = await CustomAPIs.getContactID(res_ibPhone);

            // Get tagId
            let tagId: string = await CustomAPIs.getRandomTagId(ibPhone); 

            for (let caseData of testCaseData.Data) {
                 let res: APIResponse = await apiClass.assignsTagsToAContact(ibPhone, contactId, tagId);
                 expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected"); 
            }
        });
    });
})
