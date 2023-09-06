import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120034
 * Tested cluster: HC16
 */

let testCaseName: string = "Dials a skill";

describe(`${testCaseName} - ${APIVersion.V2}`, function () {
    let ibPhoneAgent: Agent;
    let skillName: string;
    let res: APIResponse;
    let originalSessionId: string;

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/dials-a-skill/dials-a-skill-${APIVersion.V2}.json`);
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    beforeEach(async () => {

        // Pre condition
        ibPhoneAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
        await ibPhoneAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
        skillName = await SkillCore.getSkillName(SkillType.IB_Phone);
        originalSessionId = ibPhoneAgent.sessionId;
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);

            for (let caseData of testCaseData.Data) {
                
                if (testCaseData.Id == 'AGV20086') {

                    // Case: with Path param that contains special chars                                       
                    let sessionIdWithSpecCharsArr = Utility.injectTextWithSpecChars(originalSessionId);
                    for (let sessionIdWithSpecChars of sessionIdWithSpecCharsArr) {
                        ibPhoneAgent.sessionId = sessionIdWithSpecChars;
                        res = await phoneCallManagementAPI.dialsAnOutboundCall(ibPhoneAgent, skillName);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else if (testCaseData.Id == 'AGV20087') {

                    // Case: with Body field that contains special chars                   
                    let skillNameWithSpecCharsArr: string[] = Utility.injectTextWithSpecChars(skillName);
                    for (let skillNameWithSpecChar of skillNameWithSpecCharsArr) {
                        res = await phoneCallManagementAPI.dialsASkill(ibPhoneAgent, skillNameWithSpecChar);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else {
                    if (testCaseData.Id == 'AGV20082') {

                        // Case: with Invalid Query Data
                        if (caseData.PathParams.testData == "invalidSessionId") {

                            // Case: invalid session id
                            ibPhoneAgent.sessionId = originalSessionId + "_invalid";
                        } else if (caseData.BodyParams.testData == "invalidSkillName") {

                            // Case: invalid skill name
                            skillName = caseData.BodyParams.skillName;
                            ibPhoneAgent.sessionId = originalSessionId;
                        }
                    } else if (testCaseData.Id == 'AGV20084') {

                        // Case: with invalid Token
                        ibPhoneAgent.accessToken = ibPhoneAgent.accessToken + "_Invalid";
                    } else if (testCaseData.Id == 'AGV20085') {

                        // Case: with empty Path param
                        ibPhoneAgent.sessionId = caseData.PathParams.sessionId;
                    }

                    // Run API and check Error Code and Response Messages                                                           
                    res = await phoneCallManagementAPI.dialsASkill(ibPhoneAgent, skillName);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }                
            }
        });
        afterEach(async () => {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
                ibPhoneAgent.sessionId = originalSessionId;
                await CustomAPIs.authorize(ibPhoneAgent);
                await CustomAPIs.endAllContacts(ibPhoneAgent);
            }
            catch (error) { }            
        }, TestRunInfo.conditionTimeout);
    })
})
