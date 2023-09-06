import WorkItemsContactManagementInstance from "@apis/agent/workitems-contact-management/workitems-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120050
 * Tested cluster: SC3
 */

let testCaseName: string = "Reject a work item";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let workitemAgent: Agent;

    beforeEach(async () => {
        workitemAgent = await TestCondition.registerAgent(SkillType.WORK_ITEM);
        await CustomAPIs.endAllContacts(workitemAgent);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`agent/work-items-contact-management/reject-a-work-item/reject-a-work-item-${TestRunInfo.versionAPI}.json`);
    let apiClassWorkItem = WorkItemsContactManagementInstance.getWorkItemsContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await CustomAPIs.startOrJoinSession(workitemAgent, workitemAgent.randomPhoneNumber());
            await CustomAPIs.setAgentState(workitemAgent, MaxState.AVAILABLE);
            let workitemResponse: APIResponse = await CustomAPIs.startWorkItem(workitemAgent, SkillCore.getSkillPOC(SkillType.WORK_ITEM));
            let contactID: number = await CustomAPIs.getContactID(workitemResponse);
         
            for (let caseData of testCaseData.Data) {
                  if (testCaseData.Id == "AGV120050") {
                    let returnResponse: APIResponse = await apiClassWorkItem.rejectAWorkItem(workitemAgent, contactID);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
        afterEach(async () => {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await TestCondition.setAgentSkillsToDefault(workitemAgent, SkillType.WORK_ITEM);
            }
            catch (err) {
            }

        }, TestRunInfo.conditionTimeout);
    })
})


