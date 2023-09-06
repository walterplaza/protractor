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

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120026
 * Tested cluster: SC3
 */

let testCaseName: string = "Unparks an Email";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let apiName: string = "unparks-an-email";
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let emailJson: string = `{"enableParking": true}`;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL,null,null,emailJson);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a email contact
                await ibEmailAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(ibEmailAgent, ibEmailAgent.phoneNumber);
                let ibMail: InboundEmail = new InboundEmail();
                let serverMail: string = cluster.getURL(PageName.SERVER_MAIL);
                await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
                await Utility.sendIBEmail(serverMail, ibMail);
                await CustomAPIs.setAgentState(ibEmailAgent, MaxState.AVAILABLE);

                // Prepare data for unparks email
                await CustomAPIs.waitForContactRouteToAgent(ibEmailAgent);
                let contactId: string = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));

                // Parks an email
                await emailApis.parksAnEmail(ibEmailAgent, contactId, ibMail.to, ibMail.from, "","",ibMail.subject,ibMail.text,"","",false,"");
                let res: APIResponse = await emailApis.unparksAnEmail(ibEmailAgent,contactId);
                expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");

                // Post-condition: End all contact
                await CustomAPIs.endAllContacts(ibEmailAgent);
            }
        });
    })
})
