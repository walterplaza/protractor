import CustomAPIs from "@apis/custom-apis";
import RealTimeReporting from "@apis/real-time-data/real-time-reporting/real-time-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RTV120006, RTV30037,RTV30038, RTV50018, RTV50019, RTV50020, RTV50021, RTV50022,RTV50023, RTV70048, RTV70049, RTV70050, RTV70051, RTV70052, RTV70053, RTV70054, RTV80026, RTV80027, RTV80028, RTV80029, RTV80030, RTV80031, RTV80032

 * Tested cluster: SC10
 */
let testCaseName: string = "Returns activity for all Skills";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let res: APIResponse;

    beforeEach(async () => {
        chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
    }, TestRunInfo.conditionTimeout);

    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-activity-for-all-skills/returns-activity-for-all-skills-${TestRunInfo.versionAPI}.json`);
    let apiCoreClass = RealTimeReporting.getRealTimeReportingInstance();
    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);
            let chatAgentOrg = chatAgent.accessToken;
            for (let caseData of testCaseData.Data) {
                let mediaTypeIdArr: string[];
                let mediaTypeIdChars: string;
                let updatedSinceReset: string;
                let updatedSinceChars: string;
                let updatedSinceArr: string[];

                if (testCaseData.Id == "RTV50023" || testCaseData.Id == "RTV70054" || testCaseData.Id == "RTV80032") {
                    //Case: Query param that contains special chars
                    //MediaTypeId contains special chars
                    if (caseData.QueryParams.mediaTypeId != "") {
                        mediaTypeIdArr = Utility.injectTextWithSpecChars(caseData.QueryParams.mediaTypeId, ".-");
                        for (mediaTypeIdChars of mediaTypeIdArr) {
                            res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, mediaTypeIdChars);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    } else {
                        //Updatesince contains special chars
                        updatedSinceReset = await Utility.getNowDate("/", -30);
                        updatedSinceArr = Utility.injectTextWithSpecChars(updatedSinceReset, ".-");
                        for (updatedSinceChars of updatedSinceArr) {
                            res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, caseData.QueryParams.mediaTypeId, caseData.QueryParams.isOutbound, caseData.QueryParams.fields, updatedSinceChars);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    }
                } else {
                    if (testCaseData.Id == "RTV120006" || testCaseData.Id == "RTV30037" || testCaseData.Id == "RTV50018" || testCaseData.Id == "RTV70049" || testCaseData.Id == "RTV80027") {
                        res = await apiCoreClass.returnsActivityForAllSkills(chatAgent);

                    } else if (testCaseData.Id == "RTV30038" || testCaseData.Id == "RTV50019" || testCaseData.Id == "RTV70050" || testCaseData.Id == "RTV80028") {
                        //invalid token
                        chatAgent.accessToken = "invalidToken" + chatAgentOrg;
                        res = await apiCoreClass.returnsActivityForAllSkills(chatAgent);

                    } else if (testCaseData.Id == "RTV50020" || testCaseData.Id == "RTV50021" || testCaseData.Id == "RTV70051" || testCaseData.Id == "RTV70052" || testCaseData.Id == "RTV80029" || testCaseData.Id == "RTV80030") {
                        //invalid mediaTypeId && numeric Query param that contains alphabet chars
                        res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, caseData.QueryParams.mediaTypeId);

                    } else if (testCaseData.Id == "RTV50022" || testCaseData.Id == "RTV70053" || testCaseData.Id == "RTV80031") {
                        //invalid updateSince
                        res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, caseData.QueryParams.mediaTypeId, caseData.QueryParams.isOutbound, caseData.QueryParams.fields, caseData.QueryParams.updatedSince);
                    } else if (testCaseData.Id == "RTV50017" || testCaseData.Id == "RTV70048" || testCaseData.Id == "RTV80026") {
                        if (caseData.QueryParams.isOutbound != "") {
                            //invalid IsOutbound
                            res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, caseData.QueryParams.mediaTypeId, caseData.QueryParams.isOutbound);
                        } else {
                            //invalid Fields
                            res = await apiCoreClass.returnsActivityForAllSkills(chatAgent, caseData.QueryParams.mediaTypeId, caseData.QueryParams.isOutbound, caseData.QueryParams.fields);
                        }
                    }
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
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