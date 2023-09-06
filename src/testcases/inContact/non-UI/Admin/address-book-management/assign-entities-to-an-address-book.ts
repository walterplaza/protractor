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
 * TC ID: ADV120004
 * Tested cluster: TC4
 */

let testCaseName: string = "Assign Entities to an Address Book";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/assign-entities-to-an-address-book/assign-entities-to-an-address-book-${TestRunInfo.versionAPI}.json`);
    let AddressBookManagementAPI = AddressBookManagement.getAddressBookManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre condition
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Create Address Book and Entity
            let addressBookName: string = "ADV120004_addressBookName" + Utility.createRandomString(3);
            let addressBookType: string = "Standard";

            await AddressBookManagementAPI.createANewAddressBook(chatAgent, addressBookName, addressBookType);
            let addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);
            await AddressBookManagementAPI.createStandardAddressBookEntries(chatAgent, addressBookId, "Test", "API", "LogiGear", chatAgent.phoneNumber, "40000100011", chatAgent.email);
            let entityId = await CustomAPIs.getAddressBookEntryIdById(chatAgent, parseInt(addressBookId));

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await AddressBookManagementAPI.assignEntitiesToAnAddressBook(chatAgent, addressBookId, entityId, "Agent");
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }

            // Post condition
            // Delete Address Book and Entity
            await AddressBookManagementAPI.deleteAStandardAddressBookEntry(chatAgent, addressBookId, entityId);
            await AddressBookManagementAPI.deleteAnExistingAddressBook(chatAgent, addressBookId);
        });
    })
})
