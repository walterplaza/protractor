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
 * TC ID: ADV120054
 * Tested cluster: TC4
 */

let testCaseName: string = "Updates a Scheduled Callback";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {

    let obPhoneAgent: Agent;
    let callbackId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/scheduled-callbacks-management/updates-a-scheduled-callback/updates-a-scheduled-callback-${TestRunInfo.versionAPI}.json`);
    let apiClass = ScheduledCallbacksManagementInstance.getScheduledCallbacksManagementInstance();
    let agentApi = AgentManagementInstance.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            await obPhoneAgent.createPhoneNumber();

            for (let caseData of testCaseData.Data) {

                // Set up params
                let assignedSkill: number = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
                let today: string = Utility.getNowDate("/", +10);
                let note: string = "Api test";

                // Create a Scheduled Callback
                let res_create: APIResponse = await apiClass.createsAScheduledCallback(obPhoneAgent, caseData.firstName, caseData.lastName, obPhoneAgent.phoneNumber, assignedSkill, obPhoneAgent.agentID, today, note);
                callbackId = JsonUtility.getFieldValue(res_create.body, "callbackId");
            
                // Edit Scheduled Callback
                caseData.firstName = 'Test API';
                caseData.lastName = 'lgvn';
                let res_edit: APIResponse = await apiClass.updatesAScheduledCallback(obPhoneAgent, callbackId, caseData.firstName, caseData.lastName, obPhoneAgent.phoneNumber, assignedSkill, obPhoneAgent.agentID, today, note);
                expect(res_edit.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });
    afterEach(async () => {
        //Clean up
        await apiClass.deletesAScheduledCallback(obPhoneAgent, callbackId)
    }, TestRunInfo.conditionTimeout);
});
