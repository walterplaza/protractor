import IAgentManagement from "@apis/admin/agent-management/agent-management";
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
 * TC ID: ADV120028
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns summary of all agent's contacts by skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let startDate: string = Utility.addDateToCurrentDate(-20);
    let endDate: string = Utility.addDateToCurrentDate(-1);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/returns-summary-of-all-agents-contacts-by-skill/returns-summary-of-all-agents-contacts-by-skill-${TestRunInfo.versionAPI}.json`);
    let apiClass = IAgentManagement.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsSummaryOfAllAgentsContactsBySkill(chatAgent,startDate,endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
})
