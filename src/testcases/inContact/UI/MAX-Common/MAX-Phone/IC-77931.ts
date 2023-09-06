import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import PageBase from "@page-objects/page-base";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone > IC-77931
 * TC ID: IC-77931
 * Tested browser: Chrome.
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX-Common > MAX-Phone > IC-77931', function () {

    TestRunInfo.testTimeout = 800000;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let centralWindowHandle: string;
    let maxWindowHandle: string;
    let obPhone1: string = "(400) 001-0001";

    // Declare Page object
    TestBase.scheduleTestBase();
    let ibAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxIbPhonePage: MaxCall;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-77931 - Verify that the panel (screenpop) does not disappears on MAX when an outbound call is placed (Transfer/Conf).`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);
        await TestCondition.setUpAndAssignSkill(ibAgent, SkillType.OB_PHONE);

    }, TestRunInfo.conditionTimeout);

    it('IC-77931 - Verify that the panel (screenpop) does not disappears on MAX when an outbound call is placed (Transfer/Conf).', async () => {

        // 1.1 Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);
        centralWindowHandle = await pageBase.getCurrentWindowHandle();

        // 1.2 Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);
        maxWindowHandle = await pageBase.getCurrentWindowHandle();

        // 2. Make sure you have the panels turned on in MAX (More->Settings->Panels On)
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // 3. Receive an inbound call that launches a screenpop
        await TestHelpers.startInboundCall(ibAgent);
        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: Next to the Phone Contact, should be and displayed the Screen Pop configured in the Panel.
        expect(await maxPage.getScreenPopsTitle()).toContain(textUrl, "Screen pop does not display with configured");
        expect(await maxPage.isScreenPopPositionedAtRightSide()).toBe(true, "The screen pop is not next the phone contact");

        // 4. Press the transfer/conference button
        await maxIbPhonePage.clickTransferConferenceButton();

        // VP: Transfer/Conference address book exist
        expect(await maxIbPhonePage.isAddressBookDisplayed()).toBe(true, "Address book is not displayed");

        // 5. Enter a phone number and call it using a OB skill
        await maxIbPhonePage.fillTransferAddress(obPhone1);

        // VP: call button appears
        expect(await maxIbPhonePage.isTransferCallButtonDisplayed(obPhone1)).toBe(true, "Address book is not displayed");
        await maxIbPhonePage.callExternalTransfer(obPhone1);

        // 6. Verify that the Panel still be displayed when the call is tranferred
        expect(await maxIbPhonePage.getScreenPopsTitle()).toContain(textUrl, "Screen pop does not display");
        expect(await maxIbPhonePage.isScreenPopPositionedAtRightSide()).toBe(true, "The screen pop is not next the phone contact");

        // 7. Hang up the Phone Contact
        await maxIbPhonePage.clickHangUpWithPhoneNumber(obPhone1);
        // Click Hold
        await maxIbPhonePage.clickUnHoldButton();
        await maxIbPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL)
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The Phone work space has not been closed");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "Max Glance does not display");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibAgent, SkillType.IB_Phone);
                await TestCondition.setUpAndRemoveSkill(ibAgent, SkillType.OB_PHONE);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



