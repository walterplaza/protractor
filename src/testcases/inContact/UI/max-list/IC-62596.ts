import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 426868
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 */

describe("MAX suite - IC-62596", function () {

    TestBase.scheduleTestBase();
    let ibPhoneNotReqAgent: Agent;
    let glanceWidthBeforeContact: number;
    let glanceWidthWorking: number;
    let ibPhoneAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62596 - MAX> Phone> Verify the Phone workspace doesn't resize too large upon ending contact.`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, false, true);

    }, TestRunInfo.conditionTimeout);

    it('IC-62596 - MAX Phone Verify the Phone workspace does not resize too large upon ending contact.', async () => {

        // 1.Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2.Launch MAX
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);
        glanceWidthBeforeContact = await maxPage.getMaxGlanceSize();

        // Change state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3.Route call to agent.
        await TestHelpers.startOrJoinSession(ibPhoneAgent, ibPhoneAgent.phoneNumber);
        await TestHelpers.startInboundCall(ibPhoneAgent);

        // VP: Call workspace exists
        maxCall = await maxPage.waitForCallWorkspace();
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Call workspace does not exist");
        glanceWidthWorking = await maxPage.getCallModuleSize();

        // 4. End call and select disposition
        await maxCall.clickEndContactButton();
        await maxCall.clickConfirmEndContactButtonACW();

        // VP: The ACW times start to run and the ACW workspace remains the same size of the Phone Contact
        expect(await maxPage.isACWTimerCountDisplayed()).toBe(true, "ACW does not display");
        expect(await maxPage.getCallModuleSize()).toBe(glanceWidthWorking, "Call size is changed");

        //VP: When the ACW times has been completed, verify the Phone workspace has been closed automatically and the Glance displays its size as before starting the contact.
        await maxCall.waitForACWTimeout();
        expect(await maxPage.getMaxGlanceSize()).toBe(glanceWidthBeforeContact, "MAX Glance size is changed");
    
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});