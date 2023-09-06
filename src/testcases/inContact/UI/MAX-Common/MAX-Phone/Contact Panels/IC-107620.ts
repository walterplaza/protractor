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
 * TC ID: IC-107620
 * Tested browser: Chrome, firefox, IE.
 * Tested OS: Windows 10
 * Tested cluster: HC6
 */

describe('MAX-Common > Phone > Contact Panels - IC-107620', function () {

    TestRunInfo.testTimeout = 800000;
    let textUrl: string = "https://www.NiceIncontact.com?icAgentPanelTitle='WELCOME TO NICE INCONTACT title page'";
    let textUrl1: string = "'WELCOME TO NICE INCONTACT title page'";
    let Json: string = `{"useScreenPops": true, "useCustomScreenPops": true, "screenPopType": "webpage","screenPopDetails": "${textUrl}"}`;

    // Declare Page object
    TestBase.scheduleTestBase();
    let ibAgent: Agent;
    let loginPage: LoginPage;
    let centralPage: CentralPage;
    let maxPage: MaxPage;
    let maxIbPhonePage: MaxCall;
    let pageBase = new PageBase();

    beforeEach(async () => {
        await Logger.write(FunctionType.TESTCASE, `IC-107620 - [MAX] [IB Phone] [Panel] [Screen Pops] Validate that value set on Contact Panel tab is no case-sensitive`);
        ibAgent = await TestCondition.setUpAgent(SkillType.IB_Phone, null, null, Json);

    }, TestRunInfo.conditionTimeout);

    it('IC-107620 - [MAX] [IB Phone] [Panel] [Screen Pops] Validate that value set on Contact Panel tab is no case-sensitive', async () => {

        // 1.1 Prerequisite(s)
        loginPage = LoginPage.getInstance();
        centralPage = await loginPage.loginInContact(ibAgent);
        
        // 1.2 Prerequisite(s)
        maxPage = await centralPage.launchMAX(ibAgent.phoneNumber);

        // 2. Go to Glance> More> Settings> Click on Panels.
        await maxPage.showMaxGlance();
        await maxPage.waitForMAXGlanceStable();
        await maxPage.changeMaxPanelsSetting(State.ON, false);

        // Close more tool bar
        await maxPage.closePopover();

        // 3. Change MAX status to Available from Unavailable 
        await maxPage.changeState(MaxState.AVAILABLE);

        // Using the POC, generate the Ib Phone Contact
        await TestHelpers.startInboundCall(ibAgent);
        maxIbPhonePage = await maxPage.waitForCallWorkspace();

        // VP: The Ib Phone Contact has been delivered in MAX.
        expect(await maxPage.isContactWorkSpaceDisplayed(ContactName.PHONE_CALL)).toBe(true, "The Ib Phone Contact has not been delivered in MAX.");

        // VP: -A chat window should open -Nice InContact website should open next to Chat window 
        //     And User should not see any parameter value as no value was added in the Contact Panel
        expect(await maxPage.getScreenPopsTitle()).toContain(textUrl1, "Screen pop does not display with configured");                 
        
        // Hang up the Phone Contact 
        await maxIbPhonePage.endCallContact();

        // VP: Verify the Phone work space has been closed and MAX displays the Glance
        await maxPage.waitForContactWorkSpaceDisappeared(ContactName.PHONE_CALL);
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



