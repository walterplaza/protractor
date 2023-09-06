import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RTV120004
 * Tested cluster: HC22, SC3
 */

let testCaseName: string = "Returns Parked Contacts";

describe(`${testCaseName} - ${APIVersion.V12}`, async function () {

    let agent: Agent;
    let ibMail: InboundEmail = new InboundEmail();
    let serverMail: string;
    let cluster: Cluster = TestRunInfo.cluster;

    beforeEach(async () => {
        agent = await TestCondition.registerAgent(SkillType.IB_EMAIL);
        serverMail = cluster.getURL(PageName.SERVER_MAIL);

        // Parks an email
        await ibMail.initData(agent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);
        await agent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(agent, agent.phoneNumber);
        await CustomAPIs.setAgentState(agent, MaxState.AVAILABLE);
        let contactId: string = await CustomAPIs.getCurrentContactId(agent, SkillCore.getSkillName(SkillType.IB_EMAIL));
        await emailAPI.parksAnEmail(agent, contactId, ibMail.to, ibMail.from, "", "", ibMail.subject, ibMail.text, "", "", false, "");
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`Real-Time-Data/Real-Time-Reporting/returns-parked-contacts/returns-parked-contacts-${APIVersion.V12}.json`);
    let emailAPI = EmailContactManagementInstance.getEmailContactManagementInstance();
    let realTimeAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`, async function () {

            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V12}`);

            for (let caseData of testCaseData.Data) {
                let res: APIResponse = await realTimeAPI.returnsParkedContacts(agent);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");
                expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await CustomAPIs.endAllContacts(agent);
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
})
