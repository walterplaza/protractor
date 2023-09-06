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
import MaxDispositionPage from "@page-objects/inContact/max/max-disposition-page";
import { DispositionName, ContactName } from "@data-objects/general/max";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392873
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe("MAX suite - IC-101262", function () {
    TestBase.scheduleTestBase();
    let ibPhoneNotReqAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101262 - Max Contacts get stuck in acw state - Phone - Non-Required Dispo`);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, false, true);

        // 1. Pre-req:
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneNotReqAgent);
        maxPage = await centralPage.launchMAX(ibPhoneNotReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);
    }, TestRunInfo.conditionTimeout);

    it('IC-101262 - Max Contacts get stuck in acw state Phone Non Required Dispo', async () => {

        // 2. Run an inbound Phone Contact.
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
     
        // VP: Contact is delivered to MAX
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "The call contact is not routed to Agent")
        
        // 3. Close the contact
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();

        // VP: Disposition window opens
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true, "Disposition form is not displayed")

        // 4. Select a Disposition and Save the Disposition
        await maxDispositionPage.submitAndCloseDispositionForm(DispositionName.DISPOSITION_1);
        
        // VP: When the disposition time has been completed, automatically the agent returns to Available.
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL);
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE,"The agent doesn't change to Available");

    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Logout
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneNotReqAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);

});

