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
import { Utility } from "@utilities/general/utility";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 475251
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101225', function () {

    TestRunInfo.testTimeout = 800000;

    let whiteColor: string = "rgba(241, 241, 242, 1)";
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let screenPopTitle: string;
    let maxWindowHandle: string;
    let screenPopHandle: string;
    let maxWidth: number = 300;
    let callWidth: number = 344;
    let tolerances: number = 10;
    // Declare Page object
    TestBase.scheduleTestBase();
    let ibAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxIbPhonePage: MaxCall;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101225 - [MAX Bug][Summer18][IC-21059][IB Phone][With Contact Panels][Panels=Off/On][Digital Contact] Verify the Phone workspace displays visible in its entirety (within ~344 px)`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-101225 - MAX Bug Summer18 IC 21059 IB The Phone workspace displays visible in its entirety within 344 px', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);

        // 2. How to Measure Pixels
        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);
        maxWindowHandle = await pageBase.getCurrentWindowHandle();

        // 4. Set Panel = Off in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.OFF, false);

        // Close more tool bar
        await maxPage.closePopover();

        // 5. Using the "Dev Tools" select the Glance in MAX
        // VP: Verify the size of Glance is ~300 px (Width)
        expect(await maxPage.isMaxGlanceSizeInRange(maxWidth, tolerances)).toBe(true, "The size of Glance is not ~300 px Width")

        // 6. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state 
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "MAX does not have the 'Available' state");

        // 7. Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCall(ibAgent);
        screenPopHandle = await centralPage.waitForNewTab();
        await pageBase.switchWindowByHandle(maxWindowHandle);
        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: Verify the screen pop configured on IB Phone skill opens in a new tab of the browser.
        await pageBase.switchWindowByHandle(screenPopHandle);
        screenPopTitle = await centralPage.getTitleOfWebPage();
        expect(textUrl).toContain(screenPopTitle.toLocaleLowerCase(), "the screen pop configured on IB Phone skill does not open in a new tab of the browser")

        // Close screen pop
        await centralPage.closeCurrentTab();

        // VP: Return to MAX and verify the Phone workspace displays visible in its entirety.
        await pageBase.switchWindowByHandle(maxWindowHandle);
        expect(await maxIbPhonePage.isHoldTimerDisplayed()).toBe(true, "Hold button is not displayed");
        expect(await maxIbPhonePage.isMuteButtonDisplayed()).toBe(true, "Mute button is not displayed");
        expect(await maxIbPhonePage.isMaskButtonDisplayed()).toBe(true, "Mask button is not displayed");
        expect(await maxIbPhonePage.isRecordButtonDisplayed()).toBe(true, "Record button is not displayed");
        expect(await maxIbPhonePage.isTransferContactButtonDisplayed()).toBe(true, "Transfer button is not displayed");
        expect(await maxIbPhonePage.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxIbPhonePage.isEndButtonDisplayed()).toBe(true, "End button is not displayed");

        // VP: The workspace of the phone must not displayed be cut off .
        expect(await maxIbPhonePage.isCallWorkspaceSizeInRange(callWidth, tolerances)).toBe(true, "The workspace of the phone is displayed  cut off");

        // VP: The phone workspace must not contain a gray space and scroll bar.
        expect(await maxIbPhonePage.isHorizontalScrollBarDisplayed()).toBe(false, "The phone workspace contains a scroll bar");
        expect(Utility.convertRgbToHex(await maxIbPhonePage.getCallWorkSpaceColor())).toBe(Utility.convertRgbToHex(whiteColor), "The phone workspace contains a gray space");

        // 8. Using the "Dev Tools" select the "Phone" work space
        // VP: Verify the size of Phone work space is ~344 px (Width)
        expect(await maxIbPhonePage.isCallWorkspaceSizeInRange(callWidth, tolerances)).toBe(true, "the size of Phone work space is not ~344 px (Width)");

        // 9. Hang up the Phone Contact 
        await maxIbPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL)
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The Phone work space has not been closed");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "Max Glance does not display");

        // 10. Using the "Dev Tools" select the Glance in MAX
        // VP: Verify the size of Glance continue being ~300 px (Width)
        expect(await maxPage.isMaxGlanceSizeInRange(maxWidth, tolerances)).toBe(true, "The size of Glance continue is not ~300 px (Width)");

        // 11. Set Panel = On in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // 12. Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCall(ibAgent);
        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: Next to the Phone Contact, should be and displayed the Screen Pop configured in the Panel.
        expect(await maxPage.getScreenPopsTitle()).toContain(textUrl, "Screen pop does not display with configured");
        expect(await maxPage.isScreenPopPositionedAtRightSide()).toBe(true, "The screen pop is not next the phone contact");

        // VP: Verify the Phone workspace displays visible in its entirety
        expect(await maxIbPhonePage.isHoldTimerDisplayed()).toBe(true, "Hold button is not displayed");
        expect(await maxIbPhonePage.isMuteButtonDisplayed()).toBe(true, "Mute button is not displayed");
        expect(await maxIbPhonePage.isMaskButtonDisplayed()).toBe(true, "Mask button is not displayed");
        expect(await maxIbPhonePage.isRecordButtonDisplayed()).toBe(true, "Record button is not displayed");
        expect(await maxIbPhonePage.isTransferContactButtonDisplayed()).toBe(true, "Transfer button is not displayed");
        expect(await maxIbPhonePage.isLaunchButtonDisplayed()).toBe(true, "Launch button is not displayed");
        expect(await maxIbPhonePage.isEndButtonDisplayed()).toBe(true, "End button is not displayed");

        // VP:The workspace of the phone must not displayed be cut off
        expect(await maxIbPhonePage.isCallWorkspaceSizeInRange(callWidth, tolerances)).toBe(true, "The workspace of the phone is displayed cut off");

        // VP: The phone workspace must not contain a gray space and scroll bar.
        expect(await maxIbPhonePage.isHorizontalScrollBarDisplayed()).toBe(false, "The phone workspace contains a scroll bar");
        expect(Utility.convertRgbToHex(await maxIbPhonePage.getCallWorkSpaceColor())).toBe(Utility.convertRgbToHex(whiteColor), "The phone workspace contains a gray space");
        
        // 13. Using the "Dev Tools" select the "Phone" work space
        // VP: Verify the size of Phone work space is ~344 px (Width)
        expect(await maxIbPhonePage.isCallWorkspaceSizeInRange(callWidth, tolerances)).toBe(true, "the size of Phone work space is not ~344 px (Width)");

        // 14. Hang up the Phone Contact 
        await maxIbPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL)
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "The Phone work space has not been closed");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "Max Glance does not display");

        // 15. Using the "Dev Tools" select the Glance in MAX
        // VP: Verify the size of Glance continue being ~300 px (Width)
        expect(await maxPage.isMaxGlanceSizeInRange(maxWidth, tolerances)).toBe(true, "The size of Glance continue being ~300 px (Width)");

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
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



