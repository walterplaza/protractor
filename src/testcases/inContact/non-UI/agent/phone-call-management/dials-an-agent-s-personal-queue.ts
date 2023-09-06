import PhoneCallManagementInstance from "@apis/agent/phone-call-management/phone-call-management";
import WorkItemContactManagementInstance from "@apis/agent/workitems-contact-management/workitems-contact-management";
import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { APIVersion, MaxState } from "@data-objects/general/cluster";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import { APIResponse } from "@utilities/general/api-core";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/**
 * Type: API
 * Suite: inContact API
 * TC ID: AGV120032
 * Tested cluster: HC25
 */

let testCaseName: string = "Dials an agent's personal queue";

describe(`${testCaseName} - ${TestRunInfo.versionAPI}`, function () {
    let obPhoneAgent: Agent;
    let chatAgent: Agent;
    let contactID: any;
    let res: APIResponse;

    let dataFullTest = Utility.readJsonAPI(`agent/phone-call-management/dials-an-agent-s-personal-queue/dials-an-agent-s-personal-queue-${TestRunInfo.versionAPI}.json`);
    let phoneCallManagementAPI = PhoneCallManagementInstance.getPhoneCallManagementInstance();
    let workItemContactManagementAPI = WorkItemContactManagementInstance.getWorkItemsContactManagementInstance();

    dataFullTest.map(function (testCaseData) {
        it(`${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`, async function () {
            await Logger.write(FunctionType.TESTCASE, `${testCaseData.Id} - ${testCaseName} ${testCaseData.Description} ${TestRunInfo.versionAPI}`);

            obPhoneAgent = await TestCondition.registerAgent(SkillType.OB_PHONE);
            await CustomAPIs.endAllContacts(obPhoneAgent);
            chatAgent = await TestCondition.registerAgent(SkillType.CHAT);
            await CustomAPIs.endAllContacts(chatAgent);
            await obPhoneAgent.createPhoneNumber();
            await chatAgent.createPhoneNumber();

            //Pre-condition:                         
            await CustomAPIs.startOrJoinSession(obPhoneAgent, obPhoneAgent.phoneNumber);
            await CustomAPIs.setAgentState(obPhoneAgent, MaxState.AVAILABLE);
            await CustomAPIs.startOrJoinSession(chatAgent, chatAgent.phoneNumber);
            await CustomAPIs.setAgentState(chatAgent, MaxState.AVAILABLE);

            if (TestRunInfo.versionAPI == APIVersion.V12) {
                let skillID: number = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, SkillType.OB_PHONE);
                await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, TestRunInfo.cluster.outboundNumber, skillID);
            } else {
                let skillName: string = await SkillCore.getSkillName(SkillType.OB_PHONE);
                await phoneCallManagementAPI.dialsAnOutboundCall(obPhoneAgent, TestRunInfo.cluster.outboundNumber, skillName);
            }
            await CustomAPIs.waitForContactRouteToAgent(obPhoneAgent);
            contactID = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
            await workItemContactManagementAPI.holdAWorkItem(obPhoneAgent, contactID);

            for (let caseData of testCaseData.Data) {
                if (testCaseData.Id == "AGV20062") {
                    //Case: Path param that contains special chars                    
                    let resetSessionId: string = obPhoneAgent.sessionId;
                    let sessionIdArr: string[] = Utility.injectTextWithSpecChars(resetSessionId);
                    for (let i = 0; i < sessionIdArr.length; i++) {
                        obPhoneAgent.sessionId = sessionIdArr[i];
                        res = await phoneCallManagementAPI.dialsAnAgentsPersonalQueue(obPhoneAgent, chatAgent.email);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                    obPhoneAgent.sessionId = resetSessionId;
                } else if (testCaseData.Id == "AGV20063") {
                    // Case: Body field that contains special chars                 
                    let emailArr: string[] = Utility.injectTextWithSpecChars(chatAgent.email);
                    for (let i = 0; i < emailArr.length; i++) {
                        res = await phoneCallManagementAPI.dialsAnAgentsPersonalQueue(obPhoneAgent, emailArr[i]);
                        expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 - [TestAutomation][inC-UI] The voicemail cannot be routed to agent");
                        expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                    }
                } else {
                    if (testCaseData.Id == "AGV20061") {
                        // Case: empty Path param
                        obPhoneAgent.sessionId = "";
                    }
                    // Run API and check Error Code and Error Description
                    if (TestRunInfo.versionAPI == APIVersion.V12) {
                        res = await phoneCallManagementAPI.dialsAnAgentsPersonalQueue(obPhoneAgent, chatAgent.agentID);
                    } else {
                        res = await phoneCallManagementAPI.dialsAnAgentsPersonalQueue(obPhoneAgent, chatAgent.email);
                    }
                    expect(res.status).toBe(caseData.Expected.statusCode, "Failed by ticket IC-39870 : [TestAutomation][inC-UI] The voicemail cannot be routed to agent.");
                    expect(res.getErrorDescription()).toBe(caseData.Expected.statusDescription, "Status description does not match expected");
                }
            }
        });
        afterEach(async () => {
            try {
                await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
            }
            catch (error) { }
            finally {
                try {
                    await CustomAPIs.endAllContacts(obPhoneAgent);
                    await CustomAPIs.endAllContacts(chatAgent);
                }
                catch (error) { }
            }
        }, TestRunInfo.conditionTimeout);
    })
})