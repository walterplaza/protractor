import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType, ContactEvent } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { MaxState } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120039
 * Tested cluster: HC10
 */

let testCaseName: string = "Accept consult request";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let ibPhoneAgent: Agent;
    let agent2: Agent;
    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/accept-consult-request/accept-consult-request-${TestRunInfo.versionAPI}.json`);
    let apiPhoneManagement = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibPhoneAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
            agent2 = await TestCondition.registerAgent(SkillType.OB_PHONE);

            for (let caseData of testCaseData.Data) {

                 // Start session agent 1
                await ibPhoneAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
                await CustomAPIs.setAgentState(ibPhoneAgent, MaxState.AVAILABLE);

                // Start session agent 2
                await agent2.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(agent2, agent2.phoneNumber);
                await CustomAPIs.setAgentState(agent2, MaxState.AVAILABLE);

                // Pre-condition: Make a consult call
                await apiPhoneManagement.dialAgentConsult(ibPhoneAgent, agent2.agentID);
                let contactId = await CustomAPIs.getNextEventContactIdByAgent(ibPhoneAgent, ContactEvent.CALL);

                let res: APIResponse = await apiPhoneManagement.acceptConsultRequest(agent2, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })

    afterEach( async()=> {
        await CustomAPIs.endAllContacts(ibPhoneAgent);
        await CustomAPIs.endAllContacts(agent2);
    });
})
