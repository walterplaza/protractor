import AgentSessionManagementInstance from "@apis/agent/agent-session-management/agent-session-management";
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
* Tested cluster: SC3
* TC ID: AGV20181, AGV20182, AGV20183, AGV20184, AGV20185
*/

let testCaseName: string = "Joins an existing agent session";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let errorDescription: string;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.CHAT);
        await chatAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let apiClass = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/joins-an-existing-agent-session/joins-an-existing-agent-session-${TestRunInfo.versionAPI}.json`);
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV20185") {
                    let resetSChatAgentId: string = chatAgent.agentID.toString();
                    let specialChars = Utility.injectTextWithSpecChars(resetSChatAgentId);
                    for (let specialChar of specialChars) {
                        chatAgent.agentID = specialChar;
                        let returnResponse: APIResponse = await apiClass.joinsAnExistingAgentSession(chatAgent);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Cannot joins an existing agent session with body field that contains special chars");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header is not matched as expected");
                    }
                } else {
                    if (testCaseData.Id == "AGV20182" || testCaseData.Id == "AGV20183") {
                        chatAgent.agentID = caseData.BodyParams.agentId;
                    } else if (testCaseData.Id == "AGV20184") {
                        chatAgent.accessToken = chatAgent.accessToken + Utility.createRandomString(10, "lgvn_");
                    }
                    let returnResponse: APIResponse = await apiClass.joinsAnExistingAgentSession(chatAgent);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Status code is not matched as expected");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Header is not matched as expected");
                
                }
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
