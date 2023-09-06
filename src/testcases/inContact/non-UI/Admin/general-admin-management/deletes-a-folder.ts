import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import { Agent } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { TestCondition } from "@test-helpers/test-condition";
import { SkillType } from "@data-objects/general/skill-core";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120069
 * Tested cluster: TC4
 */

let testCaseName: string = "Deletes a Folder";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let fileName: string;
    let folderName: string ="lgvn";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/deletes-a-folder/deletes-a-folder-${TestRunInfo.versionAPI}.json`);

    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);           
            fileName = Utility.createRandomString(15, `${folderName}/lgvn_`);
            await apiClass.marksAFileToBeProcessed(chatAgent,fileName);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.deletesAFolder(chatAgent,folderName);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
            }
        });
    })
})