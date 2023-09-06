import CustomAPIs from "@apis/custom-apis";
import APInstanceCore from "@apis/incontact-apis-test";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
 
/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV120002
 * Tested cluster: TC4
 */
let testCaseName: string = "Returns info on Recent Contacts";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let startDate: any;
    let endDate: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-info-on-recent-contacts/returns-info-on-recent-contacts-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = HistoricalReporting.getHistoricalReportingInstance(); 
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);           
            startDate = await Utility.getNowDate("/", -3);
            endDate = await Utility.getNowDate("/", 0);
            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "RPV120002") {
                    let res = await apiCoreClass.returnsInfoOnRecentContacts(chatAgent, startDate, endDate );
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})