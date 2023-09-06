import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import CustomAPIs from "@apis/custom-apis";
import inContactAPIs from "@apis/incontact-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120154
 * Tested cluster: SC3
 */

let testCaseName: string = "Download a Calling List";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "download-a-calling-list";
    let listId: string;
    let finalized: string = "finalized"
    let callingListRes: APIResponse;
    let res: APIResponse

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);

    let apiClass = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Get listId
            callingListRes = await inContactAPIs.getListsCallLists(chatAgent, APIVersion.V12);
            listId = await JsonUtility.getFieldValue(callingListRes.body, `callingLists[1].listId`).replace(/"/g, "");

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "ADV40002" || testCaseData.Id == "ADV40004") {
                    listId = caseData.PathParams.listId;
                } else if (testCaseData.Id == "ADV40003") {
                    listId = listId + "alphabetchar";
                } else if (testCaseData.Id == "ADV40006") {
                    res = await apiClass.downloadACallingList(chatAgent, listId, caseData.QueryParams.finalized);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                } else if (testCaseData.Id == "ADV40005") {
                    let str: Array<string> = Utility.injectTextWithSpecChars(listId);
                    for (let aSpecialChar of str) {
                        res = await apiClass.downloadACallingList(chatAgent, aSpecialChar, finalized);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else if (testCaseData.Id == "ADV40007") {
                    let str: Array<string> = Utility.injectTextWithSpecChars(finalized);
                    for (let aSpecialChar of str) {
                        res = await apiClass.downloadACallingList(chatAgent, listId, aSpecialChar);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                if (testCaseData.Id != "ADV40007" && testCaseData.Id != "ADV40005" && testCaseData.Id != "ADV40006") {
                    res = await apiClass.downloadACallingList(chatAgent, listId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    if (testCaseData.Id == "ADV120154") {
                        expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    } else {
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
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
