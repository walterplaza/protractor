import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import AddressBookManagementVersion12 from "@apis/admin/address-book-management/address-book-management-v12";

export interface IAddressBookManagement {
    returnsAListOfAddressBooks(agent: Agent);
    createANewAddressBook(agent: Agent, addressBookName?: any, addressBookType?: any);
    deleteAnExistingAddressBook(agent: Agent, addressBookId?: any);
    assignEntitiesToAnAddressBook(agent: Agent, addressBookId: any, entityId: any, entityType: any);
    returnsEntriesForADynamicAddressBook(agent: Agent, addressBookId: any, fullLoad: any, updatedSince: any, top?: any, skip?: any, orderby?: any);
    createOrUpdateDynamicAddressBookEntries(agent: Agent, addressBookId: any, fullLoad: any, externalId: any, firstName?: any, lastName?: any, phone?: any);
    deleteADynamicAddressBookEntry(agent: Agent, addressBookId?: any, externalId?: any);
    listsAllStandardAddressBookEntriesForAnAddressBook(agent: Agent, addressBookId?: any, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any, updateSince?: any);
    createStandardAddressBookEntries(agent: Agent, addressBookId?: any, firstName?: any, lastName?: any, comapny?: any, phone?: any, mobile?: any, email?: any);
    updateStandardAddressBookEntries(agent: Agent, addressBookId?: any, addressBookEntries?: any);
    deleteAStandardAddressBookEntry(agent: Agent, addressBookId?: any, addressBookEntryId?: any);
    returnsAddressBooksForAnAgent(agent: Agent, includeEntries?: any, updatedSince?: any);
    returnsAddressBooksForACampaign(agent: Agent, campaignId?: any, includeEntries?: any, updatedSince?: any);
    returnsAddressBooksForASkill(agent: Agent, skillId?: any, includeEntries?: any, updatedSince?: any);
    returnsAddressBooksForATeam(agent: Agent, teamId?: any, includeEntries?: any, updatedSince?: any);
}

export default class AddressBookManagementInstance {

    static getAddressBookManagementInstance(): IAddressBookManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new AddressBookManagementVersion12();
        }
    }
}
