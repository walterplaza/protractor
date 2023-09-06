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
 * TC ID: RTV120003
 * Tested cluster: TC4, HC16
 */
let testCaseName: string = "Returns Active Contacts";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, async function () {
    let chatAgent: Agent;
    let chatSkillID: any;
    let res: APIResponse;
    let updatedSince: any;
    let fields: any;
    let mediaTypeId: any;
    let skillId: any;
    let campaignId: any;
    let agentId: any;
    let teamId: any;
    let toAddr: any;
    let fromAddr: any;
    let stateId: any;

    // Read Data
    let dataFullTest = Utility.readJsonAPI(`real-time-data/real-time-reporting/returns-active-contacts/returns-active-contacts-${TestRunInfo.versionAPI}.json`);

    let realTimeReportingAPI = RealTimeReporting.getRealTimeReportingInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            chatSkillID = await CustomAPIs.getSkillIdFromSkillName(chatAgent, SkillType.CHAT);

            for (let caseData of testCaseData.Data) {
                updatedSince = caseData.QueryParams.updatedSince;
                mediaTypeId = caseData.QueryParams.mediaTypeId;
                skillId = caseData.QueryParams.skillId;
                campaignId = caseData.QueryParams.campaignId;
                agentId = caseData.QueryParams.agentId;
                teamId = caseData.QueryParams.teamId;
                toAddr = caseData.QueryParams.toAddr;
                fromAddr = caseData.QueryParams.fromAddr;
                stateId = caseData.QueryParams.stateId;

                if (testCaseData.Id == "RTV60023" || testCaseData.Id == "RTV70033") {
                    let specCharArray: string[];

                    if (updatedSince != "") {
                        specCharArray = Utility.injectTextWithSpecChars(updatedSince);
                        for (let updatedSince of specCharArray) {
                            res = await realTimeReportingAPI.returnsActiveContacts(chatAgent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr, stateId);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        }
                    } else if (mediaTypeId != "") {
                        specCharArray = Utility.injectTextWithSpecChars(mediaTypeId);
                        for (mediaTypeId of specCharArray) {
                            res = await realTimeReportingAPI.returnsActiveContacts(chatAgent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr, stateId);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        }
                    } else if (skillId != "") {
                        specCharArray = Utility.injectTextWithSpecChars(skillId);
                        for (skillId of specCharArray) {
                            res = await realTimeReportingAPI.returnsActiveContacts(chatAgent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr, stateId);
                            expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                        }
                    }
                } else {
                    if (testCaseData.Id == "RTV60019" || testCaseData.Id == "RTV70029") {
                        chatAgent.accessToken = caseData.QueryParams.token;
                    } else if (testCaseData.Id == "RTV60021" || testCaseData.Id == "RTV70031" || testCaseData.Id == "RTV30031" || testCaseData.Id == "RTV40123") {
                        chatAgent.agentID += caseData.QueryParams.agentId;
                        skillId += caseData.QueryParams.skillId;
                    }
                    res = await realTimeReportingAPI.returnsActiveContacts(chatAgent, updatedSince, fields, mediaTypeId, skillId, campaignId, agentId, teamId, toAddr, fromAddr, stateId);
                    expect(res.status).toBe(caseData.Expected.statusCode, "Status code does not match expected");
                }
            }
        });
    })
})