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
 * TC ID: AGV120033
 * Tested cluster: HC16
 */

let testCaseName: string = "Dials an outbound call";

describe(`${testCaseName} - ${APIVersion.V2}`, function () {
    let obPhoneAgent: Agent;
    let skillName: string;
    let outboundNumber: string;
    let res: APIResponse;
    let originalSessionId: string;
    let originalNumber: any;
    let originalSkillName: string

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/dials-an-outbound-call/dials-an-outbound-call-${APIVersion.V2}.json`);
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    beforeEach(async () => {

        // Pre condition
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        await obPhoneAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
        skillName = await SkillCore.getSkillName(SkillType.OB_PHONE);
        outboundNumber = TestRunInfo.cluster.outboundNumber;
        originalNumber = TestRunInfo.cluster.outboundNumber;
        originalSessionId = obPhoneAgent.sessionId;
        originalSkillName = skillName;
    }, TestRunInfo.conditionTimeout);

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);

            for (let caseData of testCaseData.Data) {

                if (testCaseData.Id == 'AGV20080') {

                    // Case: with Path param that contains special chars                                       
                    let sessionIdWithSpecCharsArr = Utility.injectTextWithSpecChars(originalSessionId);
                    for (let sessionIdWithSpecChars of sessionIdWithSpecCharsArr) {
                        obPhoneAgent.sessionId = sessionIdWithSpecChars;
                        res = await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, outboundNumber, skillName);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                    }
                } else if (testCaseData.Id == 'AGV20081') {

                    // Case: with Body field that contains special chars    
                    if (caseData.BodyParams.phoneNumber == "specChars") {

                        // Case: with Body field included phone number that contains special chars
                        let outboundNumberWithSpecCharsArr: any[] = Utility.injectTextWithSpecChars(outboundNumber, "-");
                        for (let outboundNumberWithSpecChars of outboundNumberWithSpecCharsArr) {
                            res = await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, outboundNumberWithSpecChars, skillName);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    } else if (caseData.BodyParams.skillName == "specChars") {

                        // Case: with Body field included skill name that contains special chars
                        let skillNameWithSpecCharsArr: string[] = Utility.injectTextWithSpecChars(skillName);
                        for (let skillNameWithSpecChar of skillNameWithSpecCharsArr) {
                            res = await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, outboundNumber, skillNameWithSpecChar);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                        }
                    }

                } else {
                    if (testCaseData.Id == 'AGV20075') {

                        // Reset valid test data
                        skillName = originalSkillName;
                        outboundNumber = originalNumber;
                        obPhoneAgent.sessionId = originalSessionId;

                        // Case: with Invalid Query Data
                        if (caseData.PathParams.testData == "invalidSessionId") {

                            // Case: invalid session id
                            obPhoneAgent.sessionId = originalSessionId + "_invalid";
                        } else if (caseData.BodyParams.testData == "invalidPhoneNumber") {

                            // Case: invalid phone number
                            outboundNumber = caseData.BodyParams.phoneNumber;
                        } else if (caseData.BodyParams.testData == "invalidSkillName") {

                            // Case: invalid skill name
                            skillName = caseData.BodyParams.skillName;
                        }
                    } else if (testCaseData.Id == 'AGV20078') {

                        // Case: with invalid Token
                        obPhoneAgent.accessToken = obPhoneAgent.accessToken + "_Invalid";
                    } else if (testCaseData.Id == 'AGV20079') {

                        // Case: with empty Path param
                        obPhoneAgent.sessionId = caseData.PathParams.sessionId;
                    }

                    // Run API and check Error Code and Response Messages                                                           
                    res = await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, outboundNumber, skillName);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                }
            }
        });
        afterEach(async () => {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
                await CustomAPIs.authorize(obPhoneAgent);
                await CustomAPIs.endAllContacts(obPhoneAgent);
            }
            catch (error) { }
        }, TestRunInfo.conditionTimeout);
    })
})
