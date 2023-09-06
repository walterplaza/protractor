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
 * TC ID: ADV120002
 * Tested cluster: SC1
 */

let testCaseName: string = "Create a new Address Book";
describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/address-book-management/create-a-new-address-book/create-a-new-address-book-${TestRunInfo.versionAPI}.json`);
    let apiClass = AddressBookManagement.getAddressBookManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.createANewAddressBook(chatAgent, caseData.QueryParams.addressBookName, caseData.QueryParams.addressBookType);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                let addressBookId = await CustomAPIs.getAddressBookIdByName(chatAgent, caseData.QueryParams.addressBookName);
                await apiClass.deleteAnExistingAddressBook(chatAgent, addressBookId);
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post-condition: End all contact
            await CustomAPIs.endAllContacts(chatAgent);
        } catch (err) { }
        finally {
            try { } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
