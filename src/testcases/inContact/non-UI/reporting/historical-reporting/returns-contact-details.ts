import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
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
 * TC ID: RPV120007
 * Tested cluster: SC1
 */

let testCaseName: string = "Returns Contact details";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let chatAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-contact-details/returns-contact-details-${TestRunInfo.versionAPI}.json`);
    let historicalReportingAPI = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.randomPhoneNumber());
            await CustomAPIs.startChatContact(chatAgent, SkillType.CHAT);
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);
            await CustomAPIs.waitForContactRouteToAgent(chatAgent);
            let chatContactId = await CustomAPIs.getCurrentContactId(chatAgent, SkillCore.getSkillName(SkillType.CHAT));
            await CustomAPIs.acceptContact(chatAgent, chatContactId)
            await CustomAPIs.endContact(chatAgent, chatContactId);
            let contactId: string = await CustomAPIs.getCompletedContactId(chatAgent);
            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await historicalReportingAPI.returnsContactDetails(chatAgent, contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected")
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(chatAgent)
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})

