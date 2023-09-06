import GeneralContactManagementInstance from "@apis/admin/general-contact-management/general-contact-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: ADV120128
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns an Email Transcript";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obAgent: Agent;
    let contactId: any;
    let res: APIResponse;


    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/skill-campaign-management/returns-an-email-transcript/returns-an-email-transcript-${TestRunInfo.versionAPI}.json`);
    let apiClass = GeneralContactManagementInstance.getGeneralContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            obAgent = await TestCondition.registerAgent(SkillType.OB_EMAIL);
            await CustomAPIs.endAllContacts(obAgent);
            for (let caseData of testCaseData.Data) {

                //Pre-condition: Start a chat contact
                await obAgent.createPhoneNumber();
                await CustomAPIs.startOrJoinSession(obAgent, obAgent.phoneNumber);
                await CustomAPIs.setAgentState(obAgent, MaxState.AVAILABLE);
                await CustomAPIs.startEmailContact(obAgent, SkillType.OB_EMAIL);
                await CustomAPIs.waitForContactRouteToAgent(obAgent);
                contactId = await CustomAPIs.getCurrentContactId(obAgent, SkillCore.getSkillName(SkillType.OB_EMAIL));

                if (testCaseData.Id == "ADV70002" || testCaseData.Id == "ADV70004") {
                    contactId = caseData.PathParams.contactId;
                } else if (testCaseData.Id == "ADV70003") {
                    contactId = contactId + "alphabetchars";
                } else if (testCaseData.Id == "ADV70006") {
                    res = await apiClass.returnsAnEmailTranscript(obAgent, contactId, caseData.QueryParams.includeAttachments);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                } else if (testCaseData.Id == "ADV70005") {
                    let arrSpecialChar: Array<string> = Utility.injectTextWithSpecChars(contactId);
                    for (let aSpecialChar of arrSpecialChar) {
                        res = await apiClass.returnsAnEmailTranscript(obAgent, aSpecialChar);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else if (testCaseData.Id == "ADV70007") {
                    let arrSpecialChar: Array<string> = Utility.injectTextWithSpecChars("includeAttachments");
                    for (let aSpecialChar of arrSpecialChar) {
                        res = await apiClass.returnsAnEmailTranscript(obAgent, contactId, aSpecialChar);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                if (testCaseData.Id != "ADV70007" && testCaseData.Id != "ADV70005" && testCaseData.Id != "ADV70006") {
                    res = await apiClass.returnsAnEmailTranscript(obAgent, contactId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }

        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        } catch (err) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(obAgent)
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
})
