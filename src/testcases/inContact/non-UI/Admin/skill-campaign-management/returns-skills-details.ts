import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
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
 * TC ID: ADV120105
 * Tested cluster: HC16
 */

let testCaseName: string = "Returns Skill details";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-skills-details/returns-skills-details-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let updatedSince = caseData.QueryParams.updatedSince;
                let mediaTypeId = caseData.QueryParams.mediaTypeId;
                let outboundStrategy = caseData.QueryParams.outboundStrategy;
                let isActive = caseData.QueryParams.isActive;
                let searchString = caseData.QueryParams.searchString;
                let fields = caseData.QueryParams.fields;
                let skip = caseData.QueryParams.skip;
                let top = caseData.QueryParams.top;
                let orderby = caseData.QueryParams.orderby;
                let res: APIResponse = await apiClass.returnsSkillsDetails(chatAgent, updatedSince, mediaTypeId, outboundStrategy, isActive, searchString, fields, skip, top, orderby);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})