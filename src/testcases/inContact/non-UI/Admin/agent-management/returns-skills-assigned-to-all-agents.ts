import CustomAPIs from "@apis/custom-apis";
import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
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
 * TC ID: ADV120021
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns Skills assigned to all Agents";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/returns-skills-assigned-to-all-agents/returns-skills-assigned-to-all-agents-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            for (let caseData of testCaseData.Data) {
                let updateSince = caseData.QueryParams.updateSince;
                let searchString = caseData.QueryParams.searchString;
                let fields = caseData.QueryParams.fields;
                let skip = caseData.QueryParams.skip;
                let top = caseData.QueryParams.top;
                let orderBy = caseData.QueryParams.orderBy;
                let mediaTypeId = caseData.QueryParams.mediaTypeId;
                let outboundStrategy = caseData.QueryParams.outboundStrategy;
                let isSkillActive = caseData.QueryParams.isSkillActive;
                let res: APIResponse = await apiClass.returnsSkillsAssignedToAllAgents(chatAgent);                
                expect(res.status ).toBe(caseData.Expected.statusCode ,"Status code does not match expected");
            }
        });
    })
})
