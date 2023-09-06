
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
 */
let testCaseName: string = "Continue or cancel a reskill call during closed hours";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let continueReskill: string = "true";

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        chatAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let agentSessionMngAPI = AgentSessionManagementInstance.getAgentSessionManagementInstance();
    let dataFullTest = Utility.readJsonAPI(`agent/agent-session-management/continue-or-cancel-a-reskill-call-during-closed-hours/continue-or-cancel-a-reskill-call-during-closed-hours-${TestRunInfo.versionAPI}.json`);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
            let resetSessionId: string = chatAgent.sessionId;    
    
            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == 'AGV20058') {
                    
                    // Case: with Path param that contains special chars                                        
                    let sessionIdWithSpecCharsArr: string[] = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let sessionIdWithSpecChars of sessionIdWithSpecCharsArr) {
                        chatAgent.sessionId = sessionIdWithSpecChars;
                        res = await agentSessionMngAPI.continueOrCancelAReskillCallDuringClosedHours(chatAgent, continueReskill);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }                    

                } else {
                    if (testCaseData.Id == 'AGV20056') {

                        // Case: with invalid Token
                        chatAgent.accessToken = chatAgent.accessToken + "_Invalid";

                    } else if (testCaseData.Id == 'AGV20057') {

                        // Case: with empty Path param
                        chatAgent.sessionId = "";

                    } else if (testCaseData.Id == 'AGV20059') {

                        // Case: with empty Path param
                        continueReskill = caseData.BodyParams.continueReskill;
                    }

                    // Run API and check Error Code and Error Description                                        
                    res = await agentSessionMngAPI.continueOrCancelAReskillCallDuringClosedHours(chatAgent, continueReskill);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
                chatAgent.sessionId = resetSessionId;
            }
        });
    })

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(chatAgent, SkillType.CHAT);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);

})
