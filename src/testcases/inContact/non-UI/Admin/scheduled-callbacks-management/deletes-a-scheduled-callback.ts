import AgentManagementInstance from "@apis/admin/agent-management/agent-management";
import ScheduledCallbacksManagementInstance from "@apis/admin/scheduled-callbacks-management/scheduled-callbacks-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120053
 * Tested cluster: TC4
 */

let testCaseName: string = "Deletes a Scheduled Callback";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {

    let obPhoneAgent: Agent;
    let callbackId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/scheduled-callbacks-management/deletes-a-scheduled-callback/deletes-a-scheduled-callback-${TestRunInfo.versionAPI}.json`);

    let apiClass = ScheduledCallbacksManagementInstance.getScheduledCallbacksManagementInstance();
    let agentApi = AgentManagementInstance.getAgentManagementInstance();

    beforeEach(async () => {
        obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
        await obPhoneAgent.createPhoneNumber();

        // Create a schedule call back for delete
        let assignedSkill = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
        let today: string = Utility.getNowDate("/", +10);
        let note: string = "Api test";
        let res: APIResponse = await apiClass.createsAScheduledCallback(obPhoneAgent, obPhoneAgent.firstName, obPhoneAgent.lastName, obPhoneAgent.phoneNumber, assignedSkill, obPhoneAgent.agentID, today, note);
        callbackId = JsonUtility.getFieldValue(res.body, "callbackId");
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.deletesAScheduledCallback(obPhoneAgent, callbackId)
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
});
