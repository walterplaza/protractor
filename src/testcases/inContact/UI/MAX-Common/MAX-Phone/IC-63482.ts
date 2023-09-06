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
import BrowserWrapper from "@utilities/protractor-wrappers/browser-wrapper";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX-Common > MAX-Phone
 * TC ID: IC-63482
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: SC11
 */

describe('MAX-Common > MAX-Phone - IC-63482', function () {

    TestRunInfo.testTimeout = 800000;

    let whiteColor: string = "rgba(241, 241, 242, 1)";
    let textUrl: string = "/WebScripting/Default.aspx?id=";
    let maxIbPhoneSize: ISize;
    let screenPopTitle: string;
    let centralWindowHandle: string;
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
        await Logger.write(FunctionType.TESTCASE, `IC-63482 - [MAX][Phone][Page Action][Panel= On] Verify the "Page" can be opened for Ib Phone Contact`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IBPhone_PageAction);

    }, TestRunInfo.conditionTimeout);

    it('IC-63482 - [MAX][Phone][Page Action][Panel= On] Verify the "Page" can be opened for Ib Phone Contact', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);
        centralWindowHandle = await pageBase.getCurrentWindowHandle();

        // Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);
        await BrowserWrapper.refreshPage();
        maxWindowHandle = await pageBase.getCurrentWindowHandle();

        // Set Panel = ON in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state 
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "MAX does not have the 'Available' state");
        let maxSizeBeforeCall: ISize = await BrowserWrapper.getSize();

        // Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCallForPageAction(ibAgent);

        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: Next to the Phone Contact, should be and displayed the Page Action configured in the studio script.
        expect(await maxPage.getPageTitle()).toContain(textUrl, "Page does not display as configured in the studio script");

        // Click 'Next' Button within the PageAction Page
        await maxPage.clickPageActionPageNextButton();

        //VP: PageAction Page should not be displayed
        expect(await maxPage.isPageActionPageExist()).toBe(false, "PageAction Page is still displayed");

        // Hang up the call
        let maxPageAftercallends: MaxPage = await maxIbPhonePage.endCallContact();

        // Check that callworkspace is not displayed
        expect(await maxPageAftercallends.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(false, "The Ib Phone Contact has not been delivered in MAX.");

        // Check MAX size is same as before receiving the IB call
        let maxSizeAtTheEnd: ISize = await BrowserWrapper.getSize();
        await Logger.write(FunctionType.UI, `maxSizeAtTheEnd: ${maxSizeAtTheEnd.height} and ${maxSizeAtTheEnd.width} `);

        expect(maxSizeBeforeCall.height).toEqual(maxSizeAtTheEnd.height, "Max height is not same as before");
        expect(maxSizeBeforeCall.width).toEqual(maxSizeAtTheEnd.width, "Max width is not same as before");
    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {

            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibAgent, SkillType.IBPhone_PageAction);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



