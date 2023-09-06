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
 * TC ID: ADV120011
 * Tested cluster: SC3
 */

let testCaseName: string = "Delete a Standard Address Book Entry";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let addressBookName: string = "Test API";
    let addressBookType: string = "Standard";
    let addressBookId: number;
    let addressBookEntryId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/delete-a-standard-address-book-entry/delete-a-standard-address-book-entry-${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagementInstance.getAddressBookManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Create A New Standard AddressBook
            await apiClass.createANewAddressBook(chatAgent, addressBookName, addressBookType);
            let tmp_addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);

            //Create A New Standard AddressBook Entries 
            addressBookId = parseInt(tmp_addressBookId);
            await apiClass.createStandardAddressBookEntries(chatAgent, addressBookId, "Test", "API", "LogiGear", chatAgent.phoneNumber, "40000100011", chatAgent.email);
            addressBookEntryId = await CustomAPIs.getAddressBookEntryIdById(chatAgent, addressBookId);

            for (let caseData of testCaseData.Data) {
            let res: APIResponse = await apiClass.deleteAStandardAddressBookEntry(chatAgent, addressBookId, addressBookEntryId);
            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        // Clean up
        await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
    }, TestRunInfo.conditionTimeout);
})
