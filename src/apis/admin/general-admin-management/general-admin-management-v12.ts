import { IGeneralAdminManagement } from "@apis/admin/general-admin-management/general-admin-management";
import { Agent } from "@data-objects/general/agent";
import { APICore, APIResponse, Method, Options } from "@utilities/general/api-core";
import { errorwrapper } from "@utilities/protractor-wrappers/error-wrapper";

export default class GeneralAdminManagementVersion12 implements IGeneralAdminManagement {

    /**
     * Return the active Branding Profile for the Business Unit specified by "businessUnitId"
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} businessUnitId
     * @param {*} [fields=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsBrandingProfile(agent: Agent, businessUnitId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/branding-profiles`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("businessUnitId", businessUnitId);
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsBrandingProfile, err.message);
        }
    }

    /**
     * Return the configuration elements of your Business Unit
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} [fields=""]
     * @param {*} [includeTrustedBusinessUnits=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsBusinessUnitConfig(agent: Agent, fields: any = "", includeTrustedBusinessUnits: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/business-unit`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("includeTrustedBusinessUnits", includeTrustedBusinessUnits);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsBusinessUnitConfig, err.message);
        }
    }

    async returnsASingleMediaType(agent: Agent, mediaTypeID: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/media-types`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("mediaTypeId", mediaTypeID);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASingleMediaType, err.message);
        }
    }

    async getsAllMessageTemplates(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/message-templates`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getsAllMessageTemplates, err.message);
        }
    }

    async createsAMessageTemplate(agent: Agent, templateName: any, templateTypeID: any, body: any, isHtml: any = true, ccAddress: any = "", bccAddress: any = "", fromName: any = "", fromAddress: any = "", replyToAddress: any = "", subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/message-templates`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("templateName", templateName);
            options.addParam("templateTypeId", templateTypeID);
            options.addParam("body", body);
            options.addParam("isHtml", isHtml);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("fromName", fromName);
            options.addBody("fromAddress", fromAddress);
            options.addBody("replyToAddress", replyToAddress);
            options.addBody("subject", subject);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createsAMessageTemplate, err.message);
        }
    }
    async returnsAListOfUnprocessedFiles(agent:Agent, folderPath: any): Promise<APIResponse> { 
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/files/external`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderPath",folderPath);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfUnprocessedFiles, err.message);
        }
    }
    async marksAFileToBeProcessed(agent: Agent, fileName, file: any ="", overwrite: any= false, needsProcessing: any= false): Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/files/external`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            options.addParam("file", file);
            options.addParam("overwrite", overwrite);
            options.addParam("needsProcessing", needsProcessing);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.marksAFileToBeProcessed, err.message);
        }
    };
    async marksAFileAsProcessed(agent: Agent, fileName: any = "", needsProcessing: any = false):Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/files/external`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            options.addParam("needsProcessing", needsProcessing);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.marksAFileAsProcessed, err.message);
        }
    };
    async deletesAFolder(agent: Agent, folderName: any =""):Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/folders`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderName", folderName);
            return await APICore.request(options);  
        }catch(err){
            throw new errorwrapper.CustomError(this.deletesAFolder, err.message);
        } 
    }
    async returnsADirectoryListing(agent: Agent, folderName: any = ""):Promise<APIResponse> { 
        try{
            let options = new Options(`${agent.baseUri}services/v12.0/folders`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("folderName", folderName);
            return await APICore.request(options);
        }catch(err){
            throw new errorwrapper.CustomError(this.returnsADirectoryListing, err.message);
        }
    }
    async returnsAMessageTemplate(agent: Agent, templateId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/message-templates/${templateId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAMessageTemplate, err.message);
        }
    }
    async updatesAMessageTemplate(agent: Agent, templateId: any, templateName: any, body: any = "", isHtml: any = "true", ccAddress: any = "", bccAddress: any = "", fromName: any = "", fromAddress: any = "", replyToAddress: any = "", subject: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/message-templates/${templateId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("templateName", templateName);
            options.addParam("body", body);
            options.addParam("isHtml", isHtml);
            options.addBody("ccAddress", ccAddress);
            options.addBody("bccAddress", bccAddress);
            options.addBody("fromName", fromName);
            options.addBody("fromAddress", fromAddress);
            options.addBody("replyToAddress", replyToAddress);
            options.addBody("subject", subject);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updatesAMessageTemplate, err.message);
        }
    }

    /**
     * Return the list of Countries
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsCountries(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/countries`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsCountries, err.message);
        }
    }

    /**
     * Return the list of States or Provinces if the Country identified by "countryId" is configured for either
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} countryId
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsStatesOrProvinces(agent: Agent, countryId: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/countries/${countryId}/states`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsStatesOrProvinces, err.message);
        }
    }

    /**
     * Return all Data Definition types for use with defining custom data definitions
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsDataTypes(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/data-definitions/data-types`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsDataTypes, err.message);
        }
    }

    async returnsAListOfPermissions(agent: Agent, profileId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/permissions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("profileId", profileId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfPermissions, err.message);
        }
    }

    async returnsAListOfPermissionsForAnAgent(agent: Agent, profileId: any = "", agentId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/permissions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("profileId", profileId);
            options.addBody("agentId", agentId);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfPermissionsForAnAgent, err.message);
        }
    }

    async returnsSmsPhoneCodes(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/phone-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsSmsPhoneCodes, err.message);
        }
    }

    /**
     * Starts a Script
     * @author Phat.Ngo
     * @param {Agent} agent
     * @param {*} [scriptId=""]
     * @param {*} [skillId=""]
     * @param {*} [parameters=""]
     * @param {*} [startDate=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async startsAScript(agent: Agent, scriptId: any = "", skillId: any = "", parameters: any = "", startDate: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/scripts/${scriptId}/start`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addBody("skillId", skillId);
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.startsAScript, error.message);
        }
    }

    async returnsAListOfDispositions(agent: Agent, skip: any = "", top: any = "", searchString: any = "", orderby: any = "", isPreviewDispositions: any = "", updatedSince: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/dispositions`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("searchString", searchString);
            options.addParam("orderby", orderby);
            options.addParam("isPreviewDispositions", isPreviewDispositions);
            options.addParam("updatedSince", updatedSince);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfDispositions, err.message);
        }
    }

    async deletesAFile(agent: Agent, fileName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/files`, Method.DELETE);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.deletesAFile, err.message);
        }
    }

    async getAFile(agent: Agent, fileName: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/files`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAFile, err.message);
        }
    }

    async uploadsAFile(agent: Agent, fileName: any = "", file: any = "", overwrite: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/files`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fileName", fileName);
            options.addParam("file", file);
            options.addParam("overwrite", overwrite);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.uploadsAFile, err.message);
        }
    }

    async movesOrRenamesAFile(agent: Agent, oldPath: any = "", newPath: any = "", overwrite: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/files`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("oldPath", oldPath);
            options.addParam("newPath", newPath);
            options.addParam("overwrite", overwrite);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.movesOrRenamesAFile, err.message);
        }
    }
    async returnsTheServerTimeInIso8601(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/server-time`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsTheServerTimeInIso8601, err.message);
        }
    }

    /**
     * Return the details of all Tags in the Business Unit.
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} [isActive=""]
     * @param {*} [searchString=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsAListOfTags(agent: Agent, isActive: any = "", searchString: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/tags`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("isActive", isActive);
            options.addParam("searchString", searchString);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfTags, err.message);
        }
    }
    async createsATag(agent: Agent, tagName: any, notes: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/tags`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("tagName", tagName);
            options.addParam("notes", notes);
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.createsATag, error.message);
        }
    }
    async returnsATag(agent: Agent, tagId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/tags/${tagId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (error) {
            throw new errorwrapper.CustomError(this.returnsATag, error.message);
        }
    }

    async createAHiringSource(agent: Agent, sourceName: any): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/hiring-sources`, Method.POST);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("sourceName", sourceName);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.createAHiringSource, err.message);
        }
    }


    async returnsAnHourOfOperationProfile(agent: Agent, profileId: any, fields: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/hours-of-operation/${profileId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAnHourOfOperationProfile, err.message);
        }
    }

    /**
     * Update the details of a Tag identified by "tagId".
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} tagId
     * @param {*} [tagName=""]
     * @param {*} [notes=""]
     * @param {*} [isActive=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async updatesATag(agent: Agent, tagId: any, tagName: any = "", notes: any = "", isActive: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/tags/${tagId}`, Method.PUT);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("tagId", tagId);
            options.addParam("tagName", tagName);
            options.addParam("notes", notes);
            options.addParam("isActive", isActive);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.updatesATag, err.message);
        }
    }
    async getAllFeedbackCategoriesAndPriorities(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/feedback-categories-and-priorities`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.getAllFeedbackCategoriesAndPriorities, err.message);
        }
    }
    async returnsHiringSources(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/hiring-sources`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsHiringSources, err.message);
        }
    }
    async returnsHoursOfOperationProfiles(agent: Agent, fields: any = "", updatedSince: any = "", skip: any = "", top: any = "", orderBy: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/locations`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("fields", fields);
            options.addParam("updatedSince", updatedSince);
            options.addParam("skip", skip);
            options.addParam("top", top);
            options.addParam("orderBy", orderBy);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsHoursOfOperationProfiles, err.message);
        }
    }
    async returnsLocations(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/locations`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsLocations, err.message);
        }
    }

    /**
     * Returns all of the unavailable codes that are configured for a business unit
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @param {*} [activeOnly=""]
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsAListOfUnavailableCodes(agent: Agent, activeOnly: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/unavailable-codes`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            options.addParam("activeOnly", activeOnly);
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfUnavailableCodes, err.message);
        }
    }

    /**
     * Return a list of possible timezones
     * @author Huy.Nguyen
     * @param {Agent} agent
     * @returns {Promise<APIResponse>}
     * @memberof GeneralAdminManagementVersion12
     */
    async returnsPossibleTimezones(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/timezones`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsPossibleTimezones, err.message);
        }
    }
    async returnsAListOfMediaTypes(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/media-types`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfMediaTypes, err.message);
        }
    }
    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    async returnsAllSecurityProfiles(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/security-profiles`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAllSecurityProfiles, err.message);
        }
    }
    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @param {number} pointOfContactID
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    async returnsASinglePointOfContact(agent: Agent, pointOfContactID: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/points-of-contact/${pointOfContactID}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASinglePointOfContact, err.message);
        }
    }
    /**
     * @static
     * @param {Agent} agent
     * @param {APIVersion} version
     * @returns {Promise<APIResponse>}
     * @memberof inContactAPIs
     */
    async returnsAListOfPointsOfContact(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/points-of-contact`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfPointsOfContact, err.message);
        }
    }
    async returnsAListOfScripts(agent: Agent): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/scripts`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsAListOfScripts, err.message);
        }
    }

    async returnsASecurityProfile(agent: Agent, profileId: any = ""): Promise<APIResponse> {
        try {
            let options = new Options(`${agent.baseUri}services/v12.0/security-profiles/${profileId}`, Method.GET);
            options.addHeader("Authorization", `${agent.tokenType} ${agent.accessToken}`);
            options.addHeader("Content-Type", "application/json; charset=utf-8");
            return await APICore.request(options);
        } catch (err) {
            throw new errorwrapper.CustomError(this.returnsASecurityProfile, err.message);
        }
    }

}
