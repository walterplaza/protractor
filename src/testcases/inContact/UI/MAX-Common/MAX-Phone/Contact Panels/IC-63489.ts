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
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX-Common > Phone > Contacts Panels
 * TC ID: 475251
 * Tested browser: Chrome, firefox, IE.
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX-Common > Phone > Contacts Panels - IC-63489', function () {

    TestRunInfo.testTimeout = 800000;
    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let maxIbPhoneSize: ISize;
    let screenPopTitle: string;
    let centralWindowHandle: string;
    let maxWindowHandle: string;
    let screenPopHandle: string;
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
        await Logger.write(FunctionType.TESTCASE, `IC-63489 - [MAX ][Phone][Launch Button][Screen Pops][Panel=Off] Verify a Screen Pop form can be opened for Ib Phone Contact`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-63489 - [MAX ][Phone][Launch Button][Screen Pops][Panel=Off] Verify a Screen Pop form can be opened for Ib Phone Contact', async () => {

        // 1. Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);
        centralWindowHandle = await pageBase.getCurrentWindowHandle();

        // 1.2. Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);
        maxWindowHandle = await pageBase.getCurrentWindowHandle();

        // 1.3. Set Panel = Off in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.OFF, false);

        // 1.4 Close more tool bar
        await maxPage.closePopover();

        // 2. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state 
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "MAX does not have the 'Available' state");

        // 3. Using the POC, generate the Ib Phone Contact
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
        
        // VP: verify that the Phone workspace does not resize when the Screen Pop is opened
        expect(await maxIbPhonePage.isCallWorkspaceSizeInRange(callWidth, tolerances)).toBe(true, "the size of Phone work space is not ~344 px (Width)");

        // 4. Hang up the Phone Contact 
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
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



