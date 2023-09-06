import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120036
 * Tested cluster: HC10
 */

let testCaseName: string = "Dial agent consult";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let ibPhoneAgent: Agent;
    let agent2: Agent;
    let res: APIResponse;
    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/dial-agent-consult/dial-agent-consult-${TestRunInfo.versionAPI}.json`);
    let apiPhoneManagement = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre-condition
            ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
            agent2 = await TestCondition.setUpAgent(SkillType.OB_PHONE);

            // Start session agent 1
            await ibPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
            await CustomAPIs.setAgentState(ibPhoneAgent, MaxState.AVAILABLE);

            // Start session agent 2
            await agent2.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(agent2, agent2.phoneNumber);
            await CustomAPIs.setAgentState(agent2, MaxState.AVAILABLE);

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == "AGV20053") {

                    // Case: Path param that contains special chars                    
                    let resetSessionId: string = ibPhoneAgent.sessionId;
                    let textArr = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let i = 0; i < textArr.length; i++) {
                        ibPhoneAgent.sessionId = textArr[i];
                        res = await apiPhoneManagement.dialAgentConsult(ibPhoneAgent, agent2.email);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        ibPhoneAgent.sessionId = resetSessionId;
                    }

                } else if (testCaseData.Id == "AGV20054") {

                    // Case: Body field that contains special chars                 
                    let textArr = Utility.injectTextWithSpecChars(agent2.email);
                    for (let i = 0; i < textArr.length; i++) {
                        res = await apiPhoneManagement.dialAgentConsult(ibPhoneAgent, textArr[i]);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }

                } else {
                    if (testCaseData.Id == "AGV20052") {

                        // Case: empty Path param
                        ibPhoneAgent.sessionId = "";
                    }

                    // Run API and check Error Code and Error Description
                    if (TestRunInfo.versionAPI == APIVersion.V12) {
                        res = await apiPhoneManagement.dialAgentConsult(ibPhoneAgent, agent2.agentID);

                    } else {
                        res = await apiPhoneManagement.dialAgentConsult(ibPhoneAgent, agent2.email);
                    }

                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }

            }
        });
    });
    afterEach(async () => {

        // Post-condition: End all contacts        
        try {
            await CustomAPIs.endAllContacts(ibPhoneAgent);
            await CustomAPIs.endAllContacts(agent2);
        } catch (err) { }
    });
});
