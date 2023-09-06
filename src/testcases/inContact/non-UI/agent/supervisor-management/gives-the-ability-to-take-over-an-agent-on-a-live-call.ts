
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import SupervisorManagementInstance from "@apis/agent/supervisor-management/supervisor-management";
import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120068
 * Tested cluster: TC4
 */
let testCaseName = "Gives the ability to take over an agent on a live call";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let monitorAgentID: Agent;
    let targetAgentID: Agent;
    let startDate: string;
    let endDate: String;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        monitorAgentID = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        targetAgentID = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/supervisor-management/gives-the-ability-to-take-over-an-agent-on-a-live-call/gives-the-ability-to-take-over-an-agent-on-a-live-call-${TestRunInfo.versionAPI}.json`);
    let supervisorManagementAPI = SupervisorManagementInstance.getAgentSessionManagementInstance();
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            let skillID = await CustomAPIs.getSkillIdFromSkillName(monitorAgentID, SkillType.OB_PHONE);

            await monitorAgentID.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgentID, monitorAgentID.phoneNumber);
            await targetAgentID.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(targetAgentID, targetAgentID.phoneNumber);
            await CustomAPIs.setAgentState(monitorAgentID, MaxState.AVAILABLE);
            await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgentID, monitorAgentID.phoneNumber, skillID);
            await supervisorManagementAPI.givesTheAbilityToMonitorAnAgentOnALiveCall(targetAgentID, monitorAgentID);
            await apiCoreClass.returnsStateDurationForAnAgent(targetAgentID, startDate, endDate);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV120068") {
                    let returnResponse: APIResponse = await supervisorManagementAPI.givesTheAbilityToTakeOverAnAgentOnALiveCall(targetAgentID);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(monitorAgentID, SkillType.OB_PHONE);
            await TestCondition.setAgentSkillsToDefault(targetAgentID, SkillType.IB_Phone);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
