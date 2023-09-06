import ScheduledCallbacksManagementInstance from "@apis/admin/scheduled-callbacks-management/scheduled-callbacks-management";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120055
 * Tested cluster: TC4
 */

let testCaseName: string = "Returns Scheduled Callbacks for a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let skillID: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/scheduled-callbacks-management/returns-scheduled-callbacks-for-a-skill/returns-scheduled-callbacks-for-a-skill-${TestRunInfo.versionAPI}.json`);

    let apiClass = ScheduledCallbacksManagementInstance.getScheduledCallbacksManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            
            // Get skillID by skillName
            skillID = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsScheduledCallbacksForASkill(chatAgent, skillID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
