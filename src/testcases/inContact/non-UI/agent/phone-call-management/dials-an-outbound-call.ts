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
 * TC ID: AGV120033
 * Tested cluster: HC16
 */

let testCaseName: string = "Dials an outbound call";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;    
    let skillID: any;

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/dials-an-outbound-call/dials-an-outbound-call-${TestRunInfo.versionAPI}.json`);
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
            await obPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
            skillID = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, TestRunInfo.cluster.outboundNumber, skillID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                await CustomAPIs.endAllContacts(obPhoneAgent);
            }
        });
    })
})
