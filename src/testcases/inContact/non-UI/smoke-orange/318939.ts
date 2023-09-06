import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { AddressBook, AddressBookEntries } from "@data-objects/inContact/central/admin/users/address-books/address-book";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: API
 * Suite: SMOKE_Automated_Orange_Full, Smoke_Automated_Blue_Full
 * TC ID: 318939
 * Tested cluster: SC1
 */

describe("SMOKE_Automated_Orange_OF - 318939", function () {
    let chatAgent: Agent;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `318939 - inContact API > Admin > DELETE  Address Book Standard Entries> V8 > Success`);
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    it('318939 - DELETE Address Book Standard Entries', async () => {

        // 1. Pre-Condition 
        // 1.1 The BU has an address book
        // 1.2 Standard and has entries
        let addressBook = new AddressBook().initData()
        let addressBookEntriesData = new AddressBookEntries().initData(chatAgent.email);
        let entriesInfo: string = '{"addressBookEntries":[{"firstName":"' + addressBookEntriesData.firstName + '","middleName":"","lastName":"' + addressBookEntriesData.lastName + '","company":"","phone":"","mobile":"","email":"' + addressBookEntriesData.email + '"}]}';
        let addressBookId: number = await CustomAPIs.getAddressBookId(chatAgent, addressBook);
        let addressBookEntriesId: number = await CustomAPIs.getAddressBookEntryId(chatAgent, addressBookId, entriesInfo);

        // 2. Log into JS Test
        // 3. Select "Admin API" scope 
        // 4. Select "/v3.0/address-books/{addressBookId}/entries/{addressBookEntryId} api 
        // 5. Enter a valid {addressBookId} and {addressBookEntryId} into the relative uri
        // 6. Execute API 
        let deleteAddressBookEntryRes: APIResponse = await inContactAPIs.deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(chatAgent, APIVersion.V3, addressBookId, addressBookEntriesId);

        // 7. Verify Status code 
        expect(await deleteAddressBookEntryRes.status).toBe(202, "Can not delete address books entries");

        // 8. Verify Status description
        expect(await deleteAddressBookEntryRes.header).toBe("Accepted", "Can not delete address books entries");

        // Final
        await inContactAPIs.deleteAddressBooksAddressBookId(chatAgent, APIVersion.V4, addressBookId);
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
            }
            catch (err) {
            }
        }
    }, TestRunInfo.conditionTimeout);
});