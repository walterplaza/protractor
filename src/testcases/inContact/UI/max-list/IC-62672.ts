import CustomAPIs from "@apis/custom-apis";
import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { ContactName } from "@data-objects/general/max";
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
 * TC ID: 268723
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC1
 */

describe("MAX suite - IC-62672", function () {

    TestBase.scheduleTestBase();
    let obPhoneAgent: Agent;
    let obPhone1: string = "(400) 001-0001";
    let obPhone2: string = "(400) 515-0002";
    let obPhone3: string = "(400) 515-0003";
    let blackColor: string = "#333333";
    let skillId: number;
    let obPhoneName: SkillType = SkillType.OB_PHONE;

    // Declare page object
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxCall: MaxCall;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-62672 - [MAX] > NWay > Drop Patron > Transfer call with outbound`);
        obPhoneAgent = await TestCondition.setUpAgent(SkillType.OB_PHONE);
        loginPage = LoginPage.getInstance();
    }, TestRunInfo.conditionTimeout);

    it('IC-62672 - MAX NWay Drop Patron Transfer call with outbound', async () => {

        // 1. Central Login
        centralPage = await loginPage.loginInContact(obPhoneAgent);
        await obPhoneAgent.createPhoneNumber();

        // 2. Launch MAX
        maxPage = await centralPage.launchMAX(obPhoneAgent.phoneNumber);

        // 3. Click on the New Button (Select Call is agent has an ob phone skill)
        await maxPage.clickNew();
        await maxPage.selectAddNewOption(ContactName.PHONE_CALL);

        // VP: Address book opens
        expect(await maxPage.isAddressBookDisplayed()).toBe(true, " Address book is not opened");

        // 4. Type in a telephone number into the textbox. Place an outbound call to the number entered by clicking the "Call" button and selecting an outbound call type.
        maxCall = await maxPage.makeOutboundCall(obPhone2, obPhoneName);
        await maxCall.waitForCallDialling();

        // VP: Contact status changes to "Outbound Contact" and timer for call begins. Outbound calling shows "Dialing" and a timer begins for dialing time. 
        skillId = await CustomAPIs.getSkillIdFromSkillName(obPhoneAgent, obPhoneName);
        expect(await maxCall.isSkillInfoDisplayed(obPhoneName, skillId)).toBe(true, "Skill information is not displayed");
        expect(await maxCall.isToTalContactTimeDisplayed()).toBe(true, "Hang up button is disable");

        // VP: The "Hang Up" button becomes active.
        expect(await maxCall.isHangUpDisabled(TestRunInfo.shortTimeout)).toBe(false, "Hang up button is disable");

        // 5. Click the "Hold" button to put the Outbound individual on hold.
        await maxCall.clickHoldButton();

        // VP: The call does not end. The "Resume" button replaces the "Hold" button.  
        expect(await maxCall.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The call is not displayed");

        // VP: The "Resume" button replaces the "Hold" button.
        expect(await maxCall.isCallHeld()).toBe(true, "The 'Resume' button is not active");

        // VP: "Holding" shows and a timer appears where "Dialing" and its timer had been.
        expect(await maxCall.isHoldTitleDisplayed()).toBe(true, "'Holding' title is not shown");
        expect(await maxCall.isHoldTimerDisplayed()).toBe(true, "Timer is not appeared");

        // VP: The "Hang Up" button is not active.
        expect(await maxCall.isHungUpDisplayed()).toBe(true, "The 'Hang Up' button is active");

        // VP: The "New" button becomes is active for the Agent.
        await maxCall.showMaxGlance();
        expect(await maxCall.isNewButtonDisabled(TestRunInfo.shortTimeout)).toBe(false, "The New button becomes is not active for the Agent");

        // 6. Repeat steps 3-5 with a different Outbound phone number.        
        await maxCall.hideMaxGlance();
        await maxCall.clickTransferConfButton();

        // VP: Address book opens
        expect(await maxCall.isSearchAddressDisplayed()).toBe(true, "Address book is not opened");

        // Make the Outbound phone with different number
        maxCall = await maxPage.makeOutboundCall(obPhone3, obPhoneName);
        await maxCall.waitForCallWorkspace();

        // VP: Another call contact panel display.
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(true, "The call contact panel does not display.");

        // Click Hold
        await maxCall.clickHoldButtonInCallActive();

        // VP: The hold button turns black
        expect(await maxCall.getHoldButtonInCallActiveColor(obPhone3)).toBe(blackColor, "The hold button does not turn black");

        // 7. Press the "Conference" button 
        await maxCall.clickConferenceWhileHolding();

        // VP: All three legs are now conversing
        await maxCall.addContactConference(obPhone1);
        expect(await maxCall.checkMainCallActive(obPhone2)).toBe(true, "The first Outbound individual is not active");
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(true, "The second Outbound individual is not active");
        expect(await maxCall.checkNewCallActive(obPhone1)).toBe(true, "The third Outbound individual is not active");

        // 8. Click the hang up button on the main patron
        await maxCall.clickHangUpWithPhoneNumber(obPhone3);

        // VP: Patron disconnected
        expect(await maxCall.checkNewCallActive(obPhone3)).toBe(false, "The third Outbound individual is active");

        // 9. Verify that conference is still active
        // VP: Conference still active without main patron
        expect(await maxCall.isConferenceDisplayed()).toBe(true, "Conference is not active without main patron");

        // 10. Press the "Transfer" button
        await maxCall.clickTransferWithCallNumber(obPhone1);

        // VP: Agent leg is disconnected from the call and both OB calls are still conversing
        expect(await maxPage.getAgentStatus()).toBe(MaxState.UNAVAILABLE, "Agent status doesn't change to Unavailable");
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The call contact is not ended");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
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