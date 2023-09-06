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
 * TC ID: ADV120102
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns a disposition configuration";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;
    let skillId: number
    let dispositionId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-a-disposition-configuration/returns-a-disposition-configuration-${TestRunInfo.versionAPI}.json`);
    let apiClass = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE,true,null);
            skillId = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
            dispositionId = await CustomAPIs.getDispositionId(obPhoneAgent, skillId);
            for (let caseData of testCaseData.Data) {
                let fields = caseData.QueryParams.fields;
                let res: APIResponse = await apiClass.returnsADispositionConfiguration(obPhoneAgent, dispositionId, fields);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            await CustomAPIs.endAllContacts(obPhoneAgent);
            await TestCondition.setAgentSkillsToDefault(obPhoneAgent,SkillType.OB_PHONE);
        } catch (err) { }
        finally {
            try {} catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
