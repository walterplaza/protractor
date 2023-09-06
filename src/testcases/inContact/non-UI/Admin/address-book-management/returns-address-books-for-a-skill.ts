import AddressBookManagementInstance from "@apis/admin/address-book-management/address-book-management";
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
 * TC ID: ADV120014
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns Address Books for a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let skillID: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/returns-address-books-for-a-skill/returns-address-books-for-a-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagementInstance.getAddressBookManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            skillID = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
            let res: APIResponse = await apiClass.returnsAddressBooksForASkill(chatAgent, skillID, false);
            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
