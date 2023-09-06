import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { JsonUtility, Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: ADV120156
 * Tested cluster: SC3
 */

let testCaseName: string = "Upload new records to a call list";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let apiName: string = "upload-new-records-to-a-call-list";

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let callingDNCGroupManagementApi = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();
    let res: APIResponse;
    let forceOverwrite: string;

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre-condition: prepare data
            let fileName: string = "QA test " + Utility.createRandomString(5) + ".csv";
            let skillId: number = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);
            let listId: any = await TestCondition.getActiveCallingListId(chatAgent)
            for (let caseData of testCaseData.Data) {
                let listFile: string = caseData.QueryParams.listFile;

                if (testCaseData.Id == "ADV60013" || testCaseData.Id == "ADV70015") {
                    let skillIdsWithSpecialCharList: Array<string> = Utility.injectTextWithSpecChars(skillId.toString());
                    for (let skillIdsWithSpecialChar of skillIdsWithSpecialCharList) {
                        res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listId, skillIdsWithSpecialChar, fileName, listFile)
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else if (testCaseData.Id == "ADV60010" || testCaseData.Id == "ADV70012") {
                    let listIdsWithSpecialCharList: Array<string> = Utility.injectTextWithSpecChars(listId.toString());
                    for (let listIdsWithSpecialChar of listIdsWithSpecialCharList) {
                        res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listIdsWithSpecialChar, skillId, fileName, listFile)
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else if (testCaseData.Id == "ADV60014" || testCaseData.Id == "ADV70016") {
                    forceOverwrite = caseData.QueryParams.forceOverwrite;
                    res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listId, skillId, fileName, listFile, forceOverwrite);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                } else if (testCaseData.Id == "ADV60012" || testCaseData.Id == "ADV70014") {
                    let skillIdString: string = skillId.toString() + " alphabetchars";
                    res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listId, skillIdString, fileName, listFile);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
                else if (testCaseData.Id == "ADV120156") {
                    res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listId, skillId, fileName, listFile, forceOverwrite);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                } 
                else {
                    if (testCaseData.Id == "ADV60007" || testCaseData.Id == "ADV60009" || testCaseData.Id == "ADV70009" || testCaseData.Id == "ADV70011") {
                        listId = caseData.PathParams.listId;
                    } else if (testCaseData.Id == "ADV60008" || testCaseData.Id == "ADV70010") {
                        listId = listId + " alphabetchars";
                    } else if (testCaseData.Id == "ADV60015" || testCaseData.Id == "ADV60016" || testCaseData.Id == "ADV60011" || testCaseData.Id == "ADV70013" || testCaseData.Id == "ADV70017" || testCaseData.Id == "ADV70018") {
                        skillId = caseData.QueryParams.skillId;
                    }
                    res = await callingDNCGroupManagementApi.uploadNewRecordsToACallList(chatAgent, listId, skillId, fileName, listFile);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        }
        catch (error) { }
        finally {
            try {
                await CustomAPIs.endAllContacts(chatAgent);
            }
            catch (error) { }
        }
    }, TestRunInfo.conditionTimeout);
})
