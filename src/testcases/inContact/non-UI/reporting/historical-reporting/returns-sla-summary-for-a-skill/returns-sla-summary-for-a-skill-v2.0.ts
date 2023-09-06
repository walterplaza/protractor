import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIResponse } from "@utilities/general/api-core";
import CustomAPIs from "@apis/custom-apis";
import { APIVersion } from "@data-objects/general/cluster";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV20206, RPV20207, RPV20208, RPV20209, RPV20210, RPV20211, RPV20212, RPV20213, RPV20214
 * Tested cluster: SC3
 */
let testCaseName: string = "Returns sla summary for a Skill";

describe(`${testCaseName} - ${APIVersion.V2}`, async function () {
    let chatAgent: Agent;
    let skillId: any;
    let returnResponse: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempSkillId: string;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-sla-summary-for-a-skill/returns-sla-summary-for-a-skill-${APIVersion.V2}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V2}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);

            for (let caseData of testCaseData.Data) {

                tempSkillId = skillId;
                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV20210") {
                    // Case: special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempSkillId.toString(), ".-");

                    for (let skillIdWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsSlaSummaryForASkill(chatAgent, skillIdWithSpecialChar, tempStartDate, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                } else if (testCaseData.Id == "RPV20212") {
                    // Case: startDate contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                    for (let startDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsSlaSummaryForASkill(chatAgent, tempSkillId, startDateWithSpecialChar, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.startDateStatusDescription, "Error Description is not correct as expected.");

                    }
                    // Case: endDate contains special characters   
                    specialCharTextArr = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                    for (let endDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsSlaSummaryForASkill(chatAgent, tempSkillId, tempStartDate, endDateWithSpecialChar);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.endDateStatusDescription, "Error Description is not correct as expected.");

                    }

                }
                else {
                    if (testCaseData.Id == "RPV20208") {
                        tempSkillId += caseData.PathParams.skillId;
                    } else if (testCaseData.Id == "RPV20207" || testCaseData.Id == "RPV20209") {
                        tempSkillId = caseData.PathParams.skillId;
                    } else if (testCaseData.Id == "RPV20211" || testCaseData.Id == "RPV20214") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.endDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV20213") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    }

                    returnResponse = await reportingApis.returnsSlaSummaryForASkill(chatAgent, tempSkillId, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                }

            }
        });
    })
})