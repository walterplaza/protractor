import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV100001, AGV100002, AGV100003, AGV100004, AGV100005, AGV100006
 * Tested cluster: SC3
 */

let testCaseName: string = "Creates an outbound Email Contact";

describe(`${testCaseName} - ${APIVersion.V10}`, async function () {
    let emailAgent: Agent;
    let obEmailResponse: APIResponse;
    let apiName: string = "creates-an-outbound-email-contact";

    beforeEach(async () => {
        emailAgent = await TestCondition.registerAgent(SkillType.OB_EMAIL);
        await emailAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(emailAgent, emailAgent.phoneNumber);
        await CustomAPIs.setAgentState(emailAgent, MaxState.AVAILABLE);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${APIVersion.V10}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V10}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V10}`);
            for (let caseData of testCaseData.Data) {
                let skillId: any = await CustomAPIs.getSkillIdFromSkillName(emailAgent, SkillType.OB_EMAIL);

                if (testCaseData.Id == "AGV100003") {
                    let specialCharacterSessionIds: string[] = Utility.injectTextWithSpecChars(emailAgent.sessionId);
                    for (let specialCharacterSessionId of specialCharacterSessionIds) {
                        emailAgent.sessionId = specialCharacterSessionId;
                        obEmailResponse = await emailApis.createsAnOutboundEmailContact(emailAgent, skillId, caseData.BodyParams.toAddress, caseData.BodyParams.parentContactId);
                        expect(obEmailResponse.status).toBe(caseData.Expected.statusCode, "Status code doesn't match with expectation");
                        expect(obEmailResponse.header).toContain(caseData.Expected.statusDescription, "The header doesn't match with expectation");
                    }
                } else if (testCaseData.Id == "AGV100006") {

                    if (caseData.BodyParams.skillId == "specChars") {
                        // Post an out bound email with skillId contains special characters
                        let specialCharacterSkillIds: string[] = Utility.injectTextWithSpecChars(skillId.toString());
                        for (let specialCharacterSkillId of specialCharacterSkillIds) {
                            obEmailResponse = await emailApis.createsAnOutboundEmailContact(emailAgent, specialCharacterSkillId, caseData.BodyParams.toAddress, caseData.BodyParams.parentContactId);
                            expect(obEmailResponse.status).toBe(caseData.Expected.statusCode, "The status code doesn't match with expectation");
                            expect(obEmailResponse.header).toContain(caseData.Expected.statusDescription, "The header doesn't match with expectation");
                        }
                    } else if (caseData.BodyParams.toAddress == "specChars") {
                        // Post an out bound email with toAdders contains special characters
                        let specialCharacterToAddress: string[] = Utility.injectTextWithSpecChars(Utility.createRandomString(20, "lgvn"), "@");
                        for (let specialCharacterAdd of specialCharacterToAddress) {
                            obEmailResponse = await emailApis.createsAnOutboundEmailContact(emailAgent, skillId, specialCharacterAdd, caseData.BodyParams.parentContactId);
                            expect(obEmailResponse.status).toBe(caseData.Expected.statusCode, "The status code doesn't match with expectation");
                            expect(obEmailResponse.header).toContain(caseData.Expected.statusDescription, "The header doesn't match with expectation");
                        }
                    } else if (caseData.BodyParams.parentContactId == "specChars") {
                        // Post an out bound email with parentContactId contains special characters
                        let specialCharacterParentContactIds: string[] = Utility.injectTextWithSpecChars(Utility.getRandomNumber(10).toString());
                        for (let specialCharacterParentContactId of specialCharacterParentContactIds) {
                            obEmailResponse = await emailApis.createsAnOutboundEmailContact(emailAgent, skillId, caseData.BodyParams.toAddress, specialCharacterParentContactId);
                            expect(obEmailResponse.status).toBe(caseData.Expected.statusCode, "The status code doesn't match with expectation");
                            expect(obEmailResponse.header).toContain(caseData.Expected.statusDescription, "The header doesn't match with expectation");
                        }
                    }
                } else {
                    if (testCaseData.Id == "AGV100002") {
                        emailAgent.sessionId = caseData.PathParams.sessionId;
                    } else if (testCaseData.Id == "AGV100004") {
                        skillId = caseData.BodyParams.skillId;
                    } else if (testCaseData.Id == "AGV100005") {
                        skillId = skillId + "lgvn";
                    }

                    obEmailResponse = await emailApis.createsAnOutboundEmailContact(emailAgent, skillId, caseData.BodyParams.toAddress, caseData.BodyParams.parentContactId);
                    expect(obEmailResponse.status).toBe(caseData.Expected.statusCode, "The status code doesn't match with expectation");
                    expect(obEmailResponse.header).toContain(caseData.Expected.statusDescription, "The header doesn't match with expectation");
                }
            }
        });
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(emailAgent);
        } catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
