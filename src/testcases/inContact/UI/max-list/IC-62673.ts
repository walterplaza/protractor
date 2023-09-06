import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 268719
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC311
 */

describe("MAX suite - IC-62673", function () {
    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let obPhone1: string = "(400) 001-0001";
    let obPhone2: string = "(400) 515-0002";
    let obPhone3: string = "(400) 515-0003";
    let blackColor: string = "#333333";

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62673 - [MAX] > NWay > Drop patron from Conference and retain call with others`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE)
    }, TestRunInfo.conditionTimeout);

    it('IC-62673 - MAX NWay Drop patron from Conference and retain call with others', async () => {

        // 1. inContact Central login
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(obPhoneAgent);

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Click on the New Button (Select Call is agent has an ob phone skill)
        await maxPage.clickNew();

        // VP: Address book opens
        expect(await maxPage.isSearchAddressDisplayed()).toBe(true, "Address book is not opened");

        // 4. Type in a telephone number into the textbox. Place an outbound call to the number entered by clicking the "Call" button and selecting an outbound call type.
        maxCall = await maxPage.makeOutboundCall(obPhone2, SkillType.OB_PHONE);
        await maxCall.waitForCallWorkspace(TestRunInfo.shortTimeout);

        // VP: Contact status changes to "Outbound Contact" and timer for call begins. Outbound calling shows "Dialing" and a timer begins for dialing time. The "Hang Up" button becomes active.
        expect(await maxCall.isHungUpDisplayed(false, TestRunInfo.shortTimeout)).toBe(true, "The 'Hang Up' button is not active");
        expect(await maxCall.isToTalContactTimeDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Timer begins for dialing time is not displayed");

        // 5. Click the "Hold" button to put the Outbound individual on hold.
        await maxCall.clickHoldButton();

        // VP: The call does not end. The Hold button Turns Red with striped background. "Holding" shows and a timer appears where "Dialing" and its timer had been. The "Hang Up" button is not active.
        expect(await maxCall.checkRedColorOfHoldingButton()).toBe(true, "The Hold button is not turn Red");
        expect(await maxCall.isCallHeld()).toBe(true, "The 'Hang Up' button is not active");
        expect(await maxCall.isHoldTitleDisplayed()).toBe(true, "'Holding' title is not shown");
        expect(await maxCall.isHoldTimerDisplayed()).toBe(true, "Timer is not appeared");
        expect(await maxCall.isHungUpDisplayed()).toBe(true, "The 'Hang Up' button is active");

        // Show MAX Glance
        await maxCall.showMaxGlance();

        // 6. On the call contact panel click the "Transfer / Conf " button.
        await maxCall.hideMaxGlance();
        await maxCall.clickTransferConfButton();

        // VP: Address book opens
        expect(await maxCall.isSearchAddressDisplayed()).toBe(true, "Address book is not opened");

        // Type in a telephone number into the textbox. Place an outbound call to the number entered by clicking the "Call" button.
        await maxCall.makeOutboundCall(obPhone3, SkillType.OB_PHONE);

        // VP: Another call contact panel display.
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(true, "Call contact panel does not display");

        // Click Hold
        await maxCall.clickHoldButtonInCallActive();

        // VP: The hold button turns black.
        expect(await maxCall.getHoldButtonInCallActiveColor(obPhone3)).toBe(blackColor, "The hold button does not turn black");

        // 7. Press the "Conference" button 
        await maxCall.clickConferenceWithCallNumber(obPhone3);

        // VP: All three legs are now conversing
        await maxCall.addContactConference(obPhone1);
        expect(await maxCall.checkNewCallActive(obPhone1)).toBe(true, "The first Outbound individual is not active");
        expect(await maxCall.checkMainCallActive(obPhone2)).toBe(true, "The second Outbound individual is not active");
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(true, "The third Outbound individual is not active");

        // 8. Click the hang up button on the main patron
        await maxCall.clickHangUpWithPhoneNumber(obPhone3);

        // 9. Verify that conference is still active
        // VP: Conference still active without main patron
        expect(await maxCall.isConferenceDisplayed()).toBe(true, "Conference is not active without main patron");
    });

    afterEach(async () => {
        try {
            await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);

            // Clean up
            await maxCall.endConference();
            await maxCall.endCallContactConference();
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        }
        catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(obPhoneAgent, SkillType.OB_PHONE)
            }
            catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});