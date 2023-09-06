import { Agent } from "@data-objects/general/agent";
import { Cluster, MaxAddressBookTab, MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
import { SkillCore, SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 432908
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC18
 */

describe("MAX suite - IC-101253", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let cluster: Cluster = TestRunInfo.cluster;
    let glanceWidthBeforeContact: number;
    let glanceWidthWorking: number;
    let callContactId: string;
    let outboundNumber: string;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101253 - [MAX] [OB] [Phone] [Address Book] [Call History] Verify the "Call History" tab contains a history of calls made by the agent and you can use one historial for generate an OB Phone Contact.`);
        // 1. Requirements:- It must have an agent
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        outboundNumber = "40000100" + Utility.getRandomNumber(2);
    }, TestRunInfo.conditionTimeout);

    it('IC-101253 - MAX OB Phone Address Book Call History Verify the "Call History" tab contains a history of calls made by the agent and you can use one historial for generate an OB Phone Contact.', async () => {

        loginPage = new LoginPage();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // Pre-condition: The agent must have previously made calls in order for the "Call History" has information.
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);
        await maxPage.makeOutboundCall(outboundNumber, SkillType.OB_PHONE);
        maxCall = await maxPage.waitForCallWorkspace();
        callContactId = await TestHelpers.getCurrentContactId(obPhoneAgent, SkillCore.getSkillName(SkillType.OB_PHONE));
        maxPage = await maxCall.endCallContact();
        centralPage = await maxPage.logOut();

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: The agent has the Available state
        expect(await maxPage.getAgentStatus()).toMatch(MaxState.AVAILABLE, "The agent doesn't have the Available state");

        // 4.  in Tool bar go to New> Call History
        await maxPage.clickNew();
        await maxPage.selectAddressBookTab(MaxAddressBookTab.HISTORY);

        // VP: Verify the "Call History" has the calls previously requested in requirements.This information could be: Agents or Number Phones
        expect(await maxPage.isCallHistoryItemDisplayed(callContactId)).toBe(true, `The 'Call History' doesn't have the calls previously requested in requirements`);
        expect(await maxPage.isHistoryCallItemInformationCorrect(callContactId, outboundNumber, SkillCore.getSkillName(SkillType.OB_PHONE))).toBe(true, "This phone history information (Agents or Number Phones) is incorrect or not displayed");

        // 5. Click on one phone number
        await maxPage.makeCallInHistoryList(callContactId, SkillType.OB_PHONE);

        // VP: Verify the OB Phone Contact has been generated to the phone number
        expect(await maxPage.isCallWorkspaceDisplayed()).toBe(true, "The OB Phone Contact hasn't been generated to the phone number");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            await maxCall.endCallContact();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});