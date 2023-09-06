import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxState, PageName } from "@data-objects/general/cluster";
import { InboundEmail, SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import TestHelpers from "@test-helpers/test-helpers";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120018
 * Tested cluster: SC3
 */

let testCaseName: string = "Add an Email Contact";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let apiName: string = "add-an-email-contact";
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.registerAgent(SkillType.IB_EMAIL);

            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a email contact
                await ibEmailAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(ibEmailAgent, ibEmailAgent.phoneNumber);
                await CustomAPIs.setAgentState(ibEmailAgent, MaxState.AVAILABLE);
                let ibMail: InboundEmail = new InboundEmail();
                let serverMail: string = cluster.getURL(PageName.SERVER_MAIL);
                await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
                await Utility.sendIBEmail(serverMail, ibMail);
                await CustomAPIs.waitForContactRouteToAgent(ibEmailAgent);

                let res: APIResponse = await emailApis.addAnEmailContact(ibEmailAgent, ibEmailAgent.sessionId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Post condition
            await CustomAPIs.endAllContacts(ibEmailAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})
