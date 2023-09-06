import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import { OutBoundEmail, SkillCore } from "@data-objects/general/skill-core";
import { AddressBook } from "@data-objects/inContact/central/admin/users/address-books/address-book";
import { APIResponse } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { FunctionType, Logger } from "@utilities/general/logger";

export default class TestHelpers {

    /**
     * Start a chat contact
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startChatContact(agent: Agent): Promise<APIResponse> {
        try {
            return await CustomAPIs.startChatContact(agent, SkillType.CHAT);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startChatContact, err.message);
        }
    }

    /**
     * Start a SMS contact
     * @author Devi.KV
     * @static
     * @param {Agent} agent
     * @param {string} fromAddress
      * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startSMSContact(agent: Agent, fromAddress: string): Promise<APIResponse> {
        try {
            return await CustomAPIs.startSMSContact(agent, SkillType.SMS, fromAddress );
        } catch (err) {
            throw new errorwrapper.CustomError(this.startSMSContact, err.message);
        }
    }

    /**
     * Start a work item contact
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {SkillType} skillType
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startWorkItem(agent: Agent): Promise<void> {
        try {
            await CustomAPIs.startWorkItem(agent, SkillCore.getSkillPOC(SkillType.WORK_ITEM));
        } catch (err) {
            throw new errorwrapper.CustomError(this.startWorkItem, err.message);
        }
    }

    /**
    * Start a inbound  call
    * @author Nhat.Nguyen
    * @static
    * @param {Agent} agent
    * @returns {Promise<void>}
    * @memberof TestCondition
    */
    public static async startInboundCall(agent: Agent): Promise<void> {
        try {
            await CustomAPIs.startInboundCall(agent, SkillType.IB_Phone);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startInboundCall, err.message);
        }
    }

    /**
    * Start a inbound  call for Page Action
    * @author Devi Venkatachalam
    * @static
    * @param {Agent} agent
    * @returns {Promise<void>}
    * @memberof TestCondition
    */
   public static async startInboundCallForPageAction(agent: Agent): Promise<void> {
    try {
        await CustomAPIs.startInboundCallForPageAction(agent, SkillType.IBPhone_PageAction);
    } catch (err) {
        throw new errorwrapper.CustomError(this.startInboundCallForPageAction, err.message);
    }
}

    /**
     * Start a voicemail
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startVoiceMail(agent: Agent): Promise<void> {
        try {
            let voiceMail = SkillType.VOICEMAIL;
            let voiceMailID: number = await CustomAPIs.getSkillIdFromSkillName(agent, voiceMail);
            await CustomAPIs.startVoiceMail(agent, voiceMail, voiceMailID, SkillType.IB_Phone);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startVoiceMail, err.message);
        }
    }

    /* Start work item contact
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startWorkItemContact(agent: Agent): Promise<void> {
        try {
            await CustomAPIs.startWorkItem(agent, SkillCore.getSkillPOC(SkillType.WORK_ITEM));
        } catch (err) {
            throw new errorwrapper.CustomError(this.startWorkItemContact, err.message);
        }
    }

    /**
     * Start multi chat contact
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {Number} chatNumber
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startMultiChatContact(agent: Agent, chatNumber: number): Promise<void> {
        try {
            await CustomAPIs.startMultiChats(agent, SkillType.CHAT, chatNumber);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startMultiChatContact, err.message);
        }
    }

    /**
     * Start a work item contact
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {Number} workItemNumber
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async startMultiWorkItem(agent: Agent, workItemNumber: number): Promise<void> {
        try {
            await CustomAPIs.startMultiWorkItem(agent, SkillCore.getSkillPOC(SkillType.WORK_ITEM), workItemNumber);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startMultiWorkItem, err.message);
        }
    }

    /**
     * Get current contact id
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {string} skillName
     * @param {boolean} [multipleContactId]
     * @returns {Promise<any>}
     * @memberof TestHelpers
     */
    public static async getCurrentContactId(agent: Agent, skillName: string, multipleContactId?: boolean): Promise<any> {
        try {
            return await CustomAPIs.getCurrentContactId(agent, skillName, multipleContactId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCurrentContactId, err.message);
        }
    }

    /**
     * Get Teams Team Id Unavailable Codes
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} teamId
     * @param {string} activeOnly
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async getTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, activeOnly: string = ""): Promise<APIResponse> {
        try {
            return await inContactAPIs.getTeamsTeamIdUnavailableCodes(agent, version, teamId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    /**
     * Get Admin Unavailable Codes
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} activeOnly
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async getAdminUnavailableCodes(agent: Agent, version: APIVersion, activeOnly?: number): Promise<APIResponse> {
        try {
            return await inContactAPIs.getAdminUnavailableCodes(agent, version, activeOnly);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAdminUnavailableCodes, err.message);
        }
    }

    /**
     * Get Skills Skill Id Parameters Schedule Settings
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} skillId
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async getSkillsSkillIdParametersScheduleSettings(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            return await inContactAPIs.getSkillsSkillIdParametersScheduleSettings(agent, version, skillId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdParametersScheduleSettings, err.message);
        }
    }

    /**
     * Get Skill Id Assigned To Agent
     * @author Nhat.Nguyen
     * @static
     * @param {APIResponse} response
     * @returns {number}
     * @memberof TestHelpers
     */
    public static getSkillIdAssignedToAgent(response: APIResponse): number {
        try {
            return CustomAPIs.getSkillIdAssignedToAgent(response);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillIdAssignedToAgent, err.message);
        }
    }

    /**
     * Get Agents Agent Id Skills
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async getAgentsAgentIdSkills(agent: Agent, version: APIVersion): Promise<APIResponse> {
        try {
            return await inContactAPIs.getAgentsAgentIdSkills(agent, version);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdSkills, err.message);
        }
    }

    /**
     * Get Contact ID
     * @author Nhat.Nguyen
     * @static
     * @param {APIResponse} response
     * @returns {Promise<number>}
     * @memberof TestHelpers
     */
    public static getContactID(response: APIResponse): number {
        try {
            return CustomAPIs.getContactID(response);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactID, err.message);
        }
    }

    /**
     * Send a chat message
     * @author Nhat.Nguyen
     * @static
     * @param {APIResponse} response
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async getChatSessionID(response: APIResponse): Promise<string> {
        try {
            return await CustomAPIs.getChatSessionID(response);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getChatSessionID, err.message);
        }
    }

    /**
     * Get Skill Id From Skill Name
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async getSkillIdFromSkillName(agent: Agent, skillName: SkillType): Promise<number> {
        try {
            return await CustomAPIs.getSkillIdFromSkillName(agent, skillName);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillIdFromSkillName, err.message);
        }
    }

    /**
     * Is Skill Name Assigned To Agent
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     *  @param {SkillType} skillName
     * @returns {Promise<boolean>}
     * @memberof TestHelpers
     */
    public static async isSkillNameAssignedToAgent(agent: Agent, skillName: SkillType): Promise<boolean> {
        try {
            return await CustomAPIs.isSkillNameAssignedToAgent(agent, SkillCore.getSkillName(skillName));
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillNameAssignedToAgent, err.message);
        }
    }

    /**
     * Start or Join session
     * @author Phat Truong
     * @static
     * @param {Agent} agent
     *  @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async startOrJoinSession(agent: Agent, phoneNumber: string): Promise<void> {
        try {
            await CustomAPIs.startOrJoinSession(agent, phoneNumber);
        } catch (err) {
            throw new errorwrapper.CustomError(this.startOrJoinSession, err.message);
        }
    }

    /**
     * End all contact
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async endAllContacts(agent: Agent, timeOut?: number): Promise<void> {
        try {
            await CustomAPIs.endAllContacts(agent, timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endAllContacts, err.message);
        }
    }

    /**
     * Get address books ID
     * @author Tan.Ta
     * @static
     * @param {APIResponse} addressBookRes
     * @returns {Promise<number>}
     * @memberof TestHelpers
     */
    public static async getAddressBookId(agent: Agent, addressBook: AddressBook): Promise<number> {
        try {
            return await CustomAPIs.getAddressBookId(agent, addressBook);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookId, err.message);
        }
    }

    /**
     * Get Address-books entry Id
     * @author Tan.Ta
     * @static
     * @param {APIResponse} addressBookRes
     * @returns {Promise<number>}
     * @memberof TestHelpers
     */
    public static async getAddressBookEntryId(agent: Agent, addressBookId: number, entriesInfo: string): Promise<number> {
        try {
            return await CustomAPIs.getAddressBookEntryId(agent, addressBookId, entriesInfo);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookEntryId, err.message);
        }
    }

    /**
     * Wait for call contact route to agent
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async waitForContactRouteToAgent(agent: Agent): Promise<void> {
        try {
            await CustomAPIs.waitForContactRouteToAgent(agent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactRouteToAgent, err.message);
        }
    }

    /**
     * Get contact active
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async getContactsActive(agent: Agent): Promise<void> {
        try {
            await inContactAPIs.getContactsActive(agent, APIVersion.V6);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactRouteToAgent, err.message);
        }
    }

    /**
     * Verify active contact exists in list
     * @author Tan.Ta
     * @static
     * @param {APIResponse} bodyJson
     * @param {string} mediaType
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async isContactActiveExist(bodyJson: APIResponse, mediaType: string): Promise<void> {
        try {
            await CustomAPIs.isContactActiveExist(bodyJson, mediaType);
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactRouteToAgent, err.message);
        }
    }

    /**
     * Set Agent State using API
     * @author
     * @static
     * @param {Agent} agent
     * @param {MaxState} state
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async setAgentState(agent: Agent, state: MaxState): Promise<void> {
        try {
            await CustomAPIs.setAgentState(agent, state);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setAgentState, err.message);
        }
    }

    /**
     * End contact by contact id
     * @author
     * @static
     * @param {Agent} agent
     * @param {number} contactId
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async endContact(agent: Agent, contactId: number): Promise<void> {
        try {
            await CustomAPIs.endContact(agent, contactId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endContact, err.message);
        }
    }

    /**
     * End MAX session
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {number} contactId
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async endSession(agent: Agent, contactId: number): Promise<void> {
        try {
            await CustomAPIs.endSession(agent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.endSession, err.message);
        }
    }

    /**
     * Get Point Of Contact Address
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {SkillType} skillType
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async getPointOfContactAddress(agent: Agent, skillType: SkillType): Promise<void> {
        try {
            await CustomAPIs.getPointOfContactAddress(agent, skillType);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPointOfContactAddress, err.message);
        }
    }

    /**
     * Accept contact
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {number} contactId
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async acceptContact(agent: Agent, contactId: number): Promise<void> {
        try {
            await CustomAPIs.acceptContact(agent, contactId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptContact, err.message);
        }
    }

    /**
     * Send email   
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {OutBoundEmail} obEmailInfo
     * @returns {Promise<void>}
     * @memberof TestHelpers
     */
    public static async sendEmail(agent: Agent, obEmailInfo: OutBoundEmail): Promise<void> {
        try {
            await CustomAPIs.sendEmail(agent, obEmailInfo);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendEmail, err.message);
        }
    }

    /**
     * Get skills by skillID
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {number} skillId
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async getSkillsSkillId(agent: Agent, version: APIVersion, skillId: number): Promise<APIResponse> {
        try {
            return await inContactAPIs.getSkillsSkillId(agent, version, skillId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillId, err.message);
        }
    }

    /**
     * Update skill Xs settings
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} skillId
     * @param {string} updateJson
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async putSkillsSkillIdParametersXsSettings(agent: Agent, version: APIVersion, skillId: number, updateJson: string): Promise<APIResponse> {
        try {
            return await inContactAPIs.putSkillsSkillIdParametersXsSettings(agent, version, skillId, updateJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillId, err.message);
        }
    }

    /**
     * Update skill
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} skillId
     * @param {string} updateJson
     * @returns {Promise<APIResponse>}
     * @memberof TestHelpers
     */
    public static async putSkillsSkillId(agent: Agent, version: APIVersion, skillId: number, updateJson: string): Promise<APIResponse> {
        try {
            return await inContactAPIs.putSkillsSkillId(agent, version, skillId, updateJson);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillId, err.message);
        }
    }

    /**
     * Send a chat message
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {string} chatSessionId
     * @param {string} label
     * @param {string} chatText
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async sendChat(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<void> {
        try {
            await CustomAPIs.sendChat(agent, chatSessionId, label, chatText);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendChat, err.message);
        }
    }

    /**
     * Delete Teams Team Id Unavailable Codes
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} teamId
     * @param {string} outstateId
     * @returns {Promise<APIResponse>}
     * @memberof TestCondition
     */
    public static async deleteTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, outstateId: string): Promise<APIResponse> {
        try {
            return await inContactAPIs.deleteTeamsTeamIdUnavailableCodes(agent, version, teamId, outstateId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteTeamsTeamIdUnavailableCodes, err.message);
        }
    }


    /**
     * Post Teams Team Id Unavailable Codes
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} teamId
     * @param {string} outstateId
     * @returns {Promise<APIResponse>}
     * @memberof TestCondition
     */
    public static async postTeamsTeamIdUnavailableCodes(agent: Agent, version: APIVersion, teamId: string, outstateId: string): Promise<APIResponse> {
        try {
            return await inContactAPIs.postTeamsTeamIdUnavailableCodes(agent, version, teamId, outstateId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTeamsTeamIdUnavailableCodes, err.message);
        }
    }

    /**
    * Post Unavailable Statistics
    * @author Nhat.Nguyen
    * @static
    * @param {Agent} agent
    * @param {string} json
    * @returns {Promise<APIResponse>}
    * @memberof TestCondition
    */
    public static async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> {
        try {
            return await inContactAPIs.postUnavailableStatistics(agent, json);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postUnavailableStatistics, err.message);
        }
    }

    /**
     * Check the contact is active
     * @author Tan.Ta
     * @static
     * @param {APIResponse} bodyJson
     * @param {string} type
     * @returns {boolean}
     * @memberof TestHelpers
     */
    public static isContactActive(bodyJson: APIResponse, type: ContactName): boolean {
        try {
            return CustomAPIs.isContactActive(bodyJson, type);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isContactActive, err.message);
        }
    }

    /**
     * Make Inbound Call
     * @author Nhat.Nguyen
     * @static
     * @param {Agent} agent which is used to start inbound call
     * @returns {Promise<void>}
     * @memberof TestCondition
     */
    public static async makeInboundCall(agent: Agent, skillName: string): Promise<void> {
        try {
            return await CustomAPIs.makeInboundCall(agent, skillName);
        } catch (err) {
            throw new errorwrapper.CustomError(this.makeInboundCall, err.message);
        }
    }

    /**
     * Get agent info
     * @author Tuan.Vu
     * @static
     * @param {Agent} agent which is used to get info
     * @returns {Promise<any>}
     * @memberof TestCondition
     */
    public static async getAgentInfo(agent: Agent): Promise<Agent> {
        try {
            return await CustomAPIs.getAgentInfo(agent);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentInfo, err.message);
        }
    }
}