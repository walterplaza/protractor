import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import TestHelpers from "@test-helpers/test-helpers";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120009
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns SMS Transcripts for a contactId";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let obAgent: Agent;
    let startDate: String;
    let endDate: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-sms-transcripts-for-a-contactid/returns-sms-transcripts-for-a-contactid-${TestRunInfo.versionAPI}.json`);
    let apiClass = HistoricalReporting.getHistoricalReportingInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();
    
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            obAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
            
            // Pre-condition: Start inbound call
            await obAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(obAgent, obAgent.phoneNumber);
            let skillID = await CustomAPIs.getSkillIdFromSkillName(obAgent, SkillType.OB_PHONE);
            await phoneCallManagementAPI.dialsAnOutboundCall(obAgent, obAgent.phoneNumber, skillID);
            let contactID = await TestHelpers.getCurrentContactId(obAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await CustomAPIs.endContact(obAgent, contactID);

            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);

            for (let caseData of testCaseData.Data) {

                let res = await apiClass.returnsSmsTranscriptsForAContactId(obAgent, contactID, caseData.QueryParams.transportCode, startDate, endDate);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");

            }

        });
    })
})
