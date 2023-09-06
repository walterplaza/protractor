import CustomAPIs from "@apis/custom-apis";
import WorkItemAPI from "@apis/patron/workitem-api/workitem-api";
import { Agent } from "@data-objects/general/agent";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120011
 * Tested cluster: SC3
 */

let testCaseName: string = "Create a new work item";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let workitemAgent: Agent;

    beforeEach(async () => {
        workitemAgent = await TestCondition.registerAgent(SkillType.WORK_ITEM);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`patron/work-item-API/create-a-new-work-item/create-a-new-work-item-${TestRunInfo.versionAPI}.json`);
    let apiClassWorkItem = WorkItemAPI.getWorkItemAPIInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await CustomAPIs.startOrJoinSession(workitemAgent, workitemAgent.randomPhoneNumber());
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "PTV120011") {
                    let workitemResponse: APIResponse = await apiClassWorkItem.createANewWorkItem(workitemAgent, SkillCore.getSkillPOC(SkillType.WORK_ITEM));
                    expect(workitemResponse.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
                    expect(workitemResponse.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected")
                }
            }
        });
        afterEach(async () => {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            try {
                await CustomAPIs.endAllContacts(workitemAgent);
            }
            catch (err) {
            }

        }, TestRunInfo.conditionTimeout);
    })
})


