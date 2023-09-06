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
 * TC ID: RTV70034, RVT70035, RVT70036, RVT70037, RVT70038, RVT70039, RVT70040
 * Tested cluster: SC10
 */

let testCaseName: string = "Returns Parked Contacts";

describe(`${testCaseName} - ${APIVersion.V7}`, async function () {

    let agent: Agent;
    let updatedSince: any;
    let fields: any;
    let mediaTypeId: any;
    let skillId: any;
    let campaignId: any;
    let agentId: any;
    let teamId: any;
    let toAddr: any;
    let fromAddr: any;
    let res: APIResponse;
    let ibMail: InboundEmail = new InboundEmail();
    let serverMail: string;
    let cluster: Cluster = TestRunInfo.cluster;
    let defaultToken: string;

    beforeEach(async () => {
        agent = await TestCondition.registerAgent(SkillType.IB_EMAIL);
        serverMail = cluster.getURL(PageName.SERVER_MAIL);
        defaultToken = agent.accessToken;

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
    let dataFullTest = Utility.readJsonAPI(`Real-Time-Data/Real-Time-Reporting/returns-parked-contacts/returns-parked-contacts-${APIVersion.V7}.json`);
    let emailAPI = EmailContactManagementInstance.getEmailContactManagementInstance();
    let realTimeAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {

        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V7}`, async function () {

            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V7}`);

            for (let caseData of testCaseData.Data) {

                // Initial test data for params
                updatedSince = caseData.QueryParams.updatedSince;
                fields = caseData.QueryParams.fields;
                mediaTypeId = caseData.QueryParams.mediaTypeId;
                skillId = caseData.QueryParams.skillId;
                campaignId = caseData.QueryParams.campaignId;
                agentId = caseData.QueryParams.agentId;
                teamId = caseData.QueryParams.teamId;
                toAddr = caseData.QueryParams.toAddr;
                fromAddr = caseData.QueryParams.fromAddr;

                if (testCaseData.Id == "RTV70040") {

                    // Query param that contains special chars
                    if (updatedSince != "") {
                        let specCharArray: string[] = Utility.injectTextWithSpecChars(await Utility.getNowDate("/", -7), ".-");
                        for (let updatedSince of specCharArray) {
                            res = await realTimeAPI.returnsParkedContacts(agent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not matched as expected");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Description is not matched as expected");
                        }
                    } if (mediaTypeId != "") {
                        let specCharArray: string[] = Utility.injectTextWithSpecChars("4", ".-");
                        for (let mediaTypeId of specCharArray) {
                            res = await realTimeAPI.returnsParkedContacts(agent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not matched as expected");
                            expect(res.header).toBe(`Invalid filter parameter mediaTypeId - '${mediaTypeId}', must be an integer`, "Description is not matched as expected");
                        }
                    }

                } else {
                    if (testCaseData.Id == "RTV70036") {

                        // Invalid Token
                        agent.accessToken = "Invalid";
                    }

                    res = await realTimeAPI.returnsParkedContacts(agent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not matched as expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Description is not matched as expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            agent.accessToken = defaultToken;
            await CustomAPIs.endAllContacts(agent);
        }
        catch (err) { }
    }, TestRunInfo.conditionTimeout);
})