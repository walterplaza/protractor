import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import GeneralContactManagementInstance from "@apis/admin/general-contact-management/general-contact-management";
import TestHelpers from "@test-helpers/test-helpers";
import CustomAPIs from "@apis/custom-apis";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import inContactAPIs from "@apis/incontact-apis";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120136
 * Tested cluster: HC16
 */

let testCaseName: string = "Create a Signal for a Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let contactId;

    beforeEach( async () => {
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        
        // Make inbound call and get current id
        await agent.createPhoneNumber();
        await TestHelpers.startOrJoinSession(agent, agent.phoneNumber);
        await TestHelpers.startInboundCall(agent);
        await CustomAPIs.setAgentState(agent, MaxState.AVAILABLE);
        await CustomAPIs.waitForContactRouteToAgent(agent);
        contactId = await TestHelpers.getCurrentContactId(agent, SkillCore.getSkillName(SkillType.IB_Phone));
    },TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/general-contact-management/create-a-signal-for-a-contact/create-a-signal-for-a-contact-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralContactManagementInstance.getGeneralContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            for (let caseData of testCaseData.Data) {

                let res: APIResponse = await apiClass.createASignalForAContact(agent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    });

    afterEach(async ()=> {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(agent, SkillType.IB_Phone);
            } catch (err) { }
        }
    },TestRunInfo.conditionTimeout);
})
