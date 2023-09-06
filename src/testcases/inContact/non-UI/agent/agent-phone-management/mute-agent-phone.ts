import AgentPhoneManagementInstance from "@apis/agent/agent-phone-management/agent-phone-management";
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
 * TC ID: AGV120002
 * Tested cluster: SC3
 */

let testCaseName: string = "Mute agent phone";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let ibPhoneAgent: Agent;
    let res: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Agent/agent-phone-management/mute-agent-phone/mute-agent-phone-${TestRunInfo.versionAPI}.json`);
    let apiClass = AgentPhoneManagementInstance.getAgentPhoneManagementInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre-condition: Start inbound call
            ibPhoneAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
            await ibPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
            await CustomAPIs.startInboundCall(ibPhoneAgent, SkillType.IB_Phone);
            await CustomAPIs.setAgentState(ibPhoneAgent, MaxState.AVAILABLE);
            await CustomAPIs.waitForContactRouteToAgent(ibPhoneAgent);
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == 'AGV20039') {
                    // Case: special characters                    
                    let resetSessionId: string = ibPhoneAgent.sessionId;
                    let textArr = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let i = 0; i < textArr.length; i++) {
                        ibPhoneAgent.sessionId = textArr[i];
                        res = await apiClass.endsTheAgentsPhoneCall(ibPhoneAgent);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        ibPhoneAgent.sessionId = resetSessionId;
                    }
                } else {
                    if (testCaseData.Id == 'AGV20037') {
                        // Case: invalid Token
                        ibPhoneAgent.accessToken = ibPhoneAgent.accessToken + "_Invalid";
                    } else if (testCaseData.Id == 'AGV20035') {
                        // Case: invalid Path param                        
                        ibPhoneAgent.sessionId = ibPhoneAgent.sessionId + "_Invalid";
                    } else if (testCaseData.Id == 'AGV20038') {
                        // Case: empty Path param
                        ibPhoneAgent.sessionId = "";
                    }
                    // Run API and check Error Code and Error Description
                    res = await apiClass.muteAgentPhone(ibPhoneAgent);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    });
    afterEach(async () => {

        // Post-condition: End all contact        
        try {
            await CustomAPIs.endAllContacts(ibPhoneAgent);
        } catch (err) { }
    });
})
