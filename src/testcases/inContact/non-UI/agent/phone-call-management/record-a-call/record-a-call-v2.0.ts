import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120041
 * Tested cluster: SC10
 */

let testCaseName: string = "Record a call";

describe(`${testCaseName} - ${APIVersion.V2}`, function () {
    let agent: Agent;
    let contactId: number;
    let generalContactId: any;
    let res: APIResponse;
    let apiName: string = "record-a-call";
    let invalidString: string = "Invalid";
    let originSessionId: string;
    let originTokenId: string;

    beforeEach(async () => {
        agent = await TestCondition.registerAgent(SkillType.IB_Phone);

        // Pre-condition
        await agent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
        await CustomAPIs.setAgentState(agent, MaxState.AVAILABLE);
        await CustomAPIs.startInboundCall(agent, SkillType.IB_Phone);
        await CustomAPIs.waitForContactRouteToAgent(agent);
        contactId = await CustomAPIs.getCurrentContactId(agent, SkillCore.getSkillName(SkillType.IB_Phone));
        generalContactId = contactId;
        originSessionId = agent.sessionId;
        originTokenId = agent.accessToken;
    },TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/${apiName}/${apiName}-${APIVersion.V2}.json`);
    let apiPhoneManagement = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);

            for (let caseData of testCaseData.Data) {

                if ( testCaseData.Id == "AGV20129") {
                    let specialContactIdArray: Array<string> = Utility.injectTextWithSpecChars(contactId.toString());   
                    for ( let specialCharContactId of specialContactIdArray) {
                        res = await apiPhoneManagement.recordACall(agent, specialCharContactId);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not correct");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                    }
                } else {
                    if (testCaseData.Id == "AGV20123") {
                        if (testCaseData.Data.indexOf(caseData) == 0) {
                            agent.sessionId = caseData.PathParams.sessionId;
                        } else generalContactId = caseData.PathParams.contactId;
                    } else if (testCaseData.Id == "AGV20125") {
                        agent.accessToken = invalidString;
                    } else if (testCaseData.Id == "AGV20126") {
                        if (testCaseData.Data.indexOf(caseData) != 3) {
                            generalContactId = caseData.PathParams.contactId;
                        } else {
                            generalContactId = caseData.PathParams.contactId + contactId.toString();
                        }
                    } else if (testCaseData.Id == "AGV20127") {
                        generalContactId = contactId.toString() + invalidString;
                    } else if (testCaseData.Id == "AGV20128") {
                        if (caseData.PathParams.sessionId != "dynamicValue") {
                            agent.sessionId = caseData.PathParams.sessionId;
                        }
                        if (caseData.PathParams.contactId != "dynamicValue") {
                            generalContactId = caseData.PathParams.contactId;
                        }
                    }

                    res = await apiPhoneManagement.recordACall(agent, generalContactId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not correct");
                    if (testCaseData.Id == "AGV20124") {
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description is not correct");
                    } else if (testCaseData.Id != "AGV20124" && testCaseData.Id !="AGV20125") {
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected");
                    }
                }

                // Setup agent sessionID and token to original value
                if (testCaseData.Id == "AGV20128" && testCaseData.Id == "AGV20123") {
                    agent.sessionId = originSessionId;
                } else if (testCaseData.Id == "AGV20125") {
                    agent.accessToken = originTokenId;
                }
            }
        });
    })

    afterEach(async() => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            // Post-condition: End all contact
            await CustomAPIs.endAllContacts(agent);
        } catch (err) {}
    }, TestRunInfo.conditionTimeout);
})
