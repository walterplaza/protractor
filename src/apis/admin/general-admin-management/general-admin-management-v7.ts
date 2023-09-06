import { IGeneralAdminManagement } from "@apis/admin/general-admin-management/general-admin-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class GeneralAdminManagementVersion7 implements IGeneralAdminManagement {
    returnsBrandingProfile(agent: Agent, businessUnitId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsBusinessUnitConfig(agent: Agent, fields?: any, includeTrustedBusinessUnits?: any) {
        throw new Error("Method not implemented.");
    }
    returnsCountries(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsStatesOrProvinces(agent: Agent, countryId: any) {
        throw new Error("Method not implemented.");
    }
    returnsDataTypes(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfUnprocessedFiles(agent: Agent, folderPath: any) {
        throw new Error("Method not implemented.");
    }
    marksAFileToBeProcessed(agent: Agent, fileName?: any, file?: any, overwrite?: any, needsProcessing?: any) {
        throw new Error("Method not implemented.");
    }
    marksAFileAsProcessed(agent: Agent, fileName: any, needsProcessing?: any) {
        throw new Error("Method not implemented.");
    }
    deletesAFolder(agent: Agent, folderName: any) {
        throw new Error("Method not implemented.");
    }
    returnsADirectoryListing(agent: Agent, folderName: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfDispositions(agent: Agent, skip?: any, top?: any, searchString?: any, fields?: any, orderby?: any, isPreviewDispositions?: any, updatedSince?: any) {
        throw new Error("Method not implemented.");
    }
    deletesAFile(agent: Agent, fileName: any) {
        throw new Error("Method not implemented.");
    }
    getAFile(agent: Agent, fileName?: any) {
        throw new Error("Method not implemented.");
    }
    uploadsAFile(agent: Agent, fileName?: any, file?: any, overwrite?: any) {
        throw new Error("Method not implemented.");
    }
    movesOrRenamesAFile(agent: Agent, oldPath: any, newPath: any, overwrite?: any) {
        throw new Error("Method not implemented.");
    }
    getAllFeedbackCategoriesAndPriorities(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsHiringSources(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    createAHiringSource(agent: Agent, sourceName: any) {
        throw new Error("Method not implemented.");
    }
    returnsHoursOfOperationProfiles(agent: Agent, fields?: any, updatedSince?: any, skip?: any, top?: any, orderBy?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAnHourOfOperationProfile(agent: Agent, profileId: any, fields?: any) {
        throw new Error("Method not implemented.");
    }
    returnsLocations(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfMediaTypes(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsASingleMediaType(agent: Agent, mediaTypeID: any) {
        throw new Error("Method not implemented.");
    }
    getsAllMessageTemplates(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    createsAMessageTemplate(agent: Agent, templateName: any, templateTypeID: any, body: any, isHtml?: any, ccAddress?: any, bccAddress?: any, fromName?: any, fromAddress?: any, replyToAddress?: any, subject?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAMessageTemplate(agent: Agent, templateId: any) {
        throw new Error("Method not implemented.");
    }
    updatesAMessageTemplate(agent: Agent, templateId: any, templateName: any, body?: any, isHtml?: any, ccAddress?: any, bccAddress?: any, fromName?: any, fromAddress?: any, replyToAddress?: any, subject?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfPermissions(agent: Agent, profileId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfPermissionsForAnAgent(agent: Agent, profileId?: any, agentId?: any) {
        throw new Error("Method not implemented.");
    }
    returnsSmsPhoneCodes(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfPointsOfContact(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsASinglePointOfContact(agent: Agent, pointOfContactID: any) {
        throw new Error("Method not implemented.");
    }
    returnsAllSecurityProfiles(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsASecurityProfile(agent: Agent, profileId: any) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfScripts(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    startsAScript(agent: Agent, scriptId: any, skillId: any, parameters?: any, startDate?: any) {
        throw new Error("Method not implemented.");
    }
    returnsTheServerTimeInIso8601(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfTags(agent: Agent, isActive?: any, searchString?: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * This method will update the details of a Tag identified by "tagId".
     * @param {*} agent
     * @param {*} tagId Tag ID
     * @param {*} [tagName=""] New tag name
     * @param {*} [notes=""] New note name
     * @param {*} [isActive=""] Active of not (true or false)
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion7
     */
    async updatesATag(agent: any, tagId: any, tagName: any = "", notes: any = "", isActive: any = ""): Promise<APIResponse> {
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
     * @memberof GeneralAdminManagementVersion7
     */
    async createsATag(agent: Agent, tagName: any, notes: any = ""): Promise<APIResponse> {
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

    returnsATag(agent: Agent, tagId: any) {
        throw new Error("Method not implemented.");
    }
    returnsPossibleTimezones(agent: Agent) {
        throw new Error("Method not implemented.");
    }
    returnsAListOfUnavailableCodes(agent: Agent, activeOnly?: any) {
        throw new Error("Method not implemented.");
    }
}
