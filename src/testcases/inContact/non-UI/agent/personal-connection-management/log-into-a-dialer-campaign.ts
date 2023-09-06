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
 * TC ID: AGV120029
 * Tested cluster: HC16
 */

let testCaseName: string = "Log into a dialer campaign";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let agent: Agent;
    let res: APIResponse;
    let skillName: any;
    let skillID: any;

    let dataFullTest = Utility.readJsonAPI(`agent/personal-connection-management/log-into-a-dialer-campaign/log-into-a-dialer-campaign-${TestRunInfo.versionAPI}.json`);
    let pcManagementAPI = PersonalConnectionManagementInstance.getPersonalConnectionManagementInstance();
    let skillCampaignManagementAPI = SkillCampaignManagementInstance.getSkillCampaignManagementInstance();
    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {

            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            agent = await TestCondition.setUpAgent(SkillType.IB_Phone);
            skillID = await CustomAPIs.getSkillIdFromSkillName(agent, SkillType.PC_PHONE);
            skillName = await SkillCore.getSkillName(SkillType.PC_PHONE);
            await skillCampaignManagementAPI.assignAgentsToASkill(agent, skillID, true, 1);
            await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == 'AGV20068') {

                    // Case: with Path param that contains special chars                    
                    let resetSessionId: string = agent.sessionId;
                    let sessionIdArr: string[] = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let i = 0; i < sessionIdArr.length; i++) {
                        agent.sessionId = sessionIdArr[i];
                        res = await pcManagementAPI.logIntoADialerCampaign(agent, skillName);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                    agent.sessionId = resetSessionId;

                } else if (testCaseData.Id == 'AGV20069') {

                    // Case: with Body field that contains special chars                    
                    let skillNameArr: string[] = Utility.injectTextWithSpecChars(skillName);
                    for (let i = 0; i < skillNameArr.length; i++) {
                        res = await pcManagementAPI.logIntoADialerCampaign(agent, skillNameArr[i])
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }

                } else {
                    if (testCaseData.Id == 'AGV20064') {

                        // Case: with Invalid Query Data
                        agent.sessionId = agent.sessionId + "_Invalid"

                    } else if (testCaseData.Id == 'AGV20066') {

                        // Case: with invalid Token
                        agent.accessToken = agent.accessToken + "_Invalid";

                    } else if (testCaseData.Id == 'AGV20067') {

                        // Case: with empty Path param
                        agent.sessionId = "";

                    } else if (testCaseData.Id == 'AGV20070' || testCaseData.Id == 'AGV20071') {

                        // Case: without or empty required Body field
                        skillName = caseData.BodyParams.skillName;
                    }

                    // Run API and check Error Code and Error Description                                        
                    res = await pcManagementAPI.logIntoADialerCampaign(agent, skillName);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
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