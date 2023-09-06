import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import ScheduledCallbacksManagementInstance from "@apis/admin/scheduled-callbacks-management/scheduled-callbacks-management";
import AgentScheduledCallbacksManagementInstance from "@apis/agent/scheduled-callbacks-management/scheduled-callbacks-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: AGV120051
 * Tested cluster: TC4
 */

let testCaseName: string = "Dial a Scheduled Callback";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let currentDate = new Date();
    let obPhoneAgent: Agent;
    let waitTime: number = 30;
    let note: string = "Api test";
    let callbackId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/scheduled-callbacks-management/dial-a-scheduled-callback/dial-a-scheduled-callback-${TestRunInfo.versionAPI}.json`);
    let adminApiClass = ScheduledCallbacksManagementInstance.getScheduledCallbacksManagementInstance();
    let agentApi = AgentManagementInstance.getAgentManagementInstance();
    let agentScheduleApiClass = AgentScheduledCallbacksManagementInstance.getAgentScheduledCallbacksManagementInstance();

    beforeEach(async () => {
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await obPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.randomPhoneNumber());
            await CustomAPIs.setAgentState(obPhoneAgent, MaxState.AVAILABLE);

            // Create a schedule call back
            let assignedSkill = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
            let today = new Date();
            let scheduleTime = new Date(today.setMinutes(today.getMinutes()+1));
            let scheduleFormatDate : string = Utility.formatDateTime(scheduleTime.toString(),"ddd MMM DD YYYY hh:mm:ss","MM/DD/YYYY hh:mm a");
            await adminApiClass.createsAScheduledCallback(obPhoneAgent, obPhoneAgent.firstName, obPhoneAgent.lastName, obPhoneAgent.phoneNumber, assignedSkill, obPhoneAgent.agentID, scheduleFormatDate, note);            await Logger.write(FunctionType.NONE, "wait for schedule available in "+waitTime+" seconds");
            callbackId = await CustomAPIs.waitForNextEventActive(obPhoneAgent, 120);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV120051") {
                    let returnResponse: APIResponse = await agentScheduleApiClass.dialAScheduledCallback(obPhoneAgent, callbackId);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Failed by question no 18:  MAX cannot receive callback schedule");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
    });
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(obPhoneAgent);
            await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
});
