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
import { ContactName } from "@data-objects/general/max";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 249567
 * Tested browser: Chrome, Firefox, IE, Edge
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe("MAX suite - IC-62675", function () {
    TestBase.scheduleTestBase();
    let ibPhoneAgent: Agent;
    let transferNumber: string = '4000015000';

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62675 - MAX > Voice - Interactions> Agent with OB Skills Cold Transfer To An External Number`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone);
        await TestCondition.setUpAndAssignSkill(ibPhoneAgent, SkillType.OB_PHONE);
    }, TestRunInfo.conditionTimeout);

    it('IC-62675 - MAX Voice Interactions Agent with OB Skills Cold Transfer To An External Number', async () => {

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2. Launch MAX
        await ibPhoneAgent.createPhoneNumber();
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // 3. Chang state to Available
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Simulate Inbound call and accept incoming call
        await TestHelpers.startInboundCall(ibPhoneAgent);

        // VP: Contact is active
        maxCall = await maxPage.waitForCallWorkspace();
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "Call is not active");

        // 5. Place contact on hold
        await maxCall.clickHoldButton();

        // P: Agent can hold call
        expect(await maxCall.isCallHeld()).toBe(true, "Agent can not hold call");

        // Unhold call 
        await maxCall.clickUnHoldButton();

        // 6. Click the transfer button
        await maxCall.clickTransferConferenceButton();

        // VP: Transfer/Conference address book exist
        expect(await maxCall.isAddressBookDisplayed()).toBe(true, "Address book is not displayed");

        // 7. Input a valid ob phone number
        await maxCall.fillTransferAddress(transferNumber);

        // VP: call button appears
        expect(await maxCall.isTransferCallButtonDisplayed(transferNumber)).toBe(true, "Address book is not displayed");
        await maxCall.callExternalTransfer(transferNumber);

        // 8. Click the transfer button
        await maxCall.clickTransferCall();

        // VP: The call is transferred and call workspace is closed
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL);
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(false, "Call is not Transfer");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }

        finally {
            try {
                await TestCondition.setUpAndRemoveSkill(ibPhoneAgent, SkillType.OB_PHONE);
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});