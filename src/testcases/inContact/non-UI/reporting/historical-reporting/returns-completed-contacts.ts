import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import CustomAPIs from "@apis/custom-apis";
import historicalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";


/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120010
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Completed Contacts";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let monitorAgent: Agent;
    let startDate: string;
    let endDate: string;
    let res: APIResponse;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        monitorAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-completed-contacts/returns-completed-contacts-${TestRunInfo.versionAPI}.json`);
    let historicalReportingAPI = historicalReporting.getHistoricalReportingInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            monitorAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            startDate = await Utility.getNowDate("/", -29);
            endDate = await Utility.getNowDate("/", +1);

            // Pre-condition: Start outbound call
            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            let skillName: string = SkillCore.getSkillName(SkillType.OB_PHONE);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);
            await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgent, monitorAgent.phoneNumber, skillName);
            await CustomAPIs.endAllContacts(monitorAgent);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV120010") {
                    res = await historicalReportingAPI.returnsCompletedContacts(monitorAgent, startDate, endDate);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.OB_PHONE);
        }
        catch (err) {
        }

    }, TestRunInfo.conditionTimeout);
})