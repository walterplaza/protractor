import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PageBase from "@page-objects/page-base";


/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120011
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Contact Call Quality";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-call-quality/returns-contact-call-quality-${TestRunInfo.versionAPI}.json`);
    let apiClass = HistoricalReporting.getHistoricalReportingInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);

            // Pre-condition: Start outbound call
            await obPhoneAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
            let skillID = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
            await CustomAPIs.setAgentState(obPhoneAgent, MaxState.AVAILABLE);
            await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, TestRunInfo.cluster.outboundNumber, skillID);
            let contactID = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await CustomAPIs.endContact(obPhoneAgent, contactID);

            // Need a wait for contact ended completly and generate call quality data
            await Utility.delay(5);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await apiClass.returnsContactCallQuality(obPhoneAgent, contactID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }

        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(obPhoneAgent);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})
