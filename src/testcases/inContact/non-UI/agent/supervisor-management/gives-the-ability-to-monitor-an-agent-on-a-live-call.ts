
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import SupervisorManagementInstance from "@apis/agent/supervisor-management/supervisor-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120065
 * Tested cluster: TC4
 */
let testCaseName = "Gives the ability to monitor an agent on a live call";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let monitorAgent: Agent;
    let targetAgentID: Agent;
    let skillID: number;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        monitorAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        targetAgentID = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/supervisor-management/gives-the-ability-to-monitor-an-agent-on-a-live-call/gives-the-ability-to-monitor-an-agent-on-a-live-call-${TestRunInfo.versionAPI}.json`);
    let supervisorManagementAPI = SupervisorManagementInstance.getAgentSessionManagementInstance();
    let getNextAgentEventAPI = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            skillID = await CustomAPIs.getSkillIdFromSkillName(monitorAgent, SkillType.OB_PHONE);

            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);

            await targetAgentID.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgentID, targetAgentID.phoneNumber);

            await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgent, monitorAgent.phoneNumber, skillID);
            await getNextAgentEventAPI.getsTheNextAgentEventDescription(monitorAgent, 20);

            for (let caseData of testCaseData.Data) {
                let returnResponse: APIResponse = await supervisorManagementAPI.givesTheAbilityToMonitorAnAgentOnALiveCall(targetAgentID, monitorAgent);
                expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.OB_PHONE);
            await TestCondition.setAgentSkillsToDefault(targetAgentID, SkillType.IB_Phone);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);

})
