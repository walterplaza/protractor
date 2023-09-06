import SkillCampaignManagementInstance from "@apis/admin/skill-campaign-management/skill-campaign-management";
import PersonalConnectionManagementInstance from "@apis/agent/personal-connection-management/personal-connection-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120030
 * Tested cluster: HC16
 */

let testCaseName: string = "Log out of a dialer campaign";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let skillName: any;
    let skillID: any;
    let res: APIResponse;

    let dataFullTest = Utility.readJsonAPI(`agent/personal-connection-management/log-out-of-a-dialer-campaign/log-out-of-a-dialer-campaign-${TestRunInfo.versionAPI}.json`);
    let pcManagementAPI = PersonalConnectionManagementInstance.getPersonalConnectionManagementInstance();
    let skillCampaignManagementAPI = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();

    beforeEach(async () => {

        // Pre condition:
        agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        skillID = await CustomAPIs.getSkillIdFromSkillName(agent, SkillType.PC_PHONE);
        skillName = await SkillCore.getSkillName(SkillType.PC_PHONE);
        await skillCampaignManagementAPI.assignAgentsToASkill(agent, skillID, true, 1);
        await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
        await pcManagementAPI.logIntoADialerCampaign(agent, skillName);
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            let resetSessionId: string = agent.sessionId;
            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == 'AGV20074') {

                    // Case: with Path param that contains special chars                                  
                    let sessionIdWithSpecCharsArr: string[] = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let sessionIdWithSpecChars of sessionIdWithSpecCharsArr) {
                        agent.sessionId = sessionIdWithSpecChars;
                        res = await pcManagementAPI.logOutOfADialerCampaign(agent);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else {
                    if (testCaseData.Id == 'AGV20073') {

                        // Case: with empty Path param
                        agent.sessionId = caseData.PathParams.sessionId;
                    }

                    // Run API and check Error Code and Error Description                                        
                    res = await pcManagementAPI.logOutOfADialerCampaign(agent);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
            agent.sessionId = resetSessionId;
        });

        afterEach(async () => {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            }
            catch (error) { }
            finally {
                try {
                    await CustomAPIs.endAllContacts(agent);
                    await skillCampaignManagementAPI.removeSkillAgentAssignments(agent, skillID);
                }
                catch (error) { }
            }
        }, TestRunInfo.conditionTimeout);
    })
})