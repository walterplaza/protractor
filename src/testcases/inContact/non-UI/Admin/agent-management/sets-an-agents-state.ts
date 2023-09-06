import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import CustomAPIs from "@apis/custom-apis";
import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120020
 * Tested cluster: HC16
 */

let testCaseName: string = "Sets an Agent's State";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let agentState: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/sets-an-agents-state/sets-an-agents-state-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentManagementInstance.getAgentManagementInstance();
    let apiReporting = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            agent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            for (let caseData of testCaseData.Data) {

                // Pre-conditions: Start an agent session
                await agent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
                agentState = caseData.BodyParams.state;
                let resCurrentState = await apiReporting.returnsTheCurrentStateForAnAgent(agent);
                let currentState = JSON.parse(resCurrentState.body).agentStates[0].agentStateName;
                
                if (currentState != agentState) {
                    let res: APIResponse = await apiClass.setsAnAgentsState(agent, agentState);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    });
})
