import AddressBookManagement from "@apis/admin/address-book-management/address-book-management";
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
 * TC ID: ADV120003
 * Tested cluster: SC1
 */

let testCaseName: string = "Delete an existing Address Book";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/delete-an-existing-address-book/delete-an-existing-address-book-${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagement.getAddressBookManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                await apiClass.createANewAddressBook(chatAgent, caseData.QueryParams.addressBookName, caseData.QueryParams.addressBookType);
                let addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, caseData.QueryParams.addressBookName);
                let res: APIResponse = await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
