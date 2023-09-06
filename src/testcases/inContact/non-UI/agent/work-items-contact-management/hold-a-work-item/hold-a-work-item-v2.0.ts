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
 * TC ID: AGV120046
 * Tested cluster: SC10
 */

let testCaseName: string = "Hold a work item";

describe(`${testCaseName} - v2.0`, async function () {
    let workitemAgent: Agent;
    let returnResponse: APIResponse;
    let apiName: string = "hold-a-work-item";
    let invalidString: string = "Invalid";
    let originalSessionID: string;
    let originalTokenID: string;
    let contactID: number;
    let generalContactId: any;

    beforeEach(async () => {
        workitemAgent = await TestCondition.setUpAgent(SkillType.WORK_ITEM);

        //Pre-condition: Start a work item contact
        await CustomAPIs.startOrJoinSession(workitemAgent, workitemAgent.randomPhoneNumber());
        await CustomAPIs.setAgentState(workitemAgent, MaxState.AVAILABLE);
        let workitemResponse: APIResponse = await CustomAPIs.startWorkItem(workitemAgent, SkillCore.getSkillPOC(SkillType.WORK_ITEM));
        contactID = await CustomAPIs.getContactID(workitemResponse);
        await apiClassWorkItem.acceptAWorkItem(workitemAgent, contactID);
        generalContactId = contactID;
        originalSessionID = workitemAgent.sessionId;
        originalTokenID = workitemAgent.accessToken;
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`agent/work-items-contact-management/${apiName}/${apiName}-v2.0.json`);
    let apiClassWorkItem = WorkItemsContactManagementInstance.getWorkItemsContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV20117") {
                    let specialContactIdArray: Array<string> = Utility.injectTextWithSpecChars(contactID.toString());
                    for (let elementContactId of specialContactIdArray) {
                        returnResponse = await apiClassWorkItem.holdAWorkItem(workitemAgent, elementContactId);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code is not correct");
                        expect(returnResponse.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected");
                    }
                } else {
                    if (testCaseData.Id == "AGV20114") {
                        if (testCaseData.Data.indexOf(caseData) == 3) {
                            generalContactId = caseData.PathParams.contactId + contactID.toString();
                        } else generalContactId = caseData.PathParams.contactId;
                    } else if (testCaseData.Id == "AGV20115") {
                        generalContactId = contactID.toString() + invalidString;
                    } else if (testCaseData.Id == "AGV20116") {
                        if (testCaseData.Data.indexOf(caseData) == 0) {
                            workitemAgent.sessionId = caseData.PathParams.sessionId;
                        } else if (testCaseData.Data.indexOf(caseData) == 1) {
                            workitemAgent.sessionId = originalSessionID;
                            generalContactId = caseData.PathParams.contactId;
                        } else {
                            workitemAgent.sessionId = caseData.PathParams.sessionId;
                            generalContactId = caseData.PathParams.contactId;
                        }
                    }

                    returnResponse = await apiClassWorkItem.holdAWorkItem(workitemAgent, generalContactId);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code is not correct")
                    if (testCaseData.Id != "AGV20113") {
                        expect(returnResponse.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected");
                    } else expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Return message is not correct");
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(workitemAgent, SkillType.WORK_ITEM);
            await CustomAPIs.endAllContacts(workitemAgent);
        }
        catch (err) {}
    }, TestRunInfo.conditionTimeout);
})


