import { Agent } from "@data-objects/general/agent";
import { MaxState } from "@data-objects/general/cluster";
import { State } from "@data-objects/general/general";
import { ContactName } from "@data-objects/general/max";
import { SkillType } from "@data-objects/general/skill-core";
import TestRunInfo from "@data-objects/general/test-run-info";
import CentralPage from "@page-objects/inContact/central/general/central-page";
import LoginPage from "@page-objects/inContact/central/general/login-page";
import SkillsDetailPage from "@page-objects/inContact/central/routing/skills/skills-detail-page";
import SkillsListPage from "@page-objects/inContact/central/routing/skills/skills-list-page";
import MaxCall from "@page-objects/inContact/max/max-call";
import MaxPage from "@page-objects/inContact/max/max-page";
import { TestCondition } from "@test-helpers/test-condition";
import TestHelpers from "@test-helpers/test-helpers";
import TestBase from "@testcases/test-base";
import { FunctionType, Logger } from "@utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { ISize } from "selenium-webdriver";

/** 
 * Type: inContact
 * Suite: MAX suite
 * TC ID: 455033
 * Tested browser: Chrome
 * Tested OS: Windows 10
 * Tested cluster: HC25
 */

describe('MAX suite - IC-101232', function () {

    let textUrl: string = "https://www.google.com";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let ibPhoneAgent: Agent;
    let currentIbPhoneSize: ISize;
    let tolerances: number = 10;
    let maxWidth: number = 300;
    let maxIBPhoneWidth: number = 344;

    // Declare Page object
    TestBase.scheduleTestBase();
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxIBPhonePage: MaxCall;
    let skillListPage: SkillsListPage;
    let detailPage: SkillsDetailPage;

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-101232 - [MAX][Summer '18 added][IC-21059][IB Phone][Without Contact Panels][Digital Contact] Verify the IB Phone Workspace has the ~344 px`);
        ibPhoneAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-101232 - MAX Summer 18 added IC21059 IB Phone Without Contact Panels Digital Contact Verify the IB Phone Workspace has the 344 px', async () => {

        // Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibPhoneAgent);

        // 2. How to measure Pixels 
        // 3. Launch MAX
        maxPage = await centralPage.launchMAX(ibPhoneAgent.phoneNumber);

        // Agent has panels 'on'
        await maxPage.showMaxGlance();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // 4. Using the 'Dev Tools' select the Glance in Max
        // VP: Verify the size of Glance is ~300 px (Width)
        expect(await maxPage.isMaxGlanceSizeInRange(maxWidth, tolerances)).toBe(true,"The size of Glance is ~300 px (Width)");
        
        // 5. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // VP: MAX has the "Available" state
        expect(await maxPage.getStateStatus()).toBe(MaxState.AVAILABLE, "MAX does not have the 'Available' state");

        // 6. Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCall(ibPhoneAgent);
        maxIBPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // 7. Using the 'Dev Tools' select the Glance in Max
        currentIbPhoneSize = await maxIBPhonePage.getContactWorkSpaceSize(ContactName.PHONE_CALL);

        // VP: Verify the size of Phone work space is ~344 px (Width)
        expect(Utility.isNumberInRange(currentIbPhoneSize.width, maxIBPhoneWidth, tolerances)).toBe(true, "The size of Phone work space is not ~344 px");

        // 8. Using the mouse and drag and drop action, try to change the size of Phone work space to the minimum.
        await maxIBPhonePage.resizeMaxByDropAndDrag(-500, 0);

        // VP: In theory the Phone work space should make a snapback when resized below min and the Phone work space should be continuous to displays ~344 px (Height) but in practice this action (snapback) sometimes doesn't work automatically  (it is expected) whereby the user must perform a manual drag and drop action until the expected workspace is restored.
        await maxIBPhonePage.waitForMAXGlanceStable();
        currentIbPhoneSize = await maxIBPhonePage.getContactWorkSpaceSize(ContactName.PHONE_CALL);
        expect(Utility.isNumberInRange(currentIbPhoneSize.width, maxIBPhoneWidth, tolerances)).toBe(true, "The size of Phone work space is not ~344 px");

        // 9. Hang up the Phone Contact
        await maxIBPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL, TestRunInfo.shortTimeout)).toBe(false, "Phone work space has not been closed");
        expect(await maxPage.isMaxGlanceDisplayed()).toBe(true, "Max glance does not display");

        // 10. Using the "Dev Tools" select the Glance in MAX
        // VP: Verify the size of Glance continue being ~300 px (Height) 
        expect(await maxPage.isMaxGlanceSizeInRange(maxWidth, tolerances)).toBe(true,"The size of Glance is ~300 px (Width)");

    });

    afterEach(async () => {
        await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            centralPage = await maxPage.logOut();
            await centralPage.logOut();
        } catch (err) { }
        finally {
            try {
                await TestCondition.setAgentSkillsToDefault(ibPhoneAgent, SkillType.IB_Phone);
            } catch (err) { }
        }
    }, TestRunInfo.conditionTimeout);
});



