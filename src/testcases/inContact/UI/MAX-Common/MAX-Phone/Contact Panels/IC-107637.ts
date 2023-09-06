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
 * Suite: MAX-Common > Phone > Contact Panels
 * TC ID: IC-107637
 * Tested browser: Chrome, firefox, IE.
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX-Common > Phone > Contact Panels - IC-107637', function () {

    TestRunInfo.testTimeout = 800000;
    let textUrl: string = "https://www.NiceIncontact.com?icAgentPanelTitle='Welcome to NiceIncontact Title Page'";
    let textUrl1: string = "'Welcome to NiceIncontact Title Page'";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;
    let centralWindowHandle: string;
    let maxWindowHandle: string;
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
        await Logger.write(FunctionType.TESTCASE, `IC-107637 - [MAX][IB][Phone] MAX - Update UI to check URL for Tab Title`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-107637 - [MAX][IB][Phone] MAX - Update UI to check URL for Tab Title', async () => {

        // 1.1 Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);
        centralWindowHandle = await pageBase.getCurrentWindowHandle();
        
        // 1.2 Launch MAX
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);
        maxWindowHandle = await pageBase.getCurrentWindowHandle();       

        // 2. Set Panel = On in MAX
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // 3. Set the "Available" state 
        await maxPage.changeState(MaxState.AVAILABLE);

        // 4. Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCall(ibAgent);
        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: Next to the Phone Contact, should be and displayed the Screen Pop configured in the Panel.
        expect(await maxPage.getScreenPopsTitle()).toContain(textUrl1, "Screen pop does not display with configured");                 
        
        // 6. Hang up the Phone Contact 
        await maxIbPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL)
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



