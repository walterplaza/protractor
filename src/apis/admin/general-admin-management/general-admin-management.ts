import GeneralAdminManagementVersion12 from "@apis/admin/general-admin-management/general-admin-management-v12";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import TestRunInfo from "@data-objects/general/test-run-info";
import GeneralAdminManagementVersion7 from "./general-admin-management-v7";

export interface IGeneralAdminManagement {
    returnsBrandingProfile(agent: Agent, businessUnitId: any, fields?: any);
    returnsBusinessUnitConfig(agent: Agent, fields?: any, includeTrustedBusinessUnits?: any);
    returnsCountries(agent: Agent);
    returnsStatesOrProvinces(agent: Agent, countryId: any);
    returnsDataTypes(agent: Agent);
    returnsAListOfUnprocessedFiles(agent:Agent, folderPath: any);
    marksAFileToBeProcessed(agent: Agent, fileName?: any, file?: any, overwrite?: any, needsProcessing?: any);
    marksAFileAsProcessed(agent: Agent, fileName: any, needsProcessing?: any);
    deletesAFolder(agent: Agent, folderName: any);
    returnsADirectoryListing(agent: Agent, folderName: any);
    returnsAListOfDispositions(agent: Agent, skip?: any, top?: any, searchString?: any, fields?: any, orderby?: any, isPreviewDispositions?: any, updatedSince?: any);
    deletesAFile(agent: Agent, fileName: any);
    getAFile(agent: Agent, fileName?: any);
    uploadsAFile(agent: Agent, fileName?: any, file?: any, overwrite?: any);
    movesOrRenamesAFile(agent: Agent, oldPath: any, newPath: any, overwrite?: any);
    getAllFeedbackCategoriesAndPriorities(agent: Agent);
    returnsHiringSources(agent: Agent);
    createAHiringSource(agent: Agent, sourceName: any);
    returnsHoursOfOperationProfiles(agent: Agent, fields?: any, updatedSince?: any, skip?: any, top?: any, orderBy?: any);
    returnsAnHourOfOperationProfile(agent: Agent, profileId: any, fields?: any);
    returnsLocations(agent: Agent);
    returnsAListOfMediaTypes(agent: Agent);
    returnsASingleMediaType(agent: Agent, mediaTypeID: any);
    getsAllMessageTemplates(agent: Agent);
    createsAMessageTemplate(agent: Agent, templateName: any, templateTypeID: any, body: any, isHtml?: any, ccAddress?: any, bccAddress?: any, fromName?: any, fromAddress?: any, replyToAddress?, subject?: any);
    returnsAMessageTemplate(agent: Agent, templateId: any);
    updatesAMessageTemplate(agent: Agent, templateId: any, templateName: any, body?: any, isHtml?: any, ccAddress?: any, bccAddress?: any, fromName?: any, fromAddress?: any, replyToAddress?, subject?: any);
    returnsAListOfPermissions(agent: Agent, profileId?: any);
    returnsAListOfPermissionsForAnAgent(agent: Agent, profileId?: any, agentId?: any);
    returnsSmsPhoneCodes(agent: Agent);
    returnsAListOfPointsOfContact(agent: Agent);
    returnsASinglePointOfContact(agent: Agent, pointOfContactID: any);
    returnsAllSecurityProfiles(agent: Agent);
    returnsASecurityProfile(agent: Agent, profileId: any);
    returnsAListOfScripts(agent: Agent);
    startsAScript(agent: Agent, scriptId: any, skillId: any, parameters?: any, startDate?: any);
    returnsTheServerTimeInIso8601(agent: Agent);
    returnsAListOfTags(agent: Agent, isActive?: any, searchString?: any);
    updatesATag(agent: Agent, tagId: any, tagName?: any, notes?: any, isActive?: any);
    createsATag(agent: Agent, tagName: any, notes?: any);
    returnsATag(agent: Agent, tagId: any);
    updatesATag(agent: Agent, tagId: any, tagName?: any, notes?:any, isActive?:any);
    returnsPossibleTimezones(agent: Agent);
    returnsAListOfUnavailableCodes(agent: Agent, activeOnly?: any);

}
export default class GeneralAdminManagementInstance {

    static getGeneralAdminManagementInstance(): IGeneralAdminManagement {
        if (TestRunInfo.versionAPI == APIVersion.V12) {
            return new GeneralAdminManagementVersion12();
        } else if (TestRunInfo.versionAPI == APIVersion.V7){
            return new GeneralAdminManagementVersion7();
        }
    }
}