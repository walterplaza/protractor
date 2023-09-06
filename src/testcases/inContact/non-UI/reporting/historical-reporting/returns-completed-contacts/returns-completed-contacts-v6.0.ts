import historicalReporting from "@apis/reporting/historical-reporting/historical-reporting";
import { Agent } from "@data-objects/general/agent";
import { SkillType, SkillCore } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import CustomAPIs from "@apis/custom-apis";
import { APIResponse } from "@utilities/general/api-core";
import TestHelpers from "@test-helpers/test-helpers";
import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import { MaxState, APIVersion } from "@data-objects/general/cluster";
import { utils } from "protractor";
import { calendarFormat } from "moment";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: RPV60045, RPV60046, RPV60047, RPV60048, RPV60049, RPV60050, RPV60051, RPV60052, RPV60053
 * Tested cluster: SC10
 */
let testCaseName: string = "Returns Completed Contacts";

describe(`${testCaseName} - ${APIVersion.V6}`, async function () {
    let monitorAgent: Agent;
    let startDate: string;
    let startDateOrg: string;
    let invalidstartDate: string;
    let endDate: string;
    let endDateOrg: string;
    let res: APIResponse;
    let startDateArr: string[];
    let startDateChars: string;
    let endDateArr: string[];
    let endDateChars: string;
    let updatedSince: string;
    let updatedSinceReset: string;
    let updatedSinceArr: string[];
    let updatedSinceChars: string;
    let skillName: string;

    // Before Each (Pre-Condition)
    beforeEach(async () => {
        monitorAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`reporting/historical-reporting/returns-completed-contacts/returns-completed-contacts-${APIVersion.V6}.json`);
    let historicalReportingAPI = historicalReporting.getHistoricalReportingInstance();
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V6}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${APIVersion.V6}`);
            monitorAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            startDateOrg = await Utility.getNowDate("/", -29);
            endDateOrg = await Utility.getNowDate("/", +1);
            invalidstartDate = await Utility.getNowDate("/", -31);

            // Pre-condition: Start outbound call
            await monitorAgent.createPhoneNumber();
            await CustomAPIs.startOrJoinSession(monitorAgent, monitorAgent.phoneNumber);
            skillName = SkillCore.getSkillName(SkillType.OB_PHONE);
            await CustomAPIs.setAgentState(monitorAgent, MaxState.AVAILABLE);
            await phoneCallManagementAPI.dialsAnOutboundCall(monitorAgent, monitorAgent.phoneNumber, skillName);
            await CustomAPIs.endAllContacts(monitorAgent);

            for (let caseData of testCaseData.Data) {
                startDate = caseData.QueryParams.startDate;
                endDate = caseData.QueryParams.endDate;
                updatedSince = caseData.QueryParams.updatedSince;

                if (testCaseData.Id == "RPV60049") {
                    if (caseData.QueryParams.startDate == "startDateSpecChars") {
                        //StartDate contains special chars
                        startDateArr = Utility.injectTextWithSpecChars(startDate, ".-");
                        for (startDateChars of startDateArr) {
                            res = await historicalReportingAPI.returnsCompletedContacts(monitorAgent, startDateChars, endDate);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    } else if (caseData.QueryParams.endDate == "endDateSpecChars") {
                        //EndDate contains special chars
                        endDateArr = Utility.injectTextWithSpecChars(endDate, ".-");
                        for (endDateChars of endDateArr) {
                            res = await historicalReportingAPI.returnsCompletedContacts(monitorAgent, startDate, endDateChars);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                        }
                    } else {
                        //Updatesince contains special chars
                        updatedSinceReset = await Utility.getNowDate("/", -30);
                        updatedSinceArr = Utility.injectTextWithSpecChars(updatedSinceReset, ".-");
                        for (updatedSinceChars of updatedSinceArr) {
                            res = await historicalReportingAPI.returnsCompletedContacts(monitorAgent, caseData.QueryParams.startDate, caseData.QueryParams.endDate, updatedSinceChars);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code is not matched as expected");
                            expect(res.header).toBe(caseData.Expected.statusDescription, "Status description is not matched as expected");
                        }
                    }
                } else {
                    if (testCaseData.Id == "RPV60046") {
                        //Required infomation
                        startDate = startDateOrg;
                        endDate = endDateOrg;
                    } else if (testCaseData.Id == "RPV60048") {
                        if (caseData.QueryParams.startDate == "InvalidDateRange") {
                            //Invalid date range startDate
                            startDate = invalidstartDate;
                            endDate = endDateOrg;
                        } else if (caseData.QueryParams.updatedSince == "InvalidDateRange") {
                            //Invalid date range UpdateSinces                        
                            updatedSince = await Utility.getNowDate("/", -31);
                            caseData.Expected.statusDescription = caseData.Expected.statusDescription.replace("replaceValue", Utility.formatDateTime(updatedSince.toString(), "MM/DD/YYYY", "M/DD/YYYY"));
                        } else if (caseData.QueryParams.testData == "invalidStartDate") {
                            //Invalid startDate 
                            endDate = endDateOrg;
                        }
                    } else if (testCaseData.Id == "RPV60047") {
                        //Invalid Token
                        monitorAgent.accessToken = monitorAgent.accessToken + "invalid"
                    } else if (testCaseData.Id == "RPV60050") {
                        if (caseData.QueryParams.startDate != "") {
                            //Empty endDate QueryParams
                            startDate = startDateOrg;
                        } else {
                            //Empty startDate QueryParams
                            endDate = endDateOrg;
                        }
                    } else if (testCaseData.Id == "RPV60052") {
                        if (caseData.QueryParams.startDate != "") {
                            //Without startDate QueryParams
                            endDate = endDateOrg;
                        } else {
                            //Without endDate QueryParams
                            startDate = startDateOrg;
                        }
                    } else if (testCaseData.Id == "RPV60045") {
                        if (caseData.QueryParams.testData == "invalidStartDate") {
                            //Invalid startDate QueryParmas
                            endDate = endDateOrg;
                        } else if (caseData.QueryParams.testData == "invalidEndDate") {
                            //Invalid endDate QueryParmas
                            startDate = startDateOrg;
                        } else if (caseData.QueryParams.testData == "invalidRangeDate") {
                            //Invalid UpdatedSince QueryParmas
                            startDate = endDateOrg;
                            endDate = startDateOrg;
                        } else if (caseData.QueryParams.testData == "invalidValue") {
                            //invalid fields, skip, orderby QueryParmas
                            startDate = startDateOrg;
                            endDate = endDateOrg;
                        }
                    }
                    res = await historicalReportingAPI.returnsCompletedContacts(monitorAgent, startDate, endDate, updatedSince, caseData.QueryParams.fields, caseData.QueryParams.skip, caseData.QueryParams.top, caseData.QueryParams.orderby);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                    expect(res.header).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
    })
    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await TestCondition.setAgentSkillsToDefault(monitorAgent, SkillType.OB_PHONE);
        }
        catch (err) {
        }
    }, TestRunInfo.conditionTimeout);
})