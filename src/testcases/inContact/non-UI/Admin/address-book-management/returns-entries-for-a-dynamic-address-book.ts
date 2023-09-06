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
 * TC ID: ADV120005
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns entries for a Dynamic Address Book";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let addressBookId: string;
    let entityId: string;

    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/returns-entries-for-a-dynamic-address-book/returns-entries-for-a-dynamic-address-book-${TestRunInfo.versionAPI}.json`);
    let AddressBookManagementAPI = AddressBookManagement.getAddressBookManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre condition
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Create Address Book and Entity
            let addressBookName: string = "ADV120005_addressBookName" + Utility.createRandomString(3);
            let addressBookType: string = "Dynamic";

            await AddressBookManagementAPI.createANewAddressBook(chatAgent, addressBookName, addressBookType);
            addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);
            entityId = await CustomAPIs.createAndgetAddressBookDynamicEntryIdById(chatAgent, parseInt(addressBookId));
            await AddressBookManagementAPI.assignEntitiesToAnAddressBook(chatAgent, addressBookId, entityId, "Agent");

            //Need a small wait for the entries permantly assign to address book
            await Utility.delay(3)

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await AddressBookManagementAPI.returnsEntriesForADynamicAddressBook(chatAgent, addressBookId, caseData.QueryParams.fullLoad, caseData.QueryParams.updatedSince);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post condition
            // Delete Address Book and Entity            
            await AddressBookManagementAPI.deleteADynamicAddressBookEntry(chatAgent, addressBookId, "1");
            await AddressBookManagementAPI.deleteAnExistingAddressBook(chatAgent, addressBookId);
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
