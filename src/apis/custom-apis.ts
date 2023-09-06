import AddressBookManagement from "@apis/admin/address-book-management/address-book-management";
import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import GeneralAdminManagementInstance from "@apis/admin/general-admin-management/general-admin-management";
import GroupManagementInstance from "@apis/admin/group-management/group-management";
import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
import WorkItemsContactManagementInstance from "@apis/agent/workitems-contact-management/workitems-contact-management";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState, PageName } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { ContactEvent, OutBoundEmail, SkillCore, SkillDisposition, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { AddressBook } from "@data-objects/inContact/central/admin/users/address-books/address-book";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { FunctionType, Logger, LogType } from "@utilities/general/logger";
import StopWatch from "@utilities/general/stop-watch";
import { JsonUtility, Utility } from "@utilities/general/utility";
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";
import { Tenant } from "@data-objects/CXone/tenant/tenant";

export default class CustomAPIs {

    /**
	 * Create error message for API methods
	 * @static
	 * @param {Options} option contains info to send API
	 * @param {APIResponse} response of API
	 * @returns {string} A formatted error message
	 */
    private static createErrorMessage(option: Options, response: APIResponse): string {
        if (response.body.includes('error_description')) {
            let jsonBody: any = JSON.parse(response.body);
            return `API failed: Cannot ${option.method} '${option.url}'; Return status code: ${response.status} - ${jsonBody.error_description}`;
        } else {
            return `API failed: Cannot ${option.method} '${option.url}'; Return status code: ${response.status}`;
        }
    }

	/**
	 * Authorize agent using API then add authorization information back to the agent
	 * @static
	 * @param {Agent} agent which is used to authorize
	 * @param {string} tokenURL URL to get the Token
	 * @param {string} authenticationEncoded Authentication encoded value
	 * @returns {Agent} an authorized agent
	 */
    static async authorize(agent: Agent): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Authorizing Agent ${agent.email}`);

            let options = new Options(TestRunInfo.cluster.getURL(PageName.TOKEN), Method.POST);

            options.addHeader("Authorization", TestRunInfo.cluster.encoded);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("grant_type", "password");
            options.addBody("username", agent.email);
            options.addBody("password", agent.password);
            options.addBody("scope", "");

            let response = await APICore.request(options)
            if (response.status == 200) {
                let jsonbody = JSON.parse(response.body);
                agent.accessToken = jsonbody.access_token;
                agent.baseUri = jsonbody.resource_server_base_uri;
                agent.tokenType = jsonbody.token_type;
                agent.agentID = jsonbody.agent_id;
                agent.teamID = jsonbody.team_id;
                agent.businessNumber = jsonbody.bus_no;
                agent.refreshToken = jsonbody.refresh_token;
                await Logger.write(FunctionType.API, `Authorized successfully!`);
            } else if (response.status == 503) {
                throw Error(`${this.createErrorMessage(options, response)} - Service Unavailable, Back - end server is at capacity`)
            } else {
                throw Error(this.createErrorMessage(options, response));
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.authorize, err.message);
        }
    }

	/**
	 * Start or Join session for an agent using API
	 * @static
	 * @param {Agent} agent which is used to start or join existing session
	 * @param {string} phoneNumber which is used to start or join existing session
	 */
    static async startOrJoinSession(agent: Agent, phoneNumber: string): Promise<boolean> {
        try {
            await Logger.write(FunctionType.API, `Starting session for Agent ${agent.email}`);

            let startSessionRes: APIResponse = await inContactAPIs.postAgentSessions(agent, APIVersion.V11, phoneNumber);

            if (startSessionRes.status == 202) {
                let jsonbody = JSON.parse(startSessionRes.body);
                agent.sessionId = jsonbody.sessionId;
                await Logger.write(FunctionType.API, `Session started! Session ID is: ${agent.sessionId}`);
                return true;
            } else if (startSessionRes.status == 409) {
                await Logger.write(FunctionType.API, `Agent ${agent.email} already has an in-progress session. Joining...`);

                let joinRes: APIResponse = await inContactAPIs.postAgentSessionsJoin(agent, APIVersion.V11);

                if (joinRes.status == 202) {
                    let jsonbody = JSON.parse(joinRes.body);
                    agent.sessionId = jsonbody.sessionId;
                    await Logger.write(FunctionType.API, `Session joined! Session ID is:${agent.sessionId}`, LogType.DEBUG);
                    return true;
                }
            } else {
                await Logger.write(FunctionType.API, `Cleaning Up - Cannot start or join session for Agent ${agent.email}`);
            }
            return false;
        } catch (err) {
            await Logger.write(FunctionType.API, `Cleaning Up - Cannot start session for Agent ${agent.email}` + err.message);
            return false;
        }
    }

	/**
	 * Make an inbound call for an agent using API
	 * @static
	 * @param {Agent} agent which is used to making inbound call
	 * @param {string} skillName skill name to dial
	 */
    static async makeInboundCall(agent: Agent, skillName: string): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Dialing ${skillName} skill for Agent ${agent.email}`);
            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdDialSkill(agent, APIVersion.V2, skillName);

            if (response.status == 202) {
                await Logger.write(FunctionType.API, `${skillName} was made for Agent ${agent.email}`);

            } else {
                throw Error(`API failed: Cannot dial ${skillName} for Agent ${agent.email}. INFO: ${response.body}`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.makeInboundCall, err.message);
        }
    };

    /**
	 * Set Agent State using API
	 * @static
	 * @param {Agent} agent which is used to get next event
	 * @returns {APIResponse} response of the API call
	 */
    static async setAgentState(agent: Agent, state: MaxState): Promise<void> {
        try {
            // await Logger.write(FunctionType.API, `Setting state for Agent ${agent.email}`);

            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdState(agent, APIVersion.V2, state);
            await Logger.write(FunctionType.API, `Setting state for Agent ${agent.email} with status ${response.status} and body ${response.body}`);
            if (response.status == 404) {
                throw Error("API failed: Invalid agent session Id.");
            } else if (response.status == 400) {
                throw Error("API failed: Invalid state request.  Use \"Available\" or \"Unavailable\".");
            } else if (response.status == 409) {
                throw Error("API failed: Invalid State.");
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.setAgentState, err.message);
        }
    }

    /**
	 * Accept contact incoming using API
	 * @static
	 * @param {Agent} agent which is used to accept contact
     * @param {contactId} contactId which is used to accept contact
	 * @returns {APIResponse} response of the API call
	 */
    static async acceptContact(agent: Agent, contactId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Accepting contact ${contactId}`);

            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdAccept(agent, APIVersion.V2, contactId);
            if (response.status != 202)
                throw Error(this.createErrorMessage(response.options, response));
            else {
                await Logger.write(FunctionType.API, `Contact ${contactId} was accepted successfully`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.acceptContact, err.message);
        }
    }

    /**
	 * End contact using API
	 * @static
	 * @param {Agent} agent which is used to end contact
     * @param {contactId} contactId which is used to end contact
	 * @returns {APIResponse} response of the API call
	 */
    static async endContact(agent: Agent, contactId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Ending contact ${contactId}`);

            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdEnd(agent, APIVersion.V2, contactId);

            if (response.status == 202)
                Logger.write(FunctionType.API, `Contact ${contactId} was ended successfully`);
            else if (response.status != 202)
                throw Error(this.createErrorMessage(response.options, response));
        } catch (err) {
            throw new errorwrapper.CustomError(this.endContact, err.message);
        }
    }

    /**
	 * End session using API
	 * @static
	 * @param {Agent} agent which is used to end session
	 * @returns {APIResponse} response of the API call
	 */
    static async endSession(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Ending Session of Agent ${agent.email}`);
            let response: APIResponse = await inContactAPIs.deleteAgentSessionsSessionId(agent, APIVersion.V2, forceLogoff, endContacts, ignorePersonalQueue);
            if (response.status == 202)
                await Logger.write(FunctionType.API, "Session was ended successfully");
            else if (response.status != 202)
                throw Error(this.createErrorMessage(response.options, response));
        } catch (err) {
            throw new errorwrapper.CustomError(this.endSession, err.message);
        }
    }

    /**
     * End all contacts
     *@static
     *@param {Agent} agent
     *@param {SkillType} [skillDispositionName]
     *@param {number} [timeOut=TestRunInfo.elementTimeout]
     *@returns {Promise<void>}
     *@memberof CustomAPIs
     */
    static async endAllContacts(agent: Agent, timeOut: number = TestRunInfo.shortTimeout * 2): Promise<void> {
        let isSessionStart: boolean = true;
        try {
            await Logger.write(FunctionType.API, `Ending all contacts of Agent ${agent.email}`);
            let stopTime: number = 0;
            let stopWatch = new StopWatch();
            let contactTypeArr: string[] = new Array();
            stopWatch.startClock();
            await agent.createPhoneNumber();
            isSessionStart = await this.startOrJoinSession(agent, agent.phoneNumber);
            await this.unparkEmail(agent);

            await this.setAgentState(agent, MaxState.AVAILABLE);
            let agentNextEvent: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V2);
            let contactId: number;
            let contactIdEnded: number = 0;
            let skillId: number;

            while (agentNextEvent.status == 200 && stopTime <= timeOut && JsonUtility.getFieldCount(agentNextEvent.body, "events") > 2) {

                let eventCount: number = JsonUtility.getFieldCount(agentNextEvent.body, "events");
                for (let j = 0; j < eventCount; j++) {

                    let eventType: string = await JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].Type`).replace(/"/g, "");
                    contactTypeArr.push(eventType);
                    if (eventType == ContactEvent.CALL || eventType == ContactEvent.CHAT || eventType == ContactEvent.EMAIL || eventType == ContactEvent.VOICE_MAIL || eventType == ContactEvent.WORK_ITEM) {
                        let statusValue: string = JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].Status`).replace(/"/g, "");
                        if (!statusValue.match("Interrupted")) {

                            // Get contact ID
                            if (eventType == ContactEvent.EMAIL || eventType == ContactEvent.VOICE_MAIL) {
                                contactId = parseInt(JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].ContactId`).replace(/"/g, ""));
                            } else {
                                contactId = parseInt(JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].ContactID`).replace(/"/g, ""));
                            }

                            if (contactId != null && contactId != contactIdEnded) {

                                if (eventType == ContactEvent.WORK_ITEM) {
                                    skillId = parseInt(JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].SkillId`).replace(/"/g, ""));
                                }
                                else {
                                    skillId = parseInt(JsonUtility.getFieldValue(agentNextEvent.body, `events[${j}].Skill`).replace(/"/g, ""));
                                }

                                let agentSkill: APIResponse = await inContactAPIs.getSkillsSkillId(agent, APIVersion.V13, skillId, "acwTypeId");
                                let acwTypeId: number = parseInt(JsonUtility.getFieldValue(agentSkill.body, `acwTypeId`).replace(/"/g, ""));

                                let dispositionId: number = await this.getDispositionId(agent, skillId);

                                // Accept and end Chat|WorkItem contact is incoming
                                if (eventType == ContactEvent.CHAT || eventType == ContactEvent.WORK_ITEM) {
                                    if (statusValue == "Incoming") {
                                        await this.acceptContact(agent, contactId);
                                        await this.endContact(agent, contactId);
                                    }
                                }
                                if (acwTypeId == 2) { // Post Contact Setup: 1 = None, 2 = Disposition, 3 = Automatic Wrap-up	
                                    await this.endDisposition(agent, contactId, dispositionId);
                                }
                                // Resume the contact is holding
                                if (statusValue == "Holding") {
                                    await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdResume(agent, APIVersion.V2, contactId);
                                }
                                if (statusValue == "Active") {
                                    await this.endContact(agent, contactId);
                                }

                            }
                        }

                    } else {
                        j++;
                    }
                    contactIdEnded = contactId;
                }
                await this.setAgentState(agent, MaxState.AVAILABLE);
                agentNextEvent = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V2);
                stopTime = stopWatch.getElapsedTimeInSecond();
            }
            await this.endAllActiveContacts(agent);
            await this.endSession(agent);
        } catch (err) {
            try {
                await this.endAllActiveContacts(agent);
                if (isSessionStart) {
                    await CustomAPIs.endSession(agent, true, true, true);
                }
            } catch (err) {
                throw new errorwrapper.CustomError(this.endAllContacts, `"Unable to end session safely. There might be a problem on MAX. Need to force logoff to end session." -> ` + err.message);
            }
        }
    }

    /**
     * Unpark email by API
     *@author Chinh.Nguyen
     *@static
     *@param {Agent} agent
     *@returns {Promise<void>}
     *@memberof CustomAPIs
     */
    static async unparkEmail(agent: Agent): Promise<void> {
        try {

            let bodyJson: APIResponse = await inContactAPIs.getContactsParked(agent, APIVersion.V7, "", "", "", "", "", "", "", "", "");
            let contactIdArr: number[] = new Array();
            if (bodyJson.body != "") {

                let parkedEmailCount: number = JsonUtility.getFieldCount(bodyJson.body, `resultSet.parkedContacts`);

                for (let i: number = 0; i < parkedEmailCount; i++) {

                    let contactId: number = parseInt(JsonUtility.getFieldValue(bodyJson.body, `resultSet.parkedContacts[${i}].contactId`).replace(/"/g, ""));
                    await Logger.write(FunctionType.API, `Unparking email for contact ${contactId}`);
                    let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent, APIVersion.V7, contactId);
                    if (response.status == 200) {
                        await Logger.write(FunctionType.API, `Unpark email successfully`);
                        await CustomAPIs.endContactWithoutSession(agent, contactId);
                    } else if (response.status == 204) {
                        await Logger.write(FunctionType.API, `No Contacts for the specified period`);
                    } else if (response.status == 404) {
                        throw Error("API failed: InvalidContactId");
                    } else if (response.status == 400) {
                        throw Error("API failed: InvalidIsImmediate");
                    }
                }

                // Need to wait for email routes to agent
                await BrowserWrapper.sleepInSecond(TestRunInfo.shortTimeout);
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.unparkEmail, err.message);
        }
    }

    /**
     * End disposition
     * @author Chinh.Nguyen
     * @static
     * @param {Agent} agent
     * @param {string} contactId
     * @param {string} dispositionId
     * @returns {Promise<void>}
     * @memberof CustomAPIs
     */
    static async endDisposition(agent: Agent, contactId: number, dispositionId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Ending disposition`);
            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdDisposition(agent, APIVersion.V5, contactId, dispositionId.toString(), "", "", "", "", "", "");

            if (response.status == 200) {
                await Logger.write(FunctionType.API, `Disposition is selected successfully`);
            } else if (response.status == 204) {
                await Logger.write(FunctionType.API, `No Contacts for the specified period`);
            } else if (response.status == 404) {
                throw Error("API failed: InvalidContactId");
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.endDisposition, err.message);
        }
    }

    /**
     * Check if the contact is active or not
     * @static
     * @param {APIResponse} bodyJson jSon string which has information about contact events
     * @param {string} type type of contact
     * @returns {boolean} state of contact active/inactive
     * @memberof CustomAPIs 
     */
    static isContactActive(bodyJson: APIResponse, type: ContactName): boolean {
        try {
            Logger.write(FunctionType.API, `Checking if contact is active`);

            let contactType: string;

            if (type == ContactName.PHONE_CALL) {
                contactType = "\"CallContactEvent\"";
            } else if (type == ContactName.CHAT) {
                contactType = "\"ChatContactEvent\"";
            } else if (type == ContactName.WORK_ITEM) {
                contactType = "\"WorkItemContactEvent\"";
            } else if (type == ContactName.EMAIL) {
                contactType = "\"EmailContactEvent\"";
            }

            let isActive: boolean = false;

            let lengAgentEvent: number = JsonUtility.getFieldCount(bodyJson.body, `events`);

            for (var i = 0; i < lengAgentEvent; i++) {
                let type: string = JsonUtility.getFieldValue(bodyJson.body, `events[${i}].Type`);
                let status: string = JsonUtility.getFieldValue(bodyJson.body, `events[${i}].Status`);

                if (type == contactType && status == "\"Active\"") {
                    return isActive = true;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isContactActive, err.message);
        }
    }

    /**
     * Wait for call contact route to agent
     * @static
     * @param {Agent} agent which is waited for
     * @param {number} loop number of loop to wait for 
     * @memberof CustomAPIs
     */
    static async waitForContactRouteToAgent(agent: Agent, loop: number = 10) {
        try {
            await Logger.write(FunctionType.API, `Waiting for contact route to agent ${agent.agentID} ...`);
            while (loop > 0) {
                let bodyJson: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V2);
                let count: number = await JsonUtility.getFieldCount(bodyJson.body, "events") - 1;

                while (count > 0) {
                    let type: string = await JsonUtility.getFieldValue(bodyJson.body, "events[" + count + "].Type");
                    let status: string = await JsonUtility.getFieldValue(bodyJson.body, "events[" + count + "].Status");
                    if (type.match("\"CallContactEvent\"") && status == "\"Active\"" || type.match("ChatContactEvent") || type.match("WorkItem")) {
                        count = 1;
                        loop = 1;
                    }
                    count--;
                }
                loop--;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForContactRouteToAgent, err.message);
        }
    }

    /**
     * Get point of contact address
     * @static
     * @param {Agent} agent 
     * @param {string} skillName 
     * @returns {Promise<string>} Contact address
     * @memberof CustomAPIs
     */
    static async getPointOfContactAddress(agent: Agent, skillType: SkillType): Promise<string> {
        try {
            await Logger.write(FunctionType.API, `Getting point of contact`);

            let response: APIResponse = await inContactAPIs.getPointsOfContact(agent, APIVersion.V1);

            if (response.status == 200) {
                let jsonBody = JSON.parse(response.body);
                let body = jsonBody.pointsOfContact;
                let pointOfContact = "";

                for (let i = 0; i <= body.length - 1; i++) {
                    if (body[i].ContactDescription == SkillCore.getSkillPOC(skillType)) {
                        pointOfContact = body[i].ContactAddress;
                        return pointOfContact;
                    }
                }
            } else if (response.status == 404) {
                throw Error("API failed: Invalid Point Of Contact Id.");
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPointOfContactAddress, err.message);
        }
    }

    /**
     * Start a chat
     * @static
     * @param {Agent} agent 
     * @param {string} chatSkill 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async startChatContact(agent: Agent, chatSkill: SkillType): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Starting a chat contact`);

            let pointOfContact = await this.getPointOfContactAddress(agent, chatSkill);
            let response: APIResponse = await inContactAPIs.postContactsChats(agent, APIVersion.V9, pointOfContact);

            if (response.status == 202) {
                await Logger.write(FunctionType.API, `${SkillCore.getSkillName(chatSkill)} was made for Agent ${agent.email}`);
                return response;
            } else {
                throw Error(`API failed: Cannot start a chat contact with skill ${SkillCore.getSkillName(chatSkill)} for Agent ${agent.email}. INFO: ${response.body}`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.startChatContact, err.message);
        }
    }
    /**
     * Start an email
     * @static
     * @param {Agent} agent 
     * @param {string} chatSkill 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async startEmailContact(agent: Agent, emailSkill: SkillType, toAddress?: string, parentContactId?: null): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Starting an email contact`);

            let skillId = await CustomAPIs.getSkillIdFromSkillName(agent, emailSkill);
            if (toAddress == null) {
                toAddress = Utility.createRandomString(15, "lgvn.test") + "@mailinator.com"
            }
            let response: APIResponse = await inContactAPIs.postAgentSessionsSessionIdInteractionsEmailOutbound(agent, APIVersion.V12, skillId, toAddress);
            if (response.status == 202) {
                await Logger.write(FunctionType.API, `${SkillCore.getSkillName(emailSkill)} was made for Agent ${agent.email}`);
                return response;
            } else {
                throw Error(`API failed: Cannot start a email contact with skill ${SkillCore.getSkillName(emailSkill)} for Agent ${agent.email}. INFO: ${response.body}`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.startEmailContact, err.message);
        }
    }

    /**
    * Start a SMS
    * @static
    * @param {Agent} agent 
    * @param {string} SMSSkill 
    * @param {string} fromAddress
     * @returns {Promise<APIResponse>} 
    * @memberof CustomAPIs
    */
    static async startSMSContact(agent: Agent, SMSSkill: SkillType, fromAddress: string): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Starting a SMS contact`);

            let pointOfContact: string = await this.getPointOfContactAddress(agent, SMSSkill);
            let response: APIResponse = await inContactAPIs.postContactsSMS(agent, APIVersion.V15, pointOfContact, fromAddress, "7");

            if (response.status == 202) {
                await Logger.write(FunctionType.API, `${SkillCore.getSkillName(SMSSkill)} was made for Agent ${agent.email}`);
                return response;
            } else {
                throw Error(`API failed: Cannot start a SMS contact with skill ${SkillCore.getSkillName(SMSSkill)} for Agent ${agent.email}. INFO: ${response.body}`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.startSMSContact, err.message);
        }
    }

    /**
     * Start a chat
     * @static
     * @param {Agent} agent 
     * @param {string} chatSkill 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async startMultiChats(agent: Agent, chatSkill: SkillType, chatNumber: number): Promise<Array<number>> {
        try {
            await Logger.write(FunctionType.API, `Starting ${chatNumber} chats`);
            let listContactID: Array<number> = [];
            for (let a = 0; a < chatNumber; a++) {
                let pointOfContact = await this.getPointOfContactAddress(agent, chatSkill);
                let response: APIResponse = await inContactAPIs.postContactsChats(agent, APIVersion.V9, pointOfContact);
                if (response.status == 202) {
                    listContactID.push(await this.getContactID(response))
                    await Logger.write(FunctionType.API, `Chat contact number ${a + 1} was made for Agent ${agent.email}`);
                } else {
                    throw Error(`API failed: Cannot start a chat contact with skill ${SkillCore.getSkillName(chatSkill)} for Agent ${agent.email}. INFO: ${response.body}`);
                }
            }
            return listContactID
        } catch (err) {
            throw new errorwrapper.CustomError(this.startMultiChats, err.message);
        }
    }

    /**
     * Get Contact ID from API response
     * @static
     * @param {APIResponse} response 
     * @returns {string} 
     * @memberof CustomAPIs
     */
    static getContactID(response: APIResponse): number {
        try {
            let jsonBody = JSON.parse(response.body);
            return jsonBody.contactId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getContactID, err.message);
        }
    }

    /**
     * Start Work item
     * @static
     * @param {Agent} agent which is used
     * @param {string} pocAddress Point of Contact
     * @memberof CustomAPIs
     */
    static async startWorkItem(agent: Agent, pocAddress: string): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Starting work item`);

            let response: APIResponse = await inContactAPIs.postInteractionsWorkItems(agent, APIVersion.V7, pocAddress);
            if (response.status == 202) {
                await Logger.write(FunctionType.API, `${pocAddress} was made for Agent ${agent.email}`);
                return response;
            } else {
                throw Error(`API failed: Cannot start work item with skill ${pocAddress} for Agent ${agent.email}. INFO: ${response.body}`);
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.startWorkItem, err.message);
        }
    }

    /**
     * Get address books ID
     * @static
     * @param {APIResponse} apiResponse 
     * @returns {Promise<string>} 
     * @memberof CustomAPIs
     */
    static async getAddressBookId(agent: Agent, addressBook: AddressBook): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting address books ID`);
            let apiResponse: APIResponse = await inContactAPIs.postAddressBooks(agent, APIVersion.V6, addressBook.addressBookName, addressBook.addressBookType);
            let body = JSON.parse(apiResponse.body);
            let result = body.resultSet;
            return await result.addressBookId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookId, err.message);
        }
    }

    /**
     * Get address books entities ID
     * @static
     * @param {APIResponse} apiResponse 
     * @returns {Promise<string>} 
     * @memberof CustomAPIs
     */
    static async getAddressBookEntitiesId(agent: Agent, addressBookId: number, entityType: string, entityId: number): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting address books entities ID`);
            let apiResponse: APIResponse = await inContactAPIs.postAddressBooksAddressBookIdAssignment(agent, APIVersion.V12, addressBookId, entityType, entityId);
            let body = JSON.parse(apiResponse.body);
            let assignResults = body.assignResults;
            let strEntriesId: string = assignResults[0].entityId;
            return await parseInt(strEntriesId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookEntitiesId, err.message);
        }
    }

    /**
	 * Get skill ID by using skill name
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillType which is used to skill name field
	 * @returns {APIResponse} response of the API call
	 */
    static async getSkillIdFromSkillName(agent: Agent, skillType: SkillType): Promise<number> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);
            await Logger.write(FunctionType.API, `Getting skill ID by using skill name ${skillName}`);

            let res: APIResponse = await inContactAPIs.getSkills(agent, APIVersion.V8, skillName, "skillId,skillName");
            let skillCount: number = JsonUtility.getFieldCount(res.body, "skills");

            for (let i = 0; i < skillCount; i++) {
                let skillNameValue: string = JsonUtility.getFieldValue(res.body, `skills[${i}].skillName`).replace(/"/g, "");

                if (skillName.match(skillNameValue)) {
                    return await parseInt(JsonUtility.getFieldValue(res.body, `skills[${i}].skillId`).replace(/"/g, ""));
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillIdFromSkillName, err.message);
        }
    }

    /**
	 * Get skill name by using skill ID
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillName which is used to skill name field
	 * @returns {APIResponse} response of the API call
	 */
    static async getSkillNameBySkillId(agent: Agent, skillId: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, `Getting skill name by using skill ID ${skillId}`);

            let res: APIResponse = await inContactAPIs.getSkills(agent, APIVersion.V8, skillId);
            let skillCount: number = JsonUtility.getFieldCount(res.body, "skills");

            for (let i = 0; i < skillCount; i++) {
                let skillIdVal: string = JsonUtility.getFieldValue(res.body, `skills[${i}].skillId`).replace(/"/g, "")

                if (skillId.match(skillIdVal)) {
                    return await JsonUtility.getFieldValue(res.body, `skills[${i}].skillName`).replace(/"/g, "");
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillNameBySkillId, err.message);
        }
    }

    /**
     * Get random skillId
     * @static
     * @param {Agent} agent which is used to start
     * @returns {APIResponse} response of the API call
     */
    static async getRandomSkillId(agent: Agent): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting random skill ID for ${agent.email} `);

            let res: APIResponse = await inContactAPIs.getSkills(agent, APIVersion.V8, '');
            let skillCount: number = JsonUtility.getFieldCount(res.body, "skills");
            let randomPos: number = Math.floor(Math.random() * skillCount) + 1;

            return await parseInt(JsonUtility.getFieldValue(res.body, `skills[${randomPos}].skillId`).replace(/"/g, ""))
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomSkillId, err.message);
        }
    }

    /**
	 * Get skillId from skill name
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillName which is used to skill name field
	 * @returns {APIResponse} response of the API call
	 */
    static async sendEmail(agent: Agent, obEmailInfo: OutBoundEmail): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Sending email`);
            return await inContactAPIs.postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent, APIVersion.V10, obEmailInfo.contactId, obEmailInfo.skillId, obEmailInfo.toAddress, obEmailInfo.subject, obEmailInfo.bodyHtml);
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendEmail, err.message);
        }
    }

    /**
     * Post Address Books Entries
     * POST address-books/{addressBookId}/entries
     * @static
     * @param {Agent} agent 
     * @param {number} addressBookId 
     * @param {string} entriesInfo 
     * @returns {Promise<APIResponse>} 
     * @memberof CustomAPIs
     */
    static async postAddressBooksEntries(agent: Agent, addressBookId: number, entriesInfo: string): Promise<APIResponse> {
        try {
            let url = `${agent.baseUri}services/${APIVersion.V3}/address-books/${addressBookId}/entries`;
            let options = new Options(url, Method.POST);

            options.addHeader("authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");

            return await APICore.requestJson(options, entriesInfo);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAddressBooksEntries, err.message);
        }
    }

    /**
     * Get Address-books entry Id
     * @static
     * @param {APIResponse} apiResponse 
     * @returns {Promise<string>} 
     * @memberof CustomAPIs
     */
    static async getAddressBookEntryId(agent: Agent, addressBookId: number, entriesInfo: string): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting address books entry ID`);
            let apiResponse: APIResponse = await inContactAPIs.postAddressBooksAddressBookIdEntries(agent, APIVersion.V3, addressBookId, entriesInfo);
            let body = JSON.parse(apiResponse.body);
            let entryResult = body.entryResults;
            let strEntriesId: string = entryResult[0].addressBookEntryId;
            return await parseInt(strEntriesId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookEntryId, err.message);
        }
    }

    /**
     * Get disposition Id
     * @author Chinh.Nguyen
     * @static
     * @param {Agent} agent
     * @param {string} skillName
     * @returns {Promise<number>}
     * @memberof CustomAPIs
     */
    static async getDispositionId(agent: Agent, skillId: number): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting disposition ID`);
            let bodyJson: APIResponse = await inContactAPIs.getSkillsSkillIdDispositions(agent, APIVersion.V9, skillId, "", "", null, null, "");
            let dispositionCount: number = JsonUtility.getFieldCount(bodyJson.body, "dispositions");
            for (let i = 0; i < dispositionCount; i++) {
                let dispositionId: number = parseInt(JsonUtility.getFieldValue(bodyJson.body, `dispositions[${i}].dispositionId`));
                if (dispositionId != null) {
                    return dispositionId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDispositionId, err.message);
        }
    }

    /**
     * Verify active contact exists in list
     * @static
     * @param {APIResponse} bodyJson
     * @param {string} mediaType
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async isContactActiveExist(bodyJson: APIResponse, mediaType: string): Promise<boolean> {
        try {
            let isExist = false;
            let lengthContactActive: number = JsonUtility.getFieldCount(bodyJson.body, `resultSet.activeContacts`);

            for (var i = 0; i < lengthContactActive; i++) {
                let type: string = JsonUtility.getFieldValue(bodyJson.body, `resultSet.activeContacts[${i}].mediaType`);
                let state: string = JsonUtility.getFieldValue(bodyJson.body, `resultSet.activeContacts[${i}].state`);

                if (type == "\"" + mediaType + "\"" && state == "\"Active\"") {
                    return isExist = true;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isContactActiveExist, err.message);
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
    static async getCurrentContactId(agent: Agent, skillName: string, multipleContactId: boolean = false): Promise<any> {
        try {
            await Logger.write(FunctionType.API, `Get Current ContactId with skill name ${skillName}`);
            let response: APIResponse = await inContactAPIs.getContactsActive(agent, APIVersion.V6);
            let contactIdArr: number[] = new Array();
            await this.getAgentInfo(agent);
            let comparedVariable: boolean;

            if (response.status == 200) {

                let resultValue: string = JsonUtility.getFieldValue(response.body, "resultSet");
                let contactCount: number = JsonUtility.getFieldCount(resultValue, "activeContacts");

                for (let i = 0; i < contactCount; i++) {
                    let skillNameJson: string = JsonUtility.getFieldValue(resultValue, `activeContacts[${i}].skillName`).replace(/"/g, "")
                    let contactId: number = parseInt(JsonUtility.getFieldValue(resultValue, `activeContacts[${i}].contactId`).replace(/"/g, ""))
                    let skillFirstNameJson: string = JsonUtility.getFieldValue(resultValue, `activeContacts[${i}].firstName`).replace(/"/g, "");
                    let skillLastNameJson: string = JsonUtility.getFieldValue(resultValue, `activeContacts[${i}].lastName`).replace(/"/g, "");

                    comparedVariable = (skillName == skillNameJson && skillFirstNameJson == agent.firstName && skillLastNameJson == agent.lastName);

                    if (comparedVariable) {
                        if (multipleContactId) {
                            contactIdArr.push(contactId);
                        } else {
                            await Logger.write(FunctionType.API, `Current ContactId with skill name ${skillName} is ${contactId}`);
                            return contactId;
                        }
                    }
                }
                if (contactIdArr.length == 0) {
                    return await Logger.write(FunctionType.API, `There is no Contact with skill name ${skillName} is active`);
                } else {
                    await Logger.write(FunctionType.API, `Current ContactIds with skill name ${skillName} are ${contactIdArr}`);
                    return contactIdArr;
                }
            }
            else if (response.status == 204) {
                throw Error("API failed: No Contacts for the specified period.");
            } else if (response.status == 400) {
                throw Error("API failed: Invalid filter parameter.");
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.getCurrentContactId, err.message);
        }
    }

    /**
     * Get Agent information
     * @author ChinhNguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<any>}
     * @memberof CustomAPIs
     */
    static async getAgentInfo(agent: Agent): Promise<Agent> {
        try {
            await Logger.write(FunctionType.API, `Get Current Agent Info`);

            let response: APIResponse = await inContactAPIs.getAgentsAgentId(agent, APIVersion.V13, "");

            if (response.status == 200) {
                agent.firstName = JsonUtility.getFieldValue(response.body, 'agents[0].firstName').replace(/"/g, "");
                agent.lastName = JsonUtility.getFieldValue(response.body, 'agents[0].lastName').replace(/"/g, "");
                agent.name = agent.firstName + " " + agent.lastName;
                return agent;
            }
            else if (response.status == 204) {
                throw Error("API failed: No Contacts for the specified period.");
            } else if (response.status == 400) {
                throw Error("API failed: Invalid filter parameter.");
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentInfo, err.message);
        }
    }

    /**
    * Start a voicemail
    * @static
    * @param {Agent} agent
    * @param {string} voicemailSkillName 
    * @param {string} skillType
    * @returns {Promise<APIResponse>} response of the API call
    * @memberof CustomAPIs
    */
    static async startVoiceMail(agent: Agent, voicemailSkillName: SkillType, voicemailSkillID: number, skillType: SkillType): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Starting VoiceMail`);

            // let scripts: APIResponse = await inContactAPIs.getScripts(agent, APIVersion.V8, "4", "", "SpawnVoiceMail", "", "", "1", "scriptId desc");
            let scripts: APIResponse = await inContactAPIs.getScripts(agent, APIVersion.V8, "4", "", "Voicemail", "", "", "1", "scriptId desc");
            let scriptID: number = parseInt(JsonUtility.getFieldValue(scripts.body, "resultSet.scripts[0].scriptId").replace(/"/g, ""));
            let phoneSkillID: number = await this.getSkillIdFromSkillName(agent, skillType);

            let param: string = `${voicemailSkillID}|${SkillCore.getSkillName(voicemailSkillName)}`;
            let response: APIResponse = await inContactAPIs.postScriptsScriptIdStart(agent, APIVersion.V4, scriptID, phoneSkillID, param);
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.startVoiceMail, err.message);
        }
    }

    /**
     * Getting a skillID assigned to agent
     * @static
     * @param {APIResponse} response 
     * @returns {string} 
     * @memberof CustomAPIs
     */
    static getSkillIdAssignedToAgent(response: APIResponse): number {
        try {
            let jsonBody = JSON.parse(response.body);
            return parseInt(jsonBody.agentSkillAssignments[0].skillId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillIdAssignedToAgent, err.message);
        }
    }

    /**
	 * Check skill name assigned to Agent
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillName which is used to skill name field
	 * @returns {boolean} Assigned : true, not Assigned: false
	 */
    static async isSkillNameAssignedToAgent(agent: Agent, skillName: string): Promise<boolean> {
        try {
            let res: APIResponse = await inContactAPIs.getSkills(agent, APIVersion.V8, skillName, "skillId,skillName");
            let skillCount: number = JsonUtility.getFieldCount(res.body, "skills");

            for (let i = 0; i < skillCount; i++) {
                let skillNameValue: string = JsonUtility.getFieldValue(res.body, `skills[${i}].skillName`).replace(/"/g, "");

                if (skillName.match(skillNameValue)) {
                    return true;
                }
                return false;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillNameAssignedToAgent, err.message);
        }
    }
    /**
        * Start a Inbound call using spawn script
        * @static
        * @param {Agent} agent
        * @param {string} phoneSkillName
        * @returns {Promise<APIResponse>} response of the API call
        * @memberof CustomAPIs
        */
    static async startInboundCall(agent: Agent, skillType: SkillType): Promise<APIResponse> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);
            await Logger.write(FunctionType.API, `Starting InboundCall`);
            let scripts: APIResponse = await inContactAPIs.getScripts(agent, APIVersion.V8, "4", "", "SpawnInboundCall", "", "", "1", "scriptId desc");
            let scriptID: number = parseInt(JsonUtility.getFieldValue(scripts.body, "resultSet.scripts[0].scriptId").replace(/"/g, ""));
            let phoneSkillID: number = await this.getSkillIdFromSkillName(agent, skillType);
            let response: APIResponse = await inContactAPIs.postScriptsScriptIdStart(agent, APIVersion.V4, scriptID, phoneSkillID, skillName);
            await Logger.write(FunctionType.API, `Starting InboundCall with status ` + response.status.toString());
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.startInboundCall, err.message);
        }
    }

    /**
        * Start a Inbound call using IBPhonePageAction script
        * @static
        * @param {Agent} agent
        * @param {SkillType} skillType,
        * @returns {Promise<APIResponse>} response of the API call
        * @memberof CustomAPIs
        */
    static async startInboundCallForPageAction(agent: Agent, skillType: SkillType): Promise<APIResponse> {
        try {
            let skillName: string = SkillCore.getSkillName(skillType);
            await Logger.write(FunctionType.API, `Starting InboundCall for Page Action`);
            let scripts: APIResponse = await inContactAPIs.getScripts(agent, APIVersion.V8, "4", "", "IBPhonePageAction", "", "", "1", "scriptId desc");
            let scriptID: number = parseInt(JsonUtility.getFieldValue(scripts.body, "resultSet.scripts[0].scriptId").replace(/"/g, ""));
            let phoneSkillID: number = await this.getSkillIdFromSkillName(agent, skillType);
            let response: APIResponse = await inContactAPIs.postScriptsScriptIdStart(agent, APIVersion.V4, scriptID, phoneSkillID, skillName);
            await Logger.write(FunctionType.API, `Starting InboundCall for Page Action with status ` + response.status.toString());
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.startInboundCallForPageAction, err.message);
        }
    }


    /**
    * Get Chat Session ID from API response
    * @author Nhat.Nguyen
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    static getChatSessionID(response: APIResponse): string {
        try {
            let jsonBody = JSON.parse(response.body);
            return jsonBody.chatSessionId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getChatSessionID, err.message);
        }
    }

    /**
    * Send Chat message
    * @author Nhat.Nguyen
    * @static
    * @param {Agent} agent
    * @param {string} voicemailSkillName 
    * @param {string} phoneSkillName
    * @returns {Promise<APIResponse>} response of the API call
    * @memberof CustomAPIs
    */
    static async sendChat(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Sending a chat`);
            let response: APIResponse = await inContactAPIs.postChatSessionSendText(agent, APIVersion.V10, chatSessionId, label, chatText);
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendChat, err.message);
        }
    }

    /**
    * Start a work item
    * @static
    * @param {Agent} agent 
    * @param {string} pocAddress 
    * @returns {Promise<APIResponse>} 
    * @memberof CustomAPIs
    */
    static async startMultiWorkItem(agent: Agent, pocAddress: string, number: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Starting ${number} work items`);
            for (let a = 0; a < number; a++) {
                await Logger.write(FunctionType.API, `Starting work item`);

                let response: APIResponse = await inContactAPIs.postInteractionsWorkItems(agent, APIVersion.V7, pocAddress);
                if (response.status == 202) {
                    await Logger.write(FunctionType.API, `${pocAddress} number ${a + 1} was made for Agent ${agent.email}`);
                } else {
                    throw Error(`API failed: Cannot start work item with skill ${pocAddress} for Agent ${agent.email}. INFO: ${response.body}`);
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.startMultiWorkItem, err.message);
        }
    }

    /**
     * Get campaign ID by using campaign name
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {string} campaignName
     * @returns {Promise<number>}
     * @memberof CustomAPIs
     */
    static async getCampaignIdFromCampaignName(agent: Agent, campaignName: string): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Getting campaign ID of campaign '${campaignName}'`);

            let res: APIResponse = await inContactAPIs.getCampaigns(agent, APIVersion.V1);
            let campaignCount: number = JsonUtility.getFieldCount(res.body, "campaigns");

            for (let i = 0; i < campaignCount; i++) {
                let campaignNameValue: string = JsonUtility.getFieldValue(res.body, `campaigns[${i}].CampaignName`).replace(/"/g, "");

                if (campaignName.toLowerCase().match(campaignNameValue.toLowerCase())) {
                    return await parseInt(JsonUtility.getFieldValue(res.body, `campaigns[${i}].CampaignId`).replace(/"/g, ""));
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCampaignIdFromCampaignName, err.message);
        }
    }

    /**
     * Update skill information
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {number} skillId
     * @param {string} jsonString
     * @returns {Promise<void>}
     * @memberof CustomAPIs
     */
    public static async updateSkillBySkillId(agent: Agent, skillId: number, jsonString: string): Promise<void> {
        try {
            let updateJson: string = `{"skill": ${jsonString}}`;
            let response: APIResponse = await inContactAPIs.putSkillsSkillId(agent, APIVersion.V13, skillId, updateJson);
            if (response.status == 200)
                Logger.write(FunctionType.API, `Skill was updated successfully`);
            else if (response.status != 200)
                throw Error(this.createErrorMessage(response.options, response));
        } catch (err) {
            throw new errorwrapper.CustomError(this.updateSkillBySkillId, err.message);
        }
    }

    /**
     * Get all skill dispositions
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {number} skillId
     * @returns {Promise<SkillDisposition[]>}
     * @memberof CustomAPIs
     */
    public static async getAllSkillDispositions(agent: Agent, skillId: number): Promise<SkillDisposition[]> {
        try {
            let disArray: SkillDisposition[] = new Array();
            let priority: number = 1;
            let disJsonPath: string;
            let disResponse: APIResponse = await inContactAPIs.getSkillsSkillIdDispositions(agent, APIVersion.V5, skillId);

            if (disResponse.body.includes("dispositionId")) {
                disJsonPath = "skillDispositions.dispositions";
            } else {
                disResponse = await inContactAPIs.getSkillsSkillIdDispositionsUnassigned(agent, APIVersion.V7, skillId);
                disJsonPath = "resultSet.dispositions";
            }

            let disCount: number = JsonUtility.getFieldCount(disResponse.body, `${disJsonPath}`);

            for (let i = 0; i < disCount; i++) {
                let dispositionName: string = JsonUtility.getFieldValue(disResponse.body, `${disJsonPath}[${i}].dispositionName`).replace(/"/g, "");
                let dispositionId: number = parseInt(JsonUtility.getFieldValue(disResponse.body, `${disJsonPath}[${i}].dispositionId`).replace(/"/g, ""));

                let disposition: SkillDisposition = new SkillDisposition();
                disposition.dispositionId = dispositionId;
                disposition.dispositionName = dispositionName;
                disposition.priority = priority;
                priority++;
                disArray.push(disposition);
            }
            return disArray;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllSkillDispositions, err.message);
        }
    }

    /**
     * Assign agent to skill
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {number} skillId
     * @returns {Promise<void>}
     * @memberof CustomAPIs
     */
    public static async assignAgentToSkill(agent: Agent, skillId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Assigning agent '${agent.email}' to a specific skill`);
            let jsonString: string = `{"agents":[{"agentId":"${agent.agentID}","isActive":true,"proficiency":""}]}`;
            await inContactAPIs.postSkillsSkillIdAgents(agent, APIVersion.V7, skillId, jsonString);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAgentToSkill, err.message);
        }
    }

    /**
     * Remove Skill from Agent
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {number} skillId
     * @returns {Promise<void>}
     * @memberof CustomAPIs
     */
    public static async removeSkillFromAgent(agent: Agent, skillId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Removing skill from agent '${agent.email}'`);
            let jsonString: string = `{"skills":[{"skillId":"${skillId}"}]}`;
            await inContactAPIs.deleteAgentsAgentIdSkills(agent, APIVersion.V7, jsonString);
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignAgentToSkill, err.message);
        }
    }

    /**
    *  Get Out State Id
    * @Tan.Ta
    * @static
    * @param {Agent} agent
    * @param {string} outStateName
    * @returns {Promise<number>}
    * @memberof CustomAPIs
    */
    public static async getOutStateId(agent: Agent, outStateName: string): Promise<number> {
        try {
            let response: APIResponse = await inContactAPIs.getUnavailableCodes(agent, APIVersion.V13);
            let len: number = JsonUtility.getFieldCount(response.body, "unavailableCodes");
            for (let i: number = 0; i < len; i++) {
                let outStateNameValue: string = JsonUtility.getFieldValue(response.body, `unavailableCodes[${i}].outStateName`);

                if (outStateNameValue.match(outStateName)) {
                    let outStateIdValue: string = JsonUtility.getFieldValue(response.body, `unavailableCodes[${i}].outStateId`);
                    return parseInt(outStateIdValue);
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getOutStateId, err.message);
        }
    }

    /**
     * Getting list skill name of media type
     * @author Y.Le
     * @static
     * @param {Agent} agent
     * @param {string} mediaType
     * @returns {Promise<string[]>}
     * @memberof CustomAPIs
     */
    public static async getListSkillNameOfMediaType(agent: Agent, mediaType: string): Promise<string[]> {
        try {
            await Logger.write(FunctionType.API, "Getting list skill name of media type");
            let disArray: string[] = new Array();
            let res: APIResponse = await inContactAPIs.getSkills(agent, APIVersion.V8, '', "skillName,mediaTypeName");
            let disCount: number = JsonUtility.getFieldCount(res.body, "skills");
            for (let i = 0; i < disCount; i++) {
                let skillName: string = JsonUtility.getFieldValue(res.body, `skills[${i}].skillName`).replace(/"/g, "");
                let mediaTypeName: string = JsonUtility.getFieldValue(res.body, `skills[${i}].mediaTypeName`).replace(/"/g, "");
                if (mediaTypeName == mediaType) {
                    disArray.push(skillName);
                }
            }
            return disArray;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListSkillNameOfMediaType, err.message);
        }
    }

    /**
    * Get Params from API response
    * @author Nhat.Nguyen
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getAddressBookIdByName(agent: Agent, addressBookName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting AddressBook ID by name");

            let response: APIResponse = await inContactAPIs.getAddressBooks(agent, APIVersion.V4);

            for (let i: number = 0; i < JsonUtility.getFieldCount(response.body, "addressBooks"); i++) {
                if (JsonUtility.getFieldValue(response.body, `addressBooks[${i}].addressBookName`).replace(/"/g, "") == addressBookName) {
                    let addressBookId: string = JsonUtility.getFieldValue(response.body, `addressBooks[${i}].addressBookId`).replace(/"/g, "")
                    return addressBookId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookIdByName, err.message);
        }
    }

    /**
    * Get Tag ID by Tag Name
    * @author Phat.Ngo
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getTagIdByTagName(agent: Agent, tagName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting Tag ID by name");

            let response: APIResponse = await inContactAPIs.getTags(agent, APIVersion.V12, "", "");
            let fields: number = JsonUtility.getFieldCount(response.body, "tags");
            for (let i: number = 0; i < fields; i++) {
                if (JsonUtility.getFieldValue(response.body, `tags[${i}].tagName`).replace(/"/g, "") == tagName) {
                    let tagId: string = JsonUtility.getFieldValue(response.body, `tags[${i}].tagId`).replace(/"/g, "");
                    return tagId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTagIdByTagName, err.message);
        }
    }

    /**
     * Get AddressBook Entry ID by AddressBook ID
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @param {number} addressBookId
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getAddressBookEntryIdById(agent: Agent, addressBookId: number): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting AddressBook Entry ID by AddressBook ID");
            let res: APIResponse = await inContactAPIs.getAddressBooksAddressBookIdEntries(agent, APIVersion.V4, addressBookId);
            let addressBook = JSON.parse(res.body).addressBook;
            return addressBook.addressBookEntries[0].addressBookEntryId;
        } catch (error) {
            throw new errorwrapper.CustomError(this.getAddressBookEntryIdById, error.message);
        }
    }

    /**
    * Get ID from Team Name
    * @author Anh.Ho
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getTeamIdByName(agent: Agent, teamName: string, version: APIVersion): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting Team ID by name");
            let response: APIResponse = await inContactAPIs.getAllTeamsAgents(agent, version);
            for (let i: number = 0; i < JsonUtility.getFieldCount(response.body, "teams"); i++) {
                if (JsonUtility.getFieldValue(response.body, `teams[${i}].teamName`).replace(/"/g, "") == teamName) {
                    let teamId: string = JsonUtility.getFieldValue(response.body, `teams[${i}].teamId`).replace(/"/g, "")
                    return teamId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamIdByName, err.message);
        }
    }

    /**
     * Get random contact state id
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @returns {Promise<number>}
     * @memberof CustomAPIs
     */
    public static async getRandomContactStateId(agent: Agent): Promise<number> {
        try {
            await Logger.write(FunctionType.API, "Getting Contact State ID");
            let response: APIResponse = await inContactAPIs.getContactStateDescriptions(agent, APIVersion.V12);
            let lenContactState: number = JsonUtility.getFieldCount(response.body, "contactStateDescriptions");
            let i: number = Utility.getRandomNumber(1, 0, lenContactState - 1)
            let contactStateId: number = parseInt(JsonUtility.getFieldValue(response.body, `contactStateDescriptions[${i}].ContactStateId`).replace(/"/g, ""));
            return contactStateId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomContactStateId, err.message);
        }
    }

    /**
     * Get random contact id
     * @author Phat.Truong
     * @static
     * @param {Agent} agent
     * @returns {Promise<number>}
     * @memberof CustomAPIs
     */

    public static async getRandomContactId(res: APIResponse): Promise<number> {
        try {
            await Logger.write(FunctionType.API, "Getting random ContactID from agent");
            let lenContactState: number = JsonUtility.getFieldCount(res.body, "completedContacts");
            let i: number = Utility.getRandomNumber(1, 0, lenContactState);
            let contactID: number = parseInt(JsonUtility.getFieldValue(res.body, `completedContacts[${i}].contactId`).replace(/"/g, ""));
            return contactID;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomContactStateId, err.message);
        }
    }

    /**
     * Get all country Id by country name
     * @author Huy.Nguyen
     * @static
     * @param {Agent} agent
     * @param {string} countryName
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getCountryIdByCountryNameV12(agent: Agent, countryName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting countries ID with API version 12");
            let response: APIResponse = await GeneralAdminManagementInstance.getGeneralAdminManagementInstance().returnsCountries(agent);
            let countryId: string = null;
            let countryData: any = JSON.parse(response.body);
            let allCountries: any[] = countryData.countries;
            let fieldCount: number = allCountries.length;
            for (let i = 0; i <= fieldCount; i++) {
                if (countryName == allCountries[i].countryName) {
                    countryId = allCountries[i].countryId;
                    return countryId;
                }
            }
            return countryId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCountryIdByCountryNameV12, err.message);
        }
    }

    /**
     * Get random tag ID from list tags with version 12
     * @author Huy.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getRandomTagId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting random tags ID with API version 12");
            let response: APIResponse = await inContactAPIs.getTags(agent, APIVersion.V12, "", "");
            let allTagsJSON: any = JSON.parse(response.body);
            let totalTags: number = allTagsJSON.tags.length;
            let index = Utility.getRandomNumber(3, 0, totalTags - 1);
            return allTagsJSON.tags[index].tagId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomTagId, err.message);
        }
    }

    /**
     * Get script ID by Skill Type
     * @author Phat.Ngo
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getScriptIdBySkillType(agent: Agent, skillType: string, isActive: string = ""): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Get script ID by Skill Type");
            let res: APIResponse = await inContactAPIs.getScripts(agent, APIVersion.V12, skillType, isActive);
            let scripts: any = JSON.parse(res.body).resultSet.scripts;
            let index: number = Utility.getRandomNumber(1, 0, scripts.length - 1);
            return scripts[index].scriptId;
        } catch (error) {
            throw new errorwrapper.CustomError(this.getScriptIdBySkillType, error.message);
        }
    }

    public static async getPointContactIDByName(agent: Agent, contactName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting point of contact ID by name");
            let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();
            let response: APIResponse = await apiClass.returnsAListOfPointsOfContact(agent);
            let body = JSON.parse(response.body);
            for (let i = 0; i < body.pointsOfContact.length; i++) {
                if (body.pointsOfContact[i].ContactDescription.replace(/"/g, "") == contactName) {
                    return body.pointsOfContact[i].ContactCode;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAddressBookIdByName, err.message);
        }
    }

    /**
    * Get ID from Template Name    
    * @author Anh.Ho
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getTemplateIdByName(agent: Agent, templateName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting Template ID by name");
            let GeneralAdminManagementAPI = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();
            let response: APIResponse = await GeneralAdminManagementAPI.getsAllMessageTemplates(agent);

            for (let i: number = 0; i < JsonUtility.getFieldCount(response.body, "messageTemplates"); i++) {
                if (JsonUtility.getFieldValue(response.body, `messageTemplates[${i}].templateName`).replace(/"/g, "") == templateName) {
                    let TemplateId: string = JsonUtility.getFieldValue(response.body, `messageTemplates[${i}].templateId`).replace(/"/g, "")
                    return TemplateId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTemplateIdByName, err.message);
        }
    }
    /**
    * Get ID from Group Name    
    * @author Anh.Ho
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getGroupIdByName(agent: Agent, groupName: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting Group ID by name");
            let apiClass = GroupManagementInstance.getGroupManagementInstance();
            let response: APIResponse = await apiClass.getGroups(agent);
            for (let i: number = 0; i < JsonUtility.getFieldCount(response.body, "groups"); i++) {
                if (JsonUtility.getFieldValue(response.body, `groups[${i}].groupName`).replace(/"/g, "") == groupName) {
                    let groupId: string = JsonUtility.getFieldValue(response.body, `groups[${i}].groupId`).replace(/"/g, "")
                    return groupId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getGroupIdByName, err.message);
        }
    }


    /**
     * Get random dnc group ID from list dnc groups with API version 12
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getRandomDncGroupId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting random DNC group ID with API version 12");
            let response: APIResponse = await CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance().returnsListOfDncGroups(agent);
            let totalGroups = JsonUtility.getFieldCount(response.body, 'resultSet.dncGroups');
            for (let i = 0; i < totalGroups - 1; i++) {
                if (JsonUtility.getFieldValue(response.body, `resultSet.dncGroups[${i}].isActive`).replace(/"/g, "") == "True") {
                    return JsonUtility.getFieldValue(response.body, `resultSet.dncGroups[${i}].dncGroupId`).replace(/"/g, "");
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomDncGroupId, err.message);
        }
    }

    /**
     * Get random template ID from template list     
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getRandomTemplateId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, " Getting random template ID from template list");
            let response: APIResponse = await GeneralAdminManagementInstance.getGeneralAdminManagementInstance().getsAllMessageTemplates(agent);
            let allTemplateJSON: any = JSON.parse(response.body);
            let totalTemplate: number = allTemplateJSON.messageTemplates.length;
            if (totalTemplate < 1) {
                return "No result";
            }
            let index = Utility.getRandomNumber(3, 0, totalTemplate - 1);
            return allTemplateJSON.messageTemplates[index].templateId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomTemplateId, err.message);
        }
    }
    /**
     * Get random group ID from group list     
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getRandomGroupId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, " Getting random group ID from group list");
            let apiClass = GroupManagementInstance.getGroupManagementInstance();
            let response: APIResponse = await apiClass.getGroups(agent);
            let allGroupJSON: any = JSON.parse(response.body);
            let totalGroup: number = allGroupJSON.groups.length;
            if (totalGroup < 1) {
                let groupName: string = "lgvn_groupname" + Utility.createRandomString(3);
                await apiClass.createGroups(agent, groupName);
                response = await apiClass.getGroups(agent);
                allGroupJSON = JSON.parse(response.body);
            }
            let index = Utility.getRandomNumber(3, 0, totalGroup - 1);
            return allGroupJSON.groups[index].groupId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomGroupId, err.message);
        }
    }

    /**
    * Wait for callback event
    * @static
    * @param {Agent} agent
    * @param {number} [timeOut=TestRunInfo.elementTimeout]
    * @returns {Promise<string>}
    * @memberof CustomAPIs
    */
    public static async waitForNextEventActive(agent: Agent, timeOut: number = TestRunInfo.shortTimeout * 4): Promise<string> {
        try {
            await Logger.write(FunctionType.API, `Wait for callback event`);
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            let isPromiseEvent: boolean = false;

            while ((!isPromiseEvent) && stopWatch.getElapsedTimeInSecond() <= timeOut) {
                let agentNextEvent: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V2, 10);
                if (agentNextEvent.status == 200) {
                    let eventCount: number = JsonUtility.getFieldCount(agentNextEvent.body, "events");
                    for (let i = 0; i < eventCount; i++) {
                        if (await JsonUtility.getFieldValue(agentNextEvent.body, `events[${i}].Type`).replace(/"/g, "") == 'PromiseKeeper') {
                            return await JsonUtility.getFieldValue(agentNextEvent.body, `events[${i}].CallbackId`).replace(/"/g, "");
                        } else {
                            isPromiseEvent = false;
                        }
                    }
                } else if (agentNextEvent.status == 304) {
                    isPromiseEvent = false;
                }
            }
            return "there is no callback id";
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForNextEventActive, `"there is no callbackid available" -> ` + err.message);
        }
    }

    /**
     * Create and Get AddressBook Dynamic Entry ID by AddressBook ID 
     * @author Anh.Ho
     * @static
     * @param {Agent} agent
      * @param {number} addressBookId
     * @returns {Promise<string>}
     * @memberof CustomAPIs
    */
    public static async createAndgetAddressBookDynamicEntryIdById(agent: Agent, addressBookId: number): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Creating and getting AddressBook Dynamic Entry ID by AddressBook ID");
            let apiClass = await AddressBookManagement.getAddressBookManagementInstance();
            let res: APIResponse = await apiClass.createOrUpdateDynamicAddressBookEntries(agent, addressBookId, "True", "111", "TestAPI", "LastName", "4000100");
            let addressbook = JSON.parse(res.body).entryResults;
            return addressbook[0].addressBookEntryId;
        } catch (error) {
            throw new errorwrapper.CustomError(this.createAndgetAddressBookDynamicEntryIdById, error.message);
        }
    }



    /**
     * Put contact on hold
     * @author Tuan.Vu
     * @static
     * @param {Agent} agent
     * @param {number} contactId
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    public static async holdContact(agent: Agent, contactId: number): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Putting contact on hold`);
            let workItemAPI = WorkItemsContactManagementInstance.getWorkItemsContactManagementInstance();
            return await workItemAPI.holdAWorkItem(agent, contactId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.holdContact, err.message);
        }
    }


    /**
      * get Profile ID
      * @author Lien.Nguyen
      * @param {Agent} agent
      * @returns {Promise<APIResponse>}
      */
    public static async getProfileID(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting profile");
            let apiClass = GeneralAdminManagementInstance.getGeneralAdminManagementInstance();
            let response: APIResponse = await apiClass.returnsAllSecurityProfiles(agent);
            let bodyJson = JSON.parse(response.body);
            return bodyJson.securityProfiles[0].securityProfileId;

        } catch (err) {
            throw new errorwrapper.CustomError(this.getProfileID, err.message);
        }
    }

    /**
    * Get skill ID By Outbound Strategy    
    * @author Anh.Ho
    * @static
    * @param {APIResponse} response 
    * @returns {string} 
    * @memberof CustomAPIs
    */
    public static async getSkillIdByOutboundStrategy(agent: Agent, outboundStrategy: string): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting skill ID by Outbound Strategy");
            let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();
            let response: APIResponse = await apiClass.returnsSkillsDetails(agent);
            for (let i: number = 0; i < JsonUtility.getFieldCount(response.body, "skills"); i++) {
                if (JsonUtility.getFieldValue(response.body, `skills[${i}].outboundStrategy`).replace(/"/g, "") == outboundStrategy) {
                    let skillId: string = JsonUtility.getFieldValue(response.body, `skills[${i}].skillId`).replace(/"/g, "");
                    return skillId;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillIdByOutboundStrategy, err.message);
        }
    }

    /**
     * Get contact ID of agent from get next event
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {ContactEvent} type
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getNextEventContactIdByAgent(agent: Agent, type: ContactEvent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting contactId by agent from get next event");
            let response: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V12);
            let body = JSON.parse(response.body);
            let arrayAgents = body.events;
            for (let i = 0; i < arrayAgents.length; i++) {
                if (arrayAgents[i].Type == type) {
                    return arrayAgents[i].ContactID;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getNextEventContactIdByAgent, err.message);
        }
    }

    /**
     * Get random group ID from group list     
     * @author Lien.Nguyen
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getRandomTeamId(agent: Agent, teamIDOrg: string = ""): Promise<string> {
        try {
            await Logger.write(FunctionType.API, " Getting random group ID from group list");
            let response: APIResponse = await AgentManagementInstance.getAgentManagementInstance().returnsListOfTeams(agent);
            let allTeamJSON: any = JSON.parse(response.body);
            let totalTeam: number = allTeamJSON.teams.length;
            if (totalTeam < 1) {
                return "No result";
            }
            let i: number = 0;
            while (i < totalTeam) {
                let index = Utility.getRandomNumber(0, 0, totalTeam);
                if (allTeamJSON.teams[index].isActive == true && allTeamJSON.teams[index].teamId != teamIDOrg) {
                    return allTeamJSON.teams[index].teamId;
                }
                i++;
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.getRandomTeamId, err.message);
        }
    }

    /**
    * Get Team ID from Agent  
    * @author Nhat.Nguyen
    * @static
    * @param {Agent} agent
    * @returns {Promise<string>}
    * @memberof CustomAPIs
    */
    public static async getTeamIDOfAgent(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting Team ID from Agent");
            let response: APIResponse = await AgentManagementInstance.getAgentManagementInstance().getAgentDetailsByAgentId(agent);
            let allTeamJSON: any = JSON.parse(response.body);
            return allTeamJSON.agents[0].teamId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamIDOfAgent, err.message);
        }
    }

    /**
      * get Report ID
      * @author Chinh.Nguyen
      * @param {Agent} agent
      * @returns {Promise<APIResponse>}
      */
    public static async getReportID(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting report id");
            let response: APIResponse = await inContactAPIs.getReports(agent, APIVersion.V12);
            let bodyJson = JSON.parse(response.body);
            return bodyJson.reports[0].reportId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getReportID, err.message);
        }
    }

    /**
     * get Job ID
     * @author Chinh.Nguyen
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     */
    public static async getJobID(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting job id");
            let reportId: string;

            if (TestRunInfo.clusterID + "" == "SC3") {
                reportId = "-6116";
            } else {
                let reportsResponse: APIResponse = await inContactAPIs.getReports(agent, APIVersion.V5);
                let reportsBodyJson = JSON.parse(reportsResponse.body);
                reportId = reportsBodyJson.reports[0].reportId;
            }
            let jobIdResponse: APIResponse = await inContactAPIs.postReportJobsReportId(agent, APIVersion.V12, parseInt(reportId));
            let jobIdBodyJson = JSON.parse(jobIdResponse.body);

            return jobIdBodyJson.jobId;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getJobID, err.message);
        }
    }


    /**
* Delete all callback scheduled in agent
* @author Phat.Truong
* @param {Agent} agent
* @returns {Promise<APIResponse>}
*/
    public static async cleanUpCallbackScheduled(agent: Agent): Promise<void> {
        try {
            await Logger.write(FunctionType.API, "Cleaning up all callback scheduled in agent");

            let res: APIResponse = await inContactAPIs.getAgentsAgentIdScheduledCallbacks(agent, APIVersion.V12);
            let callbackIdCnt: number = JsonUtility.getFieldCount(res.body, "callbacks");
            for (let i = 0; i < callbackIdCnt; i++) {
                let callbackID: string = await JsonUtility.getFieldValue(res.body, `callbacks[${i}].callbackId`).replace(/"/g, "");
                await inContactAPIs.deleteScheduledCallbacksCallbackId(agent, APIVersion.V12, parseInt(callbackID));
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.getJobID, err.message);
        }
    }

    /**
     * Returns A Performance Summary Of All Agents
     * @author Chinh.Nguyen
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {string} [field]
     * @param {string} [startDateOrg]
     * @param {string} [endDateOrg]
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    public static async returnsAPerformanceSummaryOfAllAgents(agent: Agent, version: APIVersion, field?: string, startDateOrg?: string, endDateOrg?: string): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, "Returns a performance summary of all agents");
            let response: APIResponse = await inContactAPIs.getAgentsPerformance(agent, version, field, startDateOrg, endDateOrg);
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAPerformanceSummaryOfAllAgents, err.message);
        }
    }

    /**
	 * Check skill name is assigned and active on Agent
	 * @static
	 * @param {Agent} agent which is used to start
	 * @param {string} skillName which is used to skill name field
	 * @returns {boolean} Assigned : true, not Assigned: false
	 */
    static async isSkillsActiveOnAgent(agent: Agent, skillName: string): Promise<boolean> {
        try {
            let res: APIResponse = await inContactAPIs.getAgentsAgentIdSkills(agent, APIVersion.V8, skillName);
            let agentSkillAssignments = JSON.parse(res.body).resultSet.agentSkillAssignments;
            let skillCount: number = agentSkillAssignments.length;

            if (skillCount == 0) {
                return false;
            } else {
                for (let i = 0; i < skillCount; i++) {
                    let skillNameValue: string = agentSkillAssignments[i].skillName;

                    if (skillName.match(skillNameValue)) {
                        return true;
                    }
                    return false;
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.isSkillsActiveOnAgent, err.message);
        }
    }

    /**
	 * End contact using API
	 * @static
	 * @param {Agent} agent which is used to end contact
     * @param {contactId} contactId which is used to end contact
	 * @returns {APIResponse} response of the API call
	 */
    static async endContactWithoutSession(agent: Agent, contactId: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Ending contact ${contactId}`);

            let response: APIResponse = await inContactAPIs.postContactsContactIdEnd(agent, APIVersion.V12, contactId);

            if (response.status == 202)
                Logger.write(FunctionType.API, `Contact ${contactId} was ended successfully`);
            else if (response.status != 202)
                throw Error(this.createErrorMessage(response.options, response));
        } catch (err) {
            throw new errorwrapper.CustomError(this.endContactWithoutSession, err.message);

        }
    }

    /**
     * Remove Skill from Agent
     * @author W.Plaza
     * @static
     * @param {Agent} agent
     * @param {number} addressBookId
     * @param {number} addressBookEntryId
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    public static async removeAddressBookEntities(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Removing Address Book entities`);
            let res: APIResponse = await inContactAPIs.deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent, APIVersion.V3, addressBookId, addressBookEntryId);
            return res;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAddressBookEntities, err.message);
        }
    }

    /**
     * End all active contacts
     * @static
     * @param {Agent} agent
     * @returns {Promise<any>}
     * @memberof CustomAPIs
     */
    static async endAllActiveContacts(agent: Agent): Promise<any> {
        try {
            await Logger.write(FunctionType.API, `End all current active contacts`);
            let response: APIResponse = await inContactAPIs.getContactsActive(agent, APIVersion.V6);

            if (response.status == 200) {

                let resultValue: string = JsonUtility.getFieldValue(response.body, "resultSet");
                let contactCount: number = JsonUtility.getFieldCount(resultValue, "activeContacts");

                for (let i = 0; i < contactCount; i++) {
                    let contactId: number = parseInt(JsonUtility.getFieldValue(resultValue, `activeContacts[${i}].contactId`).replace(/"/g, ""));
                    await this.endContactWithoutSession(agent, contactId);
                }
            } else if (response.status == 204) {
                await Logger.write(FunctionType.API, `No Contacts for the specified period.`);
            } else if (response.status == 400) {
                throw Error("API failed: Invalid filter parameter.");
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.endAllActiveContacts, err.message);
        }
    }

    /** 
     * Remove Skill from Agent
     * @author W.Plaza
     * @static
     * @param {Agent} agent
     * @param {number} addressBookId
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    public static async removeAddressBook(agent: Agent, addressBookId: number): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Removing Address Book`);
            let res: APIResponse = await inContactAPIs.deleteAddressBooksAddressBookId(agent, APIVersion.V4, addressBookId);
            return res;
        } catch (err) {
            throw new errorwrapper.CustomError(this.removeAddressBook, err.message);
        }
    }

    /**
     * Getting completed contact id
     * @author Y.Le
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    public static async getCompletedContactId(agent: Agent): Promise<string> {
        try {
            await Logger.write(FunctionType.API, "Getting completed contact id");
            let res: APIResponse = await inContactAPIs.getContactsStates(agent, APIVersion.V12);
            return JsonUtility.getFieldValue(res.body, 'contactStates[0].ContactId');
        } catch (err) {
            throw new errorwrapper.CustomError(this.getCompletedContactId, err.message);
        }
    }

    /** This method will create a new Tag in the Business Unit.
    * @author Chuong.Nguyen
    * @static
    * @param {Agent} agent
    * @param {string} tagName
    * @param {string} notes
    * @returns {Promise<number>}
    * @memberof CustomAPIs
    */
    public static async createNewSkillTag(agent: Agent, tagName: string, notes: string): Promise<number> {
        try {
            await Logger.write(FunctionType.API, `Creating New Skill Tag`);
            let response: APIResponse = await inContactAPIs.createsATag(agent, tagName, notes);
            return await JSON.parse(response.body).tagId
        } catch (err) {
            throw new errorwrapper.CustomError(this.createNewSkillTag, err.message);
        }
    }

    /**
     * Wait for call is dialing
     * @author Y.Le
     * @static
     * @param {Agent} agent
     * @param {number} contactId
     * @param {number} timeOut
     * @returns {Promise<void>}
     * @memberof CustomAPIs
     */
    public static async waitForCallDialing(agent: Agent, contactId: number, timeOut: number): Promise<void> {
        try {
            await Logger.write(FunctionType.API, "Waiting for call dialing");
            let isCallDialing: boolean = true;
            let status: boolean;
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            while (isCallDialing && stopWatch.getElapsedTimeInSecond() < timeOut) {
                let res: APIResponse = await inContactAPIs.getAgentSessionsSessionIdGetNextEvent(agent, APIVersion.V12);
                let count: number = JsonUtility.getFieldCount(res.body, "events");
                for (let loop: number = 0; loop < count; loop++) {
                    if (JsonUtility.getFieldValue(res.body, `events[${loop}].Type`).replace(/"/g, "") == ContactEvent.CALL) {
                        if (await JsonUtility.getFieldValue(res.body, `events[${loop}].ContactID`).replace(/"/g, "") == contactId.toString()) {
                            status = await JsonUtility.getFieldValue(res.body, `events[${loop}].ContactID`).replace(/"/g, "") == "Dialing";
                            isCallDialing = isCallDialing == status
                        }
                    }
                }
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitForCallDialing, err.message);
        }
    }
    /** This method assigns Tags to the Skill identified by "skillId".
    * @param {Agent} agent
    * @param {*} skillId Skill ID
    * @param {*} tagId Tag ID
    * @returns {Promise<APIResponse>}
    * @memberof CustomAPIs
    */
    static async assignsATagToASkillID(agent: Agent, skillId: any, tagId: any): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Assign a tag to Skill ID`);
            await inContactAPIs.assignsATagToASkill(agent, skillId, tagId)
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsATagToASkillID, err.message);
        }
    }

    /**
     * This method assigns Tags to the Skill identified by "Name".
     * @param {Agent} agent
     * @param {*} skillId Skill ID
     * @param {*} tagId Tag ID
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async assignsATagToASkillName(agent: Agent, skillName: SkillType, tagId: any): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Assign a tag to Skill Name`);
            let skillID = await CustomAPIs.getSkillIdFromSkillName(agent, skillName);
            await inContactAPIs.assignsATagToASkill(agent, skillID, tagId)
        } catch (err) {
            throw new errorwrapper.CustomError(this.assignsATagToASkillID, err.message);
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
    static async removesTagsFromASkillID(agent: Agent, skillId: any, tagId: any): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Remove a tag to Skill ID`);
            await inContactAPIs.removesTagsFromASkill(agent, skillId, tagId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesTagsFromASkillID, err.message);
        }
    }

    /**
     * This method removes Tags from the Skill identified by "Name"
     * @param {Agent} agent
     * @param {*} skillId Skill ID
     * @param {*} tagId Tag ID
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async removesTagsFromASkillName(agent: Agent, skillName: SkillType, tagId: any): Promise<void> {
        try {
            await Logger.write(FunctionType.API, `Remove a tag to Skill Name`);
            let skillID = await CustomAPIs.getSkillIdFromSkillName(agent, skillName);
            await inContactAPIs.removesTagsFromASkill(agent, skillID, tagId);
        } catch (err) {
            throw new errorwrapper.CustomError(this.removesTagsFromASkillID, err.message);
        }
    }

    /**
     * This method will deactive tag.
     * @param {*} agent
     * @param {*} tagId Tag ID
     * @param {*} [tagName=""] New tag name
     * @param {*} [notes=""] New note name
     * @param {*} [isActive=""] Active of not (true or false)
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    static async deactiveSkillTag(agent: any, tagId: any): Promise<void> {
        try {
            await inContactAPIs.updatesATag(agent, tagId, "", "", false);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deactiveSkillTag, err.message);
        }
    }

    /**
     * Authorize TMA user
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async authorizeTMAUser(agent: Agent): Promise<APIResponse> {
        try {
            let url = TestRunInfo.cluster.getURL(PageName.AUTHORIZE_TMA_USER);
            let options = new Options(url, Method.POST);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("userName", agent.email);
            options.addBody("password", agent.password);
            let response: APIResponse = await APICore.request(options);

            if (response.status == 200) {
                let jsonbody = JSON.parse(response.body);
                agent.accessToken = jsonbody.token;
                agent.baseUri = jsonbody.resource_server_base_uri;
                agent.tokenType = "bearer";
                agent.agentID = jsonbody.tenantId;
                agent.refreshToken = jsonbody.refreshToken;
                await Logger.write(FunctionType.API, `Authorized successfully!`);
            } else if (response.status == 503) {
                throw Error(`${this.createErrorMessage(options, response)} - Service Unavailable, Back - end server is at capacity`)
            } else {
                throw Error(this.createErrorMessage(options, response));
            }

            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.authorizeTMAUser, err.message);
        }
    }


    /**
     * Get TMA Token
     * @author Tan.Ta
     * @static
     * @param {Agent} agent
     * @returns {Promise<string>}
     * @memberof CustomAPIs
     */
    static async getTMAToken(agent: Agent): Promise<string> {
        try {
            let token: string = agent.accessToken;
            return token;
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTMAToken, err.message);
        }
    }

    /**
     * Create a tenant
     * @author Tan.Ta
     * @static
     * @param {string} token
     * @param {Tenant} tenant
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    static async postTenant(token: string, tenant: Tenant): Promise<APIResponse> {
        try {
            await Logger.write(FunctionType.API, `Creating a Tenant ${tenant.name}`);
            let url = TestRunInfo.cluster.getURL(PageName.POST_TENANT);
            let options = new Options(url, Method.POST);
            options.addHeader("Authorization", `Bearer ${token}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("tenantName", tenant.name);
            options.addBody("billingId", tenant.billingId);
            options.addBody("clusterId", tenant.clusterId);
            options.addBody("tenantType", tenant.tenantType);
            options.addBody("billingCycle", tenant.billingCycle);
            options.addBody("parentBillingId", "");

            let response: APIResponse = await APICore.request(options);
            return response;
        } catch (err) {
            throw new errorwrapper.CustomError(this.postTenant, err.message);
        }
    }
}
