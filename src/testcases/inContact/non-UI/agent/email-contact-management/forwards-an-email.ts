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
 * TC ID: AGV120020, AGV40033, AGV40034, AGV40035, AGV40036, AGV40037, AGV40038, AGV40039, AGV40040, AGV70019, AGV70020, AGV70021, AGV70022, AGV70023, AGV70024, AGV70025, AGV70026
 * Tested cluster: HC10
 * Failed by IC-83498: [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API "PUT v13.0 /skills/{skillId}" 
 */

let testCaseName: string = "Forwards an Email";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let apiName: string = "forwards-an-email";
    let cluster: Cluster = TestRunInfo.cluster;
    let ibEmailAgent: Agent;
    let obEmailAgent: Agent;
    let skillId: string;
    let contactId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`agent/email-contact-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let emailApis = EmailContactManagementInstance.getEmailContactManagementInstance();

    beforeEach(async() => {
        ibEmailAgent = await TestCondition.setUpAgent(SkillType.IB_EMAIL);
        obEmailAgent = await TestCondition.setUpAgent(SkillType.OB_EMAIL);
        await TestCondition.setUpAndAssignSkill(obEmailAgent, SkillType.IB_EMAIL);
        skillId = String(await CustomAPIs.getSkillIdFromSkillName(obEmailAgent, SkillType.IB_EMAIL));

        //Pre-condition: Start a email contact
        await ibEmailAgent.createPhoneNumber();
        await CustomAPIs.startOrJoinSession(ibEmailAgent, ibEmailAgent.phoneNumber);
        await CustomAPIs.setAgentState(ibEmailAgent, MaxState.AVAILABLE);
        let ibMail: InboundEmail = new InboundEmail();
        let serverMail: string = cluster.getURL(PageName.SERVER_MAIL);
        await ibMail.initData(ibEmailAgent, SkillType.IB_EMAIL);
        await Utility.sendIBEmail(serverMail, ibMail);

        // Prepare data for forward email
        await CustomAPIs.waitForContactRouteToAgent(ibEmailAgent);
        contactId = await CustomAPIs.getCurrentContactId(ibEmailAgent, SkillCore.getSkillName(SkillType.IB_EMAIL));
    });

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            
            for (let caseData of testCaseData.Data) {

                // Path params that contain special chars
                if (caseData.PathParams.contactId == 'specChars') {
                    let arrContactIdWithSpecialChar: Array<string> = Utility.injectTextWithSpecChars(contactId.toString());
                    for (let contactID of arrContactIdWithSpecialChar) {
                        let res: APIResponse = await emailApis.forwardsAnEmail(ibEmailAgent, contactID, skillId, caseData.QueryParams.toAddress, caseData.QueryParams.subject);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }

                // Query param that contains special chars
                else if (caseData.QueryParams.skillId == 'specChars') {
                    let arrSkillIDWithSpecialChar: Array<string> = Utility.injectTextWithSpecChars(skillId.toString());
                    for (let skillID of arrSkillIDWithSpecialChar) {
                        let res: APIResponse = await emailApis.forwardsAnEmail(ibEmailAgent, contactId, skillID, caseData.QueryParams.toAddress, caseData.QueryParams.subject);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }   
                }

                else {

                    // contactId Path param is invalid Number type
                    if (testCaseData.Id == 'AGV40034' || testCaseData.Id == 'AGV70020') {
                        if(caseData.PathParams.contactId == '-') {
                            contactId = caseData.PathParams.contactId + contactId;
                        }
                        else {
                            contactId = caseData.PathParams.contactId;
                        }
                    }

                    // numeric contactId Path param that contains alphabet chars
                    else if (testCaseData.Id == 'AGV40035' || testCaseData.Id == 'AGV70021') {
                        contactId = Utility.createRandomString(10);
                    }

                    // empty Path params
                    else if (testCaseData.Id == 'AGV40036' || testCaseData.Id == 'AGV70022') {
                        ibEmailAgent.sessionId = caseData.PathParams.sessionId;
                        contactId = caseData.PathParams.contactId;
                    }

                    // Query param is invalid Number type
                    else if (testCaseData.Id == 'AGV40038' || testCaseData.Id == 'AGV70024') {
                        if(caseData.QueryParams.skillId == '-') {
                            skillId = caseData.QueryParams.skillId + skillId;
                        }
                        else {
                            skillId = caseData.QueryParams.skillId;
                        }
                    }

                    // numeric Query param that contains alphabet chars
                    else if (testCaseData.Id == 'AGV40039' || testCaseData.Id == 'AGV70025') {
                        skillId = Utility.createRandomString(10);
                    }

                    let res: APIResponse = await emailApis.forwardsAnEmail(ibEmailAgent, contactId, skillId, caseData.QueryParams.toAddress, caseData.QueryParams.subject);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-83498 - [TestAutomation][inC-API] Email From-Address field in Skill detail page is empty when calling API PUT v13.0 /skills/{skillId}");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })

    afterEach(async() => {
        // Post-condition: End all contact
        await CustomAPIs.endAllContacts(ibEmailAgent);
        await CustomAPIs.endAllContacts(obEmailAgent);
        await TestCondition.setAgentSkillsToDefault(ibEmailAgent, SkillType.IB_EMAIL);
        await TestCondition.setUpAndRemoveSkill(obEmailAgent, SkillType.IB_EMAIL);
    })
})
