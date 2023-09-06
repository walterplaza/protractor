
import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * Tested cluster: SC3
 */
let testCaseName: string = "Dispositions a Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/dispositions-a-contact-${TestRunInfo.versionAPI}.json`);
    let agentSessionAPI = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE, true);
            let skillID: number = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
            let disPos: number = await CustomAPIs.getDispositionId(obPhoneAgent, skillID);
            await obPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
            await CustomAPIs.setAgentState(obPhoneAgent, MaxState.AVAILABLE);
            await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, obPhoneAgent.phoneNumber, skillID);
            let contactID = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await CustomAPIs.endContact(obPhoneAgent, contactID);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await agentSessionAPI.dispositionsAContact(obPhoneAgent, contactID, disPos);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(obPhoneAgent);
            await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.CHAT);
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
})