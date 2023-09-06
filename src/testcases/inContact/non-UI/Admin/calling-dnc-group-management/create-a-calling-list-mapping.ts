import CallingDNCGroupManagementInstance from "@apis/admin/calling-dnc-group-management/calling-dnc-group-management";
import CustomAPIs from "@apis/custom-apis";
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
 * TC ID: ADV120152
 * Tested cluster: SC3
 */

let testCaseName: string = "Create a Calling List mapping";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;
    let apiName: string = "create-a-calling-list-mapping";
    let skillId: any
    let forceOverwrite: boolean = false;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`admin/calling-dnc-group-management/${apiName}/${apiName}-${TestRunInfo.versionAPI}.json`);
    let callingDNCGroupManagementApi = CallingDNCGroupManagementInstance.getCallingDNCGroupManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);

            // Pre-condition: prepare data
            let destinationMappingsFieldName: string = "PhoneNumber";
            let destinationMappingsFieldValue: string = "phone";
            let externalColumnId: number = Utility.getRandomNumber(1);
            let listName: string = "QA test" + Utility.createRandomString(5);
            let fileName: string = "QA test" + Utility.createRandomString(5) + ".csv";
            skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.PC_PHONE);

            for (let caseData of testCaseData.Data) {
                if (TestRunInfo.versionAPI == APIVersion.V4) {
                    if (testCaseData.Id == "ADV40011") {
                        let skillIdSpecialCharList: Array<string> = Utility.injectTextWithSpecChars(skillId.toString());
                        for (let skillIdSpecialChar of skillIdSpecialCharList) {
                            res = await callingDNCGroupManagementApi.createACallingListMapping(chatAgent, listName, skillIdSpecialChar, fileName, forceOverwrite, caseData.QueryParams.listFile);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected.");
                        }
                    } else {
                        if (testCaseData.Id == "ADV40008") {
                            forceOverwrite = caseData.QueryParams.forceOverwrite;
                        } else if (testCaseData.Id == "ADV40009") {
                            skillId = caseData.QueryParams.skillId;
                        } else if (testCaseData.Id == "ADV40010") {
                            skillId = skillId.toString() + "alphabetchars";
                        } else if (testCaseData.Id == "ADV40012") {
                            listName = caseData.QueryParams.fileName;
                        } else if (testCaseData.Id == "ADV40013") {
                            listName = caseData.QueryParams.fileName;
                            skillId = caseData.QueryParams.skillId;
                            fileName = caseData.QueryParams.fileName;
                            forceOverwrite = caseData.QueryParams.forceOverwrite;
                        } else if (testCaseData.Id == "ADV40014") {
                            listName = caseData.QueryParams.fileName;
                        } else if (testCaseData.Id == "ADV40015") {
                            listName = caseData.QueryParams.fileName;
                            skillId = caseData.QueryParams.skillId;
                            fileName = caseData.QueryParams.fileName;
                            forceOverwrite = caseData.QueryParams.forceOverwrite;
                        }
                        res = await callingDNCGroupManagementApi.createACallingListMapping(chatAgent, listName, skillId, fileName, forceOverwrite, caseData.QueryParams.listFile);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }

                } else {

                    res = await callingDNCGroupManagementApi.createACallingListMapping(chatAgent, listName, externalColumnId, destinationMappingsFieldName, destinationMappingsFieldValue);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            let listId: string = await JsonUtility.getFieldValue(res.body, `listId`);
            await callingDNCGroupManagementApi.removeACallingList(chatAgent, listId, true, true);
            await CustomAPIs.endAllContacts(chatAgent);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})


