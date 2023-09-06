import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import TestHelpers from "@test-helpers/test-helpers";
import { MaxState } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120013
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Contact Custom Data";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-custom-data/returns-contact-custom-data-${TestRunInfo.versionAPI}.json`);
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
            await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, obPhoneAgent.phoneNumber, skillID);
            let contactID = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await CustomAPIs.endContact(obPhoneAgent, contactID);
                      
            //Need a small wait to end call completely
            await Utility.delay(3);

            for (let caseData of testCaseData.Data) {
                let res = await apiClass.returnsContactCustomData(obPhoneAgent, contactID);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }
            
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post condition
            await CustomAPIs.endAllContacts(obPhoneAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
