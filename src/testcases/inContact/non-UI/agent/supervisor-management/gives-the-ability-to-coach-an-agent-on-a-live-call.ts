
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import SupervisorManagementInstance from "@apis/agent/supervisor-management/supervisor-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120066
 * Tested cluster: TC4
 */

let testCaseName = "Gives the ability to coach an agent on a live call";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let monitorAgent: Agent;
    let targetAgent: Agent;
    let res: APIResponse;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        monitorAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        targetAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/supervisor-management/gives-the-ability-to-coach-an-agent-on-a-live-call/gives-the-ability-to-coach-an-agent-on-a-live-call-${TestRunInfo.versionAPI}.json`);
    let supervisorManagementAPI = SupervisorManagementInstance.getAgentSessionManagementInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();
    let getNextAgentEventAPI = AgentSessionManagementInstance.getAgentSessionManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);
            
            await targetAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgent, targetAgent.phoneNumber);

            if (TestRunInfo.versionAPI == APIVersion.V12) {
                let skillID: number = await CustomAPIs.getSkillIdFromSkillName(monitorAgent, SkillType.OB_PHONE);
                await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgent, monitorAgent.phoneNumber, skillID);

            } else {
                let skillName: string = SkillCore.getSkillName(SkillType.OB_PHONE);
                await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgent, monitorAgent.phoneNumber, skillName);
            }

            await getNextAgentEventAPI.getsTheNextAgentEventDescription(targetAgent, 20);
            await supervisorManagementAPI.givesTheAbilityToMonitorAnAgentOnALiveCall(targetAgent, monitorAgent);

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "AGV20050") {

                    // Case: special characters                    
                    let resetSessionId: string = targetAgent.sessionId;
                    let textArr = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let i = 0; i < textArr.length; i++) {
                        targetAgent.sessionId = textArr[i];
                        res = await supervisorManagementAPI.givesTheAbilityToCoachAnAgentOnALiveCall(targetAgent);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        targetAgent.sessionId = resetSessionId;
                    }

                } else {
                    if (testCaseData.Id == "AGV20049") {

                        // Case: empty Path param
                        targetAgent.sessionId = "";
                    }

                    // Run API and check Error Code and Error Description                   
                    res = await supervisorManagementAPI.givesTheAbilityToCoachAnAgentOnALiveCall(targetAgent);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.OB_PHONE);
            await TestCondition.setAgentSkillsToDefault(targetAgent, SkillType.IB_Phone);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
