import CustomAPIs from "@apis/custom-apis";
import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { APIResponse } from "@utilities/general/api-core";

/**
 * Type: API
 * Suite: inContact API
 * TC ID:RTV120007, RTV30032, RTV30033, RTV30034, RTV30035, RTV50010, RTV50011, RTV50012, RTV50013, RTV50015, RTV70041, RTV70042, RTV70043, RTV70044, RTV70046, RTV80020, RTV80021,RTV80022, RTV80023, RTV80024 
 * Tested cluster: SC10
 */

let testCaseName: string = "Returns activity for a Skill";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;

    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-activity-for-a-skill/returns-activity-for-a-skill-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = RealTimeReporting.getRealTimeReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            for (let caseData of testCaseData.Data) {

                chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
                let skillIdOrg : string = (await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT)).toString();
                let skillId: string;
                let fieldsArr: string[];
                let fields: string;
                let updatedSinceReset : string;
                let updatedSinceArr: string[];
                let updatedSinceChars: string;

                if (testCaseData.Id == "RTV30036" || testCaseData.Id == "RTV50014" || testCaseData.Id == "RTV70045" || testCaseData.Id == "RTV80023") {
                    // Case: Path param that contains special chars
                    let skillIDArr = Utility.injectTextWithSpecChars(skillIdOrg, ".-");
                    for (skillId of skillIDArr) {
                        res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillId);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                }
                else if (testCaseData.Id == "RTV50016" || testCaseData.Id == "RTV70047" || testCaseData.Id == "RTV80025") {
                    // Case: Query param that contains special chars
                    //Fields contains special chars
                    if (caseData.QueryParams.fields != "") {
                        fieldsArr = Utility.injectTextWithSpecChars(caseData.QueryParams.fields, ".-");
                        for (fields of fieldsArr) {
                            res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillIdOrg, caseData.QueryParams.updateSince, fields);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                    else {
                        //Updatesince contains special chars
                        updatedSinceReset = await Utility.getNowDate("/", -30);
                        updatedSinceArr = Utility.injectTextWithSpecChars(updatedSinceReset, ".-");
                        for (updatedSinceChars of updatedSinceArr) {
                            res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillIdOrg, updatedSinceChars);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                }
                else {
                    if (testCaseData.Id == "RTV120007" || testCaseData.Id == "RTV30032" || testCaseData.Id == "RTV50010" || testCaseData.Id == "RTV70041" || testCaseData.Id == "RTV80019") {
                        res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillIdOrg);
                    }
                    else if (testCaseData.Id == "RTV50015" || testCaseData.Id == "RTV70046" || testCaseData.Id == "RTV80024") {
                        res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillIdOrg, caseData.QueryParams.updatedSince);
                    }
                    else {
                        if (testCaseData.Id == "RTV30033" || testCaseData.Id == "RTV50011" || testCaseData.Id == "RTV70042" || testCaseData.Id == "RTV80020") {
                            //skillid Path param is invalid Number type
                           if(caseData.PathParams.skillId != ""){
                               skillId = caseData.PathParams.skillId;
                            } else {
                                skillId = "-" + skillIdOrg;
                            }
                        }
                        else if (testCaseData.Id == "RTV30034" || testCaseData.Id == "RTV50012" || testCaseData.Id == "RTV70043" || testCaseData.Id == "RTV80021") {
                            //numeric skillId Path param that contains alphabet chars
                            skillId = skillIdOrg + "invalid";
                        }
                        else if (testCaseData.Id == "RTV30035" || testCaseData.Id == "RTV50013" || testCaseData.Id == "RTV70044" || testCaseData.Id == "RTV80022") {
                            //empty Path param
                            skillId = "";
                        }
                        res = await apiCoreClass.returnsActivityForASkill(chatAgent, skillId);
                    }
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
})

