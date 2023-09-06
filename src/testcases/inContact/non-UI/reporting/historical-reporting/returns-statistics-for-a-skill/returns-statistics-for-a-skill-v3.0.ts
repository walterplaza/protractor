import CustomAPIs from "@apis/custom-apis";
import HistoricalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { APIVersion } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV30055, RPV30056, RPV30057, RPV30058, RPV30059, RPV30060, RPV30061, RPV30062, RPV30063 
 * Tested cluster: SC3
 */

let testCaseName: string = "Returns Statistics For A Skill";

describe(`${testCaseName} - ${APIVersion.V3}`, async function () {
    let chatAgent: Agent;
    let skillId: any;
    let returnResponse: APIResponse;
    let startDate: any = Utility.getNowDate("/", -3);
    let endDate: any = Utility.getNowDate("/", 0);
    let tempStartDate: string;
    let tempEndDate: string;
    let tempSkillId: number;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-statistics-for-a-skill/returns-statistics-for-a-skill-${APIVersion.V3}.json`);
    let reportingApis = HistoricalReporting.getHistoricalReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V3}`);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            skillId = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                tempSkillId = skillId;
                tempStartDate = startDate;
                tempEndDate = endDate;

                if (testCaseData.Id == "RPV30059") {
                    // Case: skillId contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempSkillId.toString(), ".-");

                    for (let skillIdWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsStatisticsForASkill(chatAgent, skillIdWithSpecialChar, tempStartDate, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");

                    }
                } else if (testCaseData.Id == "RPV30063") {
                    // Case: startDate contains special characters   
                    let specialCharTextArr: Array<string> = Utility.injectTextWithSpecChars(tempStartDate, ".-");

                    for (let startDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsStatisticsForASkill(chatAgent, tempSkillId, startDateWithSpecialChar, tempEndDate);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.startDateStatusDescription, "Error Description is not correct as expected.");

                    }
                    // Case: endDate contains special characters   
                    specialCharTextArr = Utility.injectTextWithSpecChars(tempEndDate, ".-");

                    for (let endDateWithSpecialChar of specialCharTextArr) {

                        returnResponse = await reportingApis.returnsStatisticsForASkill(chatAgent, tempSkillId, tempStartDate, endDateWithSpecialChar);
                        expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected.");
                        expect(returnResponse.header).toBe(caseData.Expected.endDateStatusDescription, "Error Description is not correct as expected.");

                    }

                }
                else {
                    if (testCaseData.Id == "RPV30056" || testCaseData.Id == "RPV30058") {
                        tempSkillId = caseData.PathParams.skillId;
                    } else if (testCaseData.Id == "RPV30057") {
                        tempSkillId += caseData.PathParams.skillId;
                    } else if (testCaseData.Id == "RPV30060" || testCaseData.Id == "RPV30062") {
                        if (caseData.QueryParams.startDate != "" && caseData.QueryParams.endDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate != "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate != "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    } else if (testCaseData.Id == "RPV30061") {
                        if (caseData.QueryParams.startDate == "" && caseData.QueryParams.endDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                            tempEndDate = caseData.QueryParams.endDate;
                        } else if (caseData.QueryParams.startDate == "") {
                            tempStartDate = caseData.QueryParams.startDate;
                        } else if (caseData.QueryParams.endDate == "") {
                            tempEndDate = caseData.QueryParams.endDate;
                        }
                    }

                    returnResponse = await reportingApis.returnsStatisticsForASkill(chatAgent, tempSkillId, tempStartDate, tempEndDate);
                    expect(returnResponse.status).toBe(caseData.Expected.statusCode, "Error Code is not correct as expected. ");
                    expect(returnResponse.header).toBe(caseData.Expected.statusDescription, "Error Description is not correct as expected.");
                }
            }
        });
    })
})
