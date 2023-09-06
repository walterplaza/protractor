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
 * TC ID: ADV120007
 * Tested cluster: HC16
 */

let testCaseName: string = "Delete a Dynamic Address Book Entry";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let addressBookId: number;
   
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Admin/address-book-management/delete-a-dynamic-address-book-entry/delete-a-dynamic-address-book-entry-${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagementInstance.getAddressBookManagementInstance()

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            let addressBookName: string = "ADV120009_" + Utility.createRandomString(5);
            let addressBookType: string = "Dynamic";

            // Create A New Standard AddressBook
            await apiClass.createANewAddressBook(chatAgent, addressBookName, addressBookType);
            let tmp_addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);
            addressBookId = parseInt(tmp_addressBookId);

            // Set up create dynamic AddressBook
            let externalId = Utility.createRandomString(5);
            await chatAgent.createPhoneNumber();

            // Create A Dynamic AddressBook
            await apiClass.createOrUpdateDynamicAddressBookEntries(chatAgent, addressBookId, "True", externalId, "Test", "API", chatAgent.phoneNumber);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.deleteADynamicAddressBookEntry(chatAgent, addressBookId, externalId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        // Clean up
        await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
    }, TestRunInfo.conditionTimeout);
})