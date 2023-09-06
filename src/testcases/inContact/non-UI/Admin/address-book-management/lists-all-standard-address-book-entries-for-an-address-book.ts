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
 * TC ID: ADV120008
 * Tested cluster: SC1
 */

let testCaseName: string = "Lists all standard address book entries for an address book";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let addressBookId: any;
    let addressBook: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Admin/address-book-management/lists-all-standard-address-book-entries-for-an-address-book/lists-all-standard-address-book-entries-for-an-address-book_${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagementInstance.getAddressBookManagementInstance()

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let addressBookName: string = "ADV120008" + Utility.createRandomString(3);
            let addressBookType: string = "Standard";
            for (let caseData of testCaseData.Data) {
                addressBook = await apiClass.createANewAddressBook(chatAgent, addressBookName, addressBookType);
                addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);
                let res: APIResponse = await apiClass.listsAllStandardAddressBookEntriesForAnAddressBook(chatAgent, addressBookId);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        // Clean up
        await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
    }, TestRunInfo.conditionTimeout);
})