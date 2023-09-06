import CustomAPIs from "@apis/custom-apis";
import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
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
 * TC ID: ADV120063
 * Tested cluster: SC1
 */

let testCaseName: string = "Get a File";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let fileName = "abc.txt";
    let file ="";
    let overwrite = true;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-admin-management/get-a-file/get-a-file-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                await apiClass.uploadsAFile(chatAgent,fileName,file,overwrite);
                let res: APIResponse = await apiClass.getAFile(chatAgent,fileName);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
