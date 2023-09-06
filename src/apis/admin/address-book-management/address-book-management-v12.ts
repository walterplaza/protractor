import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { IAddressBookManagement } from "./address-book-management";

export default class AddressBookManagementVersion12 implements IAddressBookManagement {

    async returnsAListOfAddressBooks(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfAddressBooks, err.message);
        }
    }

    async createANewAddressBook(agent: Agent, addressBookName: any = "", addressBookType: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("addressBookName", addressBookName);
            options.addBody("addressBookType", addressBookType);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createANewAddressBook, err.message);
        }
    }

    async deleteAnExistingAddressBook(agent: Agent, addressBookId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAnExistingAddressBook, err.message);
        }
    }

    async assignEntitiesToAnAddressBook(agent: Agent, addressBookId: any = "", entityId: any = "", entityType: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/assignment`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"entityType":"${entityType}","addressBookAssignments":[{"entityId":"${entityId}"}]}`;
            return await APICore.request(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignEntitiesToAnAddressBook, err.message);
        }
    }

    async returnsEntriesForADynamicAddressBook(agent: Agent, addressBookId: any = "", fullLoad: any = "", updatedSince: any = "", top: any = "", skip: any = "", orderby: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/dynamic-entries`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderby", orderby);
            options.addParam("fullLoad", fullLoad);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsEntriesForADynamicAddressBook, err.message);
        }
    }

    async createOrUpdateDynamicAddressBookEntries(agent: Agent, addressBookId: any, fullLoad: any, externalId: any, firstName: any = "", lastName: any = "", phone: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/dynamic-entries`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"fullLoad": "${fullLoad}", "addressBookEntries":[{"externalId": "${externalId}","stateId": "", "externalState": "", "firstName":"${firstName}","middleName":"","lastName":"${lastName}","company":"","phone":"${phone}","mobile":"","email":""}]}`;
            return await APICore.request(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createOrUpdateDynamicAddressBookEntries, err.message);
        }
    }

    async deleteADynamicAddressBookEntry(agent: Agent, addressBookId: any = "", externalId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/dynamic-entries/${externalId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteADynamicAddressBookEntry, err.message);
        }
    }

    async listsAllStandardAddressBookEntriesForAnAddressBook(agent: Agent, addressBookId: any = "", searchString: any = "", fields: any = "", skip: any = "", top: any = "", orderBy: any = "", updateSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/entries`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            options.addParam("updateSince", updateSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.listsAllStandardAddressBookEntriesForAnAddressBook, err.message);
        }
    }

    async createStandardAddressBookEntries(agent: Agent, addressBookId: any = "", firstName: any = "", lastName: any = "", comapny: any = "", phone: any = "", mobile: any = "", email: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/entries`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"addressBookEntries":[{"firstName":"${firstName}","middleName":"","lastName":"${lastName}","company":"${comapny}","phone":"${phone}","mobile":"${mobile}","email":"${email}"}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createStandardAddressBookEntries, err.message);
        }

    }

    async updateStandardAddressBookEntries(agent: Agent, addressBookId: any = "", firstName: any = "", lastName: any = "", comapny: any = "", phone: any = "", email: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/entries`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json = `{"addressBookEntries":[{"addressBookEntryId":"","firstName":"${firstName}","middleName":"","lastName":"","company":"","phone":"","mobile":"","email":""}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateStandardAddressBookEntries, err.message);
        }

    }

    async deleteAStandardAddressBookEntry(agent: Agent, addressBookId: any = "", addressBookEntryId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/address-books/${addressBookId}/entries/${addressBookEntryId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAStandardAddressBookEntry, err.message);
        }
    }

    async returnsAddressBooksForAnAgent(agent: Agent, includeEntries: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/agents/${agent.agentID}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAddressBooksForAnAgent, err.message);
        }
    }

    async returnsAddressBooksForACampaign(agent: Agent, campaignId: any = "", includeEntries: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/campaigns/${campaignId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAddressBooksForACampaign, err.message);
        }
    }

    async returnsAddressBooksForASkill(agent: Agent, skillId: any = "", includeEntries: any = "", updatedSince: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/skills/${skillId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAddressBooksForASkill, err.message);
        }
    }

    async returnsAddressBooksForATeam(agent: Agent, teamId: any = "", includeEntries: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/teams/${teamId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAddressBooksForATeam, err.message);
        }
    }
}