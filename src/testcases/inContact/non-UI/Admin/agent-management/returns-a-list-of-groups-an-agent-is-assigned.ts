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
 * TC ID: ADV120022
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns a list of groups an agent is assigned";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let fields: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/returns-a-list-of-groups-an-agent-is-assigned/returns-a-list-of-groups-an-agent-is-assigned-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                fields = caseData.QueryParams.fields;
                let res: APIResponse = await apiClass.returnsAListOfGroupsAnAgentIsAssigned(chatAgent,fields);                
                expect(res.status).toBe(caseData.Expected.statusCode,"Status code does not match expected");
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
