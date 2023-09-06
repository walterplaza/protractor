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

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 392904
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe("MAX suite - IC-101261", function () {
    TestBase.scheduleTestBase();
    let ibPhoneNotReqAgent: Agent;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;
    let maxDispositionPage: MaxDispositionPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101261 - Max Contacts get stuck in acw state - Phone - Non-Required Dispo - Allow to timeout without Dispo`);
        ibPhoneNotReqAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, false, true);

        // 1. Central Login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneNotReqAgent);
        maxPage = await centralPage.launchMAX(ibPhoneNotReqAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);
        
    }, TestRunInfo.conditionTimeout);

    it('IC-101261 - Max Contacts get stuck in acw state Phone Non Required Dispo Allow to timeout without Dispo', async () => {

        // 2. Run an inbound Phone Contact.
        await TestHelpers.startInboundCall(ibPhoneNotReqAgent);
        maxCall = await maxPage.waitForCallWorkspace();
     
        // VP: Contact is delivered to MAX
        expect(await maxCall.isCallWorkspaceDisplayed()).toBe(true, "The call contact is not routed to Agent")
        
        // 3. Allow contact to close
        maxDispositionPage = await maxCall.endCallRequireDispositionContact();

        // VP: Disposition window opens
        expect(await maxDispositionPage.isDispositionFormDisplayed()).toBe(true,"Disposition window does not open");
        
        // 4. Do not do anything with the Disposition. Allow dispo to time out.
        await maxPage.waitACWDisappear(TestRunInfo.longTimeout);

        // VP: Connection window close. Agent returns to Available
        expect(await maxDispositionPage.isDispositionFormDisplayed(TestRunInfo.shortTimeout)).toBe(false,"Connection window does not close");
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE,"Agent does not return to Available");
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

