import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class APInstanceCore {

    static getInstanceAPICore(version): inContactAPIsCore {
        if (version == 1) {
            return new inContactAPIsCoreVersion1();
        } else if (version == 2) {
            return new inContactAPIsCoreVersion2();
        } else if (version == 3) {
            return new inContactAPIsCoreVersion3();
        } else if (version == 4) {
            return new inContactAPIsCoreVersion4();
        } else if (version == 5) {
            return new inContactAPIsCoreVersion5();
        } else if (version == 6) {
            return new inContactAPIsCoreVersion6();
        } else if (version == 7) {
            return new inContactAPIsCoreVersion7();
        } else if (version == 8) {
            return new inContactAPIsCoreVersion8();
        } else if (version == 9) {
            return new inContactAPIsCoreVersion9();
        } else if (version == 10) {
            return new inContactAPIsCoreVersion10();
        } else if (version == 11) {
            return new inContactAPIsCoreVersion11();
        } else if (version == 12) {
            return new inContactAPIsCoreVersion12();
        } else if (version == 13) {
            return new inContactAPIsCoreVersion13();
        } else if (version == 14) {
            return new inContactAPIsCoreVersion14();
        }
    }
}
export interface inContactAPIsCore {

    /**
     * Get Skills Summary
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} skillId
     * @param {any} startDate
     * @param {any} endDate
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    getSkillsSkillIdSummary(agent: Agent, skillId?: any, startDate?: any, endDate?: any);

    getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any);
    getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string);

    /**
     * Get agent states
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} updatedSince
     * @param {any} fields
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    getAgentsStates(agent: Agent, updatedSince?: any, fields?: any);

    getContactsActive(agent: Agent, updatedSince: string, fields: string, mediaTypeId: string, skillId: string, campaignId: string, agentId: string, teamId: string, toAddr: string, fromAddr: string, stateId: string);

    /**
     * Get parked email contact 
     * @author Nhat.Nguyen
     * @param {Agent} agent which has parked contact
     * @param {number} contactId of parked email
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    getContactsParked(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, agentId?: any, teamId?: any, toAddr?: any, fromAddr?: any);

    getContactsStates(agent: Agent, updatedSince?: string, agentId?: number);

    /**
     * Get parked email contact 
     * @author Nhat.Nguyen
     * @param {Agent} agent which has parked contact
     * @param {any} skillId
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    getSkillsSkillIdActivity(agent: Agent, skillId?: any, updatedSince?: any, fields?: any);

    getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string);

    /**
     * GET /teams/{teamId}/performance-total
     * @author Nhat.Nguyen
     * @param {Agent} agent Agent ID
     * @param {any} teamId Team ID
     * @param {any} startDate start date
     * @param {any} endDate end date
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    getTeamsTeamIdPerformanceTotal(agent: Agent, teamId?: any, startDate?: any, endDate?: any);

    /**
     * GET /teams/{teamId}/performance-total
     * @author Nhat.Nguyen
     * @param {Agent} agent 
     * @param {any} fields 
     * @param {any} startDate 
     * @param {any} endDate 
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    getTeamsPerformanceTotal(agent: Agent, startDate?: any, endDate?: any, fields?: any);

    getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number);
    postAdaptorTeams(agent: Agent, teams?: any);
    putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any);
    getAddressBooks(agent: Agent);
    postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string);
    deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number);
    postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any);
    getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string);
    putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any);
    deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string);
    getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any);
    postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any);
    putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any);
    deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number);
    getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number);
    getAdminUnavailableCodes(agent: Agent, activeOnly?: number);
    getAgentPatterns(agent: Agent);
    getAgents(agent: Agent, updateSince: any, isActive: any, searchString: string, fields: string, skip: string, top: string, orderby: string);
    postAgents(agent: Agent, agents?: any);
    getAgentsAgentId(agent: Agent, fields?: string);
    putAgentsAgentId(agent: Agent);
    getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string);
    deleteAgentsAgentIdAgentSession(agent: Agent);
    putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string);
    getAgentsAgentIdGroups(agent: Agent, fields?: string);
    getAgentsAgentIdIndicators(agent: Agent);
    getAgentsAgentIdMessages(agent: Agent);
    getAgentsAgentIdQuickReplies(agent: Agent);
    getAgentsAgentIdScheduledCallbacks(agent: Agent);
    getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any);
    getAgentsAgentIdSkills(agent: Agent);
    deleteAgentsAgentIdSkills(agent: Agent, json: string);
    postAgentsAgentIdSkills(agent: Agent, skills?: any);
    putAgentsAgentIdSkills(agent: Agent, skills?: any);
    getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any);
    postAgentsAgentIdState(agent: Agent, state: string, outStateId: number);
    getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string);
    postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any);
    postAgentsMessages(agent: Agent, agentMessages?: any);
    deleteAgentsMessagesMessageId(agent: Agent, messageId: number);
    getAgentsQuickReplies(agent: Agent);
    getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any);
    getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any);
    postApplicationsMonitor(agent: Agent, label: string, parameter?: any);
    getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string);
    getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any);
    getBusinessUnitLicenses(agent: Agent);
    getBusinessUnitToggledFeatures(agent: Agent);
    postCalleridFind(agent: Agent, prospectiveContactID: string);
    getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string);
    getCampaignsCampaignId(agent: Agent, campaignId: number);
    getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string);
    deleteContactsContactId(agent: Agent, contactId: number);
    getContactsContactIdChatTranscript(agent: Agent, contactId: number);
    getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any);
    postContactsContactIdEnd(agent: Agent, contactId: number);
    getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string);
    postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string);
    postContactsContactIdRecord(agent: Agent, contactId: number);
    getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number);
    postContactsContactIdTags(agent: Agent, contactId: number, tags?: any);
    getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string);
    getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any);
    getCountries(agent: Agent);
    getCountriesCountryIdStates(agent: Agent, countryId: string);
    deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any);
    getCustomDataDefinition(agent: Agent);
    postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any);
    getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number);
    putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any);
    getDataDefinitionsDataTypes(agent: Agent);
    getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string);
    postDispositions(agent: Agent, dispositions?: any);
    getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string);
    putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any);
    getDispositionsClassifications(agent: Agent, fields?: string);
    getDncGroups(agent: Agent, fields?: string, updatedSince?: string);
    postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string);
    getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string);
    putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string);
    getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number);
    deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number);
    postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number);
    deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any);
    getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string);
    postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any);
    getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number);
    deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number);
    postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number);
    postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string);
    postDncGroupsSearch(agent: Agent, phoneNumber: string);
    getFeedbackCategoriesAndPriorities(agent: Agent);
    getFiles(agent: Agent, fileName?: string);
    postFiles(agent: Agent, fileName: string, file: string, overwrite: boolean);
    putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any);
    deleteFiles(agent: Agent, fileName?: string);
    getFilesExternal(agent: Agent, folderPath?: string);
    postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any);
    putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any);
    deleteFolders(agent: Agent, folderName?: string);
    getFolders(agent: Agent, folderName?: string);
    getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string);
    postGroups(agent: Agent, groups?: any);
    getGroupsGroupId(agent: Agent, groupId: number, fields?: string);
    putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string);
    deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any);
    getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string);
    postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any);
    getHiringSources(agent: Agent);
    postHiringSources(agent: Agent, sourceName: string);
    getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string);
    getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string);
    postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string);
    getListsCallLists(agent: Agent);
    postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any);

    /**
     * Get parked email contact 
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} listId
     * @param {any} updatedSince
     * @param {any} finalized
     * @param {any} recordStart
     * @param {any} batchSize
     * @returns {Promise<APIResponse>}
     * @memberof CustomAPIs
     */
    getListsCallListsListId(agent: Agent, listId?: any, updatedSince?: any, finalized?: any, recordStart?: any, batchSize?: any);

    deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any);
    getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string);
    postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any);
    getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string);
    deleteListsCallListsJobsJobId(agent: Agent, jobId: number);
    getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string);
    getListsDncListsPhone(agent: Agent, phoneNumber?: string);
    getLocations(agent: Agent, includeAgents?: any);
    getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number);
    getMessageTemplates(agent: Agent, templateTypeId?: number);
    postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any);
    putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string);
    getMessageTemplatesTemplateId(agent: Agent, templateId: number);
    getPermissionsAgentId(agent: Agent, profileId?: number);
    getPhoneCodes(agent: Agent);
    getPointsOfContact(agent: Agent);
    postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string);
    deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string);
    putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string);
    getScripts(agent: Agent, mediaTypeId: string, isActive: string, searchString: string, fields: string, skip: string, top: string, orderby: string);
    postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string);
    getScriptsScriptName(agent: Agent, scriptName: string);
    getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any);
    getSecurityProfilesProfileId(agent: Agent, profileId: string);
    getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any);
    getServerTime(agent: Agent);
    getSkills(agent: Agent, searchString: string, fields: string);
    postSkills(agent: Agent, skills?: any);
    getSkillsSkillId(agent: Agent, skillId: number, fields: string);
    putSkillsSkillId(agent: Agent, skillId: number, updateJson: string);
    getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string);
    getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string);
    postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string);
    putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any);
    deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any);
    deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number);
    putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any);
    getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any);
    getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string);
    getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string);
    getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string, top: string, orderby: string, searchString: string, fields: string);
    getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string);
    putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any);
    getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any);
    putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any);
    putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any);
    getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string);
    getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any);
    putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any);
    getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number);
    putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any);
    getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any);
    putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string);
    getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number);
    postSkillsSkillIdStart(agent: Agent, skillId: number);
    postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any);
    deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any);
    getSkillsSkillIdTags(agent: Agent, skillId: number);
    postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any);
    getSkillsSkillNameDispositions(agent: Agent, skillName: string);
    getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any);
    getSkillsCallData(agent: Agent, startDate?: string, endDate?: string);
    getTags(agent: Agent, searchString?: string, isActive?: any);
    postTags(agent: Agent, tagName: string, notes: string);
    getTagsTagId(agent: Agent, tagId: number);
    putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any);
    getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string);
    postTeams(agent: Agent, teams?: any);
    getTeamsTeamId(agent: Agent, teamId: number, fields?: string);
    putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any);
    getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string);
    deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any);
    getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string);
    postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any);
    deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string);
    getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string);
    postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string);
    putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any);
    getTeamsTeamnameAddressBooks(agent: Agent, teamname: string);
    getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string);
    getTimezones(agent: Agent);
    getUnavailableCodes(agent: Agent, activeOnly: boolean);

    /**
     * Start a new session for an agent using API
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} stationPhoneNumber
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId?: any, inactivityTimeout?: any, inactivityForceLogout?: any, apiApplicationContext?: any);

    postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any);
    postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number);
    postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any);
    postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number);
    postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string);
    postAgentSessionsSessionIdDialerLogout(agent: Agent);
    postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number);
    postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string);
    getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number);
    postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string);
    postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number);
    postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string);

    /**
     * Accept contact by using API
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} contactId
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId?: any);

    postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string);
    postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string);
    postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any);
    putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string);
    postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string);
    postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any);
    postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string);
    postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string);
    postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any);
    postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string);
    postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any);
    postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string);
    postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string);
    postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number);
    postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string);
    postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string);
    postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any);
    postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number);
    getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string);
    postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string);
    postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string);
    postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number);
    postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number);
    postAgentSessionsSessionIdState(agent: Agent, state: any, reason?: any);
    postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string);
    postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any);
    postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string);

    /**
     * Delete agent session by using API
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} [forceLogoff]
     * @param {any} [endContacts]
     * @param {any} [ignorePersonalQueue]
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: any, endContacts?: any, ignorePersonalQueue?: any);

    /**
     * Join existing session for an agent using API
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    postAgentSessionsJoin(agent: Agent);

    putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any);
    putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string);
    postContactsChats(agent: Agent, pointOfContact: string);
    postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string);
    postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any);
    postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any);

    /**
     * Delete agent session by using API
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} chatSession
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    deleteContactsChatsChatSession(agent: Agent, chatSession?: any);

    getContactsChatsChatSession(agent: Agent, chatSession: string);
    postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any);
    postInteractionsWorkItems(agent: Agent, pointOfContact: string);
    getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string);
    postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string);
    postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any);
    
    /**
     * Get Agent Interaction History
     * @author Nhat.Nguyen
     * @param {Agent} agent
     * @param {any} startDate
     * @param {any} endDate
     * @param {any} updatedSince
     * @param {any} mediaTypeId
     * @param {any} fields
     * @param {any} skip
     * @param {any} top
     * @param {any} orderBy
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: any, endDate?: any, updatedSince?: any, mediaTypeId?: any, fields?: any, skip?: any, top?: any, orderBy?: any);
    
    getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string);
    getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string);
    getAgentsAgentIdStatehistory(agent: Agent);
    getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string);
    getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string);
    getContactsContactId(agent: Agent, contactId: number, fields?: string);
    getContactsContactIdCallQuality(agent: Agent, contactId: number);
    getContactsContactIdCustomData(agent: Agent, contactId: number);
    getContactsContactIdStatehistory(agent: Agent, contactId: number);
    getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string, fields: string, skip: string, top: string, orderby: string, mediaTypeId: string, skillId: string, campaignId: string, agentId: string, teamId: string, toAddr: string, fromAddr: string, isLogged: string, isRefused: string, isTakeover: string, tags: string, analyticsProcessed: string);
    getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number);
    getReportJobsJobId(agent: Agent, jobId: number, fields?: string);
    postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string);
    postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any);
    getReports(agent: Agent);
    getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number);
    getSkillsSkillIdSlaSummary(agent: Agent, skillId: any, startDate?: any, endDate?: any, listVar?: any);
    getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any);
    getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string);
    getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string);
    getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string);
    getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string);
    getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string);
    getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number);
    getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number);
    getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string);
    getExternalEmployees(agent: Agent, loginEnabledOnly?: any);
    getExternalTopics(agent: Agent);
    getFormsQmForms(agent: Agent);
    getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string);
    getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string);
    getPerformanceIndicators(agent: Agent);
    getAgentsAgentIdSynced(agent: Agent);
    getAgentsSynced(agent: Agent);
    getConfigConfigIdIEX(agent: Agent, configId: number);
    getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string);
    postAgentPerformanceByHourEntryList(agent: Agent, json: string);
    postSkillActivityEntryList(agent: Agent, json: string);
    postSkillSummary(agent: Agent, bodyJson: string);
    postUnavailableStatistics(agent: Agent, json: string);
    postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string);
}
export class inContactAPIsCoreVersion1 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getAgentsStates(agent: Agent, updatedSince: any, fields: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsStates, err.message);
        }
    }

    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessions(agent: Agent, stationPhoneNumber: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/agent-sessions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("stationPhoneNumber", stationPhoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessions, err.message);
        }
    }

    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: any, reason?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async deleteContactsChatsChatSession(agent: Agent, chatSession?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v1.0/contacts/chats/${chatSession}`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            ;
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deleteContactsChatsChatSession, err.message);
        }
    }

    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion2 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/teams/${teamId}/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdPerformanceTotal, err.message);
        }
    }

    async getTeamsPerformanceTotal(agent: Agent,startDate:any="", endDate:any=""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/teams/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsPerformanceTotal, err.message);
        }
    }

    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: any = "", inactivityTimeout: any = 45, inactivityForceLogout: any = false, apiApplicationContext: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions`, Method.POST);
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

    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/interactions/${contactId}/accept`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdInteractionsContactIdAccept, err.message);
        }
    }

    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessionsSessionIdState(agent: Agent, state: any, reason?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}/state`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("state", state);
            options.addBody("reason", reason);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsSessionIdState, err.message);
        }
    }

    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: any, endContacts?: any, ignorePersonalQueue?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/${agent.sessionId}`, Method.DELETE);
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

    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agent-sessions/join`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("asAgentId", agent.agentID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessionsJoin, err.message);
        }
    }

    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate: any= "", endDate: any= "", mediaTypeId: any= ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/agents/${agent.agentID}/interaction-history`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            options.addParam("mediaTypeId", mediaTypeId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsAgentIdInteractionHistory, err.message);
        }
    }
    
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: any, startDate: any = "", endDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v2.0/skills/${skillId}/sla-summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdSlaSummary, err.message);
        }
    }

    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion3 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getAgentsStates(agent: Agent, updatedSince: any, fields: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsStates, err.message);
        }
    }

    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getSkillsSkillIdActivity(agent: Agent, skillId?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/skills/${skillId}/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdActivity, err.message);
        }
    }

    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId?: any, startDate?: any, endDate?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/teams/${teamId}/performance-total`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTeamsTeamIdPerformanceTotal, err.message);
        }
    }


    async getTeamsPerformanceTotal(agent: Agent, fields?: any, startDate?: any, endDate?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/teams/performance-total`, Method.GET);
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

    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessions(agent: Agent, stationPhoneNumber: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v3.0/agent-sessions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("stationPhoneNumber", stationPhoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessions, err.message);
        }
    }

    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getSkillsSkillIdSummary(agent: Agent, skillId: any, startDate: any, endDate: any): Promise<APIResponse> {
        try {
            typeof (skillId)
            let options = new Options(`${agent.baseUri}services/v3.0/skills/${skillId}/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdSummary, err.message);
        }
    }

    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion4 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getAgentsStates(agent: Agent, updatedSince: any, fields: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agents/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAgentsStates, err.message);
        }
    }

    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }


    async getListsCallListsListId(agent: Agent, listId?: any, updatedSince?: any, finalized?: any, recordStart?: any, batchSize?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/lists/call-lists/${listId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("finalized", finalized);
            options.addParam("recordStart", recordStart);
            options.addParam("batchSize", batchSize);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getListsCallListsListId, err.message);
        }
    }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async postAgentSessions(agent: Agent, stationPhoneNumber: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agent-sessions`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("stationPhoneNumber", stationPhoneNumber);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.postAgentSessions, err.message);
        }
    }

    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate: any= "", endDate: any= "", updatedSince: any= "", mediaTypeId: any= "", fields: any= "", skip: any= "", top: any="", orderBy: any=""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v4.0/agents/${agent.agentID}/interaction-history`, Method.GET);
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
    
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion5 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getSkillsSkillIdActivity(agent: Agent, skillId?: any, updatedSince?: any, fields?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v5.0/skills/${skillId}/activity`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("updatedSince", updatedSince);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdActivity, err.message);
        }
    }

    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate: any= "", endDate: any= "", updatedSince: any= "", mediaTypeId: any= "", fields: any= "", skip: any= "", top: any="", orderBy: any=""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v5.0/agents/${agent.agentID}/interaction-history`, Method.GET);
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
    
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion6 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion7 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }

    async getContactsParked(agent: Agent, updatedSince?: any, fields?: any, mediaTypeId?: any, skillId?: any, campaignId?: any, agentId?: any, teamId?: any, toAddr?: any, fromAddr?: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v7.0/contacts/parked`, Method.GET);
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

    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> {
        try {
            typeof (skillId)
            let options = new Options(`${agent.baseUri}services/v3.0/skills/${skillId}/summary`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("startDate", startDate);
            options.addParam("endDate", endDate);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getSkillsSkillIdSummary, err.message);
        }
    }

    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion8 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion9 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion10 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion11 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion12 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion13 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}
export class inContactAPIsCoreVersion14 implements inContactAPIsCore {
    async getAgentsAgentIdInteractionRecent(agent: Agent, mediaTypeId?: number, fields?: string, startDate?: string, endDate?: string, top?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStates(agent: Agent, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsStates(agent: Agent, reqBUIds: string = "", updatedSince: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsActive(agent: Agent, updatedSince: string = "", fields: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", stateId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsParked(agent: Agent, updatedSince?: string, fields?: string, mediaTypeId?: string, skillId?: string, campaignId?: string, agentId?: string, teamId?: string, toAddr?: string, fromAddr?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsStates(agent: Agent, updatedSince?: string, agentId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdActivity(agent: Agent, skillId: number, updatedSince?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsActivity(agent: Agent, fields?: string, updatedSince?: string, mediaTypeId?: string, isOutbound?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdPerformanceTotal(agent: Agent, teamId: string, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsPerformanceTotal(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdaptorSecurityprofileProfileIdPermissions(agent: Agent, profileId: number, productBusNo?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAdaptorTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAdaptorTeams(agent: Agent, forceInActive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooks(agent: Agent, addressBookName: string, addressBookType: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookId(agent: Agent, addressBookId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdAssignment(agent: Agent, addressBookId: number, entityType: string, addressBookAssignments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, top?: string, skip?: string, orderby?: string, fullLoad?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdDynamicEntries(agent: Agent, addressBookId: number, fullLoad?: any, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdDynamicEntriesExternalId(agent: Agent, addressBookId: number, externalId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string, updateSince?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAddressBooksAddressBookIdEntries(agent: Agent, addressBookId: number, addressBookEntries?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAddressBooksAddressBookIdEntriesAddressBookEntryId(agent: Agent, addressBookId: number, addressBookEntryId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAdminUnavailableCodes(agent: Agent, activeOnly?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentPatterns(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgents(agent: Agent, updateSince: any = "", isActive: any = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgents(agent: Agent, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentId(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentId(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdAddressBooks(agent: Agent, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdAgentSession(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdCustomEvent(agent: Agent, eventName?: string, persistInMemory?: any, data?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdGroups(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdMessages(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdScheduledCallbacks(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkills(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsAgentIdSkills(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSkillsUnassigned(agent: Agent, mediaTypeId?: number, outboundStrategy?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdState(agent: Agent, state: string, outStateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdWfmSchedule(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsAgentIdToKillLogout(agent: Agent, agentIdToKill: number, agentId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentsMessages(agent: Agent, agentMessages?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentsMessagesMessageId(agent: Agent, messageId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsQuickReplies(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkillData(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, isOutbound?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSkills(agent: Agent, updatedSince?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderBy?: string, mediaTypeId?: number, outboundStrategy?: string, isSkillActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postApplicationsMonitor(agent: Agent, label: string, parameter?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBrandingProfiles(agent: Agent, businessUnitId?: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnit(agent: Agent, fields?: string, includeTrustedBusinessUnits?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitLicenses(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getBusinessUnitToggledFeatures(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCalleridFind(agent: Agent, prospectiveContactID: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaigns(agent: Agent, isActive?: any, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignId(agent: Agent, campaignId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCampaignsCampaignIdAddressBooks(agent: Agent, campaignId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsContactId(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdChatTranscript(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdEmailTranscript(agent: Agent, contactId: number, includeAttachments?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdFiles(agent: Agent, contactId: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdMonitor(agent: Agent, contactId: number, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdSmsTranscripts(agent: Agent, contactId: number, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsContactIdTags(agent: Agent, contactId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsSmsTranscripts(agent: Agent, transportCode?: string, startDate?: string, endDate?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactStateDescriptionsContactStateId(agent: Agent, contactStateId: number, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountries(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCountriesCountryIdStates(agent: Agent, countryId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteCustomDataDefinition(agent: Agent, customDataDefinitionIds?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinition(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postCustomDataDefinition(agent: Agent, name: string, dataType: number, defaultValue: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putCustomDataDefinitionCustomDataDefinitionId(agent: Agent, customDataDefinitionId: number, name?: string, dataType?: number, defaultValue?: string, valueRequired?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDataDefinitionsDataTypes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositions(agent: Agent, skip?: number, top?: number, searchString?: string, fields?: string, orderby?: string, isPreviewDispositions?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDispositions(agent: Agent, dispositions?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsDispositionId(agent: Agent, dispositionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDispositionsDispositionId(agent: Agent, dispositionId: number, dispositionName?: string, classificationId?: number, isPreviewDisposition?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDispositionsClassifications(agent: Agent, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroups(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroups(agent: Agent, dncGroupName: string, dncGroupDescription: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putDncGroupsGroupId(agent: Agent, groupId: number, dncGroupName?: string, dncGroupDescription?: string, isActive?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdContributingSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdContributingSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdRecords(agent: Agent, groupId: number, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdRecords(agent: Agent, groupId: number, dncGroupRecords?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getDncGroupsGroupIdScrubbedSkills(agent: Agent, groupId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsGroupIdScrubbedSkillsSkillId(agent: Agent, groupId: number, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsFind(agent: Agent, skillNo: string, contactID: string, timeDialed: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postDncGroupsSearch(agent: Agent, phoneNumber: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFiles(agent: Agent, fileName: string, file: string = "", overwrite: boolean = true): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFiles(agent: Agent, oldPath?: string, newPath?: string, overwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFiles(agent: Agent, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFilesExternal(agent: Agent, folderPath?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postFilesExternal(agent: Agent, fileName: string, file: string, overwrite?: any, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putFilesExternal(agent: Agent, fileName?: string, needsProcessing?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFolders(agent: Agent, folderName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroups(agent: Agent, top?: number, skip?: number, orderBy?: string, searchString?: string, isActive?: any, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroups(agent: Agent, groups?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupId(agent: Agent, groupId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putGroupsGroupId(agent: Agent, groupId: number, groupName?: string, isActive?: any, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getGroupsGroupIdAgents(agent: Agent, groupId: number, assigned?: any, top?: number, skip?: number, orderBy?: string, fields?: string, searchString?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postGroupsGroupIdAgents(agent: Agent, groupId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHiringSources(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postHiringSources(agent: Agent, sourceName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperation(agent: Agent, fields?: string, updatedSince?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getHoursOfOperationProfileId(agent: Agent, profileId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsContactIdSignal(agent: Agent, contactId: number, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallLists(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallLists(agent: Agent, listName: string, listExpirationDate: string, externalIdColumn: string, scoreColumn: string, customer1Column: string, customer2Column: string, callerIdColumn: string, priorityColumn: string, complianceReqColumn: string, firstNameColumn: string, lastNameColumn: string, addressColumn: string, cityColumn: string, stateColumn: string, zipColumn: string, timeZoneColumn: string, confirmReqColumn: string, agentIdColumn: string, callRequestTimeColumn: string, callRequestStaleColumn: string, notesColumn: string, expirationDateColumn: string, destinationMappings?: any, customFieldMappings?: any, overrideFinalizationColum?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListId(agent: Agent, listId: number, updatedSince?: string, finalized?: any, includeRecords?: any, fields?: string, skip?: string, top?: string, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsListId(agent: Agent, listId: number, forceInactive?: any, forceDelete?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsListIdAttempts(agent: Agent, listId: number, updatedSince?: string, finalized?: any, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postListsCallListsListIdUpload(agent: Agent, defaultTimeZone: string, listId: number, skillId: number, fileName: string, expirationDate: string, listFile: string, startSkill?: any, forceOverwrite?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobs(agent: Agent, endDate?: string, fields?: string, top?: number, skip?: number, orderBy?: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteListsCallListsJobsJobId(agent: Agent, jobId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsCallListsJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getListsDncListsPhone(agent: Agent, phoneNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getLocations(agent: Agent, includeAgents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMediaTypesMediaTypeId(agent: Agent, mediaTypeId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplates(agent: Agent, templateTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postMessageTemplates(agent: Agent, templateName: string, templateTypeId: number, body: string, ccAddress: string, bccAddress: string, replyToAddress: string, fromName: string, fromAddress: string, subject: string, isHTML?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putMessageTemplatesTemplateId(agent: Agent, templateId: number, templateName?: string, body?: string, isHTML?: any, ccAddress?: string, bccAddress?: string, replyToAddress?: string, fromName?: string, fromAddress?: string, subject?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getMessageTemplatesTemplateId(agent: Agent, templateId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPermissionsAgentId(agent: Agent, profileId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPhoneCodes(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContact(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScheduledCallbacks(agent: Agent, firstName: string, lastName: string, phoneNumber: string, skillId: number, targetAgentId: number, scheduleDate: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteScheduledCallbacksCallbackId(agent: Agent, callbackId: number, description?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putScheduledCallbacksCallbackId(agent: Agent, callbackId: number, firstName?: string, lastName?: string, phoneNumber?: string, skillId?: number, targetAgentId?: number, scheduleDate?: string, notes?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScripts(agent: Agent, mediaTypeId: string = "", isActive: string = "", searchString: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postScriptsScriptIdStart(agent: Agent, scriptId: number, skillId: number, parameters: string, startDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getScriptsScriptName(agent: Agent, scriptName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfiles(agent: Agent, isExternal?: any, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesProfileId(agent: Agent, profileId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSecurityProfilesRoleId(agent: Agent, roleId: string, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getServerTime(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkills(agent: Agent, searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkills(agent: Agent, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillId(agent: Agent, skillId: number, fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillId(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAddressBooks(agent: Agent, skillId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgents(agent: Agent, skillId: number, updatedSince?: string, searchString?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdAgents(agent: Agent, skillId: number, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgents(agent: Agent, skillId: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdAgentsAgentId(agent: Agent, skillId: number, proficiency?: number, active?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdAgentsUnassigned(agent: Agent, skillId: number, searchString?: any, fields?: any, skip?: any, top?: any, orderBy?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdCallData(agent: Agent, skillId: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositions(agent: Agent, skillId: number, searchString?: string, fields?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdDispositionsUnassigned(agent: Agent, skillId: number, skip: string = "", top: string = "", orderby: string = "", searchString: string = "", fields: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersCpaManagement(agent: Agent, skillId: number, cpaSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersDeliveryPreferences(agent: Agent, skillId: number, deliveryPreferences?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, generalSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersGeneralSettings(agent: Agent, skillId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersRetrySettings(agent: Agent, skillId: number, retrySettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersScheduleSettings(agent: Agent, skillId: number, scheduleSettings?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, fields?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putSkillsSkillIdParametersXsSettings(agent: Agent, skillId: number, updateJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdScheduledCallbacks(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStart(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdStop(agent: Agent, skillId: number, force?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdTags(agent: Agent, skillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillsSkillIdTags(agent: Agent, skillId: number, tags?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillNameDispositions(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsAgents(agent: Agent, fields?: string, updatedSince?: string, skills?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsCallData(agent: Agent, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTags(agent: Agent, searchString?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTags(agent: Agent, tagName: string, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTagsTagId(agent: Agent, tagId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTagsTagId(agent: Agent, tagId: number, tagName?: string, notes?: string, isActive?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeams(agent: Agent, fields?: string, updatedSince?: string, isActive?: any, searchString?: string, skip?: number, top?: number, orderby?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeams(agent: Agent, teams?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamId(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamId(agent: Agent, teamId: string, forceInactive?: any, team?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAddressBooks(agent: Agent, teamId: number, includeEntries?: any, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdAgents(agent: Agent, teamId: number, transferTeamId?: number, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdAgents(agent: Agent, teamId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdAgents(agent: Agent, teamId: string, agents?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, activeOnly: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postTeamsTeamIdUnavailableCodes(agent: Agent, teamId: string, outstateId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putTeamsTeamIdUnavailableCodes(agent: Agent, teamId: number, code?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsTeamnameAddressBooks(agent: Agent, teamname: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTeamsAgents(agent: Agent, fields?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getTimezones(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getUnavailableCodes(agent: Agent, activeOnly: boolean = false): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessions(agent: Agent, stationPhoneNumber: string, stationId: string = "", inactivityTimeout: number = 45, inactivityForceLogout: any = false, apiApplicationContext?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAddContact(agent: Agent, chat?: any, email?: any, workItem?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneDial(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneEnd(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneMute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdAgentPhoneUnmute(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdBarge(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdCoach(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdConsultAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdContinueReskill(agent: Agent, continueReskill?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialAgent(agent: Agent, targetAgentId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogin(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialerLogout(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialPhone(agent: Agent, phoneNumber: string, skillId: number, parentContactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdDialSkill(agent: Agent, skillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdGetNextEvent(agent: Agent, timeout: number = 10): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdCancel(agent: Agent, callbackId: number, notes: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdDial(agent: Agent, callbackId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsCallbackIdReschedule(agent: Agent, callbackId: number, rescheduleDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAccept(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAcceptConsult(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivate(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdActivateChat(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdAmdOverride(agent: Agent, contactId: number, type: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdCustomData(agent: Agent, contactId: number, indicatorName: string, data: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdDisposition(agent: Agent, contactId: number, primaryDispositionId: string, primaryDispositionNotes: string, primaryCallbackTime: string, primaryCallbackNumber: string, secondaryDispositionId: string, primaryCommitmentAmount?: any, previewDispositionId?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentSessionsSessionIdInteractionsContactIdDispositionDialer(agent: Agent, contactId: number, dispositionName?: string, dispositionNotes?: string, commitmentAmount?: string, callbackTime?: string, callbackNumber?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailForward(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, originalAttachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPark(agent: Agent, contactId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string, primaryDispositionId: string, secondaryDispositionId: string, tags: string, notes: string, originalAttachmentNames: string, draftEmailGuidStr: string, isDraft?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailPreview(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailReply(agent: Agent, contactId: number, skillId: number, toAddress: string, fromAddress: string, ccAddress: string, bccAddress: string, subject: string, bodyHtml: string, attachments: string, attachmentNames: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailRestore(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailSend(agent: Agent, contactId: number, skillId: number, toAddress: string, subject: string, bodyHtml: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEmailUnpark(agent: Agent, contactId: number, isImmediate?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdEnd(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdHold(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDial(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdIndependentDialOutcome(agent: Agent, contactId: number, outcome: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdMask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPauseVoicemail(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdPlayVoicemail(agent: Agent, contactId: number, position: number, playTimestamp?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdRecord(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdReject(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdResume(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSendChatText(agent: Agent, contactId: number, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdSnooze(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChat(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferChatToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferEmailToSkill(agent: Agent, contactId: number, targetSkillID: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToAgent(agent: Agent, contactId: number, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferVoicemailToSkill(agent: Agent, contactId: number, targetSkillId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToAgent(agent: Agent, contactId: number, targetAgentName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTransferWorkItemToSkill(agent: Agent, contactId: number, targetSkillName: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdTyping(agent: Agent, contactId: number, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsContactIdUnmask(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentSessionsSessionIdInteractionsContactIdVoicemails(agent: Agent, contactId: number, fileName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddChat(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsAddEmail(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsConferenceCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsEmailOutbound(agent: Agent, skillId: number, toAddress: string, parentContactId: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdInteractionsTransferCalls(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdMonitor(agent: Agent, targetAgentId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSendDtmf(agent: Agent, dtmfSequence: string, toneDurationMS: number, toneSpacingMS: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdState(agent: Agent, state: string, reason?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSubmitFeedback(agent: Agent, categoryId: string, priority: string, comment: string, customData: string, contactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdSupportEmail(agent: Agent, bodyHTML: string, sessionId: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsSessionIdTakeOver(agent: Agent, sessionId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteAgentSessionsSessionId(agent: Agent, forceLogoff?: boolean, endContacts?: boolean, ignorePersonalQueue?: boolean): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentSessionsJoin(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsAgentIdResetPassword(agent: Agent, requestedPassword?: string, forceChangeOnLogon?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async putAgentsChangePassword(agent: Agent, currentPassword?: string, newPassword?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChats(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionSendText(agent: Agent, chatSession: string, label: string, message: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTyping(agent: Agent, chatSession: string, label: string, isTyping?: any, isTextEntered?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsChatSessionTypingPreview(agent: Agent, chatSession: string, previewText: string, label?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async deleteContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsChatsChatSession(agent: Agent, chatSession: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postContactsChatsSendEmail(agent: Agent, fromAddress: string, emailBody?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postInteractionsWorkItems(agent: Agent, pointOfContact: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPointsOfContactPointOfContactIdChatProfile(agent: Agent, pointOfContactId: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postPromise(agent: Agent, lastName: string, phoneNumber: string, skill: string, targetAgent: string, promiseDate: string, promiseTime: string, notes: string, timeZone: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postQueuecallback(agent: Agent, callerID: string, skill: string, targetAgent: string, priorityManagement: string, sequence: string, zipTone: string, screenPopURL: string, timeout: number, callDelaySec?: any, maxPriority?: any, initialPriority?: any, acceleration?: any, screenPopSource?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdInteractionHistory(agent: Agent, startDate?: string, endDate?: string, updatedSince?: string, mediaTypeId?: string, fields?: string, skip?: number, top?: number, orderBy?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdLoginHistory(agent: Agent, startDate?: string, endDate?: string, searchString?: string, fields?: string, skip?: string, top?: string, orderby?: string, uri?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStatehistory(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdStateHistory(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: number, searchString?: string, outboundStrategy?: string, fields?: string, skip?: number, top?: number, orderby?: string, updatedSince?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsPerformance(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactId(agent: Agent, contactId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCallQuality(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdCustomData(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsContactIdStatehistory(agent: Agent, contactId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getContactsCompleted(agent: Agent, startDate: string, endDate: string, updatedSince: string = "", fields: string = "", skip: string = "", top: string = "", orderby: string = "", mediaTypeId: string = "", skillId: string = "", campaignId: string = "", agentId: string = "", teamId: string = "", toAddr: string = "", fromAddr: string = "", isLogged: string = "", isRefused: string = "", isTakeover: string = "", tags: string = "", analyticsProcessed: string = ""): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobs(agent: Agent, fields?: string, reportId?: number, jobStatus?: string, jobSpan?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReportJobsJobId(agent: Agent, jobId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsReportId(agent: Agent, reportId: number, fileType: string, includeHeaders: string, appendDate: string, deleteAfter: string, overwrite: string, startDate: string, endDate: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postReportJobsDatadownloadReportId(agent: Agent, reportId: number, fileName: string, startDate: string, endDate: string, saveAsFile?: any, includeHeaders?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getReports(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdInteractionTopHits(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string, teamId?: number, topHitsNum?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSlaSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSkillIdSummary(agent: Agent, skillId: number, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSlaSummary(agent: Agent, startDate?: string, endDate?: string, listVar?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getSkillsSummary(agent: Agent, startDate?: string, endDate?: string, mediaTypeId?: string, isOutbound?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgents(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScheduleAdherence(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataAgentsScorecards(agent: Agent, fields?: string, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsAgentPerformance(agent: Agent, startDate?: string, endDate?: string, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfmDataSkillsDialerContacts(agent: Agent, fields?: string, startDate?: string, endDate?: string, mediaTypeId?: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAscm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataAsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataCsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataFtci(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataOsi(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getWfoDataQm(agent: Agent, fields?: any, startDate?: string, endDate?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalEmployees(agent: Agent, loginEnabledOnly?: any): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getExternalTopics(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmForms(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestions(agent: Agent, qmFormId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getFormsQmFormsQmFormIdQuestionsQuestionId(agent: Agent, qmFormId: number, questionId: number, fields?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getPerformanceIndicators(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsAgentIdSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getAgentsSynced(agent: Agent): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getConfigConfigIdIEX(agent: Agent, configId: number): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async getIEXQueueData(agent: Agent, startDate?: string, endDate?: string, customerBuName?: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postAgentPerformanceByHourEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillActivityEntryList(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postSkillSummary(agent: Agent, bodyJson: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postUnavailableStatistics(agent: Agent, json: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
    async postChatSessionSendText(agent: Agent, chatSessionId: string, label: string, chatText: string): Promise<APIResponse> { throw new Error("Method not implemented."); }
}