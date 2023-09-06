import IAgentManagement from "@apis/admin/agent-management/agent-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120030
 * Tested cluster: SC1
 */

let testCaseName: string = "Creates a Custom Agent Event";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obAgent: Agent;
    let eventName: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/agent-management/creates-a-custom-agent-event/creates-a-custom-agent-event-${TestRunInfo.versionAPI}.json`);
    let apiClass = IAgentManagement.getAgentManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            eventName = Utility.createRandomString(10, "lgvn_");
            obAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            await obAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obAgent, obAgent.phoneNumber);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.createsACustomAgentEvent(obAgent, eventName);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(obAgent)
                await TestCondition.setAgentSkillsToDefault(obAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
