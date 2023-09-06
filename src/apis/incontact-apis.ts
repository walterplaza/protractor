import { Agent } from "@data-objects/general/agent";
import { APIVersion, PageName } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { truncateSync } from "fs";


export default class inContactAPIs {
    static async getAgentsAgentIdInteractionRecent(agent: Agent, version: APIVersion, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/interaction-recent`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("top", top);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdInteractionRecent, err.message);
        }
    }

    static async getAgentsAgentIdStates(agent: Agent, version: APIVersion, updatedSince?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdStates, err.message);
        }
    }

    /**
     * Get agent states
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} [reqBUIds]
     * @param {string} [updatedSince]
     * @param {string} [fields]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getAgentsStates(agent: Agent, version: APIVersion, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("reqBUIds", reqBUIds);
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsStates, err.message);
        }
    }

    /**
	 * Get contact active
	 * @static
	 * @param {Agent} agent which is used to start
	 * @returns {APIResponse} response of the API call
	 */
    static async getContactsActive(agent: Agent, version: APIVersion, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/active`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentId", agentId);
            options.addParam("teamId", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            options.addParam("stateId", stateId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsActive, err.message);
        }
    }

    /**
     * Get parked email contact 
     * @static
     * @param {Agent} agent which has parked contact
     * @param {number} contactId of parked email
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async getContactsParked(agent: Agent, version: APIVersion, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/parked`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentId", agentId);
            options.addParam("teamId", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsParked, err.message);
        }
    }

    static async getContactsStates(agent: Agent, version: APIVersion, updatedSince?: string, agentId?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            // options.addParam("updatedSince", updatedSince);
            // options.addParam("agentId", agentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsStates, err.message);
        }
    }

    static async getSkillsSkillIdActivity(agent: Agent, version: APIVersion, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdActivity, err.message);
        }
    }

    static async getSkillsActivity(agent: Agent, version: APIVersion, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsActivity, err.message);
        }
    }

    /**
     * GET /teams/{teamId}/performance-total
     * @static
     * @param {Agent} agent Agent ID
     * @param {string} teamId Team ID
     * @param {string} startDate start date
     * @param {string} endDate end date
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async getTeamsTeamIdPerformanceTotal(agent: Agent, version: APIVersion, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdPerformanceTotal, err.message);
        }
    }

    static async getTeamsPerformanceTotal(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsPerformanceTotal, err.message);
        }
    }

    static async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, version: APIVersion, profileId: number, productBusNo?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/adaptor/securityprofile/${profileId}/permissions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("productBusNo", productBusNo);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAdaptorSecurityprofileProfileIdPermissions, err.message);
        }
    }

    static async postAdaptorTeams(agent: Agent, version: APIVersion, teams?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/adaptor/teams`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("teams", teams);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAdaptorTeams, err.message);
        }
    }

    static async putAdaptorTeams(agent: Agent, version: APIVersion, forceInActive?: any, team?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/adaptor/teams`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceInActive", forceInActive);
            options.addParam("team", team);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAdaptorTeams, err.message);
        }
    }

    static async getAddressBooks(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBooks, err.message);
        }
    }

    static async postAddressBooks(agent: Agent, version: APIVersion, addressBookName: string, addressBookType: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("addressBookName", addressBookName);
            options.addBody("addressBookType", addressBookType);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAddressBooks, err.message);
        }
    }

    /**
    * Delete Address Books by Address Book ID
    * @static
    * @param {Agent} agent 
    * @param {string} addressBookId 
    * @returns {Promise<APIResponse>} 
    * @memberof CustomAPIs
    */
    static async deleteAddressBooksAddressBookId(agent: Agent, version: APIVersion, addressBookId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAddressBooksAddressBookId, err.message);
        }
    }

    static async postAddressBooksAddressBookIdAssignment(agent: Agent, version: APIVersion, addressBookId: number, entityType: string, entityId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/assignment`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let json: string = `{"entityType":"${entityType}","addressBookAssignments":[{"entityId":"${entityId}"}]}`;
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAddressBooksAddressBookIdAssignment, err.message);
        }
    }



    static async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, version: APIVersion, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/dynamic-entries`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderby", orderby);
            options.addParam("fullLoad", fullLoad);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBooksAddressBookIdDynamicEntries, err.message);
        }
    }

    static async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, version: APIVersion, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/dynamic-entries`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fullLoad", fullLoad);
            options.addParam("addressBookEntries", addressBookEntries);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAddressBooksAddressBookIdDynamicEntries, err.message);
        }
    }

    static async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, version: APIVersion, addressBookId: number, externalId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/dynamic-entries/${externalId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAddressBooksAddressBookIdDynamicEntriesExternalId, err.message);
        }
    }

    /**
     * Get address books entries Id
     * GET address-books/{addressBookId}/entries
     * @static
     * @param {Agent} agent 
     * @param {number} addressBookId 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async getAddressBooksAddressBookIdEntries(agent: Agent, version: APIVersion, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/entries`, Method.GET);
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
            throw new errorwrapper.CustomError(this.getAddressBooksAddressBookIdEntries, err.message);
        }
    }

    /**
    * Post Address Books Entries
    * POST address-books/{addressBookId}/entries
    * @static
    * @param {Agent} agent 
    * @param {number} addressBookId 
    * @param {string} entriesinfo 
    * @returns {Promise<APIResponse>} 
    * @memberof CustomAPIs
    */
    static async postAddressBooksAddressBookIdEntries(agent: Agent, version: APIVersion, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/entries`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, addressBookEntries);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAddressBooksAddressBookIdEntries, err.message);
        }
    }

    static async putAddressBooksAddressBookIdEntries(agent: Agent, version: APIVersion, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/entries`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("addressBookEntries", addressBookEntries);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAddressBooksAddressBookIdEntries, err.message);
        }
    }

    /**
     * Delete Address-books entry by Address-books entry Id
     * @static
     * @param {Agent} agent 
     * @param {string} addressBookId 
     * @param {string} addressBookEntryId 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, version: APIVersion, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/address-books/${addressBookId}/entries/${addressBookEntryId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAddressBooksAddressBookIdEntriesAddressBookEntryId, err.message);
        }
    }

    static async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: number, activeOnly?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/admin/teams/${teamId}/unavailable-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("activeOnly", activeOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAdminTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    /**
    * GET All in Unavailable code of cluster
    * @static
    * @param {Agent} agent which has skills
    * @returns {Promise<void>}
    * @memberof CustomAPIs
    */
    static async getAdminUnavailableCodes(agent: Agent, version: APIVersion, activeOnly?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/admin/unavailable-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("activeOnly", activeOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAdminUnavailableCodes, err.message);
        }
    }

    static async getAgentPatterns(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-patterns`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentPatterns, err.message);
        }
    }

    static async getAgents(agent: Agent, version: APIVersion, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updateSince", updateSince);
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgents, err.message);
        }
    }

    static async postAgents(agent: Agent, version: APIVersion, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgents, err.message);
        }
    }

    static async getAgentsAgentId(agent: Agent, version: APIVersion, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentId, err.message);
        }
    }

    static async putAgentsAgentId(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agent", agent);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentsAgentId, err.message);
        }
    }

    static async getAgentsAgentIdAddressBooks(agent: Agent, version: APIVersion, includeEntries?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdAddressBooks, err.message);
        }
    }

    static async deleteAgentsAgentIdAgentSession(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/agent-session`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAgentsAgentIdAgentSession, err.message);
        }
    }

    static async putAgentsAgentIdCustomEvent(agent: Agent, version: APIVersion, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/custom-event`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("eventName", eventName);
            options.addParam("persistInMemory", persistInMemory);
            options.addParam("data", data);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentsAgentIdCustomEvent, err.message);
        }
    }

    static async getAgentsAgentIdGroups(agent: Agent, version: APIVersion, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdGroups, err.message);
        }
    }

    static async getAgentsAgentIdIndicators(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/indicators`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdIndicators, err.message);
        }
    }

    static async getAgentsAgentIdMessages(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/messages`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdMessages, err.message);
        }
    }

    static async getAgentsAgentIdQuickReplies(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/quick-replies`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdQuickReplies, err.message);
        }
    }

    /**
     * Get scheduled- callbacks
     * GET agents/{agentId}/scheduled-callbacks
     * @static
     * @param {Agent} agent 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async getAgentsAgentIdScheduledCallbacks(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/scheduled-callbacks`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdScheduledCallbacks, err.message);
        }
    }

    static async getAgentsAgentIdSkillData(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skill-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdSkillData, err.message);
        }
    }

    /**
     * Get skill id from Agent
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} [mediaTypeId]
     * @param {string} [outboundStrategy]
     * @param {string} [searchString]
     * @param {string} [fields]
     * @param {string} [skip]
     * @param {string} [top]
     * @param {string} [orderBy]
     * @param {*} [isSkillActive]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getAgentsAgentIdSkills(agent: Agent, version: APIVersion, searchString: string=""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam('searchString', searchString);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdSkills, err.message);
        }
    }

    static async deleteAgentsAgentIdSkills(agent: Agent, version: APIVersion, json: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skills`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAgentsAgentIdSkills, err.message);
        }
    }

    static async postAgentsAgentIdSkills(agent: Agent, version: APIVersion, skills?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skills`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skills", skills);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentsAgentIdSkills, err.message);
        }
    }

    static async putAgentsAgentIdSkills(agent: Agent, version: APIVersion, skills?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skills`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skills", skills);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentsAgentIdSkills, err.message);
        }
    }

    static async getAgentsAgentIdSkillsUnassigned(agent: Agent, version: APIVersion, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/skills/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("isSkillActive", isSkillActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdSkillsUnassigned, err.message);
        }
    }

    static async postAgentsAgentIdState(agent: Agent, version: APIVersion, state: string, outStateId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/state`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("state", state);
            options.addBody("outStateId", outStateId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentsAgentIdState, err.message);
        }
    }

    static async getAgentsAgentIdWfmSchedule(agent: Agent, version: APIVersion, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/wfm-schedule`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdWfmSchedule, err.message);
        }
    }

    static async postAgentsAgentIdToKillLogout(agent: Agent, version: APIVersion, agentIdToKill: number, agentId?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agentIdToKill}/logout`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agentId", agentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentsAgentIdToKillLogout, err.message);
        }
    }

    static async postAgentsMessages(agent: Agent, version: APIVersion, agentMessages?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/messages`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agentMessages", agentMessages);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentsMessages, err.message);
        }
    }

    static async deleteAgentsMessagesMessageId(agent: Agent, version: APIVersion, messageId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/messages/${messageId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAgentsMessagesMessageId, err.message);
        }
    }

    static async getAgentsQuickReplies(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/quick-replies`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsQuickReplies, err.message);
        }
    }

    static async getAgentsSkillData(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/skill-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsSkillData, err.message);
        }
    }

    static async getAgentsSkills(agent: Agent, version: APIVersion, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("isSkillActive", isSkillActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsSkills, err.message);
        }
    }

    static async postApplicationsMonitor(agent: Agent, version: APIVersion, label: string, parameter?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/applications/monitor`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("parameter", parameter);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postApplicationsMonitor, err.message);
        }
    }

    static async getBrandingProfiles(agent: Agent, version: APIVersion, businessUnitId?: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/branding-profiles`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("businessUnitId", businessUnitId);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBrandingProfiles, err.message);
        }
    }

    static async getBusinessUnit(agent: Agent, version: APIVersion, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/business-unit`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("includeTrustedBusinessUnits", includeTrustedBusinessUnits);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBusinessUnit, err.message);
        }
    }

    static async getBusinessUnitLicenses(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/business-unit/licenses`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBusinessUnitLicenses, err.message);
        }
    }

    static async getBusinessUnitToggledFeatures(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/business-unit/toggled-features`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBusinessUnitToggledFeatures, err.message);
        }
    }

    static async postCalleridFind(agent: Agent, version: APIVersion, prospectiveContactID: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/callerid/find`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("prospectiveContactID", prospectiveContactID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postCalleridFind, err.message);
        }
    }

    static async getCampaigns(agent: Agent, version: APIVersion, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/campaigns`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCampaigns, err.message);
        }
    }

    static async getCampaignsCampaignId(agent: Agent, version: APIVersion, campaignId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/campaigns/${campaignId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCampaignsCampaignId, err.message);
        }
    }

    static async getCampaignsCampaignIdAddressBooks(agent: Agent, version: APIVersion, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/campaigns/${campaignId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCampaignsCampaignIdAddressBooks, err.message);
        }
    }

    static async deleteContactsContactId(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteContactsContactId, err.message);
        }
    }

    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} contactId
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getContactsContactIdChatTranscript(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/chat-transcript`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdChatTranscript, err.message);
        }
    }

    static async getContactsContactIdEmailTranscript(agent: Agent, version: APIVersion, contactId: number, includeAttachments?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/email-transcript`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeAttachments", includeAttachments);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdEmailTranscript, err.message);
        }
    }

    static async postContactsContactIdEnd(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsContactIdEnd, err.message);
        }
    }

    static async getContactsContactIdFiles(agent: Agent, version: APIVersion, contactId: any, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/files`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdFiles, err.message);
        }
    }

    static async postContactsContactIdMonitor(agent: Agent, version: APIVersion, contactId: number, phoneNumber: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/monitor`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("phoneNumber", phoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsContactIdMonitor, err.message);
        }
    }

    static async postContactsContactIdRecord(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/record`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsContactIdRecord, err.message);
        }
    }

    static async getContactsContactIdSmsTranscripts(agent: Agent, version: APIVersion, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/sms-transcripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("transportCode", transportCode);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("skip", skip);
            options.addParam("top", top);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdSmsTranscripts, err.message);
        }
    }

    static async postContactsContactIdTags(agent: Agent, version: APIVersion, contactId: number, tags?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("tags", tags);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsContactIdTags, err.message);
        }
    }

    static async getContactsSmsTranscripts(agent: Agent, version: APIVersion, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/sms-transcripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("transportCode", transportCode);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsSmsTranscripts, err.message);
        }
    }

    static async getContactStateDescriptions(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contact-state-descriptions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactStateDescriptions, err.message);
        }
    }

    static async getContactStateDescriptionsContactStateId(agent: Agent, version: APIVersion, contactStateId: number, listVar?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contact-state-descriptions/${contactStateId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("listVar", listVar);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactStateDescriptionsContactStateId, err.message);
        }
    }

    static async getCountries(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/countries`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCountries, err.message);
        }
    }

    static async getCountriesCountryIdStates(agent: Agent, version: APIVersion, countryId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/countries/${countryId}/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCountriesCountryIdStates, err.message);
        }
    }

    static async deleteCustomDataDefinition(agent: Agent, version: APIVersion, customDataDefinitionIds?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/custom-data-definition`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("customDataDefinitionIds", customDataDefinitionIds);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteCustomDataDefinition, err.message);
        }
    }

    static async getCustomDataDefinition(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/custom-data-definition`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCustomDataDefinition, err.message);
        }
    }

    static async postCustomDataDefinition(agent: Agent, version: APIVersion, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/custom-data-definition`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("name", name);
            options.addBody("dataType", dataType);
            options.addBody("defaultValue", defaultValue);
            options.addBody("valueRequired", valueRequired);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postCustomDataDefinition, err.message);
        }
    }

    static async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, version: APIVersion, customDataDefinitionId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/custom-data-definition/${customDataDefinitionId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCustomDataDefinitionCustomDataDefinitionId, err.message);
        }
    }

    static async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, version: APIVersion, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/custom-data-definition/${customDataDefinitionId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("name", name);
            options.addParam("dataType", dataType);
            options.addParam("defaultValue", defaultValue);
            options.addParam("valueRequired", valueRequired);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putCustomDataDefinitionCustomDataDefinitionId, err.message);
        }
    }

    static async getDataDefinitionsDataTypes(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/data-definitions/data-types`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDataDefinitionsDataTypes, err.message);
        }
    }

    static async getDispositions(agent: Agent, version: APIVersion, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dispositions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("orderby", orderby);
            options.addParam("isPreviewDispositions", isPreviewDispositions);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositions, err.message);
        }
    }

    static async postDispositions(agent: Agent, version: APIVersion, dispositions?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dispositions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("dispositions", dispositions);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDispositions, err.message);
        }
    }

    static async getDispositionsDispositionId(agent: Agent, version: APIVersion, dispositionId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dispositions/${dispositionId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionsDispositionId, err.message);
        }
    }

    static async putDispositionsDispositionId(agent: Agent, version: APIVersion, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dispositions/${dispositionId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dispositionName", dispositionName);
            options.addParam("classificationId", classificationId);
            options.addParam("isPreviewDisposition", isPreviewDisposition);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putDispositionsDispositionId, err.message);
        }
    }

    static async getDispositionsClassifications(agent: Agent, version: APIVersion, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dispositions/classifications`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionsClassifications, err.message);
        }
    }

    static async getDncGroups(agent: Agent, version: APIVersion, fields?: string, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDncGroups, err.message);
        }
    }

    static async postDncGroups(agent: Agent, version: APIVersion, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("dncGroupName", dncGroupName);
            options.addBody("dncGroupDescription", dncGroupDescription);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroups, err.message);
        }
    }

    static async getDncGroupsGroupId(agent: Agent, version: APIVersion, groupId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDncGroupsGroupId, err.message);
        }
    }

    static async putDncGroupsGroupId(agent: Agent, version: APIVersion, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dncGroupName", dncGroupName);
            options.addParam("dncGroupDescription", dncGroupDescription);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putDncGroupsGroupId, err.message);
        }
    }

    static async getDncGroupsGroupIdContributingSkills(agent: Agent, version: APIVersion, groupId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/contributing-skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDncGroupsGroupIdContributingSkills, err.message);
        }
    }

    static async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, version: APIVersion, groupId: number, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/contributing-skills/${skillId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteDncGroupsGroupIdContributingSkillsSkillId, err.message);
        }
    }

    static async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, version: APIVersion, groupId: number, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/contributing-skills/${skillId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroupsGroupIdContributingSkillsSkillId, err.message);
        }
    }

    static async deleteDncGroupsGroupIdRecords(agent: Agent, version: APIVersion, groupId: number, dncGroupRecords?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/records`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dncGroupRecords", dncGroupRecords);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteDncGroupsGroupIdRecords, err.message);
        }
    }

    static async getDncGroupsGroupIdRecords(agent: Agent, version: APIVersion, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/records`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDncGroupsGroupIdRecords, err.message);
        }
    }

    static async postDncGroupsGroupIdRecords(agent: Agent, version: APIVersion, groupId: number, dncGroupRecords?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/records`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("dncGroupRecords", dncGroupRecords);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroupsGroupIdRecords, err.message);
        }
    }

    static async getDncGroupsGroupIdScrubbedSkills(agent: Agent, version: APIVersion, groupId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/scrubbed-skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDncGroupsGroupIdScrubbedSkills, err.message);
        }
    }

    static async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, version: APIVersion, groupId: number, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/scrubbed-skills/${skillId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteDncGroupsGroupIdScrubbedSkillsSkillId, err.message);
        }
    }

    static async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, version: APIVersion, groupId: number, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/${groupId}/scrubbed-skills/${skillId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroupsGroupIdScrubbedSkillsSkillId, err.message);
        }
    }

    static async postDncGroupsFind(agent: Agent, version: APIVersion, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/find`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillNo", skillNo);
            options.addBody("contactID", contactID);
            options.addBody("timeDialed", timeDialed);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroupsFind, err.message);
        }
    }

    static async postDncGroupsSearch(agent: Agent, version: APIVersion, phoneNumber: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/dnc-groups/search`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("phoneNumber", phoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postDncGroupsSearch, err.message);
        }
    }

    static async getFeedbackCategoriesAndPriorities(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/feedback-categories-and-priorities`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFeedbackCategoriesAndPriorities, err.message);
        }
    }

    static async getFiles(agent: Agent, version: APIVersion, fileName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFiles, err.message);
        }
    }

    /**
     * Upload File
     * @static
     * @param {Agent} agent which is used
     * @param {string} fileName filename value
     * @param {string} file base64 code 
     * @param {string} overwrite yes or no 
     * @memberof CustomAPIs
     */
    static async postFiles(agent: Agent, version: APIVersion, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fileName", fileName);
            options.addBody("file", file);
            options.addBody("overwrite", overwrite);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postFiles, err.message);
        }
    }

    static async putFiles(agent: Agent, version: APIVersion, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("oldPath", oldPath);
            options.addParam("newPath", newPath);
            options.addParam("overwrite", overwrite);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putFiles, err.message);
        }
    }

    /**
     * Delete File
     * @static
     * @param {Agent} agent which is used
     * @param {string} fileName filename value
     * @memberof CustomAPIs
     */
    static async deleteFiles(agent: Agent, version: APIVersion, fileName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteFiles, err.message);
        }
    }

    static async getFilesExternal(agent: Agent, version: APIVersion, folderPath?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files/external`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderPath", folderPath);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFilesExternal, err.message);
        }
    }

    static async postFilesExternal(agent: Agent, version: APIVersion, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files/external`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fileName", fileName);
            options.addBody("file", file);
            options.addBody("overwrite", overwrite);
            options.addBody("needsProcessing", needsProcessing);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postFilesExternal, err.message);
        }
    }

    static async putFilesExternal(agent: Agent, version: APIVersion, fileName?: string, needsProcessing?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/files/external`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            options.addParam("needsProcessing", needsProcessing);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putFilesExternal, err.message);
        }
    }

    static async deleteFolders(agent: Agent, version: APIVersion, folderName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/folders`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderName", folderName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteFolders, err.message);
        }
    }

    static async getFolders(agent: Agent, version: APIVersion, folderName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/folders`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderName", folderName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFolders, err.message);
        }
    }

    static async getGroups(agent: Agent, version: APIVersion, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderBy", orderBy);
            options.addParam("searchString", searchString);
            options.addParam("isActive", isActive);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getGroups, err.message);
        }
    }

    static async postGroups(agent: Agent, version: APIVersion, groups?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("groups", groups);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postGroups, err.message);
        }
    }

    static async getGroupsGroupId(agent: Agent, version: APIVersion, groupId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups/${groupId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getGroupsGroupId, err.message);
        }
    }

    static async putGroupsGroupId(agent: Agent, version: APIVersion, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups/${groupId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("groupName", groupName);
            options.addParam("isActive", isActive);
            options.addParam("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putGroupsGroupId, err.message);
        }
    }

    static async deleteGroupsGroupIdAgents(agent: Agent, version: APIVersion, groupId: number, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups/${groupId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteGroupsGroupIdAgents, err.message);
        }
    }

    static async getGroupsGroupIdAgents(agent: Agent, version: APIVersion, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups/${groupId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("assigned", assigned);
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderBy", orderBy);
            options.addParam("fields", fields);
            options.addParam("searchString", searchString);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getGroupsGroupIdAgents, err.message);
        }
    }

    static async postGroupsGroupIdAgents(agent: Agent, version: APIVersion, groupId: number, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/groups/${groupId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postGroupsGroupIdAgents, err.message);
        }
    }

    static async getHiringSources(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/hiring-sources`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getHiringSources, err.message);
        }
    }

    static async postHiringSources(agent: Agent, version: APIVersion, sourceName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/hiring-sources`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("sourceName", sourceName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postHiringSources, err.message);
        }
    }

    static async getHoursOfOperation(agent: Agent, version: APIVersion, fields: string = "", updatedSince: string = "", skip: any = "", top: any = "", orderby: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/hours-of-operation`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getHoursOfOperation, err.message);
        }
    }

    static async getHoursOfOperationProfileId(agent: Agent, version: APIVersion, profileId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/hours-of-operation/${profileId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getHoursOfOperationProfileId, err.message);
        }
    }

    static async postInteractionsContactIdSignal(agent: Agent, version: APIVersion, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/interactions/${contactId}/signal`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("p1", p1);
            options.addBody("p2", p2);
            options.addBody("p3", p3);
            options.addBody("p4", p4);
            options.addBody("p5", p5);
            options.addBody("p6", p6);
            options.addBody("p7", p7);
            options.addBody("p8", p8);
            options.addBody("p9", p9);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postInteractionsContactIdSignal, err.message);
        }
    }

    static async getListsCallLists(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallLists, err.message);
        }
    }

    static async postListsCallLists(agent: Agent, version: APIVersion, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("listName", listName);
            options.addBody("listExpirationDate", listExpirationDate);
            options.addBody("externalIdColumn", externalIdColumn);
            options.addBody("scoreColumn", scoreColumn);
            options.addBody("customer1Column", customer1Column);
            options.addBody("customer2Column", customer2Column);
            options.addBody("callerIdColumn", callerIdColumn);
            options.addBody("priorityColumn", priorityColumn);
            options.addBody("complianceReqColumn", complianceReqColumn);
            options.addBody("firstNameColumn", firstNameColumn);
            options.addBody("lastNameColumn", lastNameColumn);
            options.addBody("addressColumn", addressColumn);
            options.addBody("cityColumn", cityColumn);
            options.addBody("stateColumn", stateColumn);
            options.addBody("zipColumn", zipColumn);
            options.addBody("timeZoneColumn", timeZoneColumn);
            options.addBody("confirmReqColumn", confirmReqColumn);
            options.addBody("overrideFinalizationColum", overrideFinalizationColum);
            options.addBody("agentIdColumn", agentIdColumn);
            options.addBody("callRequestTimeColumn", callRequestTimeColumn);
            options.addBody("callRequestStaleColumn", callRequestStaleColumn);
            options.addBody("notesColumn", notesColumn);
            options.addBody("expirationDateColumn", expirationDateColumn);
            options.addBody("destinationMappings", destinationMappings);
            options.addBody("customFieldMappings", customFieldMappings);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postListsCallLists, err.message);
        }
    }

    static async getListsCallListsListId(agent: Agent, version: APIVersion, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/${listId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("finalized", finalized);
            options.addParam("includeRecords", includeRecords);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallListsListId, err.message);
        }
    }

    static async deleteListsCallListsListId(agent: Agent, version: APIVersion, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/${listId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceInactive", forceInactive);
            options.addParam("forceDelete", forceDelete);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteListsCallListsListId, err.message);
        }
    }

    static async getListsCallListsListIdAttempts(agent: Agent, version: APIVersion, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/${listId}/attempts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("finalized", finalized);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallListsListIdAttempts, err.message);
        }
    }

    static async postListsCallListsListIdUpload(agent: Agent, version: APIVersion, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/${listId}/upload`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("defaultTimeZone", defaultTimeZone);
            options.addBody("skillId", skillId);
            options.addBody("fileName", fileName);
            options.addBody("forceOverwrite", forceOverwrite);
            options.addBody("expirationDate", expirationDate);
            options.addBody("listFile", listFile);
            options.addBody("startSkill", startSkill);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postListsCallListsListIdUpload, err.message);
        }
    }

    static async getListsCallListsJobs(agent: Agent, version: APIVersion, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/jobs`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            options.addParam("top", top);
            options.addParam("skip", skip);
            options.addParam("orderBy", orderBy);
            options.addParam("startDate", startDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallListsJobs, err.message);
        }
    }

    static async deleteListsCallListsJobsJobId(agent: Agent, version: APIVersion, jobId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/jobs/${jobId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteListsCallListsJobsJobId, err.message);
        }
    }

    static async getListsCallListsJobsJobId(agent: Agent, version: APIVersion, jobId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/call-lists/jobs/${jobId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallListsJobsJobId, err.message);
        }
    }

    static async getListsDncListsPhone(agent: Agent, version: APIVersion, phoneNumber?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/lists/dnc-lists/phone`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("phoneNumber", phoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsDncListsPhone, err.message);
        }
    }

    static async getLocations(agent: Agent, version: APIVersion, includeAgents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/locations`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeAgents", includeAgents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getLocations, err.message);
        }
    }

    static async getMediaTypesMediaTypeId(agent: Agent, version: APIVersion, mediaTypeId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/media-types/${mediaTypeId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMediaTypesMediaTypeId, err.message);
        }
    }

    static async getMessageTemplates(agent: Agent, version: APIVersion, templateTypeId?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/message-templates`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("templateTypeId", templateTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMessageTemplates, err.message);
        }
    }

    static async postMessageTemplates(agent: Agent, version: APIVersion, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/message-templates`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("templateName", templateName);
            options.addBody("templateTypeId", templateTypeId);
            options.addBody("body", body);
            options.addBody("isHTML", isHTML);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("replyToAddress", replyToAddress);
            options.addBody("fromName", fromName);
            options.addBody("fromAddress", fromAddress);
            options.addBody("subject", subject);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postMessageTemplates, err.message);
        }
    }

    static async putMessageTemplatesTemplateId(agent: Agent, version: APIVersion, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/message-templates/${templateId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("templateName", templateName);
            options.addParam("body", body);
            options.addParam("isHTML", isHTML);
            options.addParam("ccAddress", ccAddress);
            options.addParam("bccAddress", bccAddress);
            options.addParam("replyToAddress", replyToAddress);
            options.addParam("fromName", fromName);
            options.addParam("fromAddress", fromAddress);
            options.addParam("subject", subject);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putMessageTemplatesTemplateId, err.message);
        }
    }

    static async getMessageTemplatesTemplateId(agent: Agent, version: APIVersion, templateId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/message-templates/${templateId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getMessageTemplatesTemplateId, err.message);
        }
    }

    static async getPermissionsAgentId(agent: Agent, version: APIVersion, profileId?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/permissions/${agent.agentID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("profileId", profileId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPermissionsAgentId, err.message);
        }
    }

    static async getPhoneCodes(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/phone-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPhoneCodes, err.message);
        }
    }

    /**
     * Get points of contact by using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getPointsOfContact(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/points-of-contact`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPointsOfContact, err.message);
        }
    }

    static async postScheduledCallbacks(agent: Agent, version: APIVersion, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scheduled-callbacks`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("firstName", firstName);
            options.addBody("lastName", lastName);
            options.addBody("phoneNumber", phoneNumber);
            options.addBody("skillId", skillId);
            options.addBody("targetAgentId", targetAgentId);
            options.addBody("scheduleDate", scheduleDate);
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postScheduledCallbacks, err.message);
        }
    }

    /**
     * delete scheduled callbacks
     * DELETE v4.0/scheduled-callbacks/{callbackId}
     * @static
     * @param {Agent} agent 
     * @param {number} callbackId 
     * @param {string} [description] 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async deleteScheduledCallbacksCallbackId(agent: Agent, version: APIVersion, callbackId: number, description?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scheduled-callbacks/${callbackId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("description", description);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteScheduledCallbacksCallbackId, err.message);
        }
    }

    static async putScheduledCallbacksCallbackId(agent: Agent, version: APIVersion, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scheduled-callbacks/${callbackId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("firstName", firstName);
            options.addParam("lastName", lastName);
            options.addParam("phoneNumber", phoneNumber);
            options.addParam("skillId", skillId);
            options.addParam("targetAgentId", targetAgentId);
            options.addParam("scheduleDate", scheduleDate);
            options.addParam("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putScheduledCallbacksCallbackId, err.message);
        }
    }

    /**
     * Returns all of the Scripts that are available for the Business Unit
     * @static
     * @param {Agent} agent
     * @param {string} mediaTypeId
     * @param {string} isActive
     * @param {string} searchString
     * @param {string} fields
     * @param {string} skip
     * @param {string} top
     * @param {string} orderby
     * @param {string} apiVersion
     * @returns {Promise<APIResponse>} response of the API call
     * @memberof CustomAPIs
     */
    static async getScripts(agent: Agent, version: APIVersion, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getScripts, err.message);
        }
    }

    /**
     * Start a script that is identified by scriptId
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} scriptId
     * @param {number} [skillId]
     * @param {string} [parameters]
     * @param {string} [startDate]
     * @returns {Promise<APIResponse>} response of the API call
     * @memberof inContactAPIs
     */
    static async postScriptsScriptIdStart(agent: Agent, version: APIVersion, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scripts/${scriptId}/start`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            options.addBody("parameters", parameters);
            options.addBody("startDate", startDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postScriptsScriptIdStart, err.message);
        }
    }

    static async getScriptsScriptName(agent: Agent, version: APIVersion, scriptName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/scripts/${scriptName}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getScriptsScriptName, err.message);
        }
    }

    static async getSecurityProfiles(agent: Agent, version: APIVersion, isExternal: any = "", isActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/security-profiles`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("isExternal", isExternal);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSecurityProfiles, err.message);
        }
    }

    static async getSecurityProfilesProfileId(agent: Agent, version: APIVersion, profileId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/security-profiles/${profileId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSecurityProfilesProfileId, err.message);
        }
    }

    static async getSecurityProfilesRoleId(agent: Agent, version: APIVersion, roleId: string, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/security-profiles/${roleId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSecurityProfilesRoleId, err.message);
        }
    }

    static async getServerTime(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/server-time`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getServerTime, err.message);
        }
    }

    static async getSkills(agent: Agent, version: APIVersion, searchString: string = "", fields: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkills, err.message);
        }
    }

    static async postSkills(agent: Agent, version: APIVersion, skills?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, skills);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkills, err.message);
        }
    }

    /**
    * Get skills by skillID
    * @static
    * @param {Agent} agent 
    * @param {APIVersion} version
    * @param {string} skillId SkillID assigned to agent
    * @returns {Promise<APIResponse>} 
    * @memberof CustomAPIs
    */
    static async getSkillsSkillId(agent: Agent, version: APIVersion, skillId: number, fields: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillId, err.message);
        }
    }

    /**
     * Update skill 
     * @static
     * @param {Agent} agent
     * @param {string} updateJson
     * @param {string} skillID
     * @param {string} apiVersion
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async putSkillsSkillId(agent: Agent, version: APIVersion, skillId: number, updateJson: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.requestJson(options, updateJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillId, err.message);
        }
    }

    static async getSkillsSkillIdAddressBooks(agent: Agent, version: APIVersion, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdAddressBooks, err.message);
        }
    }

    static async getSkillsSkillIdAgents(agent: Agent, version: APIVersion, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdAgents, err.message);
        }
    }

    static async postSkillsSkillIdAgents(agent: Agent, version: APIVersion, skillId: number, json: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillsSkillIdAgents, err.message);
        }
    }

    static async putSkillsSkillIdAgents(agent: Agent, version: APIVersion, skillId: number, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdAgents, err.message);
        }
    }

    static async deleteSkillsSkillIdAgents(agent: Agent, version: APIVersion, skillId: number, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteSkillsSkillIdAgents, err.message);
        }
    }

    static async deleteSkillsSkillIdAgentsAgentId(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents/${agent.agentID}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteSkillsSkillIdAgentsAgentId, err.message);
        }
    }

    static async putSkillsSkillIdAgentsAgentId(agent: Agent, version: APIVersion, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents/${agent.agentID}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("proficiency", proficiency);
            options.addParam("active", active);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdAgentsAgentId, err.message);
        }
    }

    static async getSkillsSkillIdAgentsUnassigned(agent: Agent, version: APIVersion, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/agents/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdAgentsUnassigned, err.message);
        }
    }

    static async getSkillsSkillIdCallData(agent: Agent, version: APIVersion, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/call-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdCallData, err.message);
        }
    }

    static async getSkillsSkillIdDispositions(agent: Agent, version: APIVersion, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/dispositions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdDispositions, err.message);
        }
    }

    static async getSkillsSkillIdDispositionsUnassigned(agent: Agent, version: APIVersion, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/dispositions/unassigned`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdDispositionsUnassigned, err.message);
        }
    }

    static async getSkillsSkillIdParametersCpaManagement(agent: Agent, version: APIVersion, skillId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/cpa-management`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersCpaManagement, err.message);
        }
    }

    static async putSkillsSkillIdParametersCpaManagement(agent: Agent, version: APIVersion, skillId: number, cpaSettings?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/cpa-management`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("cpaSettings", cpaSettings);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersCpaManagement, err.message);
        }
    }

    static async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, version: APIVersion, skillId: number, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/delivery-preferences`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersDeliveryPreferences, err.message);
        }
    }

    static async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, version: APIVersion, skillId: number, deliveryPreferences?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/delivery-preferences`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("deliveryPreferences", deliveryPreferences);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersDeliveryPreferences, err.message);
        }
    }

    static async putSkillsSkillIdParametersGeneralSettings(agent: Agent, version: APIVersion, skillId: number, generalSettings?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/general-settings`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("generalSettings", generalSettings);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersGeneralSettings, err.message);
        }
    }

    static async getSkillsSkillIdParametersGeneralSettings(agent: Agent, version: APIVersion, skillId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/general-settings`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersGeneralSettings, err.message);
        }
    }

    static async getSkillsSkillIdParametersRetrySettings(agent: Agent, version: APIVersion, skillId: number, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/retry-settings`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersRetrySettings, err.message);
        }
    }

    static async putSkillsSkillIdParametersRetrySettings(agent: Agent, version: APIVersion, skillId: number, retrySettings?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/retry-settings`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("retrySettings", retrySettings);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersRetrySettings, err.message);
        }
    }

    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} skillId
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getSkillsSkillIdParametersScheduleSettings(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/schedule-settings`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersScheduleSettings, err.message);
        }
    }

    static async putSkillsSkillIdParametersScheduleSettings(agent: Agent, version: APIVersion, skillId: number, scheduleSettings?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/schedule-settings`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("scheduleSettings", scheduleSettings);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersScheduleSettings, err.message);
        }
    }

    static async getSkillsSkillIdParametersXsSettings(agent: Agent, version: APIVersion, skillId: number, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/xs-settings`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersXsSettings, err.message);
        }
    }

    /**
     * Update skill Xs settings
     * @static
     * @param {Agent} agent
     * @param {string} updateJson
     * @param {string} skillID
     * @param {string} apiVersion
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async putSkillsSkillIdParametersXsSettings(agent: Agent, version: APIVersion, skillId: number, updateJson: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/parameters/xs-settings`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, updateJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putSkillsSkillIdParametersXsSettings, err.message);
        }
    }

    static async getSkillsSkillIdScheduledCallbacks(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/scheduled-callbacks`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdScheduledCallbacks, err.message);
        }
    }

    static async postSkillsSkillIdStart(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/start`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillsSkillIdStart, err.message);
        }
    }

    static async postSkillsSkillIdStop(agent: Agent, version: APIVersion, skillId: number, force?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/stop`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("force", force);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillsSkillIdStop, err.message);
        }
    }

    static async deleteSkillsSkillIdTags(agent: Agent, version: APIVersion, skillId: number, tags?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/tags`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("tags", tags);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteSkillsSkillIdTags, err.message);
        }
    }

    static async getSkillsSkillIdTags(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/tags`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdTags, err.message);
        }
    }

    static async postSkillsSkillIdTags(agent: Agent, version: APIVersion, skillId: number, tags?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("tags", tags);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillsSkillIdTags, err.message);
        }
    }

    static async getSkillsSkillNameDispositions(agent: Agent, version: APIVersion, skillName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillName}/dispositions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillNameDispositions, err.message);
        }
    }

    static async getSkillsAgents(agent: Agent, version: APIVersion, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("skills", skills);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsAgents, err.message);
        }
    }

    static async getSkillsCallData(agent: Agent, version: APIVersion, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/call-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsCallData, err.message);
        }
    }

    static async getTags(agent: Agent, version: APIVersion, searchString?: string, isActive?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/tags`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("searchString", searchString);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTags, err.message);
        }
    }

    static async postTags(agent: Agent, version: APIVersion, tagName: string, notes: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("tagName", tagName);
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTags, err.message);
        }
    }

    static async getTagsTagId(agent: Agent, version: APIVersion, tagId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/tags/${tagId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTagsTagId, err.message);
        }
    }

    static async putTagsTagId(agent: Agent, version: APIVersion, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/tags/${tagId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("tagName", tagName);
            options.addParam("notes", notes);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putTagsTagId, err.message);
        }
    }

    static async getTeams(agent: Agent, version: APIVersion, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeams, err.message);
        }
    }

    static async postTeams(agent: Agent, version: APIVersion, teams?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("teams", teams);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTeams, err.message);
        }
    }

    static async getTeamsTeamId(agent: Agent, version: APIVersion, teamId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamId, err.message);
        }
    }

    static async putTeamsTeamId(agent: Agent, version: APIVersion, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceInactive", forceInactive);
            options.addParam("team", team);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putTeamsTeamId, err.message);
        }
    }

    static async getTeamsTeamIdAddressBooks(agent: Agent, version: APIVersion, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("includeEntries", includeEntries);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdAddressBooks, err.message);
        }
    }

    static async deleteTeamsTeamIdAgents(agent: Agent, version: APIVersion, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/agents`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("transferTeamId", transferTeamId);
            options.addParam("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteTeamsTeamIdAgents, err.message);
        }
    }

    static async getTeamsTeamIdAgents(agent: Agent, version: APIVersion, teamId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdAgents, err.message);
        }
    }

    static async postTeamsTeamIdAgents(agent: Agent, version: APIVersion, teamId: string, agents?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/agents`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("agents", agents);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTeamsTeamIdAgents, err.message);
        }
    }

    /**
    * DELETE Unavailable code of a Team 
    * @static
    * @param {Agent} agent which has skills
    * @returns {Promise<void>}
    * @memberof CustomAPIs
    */
    static async deleteTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, outstateId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/unavailable-codes`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, outstateId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    static async getTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, activeOnly: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/unavailable-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("activeOnly", activeOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    static async postTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, outstateId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/unavailable-codes`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.requestJson(options, outstateId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    static async putTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: number, code?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamId}/unavailable-codes`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("code", code);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    static async getTeamsTeamnameAddressBooks(agent: Agent, version: APIVersion, teamname: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/${teamname}/address-books`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamnameAddressBooks, err.message);
        }
    }

    static async getTeamsAgents(agent: Agent, version: APIVersion, fields?: string, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsAgents, err.message);
        }
    }

    static async getTimezones(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/timezones`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTimezones, err.message);
        }
    }

    static async getUnavailableCodes(agent: Agent, version: APIVersion, activeOnly: boolean = false): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/unavailable-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("activeOnly", activeOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getUnavailableCodes, err.message);
        }
    }

    /**
     * Start a new session for an agent using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} stationPhoneNumber
     * @param {string} [stationId=""]
     * @param {number} [inactivityTimeout=45]
     * @param {*} [inactivityForceLogout=false]
     * @param {*} [apiApplicationContext]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessions(agent: Agent, version: APIVersion, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("stationId", stationId);
            options.addBody("stationPhoneNumber", stationPhoneNumber);
            options.addBody("inactivityTimeout", inactivityTimeout);
            options.addBody("inactivityForceLogout", inactivityForceLogout);
            options.addBody("apiApplicationContext", apiApplicationContext);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessions, err.message);
        }
    }

    static async postAgentSessionsSessionIdAddContact(agent: Agent, version: APIVersion, chat?: any, email?: any, workItem?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/add-contact`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("chat", chat);
            options.addBody("email", email);
            options.addBody("workItem", workItem);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdAddContact, err.message);
        }
    }

    static async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/agent-phone/dial`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdAgentPhoneDial, err.message);
        }
    }

    static async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/agent-phone/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdAgentPhoneEnd, err.message);
        }
    }

    static async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/agent-phone/mute`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdAgentPhoneMute, err.message);
        }
    }

    static async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/agent-phone/unmute`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdAgentPhoneUnmute, err.message);
        }
    }

    static async postAgentSessionsSessionIdBarge(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/barge`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdBarge, err.message);
        }
    }

    static async postAgentSessionsSessionIdCoach(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/coach`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdCoach, err.message);
        }
    }

    static async postAgentSessionsSessionIdConsultAgent(agent: Agent, version: APIVersion, targetAgentId: number, parentContactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/consult-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            options.addBody("parentContactId", parentContactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdConsultAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdContinueReskill(agent: Agent, version: APIVersion, continueReskill?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/continue-reskill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("continueReskill", continueReskill);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdContinueReskill, err.message);
        }
    }

    static async postAgentSessionsSessionIdDialAgent(agent: Agent, version: APIVersion, targetAgentId: number, parentContactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/dial-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            options.addBody("parentContactId", parentContactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdDialAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdDialerLogin(agent: Agent, version: APIVersion, skillName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/dialer-login`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillName", skillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdDialerLogin, err.message);
        }
    }

    static async postAgentSessionsSessionIdDialerLogout(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/dialer-logout`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdDialerLogout, err.message);
        }
    }

    static async postAgentSessionsSessionIdDialPhone(agent: Agent, version: APIVersion, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/dial-phone`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("phoneNumber", phoneNumber);
            options.addBody("skillId", skillId);
            options.addBody("parentContactId", parentContactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdDialPhone, err.message);
        }
    }

    /**
     * Dial a skill for an agent using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} skillName
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessionsSessionIdDialSkill(agent: Agent, version: APIVersion, skillName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/dial-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillName", skillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdDialSkill, err.message);
        }
    }

    /**
     * Get next event using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} [timeout=10]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async getAgentSessionsSessionIdGetNextEvent(agent: Agent, version: APIVersion, timeout: number = 10): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/get-next-event`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("timeout", timeout);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentSessionsSessionIdGetNextEvent, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, version: APIVersion, callbackId: number, notes: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${callbackId}/cancel`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("notes", notes);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsCallbackIdCancel, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, version: APIVersion, callbackId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${callbackId}/dial`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsCallbackIdDial, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, version: APIVersion, callbackId: number, rescheduleDate: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${callbackId}/reschedule`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("rescheduleDate", rescheduleDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsCallbackIdReschedule, err.message);
        }
    }

    /**
     * Accept contact by using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} contactId
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdAccept, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept-consult`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdAcceptConsult, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/activate`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdActivate, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/activate-chat`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdActivateChat, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, version: APIVersion, contactId: number, type: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/amd-override`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("type", type);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdAmdOverride, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, version: APIVersion, contactId: number, indicatorName: string, data: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/custom-data`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("indicatorName", indicatorName);
            options.addBody("data", data);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdCustomData, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, version: APIVersion, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/disposition`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("primaryDispositionId", primaryDispositionId);
            options.addBody("primaryDispositionNotes", primaryDispositionNotes);
            options.addBody("primaryCommitmentAmount", primaryCommitmentAmount);
            options.addBody("primaryCallbackTime", primaryCallbackTime);
            options.addBody("primaryCallbackNumber", primaryCallbackNumber);
            options.addBody("secondaryDispositionId", secondaryDispositionId);
            options.addBody("previewDispositionId", previewDispositionId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdDisposition, err.message);
        }
    }

    static async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, version: APIVersion, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}agent-sessions/${agent.sessionId}//interactions/${contactId}/disposition-dialer`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("dispositionName", dispositionName);
            options.addParam("dispositionNotes", dispositionNotes);
            options.addParam("commitmentAmount", commitmentAmount);
            options.addParam("callbackTime", callbackTime);
            options.addParam("callbackNumber", callbackNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentSessionsSessionIdInteractionsContactIdDispositionDialer, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, version: APIVersion, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-forward`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            options.addBody("toAddress", toAddress);
            options.addBody("fromAddress", fromAddress);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("subject", subject);
            options.addBody("bodyHtml", bodyHtml);
            options.addBody("attachments", attachments);
            options.addBody("attachmentNames", attachmentNames);
            options.addBody("originalAttachmentNames", originalAttachmentNames);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailForward, err.message);
        }
    }

    /**
    * Post unpark email contact
    * @static
    * @param {Agent} agent which has unparked email
    * @param {number} contactId of unparked email
    * @returns {Promise<APIResponse>}
    * @memberof CustomAPIs
    */
    static async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, version: APIVersion, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-park`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("toAddress", toAddress);
            options.addBody("fromAddress", fromAddress);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("subject", subject);
            options.addBody("bodyHtml", bodyHtml);
            options.addBody("attachments", attachments);
            options.addBody("attachmentNames", attachmentNames);
            options.addBody("isDraft", isDraft);
            options.addBody("primaryDispositionId", primaryDispositionId);
            options.addBody("secondaryDispositionId", secondaryDispositionId);
            options.addBody("tags", tags);
            options.addBody("notes", notes);
            options.addBody("originalAttachmentNames", originalAttachmentNames);
            options.addBody("draftEmailGuidStr", draftEmailGuidStr);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailPark, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-preview`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailPreview, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, version: APIVersion, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-reply`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            options.addBody("toAddress", toAddress);
            options.addBody("fromAddress", fromAddress);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("subject", subject);
            options.addBody("bodyHtml", bodyHtml);
            options.addBody("attachments", attachments);
            options.addBody("attachmentNames", attachmentNames);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailReply, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-restore`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailRestore, err.message);
        }
    }

    /**
	 * Get skillId from skill name
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillName which is used to skill name field
	 * @returns {APIResponse} response of the API call
	 */
    static async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, version: APIVersion, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-send`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            options.addBody("toAddress", toAddress);
            options.addBody("subject", subject);
            options.addBody("bodyHtml", bodyHtml);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailSend, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, version: APIVersion, contactId: number, isImmediate?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/email-unpark`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            if (isImmediate != null) {
                options.addBody("isImmediate", isImmediate);
            }
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEmailUnpark, err.message);
        }
    }

    /**
     * End contact by using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} contactId
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/end`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdEnd, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/hold`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdHold, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/independent-dial`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdIndependentDial, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, version: APIVersion, contactId: number, outcome: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/independent-dial-outcome`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("outcome", outcome);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/mask`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdMask, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/pause-voicemail`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, version: APIVersion, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/play-voicemail`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("playTimestamp", playTimestamp);
            options.addBody("position", position);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/record`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdRecord, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/reject`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdReject, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/resume`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdResume, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, version: APIVersion, contactId: number, chatText: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/send-chat-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("chatText", chatText);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdSendChatText, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/snooze`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdSnooze, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, version: APIVersion, contactId: number, targetSkillName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillName", targetSkillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferChat, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, version: APIVersion, contactId: number, targetAgentId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, version: APIVersion, contactId: number, targetSkillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-chat-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillId", targetSkillId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, version: APIVersion, contactId: number, targetAgentId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-email-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, version: APIVersion, contactId: number, targetSkillID: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-email-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillID", targetSkillID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, version: APIVersion, contactId: number, targetAgentId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-voicemail-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, version: APIVersion, contactId: number, targetSkillId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-voicemail-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillId", targetSkillId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, version: APIVersion, contactId: number, targetAgentName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-work-item-to-agent`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentName", targetAgentName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, version: APIVersion, contactId: number, targetSkillName: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/transfer-work-item-to-skill`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetSkillName", targetSkillName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, version: APIVersion, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/typing`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("isTyping", isTyping);
            options.addBody("isTextEntered", isTextEntered);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdTyping, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/unmask`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdUnmask, err.message);
        }
    }

    static async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, version: APIVersion, contactId: number, fileName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/${contactId}/voicemails`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentSessionsSessionIdInteractionsContactIdVoicemails, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/add-chat`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsAddChat, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/add-email`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsAddEmail, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/conference-calls`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsConferenceCalls, err.message);
        }
    }

    /**
	 * Start an outbound with skillID or skill name
	 * @static
	 * @param {Agent} agent which is used to start outbound email
	 * @param {number} skillId which is used to start outbound email
	 * @param {string} toAddress which is used to send to other email
	 * @returns {APIResponse} response of the API call
	 */
    static async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, version: APIVersion, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/email-outbound`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            options.addBody("toAddress", toAddress);
            options.addBody("parentContactId", parentContactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsEmailOutbound, err.message);
        }
    }

    static async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/interactions/transfer-calls`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsTransferCalls, err.message);
        }
    }

    static async postAgentSessionsSessionIdMonitor(agent: Agent, version: APIVersion, targetAgentId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/monitor`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("targetAgentId", targetAgentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdMonitor, err.message);
        }
    }

    static async postAgentSessionsSessionIdSendDtmf(agent: Agent, version: APIVersion, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/send-dtmf`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("dtmfSequence", dtmfSequence);
            options.addBody("toneDurationMS", toneDurationMS);
            options.addBody("toneSpacingMS", toneSpacingMS);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdSendDtmf, err.message);
        }
    }

    /**
     * Change state of Agent
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} state
     * @param {string} [reason]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessionsSessionIdState(agent: Agent, version: APIVersion, state: string, reason?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}/state`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("state", state);
            options.addBody("reason", reason);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdState, err.message);
        }
    }

    static async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, version: APIVersion, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/submit-feedback`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("categoryId", categoryId);
            options.addBody("priority", priority);
            options.addBody("comment", comment);
            options.addBody("customData", customData);
            options.addBody("contactId", contactId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdSubmitFeedback, err.message);
        }
    }

    static async postAgentSessionsSessionIdSupportEmail(agent: Agent, version: APIVersion, bodyHTML: string, sessionId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/support-email`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("bodyHTML", bodyHTML);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdSupportEmail, err.message);
        }
    }

    static async postAgentSessionsSessionIdTakeOver(agent: Agent, version: APIVersion, sessionId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/take-over`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdTakeOver, err.message);
        }
    }

    /**
     * Delete agent session by using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {*} [forceLogoff]
     * @param {*} [endContacts]
     * @param {*} [ignorePersonalQueue]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async deleteAgentSessionsSessionId(agent: Agent, version: APIVersion, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/${agent.sessionId}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("forceLogoff", forceLogoff);
            options.addParam("endContacts", endContacts);
            options.addParam("ignorePersonalQueue", ignorePersonalQueue);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteAgentSessionsSessionId, err.message);
        }
    }

    /**
     * Join existing session for an agent using API
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postAgentSessionsJoin(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agent-sessions/join`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("asAgentId", agent.agentID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsJoin, err.message);
        }
    }

    static async putAgentsAgentIdResetPassword(agent: Agent, version: APIVersion, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/reset-password`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("requestedPassword", requestedPassword);
            options.addParam("forceChangeOnLogon", forceChangeOnLogon);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentsAgentIdResetPassword, err.message);
        }
    }

    static async putAgentsChangePassword(agent: Agent, version: APIVersion, currentPassword?: string, newPassword?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/change-password`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("currentPassword", currentPassword);
            options.addParam("newPassword", newPassword);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.putAgentsChangePassword, err.message);
        }
    }

    /**
     * Post a chat contact
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} pointOfContact
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postContactsChats(agent: Agent, version: APIVersion, pointOfContact: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("pointOfContact", pointOfContact);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsChats, err.message);
        }
    }

     /**
     * Post an SMS contact
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} pointOfContact
     * @param {string} fromAddress
     * @param {string} mediaType
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async postContactsSMS(agent: Agent, version: APIVersion, pointOfContact: string, fromAddress: string, mediaTye: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("pointOfContact", pointOfContact);
            options.addParam("fromAddress", fromAddress);
            options.addParam("mediaType", mediaTye);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsSMS, err.message);
        }
    }

    static async postContactsChatsChatSessionSendText(agent: Agent, version: APIVersion, chatSession: string, label: string, message: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSession}/send-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("message", message);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsChatsChatSessionSendText, err.message);
        }
    }

    static async postContactsChatsChatSessionTyping(agent: Agent, version: APIVersion, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSession}/typing`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("isTyping", isTyping);
            options.addBody("isTextEntered", isTextEntered);
            options.addBody("label", label);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsChatsChatSessionTyping, err.message);
        }
    }

    static async postContactsChatsChatSessionTypingPreview(agent: Agent, version: APIVersion, chatSession: string, previewText: string, label?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSession}/typing-preview`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("previewText", previewText);
            options.addBody("label", label);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsChatsChatSessionTypingPreview, err.message);
        }
    }

    static async deleteContactsChatsChatSession(agent: Agent, version: APIVersion, chatSession: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSession}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteContactsChatsChatSession, err.message);
        }
    }

    static async getContactsChatsChatSession(agent: Agent, version: APIVersion, chatSession: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSession}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsChatsChatSession, err.message);
        }
    }

    static async postContactsChatsSendEmail(agent: Agent, version: APIVersion, fromAddress: string, emailBody?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/send-email`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fromAddress", fromAddress);
            options.addBody("emailBody ", emailBody);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postContactsChatsSendEmail, err.message);
        }
    }

    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} workItemPayload (not used)
     * @param {string} workItemType (not used)
     * @param {string} from (not used)
     * @param {string} pointOfContact
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     * @argument static async postInteractionsWorkItems(agent: Agent, version: APIVersion, workItemPayload: string, workItemType: string, from: string, pointOfContact: string): Promise<APIResponse> {
     */
    static async postInteractionsWorkItems(agent: Agent, version: APIVersion, pointOfContact: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/interactions/work-items`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            // options.addBody("workItemPayload", workItemPayload);
            // options.addBody("workItemType", workItemType);
            // options.addBody("from", from);
            options.addBody("pointOfContact", pointOfContact);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postInteractionsWorkItems, err.message);
        }
    }

    static async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, version: APIVersion, pointOfContactId: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/points-of-contact/${pointOfContactId}/chat-profile`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPointsOfContactPointOfContactIdChatProfile, err.message);
        }
    }

    static async postPromise(agent: Agent, version: APIVersion, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/promise`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("lastName", lastName);
            options.addBody("phoneNumber", phoneNumber);
            options.addBody("skill", skill);
            options.addBody("targetAgent", targetAgent);
            options.addBody("promiseDate", promiseDate);
            options.addBody("promiseTime", promiseTime);
            options.addBody("notes", notes);
            options.addBody("timeZone", timeZone);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postPromise, err.message);
        }
    }

    static async postQueuecallback(agent: Agent, version: APIVersion, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/queuecallback`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("callerID", callerID);
            options.addBody("callDelaySec", callDelaySec);
            options.addBody("skill", skill);
            options.addBody("targetAgent", targetAgent);
            options.addBody("priorityManagement", priorityManagement);
            options.addBody("initialPriority", initialPriority);
            options.addBody("acceleration", acceleration);
            options.addBody("maxPriority", maxPriority);
            options.addBody("sequence", sequence);
            options.addBody("zipTone", zipTone);
            options.addBody("screenPopSource", screenPopSource);
            options.addBody("screenPopURL", screenPopURL);
            options.addBody("timeout", timeout);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postQueuecallback, err.message);
        }
    }

    static async getAgentsAgentIdInteractionHistory(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/interaction-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("updatedSince", updatedSince);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdInteractionHistory, err.message);
        }
    }

    static async getAgentsAgentIdLoginHistory(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/login-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("searchString", searchString);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("uri", uri);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdLoginHistory, err.message);
        }
    }

    static async getAgentsAgentIdPerformance(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/performance`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdPerformance, err.message);
        }
    }

    static async getAgentsAgentIdStatehistory(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/statehistory`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdStatehistory, err.message);
        }
    }

    static async getAgentsAgentIdStateHistory(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/state-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("searchString", searchString);
            options.addParam("outboundStrategy", outboundStrategy);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdStateHistory, err.message);
        }
    }

    static async getAgentsPerformance(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/performance`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsPerformance, err.message);
        }
    }

    static async getContactsContactId(agent: Agent, version: APIVersion, contactId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactId, err.message);
        }
    }

    static async getContactsContactIdCallQuality(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/call-quality`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdCallQuality, err.message);
        }
    }

    static async getContactsContactIdCustomData(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/custom-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdCustomData, err.message);
        }
    }

    static async getContactsContactIdStatehistory(agent: Agent, version: APIVersion, contactId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/${contactId}/statehistory`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsContactIdStatehistory, err.message);
        }
    }

    /**
    * Get completed contacts
    * @static
    * @param {Agent} agent which has skills
    * @param {string} startDate Date cannot exceed 30 days
    * @param {string} endDate Date cannot exceed 30 days
    * @param {top} top top value
    * @returns {Promise<void>}
    * @memberof CustomAPIs
    */
    static async getContactsCompleted(agent: Agent, version: APIVersion, startDate: string = "", endDate: string = "", updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/completed`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderby", orderby);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("skillId", skillId);
            options.addParam("campaignId", campaignId);
            options.addParam("agentId", agentId);
            options.addParam("teamId", teamId);
            options.addParam("toAddr", toAddr);
            options.addParam("fromAddr", fromAddr);
            options.addParam("isLogged", isLogged);
            options.addParam("isRefused", isRefused);
            options.addParam("isTakeover", isTakeover);
            options.addParam("tags", tags);
            options.addParam("analyticsProcessed", analyticsProcessed);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactsCompleted, err.message);
        }
    }

    static async getReportJobs(agent: Agent, version: APIVersion, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/report-jobs`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("reportId", reportId);
            options.addParam("jobStatus", jobStatus);
            options.addParam("jobSpan", jobSpan);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReportJobs, err.message);
        }
    }

    static async getReportJobsJobId(agent: Agent, version: APIVersion, jobId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/report-jobs/${jobId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReportJobsJobId, err.message);
        }
    }

    static async postReportJobsReportId(agent: Agent, version: APIVersion, reportId: number, fileType: string = "", includeHeaders: string = "", appendDate: string = "", deleteAfter: string = "", overwrite: string = "", startDate: string = "", endDate: string = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/report-jobs/${reportId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fileType", fileType);
            options.addBody("includeHeaders", includeHeaders);
            options.addBody("appendDate", appendDate);
            options.addBody("deleteAfter", deleteAfter);
            options.addBody("overwrite", overwrite);
            options.addBody("startDate", startDate);
            options.addBody("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postReportJobsReportId, err.message);
        }
    }

    static async postReportJobsDatadownloadReportId(agent: Agent, version: APIVersion, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/report-jobs/datadownload/${reportId}`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("fileName", fileName);
            options.addBody("startDate", startDate);
            options.addBody("endDate", endDate);
            options.addBody("saveAsFile", saveAsFile);
            options.addBody("includeHeaders", includeHeaders);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postReportJobsDatadownloadReportId, err.message);
        }
    }

    static async getReports(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/reports`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReports, err.message);
        }
    }

    static async getSkillsSkillIdInteractionTopHits(agent: Agent, version: APIVersion, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/interaction-top-hits`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            options.addParam("teamId", teamId);
            options.addParam("topHitsNum", topHitsNum);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdInteractionTopHits, err.message);
        }
    }

    static async getSkillsSkillIdSlaSummary(agent: Agent, version: APIVersion, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("listVar", listVar);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdSlaSummary, err.message);
        }
    }

    static async getSkillsSkillIdSummary(agent: Agent, version: APIVersion, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/${skillId}/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdSummary, err.message);
        }
    }

    static async getSkillsSlaSummary(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("listVar", listVar);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSlaSummary, err.message);
        }
    }

    static async getSkillsSummary(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/skills/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            options.addParam("isOutbound", isOutbound);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSummary, err.message);
        }
    }

    static async getWfmDataAgents(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/agents`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataAgents, err.message);
        }
    }

    static async getWfmDataAgentsScheduleAdherence(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/agents/schedule-adherence`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataAgentsScheduleAdherence, err.message);
        }
    }

    static async getWfmDataAgentsScorecards(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/agents/scorecards`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataAgentsScorecards, err.message);
        }
    }

    static async getWfmDataSkillsAgentPerformance(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/skills/agent-performance`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataSkillsAgentPerformance, err.message);
        }
    }

    static async getWfmDataSkillsContacts(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/skills/contacts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataSkillsContacts, err.message);
        }
    }

    static async getWfmDataSkillsDialerContacts(agent: Agent, version: APIVersion, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfm-data/skills/dialer-contacts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfmDataSkillsDialerContacts, err.message);
        }
    }

    static async getWfoDataAscm(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/ascm`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataAscm, err.message);
        }
    }

    static async getWfoDataAsi(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/asi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataAsi, err.message);
        }
    }

    static async getWfoDataCsi(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/csi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataCsi, err.message);
        }
    }

    static async getWfoDataFtci(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/ftci`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataFtci, err.message);
        }
    }

    static async getWfoDataOsi(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/osi`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataOsi, err.message);
        }
    }

    static async getWfoDataQm(agent: Agent, version: APIVersion, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/wfo-data/qm`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWfoDataQm, err.message);
        }
    }

    static async getExternalEmployees(agent: Agent, version: APIVersion, loginEnabledOnly?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/external/employees`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("loginEnabledOnly", loginEnabledOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getExternalEmployees, err.message);
        }
    }

    static async getExternalTopics(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/external/topics`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getExternalTopics, err.message);
        }
    }

    static async getFormsQmForms(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/forms/qm-forms`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFormsQmForms, err.message);
        }
    }

    static async getFormsQmFormsQmFormIdQuestions(agent: Agent, version: APIVersion, qmFormId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/forms/qm-forms/${qmFormId}/questions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFormsQmFormsQmFormIdQuestions, err.message);
        }
    }

    static async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, version: APIVersion, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/forms/qm-forms/${qmFormId}/questions/${questionId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getFormsQmFormsQmFormIdQuestionsQuestionId, err.message);
        }
    }

    static async getPerformanceIndicators(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/performance-indicators`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPerformanceIndicators, err.message);
        }
    }

    static async getAgentsAgentIdSynced(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/${agent.agentID}/synced`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdSynced, err.message);
        }
    }

    static async getAgentsSynced(agent: Agent, version: APIVersion, ): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/agents/synced`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsSynced, err.message);
        }
    }

    static async getConfigConfigIdIEX(agent: Agent, version: APIVersion, configId: number): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/Config/${configId}/IEX`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getConfigConfigIdIEX, err.message);
        }
    }

    static async getIEXQueueData(agent: Agent, version: APIVersion, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/IEX/queue-data`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("customerBuName", customerBuName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getIEXQueueData, err.message);
        }
    }

    /** 
     * Posting Agent Performance By Hour Entry List
     * @static
     * @param {Agent} agent 
     * @param {string} json JSON body
     * @returns {Promise<APIResponse>} 
     * @memberof inContactAPIs
     */
    static async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> {
        try {
            let url = TestRunInfo.cluster.getURL(PageName.POST_AGENT_PERFORMANCE_BY_HOUR_ENTRY_LIST);
            let options = new Options(url, Method.POST);
            options.addHeader("Authorization", `Bearer ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentPerformanceByHourEntryList, err.message);
        }
    }

    /** 
     * Getting a 200 (OK) of the service for Skill Summary
     * @static
     * @param {Agent} agent
     * @param {string} json
     * @memberof CustomAPIs
     */
    static async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> {
        try {

            let options = new Options(TestRunInfo.cluster.getURL(PageName.REPORT_SERVICE_GET_SKILL_ACTIVITY_ENTRY_LIST), Method.POST);
            options.addHeader("Authorization", `Bearer ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillActivityEntryList, err.message);
        }
    }

    /**
     * Post Skill Summary
     * POST cacheSite/EvolveCacheService.svc/rest/GetSkillActivityEntryList
     * @static
     * @param {Agent} agent 
     * @param {string} bodyJson
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> {
        try {
            let options = new Options(TestRunInfo.cluster.getURL(PageName.CACHE_SITE_GET_SKILL_ACTIVITY_ENTRY_LIST), Method.POST);
            options.addHeader("Authorization", `Bearer ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, bodyJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postSkillSummary, err.message);
        }
    }

    /**
     * Posting Unavailable Statistics
     * @static
     * @param {Agent} agent 
     * @param {string} json JSON body
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> {
        try {
            let url = TestRunInfo.cluster.getURL(PageName.POST_UNAVAILABLE_STATISTICS);
            let options = new Options(url, Method.POST);
            options.addHeader("Authorization", `Bearer ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.requestJson(options, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postUnavailableStatistics, err.message);
        }
    }

    /**
     * Send text to Agent
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent 
     * @param {string} APIVersion
     * @param {string} chatSessionId
     * @param {string} label
     * @param {string} chatText
     * @returns {Promise<APIResponse>} 
     * @memberof inContactAPIs
     */
    static async postChatSessionSendText(agent: Agent, version: APIVersion, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/contacts/chats/${chatSessionId}/send-text`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("label", label);
            options.addBody("message", chatText);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postChatSessionSendText, err.message);
        }
    }

    /** 
     * Getting all Team’s Agents
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @memberof CustomAPIs
     */
    static async getAllTeamsAgents(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/${version}/teams`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllTeamsAgents, err.message);
        }
    }


     /** 
     * Getting available Activity
     * @author Phat.Truong
     * @static
     * @param {Agent} agent     
     * @memberof CustomAPIs
     */
    static async getAvailableActivity(agent: Agent, scheduleID: string): Promise<APIResponse> {
        try {
            // let options = new Options(`${agent.baseUri}schedules/user/${scheduleID}`, Method.GET);
            let options = new Options(`https://na1.staging.nice-incontact.com/schedules/user/${scheduleID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllTeamsAgents, err.message);
        }
    }

    /**
     * This method will update the details of a Tag identified by "tagId".
     * @param {*} agent
     * @param {*} tagId Tag ID
     * @param {*} [tagName=""] New tag name
     * @param {*} [notes=""] New note name
     * @param {*} [isActive=""] Active of not (true or false)
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIstruncateSync
     */
    static async updatesATag(agent: any, tagId: any, tagName: any = "", notes: any = "", isActive: any = true): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/tags/${tagId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let jsonData = `{ "tagName": "${tagName}", "notes": "${notes}", "isActive": "${isActive}" }`
            return await APICore.request(options, jsonData);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updatesATag, err.message);
        }
    }

    /**
     * This method will create a new Tag in the Business Unit.
     * @param {Agent} agent
     * @param {*} tagName Name of TAG
     * @param {*} [notes=""] Note of Tag
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async createsATag(agent: Agent, tagName: any, notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let jsonData = `{ "tagName": "${tagName}", "notes": "${notes}" }`
            return await APICore.request(options, jsonData);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createsATag, err.message);
        }
    }

    /**
     * This method removes Tags from the Skill identified by "skillId"
     * @param {Agent} agent
     * @param {*} skillId Skill ID
     * @param {*} tagId Tag ID
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async removesTagsFromASkill(agent: Agent, skillId: any, tagId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/${skillId}/tags`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let jsonData = `{ "tags": [ { "tagId": "${tagId}" } ] }`
            return await APICore.request(options, jsonData);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesTagsFromASkill, err.message);
        }
    }

    /**
     * This method assigns Tags to the Skill identified by "skillId".
     * @param {Agent} agent
     * @param {*} skillId Skill ID
     * @param {*} tagId Tag ID
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async assignsATagToASkill(agent: Agent, skillId: any, tagId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/skills/${skillId}/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            let jsonData = `{ "tags": [ { "tagId": "${tagId}" } ] }`
            return await APICore.request(options, jsonData);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsATagToASkill, err.message);
        }
    }

}