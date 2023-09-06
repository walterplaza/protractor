import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
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
 * TC ID: AGV120037
 * Tested cluster: HC16
 */

let testCaseName: string = "Transfer call";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;
    let ibAgent: Agent;

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/transfer-call/transfer-call-${TestRunInfo.versionAPI}.json`);
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            // Pre-condition: 
            obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            await CustomAPIs.endAllContacts(obPhoneAgent);
            ibAgent = await TestCondition.registerAgent(SkillType.IB_Phone);
            await CustomAPIs.endAllContacts(ibAgent)
            await TestCondition.dialAnAgent(obPhoneAgent, ibAgent);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await phoneCallManagementAPI.transferCall(obPhoneAgent);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
            }
        });
        afterEach(async () => {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            }
            catch (error) { }
            finally {
                try {
                    await CustomAPIs.endAllContacts(obPhoneAgent);
                    await CustomAPIs.endAllContacts(ibAgent);
                }
                catch (error) { }
            }
        }, TestRunInfo.conditionTimeout);
    })
})