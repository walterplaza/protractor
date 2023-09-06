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
 * TC ID: ADV120009
 * Tested cluster: SC1
 */

let testCaseName: string = "Create Standard Address Book Entries";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let addressBookId: any;
    let addressBook: any;
    let addressBookEntries: any;
   
    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Admin/address-book-management/create-standard-address-book-entries/create-standard-address-book-entries_${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagementInstance.getAddressBookManagementInstance()

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            let addressBookName = "ADV120009_" + Utility.createRandomString(5);
            let addressBookType = "Standard";
            addressBookEntries = "ADV" + Utility.createRandomString(3);
            for (let caseData of testCaseData.Data) {
                addressBook = await apiClass.createANewAddressBook(chatAgent, addressBookName, addressBookType);
                addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, addressBookName);
                let res: APIResponse = await apiClass.createStandardAddressBookEntries(chatAgent, addressBookId, addressBookEntries);
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await apiClass.deleteAStandardAddressBookEntry(chatAgent, addressBookId, addressBookEntries);
                await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
