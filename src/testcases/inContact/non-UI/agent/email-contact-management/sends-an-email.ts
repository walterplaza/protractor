import EmailContactManagementInstance from "@apis/agent/email-contact-management/email-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillCore, SkillType, OutBoundEmail } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import inContactAPIs from "@apis/incontact-apis";
import TestHelpers from "@test-helpers/test-helpers";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120022
 * Tested cluster: SC3
 */

let testCaseName: string = "Sends an Email";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let apiName: string = "sends-an-email";
    let ibEmailAgent: Agent;
    let emailObInfo = new OutBoundEmail().initData();
    let apiRes: APIResponse;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);
            emailObInfo.skillId = await TestHelpers.getSkillIdFromSkillName(ibEmailAgent, SkillType.OB_EMAIL);

            // Start a email contact
            await ibEmailAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(ibEmailAgent, ibEmailAgent.phoneNumber);
            apiRes = await inContactAPIs.postAgentSessionsSessionIdInteractionsEmailOutbound(ibEmailAgent, APIVersion.V12, emailObInfo.skillId, emailObInfo.toAddress);
            // Get contactId
            // await CustomAPIs.setAgentState(ibEmailAgent, MaxState.AVAILABLE);
            await CustomAPIs.waitForContactRouteToAgent(ibEmailAgent);
            let contactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

            // Send a ib email contact
            for (let caseData of testCaseData.Data) {
            let res: APIResponse = await emailApis.sendsAnEmail(ibEmailAgent, contactId, emailObInfo.skillId, caseData.QueryParams.toAddress, caseData.QueryParams.subject);
            expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");
            }
        });
    });
    
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(ibEmailAgent);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
